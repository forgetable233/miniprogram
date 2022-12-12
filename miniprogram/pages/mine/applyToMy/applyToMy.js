Page({
    data: {
        allApply: [],
        haveApply: false
    },
    onLoad: function (options) {
        // console.log('enter')
        wx.cloud.callFunction({
            name: 'getLands',
            data: {
                type: 'post',
            }
        }).then(res => {
            // console.log(res)
            if (res.result.data.length !== 0) {
                let i = 0
                for (; i < res.result.data.length; i++) {
                    // console.log(res.result)
                    // console.log(res.result[i].hire.length)
                    if (res.result.data[i].hire.length !== 0) {
                        this.setData({
                            allApply: res.result.data,
                            haveApply: true
                        })
                        return
                    }
                }
            }
        })
    },

    jumpToApplyer: function (data) {
        wx.navigateTo({
            url: '/pages/mine/applyDetails/applyDetails?id=' + data.currentTarget.dataset.id
        })
    }
});