<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <div class="conts">
            <div class="main">
                <div class="title">我的订单</div>
                <div class="roomslist_lunbo">
                    <div class="ordelist" v-for="(itemMsg,indexMsg) in orderlist" :key="indexMsg">
                        <div class="ordelist_tit">
                            <p v-if="itemMsg.hotel">{{itemMsg.hotel[0].hotel_name}}</p>
                        </div>
                        <div class="ordelist_text">
                            <div class="order_left">
                                <div class="orli">
                                    <span class="tisw">房型：</span>
                                    <span class="tes" v-if="itemMsg.room">{{itemMsg.room[0].title}}</span>
                                </div>
                                <div class="orli">
                                    <span class="tisw">房间数量：</span>
                                    <span class="tes">{{itemMsg.room_num}}间</span>
                                </div>
                                <div class="orli">
                                    <span class="tisw">价格：</span>
                                    <span class="tes">{{itemMsg.money}}元</span>
                                </div>
                                <div class="orli">
                                    <span class="tisw">开始结束日期：</span>
                                    <span class="tes">{{itemMsg.start_time}} — {{itemMsg.end_time}}</span>
                                </div>
                            </div>
                            <div class="order_right">
                                <div class="oebtn oebtn1"
                                    v-if="itemMsg.cancel_order==1&&itemMsg.pay_type==2&&itemMsg.status==0&&itemMsg.ok==2"
                                    @click="zhifu(itemMsg)">待支付</div>
                                <div class="oebtn oebtn1"
                                    v-if="itemMsg.cancel_order==1&&itemMsg.pay_type==1&&itemMsg.status==0">
                                    酒店前台支付</div>
                                <div class="oebtn oebtn2" v-if="itemMsg.cancel_order==1&&itemMsg.status!=2"
                                    @click="cancel(itemMsg)">取消订单</div>
                                <div class="oebtn oebtn3"
                                    v-if="itemMsg.status==1&&itemMsg.ok==1&&itemMsg.cancel_order==2"
                                    @click="deletes(itemMsg)">删除订单</div>
                                <div class="oebtn oebtn3" v-if="itemMsg.cancel_order==2&&itemMsg.status==2"
                                    @click="deletes(itemMsg)">删除订单</div>
                                <div class="oebtn oebtn3" v-if="itemMsg.status==3" @click="deletes(itemMsg)">删除订单</div>


                                <div class="wan" v-if="itemMsg.status==1&&itemMsg.ok==1&&itemMsg.cancel_order==2">交易完成
                                </div>
                                <div class="wan" v-if="itemMsg.cancel_order==2&&itemMsg.status==2">订单已取消</div>
                                <div class="wan" v-if="itemMsg.status==3">订单超时</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="Tips_elastic" v-if="tipshow">
            <div class="Tips">
                <p>{{ tipstext }}</p>
            </div>
        </div>
        <div class="zhifuye" v-if="zhifushow">
            <div class="erweima">
                <div v-if="success == 0">
                    <div class="erweima_title">请扫描下方二维码支付</div>
                    <div id="qrcode" ref="qrcode"></div>
                </div>
                <div class="erweima_text" v-if="success == 1">
                    <img src="../../assets/img/pay_over.png" alt="" />
                    <div class="erweima_title">支付成功</div>
                    <div>订单号：{{ hy_bill_no }}</div>
                </div>
                <div class="erweima_text" v-if="success == 2">
                    <div class="erweima_title">订单已取消</div>
                    <div>订单号：{{ hy_bill_no }}</div>
                </div>
                <div class="erweima_text" v-if="success == 3">
                    <div class="erweima_title">订单已超时</div>
                    <div>订单号：{{ hy_bill_no }}</div>
                </div>
                <div class="retunrnindex" @click="retunrnindex">取消</div>
            </div>
        </div>
        <!-- 公共底部 -->
        <Footer />
    </div>
</template>

