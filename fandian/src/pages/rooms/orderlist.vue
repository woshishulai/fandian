<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <div class="conts">
            <div class="main">
                <div class="title">我的订单</div>
                <div class="roomslist_lunbo">
                    <div class="swiper-container lunroom">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in orderlist" :key="index">
                                <div class="ordelist" v-for="(itemMsg,indexMsg) in item" :key="indexMsg">
                                    <div class="ordelist_tit">
                                        <img src="../../assets/img/dd.png" alt="">
                                        <p v-if="itemMsg.hotel">{{itemMsg.hotel[0].hotel_name}}</p>
                                        <div class="wan" v-if="itemMsg.status==1&&itemMsg.ok==1&&itemMsg.cancel_order==2">
                                            交易完成</div>
                                        <div class="wan" v-if="itemMsg.cancel_order==2&&itemMsg.status==2">订单已取消</div>
                                        <div class="wan" v-if="itemMsg.status==3">订单超时</div>
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
                                        <!-- pay_type 1酒店前台支付 2线上 
                                            status 0未支付 1已支付 2已申请退款  3支付超时
                                            cancel_order  1正常 2已取消订单
                                            ok  1当前时间大于入住时间 (已结束)   2当前时间小于入住时间(进行中)
                                          -->
                                        <div class="order_right">
                                            <div class="oebtn oebtn1"
                                                v-if="itemMsg.cancel_order==1&&itemMsg.pay_type==2&&itemMsg.status==0&&itemMsg.ok==2"
                                                @click="zhifu(itemMsg)">待支付</div>
                                            <div class="oebtn oebtn1"
                                                v-if="itemMsg.cancel_order==1&&itemMsg.pay_type==1&&itemMsg.status==0">
                                                酒店前台支付</div>
                                            <div class="oebtn oebtn2" v-if="itemMsg.cancel_order==1&&itemMsg.status!=2"
                                                @click="cancel(itemMsg)">取消订单</div>
                                            <!-- <div v-if="itemMsg.status!=2">
                                                <div class="oebtn oebtn3" v-if="itemMsg.status==2||itemMsg.ok==1"
                                                    @click="deletes(itemMsg)">删除订单
                                                </div>
                                            </div> -->
                                            <!-- <div v-if="itemMsg.status==1&&itemMsg.ok==1&&itemMsg.cancel_order==2" @click="deletes(itemMsg)">删除订单</div> -->

                                            <div class="oebtn oebtn3"
                                                v-if="itemMsg.status==1&&itemMsg.ok==1&&itemMsg.cancel_order==2"
                                                @click="deletes(itemMsg)">删除订单</div>
                                            <div class="oebtn oebtn3" v-if="itemMsg.cancel_order==2&&itemMsg.status==2"
                                                @click="deletes(itemMsg)">删除订单</div>
                                            <div class="oebtn oebtn3" v-if="itemMsg.status==3" @click="deletes(itemMsg)">
                                                删除订单</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 如果需要导航按钮 -->
                    <div class="swiper-button-prev prevroom"></div>
                    <div class="swiper-button-next nextroom"></div>
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
    import Header from "@/components/layout/header.vue";
    import Footer from "@/components/layout/footer.vue";
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
                xunhuan:"",//循环
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
                console.log(item)
                // return false
                var that = this;
                var  id = item.hotel[0].id
                that. hy_bill_no = item.order_num
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
                        var orderlist = res.data.data
                        var result = [];
                        for (var i = 0; i < orderlist.length; i += 5) {
                            result.push(orderlist.slice(i, i + 5));
                        }
                        that.orderlist = result
                        console.log(that.orderlist)
                        that.$nextTick(() => {
                            that.lunbo()
                        })
                    }).catch(err => console.log(err));
            },
            // 获取当前的日期
            getTheCurrentDate() {
                this.year = this.current.getFullYear();
                this.month = this.current.getMonth() + 1;
                this.day = this.current.getDate();
            },
            GetDateStr(AddDayCount) {
                var dd = new Date();
                dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
                var y = dd.getFullYear();
                var m = dd.getMonth() + 1;//获取当前月份的日期 
                var d = dd.getDate();
                return y + "-" + m + "-" + d;
            },

            lunbo() {
                var lunroom = new Swiper(".lunroom", {
                    // loop: true, // 循环模式选项
                    // slidesPerView: 3,
                    // centeredSlides: true,//这个是让第一个居中显示的
                    spaceBetween: 20,
                    // slidesPerView: 3,
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: ".nextroom",
                        prevEl: ".prevroom",
                    },
                });
            }
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
    font-size: 22px;
    color: #000000;
    text-align: center;
    margin-top: 30px;
}

.ordelist {
    margin-top: 38px;
}

.ordelist_tit {
    display: flex;
    align-items: center;
    background-color: #ebddcf;
    height: 60px;
    padding: 0 34px;
    position: relative;
}

.wan {
    font-size: 18px;
    color: #a57e57;
    margin-left: auto;
    margin-right: 85px;
}

.ordelist_tit p {
    font-size: 20px;
    color: #000000;
    margin-left: 15px;
}

.ordelist_text {
    background-color: #fff;
    padding: 30px 55px 30px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.order_left {
    width: 500px;
}

.orli {
    margin: 2px 0;
}

.orli .tisw {
    font-size: 18px;
    color: #757575;
}

.orli .tes {
    font-size: 18px;
    color: #000000;
}

.order_right .oebtn {
    width: 200px;
    height: 50px;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    box-sizing: border-box;
    margin: 8px 0;
    cursor: pointer;
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
    width: 800px;
    padding: 30px;
    /* height: 500px; */
}

.erweima_title {
    color: #6b6a6a;
    font-size: 25px;
    text-align: center;
}

#qrcode {
    width: 300px;
    margin: auto;
    margin-top: 30px;
}

#qrcode img {
    margin: auto;
}

.erweima_text {
    margin: auto;
    text-align: center;
    font-size: 20px;
    color: #6b6a6a;
}

.erweima_text img {
    margin: auto;
}

.retunrnindex {
    font-size: 20px;
    color: #6b6a6a;
    margin: auto;
    text-align: center;
    border: 1px solid #6b6a6a;
    width: 150px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 30px;
}

.retunrnindex:hover {
    background: #a1a1a1;
    border: 1px solid #a1a1a1;
    color: #fff;
}

.windows1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
}

.windows1 .wintext {
    width: 800px;
    margin: auto;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px;
}

.windows1 .wintext span {
    font-size: 25px;
    color: #000;
}

.windows1 .wintext p {
    font-size: 20px;
    line-height: 30px;
    margin-top: 20px;
}
</style>