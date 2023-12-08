<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <div class="crumbs">
            <p>Your location: Home > {{ topname }}</p>
        </div>
        <!-- 日历 -->
        <Queryhotel />
        <div class="conts">
            <!-- 头部条 -->
            <div class="conts_top">
                <!-- <img src="../../assets/img/zhan1.jpg" alt=""> -->
                <img :src="Baseurl + topimg" alt="">
                <p>Show room</p>
            </div>
            <!-- 第一块房子 -->
            <div class="room_type">
                <div class="main">
                    <div class="type_left">
                        <div class="type_left_list" v-if="roomslist[0]"
                            @click="roomdeatil(roomslist[0].id, roomslist[0].looks)">
                            <div class="left_img">
                                <img :src="Baseurl + roomslist[0].pc_image" alt="">
                            </div>
                            <div class="tit">{{ roomslist[0].title }}</div>
                            <div class="type_left_text" v-html="roomslist[0].pc_content">
                            </div>
                            <div class="detail">Learn More</div>
                        </div>
                    </div>
                    <div class="type_right" v-if="roomslist">
                        <div class="type_right_list clearfix" v-for="(item, index) in roomslist.slice(1, 5)" :key="index"
                            @click="roomdeatil(item.id, item.looks)">
                            <div class="right_img">
                                <img :src="Baseurl + item.pc_image" alt="">
                            </div>
                            <div class="tit">{{ item.title }}</div>
                            <div class="detail">Learn More</div>
                        </div>
                    </div>
                </div>
                <div class="room_more" @click="roomlists()">
                    <img src="../../assets/img/jia.png" alt="">
                    <p>More room</p>
                </div>
            </div>
            <!-- 第二块 健身... -->
            <div class="bodybuild">
                <div class="body_back">
                    <div class="body_back_img" v-for="(item, index) in infolist" :key="index">
                        <img :src="Baseurl + item.news[0].pc_image" alt="">
                    </div>
                </div>
                <div class="body_hua">
                    <div class="body_hua_left">
                        <div class="body_hua_list" v-for="(item, index) in infolist" :key="index">
                            <img :src="Baseurl + item.pc_icon1" alt="">
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                    <div class="body_hua_right">
                        <div class="body_text_list" v-for="(item, index) in infolist" :key="index">
                            <div class="biaoti">{{ item.name }}</div>
                            <div class="jianjie" v-html="item.news[0].pc_content">
                            </div>
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
            roomslist2: [],
            topimg: '',
            topname: ''
        };
    },

    created() {
        // 储存第几个头部状态
        localStorage.setItem("istrue", 2);
        this.token = sessionStorage.getItem("token");
        // console.log(this.token);
        this.hotel_id = sessionStorage.getItem("hotel_id");
        this.hotelcode = sessionStorage.getItem("hotelcode");
        // if(sessionStorage.getItem("fieldData")){
        //     var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
        //     console.log(fieldData)
        //     this.modularid = fieldData[1].id
        // }
        // console.log(JSON.parse(localStorage.getItem('roomlist')));
        // this.roomslist = JSON.parse(localStorage.getItem('roomlist'))
        this.getinfolist()
        // this.getdatalist()
        this.getroomlist()
    },

    methods: {
        getinfolist() {
            var that = this;
            that.$axios
                .post(
                    `${this.Baseurl}public_header?web_token=${that.token}&hotel_id=${that.hotel_id}`
                )
                .then(function (res) {
                    console.log(res);
                    const fieldData = res.data.data.top_module_list;
                    that.modularid = fieldData[1].id
                    sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
                    that.getdatalist()
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
                    var shuzu = res.data.data.defaul_module_list
                    var array = []
                    that.infolist = res.data.data.defaul_module_list
                    for (let i = 0; i < shuzu.length; i++) {
                        if (shuzu[i].news.length > 0) {
                            array.push(shuzu[i])
                        }
                    }
                    that.infolist = array
                    console.log(that.infolist)
                    that.$nextTick(function () {
                        that.texiao()
                    })
                }).catch(err => console.log(err));
        },
        getroomlist() {
            // &startDate=2022-06-24&endDate=2022-06-25&numDay=1&hotel_code=${that.hotelcode}
            var that = this
            that.$axios
                .post(`${this.Baseurl}home_list?web_token=${that.token}&hotel_id=${that.hotel_id}`)
                .then(function (res) {
                    console.log(res)
                    that.roomslist = res.data.data.database_room
                    // that.roomslist =res.data.data
                }).catch(err => console.log(err));
        },
        // 去房型列表页
        roomlists() {
            console.log("今天：" + this.GetDateStr(0))
            console.log("明天：" + this.GetDateStr(1))
            // console.log("今天："+)
            // console.log("今天："+)
            // var day = new Date()
            // console.log(day.getTime())
            var nowday = this.GetDateStr(0)
            var nextday = this.GetDateStr(1)
            localStorage.setItem('startDate', nowday)
            localStorage.setItem('endDate', nextday)
            localStorage.setItem('numDay', 1)
            this.$router.push({
                name: 'RoomsList',
                // query: {
                //     startDate: nowday,
                //     endDate: nextday,
                //     numDay: '1',//默认一天
                // }
            })
        },
        GetDateStr(AddDayCount) {
            var dd = new Date();
            dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
            var y = dd.getFullYear();
            var m = dd.getMonth() + 1;//获取当前月份的日期 
            var d = dd.getDate();
            return y + "-" + m + "-" + d;
        },
        //去房型详情页
        roomdeatil(id, looks) {
            console.log(id)
            console.log(looks)
            localStorage.setItem('roomId', id)
            localStorage.setItem('looks', looks)
            localStorage.setItem('startDate', this.GetDateStr(0))
            localStorage.setItem('endDate', this.GetDateStr(1))
            localStorage.setItem('numDay', 1)
            this.$router.push({
                name: 'RoomsDetail',
                // query: {
                //     roomId: id,
                //     looks: looks,
                //     startDate: this.GetDateStr(0),
                //     endDate: this.GetDateStr(1),
                //     numDay: 1,//默认一天
                // }
            })
        },
        texiao() {
            var body_hua_list = document.querySelectorAll(".body_hua_left .body_hua_list")
            var body_text_list = document.querySelectorAll(".body_hua_right .body_text_list")
            // var body_back = document.querySelectorAll(".body_back img")
            var body_back_img = document.querySelectorAll(".body_back .body_back_img")
            body_hua_list[0].className = "body_hua_list active"
            body_text_list[0].className = "body_text_list active"
            // body_back[0].style.display = "block"
            body_back_img[0].style.display = "block"
            // body_back
            for (let i = 0; i < body_hua_list.length; i++) {
                body_hua_list[i].index = i
                body_hua_list[i].onmouseover = function () {
                    for (let i = 0; i < body_hua_list.length; i++) {
                        body_hua_list[i].className = "body_hua_list"
                        body_text_list[i].className = "body_text_list"
                        // body_back[i].style.display = "none"
                        body_back_img[i].style.display = "none"
                    }
                    // console.log(this.index)
                    body_hua_list[this.index].className = "body_hua_list active"
                    body_text_list[this.index].className = "body_text_list active"
                    // body_back[this.index].style.display = "block"
                    body_back_img[i].style.display = "block"
                }
            }
        }
    },
    mounted() {

    },

};
</script>
<style scoped>
/* 房型 */
.room_type {
    padding: 48px 0;
}

