<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <!-- 日历 -->
        <Queryhotel />
        <div class="conts">
            <div class="meal_top">
                <!-- <img src="../../assets/img/hotle1.jpg" alt=""> -->
                <img :src="Baseurl+topimg" alt="">
            </div>
            <div class="canyin">
                <div class="main"  v-if="infolist[0]">
                    <div class="introdu">
                        <span class="introdu_tie">{{infolist[0].name}}</span>
                         <p v-html="infolist[0].description"></p>
                    </div>
                    <div class="canyinlun">
                        <!-- 如果需要导航按钮 -->
                        <!-- <div class="swiper-button-prev prevcan"></div>
                        <div class="swiper-button-next nextcan"></div> -->
                        <div class="swiper-container luncanyin">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item,index) in meallist" :key="index" @click='topath(item.id)'>
                                    <div class="can_list">
                                        <div class="can_list_img">
                                            <img :src="Baseurl+item.pc_image" alt="">
                                        </div>
                                        <div class="can_list_text">
                                            <p class="title">{{item.title}}</p>
                                            <p class="can_list_cont">{{item.description}}</p>
                                            <div class="button">
                                                查看详情
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="youhui">
                <div class="main" v-if="infolist[1]">
                    <div class="youhui_title">{{infolist[1].name}}</div>
                    <div class="vips">
                        <div class="vips_list" v-for="(item,index) in infolist[1].news" :key="index" @click="todetail(item.id)">
                            <div class="vips_list_img">
                                <!-- <img src="../../assets/img/can3.jpg" alt=""> -->
                                <img :src="Baseurl+item.pc_image" alt="">
                            </div>
                            <div class="vips_list_text">
                                <span>{{item.title}}</span>
                                <p>{{item.en_title}}</p>
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
    import Swiper from "swiper";
    import Queryhotel from "../rooms/queryhotel.vue";
    export default {
        components: {
            Header,
            Footer,
            Queryhotel,
        },
        data() {
            return {
                swiperOption:{
                    autoplay:true,
                },
                token:'',//token
                hotel_id:'',//酒店id
                modularid:'',//模块id
                infolist:'',
                meallist:[],
                topimg:''
            };
        },

        created() {
            // 储存第几个头部状态
            localStorage.setItem("istrue", 3);
            this.token = sessionStorage.getItem("token");
            // console.log(this.token);
            this.hotel_id = sessionStorage.getItem("hotel_id");
            // if(sessionStorage.getItem("fieldData")){
            //     var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
            //     this.modularid = fieldData[2].id
            // }
            // this.getdatalist()
            this.getinfolist()
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
                    // that.menulist = res.data.data.top_module_list;
                    // console.log(that.menulist)
                    const fieldData = res.data.data.top_module_list;
                    that.modularid = fieldData[2].id
                    sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
                    that.getdatalist()
                    })
                    .catch((err) => console.log(err));
            },
            getdatalist(){
                //?web_token=${that.token}&hotel_id=1
                var that =this
                that.$axios
                // &module_id=3
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`) 
                .then(function(res) {
                    console.log(res)
                    that.topimg =res.data.data.top_module_list[2].mobile_image
                    that.infolist =  res.data.data.defaul_module_list
                    that.meallist = res.data.data.defaul_module_list[0].news
                    console.log(that.meallist)
                    console.log(that.infolist)	
                    that.$nextTick(function(){
                        that.lunbo()
                    })
                }).catch(err => console.log(err));
            },
            lunbo(){
                var luncanyin = new Swiper(".luncanyin", {
                    // loop:true,
                    autoplay:true,
                slidesPerView: 2,
                // centeredSlides: true,//这个是让第一个居中显示的
                spaceBetween: 10,//47
                    
                    });
            },
            
            topath(id){
                console.log('id:'+id)
                this.$router.push({name:'MealDetail',
                query:{
                        mealId:id,
                    }
                }) 
            },
            todetail(id){
                console.log('id:'+id)
                this.$router.push({name:'Details',
                query:{
                        detailsId:id,
                        img:this.topimg
                    }
                }) 
            }
            

        },
        mounted() {
            var luncanyin = new Swiper(".luncanyin", {
                loop: true, // 循环模式选项
                autoplay:true,
                slidesPerView: 2,
                // centeredSlides: true,//这个是让第一个居中显示的
                spaceBetween: 10,//47
                // navigation: {
                //     nextEl: ".nextcan",
                //     prevEl: ".prevcan",
                // },
            });
        },

    };
</script>
<style scoped>
    .meal_top {
        width: 100%;
        height: 48.000vw;
        position: relative;
    }

    .meal_top img {
        width: 100%;
        height: 100%;
        display: block;
    }

    /* 酒吧及餐厅 */
    .canyin {
        width: 100%;
        background-color: #efefed;
        padding-bottom: 5.333vw;
        padding-top: 4.000vw;
    }

    .canyin .introdu span {
        font-size: 5vw;
        color: #000000;
        font-weight: 400;
    }

    .canyin .introdu p {
        margin-top: 2.667vw;
        font-size: 3.5vw;
        color: #5f5f5f;
        width: 100%;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        /*要显示的行数*/
        -webkit-box-orient: vertical;
        line-height: 5vw;
        height: 15vw;
        text-align: justify;
    }

    .canyinlun {
        width: 100%;
        padding-top: 5.333vw;
        position: relative;
        /* margin-left: -4.000vw; */
    }

    .canyinlun .luncanyin {
        width: 100%;
        
    }

    /* .prevcan,
    .nextcan {
        width: 44px;
        height: 44px;
        background-repeat: no-repeat;
        background-size: 100%;
        background: url(../../assets/img/canjt.png);
        top: -75px;
    }

    .prevcan {
        left: 1250px;
    }

    .nextcan {
        right: 0;
        transform: rotate(180deg);
    }

    .prevcan::after,
    .nextcan::after {
        display: none;
    } */

    /* .canyinlun .luncanyin .swiper-slide {
        width: 42.667vw !important;
        margin-right: 4.000vw;
    } */

    /* .canyinlun .luncanyin .swiper-slide .can_list {
        cursor: pointer;
    } */

    /* .canyinlun .luncanyin .swiper-slide .can_list:hover .can_list_img img {
        transform: scale(1.2);
    } */
    .can_list{
        width: 42.667vw;
        overflow: hidden;
    }
    .can_list .can_list_img {
        width: 42.667vw;
        /* height: 40.667vw; */
         height: 29.667vw;
        overflow: hidden;
    }

    .can_list .can_list_img img {
        width: 100%;
        height: 100%;
        display: block;
        /* transition: all 0.5s; */
    }

    /* .can_list .can_list_text {
        background-color: #fff;
        height: 12.000vw;
        width: 42.667vw;
       
    }

    .can_list .can_list_text p {
        line-height: 12.000vw;
        text-align: center;
        font-size: 3.8vw;
        color: #000000;
    }
    .can_list .can_list_text .can_list_cont{
        font-size: 3vw;
        color: #000000;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: 25px;
        height: 75px;
        text-align: left;
    }
    .can_list .can_list_text .button{
        margin-top: 38px;
        width: 130px;
        height: 40px;
        border: 1px solid #d5b08b;
        background-color: #fff;
        color: #d5b08b;
        font-size: 16px;
        cursor: pointer;
        margin: auto;
        line-height: 40px;
        text-align: center;
        margin-top: 30px;
    } */
    .can_list .can_list_text {
        background-color: #fff;
        width: 100%;
        padding: 0 3vw;
        box-sizing: border-box;
        padding-bottom: 5vw;
    }

    .can_list .can_list_text .title {
        line-height: 10vw;
        text-align: center;
        font-size: 4.5vw;
        color: #000000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
    }
    .can_list .can_list_text .can_list_cont{
        font-size: 3.5vw;
        color: #000000;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: 6vw;
        height: 18vw;
        text-align: left;
    }
    .can_list .can_list_text .button{
        width: 28vw;
        height: 8vw;
        border: 1px solid #d5b08b;
        background-color: #fff;
        color: #d5b08b;
        font-size: 4vw;
        cursor: pointer;
        margin: auto;
        line-height: 8vw;
        text-align: center;
        margin-top: 3vw;
    }

    .youhui {
        width: 100%;

    }

    .youhui .youhui_title {
        font-size: 5vw;
        color: #000000;
        font-weight: 400;
        margin-top: 5.333vw;
    }

    .youhui .vips {
       
        /* display: flex; */
        justify-content: space-between;
        padding-bottom: 5.333vw;
    }

    .youhui .vips .vips_list {
        cursor: pointer;
        width: 100%;
        margin-top: 5.333vw;
    }

    .youhui .vips .vips_list .vips_list_img {
        width: 100%;
        /* height: 380px; */
        height: 50.667vw;
        overflow: hidden;
    }

    .youhui .vips .vips_list .vips_list_img img {
        width: 100%;
        height: 100%;
        display: block;
        /* transition: all 0.5s; */
    }

    /* .youhui .vips .vips_list:hover .vips_list_img img {
        transform: scale(1.2);
    } */

    .youhui .vips .vips_list .vips_list_text {
        margin-top: 4.333vw;
    }

    .youhui .vips .vips_list .vips_list_text span {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 3.8vw;
        color: #000000;
    }

    .youhui .vips .vips_list .vips_list_text p {
        margin-top: 1.5.000vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        font-size: 3.2vw;
        color: #000000;
    }
    

</style>