Page({
    data: {
        landInfo: [],
        landType: '耕地',
        bgColor: 'bg-red'
    },
    onLoad: function (options) {
        let that = this
        // console.log(options.id)
        wx.cloud.callFunction({
            name: 'getLandDetails',
            data: {
                // id: options.id
                id: '5464a29462594fa0001775375367fa91'
            },
            success: res => {
                that.setData({
                    landInfo: res.result.data
                })
                if (that.data.landInfo.type === 0) {
                    that.setData({
                        landType: '耕地'
                    })
                } else if (that.data.landInfo.type === 1) {
                    that.setData({
                        landType: '水田'
                    })
                } else if (that.data.landInfo.type === 2) {
                    that.setData({
                        landType: '园林'
                    })
                } else {
                    that.setData({
                        landType: '其他'
                    })
                }
            },
            fail: _err => {
                wx.showToast({
                    title: '无法对应信息',
                    icon: 'error',
                    duration: 2000
                })
            }
        })
    },

    switchColor: function () {
        let that = this
        if (that.data.bgColor === 'bg-red') {
            this.setData({
                bgColor: 'bg-green'
            })
        } else {
            this.setData({
                bgColor: 'bg-red'
            })
        }
    }
});