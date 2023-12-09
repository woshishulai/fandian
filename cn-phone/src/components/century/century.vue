<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <!-- 日历 -->
        <Queryhotel />
        <div class="conts">
            <div class="meal_top">
                <!-- <img src="../../assets/img/tiyan.jpg" alt=""> -->
                <img :src="Baseurl+topimg" alt="">
            </div>
            <div class="tiyanone">
                    <div class="zhoubian"  v-if="infolist[0].news!=''">
                        <div class="zhoubian_tit">{{infolist[0].name}}</div>
                        <div class="zhoubian_lunbo">
                            <div class="swiper-container lunzhou">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(item,index) in infolist[0].news" :key="index" @click="topath(item)">
                                        <div class="list">
                                            <div class="list_nei">
                                                <span>{{item.title}}</span>
                                                <p>{{item.description}}</p>
                                                <div class="tupian">
                                                    <!-- <img src="../../assets/img/tiyan1.jpg" alt=""> -->
                                                    <img :src="Baseurl+item.pc_image" alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <!-- 如果需要分页器 -->
                                <!-- <div class="swiper-pagination fenye"></div> -->
                            </div>
                        </div>
                    </div>
            </div>
            <div class="tiyantwo" v-if="infolist[1]!=''">
                <div class="main">
                    <!--百度地图容器-->
                    <div class="ditu">
                        <!-- @ready="handler" -->
                        <baidu-map class="bm-view" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" >
                            <bm-label :content="contents" 
                            :position="center" 
                            :labelStyle="{color: '#808080', fontSize : '20px',padding:'5px 20px',
                            border:'1px solid #bababa',borderRadius: '10px',
                            marginLeft:'-120px',textAlign:'center',marginTop: '-40px'
                            }" title="Hover me"/>
                        </baidu-map>
                    </div>
                    <div class="infomercial">
                        <span>联系我们</span>
                        <!-- <div v-html="infolist[1].news[0].description"></div> -->
                        <div v-html="infolist[1].news[0].pc_content"></div>
                        <!-- //pc_content -->
                    </div>
                    <!-- <div class="fuwu">
                        <div class="fuwuleft">
                            <img :src="Baseurl+infolist[1].news[0].mobile_image" alt="">
                        </div>
                        <div class="fueurigth">
                            <div class="fueurigth_text">
                                <div class="text_wenben">
                                    <span>{{infolist[1].name}}</span>
                                    <p>{{infolist[1].news[0].description}}</p>
                                </div>
                            </div>
                            <div class="fueurigth_img">
                                <div class="img">
                                    <img :src="Baseurl+infolist[1].news[0].images[1].image" alt="">
                                </div>
                                <div class="img">
                                    <img :src="Baseurl+infolist[1].news[0].images[2].image" alt="">
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <!-- <div class="tiyanthere" v-if="infolist[2]">
                <div class="tiyanthere_tit">{{infolist[2].name}}</div>
                <div class="tiyanthere_lunbo">
                    <div class="swiper-container lunthere">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in infolist[2].news" :key="index">
                                <div class="there_tu">
                                    <img :src="Baseurl+item.pc_image" alt="">
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
        <!-- zuilea-->
        <!-- 公共底部 -->
        <Footer />
    </div>
</template>

