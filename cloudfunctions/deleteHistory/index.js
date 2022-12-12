const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

/**
 * 用户删除历史记录接口
 * @param {land: string} 记录中土地的id，若为undefined，则清空用户的全部历史记录
 * @return {number} 删除的条目数
 * errCode:
 *   200 - 成功
 *   500 - 出现了未知错误
 */
exports.main = async (event, _context) => {
    const wxContext = cloud.getWXContext()
        return await db.collection('history').where({
            openid: wxContext.OPENID,
            land: event.land === undefined ? _ : event.land
        }).remove().then(res => {
            return {
                errCode: 200,
                data: res.stats.removed
            }
        }).catch(_res => {
            return {
                errCode: 500,
                data: 0
            }
        })
}