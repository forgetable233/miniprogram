Page({
    data: {
        paths: []
    },

    onShow: function () {

    },

    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'getLands',
            data: {type: 'history'}
        }).then(res => {
            this.setData({
                paths: res.result.data
            })
        })
    },

    returnToLastPage: function () {
        console.log('Enter the return function')
        wx.navigateBack({
            delta: 1
        })
    },

    deletePath: function (data) {
        // console.log(data.currentTarget.dataset.id)
        const that = this
        if (data.currentTarget.dataset.id === '') {
            wx.showModal({
                title: '选择',
                content: '您确定要清空记录么？',
                success: result => {
                    if (result.confirm) {
                        wx.cloud.callFunction({
                            name: 'deleteHistory'
                        })
                        this.setData({
                            paths: []
                        })
                    }
                }
            })
        } else {
            wx.showModal({
                title: '选择',
                content: '您确定要删除此记录么',
                success: result => {
                    if (result.confirm) {
                        wx.cloud.callFunction({
                            name: 'deleteHistory',
                            data: {
                                land: data.currentTarget.dataset.id,
                            }
                        })
                        var i = 0
                        for (; i < that.data.paths.length; i++) {
                            if (that.data.paths[i]._id === data.currentTarget.dataset.id) {
                                let temp = that.data.paths
                                temp.splice(i, 1)
                                this.setData({
                                    paths: temp
                                })
                                return
                            }
                        }
                    }
                }
            })
        }
    }
})