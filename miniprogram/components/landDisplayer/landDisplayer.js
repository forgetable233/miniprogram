Component({
    properties: {
        land: {
            type: Object,
            value: undefined
        },
        cardType: {
            type: String,
            value: 'info'
        }
    },

    data: {
        targetUrl: ''
    },
    lifetimes: {
        attached: function () {
            let that = this
            console.log(that.data.land)
            if (that.data.cardType === 'info') {
                this.setData({
                    targetUrl:  '../../landDetails/landDetails?id=' + this.data.land._id
                })
            } else if (that.data.cardType === 'order') {
                this.setData({
                    targetUrl: '../../orderProcess/orderProcess?id=' + this.data.land._id
                })
            } else {
                console.log('error occurred!!!!!!组件类型错误')
            }
        }
    },

    methods: {
        jumpToNav: function () {

        }
    }
})
