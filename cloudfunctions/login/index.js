const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

/**
 * 获取用户的基础信息（如昵称，微信号，头像等）
 * @returns {object} 用户的基础信息
 * errCode:
 *   200 - 成功
 *   404 - 未找到用户（未注册）
 */
exports.main = async (_event, _context) => {
    const wxContext = cloud.getWXContext()
    return await db.collection('user').aggregate().match({
        openid: wxContext.OPENID
    }).project({
        _id: false,
        openid: false,
        registerDate: false
    }).lookup({
        from: 'verify',
        pipeline: $.pipeline().match(_.expr($.eq(['$openid', wxContext.OPENID]))).project({
            _id: false,
            verify_as: true
        }).done(),
        as: 'verify'
    }).replaceRoot({
        newRoot: $.mergeObjects([$.arrayElemAt(['$verify', 0]), '$$ROOT'])
    }).project({
        verify: false
    }).end().then(res => res.list.length > 0 ? {
        errCode: 200,
        data: res.list[0]
    } : { errCode: 404 })
}