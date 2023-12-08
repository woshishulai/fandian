<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <div class="crumbs">
            <p>您的位置：首页 > 住宿</p>
        </div>
        <!-- 日历 -->
        <Queryhotel class="Queryhotel" />

        <div class="conts">
            <div class="room_detail">
                <div class="main">
                    <div class="detail_tit">{{ roomslist.title }}</div>
                    <div class="detailone">
                        <div class="lunbotu">
                            <div class="swiper-container-wrapper">
                                <div class="one_left">
                                    <div class="swiper-container gallery-top">
                                        <div class="swiper-wrapper">
                                            <!-- Slides -->
                                            <div class="swiper-slide" v-for="(item, index) in listimgs" :key="index">
                                                <div class="deta_leftimg">
                                                    <img loading="lazy" :src="Baseurl + item.image" alt="">
                                                </div>
                                            </div>
                                            <!-- <div class="swiper-slide">
                                                <div class="deta_leftimg">
                                                    <img loading="lazy"src="../../assets/img/deatl1.jpg" alt="">
                                                </div>
                                            </div>
                                            <div class="swiper-slide">
                                                <div class="deta_leftimg">
                                                    <img loading="lazy"src="../../assets/img/deatl1.jpg" alt="">
                                                </div>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                                <div class="one_right">
                                    <!-- Add Arrows -->
                                    <div class="anniu anniu1">
                                        <div class="swiper-button-prev"></div>
                                    </div>
                                    <div class="anniu anniu2">
                                        <div class="swiper-button-next"></div>
                                    </div>

                                    <div class="swiper-container gallery-thumbs">
                                        <div class="swiper-wrapper">
                                            <div class="swiper-slide" v-for="(item, index) in listimgs" :key="index">
                                                <div class="deta_rightimg">
                                                    <img loading="lazy" :src="Baseurl + item.image" alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="service">
                            <div class="service_list">
                                <div class="servicetit">
                                    <p>客房概览</p>
                                    <div class="close" @click="close(1)">
                                        <p>{{ close1 ? '关闭' : '展开' }}</p>
                                        <img loading="lazy" src="../../assets/img/jt.png" alt=""
                                            :style="close1 ? 'transform: rotate(90deg)' : 'transform: rotate(-90deg)'">
                                    </div>
                                </div>
                                <div class="service_text" v-show="close1">
                                    <p v-for="(item, index) in gailan" :key="index">{{ item }}</p>
                                </div>
                            </div>
                            <div class="service_list">
                                <div class="servicetit">
                                    <p>客房设施</p>
                                    <div class="close" @click="close(2)">
                                        <p>{{ close2 ? '关闭' : '展开' }}</p>
                                        <img loading="lazy" src="../../assets/img/jt.png" alt=""
                                            :style="close2 ? 'transform: rotate(90deg)' : 'transform: rotate(-90deg)'">
                                    </div>
                                </div>
                                <div class="service_text" v-show="close2">
                                    <p v-for="(item, index) in sheshi" :key="index">{{ item }}</p>
                                </div>
                            </div>
                            <div class="service_list">
                                <div class="servicetit">
                                    <p>其他</p>
                                    <div class="close" @click="close(3)">
                                        <p>{{ close3 ? '关闭' : '展开' }}</p>
                                        <img loading="lazy" src="../../assets/img/jt.png" alt=""
                                            :style="close3 ? 'transform: rotate(90deg)' : 'transform: rotate(-90deg)'">
                                    </div>
                                </div>
                                <div class="service_text" v-show="close3">
                                    <p v-html="roomslist.video" style="width: 100%;white-space: inherit;"></p>
                                    <!-- <p v-for="(item,index) in qita" :key="index">{{item}}</p> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="detailtwo">
                        <div class="detailtwo_biao">
                            <p>房屋偏好</p>
                            <p>支付</p>
                            <p>价格</p>
                        </div>
                        <!-- rateCodeInfos -->
                        <div class="detailtwo_area" v-if="paricelist != ''">
                            <div class="area_list" v-for="(item, index) in paricelist" :key="index">
                                <div class="pianhao">
                                    <img loading="lazy" src="../../assets/img/bofang.png" alt="">
                                    <p>{{ item.ratecodeName }}</p>
                                </div>
                                <div class="zhifu">
                                    <p>线上支付</p>
                                </div>
                                <div class="jiage">
                                    <p>最低：{{ item.salePrice }} CNY</p>
                                </div>
                                <div class="yuding" @click="yuding(item, index)">
                                    <div>预定</div>
                                </div>
                            </div>
                        </div>
                        <div class="detailtwo_area" v-if="paricelist == ''">
                            <p style="font-size:20px;padding:30px;">查询时间段内暂无房型</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 公共底部 -->
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/layout/header.vue"
import Footer from "@/components/layout/footer.vue"
import Queryhotel from "@/pages/rooms/queryhotel.vue";
import Swiper from "swiper";
export default {
    components: {
        Header,
        Footer,
        Queryhotel
    },
    data() {
        return {
            token: '',//token
            hotel_id: '',//酒店id
            modularid: '',//模块id
            hotelcode: '',//酒店编码
            close1: true,
            close2: true,
            close3: true,
            infolist: [],//酒店列表
            roomslist: [],
            roomId: '',//点击的第几个房间
            paricelist: [],
            gailan: [],//概览
            sheshi: [],//设施
            qita: [],//其他
            listimgs: [],//酒店的图片
            startDate: "",
            endDate: "",
            numDay: '',
            looks: '',
            accountNumber: sessionStorage.getItem("accountNumber"),//用户手机号
            codesh: '',
            // kefangid:''
            prono: "",//公司Id
            listid: ""
        };
    },

    created() {
        this.listid = localStorage.getItem('listid')
        this.prono = localStorage.getItem('prono')
        this.startDate = localStorage.getItem('startDate') || this.GetDateStr(0)
        this.endDate = localStorage.getItem('endDate') || this.GetDateStr(1)
        this.numDay = localStorage.getItem('numDay') || "1"
        this.prono = localStorage.getItem('prono') || ''
        this.roomId = localStorage.getItem('roomId') || ''
        this.looks = localStorage.getItem('looks') || ''
        // if (this.$route.query.listid) {
        //     this.listid = this.$route.query.listid
        //     console.log(this.listid)
        // }
        // if (this.$route.query.prono) {
        //     this.prono = this.$route.query.prono
        // }
        // 储存第几个头部状态
        localStorage.setItem("istrue", 2);
        this.token = sessionStorage.getItem("token");
        this.hotel_id = sessionStorage.getItem("hotel_id");
        this.hotelcode = sessionStorage.getItem("hotelcode");
        this.codesh = sessionStorage.getItem("codesh")
        if (this.accountNumber == null) {
            this.accountNumber == ''
        }
        this.getroomlist()

    },
    methods: {
        getidprice() {
            console.log(this.listid)
            var that = this
            that.$axios
                .post(`${this.Baseurl}home_list?web_token=${that.token}&hotel_id=${that.hotel_id}
                    &beginDate=${that.startDate}&endDate=${that.endDate}&prono=${that.prono}&hotel_code=${that.hotelcode}`)
                .then(function (res) {
                    console.log(res)
                    var ptriclist = res.data.data.database_room
                    console.log(ptriclist)
                    for (let i = 0; i < ptriclist.length; i++) {
                        if (ptriclist[i].id == that.listid) {
                            that.paricelist = ptriclist[i].xyprice
                        }
                    }
                    console.log(that.paricelist)
                }).catch(err => console.log(err));
        },
        getroomlist() {
            var that = this
            // console.log(that.looks)
            that.$axios
                .post(`${this.Baseurl}home_room_data?web_token=${that.token}&hotel_id=${that.hotel_id}&hotel_code=${that.hotelcode}
                &channelCode=${that.codesh}
                &id=${that.roomId}&startDate=${that.startDate}&endDate=${that.endDate}&numDay=${that.numDay}&looks=${that.looks}&tel=${that.accountNumber}`)
                .then(function (res) {
                    console.log(res)
                    console.log(res.data.data.News_info)
                    that.infolist = res.data.data.News_info
                    that.roomslist = res.data.data.News_info
                    console.log(that.roomslist)
                    // that.infolist = res.data.data.database_room
                    // for (let i = 0; i < that.infolist.length; i++) {
                    //     if(that.infolist[i].id == that.roomId){
                    //         console.log(i)
                    //         that.roomslist = that.infolist[i]
                    //     }
                    // }
                    that.listimgs = []
                    for (let i = 0; i < that.roomslist.images.length; i++) {
                        that.roomslist.images[i].type = 1
                        that.listimgs.push(that.roomslist.images[i])
                    }

                    // that.listimgs = that.roomslist.images

                    if (that.listimgs != '') {
                        that.$nextTick(function () {
                            that.lunbo()
                            console.log("调用了吗")
                        })
                    }
                    // that.paricelist =  that.roomslist.rateCodeInfos//价格
                    if (that.prono && that.prono != '') {
                        that.getidprice()
                    } else {
                        that.paricelist = that.roomslist.pricec
                        console.log(that.paricelist)
                    }


                    if (that.roomslist.description != '' && that.roomslist.description != null) {
                        that.gailan = that.roomslist.description.split(',')
                    }
                    if (that.roomslist.description1 != '' && that.roomslist.description1 != null) {
                        that.sheshi = that.roomslist.description1.split(',')
                    }
                    if (that.roomslist.video != '' && that.roomslist.video != null) {
                        that.qita = that.roomslist.video.split(',')
                    }

                }).catch(err => console.log(err));
        },

        close(num) {
            if (num == 1) {
                this.close1 = !this.close1
            }
            if (num == 2) {
                this.close2 = !this.close2
            }
            if (num == 3) {
                this.close3 = !this.close3
            }
        },
        yuding(item, index) {
            //需要判断一下是否登录
            // this.$router.push({
            //     name:'Order',
            //     // query:{
            //     //     id:id,
            //     //     module_id:this.modularid
            //     // }
            // })
            console.log('价格ratecodeCode:' + item.ratecodeCode)
            console.log('第几个价格' + index)
            // return false
            if (sessionStorage.getItem("accountNumber") && sessionStorage.getItem("accountNumber") != "") {
                localStorage.setItem('roomId', this.roomId)
                localStorage.setItem('priceIndex', index)
                localStorage.setItem('startDate', this.startDate)
                localStorage.setItem('endDate', this.endDate)
                localStorage.setItem('numDay', this.numDay)
                localStorage.setItem('looks', this.looks)
                localStorage.setItem('prono', this.prono)
                localStorage.setItem('ratecode', item.ratecodeCode)
                this.$router.push({
                    name: 'Order',
                    // query: {
                    //     roomId: this.roomId,
                    //     priceIndex: index,
                    //     startDate: this.startDate,
                    //     endDate: this.endDate,
                    //     numDay: this.numDay,//默认一天
                    //     looks: this.looks,
                    //     prono: this.prono,
                    //     ratecode: item.ratecodeCode,
                    // }
                })
            } else {
                alert("请先登录")
            }

        },
        lunbo() {
            var galleryThumbs = new Swiper(".gallery-thumbs", {
                direction: "horizontal",
                // spaceBetween: 10,
                slidesPerView: 4,
                freeMode: false,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                breakpoints: {
                    480: {
                        direction: "vertical",
                        slidesPerView: 4,
                    }
                }
            });
            var galleryTop = new Swiper(".gallery-top", {
                direction: "horizontal",
                // spaceBetween: 10,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                thumbs: {
                    swiper: galleryThumbs
                }
            });
        }

    },
    mounted() {

    },

};
</script>
<style scoped>
/* .Queryhotel{
        background-color: #fff;
    }
    .crumbs{
        background-color: #fff;
    } */
