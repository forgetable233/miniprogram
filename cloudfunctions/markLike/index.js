const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

/**
 * 用户对土地添加或取消收藏接口
 * @param {land: string} 土地的id
 * @param {mark: boolean} 为true时添加收藏，为false时取消收藏
 * errCode:
 *   200 - 成功
 *   404 - （删除）未找到收藏记录
 *   500 - 发生未知错误
 */
exports.main = async (event, _context) => {
    const wxContext = cloud.getWXContext()
    let date;
    if (!event.mark) {
        return await db.collection('like').where({
            openid: wxContext.OPENID,
            land: event.land
        }).remove().then(res => {
            return { errCode: res.stats.removed > 0 ? 200 : 404 }
        }).catch(_res => {
            return { errCode: 500 }
        })
    } else {
        date = new Date()
        return await db.collection('like').where({
            openid: wxContext.OPENID,
            land: event.land
        }).get().then(res => {
            if (res.data.length === 0) {
                return db.collection('like').add({
                    data: {
                        date: date,
                        openid: wxContext.OPENID,
                        land: event.land
                    }
                }).then(_res => {
                    return { errCode: 200 }
                }).catch(_res => {
                    return { errCode: 500 }
                })
            }
            return { errCode: 200 }
        })
    }
}