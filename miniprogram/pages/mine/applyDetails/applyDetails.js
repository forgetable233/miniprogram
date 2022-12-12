import {el, els, le} from "../../../towxml/parse/parse2/entities/maps/entities";

Page({
    data: {
        currentId: '',
        applicants: []
    },

    onLoad: function (options) {
        const that = this;
        console.log(options)
        wx.cloud.callFunction({
            name: 'getLandDetails',
            data: {
                id: options.id
            },
            success: res => {
                that.setData({
                    applicants: res.result.data.hire,
                    currentId: options.id
                })
            },
            fail: err => {
                console.log(err)
            }
        })
    },
    // TODO 后端有问题 同时刷新问题
    acceptApply: function (data) {
        const that = this
        wx.showModal({
            title: '选择',
            content: '您确定要通过么',
            confirmText: '确定',
            cancelText: '取消',
            success: result => {
                if (result.confirm) {
                    wx.cloud.callFunction({
                        name: 'postHire',
                        data: {
                            type: 'accept',
                            id: that.data.currentId
                        }
                    }).then(res => {
                        if (res.result.errCode === 200) {
                            wx.showToast({
                                title: '成功通过',
                                icon: 'success',
                                duration: 2000,
                                success: res => {
                                    setTimeout(() => {
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    }, 2000)
                                }
                            })
                        } else {
                            wx.showToast({
                                title: '发生错误',
                                icon: 'error',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        })
    },

    refuseApply: function (data) {
        const that = this
        wx.showModal({
            title: '选择',
            content: '您确定要拒绝么',
            confirmText: '确定',
            cancelText: '取消',
            success: result => {
                console.log(result)
                if (result.confirm) {
                    wx.cloud.callFunction({
                        name: 'postHire',
                        data: {
                            type: 'refuse',
                            id: that.data.id
                        }
                    }).then(res => {
                        if (res.result.errCode === 200) {
                            let temp = that.data.applicants
                            let i = 0
                            for (; i < that.data.applicants.length; i++) {
                                if (that.data.applicants[i]._id === data.currentTarget.dataset.id) {
                                    temp.splice(i, 1)
                                    break
                                }
                            }
                            this.setData({
                                applicants: temp
                            })
                            wx.showToast({
                                title: '拒绝成功',
                                icon: 'success',
                                duration: 2000
                            })
                        } else {
                            wx.showToast({
                                title: '发生错误',
                                icon: 'error',
                                duration: 2000
                            })
                        }
                    })
                }
            }
        })
    }
});