const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

/**
 * 搜索得到满足一定要求的土地信息
 * @param {location: Object} 位置信息
 *     @param {location.province: string} 省
 *     @param {location.city: string} 市
 *     @param {location.county: string} 县/区
 *     @param {location.district: string} 镇/街道
 * @param {type: Array<number>} 土地类型（属于）
 * @param {transfer: Array<number>} 土地流转方式（属于）
 * @param {cost: Array<number> | number} 租金（
 *     [a, b]  -  满足 a <= 租金 <= b
 *     num     -  满足 num <= 租金
 * ）
 * @param {acreage: Array<number> | number} 面积（同上）
 * @param {limit: number} 返回数量，不提供时为20
 * @param {skip: number} 跳过数量，不提供时为0
 * @return {Array<Object>} 满足指定要求的土地信息数组
 * errCode:
 *   200 - 成功
 *   500 - 发生未知错误
 */
exports.main = async (event, _context) => {
    const wxContext = cloud.getWXContext()
    return await db.collection('land').aggregate().match({
        'location.province': event.location !== undefined && event.location.province !== undefined
            ? event.location.province : _,
        'location.city': event.location !== undefined && event.location.city !== undefined
            ? event.location.city : _,
        'location.county': event.location !== undefined && event.location.county !== undefined
            ? event.location.county : _,
        'location.district': event.location !== undefined && event.location.district !== undefined
            ? event.location.district : _,
        'type': event.type !== undefined ? _.in(event.type) : _,
        'transfer': event.transfer !== undefined ? _.in(event.transfer) : _,
        'cost': typeof event.cos === 'object' ? _.gte(event.cost[0]).and(_.lte(event.cost[1]))
            : (typeof event.cost === 'number' ? _.gte(event.cost) : _),
        'acreage': typeof event.acreage === 'object' ? _.gte(event.acreage[0]).and(_.lte(event.acreage[1]))
            : (typeof event.acreage === 'number' ? _.gte(event.acreage) : _),
        'state': 1
    }).sort({
        date: -1
    }).skip(typeof event.skip === 'number' ? event.skip : 0).limit(typeof event.limit === 'number' ? event.limit : 20).lookup({
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
    }).project({
        postDate: false,
        picCount: false
    }).end().then(res => {
        return {
          errCode: 200,
          data: res.list
        }
    }).catch(_res => {
        return { errCode: 500 }
    })
}