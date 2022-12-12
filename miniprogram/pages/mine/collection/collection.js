Page({
    data: {
        all_likes: []
    },
    onShow: function () {
        wx.cloud.callFunction({
            name: 'getLands',
            data: {type: 'like'}
        }).then(res => {
            this.setData({
                all_likes: res.result.data
            })
        })
    },

    getAllInformation: function () {
        wx.cloud.callFunction({
            name: 'search',
        }).then(res => {
            this.setData({
                all_likes: res.result.data
            })
        })
    },
    returnToLastPage: function () {
        wx.navigateBack({
            delta: 1
        })
    },

    deleteCollection: function (data) {
        // console.log(data.currentTarget.dataset.id)
        const that = this
        wx.showModal({
            title: '选择',
            content: '您确定要删除此收藏么',
            success: result => {
                if (result.confirm) {
                    wx.cloud.callFunction({
                        name: 'markLike',
                        data: {
                            land: data.currentTarget.dataset.id,
                            mark: false
                        }
                    })
                    var i = 0
                    for (; i < that.data.all_likes.length; i++) {
                        if (that.data.all_likes[i]._id === data.currentTarget.dataset.id) {
                            let temp = that.data.all_likes
                            temp.splice(i, 1)
                            this.setData({
                                all_likes: temp
                            })
                            return
                        }
                    }
                }
            }
        })
    }
})