const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

/**
 * 用户租用土地接口
 * <TODO> 土地状态更新订阅消息
 * @param {operate: string} 操作（
 *    'apply': 用户申请租用土地
 *    'accept': 租户同意申请
 *    'refuse': 租户拒绝申请
 *    'progress': （双方通用）提交进度 0为买方 1为卖方
 * ）
 * @param {id: string} （apply）土地的id，（accept/refuse/progress）交易记录的id
 * errCode:
 *   200 - 成功
 *   302 - 已存在有效订单
 *   400 - 非法的请求
 *   401 - 用户未实名
 *   4031 - (accept|refuse) 订单不是正在等待处理的订单，(progress) 不是正在处理中的订单
 *   4032 - (apply) 请求者不能为出租者，(accept|refuse) 非出租者禁止访问，(progress) 非订单参与者禁止访问
 *   4033 - 土地状态异常
 *   404 - 未找到土地/订单
 *   500 - 未知错误
 *   
 * 关于state:
 *   -2 - 订单已结束
 *   -1 - 订单被拒绝
 *    0 - 订单未收到回应
 *    1 - 订单被通过
 *    2 - 订单状态异常
 */
exports.main = async (event, _context) => {
    const wxContext = cloud.getWXContext()
    switch (event.operate) {
        case 'apply':
            var verify = await db.collection('verify').where({
                openid: wxContext.OPENID
            }).get().then(res => res.data)
            if (verify.length === 0 || verify[0].verify_as === 0) return { errCode: 401 }  // 用户未实名
            var cnt = await db.collection('hire').where({
                openid: wxContext.OPENID,
                land: event.id,
                state: _.gte(0)
            }).get().then(res => res.data.length)
            if (cnt !== 0) return { errCode: 302 }  // 已经发布过有效的订单
            var land = await db.collection('land').doc(event.id).get().then(res => res.data).catch(_ => undefined)
            if (land === undefined) return { errCode: 404 }  // 未找到土地
            if (land.owner === wxContext.OPENID) return { errCode: 4032 }  // 请求者不能为出租者
            if (land.state !== 1) return { errCode: 4033 }  // 土地暂不可用
            var date = new Date()
            return await db.collection('hire').add({
                data: {
                    postDate: date,
                    openid: wxContext.OPENID,
                    owner: land.owner,
                    land: event.id,
                    progress: [0, 0],
                    state: 0
                }
            }).then(_res => {
                return { errCode: 200 }
            }).catch(_res => {
                return { errCode: 500 }
            })
        case 'accept':
            var order = await db.collection('hire').aggregate().match({
                _id: event.id
            }).lookup({
                from: 'land',
                let: {
                    land: '$land'
                },
                pipeline: $.pipeline().match(_.expr($.eq(['$_id', '$$land']))).project({
                    state: true
                }).done(),
                as: 'land'
            }).addFields({
                land: $.arrayElemAt(['$land', 0])
            }).end().then(res => res.list[0])
            if (order === undefined) return { errCode: 404 }  // 未找到订单
            if (order.owner !== wxContext.OPENID) return { errCode: 4032 }  // 非出租者无法进行此操作
            if (order.state !== 0) return { errCode: 4031 }  // 订单已处理
            if (order.land.state !== 1) return { errCode: 4033 }  // 土地尚不可用
            db.collection('land').doc(order.land).update({  // 更新土地state
                state: 2
            })
            db.collection('hire').where({  // 拒绝其它订单
                _id: _.neq(event.id),
                land: order.land._id,
                state: 0
            }).update({
                data: {
                    state: -1
                }
            })
            return await db.collection('hire').doc(event.id).update({  // 通过订单
                data: {
                    state: 1
                }
            }).then(_res => {
                return { errCode: 200 }
            }).catch(_res => {
                return { errCode: 500 }
            })
        case 'refuse':
            var order = await db.collection('hire').aggregate().match({
                _id: event.id
            }).end().then(res => res.list[0])
            if (order === undefined) return { errCode: 404 } // 未找到订单
            if (order.owner !== wxContext.OPENID) return { errCode: 4032 }  // 非出租者无法进行此操作
            if (order.state !== 0) return { errCode: 4031 }  // 订单已处理
            return await db.collection('hire').doc(event.id).update({
                data: {
                    state: -1
                }
            }).then(_res => {
                return { errCode: 200 }
            }).catch(_res => {
                return { errCode: 500 }
            })
        case 'progress':
            var order = await db.collection('hire').aggregate().match({
                _id: event.id
            }).end().then(res => res.list[0])
            if (order === undefined) return { errCode: 404 }  // 未找到订单
            if (order.state !== 1) return { errCode: 4031 }  // 非进行中订单
            if (order.openid !== wxContext.OPENID && order.owner !== wxContext.OPENID) return { errCode: 4032 }  // 非订单参与者 
            return await db.collection('hire').where({
                _id: event.id
            }).update({
                data: {
                    'progress.0': _.inc(order.openid === wxContext.OPENID ? 1 : 0),
                    'progress.1': _.inc(order.owner === wxContext.OPENID ? 1 : 0)
                }
            }).then(_res => {
                return { errCode: 200 }
            }).catch(_res => {
                return { errCode: 500 }
            })
        default:
            return { errCode: 400 }
    }
}