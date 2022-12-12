// pages/index/news/news.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: getApp().globalData.StatusBar,
    index: 2,
    article:{},
  },
  jumpBack: function(){
    wx.navigateBack({
      delta: 0,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
      that.setData({
        index: data.index
      })
    })
    var files
    if(that.data.index==1)
    {
      files='cloud://cloud1-7gbhxuxd395adfde.636c-cloud1-7gbhxuxd395adfde-1310914803/news/new1_html.md'
    }
    else if(that.data.index==2)
    {
      files='cloud://cloud1-7gbhxuxd395adfde.636c-cloud1-7gbhxuxd395adfde-1310914803/news/new2_html.md'
    }
    else if(that.data.index==3)
    {
      files='cloud://cloud1-7gbhxuxd395adfde.636c-cloud1-7gbhxuxd395adfde-1310914803/news/new3_html.md'
    }
    else if(that.data.index==4)
    {
      files='cloud://cloud1-7gbhxuxd395adfde.636c-cloud1-7gbhxuxd395adfde-1310914803/news/new4_html.md'
    }
    wx.cloud.downloadFile({
      fileID: files,
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
        const fs = wx.getFileSystemManager()
        fs.readFile({
          filePath: res.tempFilePath,
          encoding: 'utf8',
          position: 0,
          success(res) {
            let obj = app.towxml(res.data,'markdown',{
            theme:'light', //主题 dark 黑色，light白色，不填默认是light
            base:"www.xxx.com",
              events:{      //为元素绑定的事件方法
                tap:e => {
                  console.log('tap',e);
                },
                change:e => {
                  console.log('todo',e);
                }
              }
            });
           //更新解析数据
            that.setData({
              article:obj,
            });
          },
          fail(res) {
            console.error(res)
          }
        })
      },
      fail: err => {
        // handle error
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