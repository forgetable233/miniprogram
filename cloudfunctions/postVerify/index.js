const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

/**
 * 用户提交实名认证信息接口
 * 应当注意实名认证还需提交手持身份证拍照或营业资格证拍照，此信息会上传至云储存中，不经过数据库
 * @param {type: number} 为1时，表示以个人身份认证，为2时，表示以法人身份认证
 * @param {name: string} 姓名（以个人身份认证时）或企业注册名（以法人身份认证时）
 * @param {number: string} 身份证号（以个人身份认证时）或税号（以法人身份认证时）
 * @param {phone: string} 联系人电话
 * errCode:
 *   200 - 成功
 *   500 - 发生未知错误
 */
exports.main = async (event, _context) => {
    const wxContext = cloud.getWXContext()
    return await db.collection('unconfirmed_verify').where({
        openid: wxContext.OPENID
    }).get().then(res => {
        const date = new Date();
        if (res.data.length === 0) {
            return await db.collection('unconfirmed_verify').add({
                data: {
                    openid: wxContext.OPENID,
                    verify_as: event.type,
                    name: event.name,
                    number: event.number,
                    phone: event.phone,
                    postDate: date
                }
            }).then(_res => {
                return { errCode: 200 }
            }).catch(_res => {
                return { errCode: 500 }
            })
        } else {
            return await db.collection('unconfirmed_verify').doc(res.data[0]._id).update({
                data: {
                    verify_as: event.type,
                    name: event.name,
                    number: event.number,
                    phone: event.phone,
                    postDate: date
                }
            }).then(_res => {
                return { errCode: 200 }
            }).catch(_res => {
                return { errCode: 500 }
            })
        }
    })
}