Page({
    data: {
        all_hired: []
    },
    onShow: function () {
        wx.cloud.callFunction({
            name: 'getLands',
            data: {type: 'hire'}
        }).then(res => {
            this.setData({
                all_hired: res.result.data
            })
        })
    },
    returnToLastPage: function () {
        console.log('Enter the return function')
        wx.navigateBack({
            delta: 1
        })
    },

    getAll: function () {
        wx.cloud.callFunction({
            name: 'search',
        }).then(res => {
            this.setData({
                all_hired: res.result.data
            })
        })
    }
})