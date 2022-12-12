const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        user: {
            nickname: '点此登录',
            phone: '0',
            avatarUrl: '../../../images/icon/avatar.png'
        },
        isRegist: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.userInfo !== null) {
            this.setData({
                user: app.globalData.userInfo,
                isRegist: true
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

    jumpToCollectionPage: function () {
        wx.navigateTo({
            url: "/pages/mine/collection/collection"
        })
    },

    jumpToAbout: function () {
        wx.navigateTo({
            url: "/pages/mine/about/about"
        })
    },

    jumpToPublish: function () {
        wx.navigateTo({
            url: '/pages/mine/publishLand/publishLand'
        })
    },
    jumpToRegist: function () {
        if (!this.data.isRegist) {
            // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
            // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
            wx.getUserProfile({
                desc: '用于注册用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: (res) => {
                    var userinfo={
                        nickname: res.userInfo.nickName,
                        phone: '0',
                        avatarUrl: res.userInfo.avatarUrl
                    }
                    this.setData({
                        user: userinfo,
                        isRegist: true
                    })
                    app.globalData.userInfo = userinfo
                    wx.cloud.callFunction({
                        name: 'register',
                        data: {
                            nickname: res.userInfo.nickName,
                            phone: '0',
                            avatarUrl: res.userInfo.avatarUrl
                        }
                    })
                }
            })
        }
    },

    jumpToOrdersPage:function () {
        wx.navigateTo({
            url: '/pages/mine/orders/orders'
        })
    },

    jumpToPathPage:function () {
        wx.navigateTo({
            url: '/pages/mine/path/path'
        })
    },

    jumpToPost: function (data) {
        wx.navigateTo({
            url: '/pages/mine/myPost/myPost'
        })
    },

    jumpToMyApply: function (data) {
        wx.navigateTo({
            url: '/pages/mine/myApply/myApply'
        })
    },

    jumpToApply: function (data) {
        wx.navigateTo({
            url: '/pages/mine/applyToMy/applyToMy'
        })
    },
    jumpToFeedback: function()
    {
        wx.navigateTo({
          url: '/pages/mine/feedback/feedback',
        })
    },

    test: function (data) {
        wx.cloud.callFunction({
            name: 'getLands',
            data: {
                type: 'post'
            }
        }).then(result => {
            console.log(result)
        })
    }
})