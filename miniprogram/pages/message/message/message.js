// pages/message/message.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.StatusBar,
    avaterUrl: ["https://thirdwx.qlogo.cn/mmopen/vi_32/JUicjZeTzlxiaickqA87r4adFIibXeP5t2wjyQoMpRehq3CBsia5QPmGB0NoA2v11lzmMza1qDEGSZkW6AUBEOCocoQ/132",
    "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJsFQo3qEqjV5wkWnDh5xrtYdVTvFVh24VGkye6ESLYGSxAIe8wlOFR8U5XdCatRiaUBTjxp2Y8SsQ/132",
    "https://thirdwx.qlogo.cn/mmopen/vi_32/ibTYKVURsw0NKibbroG7dFXMqKQym0Jz90V0dGIRFZBPjVY1AmibClDM6uISUKxq2EaD2Ml0lb6KMTOZz7IjuEJAQ/132"],
    chatName: ["Danny","从头再来","卡比三卖萌"],
    chat: ["可以","请问可以面谈吗？","我需要长时间租用"],
    isRegist: false,

  },
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
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

  goToChat:function(e)
  {
    var that=this
    var index = e.currentTarget.dataset.index;
    console.log("chat index=")
    console.log(index)
    wx.navigateTo({
      url: '/pages/message/chat/chat',
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
        index: index,
        avaterUrl1: this.data.avaterUrl[index],
        chatName: this.data.chatName[index]
        })
        res.eventChannel.on('sendEvent', function(data) {
          console.log(data)
          that.setData({
            ['chat['+index+']']: data.lastMessage
          })
        })
      }
    })
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

  }
})