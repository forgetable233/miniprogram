// pages/subscribeLand/publishLand.js
import aMap from '../../../libs/amap-wx.130'
import envList from '../../../envList'
import {le} from "../../../towxml/parse/parse2/entities/maps/entities";

const myDate = new Date();
const app = getApp()
const aMapFile = require('../../../libs/amap-wx.130');
const aMapFun = new aMapFile.AMapWX({key: envList.amapKey});
var makersData = [];

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bigLandType: [
            {id: 0, type: '耕地', checked: true},
            {id: 1, type: '林地', checked: false},
            {id: 2, type: '园地', checked: false},
            {id: 3, type: '草地', checked: false},
            {id: 4, type: '养殖用地', checked: false},
            {id: 5, type: '住宅用地', checked: false},
            {id: 6, type: '工矿存储', checked: false},
            {id: 7, type: '商服用地', checked: false},
            {id: 8, type: '公共用地', checked: false},
            {id: 9, type: '农房', checked: false},
            {id: 10, type: '水域', checked: false},
            {id: 11, type: '其他用地', checked: false}
        ],
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
        circulationType: '',
        currentCirculationType: -1,
        bigType: '耕地',
        smallType: '',
        currentBigType: 0,
        currentSmallType: -1,
        title: '',
        acreage: undefined,
        cost: undefined,
        region: ['陕西省', '西安市', '长安区'],
        date: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate(),
        endDate: (myDate.getFullYear() + 100) + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate(),
        index: -1,
        imgList: [],
        description: '',
        detail: '',
        typeChosen: false,
        infoFinished: false,
        currentPage: 0,
        allPost: [],
        inputId: '',
        show: false
    },

    bindRegionChange: function (result) {
        this.setData({
            region: result.detail.value
        })
    },

    bindDateChange: function (result) {
        this.setData({
            date: result.detail.value
        })
    },

    bindRadioChange: function (result) {

    },

    submit: function (e) {
        const that = this;
        wx.showModal({
            title: '检查',
            content: '是否确定信息正确',
            cancelText: '取消',
            confirmText: '确定',
            success: result => {
                if (result.confirm) {
                    if (that.data.allPost.length !== 0) {
                        wx.cloud.callFunction({
                            name: 'postLand',
                            data: {
                                id: that.data.inputId,
                                delete: true
                            }
                        }).then(res => {
                            if (res.result.errCode !== 200) {
                                // TODO 细分失败原因
                                wx.showToast({
                                    title: '删除失败',
                                    icon: 'error',
                                    duration: 2000
                                })
                            }
                        })
                    }
                    wx.cloud.callFunction({
                        name: 'postLand',
                        data: {
                            name: that.data.title,  // 标题
                            acreage: parseFloat(that.data.acreage),
                            area: [],  // 环绕点（类型GeoPoint）
                            cost: parseFloat(that.data.cost),
                            description: that.data.description,
                            details: that.data.detail,  // 详细描述
                            province: that.data.region[0],
                            city: that.data.region[1],
                            county: that.data.region[2],
                            district: " ",
                            type: that.data.currentBigType * 100 + that.data.currentSmallType,  // 类型
                            endTime: Date.parse(that.data.date),
                            picCount: that.data.imgList.length,
                            transfer: that.data.currentCirculationType
                        }
                    }).then(id => {
                        wx.showToast()
                        if (id.result.errCode !== 200) {
                            wx.showToast({
                                title: '发送信息失败',
                                icon: 'error',
                                duration: 2000
                            })
                            return
                        }
                        console.log(that.data.currentBigType * 100 + that.data.currentSmallType)
                        console.log(that.data.currentCirculationType)
                        wx.showToast({
                            title: '发送成功审核中',
                            icon: 'success',
                            duration: 2000,
                            success: _res => {
                                setTimeout(() => {
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                }, 2000)
                            }
                        })
                        that.data.imgList.forEach((path, index) => {
                            wx.cloud.uploadFile({
                                cloudPath: 'lands/' + id.result.data + '/' + index.toString() + '.jpg',
                                filePath: path
                            })
                        })
                    }).catch(_res => {
                        wx.showToast({
                            title: '请确定网络环境良好',
                            icon: 'error',
                            duration: 2000
                        })
                    })
                }
            }
        })
    },

    formReset: function () {

    },

    chooseImage() {
        const that = this;
        wx.chooseMedia({
            count: 4,
            mediaType: 'image',
            sourceType: ['album', 'camera'],
            sizeType: ['origin', 'compressed'],
            success: res => {
                for (var index = 0; index < res.tempFiles.length; index++) {
                    if (that.data.imgList.length + 1 <= 4) {
                        const temp_file = that.data.imgList.concat(res.tempFiles[index].tempFilePath);
                        that.setData({
                            imgList: temp_file
                        })
                    }
                }
            }
        });
    },

    viewImage: function (e) {
        wx.previewImage({
            urls: this.data.imgList,
            current: e.currentTarget.dataset.index
        })
    },

    deleteImage: function (e) {
        wx.showModal({
            title: '选择',
            content: '是否要删除这张图片？',
            cancelText: '取消',
            confirmText: '确定',
            success: result => {
                if (result.confirm) {
                    this.data.imgList.splice(e.currentTarget.dataset.index, 1)
                    this.setData({
                        imgList: this.data.imgList
                    })
                }
            }
        })
    },

    returnToLastPage: function () {
        wx.navigateBack({
            delta: 1
        })
    },

    //TODO 调用高德API完成对应的任务，目前已经知道如何进行调用
    getCurrentLocation: function () {
        const that = this;
        aMapFun.getRegeo({
            success: res => {
                if (res[0]) {
                    var currentCity = res[0].regeocodeData.addressComponent.province
                    that.setData({})
                }
            }
        })
    },

    jumpToMap: function () {
        wx.navigateTo({
            url: '/pages/mine/publishLand/mapInfo/mapInfo'
        })
    },

    switchPage: function (data) {
        const that = this
        if (that.data.currentPage === 0) {
            if (that.data.typeChosen === true) {
                that.setData({
                    currentPage: 1
                })
            } else {
                wx.showToast({
                    title: '未选择类型',
                    icon: 'error',
                    duration: 2000
                })
            }
        } else if (that.data.currentPage === 1) {
            if (that.data.infoFinished === true) {
                this.setData({
                    currentPage: 2,
                    infoFinished: true
                })
            } else {
                if (that.data.title.length !== 0 && that.data.acreage.length !== 0 && that.data.cost.length !== 0 && that.data.description.length !== 0) {
                    if ((!(/(^\d+(\.\d+)?$)/.test(that.data.acreage)))) {
                        wx.showToast({
                            title: '面积应为纯数字',
                            icon: 'error',
                            duration: 2000
                        })
                        this.setData({
                            currentPage: 1,
                            infoFinished: false
                        })
                        return;
                    }
                    if ((!(/(^\d+(\.\d+)?$)/.test(that.data.cost)))) {
                        wx.showToast({
                            title: '价格应为纯数字',
                            icon: 'error',
                            duration: 2000
                        })
                        this.setData({
                            currentPage: 1,
                            infoFinished: false
                        })
                        return;
                    }
                    this.setData({
                        currentPage: 2,
                        infoFinished: true
                    })
                } else {
                    wx.showToast({
                        title: '信息不全',
                        icon: 'error',
                        duration: 2000
                    })
                }
            }
        }
    },

    switchBigType: function (data) {
        const that = this
        let i = 0
        if (data.currentTarget.dataset.checked === false) {
            for (; i < that.data.bigLandType.length; i++) {
                if (that.data.bigLandType[i].id === data.currentTarget.dataset.id) {
                    break;
                }
            }
            let temp = this.data.bigLandType
            temp[i].checked = true
            temp[that.data.currentBigType].checked = false
            this.setData({
                bigLandType: temp,
                currentSmallType: -1,
                currentBigType: i
            })
            this.setData({
                bigType: that.data.bigLandType[that.data.currentBigType].type
            })
        }
    },

    switchSmallType: function (data) {
        const that = this
        let i = data.currentTarget.dataset.id
        let temp = this.data.smallLandType
        if (that.data.smallLandType[that.data.currentBigType].types[i].checked === true) {
            temp[that.data.currentBigType].types[i].checked = false
            this.setData({
                smallLandType: temp,
                currentSmallType: -1,
                currentPage: 0,
                typeChosen: false
            })
        } else {
            temp[that.data.currentBigType].types[i].checked = true
            if (that.data.currentSmallType >= 0) {
                temp[that.data.currentBigType].types[that.data.currentSmallType].checked = false
            }
            this.setData({
                smallLandType: temp,
                currentSmallType: i,
                typeChosen: true
            })
            this.setData({
                smallType: that.data.smallLandType[that.data.currentBigType].types[that.data.currentSmallType].type
            })
        }
    },

    switchCirculationType: function (data) {
        const that = this
        let temp = that.data.circulationTypes
        if (data.currentTarget.dataset.checked === true) {
            temp[data.currentTarget.dataset.id].checked = false
            this.setData({
                circulationTypes: temp,
                circulationType: '',
                currentCirculationType: -1
            })
        } else {
            temp[data.currentTarget.dataset.id].checked = true
            if (that.data.currentCirculationType >= 0) {
                temp[that.data.currentCirculationType].checked = false
                this.setData({
                    circulationTypes: temp,
                    circulationType: that.data.circulationTypes[data.currentTarget.dataset.id].type,
                    currentCirculationType: data.currentTarget.dataset.id
                })
            } else {
                this.setData({
                    circulationTypes: temp,
                    circulationType: that.data.circulationTypes[data.currentTarget.dataset.id].type,
                    currentCirculationType: data.currentTarget.dataset.id
                })
            }
        }
    },

    onClick: function (data) {
        // console.log(data)

    },

    onDisabled: function (data) {
        // console.log(data)
        // console.log(this.data.typeChosen)
    },

    inputTitle: function (event) {
        this.setData({
            title: event.detail
        })
    },

    inputArcage: function (event) {
        this.setData({
            acreage: event.detail
        })
    },

    inputCost: function (event) {
        this.setData({
            cost: event.detail
        })
        // console.log(this.data.cost.length)
    },

    inputDescription: function (event) {
        this.setData({
            description: event.detail
        })
    },

    inputDetail: function (event) {
        this.setData({
            detail: event.detail
        })
    },

    showHide: function (data) {
        const that = this
        if (that.data.show === false) {
            this.setData({
                show: true
            })
        }
        // wx.showToast({
        //     title: '敬请期待',
        //     icon: 'error',
        //     duration: 2000
        // })
    },

    closeShow: function (data) {
        const that = this
        if (that.data.show === true) {
            this.setData({
                show: false
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (!options) {
            const that = this
            this.setData({
                inputId: options.now
            })
            wx.cloud.callFunction({
                name: 'getLands',
                data: {
                    type: 'post'
                }
            }).then(res => {
                if (res.result.data.length !== 0) {
                    this.setData({
                        allPost: res.result.data
                    })
                    let i = 0;
                    let temp
                    for (; i < this.data.allPost.length; i++) {
                        if (that.data.allPost[i]._id === options.now) {
                            temp = that.data.allPost[i]
                            break
                        }
                    }
                    this.setData({
                        name: temp.name,  // 标题
                        acreage: parseFloat(temp.acreage),
                        area: [],  // 环绕点（类型GeoPoint）
                        cost: parseFloat(temp.cost),
                        description: temp.description,
                        details: temp.detail,  // 详细描述
                        province: temp.location.province,
                        city: temp.location.city,
                        county: temp.location.district,
                        currentBigType: temp.type % 100,
                        currentSmallType: temp.type / 100,
                        endTime: Date.parse(temp.date),
                        picCount: temp.picCount,
                        transfer: temp.transfer,
                        infoFinished: true,
                        typeChosen: true,
                        smallType: app.smallLandType[temp.type % 100].types[temp.type / 100].type,
                        bigType: app.bigLandType[temp.type % 100].type
                    })
                    let tempBigType = that.data.bigLandType
                    let tempSmallType = that.data.smallLandType
                    tempBigType[temp.type % 100].checked = true
                    tempSmallType[temp.type % 100].types[temp.type / 100].checked = true
                    this.setData({
                        bigLandType: tempBigType,
                        smallLandType: tempSmallType
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
})