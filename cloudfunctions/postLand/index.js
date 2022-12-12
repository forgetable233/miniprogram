const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

/**
 * 出租者上传土地信息接口
 * 应当注意提交土地信息还需提交土地证拍照，此信息会上传至云储存中，不经过数据库
 * @param {id: string} （仅在更新土地信息时提供）土地id
 * @param {delete: boolean} （仅在更新土地信息时提供）若为true且符合各项要求，删除土地
 * @param {name: string} 土地名称
 * @param {acreage: number} 土地面积
 * @param {area: Array<GeoPoint>} 环绕土地的若干关键点
 * @param {cost: number} 每亩每年土地租金
 * @param {description: string} 描述文本
 * @param {details: string} 详细信息文本
 * @param {province: string} 所在省
 * @param {city: string} 所在市
 * @param {county: string} 所在县/区
 * @param {A: string} 所在镇/街道
 * @param {type: number} 类型
 * @param {transfer: number} 流转方式
 * @param {endTime: Date} 意向终止租用年份
 * @param {picCount: number} 用户上传的图片照片的数量
 * @returns {string} (post) 发布后土地的id
 * errCode:
 *   200 - 成功
 *   401 - 用户未实名
 *   4032 - (change) 用户不是土地的发布者
 *   4033 - (change) 土地状态异常
 *   404 - (change) 土地未找到
 *   500 - 发生未知错误
 */
exports.main = async (event, _context) => {
    const wxContext = cloud.getWXContext()
    const verify_as = await db.collection('verify').where({
        openid: wxContext.OPENID
    }).get().then(res => {
        if (res.data.length === 0) return 0
        else return res.data[0].verify_as
    })
    if (verify_as === 0) return { errCode: 401 }
    const date = new Date();
    if (event.id === undefined) {
        return await db.collection('land').add({
            data: {
                owner: wxContext.OPENID,
                name: event.name,
                postDate: date,
                state: 0,  // 审核中
                type: event.type,
                transfer: event.transfer,
                acreage: event.acreage,
                area: event.area,
                cost: event.cost,
                description: event.description,
                details: event.details,
                location: {
                    province: event.province,
                    city: event.city,
                    county: event.county,
                    district: event.district
                },
                endTime: new Date(event.endTime),
                picCount: event.picCount
            }
        }).then(res => {
            return {
                errCode: 200,
                data: res._id
            }
        }).catch(_res => {
            return { errCode: 500 }
        })
    } else {
        const old = await db.collection('land').doc(event.id).get().then(res => res.data).catch(_res => undefined);
        if (old === undefined) return { errCode: 404 }
        if (old.owner !== wxContext.OPENID) return { errCode: 4032 }
        if (old.state !== 0 && old.state !== 1) return { errCode: 4033 }
        if (event.delete === true)
            return await db.collection('land').doc(event.id).update({
                data: {
                    state: -2
                }
            }).then(_res => {
                return { errCode: 200 }
            }).catch(_res => {
                return { errCode: 500 }
            })
        else return await db.collection('land').doc(event.id).update({
            data: {
                name: event.name === undefined ? old.name : event.name,
                postDate: date,
                state: 0,  // 审核中
                type: event.type === undefined ? old.type : event.type,
                transfer: event.transfer === undefined ? old.transfer : event.transfer,
                acreage: event.acreage === undefined ? old.acreage : event.acreage,
                area: event.area === undefined ? old.area : event.area,
                cost: event.cost === undefined ? old.cost : event.cost,
                description: event.description === undefined ? old.description : event.description,
                details: event.details === undefined ? old.details : event.details,
                location: {
                    province: event.province === undefined ? old.province : event.province,
                    city: event.city === undefined ? old.city : event.city,
                    county: event.county === undefined ? old.county : event.county,
                    district: event.district === undefined ? old.district : event.district
                },
                endTime: event.endTime === undefined ? old.endTime : new Date(event.endTime),
                picCount: event.picCount === undefined ? old.picCount : event.picCount
            }
        }).then(_res => {
            return { errCode: 200 }
        }).catch(_res => {
            return { errCode: 500 }
        })
    }
}