<script>
    import Header from "../owned/header.vue";
    import Footer from "../owned/footer.vue";
    import Queryhotel from "../rooms/queryhotel.vue";
    import Swiper from "swiper";
    import QRCode from "qrcodejs2";
    export default {
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                token: '',//token
                hotel_id: '',//酒店id
                modularid: '',//模块id
                hotelcode: '',//酒店编码
                infolist: [],
                roomslist: [],
                startDate: '',
                endDate: '',
                numDay: '1',//默认一天


                city: [],
                city_centry: [],
                prono: "",//公司id（协议价格）

                orderlist: [],
                accountNumber: sessionStorage.getItem("accountNumber"), //登录账号
                tipshow: false,
                tipstext: "",//提示信息

                success: 0,
                zhifushow: false,
                hy_bill_no: "",//订单号
                xunhuan: "",//循环
            };
        },
        inject: ["reload"],
        created() {
            console.log(this.accountNumber)
            // 储存第几个头部状态
            localStorage.setItem("istrue", 99);
            this.token = sessionStorage.getItem("token");
            this.hotel_id = sessionStorage.getItem("hotel_id");
            this.hotelcode = sessionStorage.getItem("hotelcode");

            this.getorderlist()
            // this.getroomlist()
            // this.getdatalist()
        },
        methods: {
            retunrnindex() {
                var that = this
                that.zhifushow = false
                // this.reload()
                clearTimeout(that.xunhuan);
            },
            zhifu(item) {
                var that = this
                that.zhifushow = true
                that.$nextTick(() => {
                    that.showQrcode(decodeURIComponent(item.ewm_url));
                });
                that.xunhuan = setInterval(() => {
                    that.dingdan(item);
                    if (that.success == 1 || that.success == null) {
                        clearTimeout(that.xunhuan);
                    }
                }, 2000);
                setTimeout(() => {
                    if (that.success == 0) {
                        clearTimeout(that.xunhuan);
                        that.success == 3;
                    }
                }, 300000);
            },
            dingdan(item) {
                // console.log(item)
                // return false
                var that = this;
                var id = item.hotel[0].id
                that.hy_bill_no = item.order_num
                that.$axios
                    .post(
                        `${this.Baseurl}order_request?web_token=${that.token}&hotel_id=${id}
                        &order_num=${item.order_num}&order_num_third=${item.order_num_third}`
                    )
                    .then(function (res) {
                        // console.log(res);
                        if (res.data.status == "000000") {
                            that.success = res.data.type;
                        } else {
                            that.tishi("订单查询失败请重新下单");
                            clearTimeout(that.xunhuan);
                        }
                    })
                    .catch((err) => console.log(err));
            },

            showQrcode(text) {
                document.getElementById("qrcode").innerHTML = "";
                var qrcode = new QRCode("qrcode", {
                    // 第一个参数是组件的id值
                    text: text, // 生成二维码的文本
                    width: 300,
                    height: 300,
                    colorDark: "#000000", // 二维码色
                    colorLight: "#ffffff", // 二维码背景色
                    correctLevel: QRCode.CorrectLevel.H, // 容错等级
                });
            },
            //提示
            tishi(text) {
                this.tipshow = true;
                this.tipstext = text;
                setTimeout(() => {
                    this.tipshow = false;
                    this.tipstext = "";
                }, 3000);
            },
            //取消订单
            cancel(item) {
                var that = this
                that.$axios
                    .post(`${this.Baseurl}cancel_order?web_token=${that.token}&id=${item.id}`)
                    .then(function (res) {
                        console.log(res)
                        that.tishi(res.data.msg)
                        setTimeout(() => {
                            that.reload()
                        }, 3000)
                    }).catch(err => console.log(err));
            },
            //删除订单
            deletes(item) {
                var that = this
                that.$axios
                    .post(`${this.Baseurl}del_order?web_token=${that.token}&o_id=${item.id}`)
                    .then(function (res) {
                        console.log(res)
                        that.tishi(res.data.msg)
                        setTimeout(() => {
                            that.reload()
                        }, 3000)
                    }).catch(err => console.log(err));
            },
            //获取订单
            getorderlist() {
                var that = this
                that.$axios
                    .post(`${this.Baseurl}user_order_list?web_token=${that.token}&phone=${that.accountNumber}`)
                    .then(function (res) {
                        console.log(res)
                        that.orderlist = res.data.data
                    }).catch(err => console.log(err));
            },

        },
        mounted() {

        },

    };