.room_detail {
    width: 100%;
    background-color: #efefed;
    padding-bottom: 30px;
}

.detail_tit {
    font-size: 30px;
    color: #000000;
    line-height: 86px;
}

.detailone {
    width: 100%;
    padding: 30px 30px 0;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
}

/* 联动轮播图 */
.lunbotu {
    padding-bottom: 37px;
}

.swiper-container-wrapper {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    justify-content: space-between;
}


/* 左边的大图 */
.gallery-top {
    width: 1113px;
    height: 776px;
}

.deta_leftimg {
    width: 100%;
    height: 100%;
}

.deta_leftimg img {
    width: 100%;
    display: block;
}

/* 右边的缩略图 */
.gallery-thumbs {
    width: 200px;
    height: 612px;
    /* height: 640px; */
}

.gallery-thumbs .swiper-wrapper {
    flex-direction: row;
    flex-direction: column;
}

.gallery-thumbs .swiper-slide {
    cursor: pointer;
    flex-flow: column nowrap;
    width: 100%;
    height: 140px !important;
    margin-bottom: 17px;
    /* margin: 9px 0; */
}

.deta_rightimg {
    width: 100%;
    height: 140px;
    /* 215 250 */
}

.deta_rightimg img {
    width: 100%;
    height: 100%;
    display: block;
}

