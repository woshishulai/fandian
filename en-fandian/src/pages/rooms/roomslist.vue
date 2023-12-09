<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <div class="crumbs">
            <p>Your location: Home > Rooms</p>
        </div>
        <!-- 日历 -->
        <Queryhotel class="Queryhotel" />
        <div class="conts">
            <!-- 头部条 -->
            <div class="conts_top">
                <img :src="Baseurl + topimg" alt="">
                <p>Show room</p>
            </div>
            <div class="roomslist">
                <div class="main">
                    <div class="roomslist_lunbo">
                        <div class="swiper-container lunroom">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item, index) in roomslist" :key="index">
                                    <div class="roomswi_list" v-for="(itemMsg, indexMsg) in item" :key="indexMsg"
                                        @click="roomdeatil(itemMsg.id, itemMsg.looks)">
                                        <div class="roomlist_img">
                                            <!-- <img src="../../assets/img/room1.jpg" alt=""> -->
                                            <img :src="Baseurl + itemMsg.pc_image" alt="">
                                        </div>
                                        <div class="roomlist_version">
                                            <div class="version_eara">
                                                <span>{{ itemMsg.title }}</span>
                                                <p v-html="itemMsg.pc_content">

                                                </p>
                                                <div class="room_detail">Learn More</div>
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
export default {
    components: {
        Header,
        Footer,
        Queryhotel,
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
            topimg: '',
            topname: '',
            mudiIndex: "",
            mudiIndexnum1: "",
            mudiIndexnum2: "",
            city: [],
            city_centry: [],
            prono: "",//公司id（协议价格）
        };
    },
    created() {
        // 储存第几个头部状态
        localStorage.setItem("istrue", 2);
        this.token = sessionStorage.getItem("token");
        if (this.$route.query.hotel_id) {
            this.hotel_id = this.$route.query.hotel_id;
            this.hotelcode = this.$route.query.hotelcode;
            sessionStorage.setItem("hotel_id", this.$route.query.hotel_id)
            sessionStorage.setItem("hotelcode", this.$route.query.hotelcode)
            localStorage.setItem("mudiIndex", this.$route.query.mudiIndex)
            localStorage.setItem("mudiIndexnum1", this.$route.query.mudiIndexnum1)
            localStorage.setItem("mudiIndexnum2", this.$route.query.mudiIndexnum2)
            this.getdiqulist()
        } else {
            console.log(this.$route.query.hotel_id)
            this.hotel_id = sessionStorage.getItem("hotel_id");
            this.hotelcode = sessionStorage.getItem("hotelcode");
        }


        // console.log(this.token);
        // console.log(this.hotel_id )
        // console.log(this.hotelcode)

        //     that.mudiIndexnum1 = localStorage.getItem("mudiIndexnum1");
        //   that.mudiIndexnum2 = localStorage.getItem("mudiIndexnum2");
        this.startDate = localStorage.getItem('startDate') || this.GetDateStr(0)
        this.endDate = localStorage.getItem('endDate') || this.GetDateStr(1)
        this.numDay = localStorage.getItem('numDay') || "1"
        this.prono = localStorage.getItem('prono') || ''
        console.log(this.startDate, this.endDate, this.numDay, this.prono);

        // if (this.$route.query.startDate) {
        //     this.startDate = this.$route.query.startDate
        // } else {
        //     this.startDate = this.GetDateStr(0)
        //     console.log(this.startDate)
        // }
        // if (this.$route.query.endDate) {
        //     this.endDate = this.$route.query.endDate
        // } else {
        //     this.endDate = this.GetDateStr(1)
        //     console.log(this.startDate)
        // }
        // if (this.$route.query.numDay) {
        //     this.numDay = this.$route.query.numDay
        // } else {
        //     this.numDay = "1"
        //     console.log(this.numDay)
        // }
        // if (this.$route.query.prono) {
        //     this.prono = this.$route.query.prono
        // }


        this.getroomlist()
        if (sessionStorage.getItem("fieldData")) {
            var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
            console.log(fieldData)
            this.modularid = fieldData[1].id
        }
        this.getdatalist()
    },
    methods: {
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
        getdiqulist() {
            var that = this;
            that.$axios
                .get(`${this.Baseurl}hotel_new?web_token=${that.token}`)
                .then(function (res) {
                    that.city = res.data.data;
                    console.log("citycitycitycitycitycitycitycitycitycitycitycitycitycitycity");
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


                        sessionStorage.setItem("hotel_id", that.city[that.mudiIndexnum1][that.mudiIndexnum2].id);
                        sessionStorage.setItem("hotelcode", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code);
                        sessionStorage.setItem("codesh", that.city[that.mudiIndexnum1][that.mudiIndexnum2].code);
                        sessionStorage.setItem("hotelname", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name);
                        sessionStorage.setItem("dituxinxi", JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
                    } else {
                        that.city_centry = that.city["Beijing"];
                        that.mudiIndex = that.city["Beijing"][0].hotel_name;
                        that.mudiIndexnum1 = "Beijing";
                        that.mudiIndexnum2 = 0;
                        localStorage.setItem("mudiIndex", that.mudiIndex);
                        localStorage.setItem("mudiIndexnum1", "Beijing");
                        localStorage.setItem("mudiIndexnum2", 0);

                        sessionStorage.setItem("hotel_id", that.city["Beijing"][0].id);
                        sessionStorage.setItem("hotelcode", that.city["Beijing"][0].hotel_code);
                        sessionStorage.setItem("codesh", that.city["Beijing"][0].code);
                        sessionStorage.setItem("hotelname", that.city["Beijing"][0].hotel_name);
                        sessionStorage.setItem("dituxinxi", JSON.stringify(that.city["Beijing"][0]))
                    }
                    console.log(that.city_centry);
                })
                .catch((err) => console.log(err));
        },
        getdatalist() {
            //?web_token=${that.token}&hotel_id=1
            var that = this
            that.$axios
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`)
                .then(function (res) {
                    console.log(res)
                    that.topimg = res.data.data.top_module_list[1].pc_image
                    that.topname = res.data.data.top_module_list[1].name

                }).catch(err => console.log(err));
        },
        getroomlist() {
            var that = this
            that.$axios
                // .post(`${this.Baseurl}home_list?web_token=${that.token}&hotel_id=${that.hotel_id}`)
                .post(`${this.Baseurl}home_list?web_token=${that.token}&hotel_id=${that.hotel_id}
                    &beginDate=${that.startDate}&endDate=${that.endDate}&prono=${that.prono}&hotel_code=${that.hotelcode}`)
                .then(function (res) {
                    console.log(res)
                    that.infolist = res.data.data.database_room
                    // console.log(that.infolist)
                    var result = [];
                    for (var i = 0; i < that.infolist.length; i += 5) {
                        result.push(that.infolist.slice(i, i + 5));
                    }
                    that.roomslist = result
                    console.log(that.roomslist)
                    that.$nextTick(() => {
                        that.lunbo()
                    })
                }).catch(err => console.log(err));
        },
        //去房型详情页
        // roomdeatil(){
        //     this.$router.push('/roomsdetail');
        // },
        roomdeatil(id, looks) {
            console.log(id)
            localStorage.setItem('roomId', id)
            localStorage.setItem('looks', looks)
            localStorage.setItem('listid', id)
            this.$router.push({
                name: "RoomsDetail",
                // query: {
                //     roomId: id,
                //     looks: looks,
                //     // startDate: this.startDate,
                //     // endDate: this.endDate,
                //     // numDay: this.numDay,//默认一天
                //     // prono: this.prono,
                //     listid: id,
                // },
            });
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
.Queryhotel {
    /* background-color:pink; */
}

.roomslist {
    background-color: #efefed;
}

/* efefed */
.roomslist_lunbo {
    position: relative;
    /* bottom: ; */
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

.roomswi_list {
    margin-top: 48px;
    background-color: #fff;
    display: flex;
    cursor: pointer;
}

.roomswi_list .roomlist_img {
    width: 576px;
    height: 363px;
    overflow: hidden;
}

.roomswi_list .roomlist_img img {
    width: 100%;
    display: block;
    transition: all 0.5s;
}

.roomlist_version {
    width: 820px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 75px 80px 0; */
    box-sizing: border-box;
}

.roomlist_version .version_eara {
    width: 675px;
}

.roomlist_version .version_eara span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 24px;
    color: #000000;
}

.roomlist_version .version_eara p {
    margin-top: 35px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 18px;
    color: #666666;
    line-height: 32px;
    height: 65px;
}

.roomlist_version .version_eara .room_detail {
    margin-top: 55px;
    float: right;
    width: 125px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #a8916f;
    text-align: center;
}

.roomswi_list:hover {
    box-shadow: 0 0 6px 1px #d6d5d5;
}

.roomswi_list:hover .roomlist_img img {
    transform: scale(1.2);
}

.roomswi_list:hover .room_detail {
    color: #fff;
    background-color: #d5b08b;
}
</style>