const app = getApp()

Component({
    properties: {
        background: {
            type: String,
            value: 'rgba(255, 255, 255, 1)'
        },
        titleText: {
            type: String,
            value: '导航栏'
        },
        transmit: {
            type: Boolean,
            value: false
        },
        
    },
    attached: function () {
        var that = this;
        that.setNavSize();
        // that.setStyle();
    },
    data: {},
    methods: {
        setNavSize: function () {
            var that = this
                , statusHeight = app.systemInfo.statusBarHeight
                , navHeight;
            if (!app.systemInfo.isIOS) {
                navHeight = 48;
            } else {
                navHeight = 44;
            }
            that.setData({
                // statusHeight: statusHeight,
                status: statusHeight,
                navHeight: navHeight
            })
        },
        back: function () {
            wx.navigateBack({
                delta: 1
            })
            this.triggerEvent('back', {back: 1})
        },
        home: function () {
            this.triggerEvent('home', {});
        }
    }
})



