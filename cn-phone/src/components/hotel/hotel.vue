<template>
    <div class="container">
        <Header />
        <!-- 日历 -->
        <Queryhotel />
        <!-- 酒店与度假酒店 -->
        <div class="conts">
            <div class="lunbo">
                <div class="swiper-container lunone">
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
                    <!-- 如果需要导航按钮 -->
                    <!--  <div class="swiper-button-prev"></div>-->
                    <!--  <div class="swiper-button-next"></div>-->
                    <!-- 如果需要滚动条 -->
                    <!--        <div class="swiper-scrollbar"></div>-->
                    <div class="swiper-wrapper">
                        <!-- <div class="swiper-slide">
                            <img src="../../assets/img/hotle1.jpg" alt="">
                        </div> -->
                        <div class="swiper-slide" v-for="(item,index) in onelist.news" :key="index">
                            <!-- <img src="../../assets/img/hotle1.jpg" alt=""> -->
                            <img :src="Baseurl+item.mobile_image" alt="">
                        </div>
                    </div>
                </div>
            </div>

            <!-- 探索丰富优惠 -->
            <div class="explore">
                <div class="title">{{twolist.name}}</div>
                <div class="youhui">
                    <!-- 如果需要导航按钮 -->
                    <div class="swiper-button-prev prevtwo"></div>
                    <div class="swiper-button-next nexttwo"></div>
                    <div class="swiper-container luntwo">
                        <!-- 如果需要分页器 -->
                        <!-- <div class="swiper-pagination"></div> -->
                        <!-- 如果需要导航按钮 -->
                        <!-- <div class="swiper-button-prev prevtwo"></div>
                            <div class="swiper-button-next nexttwo"></div> -->
                        <!-- 如果需要滚动条 -->
                        <!-- <div class="swiper-scrollbar"></div> -->
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in twolist.news" :key="index">
                                <div class="list">{{item.title}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tansuo">
                    <!-- 至少有三个运行才正常 -->
                    <div class="tansuo_list" v-for="(item,index) in twolist.news" :key="index">
                        <!-- <img src="../../assets/img/hotel2.jpg" alt=""> -->
                        <img :src="Baseurl+item.mobile_image" alt="">
                        <!-- <div class="list_wen">
                            <div class="neirong">
                                <span>{{item.description}}</span>
                                <p class="biao" v-html="item.description1"></p>
                                <p class="list_wen_text" v-html="item.pc_content">
                                    {{item.pc_content}}
                                </p>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
            <!-- 图库展示 -->
            <!-- div.gallery -->
            <div class="gallery">
                <div class="title">{{therelist.name}}</div>
                <div class="gallery_lunbo">
                    <div class="swiper-container lunthere">
                        <!-- 如果需要分页器 -->
                        <!-- <div class="swiper-pagination"></div> -->
                        <!-- 如果需要导航按钮 -->
                        <!-- <div class="swiper-button-prev prevtwo"></div>
                        <div class="swiper-button-next nexttwo"></div> -->
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in therelist.news" :key="index"
                                @click="start(index)">
                                <div class="gallery_list">
                                    <!-- <img src="../../assets/img/hotel3.jpg" alt=""> -->
                                    <img :src="Baseurl+item.pc_image" alt="">
                                    <div class="gallery_list_version">
                                        <div class="version_eara">
                                            <span>{{item.title}}</span>
                                            <p>{{item.description}}</p>
                                            <div class="chakan">查看详细</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 如果需要滚动条 -->
                    <div class="gundong">
                        <div class="swiper-scrollbar gall_scroll"></div>
                    </div>
                </div>
                <div class="more" @click="gettuku(therelist.id)">查看更多</div>
            </div>

            <!-- 新闻动态 -->
            <div class="news">
                <div class="main">
                    <div class="title">{{fourlist.name}}</div>
                    <div class="new_list" v-if="fourlist">
                        <div class="new_list_item" v-for="(item,index) in fourlist.news.slice(0,3)" :key="index" @click="getnewdetail(item.id)">
                            <!-- <div class="time">
                                <span>{{item.created_at.slice(5,7)}}/{{item.created_at.slice(8,10)}}</span>
                                <p>{{item.created_at.slice(0,4)}}</p>
                            </div> -->
                            <div class="news_tu">
                                <!-- <img src="../../assets/img/hotel4.jpg" alt=""> -->
                                <img :src="Baseurl+item.pc_image" alt="">
                            </div>
                            <div class="time" v-if="item.updated_at">
                                <span>{{item.updated_at.slice(5,7)}}/{{item.updated_at.slice(8,10)}}</span>
                                <p>{{item.updated_at.slice(0,4)}}</p>
                            </div>
                            <div class="news_text">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="more" @click="getnewlist()">查看更多</div>
            </div>
            <!-- 宴会餐饮住宿 -->
            <div class="meal">
                <div class="meal_datu">
                    <!-- {{fivelist}} -->
                    <div class="meal_datu_img" v-for="(item,index) in fivelist" :key="index">
                        <img :src="Baseurl+item.mobile_image" alt="">
                    </div>
                </div>
                <div class="meal_lunbo">
                    <div class="swiper-container lunfour">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in fivelist" :key="index" @click="topath(item.mobile_link)">
                                <div class="meal_list">
                                    <div class="meal_tubiao">
                                        <img class="img1" :src="Baseurl+item.images[0].image" alt="">
                                        <img class="img2" :src="Baseurl+item.images[1].image" alt="">
                                    </div>
                                    <p class="meal_list_tit">{{item.title}}</p>
                                    <div class="meal_detail">查看详情</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="yudings" @click="getroom()">预定房型</div>
        </div>
        <div class="topTips" v-if="swipershow">
            <div class="close" @click="guanbi()">
                <img src="../../assets/img/cha.png" alt="">
            </div>
            <div class="lunboblos">
                <div class="swiper-container lunbotuku">
                <!-- 如果需要分页器 -->
                <!-- <div class="swiper-pagination"></div> -->
                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev lunzuotuku"></div>
                <div class="swiper-button-next lunyoutuku"></div>
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in therelist.news" :key="index">
                    <!-- <img src="../../assets/img/hotle1.jpg" alt="" /> -->
                    <img :src="Baseurl+item.pc_image" alt="">
                    <div class="wenzis">{{item.title}}<br/>{{ item.description }}</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <Footer />
        <div class="zhanwei"></div>
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
        // name: "Swiper",
        data() {
            return {
                token: '',//token
                hotel_id: '',//酒店id
                modularid: '',//模块id
                infolist: '',//整体数据
                onelist: '',
                twolist: '',
                therelist: '',
                fourlist: '',
                fivelist: '',
                swipershow: false,
            };
        },

        created() {
            // 储存第几个头部状态
            localStorage.setItem("istrue", 1);
            this.token = sessionStorage.getItem("token");
            // console.log(this.token);
            this.hotel_id = sessionStorage.getItem("hotel_id");
            // if(sessionStorage.getItem("fieldData")){
            //     var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
            //    this.modularid = fieldData[0].id
            // }
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
                    that.modularid = fieldData[0].id
                    sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
                    that.getdatalist()
                    })
                    .catch((err) => console.log(err));
            },
            getdatalist() {
                //?web_token=${that.token}&hotel_id=1
                var that = this
                that.$axios
                    // &module_id=3
                    .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`)
                    .then(function (res) {
                        console.log(res)
                        //defaul_module_list 
                        that.infolist = res.data.data.defaul_module_list
                        that.onelist =  res.data.data.defaul_module_list[0]
                        that.twolist =  res.data.data.defaul_module_list[1]
                        that.therelist =  res.data.data.defaul_module_list[2]
                        that.fourlist =   res.data.data.defaul_module_list[3]
                        // that.fourlist =  res.data.data.319
                        that.fivelist =  res.data.data.defaul_module_list[4].news
                        console.log(that.fivelist)

                        that.$nextTick(function () {
                            that.lunboone()
                        })
                    }).catch(err => console.log(err));
            },
            //轮播
            lunboone() {
                var mySwiperone = new Swiper(".lunone", {
                    loop: true, // 循环模式选项
                    // autoplay: true,
                    autoplay : {
                        delay:5000
                    },
                    // effect: 'fade',
                });
                var tansuo_list = document.querySelectorAll(".tansuo .tansuo_list")
                tansuo_list[0].style.display = 'block'
                var mySwipertwo = new Swiper(".luntwo", {
                    loop: true, // 循环模式选项
                    // slidesPerView: 3,
                    // centeredSlides: true,//这个是让第一个居中显示的
                    // spaceBetween: 20,
                    slidesPerView: 3,
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: ".nexttwo",
                        prevEl: ".prevtwo",
                    },
                    on: {
                        slideChangeTransitionEnd: function () {
                            for (var i = 0; i < tansuo_list.length; i++) {
                                tansuo_list[i].style.display = 'none'
                            }
                            console.log(this.realIndex)
                            tansuo_list[this.realIndex].style.display = 'block'
                        },
                        click: function (swiper) {
                            mySwipertwo.slideTo(this.clickedIndex);
                            mySwipertwo.slideToLoop(this.realIndex);
                        },
                    },
                });
                // var gallery_list_version = document.querySelectorAll(".gallery_list_version")
                var mySwiperthere = new Swiper(".lunthere", {
                    loop: true, // 循环模式选项
                    slidesPerView: "auto",
                    centeredSlides: true,
                    // slidesPerView: 3,
                    // centeredSlides: true,//这个是让第一个居中显示的
                    // spaceBetween: 57,
                    // slidesPerView: 3,
                    // loopedSlides: 5,
                    scrollbar: {
                        el: ".gall_scroll",
                        draggable: true,
                        // dragSize: 110,
                        // height:9,
                    },
                    on: {
                        click: function (swiper) {
                            mySwiperthere.slideTo(this.clickedIndex);
                            mySwiperthere.slideToLoop(this.realIndex);
                        },
                    },
                });
                mySwiperthere.scrollbar.$dragEl.css('background', '#206079');
                mySwiperthere.scrollbar.$dragEl.css('top', '-0.800vw');

                var meal_datu_img = document.querySelectorAll(".meal_datu .meal_datu_img")
                meal_datu_img[0].style.display = 'block'
                var mySwiperfour = new Swiper(".lunfour", {
                    loop: true, // 循环模式选项
                    autoplay:true,
                    // slidesPerView: "auto",
                    centeredSlides: true,//这个是让第一个居中显示的
                    // spaceBetween: 20,
                    slidesPerView: 3,
                    on: {
                        slideChangeTransitionEnd: function () {
                            // var that = this
                            for (var i = 0; i < meal_datu_img.length; i++) {
                                meal_datu_img[i].style.display = 'none'
                            }
                            console.log(this.realIndex)
                            meal_datu_img[this.realIndex].style.display = 'block'
                        },
                        click: function (swiper) {
                            mySwiperfour.slideTo(this.clickedIndex);
                            mySwiperfour.slideToLoop(this.realIndex);
                        },
                    },
                });
            },
            start(index) {
                this.swipershow = true;
                var that = this;
                console.log(index)
                this.$nextTick(function () {
                    // this.lunbo();
                    var mySwiper = new Swiper(".lunbotuku", {
                        effect: 'fade',
                        loop: true, // 循环模式选项
                        // autoplay: {
                        //   delay: 3000,
                        //   stopOnLastSlide: false,
                        //   disableOnInteraction: true,
                        // },
                        autoplay: false,
                        //如果需要前进后退按钮
                        navigation: {
                            nextEl: ".lunyoutuku",
                            prevEl: ".lunzuotuku",
                        },
                    });
                    mySwiper.slideTo(parseInt(index));
                    mySwiper.slideToLoop(parseInt(index));
                });
            },
            guanbi() {
                this.swipershow = false
            },
            lunbo() {
                var mySwiper = new Swiper(".lunbotuku", {
                    loop: true, // 循环模式选项
                    autoplay: {
                        delay: 3000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    autoplay: false,
                    //如果需要前进后退按钮
                    navigation: {
                        nextEl: ".lunyoutuku",
                        prevEl: ".lunzuotuku",
                    },
                });
            },
            //图库展示页
            gettuku(id) {
                // console.log(id)
                this.$router.push({
                    name: 'Tuku',
                    query: {
                        id: id,
                        img:this.therelist.pc_image
                    }
                })
            },
            //新闻列表页
            getnewlist() {
                this.$router.push({ name: 'NewsList' ,
                    query: {
                        id: this.fourlist.id
                    }})
            },
            //新闻详情页
            getnewdetail(id) {
                console.log(id)
                this.$router.push({
                    name: 'NewsDetail',
                    query: {
                        id:this.fourlist.id,
                        newsId:id
                    }
                })
            },
            //预定房型
            getroom() {
                this.$router.push({
                    name: "RoomsList",
                    // query: {
                    //   startDate:this.starttime,
                    //   endDate:this.endtime,
                    //   numDay:this.roomIndex,//默认一天
                    // },
                });
            },
            topath(link) {
                // console.log("点击了")
                // console.log(link)
                window.location.href = link
                // window.location.href="http://localhost:8081/#/banquet"
                // window.open(item.pc_link)
                // this.$router.push({name:link}) 
            }
        },
        mounted() {
            
        },
    };
</script>
<style scoped>
    /*  */
    .more {
        font-size: 4vw;
        width: 20vw;
        margin: auto;
        text-align: center;
        margin-top: 7vw;
        color: #5f5f5f;
    }

    /* 公用的标题大小 */
    .title {
        font-size: 5vw;
        /* line-height: 86px; */
        color: #000000;
        text-align: center;
        font-weight: 400;
    }

    /* lunbo第一块的大图轮播 */
    .lunbo {
        width: 100%;
        height: 48.000vw;
        position: relative;
    }

    .lunbo .lunone {
        width: 100%;
        height: 100%;
    }

    /* .lunbo .lunone .sw */

    .lunbo .lunone .swiper-slide img {
        width: 100%;
        height: 100%;
        display: block;
    }

    /* 探索丰富优惠 */
    .explore {
        padding-top: 6.000vw;
    }

    .explore .youhui {
        width: 80.000vw;
        margin: auto;
        position: relative;
        margin-top: 6.667vw;
    }

    .explore .youhui .luntwo {
        width: 89.333vw;
        margin: auto;
    }

    /* .explore .youhui .luntwo .swiper-slide {
        width: 26.667vw !important;
        border: 0.133vw solid #000;
    } */

    .explore .youhui .luntwo .swiper-slide .list {
        width: 26.667vw;
        font-size: 4vw;
        color: #000000;
        text-align: center;
        cursor: pointer;
    }

    .explore .youhui .prevtwo,
    .explore .youhui .nexttwo {
        width: 1.200vw;
        height: 2.267vw;
        /* background-image: url(../../assets/img/jthei.png); */
        background-size: 100%;
        background-repeat: no-repeat;
        margin-top: -0.933vw;
        color: #000;
    }

    .explore .youhui .prevtwo {
        /* transform: rotate(180deg); */
        left: -4.000vw;
    }

    .explore .youhui .nexttwo {
        right: -4.000vw;
    }

    .explore .youhui .prevtwo::after {
        font-size: 3.333vw;
    }

    .explore .swiper-slide-active .list,
    .explore .swiper-slide-duplicate-active {
        color: #206079 !important;
    }

    .explore .youhui .nexttwo::after {
        font-size: 3.333vw;
    }

    .explore .tansuo {
        width: 100%;
        height: 60.00vw;
        margin-top: 8.000vw;
    }

    .explore .tansuo .tansuo_list {
        width: 100%;
        height: 60.00vw;
        display: none;
        overflow: hidden;
        position: relative;
    }

    .explore .tansuo .tansuo_list img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .explore .tansuo .tansuo_list .list_wen {
        width: 79.333vw;
        height: 33.333vw;
        position: absolute;
        top: 50%;
        margin-top: -16.666vw;
        left: 50%;
        margin-left: -39.666vw;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.5);
    }

    .explore .tansuo .tansuo_list .list_wen .neirong {
        width: 66.667vw;
        margin-top: 6.000vw;
        margin-left: 8.000vw;
    }

    .explore .tansuo .tansuo_list .list_wen .neirong>span {
        font-size: 4vw;
        color: #206079;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
    }

    .explore .tansuo .tansuo_list .list_wen .neirong .biao {
        margin-top: 2vw;
        line-height: 5vw;
        font-size: 3.2vw;
        color: #515151;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .explore .tansuo .tansuo_list .list_wen .neirong .list_wen_text {
        /* margin-top: 3.667vw; */
        font-size: 3.2vw;
        line-height: 5vw;
        height: 10vw;
        color: #515151;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    /* .gallery_list_version */
    /* 图库展示 */
    .gallery {
        width: 100%;
        background-color: #efefed;
        padding-top: 6.667vw;
        padding-bottom: 7.333vw;
    }

    .gallery_lunbo {
        margin-top: 6.667vw;
        position: relative;
    }

    .gallery_lunbo .gundong {
        width: 100%;
        height: 0.400vw;
        background-color: #fff;
        margin-top: 7.333vw;
        position: relative;
    }

    .gallery_lunbo .gall_scroll {
        width: 100%;
        height: 1.200vw;
        background-color: #efefed;
        position: absolute;
        top: 0.400vw;
    }

    .gallery_lunbo .swiper-scrollbar .swiper-scrollbar-drag {
        /* width: 14.667vw !important; */
        height: 1.200vw !important;
        background: #206079 !important;
    }


    .gallery_lunbo .lunthere {
        /* width: 850px; */
        width: 84.5vw;
        overflow: visible !important;
    }

    .gallery_lunbo .lunthere .swiper-slide .gallery_list {
        /* width: 790px; */
        width: 79.333vw;
        height: 63.600vw;
        /* 78.667vw
        63.333vw */
        width:  78.667vw;
        height: 63.333vw;
        margin: auto;
        overflow: hidden;
        position: relative;
    }

    .gallery_lunbo .lunthere .swiper-slide .gallery_list img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .gallery_lunbo .lunthere .swiper-slide .gallery_list .gallery_list_version {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, .5);
        color: #fff;
        /* display: flex; */
        align-items: center;
        justify-content: center;
        display: none;
    }

    /* .gallery_lunbo .lunthere .swiper-slide .gallery_list:hover .gallery_list_version{
        display: block;
    } */

    .gallery_lunbo .lunthere .swiper-slide-active .gallery_list .gallery_list_version {
        display: flex;
    }

    .gallery_list_version .version_eara {
        width: 66.000vw;
        margin: auto;
        /* margin-top: 163px;    */
        margin-top: 12vw;
    }

    .gallery_list_version .version_eara span {
        font-size: 4vw;
        color: #fff;
        text-align: center;
        display: block;
    }

    .gallery_list_version .version_eara p {
        margin-top: 4.533vw;
        height: 20vw;
        line-height: 5vw;
        font-size: 3.2vw;
        color: #fff;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }

    .gallery_list_version .version_eara div {
        margin-top: 4.000vw;
        text-align: center;
    }

    .chakan {
        width: 20.000vw;
        height: 8.000vw;
        margin: auto;
        border: 0.133vw solid #847c78;
        box-sizing: border-box;
        line-height: 8.000vw;
        color: #fff;
        cursor: pointer;
        position: relative;
        transition: 400ms ease all;
        font-size: 3.2vw;
    }

    /* .chakan:hover {
        background-color: #d5b08b;
        color: #fff;
        border: 1px solid #d5b08b;
    }

    .chakan:before,
    .chakan:after {
        content: '';
        position: absolute;
        top: -1px;
        right: -1px;
        height: 2px;
        width: 0;
        background: #fff;
        transition: 400ms ease all;
    }

    .chakan:after {
        right: inherit;
        top: inherit;
        left: -1px;
        bottom: -1px;
    }

    .chakan:hover:before,
    .chakan:hover:after {
        width: 135px;
        transition: 400ms ease all;
    } */

    /* 新闻动态 */
    .news {
        width: 100%;
        padding-top: 6.667vw;
        /* padding-bottom: 60px; */
        padding-bottom: 6vw;
    }

    .news .new_list {
        width: 100%;
        margin-top: 6.667vw;
    }

    .news .new_list .new_list_item {
        /* width: 450px; */
        width: 100%;
        margin-bottom: 3.333vw;
    }

    .news .new_list .new_list_item .time {
        font-family: Arial;
        /* display: flex; */
        margin-top: 3.333vw;
    }

    .news .new_list .new_list_item .time span {
        /* font-size: 30px; */
        font-size: 4.5vw;
        color: #a8916f;
    }

    .news .new_list .new_list_item .time p {
        margin-left: 10px;
        /* font-size: 20px; */
        font-size: 3.2vw;
        color: #a8916f;
        display: inline-block;
    }

    .news .new_list .new_list_item .news_tu {
        /* margin-top: 30px; */
        width: 100%;
        height: 44.667vw;
        overflow: hidden;
    }

    .news .new_list .new_list_item .news_tu img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .news .new_list .new_list_item .news_text {
        margin-top: 2.000vw;
        font-size: 4vw;
        color: #000000;
        height: 10vw;
        line-height: 5vw;
        /* width:200px; */
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        /*要显示的行数*/
        -webkit-box-orient: vertical;
    }

    /* .news .new_list .new_list_item .news_detail{
        margin-top: 50px;
        width: 146px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
        cursor: pointer;
    }
    .news .new_list .new_list_item .news_detail p{
        font-size: 20px;
        color: #a8916f;
    }
    .news .new_list .new_list_item .news_detail img{
        width: 15px;
        height: 11px;
        display: block;
    }
    .news .new_list .new_list_item .news_detail::after{
        position: absolute;
        content: "";
        width: 100%;
        height: 3px;
        bottom: 0;
        left: 0;
        z-index: 2;
        background: linear-gradient(to right, #206079 0% ,#206079 40% ,#a8916f 41%);
    } */
    /* 餐饮宴会住宿 */
    .meal {
        width: 100%;
    }

    .meal {
        width: 100%;
        /* height: 800px; */
        height: 86.667vw;
        position: relative;
    }

    .meal .meal_datu {
        width: 100%;
        height: 86.667vw;
    }

    .meal .meal_datu .meal_datu_img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }

    .meal .meal_datu .meal_datu_img img {
        width: 100%;
        height: 100%;
        display: block;
        /* width: 100%;
        height: 800px;
        display: block; */

        /* width: 1920px;
        height: 800px;
        display: block;
        position: absolute;
        top: 0;
        z-index: 1;
        left: 50%;
        margin-left: -960px; */
    }

    .meal .meal_lunbo {
        position: absolute;
        bottom: 0;
        left: 0;
        padding-bottom: 6.000vw;
        z-index: 2;
        width: 100%;
        background: linear-gradient(to top, black, transparent);
    }

    .meal .meal_lunbo .lunfour {
        /* width: 460px; */
        /* width: 1380px; */
        width: 100%;
        margin: auto;
        color: #fff;
    }

    .meal .meal_lunbo .lunfour .swiper-slide {
        height: 23.600vw;
        display: flex;
        align-items: flex-end;
    }

    .meal .meal_lunbo .lunfour .swiper-slide .meal_list {
        width: 100%;
    }

    .meal .meal_lunbo .lunfour .swiper-slide .meal_list .meal_tubiao {
        width: 6.667vw;
        height: 6.667vw;
        margin: auto;
    }

    .meal .meal_lunbo .lunfour .swiper-slide .meal_list .meal_tubiao img {
        width: 100%;
        height: 100%;
    }

    .meal .meal_lunbo .lunfour .swiper-slide .meal_list .meal_tubiao .img1 {
        display: block;
    }

    .meal .meal_lunbo .lunfour .swiper-slide .meal_list .meal_tubiao .img2 {
        display: none;
    }

    .meal .meal_lunbo .lunfour .swiper-slide .meal_list_tit {
        margin: auto;
        text-align: center;
        color: #a8916f;
        margin-top: 1.333vw;
        font-size: 5.2vw;
    }

    .meal .meal_lunbo .lunfour .swiper-slide .meal_detail {
        margin: auto;
        text-align: center;
        width: 18.000vw;
        height: 6.000vw;
        box-sizing: border-box;
        line-height: 6.000vw;
        border: 0.133vw solid #6f6f6f;
        color: #fff;
        margin-top: 2.000vw;
        font-size: 3.2vw;
        display: none;
        cursor: pointer;
    }

    .meal .meal_lunbo .lunfour .swiper-slide-active .meal_list {
        /* border-left: 0.133vw solid #afa9a4;
        border-right: 0.133vw solid #afa9a4; */
        position: relative;
    }

    .meal .meal_lunbo .lunfour .swiper-slide-active .meal_list::after {
        position: absolute;
        content: "";
        width: 0.133vw;
        height: 12vw;
        background-color: #afa9a4;
        right: 0;
        bottom: 0;
    }
    .meal .meal_lunbo .lunfour .swiper-slide-active .meal_list::before {
        position: absolute;
        content: "";
        width: 0.133vw;
        height: 12vw;
        background-color: #afa9a4;
        left: 0;
        bottom: 0;
    }
    .meal .meal_lunbo .lunfour .swiper-slide-active .meal_list .meal_tubiao .img1 {
        display: none;
    }

    .meal .meal_lunbo .lunfour .swiper-slide-active .meal_list .meal_tubiao .img2 {
        display: block;
    }

    .meal .meal_lunbo .lunfour .swiper-slide-active .meal_list_tit {
        color: #fff;
    }

    .meal .meal_lunbo .lunfour .swiper-slide-active .meal_detail {
        display: block;
    }

    /* 预定房型 */
    .yudings {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 15vw;
        background: #d5b08b;
        color: #fff;
        font-size: 5.5vw;
        line-height: 15vw;
        text-align: center;
    }

    .zhanwei {
        width: 100%;
        height: 20vw;
    }
    .topTips {
  width: 100%;
  /* height: 100%; */
  height: calc(100% - 14.667vw);
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #000000;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close {
  position: absolute;
  top: 4.000vw;
  right: 4.000vw;
  cursor: pointer;
  width: 5.333vw;
  height: 5.333vw;
}
.close img {
  width: 100%;
  height: 100%;
  display: block;
}
.lunboblos {
  width: 80%;
}
.lunboblos .lunbotuku {
  width: 100%;
}
.lunboblos .lunbotuku .swiper-slide img {
  width: 100%;
}

.lunzuotuku {
  width: 50%;
  height: 100%;
  top: 0;
  margin-top: 0;
  left: 0;
  cursor: url(../../assets/img/slider-left-white.png) 0 11, auto;
}
.lunzuotuku::after {
  display: none;
}
.lunyoutuku {
  width: 50%;
  height: 100%;
  top: 0;
  margin-top: 0;
  right: 0;
  cursor: url(../../assets/img/slider-right-white.png) 32 11, auto;
}
.lunyoutuku::after {
  display: none;
}
.wenzis{
  color: #fff;
  font-size: 4vw;
  margin-top: 5vw;
  background-color: #000000;
  height: 35vw;
  overflow: auto;
}
</style>