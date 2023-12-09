<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <!-- 日历 -->
        <Queryhotel />
        <div class="conts">
            <!-- 头部条 -->
            <div class="conts_top">
                <img :src="Baseurl+topimg" alt="">
                <p>房型展示</p>
            </div>
            <div class="roomslist">
                <div class="main">
                    <div class="roomslist_lunbo">
                        <div class="roomswi_list" v-for="(itemMsg,indexMsg) in roomslist" :key="indexMsg" @click="roomdeatil(itemMsg.id,itemMsg.looks)">
                            <div class="roomlist_img"> 
                                 <img :src="Baseurl+itemMsg.pc_image" alt="">
                            </div>
                            <div class="roomlist_version clearfix">
                                <div class="version_eara">
                                    <span>{{itemMsg.title}}</span>
                                                <p v-html="itemMsg.pc_content">
                                                    
                                                </p>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="roomswi_list" v-for="(itemMsg,indexMsg) in item" :key="indexMsg" @click="roomdeatil(itemMsg.id,itemMsg.looks)">
                                        <div class="roomlist_img"> 
                                            <img :src="Baseurl+itemMsg.pc_image" alt="">
                                        </div>
                                        <div class="roomlist_version">
                                            <div class="version_eara">
                                                <span>{{itemMsg.title}}</span>
                                                <p v-html="itemMsg.pc_content">
                                                    
                                                </p>
                                                <div class="room_detail">查看详细</div>
                                            </div>
                                        </div>
                                    </div> -->
                    </div>
                </div>
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
    export default {
        components: {
            Header,
            Footer,
            Queryhotel,
        },
        data() {
            return {
                token:'',//token
                hotel_id:'',//酒店id
                modularid:'',//模块id
                hotelcode:'',//酒店编码
                infolist:[],
                roomslist:[],
                startDate :'',
                endDate :'',
                numDay:'1',//默认一天
                topimg:'',
                topname:'',

                mudiIndex:"",
                mudiIndexnum1:"",
                mudiIndexnum2:"",
                city:[],
                city_centry:[],
                prono:"",//公司id（协议价格）
            };
        },
        created() {
            // 储存第几个头部状态
            localStorage.setItem("istrue", 2);
            this.token = sessionStorage.getItem("token");
            if(this.$route.query.hotel_id){
                this.hotel_id = this.$route.query.hotel_id;
                this.hotelcode = this.$route.query.hotelcode;
                sessionStorage.setItem("hotel_id", this.$route.query.hotel_id)
                sessionStorage.setItem("hotelcode", this.$route.query.hotelcode)
                localStorage.setItem("mudiIndex",this.$route.query.mudiIndex)
                localStorage.setItem("mudiIndexnum1",this.$route.query.mudiIndexnum1)
                localStorage.setItem("mudiIndexnum2",this.$route.query.mudiIndexnum2)
                this.getdiqulist()
            }else{
                console.log(this.$route.query.hotel_id)
                this.hotel_id = sessionStorage.getItem("hotel_id");
                this.hotelcode = sessionStorage.getItem("hotelcode");
            }
            if (this.$route.query.startDate) {
                this.startDate = this.$route.query.startDate
            } else {
                this.startDate = this.GetDateStr(0)
                console.log(this.startDate)
            }
            if (this.$route.query.endDate) {
                this.endDate = this.$route.query.endDate
            } else {
                this.endDate = this.GetDateStr(1)
                console.log(this.startDate)
            }
            if (this.$route.query.numDay) {
                this.numDay = this.$route.query.numDay
            } else {
                this.numDay = "1"
                console.log(this.numDay)
            }
            if(this.$route.query.prono){
                this.prono = this.$route.query.prono
            }
            this.getroomlist()
            if(sessionStorage.getItem("fieldData")){
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
                sessionStorage.setItem("hotelcode",that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code);
                sessionStorage.setItem("codesh", that.city[that.mudiIndexnum1][that.mudiIndexnum2].code);
                sessionStorage.setItem("hotelname",that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name);
                sessionStorage.setItem("dituxinxi",JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
                } else {
                    that.city_centry = that.city["北京"];
                    that.mudiIndex = that.city["北京"][0].hotel_name;
                    that.mudiIndexnum1 = "北京";
                    that.mudiIndexnum2 = 0;
                    localStorage.setItem("mudiIndex", that.mudiIndex);
                    localStorage.setItem("mudiIndexnum1", "北京");
                    localStorage.setItem("mudiIndexnum2", 0);

                    sessionStorage.setItem("hotel_id", that.city["北京"][0].id);
                    sessionStorage.setItem("hotelcode",that.city["北京"][0].hotel_code);
                    sessionStorage.setItem("codesh", that.city["北京"][0].code);
                    sessionStorage.setItem("hotelname",that.city["北京"][0].hotel_name);
                    sessionStorage.setItem("dituxinxi",JSON.stringify(that.city["北京"][0]))
                }
                console.log(that.city_centry);
                })
                .catch((err) => console.log(err));
            },
            getdatalist(){
                //?web_token=${that.token}&hotel_id=1
                var that =this
                that.$axios
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`) 
                .then(function(res) {
                    console.log(res)
                    that.topimg =res.data.data.top_module_list[1].mobile_image
                    that.topname = res.data.data.top_module_list[1].name
                }).catch(err => console.log(err));
            },
            getroomlist(){
                var that =this
                that.$axios
                // .post(`${this.Baseurl}home_list?web_token=${that.token}&hotel_id=${that.hotel_id}`) 
                .post(`${this.Baseurl}home_list?web_token=${that.token}&hotel_id=${that.hotel_id}
                    &beginDate=${that.startDate}&endDate=${that.endDate}&prono=${that.prono}&hotel_code=${that.hotelcode}`)
                .then(function(res) {
                    console.log(res)
                    that.infolist = res.data.data.database_room
                    
					that.roomslist = that.infolist 
                    console.log(that.roomslist)
                }).catch(err => console.log(err));
            },
            //去房型详情页
            roomdeatil(id,looks){
                // console.log(id)
                 this.$router.push({
                    name: "RoomsDetail",
                    query: {
                        roomId:id,
                        looks:looks,
                        startDate:this.startDate,
                        endDate:this.endDate,
                        numDay:this.numDay,//默认一天
                        prono:this.prono,
                        listid:id,
                    },
                });
            },
        },
        mounted() {
            
        },

    };
</script>
<style scoped>
    .roomslist {
        background-color: #efefed;
    }

    /* efefed */
    .roomslist_lunbo {
        position: relative;
        /* bottom: ; */
        padding-bottom: 85px;
        padding-top: 0.1333vw;
           padding-bottom: 5.333vw;
    }

    
    .roomswi_list {
        margin-top: 5.333vw;
        background-color: #fff;
        /* display: flex;
        cursor: pointer; */
    }

    .roomswi_list .roomlist_img {
        width: 100%;
        height: 56.400vw;
        overflow: hidden;
    }

    .roomswi_list .roomlist_img img {
        width: 100%;
        display: block;
    }

    .roomlist_version {
        width: 100%;
        box-sizing: border-box;
        padding-bottom: 3.333vw;
    }
    .roomlist_version .version_eara{
        width: 80.000vw;
        margin: auto;
        margin-top: 4vw;
    }
    /*  */

    .roomlist_version .version_eara span {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 4vw;
        color: #000000;
    }

    .roomlist_version .version_eara p {
        margin-top: 2.000vw;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        font-size: 3.5vw;
        color: #666666;
        line-height: 6vw;
        height: 17.5vw;
    }

    /* .roomlist_version .version_eara .room_detail {
        margin-top: 55px;
        float: right;
        width: 125px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #a8916f;
        text-align: center;
    } */

    /* .roomswi_list:hover {
        box-shadow: 0 0 6px 1px #d6d5d5;
    }

    .roomswi_list:hover .roomlist_img img {
        transform: scale(1.2);
    }

    .roomswi_list:hover .room_detail {
        color: #fff;
        background-color: #d5b08b;
    } */
</style>