.room_type .main {
    display: flex;
}

.room_type .type_left {
    width: 688px;
}

/* .room_type .type_left .type_left_list {
        display: flex;
    } */

.room_type .type_left .type_left_list {
    cursor: pointer;
}

.room_type .type_left .type_left_list .left_img {
    width: 688px;
    height: 433px;
    overflow: hidden;
}

.room_type .type_left .type_left_list .left_img img {
    width: 100%;
    display: block;
    transition: all 0.5s;
}

.room_type .type_left .type_left_list .tit {
    margin-top: 15px;
    font-size: 24px;
    color: #000000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.room_type .type_left .type_left_list .type_left_text {
    margin-top: 13px;
    font-size: 18px;
    color: #5f5f5f;
    line-height: 30px;
    height: 60px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /*要显示的行数*/
    -webkit-box-orient: vertical;
}

.room_type .type_left .type_left_list .detail {
    margin-top: 13px;
    font-size: 18px;
    color: #a8916f;
    /* width: 80px; */
    width: 120px;
    text-align: left;
}

.room_type .type_left .type_left_list:hover .left_img img {
    transform: scale(1.2);
}

/* .room_type .type_left .type_left_list .left_img img */
.room_type .type_right {
    margin-left: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 680px;
}

.room_type .type_right .type_right_list {
    width: 328px;
    cursor: pointer;
}

