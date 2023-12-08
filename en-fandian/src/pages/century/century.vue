<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />

        <div class="conts">
            <div class="meal_top">
                <!-- <img src="../../assets/img/tiyan.jpg" alt=""> -->
                <img :src="Baseurl + topimg" alt="">
            </div>
            <div class="crumbs">
                <p>Your location: Home > {{ topname }}</p>
            </div>
            <Queryhotel class="Queryhotel" />
            <div class="tiyanone">
                <div class="main">
                    <div class="zhoubian" v-if="infolist[0]?.news != ''">
                        <div class="zhoubian_tit">{{ infolist[0]?.name }}</div>
                        <div class="zhoubian_lunbo">
                            <div class="swiper-container lunzhou">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(item, index) in infolist[0]?.news" :key="index"
                                        @click="topath(item)">
                                        <div class="list">
                                            <div class="list_nei">
                                                <span>{{ item.title }}</span>
                                                <p>{{ item.description }}</p>
                                                <div class="tupian">
                                                    <!-- <img src="../../assets/img/tiyan1.jpg" alt=""> -->
                                                    <img :src="Baseurl + item.pc_image" alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 如果需要分页器 -->
                                <div class="swiper-pagination fenye"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tiyantwo" v-if="infolist[1] != ''">
                <div class="main">
                    <!--百度地图容器-->
                    <div class="ditu">
                        <!-- @ready="handler" -->
                        <baidu-map class="bm-view" :center="center" :zoom="zoom" :scroll-wheel-zoom="true">
                            <bm-label :content="contents" :position="center" :labelStyle="{
                                color: '#808080', fontSize: '20px', padding: '5px 20px',
                                border: '1px solid #bababa', borderRadius: '10px',
                                marginLeft: '-120px', textAlign: 'center', marginTop: '-40px'
                            }" title="Hover me" />
                        </baidu-map>
                        <div class="infomercial">
                            <span>Contact us</span>
                            <div v-html="infolist[1]?.news[0].pc_content"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="tiyanthere" v-if="infolist[2]">
                <div class="main">
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
                </div>
            </div> -->
        </div>

        <!-- 公共底部 -->
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/layout/header.vue";
import Footer from "@/components/layout/footer.vue";
import Swiper from "swiper";
import Queryhotel from "../rooms/queryhotel.vue";
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
            infolist: '',
            topimg: '',
            arrayImg: [],
            topname: '',

            //地图
            center: { lng: 0, lat: 0 },
            zoom: 20,
            contents: '北京世纪金源大饭店1',
            dituxinxi: [],
        };
    },
    created() {
        // 储存第几个头部状态
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
        this.dituxinxi = JSON.parse(sessionStorage.getItem("dituxinxi"))
        console.log(this.dituxinxi)
        var zuobiao = this.dituxinxi.coord.split(',')
        console.log(zuobiao)
        // this.center.lng = 116.286812
        // this.center.lat = 39.959567
        var array = {
            lng: zuobiao[0], lat: zuobiao[1]
        }
        // this.center.lng = zuobiao[0]
        // this.center.lat = zuobiao[1]
        this.center = array
        this.zoom = 20
        this.contents = this.dituxinxi.hotel_name
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
        handler({ BMap, map }) {
            console.log(BMap, map)
            var zuobiao = this.dituxinxi.coord.split(',')
            // this.center.lng = 116.286812
            // this.center.lat = 39.959567
            this.center.lng = zuobiao[0]
            this.center.lat = zuobiao[1]
            this.zoom = 20
            this.contents = this.dituxinxi.hotel_name
        },
        getdatalist() {
            //?web_token=${that.token}&hotel_id=1
            var that = this
            that.$axios
                // &module_id=3
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`)
                .then(function (res) {
                    console.log(res)
                    that.topimg = res.data.data.top_module_list[4].pc_image
                    that.topname = res.data.data.top_module_list[4].name
                    that.infolist = res.data.data.defaul_module_list
                    console.log(that.infolist)
                    var array = that.infolist[1].news[0].images
                    var result = []
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].type == 1) {
                            result.push(array[i])
                        }
                    }
                    that.arrayImg = result
                    //infolist
                    //defaul_module_list 
                    that.$nextTick(function () {
                        that.lunboone()
                    })
                }).catch(err => console.log(err));
        },

        topath(item) {
            console.log(item)
            if (item.pc_link && item.pc_link != '') {
                window.open(item.pc_link)
            }
        },
        // pc_link
        lunboone() {
            var lunzhou = new Swiper(".lunzhou", {
                // loop: true, // 循环模式选项
                slidesPerView: 3,
                autoplay: true,
                // centeredSlides: true,//这个是让第一个居中显示的
                spaceBetween: 69,
                // 如果需要分页器
                pagination: {
                    el: ".fenye",
                    clickable: true,
                },
            });
            var lunthere = new Swiper(".lunthere", {
                loop: true, // 循环模式选项
                autoplay: true,
                centeredSlides: true,
                slidesPerView: 3,
                slidesPerView: "auto",
                freeMode: true,
                // autoplay:true,
                // centeredSlides: true,//这个是让第一个居中显示的
                // spaceBetween: 5,
            });
        },

    },
};
</script>
<style scoped>
.ditu {
    display: flex;
    justify-content: space-between;
}

.bm-view {
    width: 900px;
    height: 590px;
}

.infomercial {
    font-size: 20px;
    width: 460px;
}

.infomercial>span {
    font-size: 30px;
    display: block;
    padding: 20px 0;
}

.infomercial>div /deep/ p,
.infomercial>div /deep/ span {
    font-size: 18px;
    line-height: 30px;
    ;
}

.infomercial>div /deep/ img {
    width: 170px;
    height: 170px;
    display: block;
    margin: 5px 0;
}

.meal_top {
    width: 100%;
    height: 350px;
    position: relative;
}

.meal_top img {
    position: absolute;
    width: 1920px;
    height: 350px;
    left: 50%;
    margin-left: -960px;
    top: 0;
}


.tiyanone {
    width: 100%;
    background-color: #efefed;
}

.zhoubian_tit {
    font-size: 30px;
    color: #000000;
    font-weight: 400;
}

.zhoubian_lunbo {
    padding-bottom: 50px;
    margin-top: 45px;
}

.zhoubian_lunbo .swiper-container {
    padding-bottom: 45px;
}

.swiper-container-horizontal>.swiper-pagination-bullets {
    bottom: 0;
}

/* .swiper-pagination .swiper-pagination-bullet-active{
        background: #d5b08b;
    } */

.zhoubian_lunbo .swiper-container /deep/ .swiper-pagination-bullet {
    width: 15px;
    height: 15px;
    background: #dadada;
    opacity: 1;
    margin: 0 12px;
}

.zhoubian_lunbo .swiper-container /deep/ .swiper-pagination-bullet-active {
    background-color: #d5b08b;
}

/* .swiper-container-horizontal > .swiper-pagination-bullets > .swiper-pagination-bullet{
        width: 15px !important;
        height: 15px !important;
    } 
    .fenye .swiper-pagination-bullet{
        width: 15px;
        height: 15px;
    } */

.lunzhou {
    width: 100%;
    /* background-color: pink; */
}

.lunzhou .swiper-slide .list {
    width: 420px;
    background-color: #fff;
    cursor: pointer;
}

.lunzhou .swiper-slide .list .list_nei {
    width: 360px;
    margin: auto;
    padding-bottom: 1px;
}

.lunzhou .swiper-slide .list .list_nei span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 30px;
    color: #000000;
    font-weight: 400;
    padding-top: 30px;
}

.lunzhou .swiper-slide .list .list_nei p {
    margin-top: 10px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 18px;
    color: #000000;
    height: 78px;
}

.lunzhou .swiper-slide .list .list_nei .tupian {
    width: 360px;
    height: 226px;
    overflow: hidden;
    /* margin: 30px 0; */
    margin: 25px 0 30px;
}

.lunzhou .swiper-slide .list .list_nei .tupian img {
    width: 100%;
    display: block;
}

.tiyantwo {
    padding: 75px 0;
    padding-bottom: 75px;
}

.tiyantwo .fuwu {
    width: 100%;
    height: 592px;
    display: flex;
    justify-content: space-between;
}

.fuwuleft {
    width: 700px;
    height: 100%;
    overflow: hidden;
}

.fuwuleft img {
    width: 100%;
    height: 100%;
    display: block;
}

.fueurigth {
    width: 670px;
    display: flex;
    align-items: center;
}

.fueurigth .fueurigth_text {
    width: 470px;
    margin: auto;
    /* background-color: pink; */
    height: 382px;
    display: flex;
    align-items: center;
}

/* .fueurigth .fueurigth_text .text_wenben{
       
    } */

.fueurigth .fueurigth_text .text_wenben span {
    font-size: 30px;
    color: #000000;
    font-weight: 400;
}

.fueurigth .fueurigth_text .text_wenben p {
    margin-top: 15px;
    font-size: 18px;
    line-height: 30px;
    color: #000000;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    height: 90px;
}

.fueurigth .fueurigth_img {
    display: flex;
    justify-content: space-between;
    height: 211px;
}

.fueurigth .fueurigth_img .img {
    width: 320px;
    height: 211px;
    overflow: hidden;
}

.fueurigth .fueurigth_img .img img {
    width: 100%;
    display: block;
}

.tiyanthere {
    width: 100%;
}

.tiyanthere_tit {
    width: 1400px;
    margin: auto;
    font-size: 30px;
    color: #000000;
    font-weight: 400;
}

.tiyanthere_lunbo {
    margin-top: 37px;
    margin-bottom: 50px;
}

.tiyanthere_lunbo .lunthere {
    width: 100%;
    height: 710px;
    height: 530px;
    background-color: #000;

}

.tiyanthere_lunbo .lunthere .swiper-slide {
    /* width: 620px; */
    width: 466px;
    /* width: 460px; */
    opacity: 0.7;
}

.tiyanthere_lunbo .lunthere .swiper-slide:hover {
    opacity: 1;
}

.tiyanthere_lunbo .lunthere .swiper-slide .there_tu {
    width: 100%;
    height: 100%;
}

.tiyanthere_lunbo .lunthere .swiper-slide .there_tu img {
    width: 100%;
    height: 100%;
    display: block;
}

/* .tiyanthere_lunbo .lunthere .swiper-slide{
       
    } */
.tiyanthere_lunbo .lunthere .swiper-slide-active {
    opacity: 1;
}

/* 320 211 */



/* 620 710 */

/*


*/
</style>