<script>
    import Header from "../owned/header.vue";
    import Footer from "../owned/footer.vue";
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
                token:'',//token
                hotel_id:'',//酒店id
                modularid:'',//模块id
                infolist:'',
                topimg:'',
                arrayImg:[],


                // 地图
                center:{lng:0,lat:0},
                zoom:20,
                contents: '北京世纪金源大饭店1',
                dituxinxi:[],
            };
        },
        created() {
            localStorage.setItem("istrue", 5);
            this.token = sessionStorage.getItem("token");
            // console.log(this.token);
            this.hotel_id = sessionStorage.getItem("hotel_id");
            // if(sessionStorage.getItem("fieldData")){
            //     var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
            //    this.modularid = fieldData[4].id
            // }
            // this.getdatalist()
            this.getinfolist()
            this.dituxinxi=JSON.parse(sessionStorage.getItem("dituxinxi"))
            var zuobiao = this.dituxinxi.coord.split(',')
            console.log(zuobiao)
            // this.center.lng = 116.286812
            // this.center.lat = 39.959567
            var array = {
            lng:zuobiao[0],lat:zuobiao[1]
            }
            // this.center.lng = zuobiao[0]
            // this.center.lat = zuobiao[1]
            this.center =array
            this.zoom = 20
            this.contents=this.dituxinxi.hotel_name
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
                    that.modularid = fieldData[4].id
                    sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
                    that.getdatalist()
                    })
                    .catch((err) => console.log(err));
            },
            handler({BMap, map}) {
                console.log(BMap, map)
                var zuobiao = this.dituxinxi.coord.split(',')
                // this.center.lng = 116.286812
                // this.center.lat = 39.959567
                this.center.lng = zuobiao[0]
                this.center.lat = zuobiao[1]
                this.zoom = 20
                this.contents=this.dituxinxi.hotel_name
            },
           getdatalist(){
                //?web_token=${that.token}&hotel_id=1
                var that =this
                that.$axios
                // &module_id=3
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`) 
                .then(function(res) {
                    console.log(res)
                    that.topimg =res.data.data.top_module_list[4].mobile_image
                    that.infolist =  res.data.data.defaul_module_list
                    
                    var array = that.infolist[1].news[0].images
                    var result = []
                    for (let i = 0; i < array.length; i++) {
                       if(array[i].type ==2){
                            result.push(array[i])
                       }
                    }
                    that.arrayImg = result
                    //infolist
                    //defaul_module_list 
                    that.$nextTick(function(){
                        that.lunboone()
                    })
                }).catch(err => console.log(err));
            },

            topath(item){
                console.log(item)
                if(item.pc_link&&item.pc_link!=''){
                    window.open(item.pc_link)
                }
            },
            // pc_link
            lunboone(){
                var lunzhou = new Swiper(".lunzhou", {
                // // 如果需要分页器
                // pagination: {
                //     el: ".swiper-pagination",
                // },
                // loop: true, // 循环模式选项
                slidesPerView: "auto",
                centeredSlides: true,
                on: {
                    click: function (swiper) {
                        lunzhou.slideTo(this.clickedIndex);
                        lunzhou.slideToLoop(this.realIndex);
                    },
                },
            });
            // var lunthere = new Swiper(".lunthere", {
            //     loop: true, // 循环模式选项
            //     autoplay:true,
            //     centeredSlides: true,
            //     // slidesPerView: 3,
            //     slidesPerView: "auto",
            //     freeMode:true,
            //     // autoplay:true,
            //     // centeredSlides: true,//这个是让第一个居中显示的
            //     spaceBetween: 0,
            //     // 如果需要分页器
            //     pagination: {
            //         el: ".swiper-pagination",
            //     },

            // });
            }
        },
        mounted() {
        },

    };
</script>
<style scoped>
    .ditu{
        width: 100%;
        height: 40vw;
    }
    .bm-view{
        width: 100%;
        height: 100%;
    }
    .infomercial{
        font-size: 4vw;
        width: 100%;
    }
    .infomercial>span{
        font-size: 5vw;
        display: block;
        padding: 3vw 0;
    }
    .infomercial>div /deep/ p,.infomercial>div /deep/ span{
        font-size: 4vw; 
        line-height: 6vw;;
    }
    .infomercial>div /deep/ img{
        width: 40vw;
        height: 40vw;
        display: block;
        margin: 2vw 0;
    }
    .meal_top {
        width: 100%;
        height: 48vw;
        position: relative;
    }

    .meal_top img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .tiyanone{
        width: 100%;
        background-color: #efefed;
    }
    .zhoubian_tit{
        font-size: 5vw;
        color: #000000;
        font-weight: 400;
        text-align: center;
        padding: 6vw 0;
        /* padding-bottom: 6.667vw; */
    }
    .zhoubian_lunbo{
        padding-bottom: 50px;
        padding-bottom: 6.667vw;
        /* margin-top: 45px; */
    }
    /* .zhoubian_lunbo .swiper-container{
        padding-bottom: 45px;
    } */
    /* .swiper-container-horizontal > .swiper-pagination-bullets{
        bottom: 0;
    }
   
    .zhoubian_lunbo .swiper-container /deep/ .swiper-pagination-bullet{
        width: 2.000vw ;
        height: 2.000vw ;
        background: #dadada;
        opacity: 1;
        margin: 0 12px;
    }
    .zhoubian_lunbo .swiper-container /deep/ .swiper-pagination-bullet-active{
      background-color: #d5b08b;
    } */


    .lunzhou{
        width:100%;
        width:60.000vw;
        overflow: visible !important;
        /* background-color: pink; */
    }
    
    .lunzhou .swiper-slide .list{
        /* width:420px; */
        width:56.000vw;
        background-color: #fff;

    }
    .lunzhou .swiper-slide .list .list_nei{
        width: 48.000vw;
        width:48.000vw;
        margin: auto;
        padding-bottom: 4.667vw;
    }
    .lunzhou .swiper-slide .list .list_nei span{
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 4vw;
        color: #000000;
        font-weight: 400;
        padding-top: 4.000vw;
    }
    .lunzhou .swiper-slide .list .list_nei p{
        margin-top: 2.667vw;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        font-size: 3.5vw;
        color: #000000;
        height: 16vw;
    }
    .lunzhou .swiper-slide .list .list_nei .tupian{
        width: 48.000vw;
        height: 30.133vw;
        overflow: hidden;
        /* margin: 30px 0; */
        /* margin: 2.667vw 0 4.667vw; */
        margin-top: 2.667vw;
    }
    .lunzhou .swiper-slide .list .list_nei .tupian img{ 
        width: 100%;
        display: block;
    }
    .tiyantwo{
        padding: 6.667vw 0;
    }
     .tiyantwo .fuwu{
        width: 100%;
        /* height: 592px; */
        /* display: flex;
        justify-content: space-between; */
    }
    .fuwuleft{
        width: 100%;
        height: 76.000vw;
        overflow: hidden;
    }
    .fuwuleft img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .fueurigth{
        width: 100%;
        margin-top: 4.667vw;
    }
    .fueurigth .fueurigth_text{
        width: 100%;
        margin: auto;
    }
    /* .fueurigth .fueurigth_text .text_wenben{
       
    } */
    
    .fueurigth .fueurigth_text .text_wenben span{
        font-size: 5vw;
        color: #000000;
        font-weight: 400;
    }
    .fueurigth .fueurigth_text .text_wenben p{
        margin-top: 3.000vw;
        font-size: 3.5vw;
        line-height: 5vw;
        color: #000000;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        height: 15vw;
    }
    
    .fueurigth .fueurigth_img{
        display: flex;
        justify-content: space-between;
        height: 28.133vw;
        margin-top: 5.333vw;
    }
    .fueurigth .fueurigth_img .img{
        width: 42.667vw;
        height: 28.133vw;
        overflow: hidden;
    }
    .fueurigth .fueurigth_img .img img{
        width: 100%;
        display: block;
    }
    .tiyanthere{
        width: 100%;
    }
    .tiyanthere_tit{
        /* width: 1400px; */
        width: 89.333vw;
        margin: auto;
        font-size: 5vw;
        color: #000000;
        font-weight: 400;
    }
    .tiyanthere_lunbo{
        margin-top: 6.667vw;
        
    }
    .tiyanthere_lunbo .lunthere{
        width: 100%;
        height: 710px;
        /* width: 87.067vw; */
        height: 93.867vw;
        background-color: #000;
        /* 653 704 */
        /* 
        width: 87.067vw;
        height: 93.867vw; */
    }
    .tiyanthere_lunbo .lunthere .swiper-slide{
        width:87.067vw;
         opacity: 0.7;
    }
    .there_tu{
        width:87.067vw;
        height: 100%;
    }
    .there_tu img{
        width: 100%;
        display: block;
        height: 100%;
    }
    
    /* .tiyanthere_lunbo .lunthere .swiper-slide{
       
    } */
    .tiyanthere_lunbo .lunthere .swiper-slide-active{
        opacity: 1;
    }

/* 320 211 */



/* 620 710 */

/*


*/
   
</style>