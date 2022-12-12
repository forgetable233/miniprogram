const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

/**
 * 新用户注册接口
 * @param {nickname: string} 昵称
 * @param {phone: string} 手机号
 * @param {avatarUrl: avatarUrl} 头像url
 * errCode:
 *   200 - 成功
 *   500 - 发生未知错误
 */
exports.main = async (event, _context) => {
    const wxContext = cloud.getWXContext()
    const date = new Date();
    return await db.collection('user').add({
        data: {
            openid: wxContext.OPENID,
            registerDate: date,
            nickname: event.nickname,
            phone: event.phone,
            avatarUrl: event.avatarUrl
        }
    }).then(_res => {
        return { errCode: 200 }
    }).catch(_res => {
        return { errCode: 500 }
    })
}
