// app.js
// 导入 system.js
const system = require('system')
// 小程序的主入口如下
App({
    // 引入`towxml3.0`解析方法
    towxml: require('/towxml/index'),
    //声明一个数据请求方法
    getText: (url, callback) => {
        wx.request({
            url: url,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (typeof callback === 'function') {
                    callback(res);
                }
                ;
            }
        });
    },
    // 存放目前的所有的设备信息，保存在app.js中，文件中为全局参数进行使用
    // 在每个界面中通过 const app = getApp() 获取app.systemInfo
    systemInfo: {},

    bigLandType: [
        {id: 0, type: '耕地', checked: true},
        {id: 1, type: '林地', checked: false},
        {id: 2, type: '园地', checked: false},
        {id: 3, type: '草地', checked: false},
        {id: 4, type: '养殖用地', checked: false},
        {id: 5, type: '住宅用地', checked: false},
        {id: 6, type: '工矿存储', checked: false},
        {id: 7, type: '商服用地', checked: false},
        {id: 8, type: '公共用地', checked: false},
        {id: 9, type: '农房', checked: false},
        {id: 10, type: '水域', checked: false},
        {id: 11, type: '其他用地', checked: false}
    ],
    smallLandType: [
        {
            id: 0,
            types: [
                {id: 0, type: '水田', checked: false},
                {id: 1, type: '水浇地', checked: false},
                {id: 2, type: '旱地', checked: false},
                {id: 3, type: '其他耕地', checked: false},
            ]
        },
        {
            id: 1, types: [
                {id: 0, type: '有林地', checked: false},
                {id: 1, type: '灌木林地', checked: false},
                {id: 2, type: '其他林地', checked: false}
            ]
        },
        {
            id: 2, types: [
                {id: 0, type: '果园', checked: false},
                {id: 1, type: '茶园', checked: false},
                {id: 2, type: '菜园', checked: false},
                {id: 3, type: '其他园地', checked: false},
            ]
        },
        {
            id: 3, types: [
                {id: 0, type: '天然牧草地', checked: false},
                {id: 1, type: '灌木林地', checked: false},
                {id: 2, type: '其他林地', checked: false}
            ]
        },
        {
            id: 4, types: [
                {id: 0, type: '农场', checked: false},
                {id: 1, type: '畜牧养殖', checked: false},
                {id: 2, type: '水产养殖', checked: false},
                {id: 3, type: '综合养殖', checked: false},
                {id: 4, type: '设施农用地', checked: false},
            ]
        },
        {
            id: 5, types: [
                {id: 0, type: '城镇住宅用地', checked: false},
                {id: 1, type: '农村宅基地', checked: false}
            ]
        },
        {
            id: 6, types: [
                {id: 0, type: '厂房', checked: false},
                {id: 1, type: '矿山用地', checked: false},
                {id: 2, type: '仓储用地', checked: false},
                {id: 3, type: '工业用地', checked: false}
            ]
        },
        {
            id: 7, types: [
                {id: 0, type: '商业用地', checked: false},
                {id: 1, type: '综合用地', checked: false}
            ]
        },
        {
            id: 8, types: [
                {id: 0, type: '科研用地', checked: false},
                {id: 1, type: '教育用地', checked: false},
                {id: 2, type: '医疗卫生用地', checked: false},
                {id: 3, type: '其他公共用地', checked: false}
            ]
        },
        {
            id: 9, types: [
                {id: 0, type: '农家庭院', checked: false},
                {id: 1, type: '度假山庄', checked: false}
            ]
        },
        {
            id: 10, types: [
                {id: 0, type: '河流', checked: false},
                {id: 1, type: '湖泊', checked: false},
                {id: 2, type: '水库', checked: false},
                {id: 3, type: '坑塘', checked: false},
                {id: 4, type: '沿河滩涂', checked: false},
                {id: 5, type: '内陆滩涂', checked: false},
                {id: 6, type: '水工建筑用地', checked: false}
            ]
        },
        {
            id: 11, types: [
                {id: 0, type: '交通运输', checked: false},
                {id: 1, type: '其他特殊用地', checked: false},
                {id: 2, type: '空闲用地', checked: false},
                {id: 3, type: '盐碱地', checked: false},
                {id: 4, type: '沙地', checked: false},
                {id: 5, type: '裸地', checked: false},
                {id: 6, type: '荒山', checked: false},
                {id: 7, type: '荒地', checked: false}
            ]
        }
    ],
    circulationTypes: [
        {id: 0, type: '转让', checked: false},
        {id: 1, type: '租让', checked: false},
        {id: 2, type: '转包', checked: false},
        {id: 3, type: '互换', checked: false},
        {id: 4, type: '入股', checked: false},
        {id: 5, type: '合作', checked: false}
    ],

    // 小程序的启动函数
    onLaunch: function () {
        var that = this
        // 检查版本更新（目前可能还用不到 )
        system.update()
        // 获取设备的信息
        system.get((info) => {
            that.systemInfo = info
            // 测试一下，输出一下设备的信息
            // console.log('设备信息如下', info)
        })
        wx.getSystemInfo({
            success: e => {
                that.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                that.globalData.Custom = custom;
                let CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                that.globalData.CustomBar = CustomBar;
                //适配全面屏底部距离
                if (CustomBar > 75) {
                    that.globalData.tabbar_bottom = "y"
                }
            }
        })

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                // env: 'my-env-id',
                traceUser: true,
            })
        }

        // 尝试登录
        wx.cloud.callFunction({
            name: 'login'
        }).then(res => {
            if (res.result.errCode === 200) {
                that.globalData.userInfo = res.result.data
            }
        })
    },

    globalData: {
        userInfo: null
    }
});
