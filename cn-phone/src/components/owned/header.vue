<template>
    <div class="header" id="header">
        <!-- 公共头部 -->
        <!-- 酒店列表弹窗 -->
        <div class="el-select-dropdown" v-show="fotshow">
            <div class="el-scrollbar">
                <div class="el_tit_top">
                    <div class="el_close" @click="el_guan()">关闭</div>
                    <div class="el_selec">酒店选择</div>
                </div>
                <div class="el-select-dropdown__wrap">
                    <ul class="el-scrollbar__view el-select-dropdown__list">
                        <ul class="el-select-group__wrap" v-for="(item,index) in city" :key="index">
                            <li class="el-select-group__title">{{index}}</li>
                            <li>
                                <ul class="el-select-group">
                                    <li class="el-select-dropdown__item"
                                        :class="mudiIndexnum1==index&&mudiIndexnum2==indexMsg?'hover':''"
                                        v-for="(listMsg,indexMsg) in item" :key="indexMsg"
                                        @click="changejiu(listMsg,indexMsg,index)">
                                        <span>{{listMsg.hotel_name}}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
        <div class="header_head">

            <div class="header_logo" @click="menu(0, menulist[0].id)">
                <!-- <img src="../../assets/img/head_logo.png" alt="" /> -->
                <img :src="Baseurl+logos" alt="">
            </div>
            <!-- <div class="switch" @click.stop="select()">
                <div class="switch_wen">
                <p>{{mudiIndexnum1}}</p>
                <img
                    src="../../assets/img/botxia.png"
                    :style="fotshow ? 'transform: rotate(180deg)' : ''"
                    alt=""
                />
                </div>
            </div> -->
            <div class="head_operation">
                <!-- <div class=""></div> -->
                <div class="huiyuan">
                    <img class="huiyuanimg" src="../../assets/img/huiyuan.png" alt="" @click="btns1">
                    <p v-if="accountNumber!=''&&accountNumber!=null"> {{accountNumber}}</p>
                </div>

                <div class="header_menu" v-if="!menushow" @click="kai()">
                    <img src="../../assets/img/menuk.png" alt="">
                </div>
                <div class="header_menu" v-if="menushow" @click="guan()">
                    <img src="../../assets/img/menug.png" alt="">
                </div>
            </div>
        </div>
        <div class="menu" v-if="menushow">
            <div class="menutop">
                <!-- <div class="menulist menulistone" @click="pinpai()">
                    <img class="pinretu" src="../../assets/img/pinretu.png" alt="">
                    <p>返回品牌页</p>
                </div> -->
                <a class="menulist menulistone" href="https://empark.com.cn/" style="text-decoration: none;">
                    <img class="pinretu" src="../../assets/img/pinretu.png" alt="">
                    <p>返回品牌页</p>
                </a>
                <div class="menulist" v-for="(item,index) in menulist" :key="index" @click="menu(index)">
                    {{item.name}}
                </div>
            </div>
            <div class="yuyan">
                <div class="yuyans  yuyanone" @click="yuyan()">
                    <div class="diqiu"><img src="../../assets/img/diqiu.png" alt=""></div>
                    <p>中文</p>
                    <div class="anniu" :class="{active:yuyanshow}">
                        <img src="../../assets/img/xialag.png" alt="">
                    </div>
                </div>
                <div class="yuyans yuyantwo" v-if="yuyanshow" @click="yuyanchange">
                    <div class="diqiu"></div>
                    <p>English</p>
                </div>
            </div>
            <div class="lgins" v-if="accountNumber==''||accountNumber==null">
                <div class="lgins_btn" @click="btns1()">登录</div>
                <div class="lgins_btn" @click="btns2()">注册</div>
            </div>
            <div class="yonghuxinxi" v-if="accountNumber!=''&&accountNumber!=null">
                <img src="../../assets/img/huiyuan.png" alt="">
                <p> {{accountNumber}}</p>
                <div class="rig_tuichu" @click="goorderlist">我的订单</div>
                <div class="rig_tuichu" @click="exitaccount">退出登录</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                token: '',
                hotel_id: '',
                hotelist: [],
                hotelcode: '',
                logos: '',
                menulist: '',
                menushow: false,//开关
                yuyanshow: false,//语言切换
                // meau:['酒店与度假酒店','住宿','餐饮','宴会','体验','世纪会'],
                // isTrue:1,
                isTrue: localStorage.getItem("istrue"),
                denglv: 0,
                tipshow: false,
                //注册
                registerNumber: '',
                tipstext: '',
                code: '',
                registerCode: "",
                registerPassword1: "",
                registerPassword2: "",
                // 登录
                signNumber: '',
                signPassword: '',

                //忘记密码
                forgrtshow: false,
                forgetnumber: '',
                forgetcode: '',
                forgetmima: '',
                forgetmima2: '',
                //登录成功状态
                accountNumber: sessionStorage.getItem("accountNumber"),


                fotshow: false,
                fotslist: [],
                city: [],
                city_centry: [],
                mudiIndex: "",
                mudiIndexnum1: "",
                mudiIndexnum2: "",
                mudisaaa: ''
            };
        },

        created() {
            this.gettoken()
            this.token = sessionStorage.getItem("token");
            this.hotel_id = sessionStorage.getItem("hotel_id");
            this.hotelcode = sessionStorage.getItem("hotelcode");
            // console.log(this.hotelcode)
            this.diaoyong()
            this.getinfolist()
            this.getdiqulist()
        },
        inject: ['reload'],
        methods: {
            gettoken() {
                var that = this;
                that.$axios
                    .post(`${this.Baseurl}/hotel_state_token`)
                    .then(function (res) {
                    console.log(res.data.token);
                    sessionStorage.setItem("token", res.data.token);
                    that.token = res.data.token;
                    that.getdiqulist()
                    })
                    .catch((err) => console.log(err));
            },
            goorderlist(){
                this.$router.push({ name: "orderlist" });
            },
            //底部选择
            select() {
                this.fotshow = !this.fotshow;
            },
            el_guan() {
                this.fotshow = false;
            },
            changejiu(listMsg, indexMsg, index) {
                console.log(listMsg)
                console.log(indexMsg)
                console.log(index)
                if (listMsg.path && listMsg.path != "") {
                    window.open(listMsg.path)
                } else {
                    this.fotshow = false
                    // this.mudishow = false;
                    // this.cityshow = false;
                    this.mudiIndex = listMsg.hotel_name;
                    this.mudiIndexnum1 = index
                    this.mudiIndexnum2 = indexMsg
                    console.log(index)
                    localStorage.setItem("mudiIndex", this.mudiIndex);
                    localStorage.setItem("mudiIndexnum1", index);
                    localStorage.setItem("mudiIndexnum2", indexMsg);
                    // console.log( this.mudiIndexnum1)
                    // console.log( this.mudiIndexnum2)

                    var that = this
                    sessionStorage.setItem("hotel_id", that.city[that.mudiIndexnum1][that.mudiIndexnum2].id);
                    console.log("酒店hotel_id:", sessionStorage.getItem("hotel_id"))

                    sessionStorage.setItem("hotelcode", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code);
                    console.log("酒店hotelcode:", sessionStorage.getItem("hotelcode"))

                    sessionStorage.setItem("codesh", that.city[that.mudiIndexnum1][that.mudiIndexnum2].code);
                    console.log("酒店codesh:", sessionStorage.getItem("codesh"))

                    sessionStorage.setItem("hotelname", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name);
                    console.log("酒店hotelname:", sessionStorage.getItem("hotelname"))
                    sessionStorage.setItem("dituxinxi", JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
                    this.reload()
                }

            },
            getdiqulist() {
                var that = this;
                that.$axios
                    .get(`${this.Baseurl}hotel_new?web_token=${that.token}`)
                    .then(function (res) {
                        that.city = res.data.data;
                        console.log(
                            "citycitycitycitycitycitycitycitycitycitycitycitycitycitycity"
                        );
                        console.log(that.city);
                        if (
                            localStorage.getItem("mudiIndex") &&
                            localStorage.getItem("mudiIndex") != ""
                        ) {
                            that.mudiIndex = localStorage.getItem("mudiIndex");
                            that.mudiIndexnum1 = localStorage.getItem("mudiIndexnum1");
                            that.mudiIndexnum2 = localStorage.getItem("mudiIndexnum2");
                            console.log(that.mudiIndexnum1);
                            console.log(that.mudiIndexnum2);
                            that.city_centry = that.city[that.mudiIndexnum1];

                            sessionStorage.setItem(
                                "hotel_id",
                                that.city[that.mudiIndexnum1][that.mudiIndexnum2].id
                            );
                            sessionStorage.setItem(
                                "hotelcode",
                                that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code
                            );
                            sessionStorage.setItem(
                                "codesh",
                                that.city[that.mudiIndexnum1][that.mudiIndexnum2].code
                            );
                            sessionStorage.setItem(
                                "hotelname",
                                that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name
                            );
                            sessionStorage.setItem("dituxinxi", JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
                        } else {
                            that.city_centry = that.city["北京"];
                            that.mudiIndex = that.city["北京"][0].hotel_name;
                            that.mudiIndexnum1 = "北京";
                            that.mudiIndexnum2 = 0;
                            localStorage.setItem("mudiIndex", that.mudiIndex);
                            localStorage.setItem("mudiIndexnum1", "北京");
                            localStorage.setItem("mudiIndexnum2", 0);

                            sessionStorage.setItem("hotel_id", that.city["北京"][0].id);
                            sessionStorage.setItem(
                                "hotelcode",
                                that.city["北京"][0].hotel_code
                            );
                            sessionStorage.setItem("codesh", that.city["北京"][0].code);
                            sessionStorage.setItem(
                                "hotelname",
                                that.city["北京"][0].hotel_name
                            );
                            sessionStorage.setItem("dituxinxi", JSON.stringify(that.city["北京"][0]))
                        }
                        console.log(that.city_centry);
                    })
                    .catch((err) => console.log(err));
            },
            yuyanchange() {
                var nowhref = window.location.href
                var newhref = nowhref.replace('https://','https://en.')
                // var newhref = nowhref.replace("ls_dfdcn.sc798.com", "en_zs.sc798.com");
                console.log(newhref)
                window.location.href = newhref
            },
            // gettoken() {
            //     var that = this;
            //     that.$axios
            //         .post(`${this.Baseurl}/hotel_state_token`)
            //         .then(function (res) {
            //         console.log(res.data.token);
            //         sessionStorage.setItem("token", res.data.token);
            //         that.token = res.data.token;
            //         //http://ssjydfd.sc798.com/public_header
            //         // this.reload()
            //         that.getlist();
            //         })
            //         .catch((err) => console.log(err));
            // },
            // getlist() {
            // var that = this;
            // that.$axios
            //     .get(`${this.Baseurl}hotel_list?web_token=${that.token}`)
            //     .then(function (res) {
            //     console.log(res);
            //     that.hotelist = res.data.data;
            //     // console.log("获取到index", sessionStorage.getItem("hotel_index_data"))
            //     if (
            //         sessionStorage.getItem("hotel_index_data") != null &&
            //         sessionStorage.getItem("hotel_index_data") != ""
            //     ) {
            //         for (let i = 0; i < that.hotelist.length; i++) {
            //         if (
            //             that.hotelist[i].id ==
            //             sessionStorage.getItem("hotel_index_data")
            //         ) {
            //             var index_data = parseInt(i);
            //         }
            //         }
            //         sessionStorage.setItem(
            //         "hotelcode",
            //         that.hotelist[index_data].hotel_code
            //         );
            //         sessionStorage.setItem("codesh", that.hotelist[index_data].code);
            //         sessionStorage.setItem(
            //         "hotelname",
            //         that.hotelist[index_data].hotel_name
            //         );
            //         that.hotel_id = that.hotelist[index_data].id;
            //         that.hotelcode = that.hotelist[index_data].hotel_code;
            //     } else {
            //         sessionStorage.setItem("hotel_id", that.hotelist[0].id);
            //         sessionStorage.setItem("hotelcode", that.hotelist[0].hotel_code);
            //         sessionStorage.setItem("codesh", that.hotelist[0].code);
            //         sessionStorage.setItem("hotelname", that.hotelist[0].hotel_name);
            //         that.hotel_id = that.hotelist[0].id;
            //         that.hotelcode = that.hotelist[0].hotel_code;
            //     }
            //     that.getinfolist()
            //     })
            //     .catch((err) => console.log(err));
            // },
            // //获取头部信息
            getinfolist() {
                // if(this.web_token==null || this.hotel_id==null){
                //     this.reload();
                // }
                var that = this
                that.$axios
                    .post(`${this.Baseurl}public_header?web_token=${that.token}&hotel_id=${that.hotel_id}`)
                    .then(function (res) {
                        // console.log(res)
                        that.menulist = res.data.data.top_module_list
                        that.logos = res.data.data.this_hotel_logo.hotel_logo;
                        // console.log(that.menulist)
                        const fieldData = that.menulist
                        sessionStorage.setItem("fieldData", JSON.stringify(fieldData))
                    }).catch(err => console.log(err));
            },
            //打开菜单
            kai() {
                this.menushow = true
            },
            //关闭菜单
            guan() {
                this.menushow = false
            },
            //语言切换
            yuyan() {
                this.yuyanshow = !this.yuyanshow
            },
            //退出账号
            exitaccount() {
                sessionStorage.setItem("accountNumber", '');
                sessionStorage.setItem("loginfou", 2);
                this.reload();
            },

            //头部菜单切换
            menu(index) {
                this.isTrue = index
                if (index == 0) {
                    this.$router.push({ name: 'Hotel', })
                }
                if (index == 1) {
                    this.$router.push({ name: 'Rooms' })
                }
                if (index == 2) {
                    this.$router.push({ name: 'Meal' })
                }
                if (index == 3) {
                    this.$router.push({ name: 'Banquet' })
                }
                if (index == 4) {
                    this.$router.push({ name: 'Century' })
                }
                if (index == 5) {
                    this.$router.push({ name: 'Ambitus' })
                }
                this.reload();
                localStorage.setItem("istrue", this.isTrue);
            },
            //返回品牌页
            pinpai() {
                this.$router.push({ name: 'Pinpai' })
            },



            diaoyong() {
                this.denglv = localStorage.getItem("denglv");
            },
            btns1() {
                localStorage.setItem("denglv", 1);
                this.$router.push('/signin?date' + Date.now());
            },
            btns2() {
                localStorage.setItem("denglv", 2);
                this.$router.push('/signin?date' + Date.now());
            }
        },

    };
</script>
<style scoped>
    .yonghuxinxi {
        display: flex;
        align-items: center;
        padding: 4vw 8vw;
    }

    .yonghuxinxi img {
        width: 5vw;
        height: 5vw;
        display: block;
    }

    .yonghuxinxi p {
        font-size: 4vw;
        color: #000;
        margin-left: 3vw;
    }

    .yonghuxinxi div {
        width: 20vw;
        height: 8vw;
        background-color: #c4beb8;
        font-size: 4vw;
        color: #fff;
        text-align: center;
        line-height: 8vw;
        margin-left: 5vw;
    }

    .header {
        width: 100%;
        /* height: 140px; */
        height: 14.667vw;
    }

    .header .header_head {
        width: 89.333vw;
        width: 100%;
        padding: 0 5.333vw;
        box-sizing: border-box;
        height: 14.667vw;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        background-color: #fff;
        margin: auto;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
    }

    .header .header_head .header_logo {
        width: 33.200vw;
        height: 5.733vw;
    }

    .header .header_head .header_logo img {
        width: 100%;
        display: block;
    }

    .header .header_head .head_operation {
        /* margin-top: 13px; */
        /* margin-left: 60px; */
        /* display: flex;
        justify-content: space-between;
        flex: 1; */
        display: flex;
        margin-left: auto;
    }

    .header .header_head .head_operation .huiyuan {
        display: flex;
        align-items: center;
        margin-right: 7.333vw;
    }

    .header .header_head .head_operation .huiyuan .huiyuanimg {
        width: 4.800vw;
        height: 4.800vw;
    }

    .huiyuan p {
        width: 14vw;
        font-size: 3.5vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        margin-left: 2vw;
        color: #0e1c2d;
    }

    .header .header_head .head_operation .header_menu {
        width: 5.867vw;
        height: 4.533vw;
    }

    .header .header_head .head_operation .header_menu img {
        width: 100%;
        height: 100%;
    }

    .menu {
        width: 100%;
        height: calc(100% - 14.667vw);
        position: fixed;
        z-index: 99;
        top: 14.667vw;
        left: 0;
        background-color: #efefed;
        overflow-y: scroll;
        /* padding-top: 14.667vw; */
    }

    .menutop .menulist {
        width: 100%;
        height: 14.667vw;
        display: flex;
        align-items: center;
        padding: 0 8vw;
        box-sizing: border-box;
        border-top: 1px solid #efefed;
        background: #fff;
        font-size: 5vw;
    }

    .menutop .menulist p {
        font-size: 5vw;
        color: #000;
    }

    .menutop .menulist.menulistone {
        background-color: #d5b08b;
        border: none;
    }

    .menutop .menulist.menulistone p {
        margin-left: 2.533vw;
        color: #fff;
    }

    .menutop .menulist.menulistone .pinretu {
        width: 3.867vw;
        height: 3.333vw;
    }

    .yuyan .yuyans {
        display: flex;
        height: 14.667vw;
        align-items: center;
        padding: 0 8vw;
        box-sizing: border-box;

    }

    .yuyan .yuyans .diqiu {
        width: 3.867vw;
        height: 3.867vw;
        margin-right: 6.000vw;
    }

    .yuyan .yuyans .diqiu img {
        width: 100%;
        display: block;
    }

    .yuyan .yuyans .anniu {
        width: 3.067vw;
        height: 1.600vw;
        margin-left: auto;
        transform: rotate(-90deg);
        transition: all 0.3s;
    }

    .yuyan .yuyans .anniu.active {
        transform: rotate(0);
    }

    .yuyan .yuyans .anniu img {
        width: 100%;
        display: block;
    }

    .yuyan .yuyans p {
        color: #666666;
        font-size: 5vw;
    }

    .yuyans.yuyanone {
        border-bottom: 0.133vw solid #fff;
    }

    .yuyans.yuyantwo {
        background-color: #e1e1e1;
        /* border-top: 0.133vw solid #fff; */
    }

    .lgins {
        width: 100%;
        padding: 0 8vw;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        margin: 10.667vw 0;
    }

    .lgins .lgins_btn {
        width: 38.667vw;
        height: 10.667vw;
        background-color: #d5b08b;
        font-size: 5vw;
        color: #fff;
        text-align: center;
        line-height: 10.667vw;
    }

    .switch {
        min-width: 15vw;
        height: 7.6vw;
        box-sizing: border-box;
        border: 0.133vw solid #c5c5c5;
        position: relative;
        line-height: 7.6vw;
        text-align: center;
        font-size: 3vw;
        color: #5f5f5f;
        margin-left: 3vw;
    }

    .switch .switch_wen {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 0 2.133vw 0 3.467vw;
        box-sizing: border-box;
    }

    .switch .switch_wen p {
        font-size: 3vw;
        color: #5f5f5f;
        /* width: 22vw; */
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
    }

    .switch .switch_wen img {
        width: 1.934vw;
        height: 1vw;
        margin-left: 2vw;
    }


    .el-select-dropdown {
        position: fixed;
        z-index: 10000;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        top: 0;
        left: 0;
        background-color: #f6f6f6;
    }

    .el-scrollbar {
        overflow: hidden;
        position: relative;
    }

    .el-scrollbar .el_tit_top {
        padding: 0 5vw;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        /* height:11vw; */
        background-color: #fafafa;

        height: 14.667vw;
    }

    .el-scrollbar .el_tit_top .el_close {
        position: absolute;
        color: #000000;
        font-size: 4vw;
        left: 5vw;
    }

    .el-scrollbar .el_tit_top .el_selec {
        font-size: 5vw;
        color: #000000;
    }

    /* <div class="el_tit_top">
                    <div class="el_close">关闭</div>
                    <div class="el_selec">酒店选择</div>
                </div> */

    .el-select-dropdown__wrap {
        height: 100vh;
        overflow: scroll;
        /* margin-bottom: -3vw;
    margin-right: -3vw; */
    }

    .el-select-dropdown__list {
        list-style: none;
        /* padding: 2vw 0; */
        margin: 0;
        box-sizing: border-box;
    }

    /* .el-select-group__wrap:not(:last-of-type) {
  padding-bottom: 3vw;
} */
    .el-select-group__wrap {
        position: relative;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .el-select-group__title {
        padding-left: 5vw;
        font-size: 3.8vw;
        color: #a5a5a5;
        line-height: 10vw;
        background-color: #f3f3f3;
        border-bottom: 0.133vw solid #e4e7ed;
    }

    .el-select-group {
        margin: 0;
        padding: 0;
    }

    .el-select-dropdown__item {
        font-size: 4.5vw;
        padding: 0 5vw;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #030303;
        height: 12vw;
        line-height: 12vw;
        box-sizing: border-box;
        padding-left: 5vw;
        background-color: #fff;
    }

    .el-select-dropdown__item:after {
        content: "";
        position: absolute;
        display: block;
        width: calc(100% - 10vw);
        height: 0.133vw;
        left: 5vw;
        bottom: 0.133vw;
        background: #e4e7ed;
    }

    /* , .el-select-dropdown__item:hover */
    .el-select-dropdown__item.hover {
        background-color: #f5f7fa;
        background-color: #d5b08b;
        color: #fff;
    }
</style>