</script>
<style scoped>
    .conts {
        background-color: #f8f8f8;
        /* #efefed */
    }

    .roomslist {
        background-color: #efefed;
    }

    /* efefed */
    .roomslist_lunbo {
        position: relative;
        padding-bottom: 85px;
    }

    .prevroom,
    .nextroom {
        background-image: url(../../assets/img/xiangyou.png);
        background-size: 100%;
        background-repeat: no-repeat;
        width: 33px;
        height: 20px;
        top: 100%;
        margin-top: -50px;
    }

    .prevroom {
        transform: rotate(180deg);
    }

    .prevroom::after,
    .nextroom::after {
        display: none;
    }

    .title {
        font-size: 5vw;
        color: #000000;
        text-align: center;
        margin-top: 5vw;
    }

    .ordelist {
        margin-top: 5vw;
        border-radius: 1vw;
        overflow: hidden;
    }

    .ordelist_tit {
        display: flex;
        align-items: center;
        background-color: #ebddcf;
        height: 9.333vw;
        padding: 0 5.333vw;
        position: relative;
    }



    .ordelist_tit p {
        font-size: 4vw;
        color: #000000;
        line-height: 9.333vw;
    }

    .ordelist_text {
        background-color: #fff;
        padding: 4.000vw 2vw 2.000vw 4.000vw;
    }

    .order_left {
        width: 100%;
    }

    .orli {
        margin: 0.2vw 0;
    }

    .orli .tisw {
        font-size: 3.5vw;
        color: #757575;
    }

    .orli .tes {
        font-size: 3.5vw;
        color: #000000;
    }

    .order_right {
        display: flex;
        justify-content: flex-end;
        margin-top: 5.333vw;
    }

    .order_right .oebtn {
        /* width: 22vw; */
        padding: 0 2vw;
        height: 7vw;
        text-align: center;
        font-size: 3.8vw;
        line-height: 7vw;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 1vw;
        margin-left: 2vw;
        min-width: 20vw;
    }

    .wan {
        width: 26.667vw;
        height: 7vw;
        font-size: 3.8vw;
        line-height: 7vw;
        color: #a57e57;
        text-align: center;
    }

    .order_right .oebtn.oebtn1 {
        background-color: #d5b08b;
        color: #fff;
    }

    .order_right .oebtn.oebtn2 {
        background-color: #f4f4f4;
        color: #000;
    }

    .order_right .oebtn.oebtn3 {
        border: 1px solid #d5d5d5;
        color: #000;
    }


    .zhifuye {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .erweima {
        background-color: #fff;
        width: 80vw;
        padding: 5vw;
        /* height: 500px; */
    }

    .erweima_title {
        color: #6b6a6a;
        font-size: 5vw;
        text-align: center;
    }

    #qrcode {
        width: 80vw;
        margin: auto;
        margin-top: 5vw;
    }

    #qrcode img {
        margin: auto;
    }

    .erweima_text {
        margin: auto;
        text-align: center;
        font-size: 3.5vw;
        color: #6b6a6a;
    }

    .erweima_text img {
        margin: auto;
    }

    .retunrnindex {
        font-size: 3.5vw;
        color: #6b6a6a;
        margin: auto;
        text-align: center;
        border: 1px solid #6b6a6a;
        width: 18vw;
        height: 10vw;
        line-height: 10vw;
        border-radius: 2vw;
        cursor: pointer;
        margin-top: 5vw;
    }

    .windows1 {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
    }

    .windows1 .wintext {
        width: 80vw;
        margin: auto;
        background-color: #fff;
        box-sizing: border-box;
        padding: 5vw;
    }

    .windows1 .wintext span {
        font-size: 5vw;
        color: #000;
    }

    .windows1 .wintext p {
        font-size: 3.8vw;
        line-height: 6vw;
        margin-top: 4vw;
    }
</style>