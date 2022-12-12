// pages/message/chat/chat.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: [],
    InputBottom: 0,
    sendMessage: "",
    inputValue: " ",
  },
  send:function(){
    wx.showToast({
      icon: 'none',
      title: '功能尚未完全,仅展示预期效果',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var Index = 0
    if (app.globalData.userInfo !== null) {
      this.setData({
          user: app.globalData.userInfo,
          isRegist: true
      })
    }
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    var temp
    new Promise((resolve, reject) => {
      eventChannel.on('acceptDataFromOpenerPage', function(data) {
        temp=data
        resolve(temp)
      })
    }).then((res)=>{
        console.log(temp)
        that.setData({
          avaterUrl1: temp.avaterUrl1,
          chatName: temp.chatName
        })
        Index=temp.index
        var message1=[{name: 0,chat: "你好，请问这块地是在山上吗？"},{name: 1,chat:"是的，在一个山坡上，附近有水源。"},{name:1,chat:"你周末有时间吗？，可以直接来看地"},{name: 0,chat:"可以"}];
        var message2=[{name: 0,chat: "请问可以面谈吗？"}];
        var message3= [{name: 0,chat: "这块地还在吗？"},{name:1,chat:"在的在的"},{name:0,chat:"能够签长期合同吗？"},{name: 0,chat:"我需要长期租用"}];
        if(Index==0)
        {
          this.setData({
            message: message1
          })
        }
        else if(Index==1)
        {
          this.setData({
            message: message2
          })
        }
        else if(Index==2)
        {
          this.setData({
            message: message3
          })
        }
        console.log("Index")
        console.log(Index)
      })
    var that = this
        , statusHeight = app.systemInfo.statusBarHeight
        , navHeight;
    if (!app.systemInfo.isIOS) {
        navHeight = 48;
    } else {
        navHeight = 44;
    }
    that.setData({
        // statusHeight: statusHeight,
        status: statusHeight,
        navHeight: navHeight
    })
  //   this.setData({index: 2,chatName: "卡比三卖萌"})
  //   this.setData({avaterUrl1: "https://thirdwx.qlogo.cn/mmopen/vi_32/ibTYKVURsw0NKibbroG7dFXMqKQym0Jz90V0dGIRFZBPjVY1AmibClDM6uISUKxq2EaD2Ml0lb6KMTOZz7IjuEJAQ/132",
  // avaterUrl0: "https://thirdwx.qlogo.cn/mmopen/vi_32/JUicjZeTzlxiaickqA87r4adFIibXeP5t2wjyQoMpRehq3CBsia5QPmGB0NoA2v11lzmMza1qDEGSZkW6AUBEOCocoQ/132",})

    
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  getInput(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  sendMessage()
  {
    console.log(this.data.inputValue)
    var changeMessage=this.data.message
    var info={}
    info.name=0
    info.chat=this.data.inputValue
    changeMessage.push(info)
    this.setData({message: changeMessage})
    this.setData({inputValue: " "})
    console.log(this.data.message)
  },
  back:function(){
    const eventChannel = this.getOpenerEventChannel();
    wx.navigateBack({
      delta: 1
  })
  eventChannel.emit('sendEvent', {
    lastMessage: this.data.message[this.data.message.length-1].chat
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