.gallery-thumbs .swiper-slide::after {
    position: absolute;
    content: "";
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
}

.gallery-thumbs .swiper-slide-thumb-active::after {
    display: none;
}

/* 右边箭头 */
.one_right {
    position: relative;
    display: flex;
    align-items: center;
}

.anniu {
    position: absolute;
    width: 100%;
    height: 44px;
    background-color: #f2f2f2;
    left: 0;
    z-index: 2;
}

.anniu1 {
    top: 0;
}

.anniu2 {
    bottom: 0;
}

.swiper-button-next,
.swiper-button-prev {
    color: #fff;
    width: 21px;
    height: 11px;
    width: 100%;
    height: 100%;
    top: 0;
    /* margin-top: -5px; */
    margin-left: 0;
    margin-top: 0;
    left: 0;
    background-image: url(../../assets/img/anniu2.png);
    background-repeat: no-repeat;
    background-size: 21px 11px;
    background-position: center;
    opacity: 1;
}

.swiper-button-prev {
    transform: rotate(180deg);
}

.swiper-button-next::after,
.swiper-button-prev::after {
    display: none;
}

.swiper-button-disabled {
    background-image: url(../../assets/img/anniu1.png);
}


.service .service_list {
    border-top: 1px solid #d8d8d8;
    padding: 30px 0;
}

