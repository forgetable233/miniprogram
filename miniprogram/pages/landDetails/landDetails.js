import {el} from "../../towxml/parse/parse2/entities/maps/entities";

const app = getApp()
import amap from '../../libs/amap-wx.130.js'
import envList from '../../envList.js'

Page({
    data: {
        // StatusBar:
        StatusBar: app.globalData.StatusBar + 7,
        TabbarBot: app.globalData.tabbar_bottom,
        land: undefined,

        smallLandType: [
            {
                id: 0,
                types: [
                    {id: 0, type: '水田', checked: false},
                    {id: 1, type: '水浇地', checked: false},
                    {id: 2, type: '旱地', checked: false},
                    {id: 3, type: '其他耕地', checked: false},
                ]
            },
            {
                id: 1, types: [
                    {id: 0, type: '有林地', checked: false},
                    {id: 1, type: '灌木林地', checked: false},
                    {id: 2, type: '其他林地', checked: false}
                ]
            },
            {
                id: 2, types: [
                    {id: 0, type: '果园', checked: false},
                    {id: 1, type: '茶园', checked: false},
                    {id: 2, type: '菜园', checked: false},
                    {id: 3, type: '其他园地', checked: false},
                ]
            },
            {
                id: 3, types: [
                    {id: 0, type: '天然牧草地', checked: false},
                    {id: 1, type: '灌木林地', checked: false},
                    {id: 2, type: '其他林地', checked: false}
                ]
            },
            {
                id: 4, types: [
                    {id: 0, type: '农场', checked: false},
                    {id: 1, type: '畜牧养殖', checked: false},
                    {id: 2, type: '水产养殖', checked: false},
                    {id: 3, type: '综合养殖', checked: false},
                    {id: 4, type: '设施农用地', checked: false},
                ]
            },
            {
                id: 5, types: [
                    {id: 0, type: '城镇住宅用地', checked: false},
                    {id: 1, type: '农村宅基地', checked: false}
                ]
            },
            {
                id: 6, types: [
                    {id: 0, type: '厂房', checked: false},
                    {id: 1, type: '矿山用地', checked: false},
                    {id: 2, type: '仓储用地', checked: false},
                    {id: 3, type: '工业用地', checked: false}
                ]
            },
            {
                id: 7, types: [
                    {id: 0, type: '商业用地', checked: false},
                    {id: 1, type: '综合用地', checked: false}
                ]
            },
            {
                id: 8, types: [
                    {id: 0, type: '科研用地', checked: false},
                    {id: 1, type: '教育用地', checked: false},
                    {id: 2, type: '医疗卫生用地', checked: false},
                    {id: 3, type: '其他公共用地', checked: false}
                ]
            },
            {
                id: 9, types: [
                    {id: 0, type: '农家庭院', checked: false},
                    {id: 1, type: '度假山庄', checked: false}
                ]
            },
            {
                id: 10, types: [
                    {id: 0, type: '河流', checked: false},
                    {id: 1, type: '湖泊', checked: false},
                    {id: 2, type: '水库', checked: false},
                    {id: 3, type: '坑塘', checked: false},
                    {id: 4, type: '沿河滩涂', checked: false},
                    {id: 5, type: '内陆滩涂', checked: false},
                    {id: 6, type: '水工建筑用地', checked: false}
                ]
            },
            {
                id: 11, types: [
                    {id: 0, type: '交通运输', checked: false},
                    {id: 1, type: '其他特殊用地', checked: false},
                    {id: 2, type: '空闲用地', checked: false},
                    {id: 3, type: '盐碱地', checked: false},
                    {id: 4, type: '沙地', checked: false},
                    {id: 5, type: '裸地', checked: false},
                    {id: 6, type: '荒山', checked: false},
                    {id: 7, type: '荒地', checked: false}
                ]
            }
        ],

        circulationTypes: [
            {id: 0, type: '转让', checked: false},
            {id: 1, type: '租让', checked: false},
            {id: 2, type: '转包', checked: false},
            {id: 3, type: '互换', checked: false},
            {id: 4, type: '入股', checked: false},
            {id: 5, type: '合作', checked: false}
        ],

        imgStyle: 'width: 0rpx; height : 0rpx',

        pixelRatio: 2,

        favor_type: 'cuIcon-favor',

        robot_type: 'others'
    },
    onLoad: function (options) {
        let that = this
        let amapFun = new amap.AMapWX({key: envList.amapKey})
        wx.cloud.callFunction({
            name: 'getLandDetails',
            data: {
                id: options.id
            },
            success: function (res) {
                that.setData({
                    land: res.result.data
                })
                if (res.result.data.liked) {
                    that.setData({
                        favor_type: 'cuIcon-favorfill'
                    })
                }
            },
            failed: function (res) {
                console.log(res)
            }
        })
    },

    imageLoadSuccess: function (e) {
        // get the information of the image
        const imgDetail = e.detail
        // console.log(e)
        // set the width and the height of the image according to the phone
        this.setData({
            // imgStyle: 'width: ${imgDetail.width * this.data.pixelRatio}rpx; height: ${imgDetail.height * this.data.pixelRatio}rpx;'
            imgStyle: `width: ${imgDetail.width * this.data.pixelRatio}rpx; height: ${imgDetail.height * this.data.pixelRatio}rpx;`
        })
        // console.log("now the data is : " + this.data.imgStyle);
    },

    jumpToHome: function () {
        wx.navigateTo({
            url: 'pages/index/index'
        })
    },

    addToMyCollection: function () {
        if (this.data.favor_type === 'cuIcon-favor') {
            wx.cloud.callFunction({
                name: 'markLike',
                data: {
                    land: this.data.land._id,
                    mark: true
                }
            })
            this.setData({
                favor_type: 'cuIcon-favorfill'
            })
        } else {
            wx.cloud.callFunction({
                name: 'markLike',
                data: {
                    land: this.data.land._id,
                    mark: false
                }
            })
            this.setData({
                favor_type: 'cuIcon-favor'
            })
        }
    },

    returnToLastPage: function () {
        console.log('Enter the return function')
        wx.navigateBack({
            delta: 1
        })
    },

    buyLand: function (data) {
        console.log('enter the function')
        console.log(this.data.land._id)
        const that = this
        wx.showModal({
            title: '选择',
            content: '您确定要购买此土地么',
            confirmText: '是的',
            cancelText: '不是',
            success: result => {
                if (result.confirm) {
                    wx.cloud.callFunction({
                        name: 'postHire',
                        data: {
                            id: that.data.land._id,
                            operate: 'apply'
                        }
                    }).then(res => {
                        if (res.result.errCode === 200) {
                            wx.showToast({
                                title: '请求发送成功',
                                icon: 'success',
                                duration: 2000
                            })
                        } else {
                            wx.showToast({
                                title: '请求发送失败',
                                icon: 'error',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        })
    },

    test: function (da) {
        console.log(this.data.favor_type)
    },

    contactWihtOwner: function (data) {
        wx.showToast({
            title: '敬请期待',
            icon: 'error',
            duration: 2000
        })
    }
})