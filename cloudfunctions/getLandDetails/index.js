const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

/**
 * 得到给定土地的详细信息
 * <TODO> 讨论一下到底要不要发实名信息
 * @param {id: string} 需要查询的土地的id
 * @returns {Object} 土地的详细信息
 * errCode:
 *   200 - 成功
 *   404 - 未找到指定id的land
 *   410 - 所找land已永久删除
 */
exports.main = async (event, _context) => {
    const wxContext = cloud.getWXContext()
    const result = await db.collection('land').aggregate().match({
        _id: event.id
    }).lookup({
        from: 'user',
        let: {
            owner: '$owner'
        },
        pipeline: $.pipeline().match(_.expr($.eq(['$openid', '$$owner']))).project({
            _id: false,
            openid: false,
            registerDate: false
        }).addFields({
            self: $.eq([wxContext.OPENID, '$$owner'])
        }).done(),
        as: 'owner'
    }).addFields({
        owner: $.arrayElemAt(['$owner', 0])
    }).lookup({
        from: 'like',
        pipeline: $.pipeline().match(_.expr($.and([
            $.eq(['$openid', wxContext.OPENID]),
            $.eq(['$land', event.id])
        ]))).done(),
        as: 'liked'
    }).addFields({
        liked: $.neq([$.size('$liked'), 0])
    }).end().then(res => res.list[0])
    if (result === undefined) return { errCode: 404 }
    if (result.state === -2) return { errCode: 410 }
    result.hire = await db.collection('hire').aggregate().match({
        land: event.id,
        openid: result.owner.self ? _ : wxContext.OPENID
    }).lookup({
        from: 'user',
        let: {
            openid: '$openid'
        },
        pipeline: $.pipeline().project({
            _id: false,
            openid: false,
            registerDate: false
        }).done(),
        as: 'applier'
    }).addFields({
        applier: $.arrayElemAt(['$applier', 0])
    }).project({
        owner: false,
        land: false,
        openid: false
    }).sort({
        postDate: -1
    }).end().then(res => res.list)
    if (!result.owner.self) result.hire.forEach(h => delete h.applier)
    db.collection('history').where({
        openid: wxContext.OPENID,
        land: event.id
    }).get().then(res => {
        const date = new Date();
        if (res.data.length === 0) {
            return db.collection('history').add({
                data: {
                    date: date,
                    openid: wxContext.OPENID,
                    land: event.id
                }
            })
        } else {
            db.collection('history').doc(res.data[0]._id).update({
                data: {
                    date: date
                }
            })
        }
    })
    return {
        errCode: 200,
        data: result
    }
}