.service .service_list .servicetit {
    display: flex;

}

.service .service_list .servicetit>p {
    font-size: 24px;
    color: #000000;
    font-weight: 400;
}

.service .service_list .servicetit .close {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 15px;
    cursor: pointer;
}

.service .service_list .servicetit .close>img {
    width: 9px;
    height: 17px;
    transform: rotate(90deg);
    margin-left: 12px;
}

.service .service_list .service_text {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
}

.service .service_list .service_text p {
    font-size: 18px;
    color: #666666;
    line-height: 32px;
    width: 290px;
    margin-left: 50px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.service .service_list .service_text p:nth-child(4n+1) {
    margin-left: 0;
}

/* 房屋偏好... */
.detailtwo {
    margin-top: 30px;
    width: 100%;
}

.detailtwo_biao {
    background-color: #d5b08b;
    display: flex;
    height: 60px;
    align-items: center;
}

.detailtwo_biao p {
    color: #fff;
    font-size: 20px;
    margin-left: 30px;
    width: 320px;
    box-sizing: border-box;
}

.detailtwo_biao p:nth-child(1) {
    padding-left: 42px;
}

.detailtwo .detailtwo_area {
    background-color: #fff;
}

.detailtwo .detailtwo_area .area_list {
    display: flex;
    align-items: center;
    border-top: 1px solid #e3e3e3;
    height: 100px;
}

.detailtwo .detailtwo_area .area_list:first-child {
    border-top: none;
}

.detailtwo .detailtwo_area .area_list>div {
    margin-left: 30px;
    width: 320px;
}

.detailtwo .detailtwo_area .area_list .pianhao {
    display: flex;
    align-items: center;
}

.pianhao>img {
    width: 14px;
    height: 14px;
    display: flex;
    margin-right: 28px;
}

.pianhao p {
    font-size: 20px;
    color: #000000;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.zhifu p {
    font-size: 20px;
    color: #000000;
    font-weight: 400;
}

.jiage p {
    font-size: 20px;
    color: #000000;
}

.yuding {
    cursor: pointer;
}

.yuding div {
    width: 200px;
    height: 50px;
    background-color: #f4f4f4;
    font-size: 20px;
    color: #206079;
    text-align: center;
    line-height: 50px;

}
</style>