.room_type .type_right .type_right_list .right_img {
    width: 328px;
    height: 205px;
    overflow: hidden;
}

.room_type .type_right .type_right_list .right_img img {
    width: 100%;
    height: 100%;
    display: block;
    transition: all 0.5s;
}

.room_type .type_right .type_right_list:hover .right_img img {
    transform: scale(1.2);
}

.room_type .type_right .type_right_list .tit {
    margin-top: 15px;
    font-size: 24px;
    color: #000000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.room_type .type_right .type_right_list .detail {
    margin-top: 13px;
    font-size: 18px;
    color: #a8916f;
    /* width: 80px; */
    width: 120px;
    text-align: right;
    float: right;
}

.room_type .type_right .type_right_list:nth-child(1) {
    margin-bottom: 10px;
}

.room_type .room_more {
    width: 200px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 45px;
    cursor: pointer;
}

.room_type .room_more img {
    width: 16px;
    margin-right: 8px;

}

.room_type .room_more p {
    font-size: 18px;
    color: #206079;
}

/* 健身... */
.bodybuild {
    width: 100%;
    height: 600px;
    position: relative;
}

.bodybuild .body_back {
    width: 100%;
    height: 600px;
    position: relative;
}

.bodybuild .body_back div {
    width: 100%;
    height: 100%;
    display: none;
}

/* .body_back_img{
        display: ;
    } */

.bodybuild .body_back img {
    width: 1920px;
    height: 600px;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -960px;
    z-index: 1;
}

.bodybuild .body_hua {
    position: absolute;
    width: 1400px;
    height: 100%;
    left: 50%;
    margin-left: -700px;
    top: 0;
    z-index: 2;
    color: #FFF;
    display: flex;
    align-items: center;
}

.bodybuild .body_hua .body_hua_left {
    display: flex;
    flex-wrap: wrap;
    /* width: 620px; */
    width: 529px;
}

.bodybuild .body_hua .body_hua_left .body_hua_list {
    width: 260px;
    /* height: 317px; */
    height: 260px;
    /* border: 1px solid #898f8f; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .4);
    box-sizing: border-box;
    cursor: pointer;
    margin: 0.5px;
}

.bodybuild .body_hua .body_hua_left .body_hua_list:nth-child(1) {
    margin-right: 10px;
}

.bodybuild .body_hua .body_hua_left .body_hua_list.active {
    border: 1px solid #fff;
    background-color: #d5b08b;
}

/* .bodybuild .body_hua .body_hua_left .body_hua_list:nth-child(1) {

        border-bottom: none;
    } */

.bodybuild .body_hua .body_hua_left .body_hua_list img {
    width: 65px;
    height: 65px;
}

.bodybuild .body_hua .body_hua_left .body_hua_list p {
    font-size: 30px;
    color: #fff;
}

.bodybuild .body_hua .body_hua_right {
    margin-left: 135px;
    width: 647px;
}

.bodybuild .body_hua .body_hua_right .body_text_list {
    display: none;
}

.bodybuild .body_hua .body_hua_right .body_text_list.active {
    display: block;
}

.bodybuild .body_hua .body_hua_right .body_text_list .biaoti {
    font-size: 30px;
    color: #fff;
}

.bodybuild .body_hua .body_hua_right .body_text_list .jianjie {
    margin-top: 25px;
    font-size: 18px;
    color: #fff;
}

.jianjie /deep/ p,
.jianjie /deep/ span {
    font-size: 18px !important;
    font-family: siyuan !important;
}

.bodybuild .body_hua .body_hua_right .body_text_list .lianxi {
    margin-top: 35px;
    font-size: 18px;
    color: #fff;
}
</style>