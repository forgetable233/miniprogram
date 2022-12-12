// pages/search/search.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: getApp().globalData.StatusBar,
        // select: [{
        //     title: '地理位置',
        //     open: false
        // },
        //     {
        //         title: '土地类型',
        //         open: false
        //     },
        //     {
        //         title: '面积区间',
        //         open: false
        //     },
        //     {
        //         title: '价格区间',
        //         open: false
        //     }
        // ],
        // indexSign: '',
        // index: 0,
        // open: false,
        // selectType: [
        //     {name: '耕地', checked: 0},
        //     {name: '园林', checked: 0},
        //     {name: '牧草', checked: 0},
        //     {name: '其他', checked: 0},
        // ],
        // selectArea: [
        //     {name: '100以下', checked: 0},
        //     {name: '100-1000', checked: 0},
        //     {name: '1000以上', checked: 0},
        // ],
        // selectMoney:[
        //     {name: '1000以下', checked: 0},
        //     {name: '1000-10000', checked: 0},
        //     {name: '10000以上', checked: 0},
        // ],
        // option1: [
        //     { text: '当前地区', value: 0 },
        //     { text: '新款商品', value: 1 },
        //     { text: '活动商品', value: 2 },
        //   ],
        //   option2: [
        //     { text: '类型不限', value: 0 },
        //     { text: '耕地', value: 1 },
        //     { text: '林地', value: 2 },
        //     { text: '园地', value: 3 },
        //     { text: '草地', value: 4 },
        //     { text: '养殖用地', value: 5 },
        //     { text: '住宅用地', value: 6 },
        //     { text: '工矿存储', value: 7 },
        //     { text: '商服用地', value: 8 },
        //     { text: '公共用地', value: 9 },
        //     { text: '农房', value: 10 },
        //     { text: '水域', value: 11 },
        //     { text: '其他用地', value: 12 },
        //   ],
          option3: [
            { text: '流转不限', value: 0 },
            { text: '转让', value: 1 },
            { text: '租让', value: 2 },
            { text: '转包', value: 3 },
            { text: '互换', value: 4 },
            { text: '入股', value: 5 },
            { text: '合作', value: 6 },
          ],
          option4: [
            { text: '面积不限', value: 0 },
            { text: '10亩以下', value: 1 },
            { text: '10-100亩', value: 2 },
            { text: '100-1000亩', value: 3 },
            { text: '1000亩以上', value: 4 },
          ],
        //   value1: 0,
        //   value2: 0,
          value3: 0,
          value4: 0,
        // navBarHeight: 0,
        // show: false,
        itemTitle1: '当前地区',
        itemTitle2: '类型不限',
        region:['省','市','区'],
        landInfo: [],
        landType: '耕地',
        bgColor: 'bg-red',
        mainActiveIndex: 0,
        activeId: 10,
        items: [
            {
                text: '类型不限',
                children: [
                  {text: '类型不限',id: 10}
                ]
            },
            {
                text: '耕地',
                children: [
                  {text: '水田',id: 0},
                  {text: '水浇地',id: 1},
                  {text: '旱地',id: 2},
                  {text: '其他耕地',id: 3}
                ]
            },
            {
                text: '林地',
                disabled: false,
                children: [
                  {text: '有机林',id: 100},
                  {text: '灌木林地',id: 101},
                  {text: '其他林地',id: 102}
                ]
            },
            {
                text: '园地',
                children: [
                  {text: '果园',id: 200},
                  {text: '茶园',id: 201},
                  {text: '菜园',id: 202},
                  {text: '其他园地',id: 203}
                ]
            },
            {
                text: '草地',
                children: [
                  {text: '天然牧草地',id: 300},
                  {text: '灌木林地',id: 301},
                  {text: '其他林地',id: 302},
                ]
            },
            {
                text: '养殖用地',
                children: [
                  {text: '农场',id: 400},
                  {text: '畜牧养殖场',id: 401},
                  {text: '水产养殖',id: 402},
                  {text: '综合养殖',id: 403},
                  {text: '设施农用地',id: 404}
                ]
            },
            {
                text: '住宅用地',
                children: [
                  {text: '城镇住宅用地',id: 500},
                  {text: '农村宅基地',id: 501}
                ]
            },
            {
                text: '工矿存储',
                children: [
                  {text: '厂房',id: 600},
                  {text: '矿山用地',id: 601},
                  {text: '仓储用地',id: 602},
                  {text: '工业用地',id: 603}
                ]
            },
            {
                text: '商服用地',
                children: [
                  {text: '商业用地',id: 700},
                  {text: '综合用地',id: 701}
                ]
            },
            {
                text: '公共用地',
                children: [
                  {text: '科研用地',id: 800},
                  {text: '教育用地',id: 801},
                  {text: '医疗卫生用地',id: 802},
                  {text: '其他公共用地',id: 803}
                ]
            },
            {
                text: '农房',
                children: [
                  {text: '农家庭院',id: 900},
                  {text: '度假山庄',id: 901}
                ]
            },
            {
                text: '水域',
                children: [
                  {text: '河流',id: 1000},
                  {text: '湖泊',id: 1001},
                  {text: '水库',id: 1002},
                  {text: '坑塘',id: 1003},
                  {text: '沿河滩涂',id: 1004},
                  {text: '内陆滩涂',id: 1005},
                  {text: '水工建筑用地',id: 1006}
                ]
            },
            {
                text: '水域',
                children: [
                  {text: '河流',id: 1000},
                  {text: '湖泊',id: 1001},
                  {text: '水库',id: 1002},
                  {text: '坑塘',id: 1003},
                  {text: '沿河滩涂',id: 1004},
                  {text: '内陆滩涂',id: 1005},
                  {text: '水工建筑用地',id: 1006}
                ]
            },
            {
                text: '其他用地',
                children: [
                  {text: '交通运输',id: 1100},
                  {text: '其他特殊用地',id: 1101},
                  {text: '空闲用地',id: 1102},
                  {text: '盐碱地',id: 1103},
                  {text: '沙地',id: 1104},
                  {text: '裸地',id: 1105},
                  {text: '荒山',id: 1106},
                  {text: '荒地',id: 1107}
                ]
            },
        ],
        all_land: [],
        loadmore: true,
        isEmpty: false,
        transfer: 0,
        acreage: 0,
    },
    bindRegionChange: function (e) {
        this.setData({
          region: e.detail.value
        })
        this.update()
    },
    onClickNav({ detail = {} }) {
        this.setData({
          mainActiveIndex: detail.index || 0,
        });
      },
    
    onClickItem({ detail = {} }) {
        const activeId = this.data.activeId === detail.id ? null : detail.id;

        this.setData({ activeId });
        this.setData({ itemTitle2: detail.text});
        console.log("activeID")
        console.log(activeId)
        this.update();
    },
    
    jumpBack: function () {
        wx.navigateBack({
            delta: 1,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        const eventChannel = this.getOpenerEventChannel()
        // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
        var temp
        new Promise((resolve, reject) => {
            eventChannel.on('acceptDataFromOpenerPage', function(data) {
                temp=data
                resolve(temp)
                })
          }).then((res)=>{
            that.setData({
                region:temp.region
              })
            this.update()
          })
        if (!app.systemInfo.isIOS) {
            that.setData({
                navBarHeight: 48
            })
        } else {
            that.setData({
                navBarHeight: 44
            })
        }
        // that.setData({
        //     status: app.systemInfo.statusBarHeight
        // })
    },
    // skipSelect(e) {
    //     var index = e.currentTarget.dataset.index;
    //     var indexSign = this.data.indexSign;
    //     console.log('indexSign', index, indexSign);
    //     if (indexSign === '') {
    //         this.setData({
    //             open: true,
    //             indexSign: index
    //         })
    //     } else {
    //         if (indexSign === index) {
    //             this.setData({
    //                 open: false,
    //                 indexSign: ''
    //             })

    //         } else {
    //             this.setData({
    //                 open: true,
    //                 indexSign: index
    //             })
    //         }
    //     }
    //     console.log('indexSign', indexSign);
    // },
    // AreaSelect(e){
    //     var index = e.currentTarget.dataset.index;
    //     if(this.data.selectArea[index].checked==0)
    //     {
    //         this.setData({
    //             ['selectArea['+index+'].checked']: 1 
    //         })
    //     }
    //     else{
    //         this.setData({
    //             ['selectArea['+index+'].checked']: 0 
    //         })
    //     }
    // },
    // TypeSelect(e){
    //     var index = e.currentTarget.dataset.index;
    //     if(this.data.selectType[index].checked==0)
    //     {
    //         this.setData({
    //             ['selectType['+index+'].checked']: 1 
    //         })
    //     }
    //     else{
    //         this.setData({
    //             ['selectType['+index+'].checked']: 0 
    //         })
    //     }
    // },
    // MoneySelect(e){
    //     var index = e.currentTarget.dataset.index;
    //     if(this.data.selectMoney[index].checked==0)
    //     {
    //         this.setData({
    //             ['selectMoney['+index+'].checked']: 1 
    //         })
    //     }
    //     else{
    //         this.setData({
    //             ['selectMoney['+index+'].checked']: 0 
    //         })
    //     }
    // },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    count:function(o){
        var t = typeof o;
        if(t == 'string'){
                return o.length;
        }else if(t == 'object'){
                var n = 0;
                for(var i in o){
                        n++;
                }
                return n;
        }
        return 0;
    },
    getLand:function(e)
    {
        var sendData = {
            location: {
                province: this.data.region[0],
                city: this.data.region[1],
                county: this.data.region[2]
            }
        }
        if(this.data.activeId!=10)
        {
            sendData.type=[this.data.activeId];
        }
        if(this.data.transfer!=0)
        {

            sendData.transfer=[this.data.transfer];
        }
        if(this.data.acreage!=0)
        {
            if(this.data.acreage==1)
            {
                sendData.acreage=[0,10];
            }
            else if(this.data.acreage==2)
            {
                sendData.acreage=[10,100];
            }
            else if(this.data.acreage==3)
            {
                sendData.acreage=[100,1000];
            }
            else if(this.data.acreage==4)
            {
                sendData.acreage=1000;
            }
        }
        if(e==1)
        {
            sendData.skip=this.data.all_land.length
        }
        wx.cloud.callFunction({
            name:'search',
            data: sendData
        }).then(res => {
            this.setData({
                all_land: res.result.data
            })
            var num=this.count(res.result.data)
            if(num!=20)
            {
                console.log(num)
                this.setData({
                    loadmore: false
                })
                if(num==0&&e==0)
                {
                    this.setData({
                        isEmpty: true
                    })
                }
                else {
                    if(this.data.isEmpty==true)
                    {
                        this.setData({
                            isEmpty: false
                        })
                    }
                }
            }
            console.log("getLand success")
        })
        
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },
    update:function(){
        this.getLand(0)
    },
    transferValue:function(value){
        this.setData({
            transfer: value.detail
        })
        console.log("transferValue")
        console.log(value.detail)
        this.update()
    },
    acreageValue:function({value}){
        this.setData({
            acreage: value
        })
        this.update()
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(this.data.loadmore==true)
        {
            this.getLand(1)
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    returnToLastPage: function () {
        console.log('Enter the return function')
        wx.navigateBack({
            delta: 1
        })
    }
})