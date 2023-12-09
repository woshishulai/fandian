<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <!-- 日历 -->
        <Queryhotel />
        <div class="conts">
            <!-- 头部条 -->
            <div class="conts_top">
                <!-- <img src="../../assets/img/zhan1.jpg" alt=""> -->
                <img :src="Baseurl+topimg" alt="">
                <p>房型展示</p>
            </div>
            <!--  -->
            <!-- 第一块房子 -->
            <div class="room_type">
                <div class="main" >
                    <div class="type_left">
                        <div class="type_left_list clearfix" v-if="roomslist[0]"  @click="roomdeatil(roomslist[0].id,roomslist[0].looks)">
                            <div class="left_img">
                                <!-- <img src="../../assets/img/room1.jpg" alt=""> -->
                                <img :src="Baseurl+roomslist[0].pc_image" alt="">
                            </div>
                            <div class="wenben">
                                <div class="tit">{{roomslist[0].title}}</div>
                                <div class="type_left_text" v-html="roomslist[0].pc_content">
                                    <!-- {{roomslist[0].description}} -->
                                </div>
                                <div class="detail">查看详细</div>
                            </div>
                        </div>
                    </div>
                    <div class="type_right" v-if="roomslist">
                        <div class="type_right_list clearfix" v-for="(item,index) in roomslist.slice(1,5)" :key="index" @click="roomdeatil(item.id,item.looks)">
                            <div class="right_img">
                                <img :src="Baseurl+item.pc_image" alt="">
                            </div>
                            <div class="wenben">
                                <div class="tit">{{item.title}}</div>
                                <div class="type_left_text">
                                    {{item.description}}
                                </div>
                                <div class="detail">查看详细</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="room_more" @click="roomlists()">
                    <p>更多房型</p>
                </div>
            </div>
            <!-- 第二块 健身... -->
            <div class="bodybuild">
                <div class="body_back">
                    <div class="body_back_img" v-for="(item,index) in infolist" :key="index">
                        <img :src="Baseurl+item.news[0].mobile_image" alt=""> 
                    </div>
                </div>
                <div class="body_hua">
                    <div class="body_hua_left">
                        <div class="body_hua_list" v-for="(item,index) in infolist" :key="index">
                            <img  :src="Baseurl+item.pc_icon1" alt="">
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                    <div class="body_hua_right">
                        <div class="body_text_list" v-for="(item,index) in infolist" :key="index">
                            <div class="biaoti">{{item.name}}</div>
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
    import Header from "../owned/header.vue"
    import Footer from "../owned/footer.vue"
    import Queryhotel from "../rooms/queryhotel.vue";
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
                roomslist2:[],
                topimg:''
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
            getdatalist(){
                //?web_token=${that.token}&hotel_id=1
                var that =this
                that.$axios
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`) 
                .then(function(res) {
                    console.log(res)
                    that.topimg =res.data.data.top_module_list[1].mobile_image
                    var shuzu = res.data.data.defaul_module_list
                    var array =[]
                    that.infolist =  res.data.data.defaul_module_list
                    for (let i = 0; i < shuzu.length; i++) {
                        if(shuzu[i].news.length>0){
                            array.push(shuzu[i])
                        }
                    }
                    that.infolist = array
                    console.log(that.infolist)	
                    that.$nextTick(function(){
                        that.texiao()
                    })
                }).catch(err => console.log(err));
            },
            getroomlist(){
                // &startDate=2022-06-24&endDate=2022-06-25&numDay=1&hotel_code=${that.hotelcode}
                var that =this
                that.$axios
                .post(`${this.Baseurl}home_list?web_token=${that.token}&hotel_id=${that.hotel_id}`) 
                .then(function(res) {
                    console.log(res)
                    that.roomslist =res.data.data.database_room
                    // that.roomslist =res.data.data
                }).catch(err => console.log(err));
            },
           // 去房型列表页
            roomlists(){
                console.log("今天："+this.GetDateStr(0))
                console.log("明天："+this.GetDateStr(1))
                var nowday = this.GetDateStr(0)
                var nextday = this.GetDateStr(1)
                this.$router.push({
                    name:'RoomsList',
                    query:{
                       startDate:nowday,
                       endDate:nextday,
                       numDay:'1',//默认一天
                    }
                }) 
            },
            GetDateStr(AddDayCount) { 
                var dd = new Date(); 
                dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
                var y = dd.getFullYear(); 
                var m = dd.getMonth()+1;//获取当前月份的日期 
                var d = dd.getDate(); 
                return y+"-"+m+"-"+d; 
            },
            //去房型详情页
            roomdeatil(id,looks){
                console.log(id)
                console.log(looks)
                this.$router.push({
                    name:'RoomsDetail',
                    query:{
                        roomId:id,
                        looks:looks,
                        startDate:this.GetDateStr(0),
                        endDate:this.GetDateStr(1),
                        numDay:1,//默认一天
                    }
                })
            },
            texiao(){
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
        /* padding: 48px 0; */
        background-color: #efefed;
        padding-bottom: 6.000vw;
    }

    .room_type .type_left {
        width: 100%;
        padding: 5.333vw 0;
    }

    /* .room_type .type_left .type_left_list {
        display: flex;
    } */

    .room_type .type_left .type_left_list {
        cursor: pointer;
        background-color: #fff;
        padding-bottom: 3.333vw;
    }

    .room_type .type_left .type_left_list .left_img {
        width: 100%;
        height: 56.000vw;
        overflow: hidden;
    }

    .room_type .type_left .type_left_list .left_img img {
        width: 100%;
        display: block;
        /* transition: all 0.5s; */
    }
    .room_type .type_left .type_left_list .wenben{
        width: 80.667vw;
        margin: auto;
    }

    .room_type .type_left .type_left_list .wenben .tit {
        margin-top: 3.333vw;
        font-size: 4vw;
        color: #000000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .room_type .type_left .type_left_list .wenben .type_left_text {
        margin-top: 1.733vw;
        font-size: 3.5vw;
        color: #5f5f5f;
        line-height: 6vw;
        height: 18vw;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        /*要显示的行数*/
        -webkit-box-orient: vertical;
    }

    .room_type .type_left .type_left_list .wenben .detail {
        margin-top: 1.733vw;
        font-size: 3.5vw;
        color: #a8916f;
        text-align: center;
        float: right;
    }

    .room_type .type_right {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .room_type .type_right .type_right_list {
        width: 42.667vw;
        cursor: pointer;
        background-color: #fff;
        padding-bottom: 4.667vw;
        margin-bottom: 5.333vw;
    }
   

    .room_type .type_right .type_right_list .right_img {
        width: 42.667vw;
        height: 27.200vw;
        overflow: hidden;
    }

    .room_type .type_right .type_right_list .right_img img {
        width: 100%;
        height: 100%;
        display: block;
    }
    
    .room_type .type_right .type_right_list .wenben{
        width: 36.000vw;
        margin: auto;
    }

    .room_type .type_right .type_right_list .wenben .tit {
        margin-top: 3.333vw;
        font-size: 4vw;
        color: #000000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .room_type .type_right .type_right_list .wenben .type_left_text {
        margin-top: 1.733vw;
        font-size: 3.5vw;
        color: #5f5f5f;
        line-height: 6vw;
        height: 18vw;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        /*要显示的行数*/
        -webkit-box-orient: vertical;
    }

    .room_type .type_right .type_right_list .wenben .detail {
        margin-top: 3.333vw;
        font-size: 3.5vw;
        color: #a8916f;
        text-align: center;
        float: right;
    }


    .room_type .room_more {
        /* width: 200px; */
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1vw;
        cursor: pointer;
    }

    .room_type .room_more p {
        font-size: 4vw;
        color: #206079;
    }

    /* 健身... */
    .bodybuild {
        width: 100%;
        height: 800px;
        height: 95.200vw;
        position: relative;
    }

    .bodybuild .body_back {
        width: 100%;
        /* height: 800px; */
        /* height: 95.067vw; */
        height: 100%;
        position: relative;
    }
    .bodybuild .body_back .body_back_img{
        width: 100%;
        height: 100%;
    }

    .bodybuild .body_back img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .bodybuild .body_hua {
        position: absolute;
        width: 100%;
        left: 0;
        top: 6.400vw;
        z-index: 2;
        color: #FFF;
    }

    .bodybuild .body_hua .body_hua_left {
        /* flex-wrap: wrap; */
        width: 89.333vw;
        margin: auto;
        display: flex;
        /* justify-content: space-between; */
    }

    .bodybuild .body_hua .body_hua_left .body_hua_list {
        width: 28.000vw;
        height: 29.067vw;
        /* border: 0.133vw solid #898f8f; */
        border: 0.133vw solid rgba(255, 255, 255, .4);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, .4);
        box-sizing: border-box;
        cursor: pointer;
        margin-left: 2.5vw;
    }

    .bodybuild .body_hua .body_hua_left .body_hua_list.active {
        border: 0.133vw solid #fff;
        background-color: #d5b08b;
    }

    .bodybuild .body_hua .body_hua_left .body_hua_list img {
        /* width: 65px;
        height: 65px; */
        width: 8.667vw;
        height: 8.667vw;
    }

    .bodybuild .body_hua .body_hua_left .body_hua_list p {
        font-size: 5vw;
        color: #fff;
    }

    .bodybuild .body_hua .body_hua_right {
        width: 89.333vw;
        margin: auto;
        padding-top: 4.000vw;
    }

    .bodybuild .body_hua .body_hua_right .body_text_list {
        display: none;
    }

    .bodybuild .body_hua .body_hua_right .body_text_list.active {
        display: block;
    }

    .bodybuild .body_hua .body_hua_right .body_text_list .biaoti {
        font-size: 5vw;
        color: #fff;
    }

    .bodybuild .body_hua .body_hua_right .body_text_list .jianjie {
        margin-top: 2.667vw;
        font-size: 3.5vw;
        color: #fff;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 7;
        line-height: 5.6vw;
        /*要显示的行数*/
        -webkit-box-orient: vertical;
    }
    .jianjie /deep/ p, .jianjie /deep/ span{
        font-size: 3.2vw !important;
        font-family: siyuan !important;
    }

    .bodybuild .body_hua .body_hua_right .body_text_list .lianxi {
        /* margin-top: 35px; */
        font-size: 3.5vw;
        color: #fff;
    }


    /* <div class="body_hua_right">
                        <div class="body_text_list ">
                            1
                            <div class="biaoti">空间</div>
                            <div class="jianjie"></div>
                            <div class="lianxi">
                                <p></p>
                            </div>
                        </div>
                        <div class="body_text_list">
                            2
                        </div>
                        <div class="body_text_list">
                            3
                        </div>
                    </div> */
</style>