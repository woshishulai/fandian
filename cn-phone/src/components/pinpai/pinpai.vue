<template>
    <div>
        <div class="brand">
            <!-- <div class="dorsum"  v-show="menushow"></div> -->
            <div class="blockone">
                <div class="fudong">
                    <!-- <div class="menu">
                        <div class="yuding">立即预定</div>
                        <div class="yuyan">中文</div>
                        <div class="img_menu" @click="menu()"><img src="../../assets/img/menu.png" alt=""></div>
                    </div> -->

                    <div class="tansuo">
                        <div class="tansuo_logo"><img src="../../assets/img/bailogo.png" alt=""></div>
                        <!-- <p @click="hotel()">探索酒店</p> -->
                    </div>
                    <div class="tiaozhuan">
                        <div class="label">
                            <div class="label_list" @click="goAnchor('#anchor1')">{{boxone.title}}</div>
                            <div class="label_list" @click="goAnchor('#anchor2')">{{boxthere.title}}</div>
                            <div class="label_list" @click="goAnchor('#anchor3')">{{boxtwo.title}}</div>
                        </div>
                        <!-- @click="goAnchor('#anchor1')" -->
                        <div class="shubiao">
                            <div class="live" @click="hotel()">
                                <!-- 这里的p标签可以换成一个img标签，用一个圆形的图片放在中间，周围实现扩散的效果图-->
                                <!-- <img src="" alt=""> -->
                                <div class="span1" v-if="datalist.News324">
                                    <p>{{datalist.News324[0].title}}</p>
                                    <img class="shuxia" src="../../assets/img/shuxia.png" alt="">
                                </div>
                                <div class="span2"></div>
                                <!-- <span></span> -->
                            </div>
                            <!-- <img class="shu" src="../../assets/img/shu.png" alt="">
                            <img class="shuxia" src="../../assets/img/shuxia.png" alt=""> -->
                        </div>
                    </div>
                </div>

                <div class="swiper swiper-container" v-if="lunbo">
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
                    <!-- 如果需要导航按钮 -->
                    <div class="swiper-button-prev lunzuo"></div>
                    <div class="swiper-button-next lunyou"></div>

                    <!-- 如果需要滚动条 -->
                    <!-- <div class="swiper-scrollbar"></div>-->

                    <!-- <div class="buts" ref="buts">
                        <div class="bo" ref="bo">
                            <img src="../../assets/img/bo.png" alt="">
                        </div>
                        <div class="ting" ref="ting">
                            <img src="../../assets/img/ting.png" alt="">
                        </div>
                    </div> -->
                    <div class="swiper-wrapper">

                        <div class="swiper-slide" v-for="(item,index) in lunbo" :key="index" >
                                <img v-if="item.is_video == 2" :src="Baseurl+item.image" alt="">
                                <div class="box" v-if="item.is_video == 1 ">
                                    <div class="tv" ref="tv">
                                        <video :src="Baseurl+item.image" id="tvs" autoplay="autoplay" muted="muted"
                                            style="object-fit: fill">您的浏览器不支持video标签。</video>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="blocktwo" id="anchor1">
                <div class="main">
                    <div class="block_nei">
                        <div class="blocktwo_left">
                            <div class="wenzi">
                                <div class="title">
                                    <span>{{boxone.en_title}}</span>
                                    <p>{{boxone.title}}</p>
                                </div>
                                <div class="wenben">
                                    <p>{{boxone.description1}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="blocktwo_right">
                            <img :src="Baseurl+boxone.mobile_image" alt="">
                        </div>
                    </div>
                </div>

            </div>

            <div class="blockfour" id="anchor3">
                <div class="main">
                    <div class="block_nei">
                        <div class="left">
                            <div class="wenzi">
                                <div class="title">
                                    <span>{{boxthere.en_title}}</span>
                                    <p>{{boxthere.title}}</p>
                                </div>
                                <div class="wenben">
                                    <p>{{boxthere.description1}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <!-- <img src="../../assets/img/pin2.jpg" alt=""> -->
                            <img :src="Baseurl+boxthere.mobile_image" alt="">
                        </div>
                    </div>
                </div>

            </div>
            <div class="blockthere" id="anchor2">
                <div class="blockimgs">
                    <!-- <img  src="../../assets/img/pin3.jpg" alt=""> -->
                    <img :src="Baseurl+boxtwo.mobile_image" alt="">
                </div>

                <div class="there_wenzi">
                    <div class="title">
                        <span>{{boxtwo.en_title}}</span>
                        <p>{{boxtwo.title}}</p>
                    </div>
                    <div class="wenben">
                        <p>{{boxtwo.description1}}</p>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
    import Swiper from "swiper";
    import Footer from "../owned/footer.vue"
    export default {
        components: {
            Footer
        },
        name: "Swiper",
        data() {
            return {
                token: '',
                hotel_id: '',
                menushow: false,
                datalist: [],
                hotelcode: '',
                hotelist: [],
                lunbo: [
                ],
                boxone: [],
                boxtwo: [],
                boxthere: [],
                curindex: 0,
                ismore: true,
            };
        },

        created() {
            // this.gettoken()
            // this.user = localStorage.getItem("user");
            // console.log(this.user);
            this.token = sessionStorage.getItem("token");
            this.hotel_id = sessionStorage.getItem("hotel_id");
            this.getdatalist()
            // this.swiperslun()

        },
        inject: ['reload'],
        methods: {
            // gettoken() {
            //     var that = this;
            //     that.$axios
            //         .post(`${this.Baseurl}/hotel_state_token`)
            //         .then(function (res) {
            //             console.log(res.data.token);
            //             sessionStorage.setItem("token", res.data.token);
            //             that.token = res.data.token
            //             // this.reload()
            //             // that.getlist()
            //             that.getdatalist()
            //         })
            //         .catch((err) => console.log(err));
            // },
            // getlist() {
            //     //http://ssjydfd.sc798.com/hotel_list
            //     var that = this
            //     that.$axios
            //         .get(`${this.Baseurl}hotel_list?web_token=${that.token}`)
            //         .then(function (res) {
            //             console.log(res)
            //             that.hotelist = res.data.data
            //             sessionStorage.setItem("hotel_id", that.hotelist[0].id);
            //             sessionStorage.setItem("hotelcode", that.hotelist[0].hotel_code);
            //             sessionStorage.setItem("hotelname", that.hotelist[0].hotel_name);
            //             that.hotelcode = that.hotelist[0].hotel_code
            //             that.hotel_id = that.hotelist[0].id
            //             // console.log(sessionStorage.getItem("hotelcode"))
            //             that.getdatalist()
            //         }).catch(err => console.log(err));
            // },
            getdatalist() {
                var that = this
                that.$axios
                    .get(`${this.Baseurl}show_page?web_token=${that.token}&hotel_id=${that.hotel_id}`)
                    .then(function (res) {
                        console.log(res)
                        // var hotelcode = res.data.code
                        // console.log(hotelcode)
                        // sessionStorage.setItem("hotelcode",hotelcode);
                        // console.log(sessionStorage.getItem("hotelcode"))
                        that.datalist = res.data.data
                        // console.log(that.datalist)
                        // that.lunbo =that.datalist.News324[0].images
                        var shuzu = that.datalist.News324[0].images
                        var array = []
                        for (let i = 0; i < shuzu.length; i++) {
                            if (shuzu[i].type == 2) {
                                array.push(shuzu[i])
                            }
                        }
                        that.lunbo = array
                        // console.log(that.lunbo)
                        that.$nextTick(function () {
                            that.swiperslun()
                            that.huadong()
                            window.addEventListener('scroll', that.huadong, true)
                        })
                        // boxone:[],
                        // boxtwo:[],
                        // boxthere:[],
                        that.boxone = that.datalist.News324[1]
                        // console.log(that.boxone)
                        that.boxtwo = that.datalist.News324[3]
                        // console.log(that.boxtwo)
                        that.boxthere = that.datalist.News324[2]
                        // console.log(that.boxthere)
                    }).catch(err => console.log(err));
            },

            //锚点定位
            goAnchor(selector) {
                document.querySelector(selector).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
            },
            //去酒店页面(酒店与度假酒店)
            hotel() {
                this.$router.push("/hotel");
            },
            //轮播
            swiperslun() {
                this.$nextTick(function () {
                    // this.swiperslun()
                    // console.log(this.curindex)
                    // var buts = document.querySelector(".buts")
                    // const tvs = document.getElementById('tvs');
                    // console.log(tvs)
                    // const bo = document.querySelector('.bo');
                    // const ting = document.querySelector('.ting');
                    var slide = document.querySelectorAll(".swiper-slide")
                    // console.log(slide)
                    var mySwiper = new Swiper(".swiper", {
                        loop: true, // 循环模式选项
                        autoplay: {
                            delay: 10000,
                            stopOnLastSlide: false,
                            disableOnInteraction: true,
                        },
                        autoplay: false,
                        //如果需要前进后退按钮
                        // navigation: {
                        //     nextEl: ".lunyou",
                        //     prevEl: ".lunzuo",
                        // },
                        on: {
                            slideChangeTransitionEnd: function () {
                                // console.log(this.activeIndex)
                                var aac = slide[this.realIndex].querySelector(".tv")
                                // if(aac){
                                //     // console.log(1)
                                //     // setTimeout(function(){
                                //     //     mySwiper.slideNext()
                                //     // },1000)
                                //     buts.style.display="block"
                                //     // mySwiper.SlideAutoplayStop()
                                //     // mySwiper.autoplay.stop();
                                //     // this.autoplay.stop()
                                // }
                                // else{
                                //     buts.style.display="none"
                                // }                 

                            },
                        },
                    });
                    console.log(mySwiper.realIndex)
                    if (mySwiper.realIndex == 0) {
                        mySwiper.autoplay.stop();
                    }
                    // // 播放
                    // bo.onclick = function () {
                    //     bo.style.display = "none"
                    //     ting.style.display = "block"
                    //     tvs.play();
                    //     // mySwiper.autoplay.stop();
                    // }
                    // // 暂停
                    // ting.onclick = function () {
                    //     ting.style.display = "none"
                    //     bo.style.display = "block"
                    //     tvs.pause();
                    //     // mySwiper.autoplay.stop();
                    // }
                    // tvs.addEventListener('ended', function () {
                    //     console.log("播放结束了")
                    //     // mySwiper.slideNext()
                    //     mySwiper.autoplay.start();
                    //     // mySwiper.autoplay.start();
                    //     //监听到播放结束后，在此处可调用自己的接口
                    // }, false);

                })

            },
            huadong() {
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var innerHeight = window.innerHeight //页面高度/浏览器
                    // clientHeight offsetTop
                    //// 第一处动画
                    var block_nei = document.querySelector(".blocktwo .block_nei");
                    var blocktwo_left = document.querySelector(".blocktwo_left")
                    var blocktwo_right = document.querySelector(".blocktwo_right")
                    if (scrollTop >= block_nei.offsetTop + 500 - innerHeight && scrollTop <= block_nei.offsetTop) {
                        block_nei.style.transform = ' scale(1)'
                        block_nei.style.transition = 'transform 1s'
                        setTimeout(function () {
                            blocktwo_left.className = "blocktwo_left wow bounceInLeft animated"
                            blocktwo_right.className = "blocktwo_right wow bounceInRight animated"
                        }, 500)
                    }
                    // 第二处动画
                    var blockthere = document.querySelector(".blockthere")
                    var blockthereiomg = document.querySelector(".blockimgs")
                    var there_wenzi = document.querySelector(".there_wenzi")
                    // console.log(blockthere.offsetTop)
                    if (scrollTop >= blockthere.offsetTop + 100 - innerHeight && scrollTop <= blockthere.offsetTop) {
                        // blockthereiomg.style.transition = 'all 10s'
                        blockthereiomg.className = "blockimgs active"
                        blockthereiomg.style.width = '100%'
                        //  blockthereiomg.style.opacity = '1'
                        // blockthereiomg.className="blockimgs wow bounceInDown  animated"           
                        setTimeout(function () {
                            there_wenzi.className = "there_wenzi wow bounceInRight   animated"
                        }, 1000)
                    }
                    // 第三处动画
                    var block_nei2 = document.querySelector(".blockfour .block_nei");
                    var left = document.querySelector(".left")
                    var right = document.querySelector(".right")
                    if (scrollTop >= block_nei2.offsetTop - innerHeight && scrollTop <= block_nei2.offsetTop) {
                        block_nei2.style.transform = ' scale(1)'
                        block_nei2.style.transition = 'transform 1s'
                        setTimeout(function () {
                            left.className = "left wow bounceInLeft animated"
                            right.className = "right wow bounceInRight animated"
                        }, 500)
                    }
            }


        },
        mounted() {
            // //    this.getdatalist()
            // window.addEventListener('scroll', this.initHeight)

            // // this.$nextTick(() => {
            // //     //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 
            // //     this.offsetTop = document.querySelector('#boxFixed').offsetTop
            // // })
            // var mySwiper = new Swiper(".swiper", {
            //     loop: true, // 循环模式选项
            //     autoplay : {
            //         delay : 3000,
            //         stopOnLastSlide : false,
            //         disableOnInteraction : true,
            //     },
            //     autoplay:false,
            //     //如果需要前进后退按钮
            //     navigation: {
            //         nextEl: ".lunyou",
            //         prevEl: ".lunzuo",
            //     },

            // });
            // sollow()
            // window.onscroll = function () {
            //     sollow()
            // }
            // function sollow(){
            //     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //     var innerHeight = window.innerHeight //页面高度/浏览器
            //     // clientHeight offsetTop
            //     //// 第一处动画
            //     var block_nei = document.querySelector(".blocktwo .block_nei");
            //     var blocktwo_left = document.querySelector(".blocktwo_left")
            //     var blocktwo_right = document.querySelector(".blocktwo_right")
            //     if(scrollTop >= block_nei.offsetTop+500 - innerHeight && scrollTop <= block_nei.offsetTop){
            //         block_nei.style.transform = ' scale(1)'
            //         block_nei.style.transition = 'transform 1s'
            //         setTimeout(function(){
            //             blocktwo_left.className="blocktwo_left wow bounceInLeft animated"
            //             blocktwo_right.className="blocktwo_right wow bounceInRight animated"
            //         },500)
            //     }
            //     // 第二处动画
            //     var blockthere =document.querySelector(".blockthere")
            //     var blockthereiomg = document.querySelector(".blockimgs")
            //     var there_wenzi = document.querySelector(".there_wenzi")
            //     // console.log(blockthere.offsetTop)
            //     if(scrollTop >= blockthere.offsetTop+100 - innerHeight && scrollTop <= blockthere.offsetTop){
            //         // blockthereiomg.style.transition = 'all 10s'
            //         blockthereiomg.className="blockimgs active" 
            //         blockthereiomg.style.width = '100%'
            //         //  blockthereiomg.style.opacity = '1'
            //         // blockthereiomg.className="blockimgs wow bounceInDown  animated"           
            //         setTimeout(function(){
            //              there_wenzi.className="there_wenzi wow bounceInRight   animated"
            //         },1000)
            //     }
            //     // 第三处动画
            //     var block_nei2 = document.querySelector(".blockfour .block_nei");
            //     var left = document.querySelector(".left")
            //     var right = document.querySelector(".right")
            //     if(scrollTop >= block_nei2.offsetTop - innerHeight && scrollTop <= block_nei2.offsetTop){
            //         block_nei2.style.transform = ' scale(1)'
            //         block_nei2.style.transition = 'transform 1s'
            //         setTimeout(function(){
            //             left.className="left wow bounceInLeft animated"
            //             right.className="right wow bounceInRight animated"
            //         },500)
            //     }
            // }

        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.huadong, true)
        },


    };
</script>
<style scoped>
    /* @import "../../../node_modules/swiper/swiper.min.css"; */

    .brand {
        width: 100%;
        overflow-x: hidden;

    }

    /* 第一块 探索酒店 */
    .blockone {
        width: 100%;
        height: 100vh;
        position: relative;
        overflow: hidden;
    }

    .tansuo {
        width: 18.533vw;
        position: absolute;
        top: 32.667vw;
        left: 50%;
        margin-left: -9.7665vw;
        z-index: 2;
        color: #fff;
    }

    .tansuo_logo {
        width: 18.533vw;
        height: 16.133vw;
    }

    .tansuo_logo>img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .tiaozhuan {
        width: 65.867vw;
        position: absolute;
        bottom: -20.333vw;
        left: 50%;
        margin-left: -32.933vw;
        z-index: 2;
        color: #fff;
    }

    .tiaozhuan .label {
        
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .tiaozhuan .label .label_list {
        cursor: pointer;
        font-size: 4.267vw;
        color: #fff;
    }


    .tiaozhuan .shubiao {
        width: 32.933vw;
        margin: auto;
        margin-top: 3.467vw;
        cursor: pointer;
    }

    .tiaozhuan .shubiao .live .span1 p {
        font-size: 4.267vw;
        text-align: center;
        padding-top: 3.333vw;
    }

    .tiaozhuan .shubiao .live .span1 .shuxia {
        width: 2.133vw;
        height: 1.733vw;
        margin-top: 0.600vw;
        margin: auto;
        display: block;
        animation-name: yundong;
        animation-duration: 1s;
        animation-iteration-count: infinite;
    }


    .tiaozhuan .shubiao .live {
        position: relative;
        width: 32.933vw;
        height: 32.933vw;
        margin-top: 18.667vw;
    }

    .tiaozhuan .shubiao .live .span1 {
        width: 32.933vw;
        height: 32.933vw;
        border-radius: 50%;
        z-index: 0;
        margin-top: 3.333vw;
        background-color: rgba(0, 0, 0, .4);
        /* -webkit-animation: animate2 1.5s linear infinite; */
    }

    .tiaozhuan .shubiao .live .span2 {
        position: absolute;
        width: 32.933vw;
        height: 32.933vw;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, .5);
        border-radius: 50%;
        -webkit-animation: animate 1.5s linear infinite;
        z-index: -1;
    }

    @keyframes animate {
        0% {
            transform: scale(1);
            opacity: 0.5;
        }

        50% {
            transform: scale(1.1);
            opacity: 0.3;
            /*圆形放大的同时，透明度逐渐减小为0*/
        }

        100% {
            transform: scale(1.2);
            opacity: 0;
        }
    }

    /* @keyframes animate2 {
        0%{
            background-color: rgba(0, 0, 0, .7);
        }
        50%{
            
            background-color: rgba(0, 0, 0, .6);
        }
        100%{
             background-color: rgba(0, 0, 0, .5);
        }
    } */






    @keyframes yundong {
        0% {
            transform: translateY(0px)
        }

        50% {
            transform: translateY(1.333vw)
        }

        100% {
            transform: translateY(0px)
        }

    }


    .blockone .swiper {
        width: 100%;
        height: 100%;
    }

    .blockone .swiper .swiper-wrapper {
        width: 100%;
    }

    .blockone .swiper .swiper-wrapper .swiper-slide {
        width: 100%;
        /* border: 1px solid red; */
    }

    .lunzuo {
        width: 50%;
        height: 100%;
        top: 0;
        margin-top: 0;
        left: 0;
        cursor: url(../../assets/img/slider-left-white.png) 0 11, auto;
    }

    .lunzuo::after {
        display: none;
    }

    .lunyou {
        width: 50%;
        height: 100%;
        top: 0;
        margin-top: 0;
        right: 0;
        cursor: url(../../assets/img/slider-right-white.png) 32 11, auto;
    }

    .lunyou::after {
        display: none;
    }

    .blockone .swiper .swiper-wrapper .swiper-slide img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .box {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .box .tv {
        width: 100%;
        height: 100%;
        /* background-color: #a1a1a1;
        background-color: #efefed; */
        background-color: #cfcfca;
    }

    .box .tv video {
        width: 100%;
        height: 100%;
    }

    .buts {
        position: absolute;
        font-size: 30px;
        color: #000;
        bottom: 74px;
        right: 65px;
        z-index: 999;
        /* background-color: #d3a37b; */
    }

    .buts .bo,
    .buts .ting {
        width: 59px;
        height: 59px;
        cursor: pointer;
    }

    .buts .bo img,
    .buts .ting img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .buts .bo {
        display: none;
    }

    /* 第二块 品牌理念 */
    .blocktwo {
        width: 100%;
        /* padding: 11.333vw; */
        background-color: #efefed;
        padding: 5.333vw 0;
    }

    .blocktwo .block_nei {
        background-color: #fff;
        transform: scale(0);
        overflow: hidden;
    }

    .blocktwo .block_nei .blocktwo_left {
        width: 100%;
        /* background-color: pink; */
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateX(-200vw);
        height: 49.333vw;
    }

    .blocktwo .block_nei .blocktwo_left .wenzi {
        width: 64.000vw;
    }

    .blocktwo .block_nei .blocktwo_left .wenzi .title span {
        /* font-size: 4.267vw; */
        font-size: 3.733vw;
        color: #858585;
        display: block;
    }

    .blocktwo .block_nei .blocktwo_left .wenzi .title p {
        /* font-size: 6.400vw; */
        /* font-size: 5.600vw; */
        font-size: 5.600vw;
        color: #858585;
        /* margin-top: 3.200vw; */
        font-weight: 400;
    }

    .blocktwo .block_nei .blocktwo_left .wenzi .wenben p {
        margin-top: 1.333vw;
        font-size: 3.2vw;
        color: #646464;
        line-height: 4.267vw;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        /*要显示的行数*/
        -webkit-box-orient: vertical;

    }

    .blocktwo .block_nei .blocktwo_right {
        width: 89.333vw;
        height: 61.333vw;
        transform: translateX(266.667vw);
    }

    .blocktwo .block_nei .blocktwo_right img {
        width: 100%;
        height: 100%;
        display: block;
        /* overflow: hidden; */
    }

    /* 第三块 品牌特色 */
    .blockthere {
        width: 100%;
        height: 93.333vw;
        position: relative;
        /* opacity: 0; */
        background-color: #efefed;
        /* overflow: hidden; */
    }

    .blockthere .blockimgs {
        width: 100%;
        height: 100%;
        transition: all 1s;
        /* width: 0.133vw; */
        width: 0;
        overflow: hidden;
    }

    .blockimgs .blockimgs.active {
        /* opacity: 1; */
        width: 100%;
    }

    .blockthere .blockimgs img {
        width: 100vw;
        height: 100%;
    }

    .blockthere .there_wenzi {
        position: absolute;
        width: 38.667vw;
        top: 14.667vw;
        left: 17.5vw;
        z-index: 2;
        transform: translateX(266.667vw);
    }

    .blockthere .there_wenzi .title span {
        /* font-size: 4.267vw; */
        font-size: 3.733vw;
        color: #fff;
        /* width: 28.667vw; */
        display: block;
    }

    .blockthere .there_wenzi .title p {
        /* font-size: 6.400vw; */
        /* font-size: 4.267vw; */
        font-size: 5.600vw;
        color: #fff;
        /* margin-top: 3.200vw; */
        font-weight: 400;
    }

    .blockthere .there_wenzi .wenben p {
        margin-top: 1.333vw;
        font-size: 3.2vw;
        color: #fff;
        line-height: 4.267vw;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        /*要显示的行数*/
        -webkit-box-orient: vertical;
    }


    /* 第四块 特色服务 */





    .blockfour {
        width: 100%;
        /* padding: 11.333vw; */
        background-color: #efefed;
        padding: 5.333vw 0;
    }

    .blockfour .block_nei {
        background-color: #fff;
        transform: scale(0);
        overflow: hidden;
    }

    .blockfour .block_nei .left {
        width: 100%;
        /* background-color: pink; */
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateX(-200vw);
        height: 49.333vw;
    }

    .blockfour .block_nei .left .wenzi {
        width: 64.000vw;
    }

    .blockfour .block_nei .left .wenzi .title span {
        /* font-size: 4.267vw; */
        font-size: 3.733vw;
        color: #858585;
        display: block;
    }

    .blockfour .block_nei .left .wenzi .title p {
        /* font-size: 6.400vw; */
        font-size: 5.600vw;
        color: #858585;
        /* margin-top: 3.200vw; */
        font-weight: 400;
    }

    .blockfour .block_nei .left .wenzi .wenben p {
        margin-top: 1.333vw;
        font-size: 3.2vw;
        color: #646464;
        line-height: 4.267vw;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        /*要显示的行数*/
        -webkit-box-orient: vertical;

    }

    .blockfour .block_nei .right {
        width: 89.333vw;
        height: 61.333vw;
        transform: translateX(266.667vw);
    }

    .blockfour .block_nei .right img {
        width: 100%;
        height: 100%;
        display: block;
        /* overflow: hidden; */
    }
</style>