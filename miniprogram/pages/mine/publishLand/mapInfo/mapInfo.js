// pages/mine/publishLand/mapInfo/mapInfo.js
import envList from '../../../../envList'

const app = getApp()


const aMapFile = require('../../../../libs/amap-wx.130')
const aMapFun = new aMapFile.AMapWX({key: envList.amapKey});
var markersData = [];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        textData: {},
        src: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const that = this;
        aMapFun.getPoiAround({
            success: result => {
                markersData = result.markers;
                that.setData({
                    markers: markersData,
                    latitude: markersData[0].latitude,
                    longitude: markersData[0].longitude
                })
                that.showMarkerInfo(markersData, 0)
            },
            fail: error => {
                wx.showModal({
                    title: error.errMsg
                })
            }
        })
        // let temp = {
        //     ak: 'W8XCMOwSjnZC4pZP2toTkDlW4GLI9yDb'
        // }
        // wx.request({
        //     url: 'https://api.map.baidu.com/direction/v2/driving',
        //     data: temp,
        //     header: {
        //         "content-type": "application/json"
        //     },
        //     method: 'GET',
        //     success: result => {
        //         console.log(result)
        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    // 高德官方的一个例子，先跑一下试一试
    showMarkerInfo: function (data, i) {
        var that = this
        that.setData({
            textData: {
                name: data[i].name,
                desc: data[i].address
            }
        })
    },
})