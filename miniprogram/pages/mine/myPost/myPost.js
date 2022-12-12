import {el} from "../../../towxml/parse/parse2/entities/maps/entities";

const app = getApp()

Page({
    data: {
        allPost: [],
        hasPost: false
    },
    onLoad: function (options) {
        wx.cloud.callFunction({
            name: 'getLands',
            data: {
                type: 'post'
            }
        }).then(res => {
            if (res.result.data.length !== 0) {
                this.setData({
                    allPost: res.result.data,
                    hasPost: true
                })
            }
        })
    },

    deltePost: function (data) {
        const that = this
        console.log(data)
        wx.showModal({
            title: '选择',
            content: '您确定要删除此项目么',
            confirmText: '确定',
            cancelText: '取消',
            success: result => {
                if (result.confirm) {
                    let i = 0
                    for (; i < that.data.allPost.length; i++) {
                        if (that.data.allPost[i]._id === data.currentTarget.dataset.id) {
                            wx.cloud.callFunction({
                                name: 'postLand',
                                data: {
                                    id: that.data.allPost[i]._id,
                                    delete: true
                                }
                            }).then(res => {
                                if (res.result.errCode !== 200) {
                                    // TODO 细分失败原因
                                    wx.showToast({
                                        title: '删除失败',
                                        icon: 'error',
                                        duration: 2000
                                    })
                                } else {
                                    // TODO 刷新失败问题
                                    let temp = that.data.allPost
                                    temp.splice(i, 1)
                                    this.setData({
                                        allPost: temp
                                    })
                                    wx.showToast({
                                        title: '删除成功',
                                        icon: 'success',
                                        duration: 2000
                                    })
                                }
                            })
                            return
                        }
                    }
                }
            }
        })
    },

    editPost: function (data) {
        const that = this
        wx.showModal({
            title: '选择',
            content: '您确定要修改么',
            confirmText: '确定',
            cancelText: '取消',
            success: result => {
                if (result.confirm) {
                    wx.navigateTo({
                        url: '/pages/mine/publishLand/publishLand?now=' + data.currentTarget.dataset.id
                    })
                }
            }
        })
    },

    jumpToDetail: function (data) {
        console.log('enter')
        wx.navigateTo({
            url: '/pages/landDetails/landDetails?id=' + data.currentTarget.dataset.id
        })
    }
});