// pages/frontPage/frontPage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [{
        id: 0,
        type: 'image',
        url: 'cloud://cloud1-7gbhxuxd395adfde.636c-cloud1-7gbhxuxd395adfde-1310914803/picture/background_1.jpg'
      }, {
        id: 1,
          type: 'image',
          url: 'cloud://cloud1-7gbhxuxd395adfde.636c-cloud1-7gbhxuxd395adfde-1310914803/picture/background_2.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'cloud://cloud1-7gbhxuxd395adfde.636c-cloud1-7gbhxuxd395adfde-1310914803/picture/background_3.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'cloud://cloud1-7gbhxuxd395adfde.636c-cloud1-7gbhxuxd395adfde-1310914803/picture/background_4.jpg'
      }, {
        id: 4,
        type: 'image',
        url: 'cloud://cloud1-7gbhxuxd395adfde.636c-cloud1-7gbhxuxd395adfde-1310914803/picture/background_5.png'
      }],
      region:['省','市','区'],
      items: [
        {value: '0', name: '耕地',checked: false},
        {value: '1', name: '林地',checked: false},
        {value: '2', name: '草地',checked: false},
        {value: '3', name: '其他',checked: false}
      ],
      isPicked: 0
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  waitToWrite:function(){
    wx.showToast({
      title: '敬请期待',
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  ArrayIsEqual(arr1, arr2) {
    if (!arr1 || !arr2) {
      return false;
    }
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
        if (!arr1[i].equals(arr2[i]))
          return false;
      } else if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  },
  jumpToSearch:function () {
    if(this.ArrayIsEqual(this.data.region,['省','市','区'])){
      wx.showToast({
        title: '请选择地区',
        icon: 'error',
        duration: 2000//持续的时间
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/index/search/search',
        success: (res) => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
          region: this.data.region,
          items: this.data.items
        })
        }
      })
    }
    
    
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items
    })
  },
  jumpToNews1:function(){
    wx.navigateTo({
      url: '/pages/index/news/news',
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
        index: 1
      })
      }
    })
  },
  jumpToNews2:function(){
    wx.navigateTo({
      url: '/pages/index/news/news',
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
        index: 2
      })
      }
    })
  },
  jumpToNews3:function(){
    wx.navigateTo({
      url: '/pages/index/news/news',
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
        index: 3
      })
      }
    })
  },
  jumpToNews4:function(){
    wx.navigateTo({
      url: '/pages/index/news/news',
      success: (res) => {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
        index: 4
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

    },

    jumpToLink: function () {
        wx.navigateTo({
            url: "https://cn.bing.com/images/trending?FORM=ILPTRD"
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

    jumpToMinePage: function () {
        wx.navigateTo({
            url: "../landDetails/landDetails"
        })
    },

    getAllLandsInfo: function () {
        var that = this
        wx.cloud.callFunction({
            name: 'getLands',
            data: {type: 'search', filter: {}}
        }).then(res => {
            that.setData({
                all_lands_infor: res.result.data
            })
        })
    },

    jumpToDetail: function () {
        wx.navigateTo({
            url: '/pages/landDetails/landDetails'
        })
    },

    test: function () {
        console.log(this.data.all_likes)
    }
})