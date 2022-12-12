const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

/**
 * 得到一系列土地的基础信息
 * @param {type: string} 土地的种类（
 *    'post': 用户发布的
 *    'like': 用户收藏的
 *    'hire': 用户曾租用的
 *    'history': 用户访问历史
 * ）
 * @param {limit: number} 返回数量，不提供时为20
 * @param {skip: number} 跳过数量，不提供时为0
 * @param {ignoreDeleted: boolean} 是否忽略已删除的土地，不提供时为true
 * @returns {Array<Object>} 所求土地的简略信息
 * errCode:
 *   200 - 成功
 *   400 - 非法的请求
 *
 * 关于状态state：
 *   -2 - 已删除（通常是被出租者删除），不能被getLands(!ignoreDeleted)、search和details检索到
 *   -1 - 状态异常（如未通过审核，合同异常等），不能被search检索到
 *    0 - 正在审核，不能被search检索到，处于此状态的land可以被出租者修改或删除
 *    1 - 等待出租，可以被任何方式检索到，处于此状态的land可以被出租者修改或删除
 *    2 - 出租期内，不能被search检索到
 */
exports.main = async (event, _context) => {
    const wxContext = cloud.getWXContext()
    switch (event.type) {
        case 'post':
            const fetchApplier = $.pipeline().match(_.expr($.eq(['$openid', '$$openid']))).lookup({
                from: 'verify',  // 构建land[i].hire[j].applier.verify
                let: {
                    applier: '$openid'
                },
                pipeline: $.pipeline().match(_.expr($.eq(['$openid', '$$applier']))).project({
                    _id: false,
                    openid: false
                }).done(),
                as: 'verify'
            }).addFields({
                verify: $.arrayElemAt(['$verify', 0])
            }).project({
                _id: false,
                openid: false,
                registerDate: false
            }).done()
            const fetchHire = $.pipeline().match(_.expr($.eq(['$land', '$$land']))).lookup({
                from: 'user',  // 构建land[i].hire[j].applier
                let: {
                    openid: '$openid'
                },
                pipeline: fetchApplier,
                as: 'applier'
            }).addFields({
                applier: $.arrayElemAt(['$applier', 0])
            }).project({
                owner: false,
                land: false,
                openid: false
            }).sort({
                postDate: -1
            }).done()
            return await db.collection('land').aggregate().match({
                owner: wxContext.OPENID,
                state: event.ignoreDeleted === undefined || event.ignoreDeleted ? _.gte(-1) : _
            }).sort({
                postDate: -1
            }).skip(typeof event.skip === 'number' ? event.skip : 0).limit(typeof event.limit === 'number' ? event.limit : 20).lookup({
                from: 'hire',  // 构建land[i].hire
                let: {
                    land: '$_id'
                },
                pipeline: fetchHire,
                as: 'hire'
            }).project({
                postDate: false,
                owner: false,
                picCount: false
            }).end().then(res => {
                return {
                    errCode: 200,
                    data: res.list
                }
            })
        case 'hire':
            return await db.collection('hire').aggregate().match({
                openid: wxContext.OPENID
            }).sort({
                date: -1
            }).skip(typeof event.skip === 'number' ? event.skip : 0).limit(typeof event.limit === 'number' ? event.limit : 20).lookup({
                from: 'land',
                let: {
                    land: '$land',
                    progress: '$progress',
                    hireState: '$state',
                    hireId: '$_id'
                },
                pipeline: $.pipeline().match(_.expr($.eq(['$_id', '$$land']))).project({
                    postDate: false,
                    picCount: false
                }).addFields({
                    hire: {
                        _id: '$$hireId',
                        progress: '$$progress',
                        state: '$$hireState'
                    }
                }).done(),
                as: 'land'
            }).project({
                landObj: $.arrayElemAt(['$land', 0])
            }).replaceRoot({
                newRoot: '$landObj'
            }).match({
                state: event.ignoreDeleted === undefined || event.ignoreDeleted ? _.gte(-1) : _
            }).lookup({
                from: 'user',
                let: {
                    owner: '$owner'
                },
                pipeline: $.pipeline().match(_.expr($.eq(['$openid', '$$owner']))).project({
                    _id: false,
                    openid: false,
                    registerDate: false
                }).done(),
                as: 'owner'
            }).addFields({
                owner: $.arrayElemAt(['$owner', 0])
            }).end().then(res => {
                return {
                    errCode: 200,
                    data: res.list
                }
            })
        case 'like':
        case 'history':
            return await db.collection(event.type).aggregate().match({
                openid: wxContext.OPENID
            }).sort({
                date: -1
            }).skip(typeof event.skip === 'number' ? event.skip : 0).limit(typeof event.limit === 'number' ? event.limit : 20).lookup({
                from: 'land',
                let: {
                    land: '$land'
                },
                pipeline: $.pipeline().match(_.expr($.eq(['$_id', '$$land']))).project({
                    postDate: false,
                    picCount: false
                }).done(),
                as: 'land'
            }).project({
                landObj: $.arrayElemAt(['$land', 0])
            }).replaceRoot({
                newRoot: '$landObj'
            }).match({
                state: event.ignoreDeleted === undefined || event.ignoreDeleted ? _.gte(-1) : _
            }).lookup({
                from: 'user',
                let: {
                    owner: '$owner'
                },
                pipeline: $.pipeline().match(_.expr($.eq(['$openid', '$$owner']))).project({
                    _id: false,
                    openid: false,
                    registerDate: false
                }).done(),
                as: 'owner'
            }).addFields({
                owner: $.arrayElemAt(['$owner', 0])
            }).end().then(res => {
                return {
                    errCode: 200,
                    data: res.list
                }
            })
        default:
            return {
                errCode: 400
            }
    }
}