<template>
    <div class="container">
        <Header />
        <!-- 酒店与度假酒店 -->
        <div class="conts">
            <div class="lunbo">
                <!-- 日历 -->
                <!-- query_hotel Queryhotel -->
                <Queryhotel class="Queryhotel" />
                <div class="swiper-container lunone">
                    <!-- 如果需要分页器 -->
                    <!-- <div class="swiper-pagination"></div> -->
                    <!-- 如果需要导航按钮 -->
                    <!--  <div class="swiper-button-prev"></div>-->
                    <!--  <div class="swiper-button-next"></div>-->
                    <div class="swiper-wrapper">
                        <!-- <div class="swiper-slide" v-for="(item,i) in imgs" :key="i">
                        <img loading="lazy":src="item.pic">
                        </div> -->
                        <div class="swiper-slide" v-for="(item, index) in onelist.news" :key="index">
                            <!-- <img loading="lazy"src="../../assets/img/hotle1.jpg" alt=""> -->
                            <img loading="lazy" :src="Baseurl + item.pc_image" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 探索丰富优惠 -->
            <div class="explore">
                <div class="main">
                    <div class="title">{{ twolist.name }}</div>
                    <div class="youhui">
                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev prevtwo"></div>
                        <div class="swiper-button-next nexttwo"></div>
                        <!-- v-if="onelist.news.length>1" -->
                        <div class="swiper-container luntwo">
                            <!-- 如果需要分页器 -->
                            <!-- <div class="swiper-pagination"></div> -->
                            <!-- 如果需要导航按钮 -->
                            <!-- <div class="swiper-button-prev prevtwo"></div>
                            <div class="swiper-button-next nexttwo"></div> -->
                            <!-- 如果需要滚动条 -->
                            <!-- <div class="swiper-scrollbar"></div> -->
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item, index) in twolist.news" :key="index">
                                    <div class="list">{{ item.title }}</div>
                                </div>
                                <!-- <div class="swiper-slide">
                                    <div class="list">最新促2</div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="list">最新促3</div>
                                </div>
                                 -->
                            </div>
                        </div>
                    </div>
                    <div class="tansuo">
                        <!-- 至少有三个运行才正常 -->
                        <div class="tansuo_list" v-for="(item, index) in twolist.news" :key="index">
                            <!-- <img loading="lazy"src="../../assets/img/hotel2.jpg" alt=""> -->
                            <img loading="lazy" :src="Baseurl + item.pc_image" alt="">
                            <!-- <div class="list_wen">
                                <div class="neirong">
                                    <span>{{item.description}}</span>
                                    <p class="biao" v-html="item.description1"></p>
                                    //<p class="list_wen_text" v-html="item.pc_content">
                                    //    {{item.pc_content}}
                                    //</p>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- 图库展示 -->
            <!-- div.gallery -->
            <div class="gallery">
                <div class="title" @click="gettuku(therelist.id)">{{ therelist.name }}</div>
                <div class="gallery_lunbo">
                    <div class="swiper-container lunthere">
                        <!-- 如果需要分页器 -->
                        <!-- <div class="swiper-pagination"></div> -->
                        <!-- 如果需要导航按钮 -->
                        <!-- <div class="swiper-button-prev prevtwo"></div>
                        <div class="swiper-button-next nexttwo"></div> -->

                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in therelist.news" :key="index"
                                @click="start(index)">
                                <div class="gallery_list">
                                    <!-- <img loading="lazy"src="../../assets/img/hotel3.jpg" alt=""> -->
                                    <img loading="lazy" :src="Baseurl + item.pc_image" alt="">
                                    <div class="gallery_list_version">
                                        <div class="version_eara">
                                            <span>{{ item.title }}</span>
                                            <p v-html="item.description"></p>
                                            <div class="chakan">Learn More</div>
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
            </div>

            <!-- 新闻动态 -->
            <div class="news">
                <div class="main">
                    <div class="title" @click="getnewlist()">{{ fourlist.name }}</div>
                    <div class="new_list" v-if="fourlist.news">
                        <!-- news -->
                        <div class="new_list_item" v-for="(item, index) in fourlist.news.slice(0, 3)" :key="index"
                            @click=" getnewdetail(item.id)">
                            <div class="time">
                                <span>{{ item.updated_at.slice(5, 7) }}/{{ item.updated_at.slice(8, 10) }}</span>
                                <p>{{ item.updated_at.slice(0, 4) }}</p>
                            </div>
                            <div class="news_tu">
                                <!-- <img loading="lazy"src="../../assets/img/hotel4.jpg" alt=""> -->
                                <img loading="lazy" :src="Baseurl + item.pc_image" alt="">
                            </div>
                            <div class="news_text">
                                {{ item.title }}
                            </div>
                            <!-- <div class="news_detail">
                                <p>查看详细</p>
                                <img loading="lazy"src="../../assets/img/youjian.png" alt="">
                            </div> -->
                        </div>

                    </div>
                </div>
            </div>

            <!-- 宴会餐饮住宿 -->
            <div class="meal">
                <div class="meal_datu">
                    <!-- {{fivelist}} -->
                    <div class="meal_datu_img" v-for="(item, index) in fivelist" :key="index">
                        <img loading="lazy" :src="Baseurl + item.pc_image" alt="">
                    </div>
                </div>
                <div class="meal_lunbo">
                    <div class="swiper-container lunfour">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in fivelist" :key="index"
                                @click="topath(item.pc_link)">
                                <div class="meal_list">
                                    <div class="meal_tubiao" v-if="item.images[0]">
                                        <img loading="lazy" class="img1" :src="Baseurl + item.images[0].image" alt="">
                                        <img loading="lazy" class="img2" :src="Baseurl + item.images[1].image" alt="">
                                    </div>
                                    <p class="meal_list_tit">{{ item.title }}</p>
                                    <div class="meal_detail">Learn More</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="topTips" v-if="swipershow">
            <div class="close" @click="guanbi()">
                <img loading="lazy" src="../../assets/img/cha.png" alt="">
            </div>
            <div class="lunboblos">
                <div class="swiper-container lunbotuku">
                    <!-- 如果需要分页器 -->
                    <!-- <div class="swiper-pagination"></div> -->
                    <!-- 如果需要导航按钮 -->
                    <div class="swiper-button-prev lunzuotuku"></div>
                    <div class="swiper-button-next lunyoutuku"></div>
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in therelist.news" :key="index">
                            <!-- <img loading="lazy"src="../../assets/img/hotle1.jpg" alt="" /> -->
                            <img loading="lazy" :src="Baseurl + item.pc_image" alt="">
                            <div class="wenzis">{{ item.title }}<br />{{ item.description }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
            // lunTime:5000,
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
        const query = this.$route.params.id
        if (query) {
            localStorage.setItem('query', query);
            this.getQueryList(query);
        } else {
            this.getinfolist();
        }


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
        getQueryList(query) {
            let that = this;
            that.$axios
                // &module_id=3
                .get(`${this.Baseurl}home_data?web_token=${that.token}&logogram=${query}`)
                .then(function (res) {
                    console.log(res)
                    if (res.data.code == 0) {
                        alert(res.data.msg + 'You will be shown a default hotel')
                        that.$router.replace({ params: { id: '' } });
                        that.getdatalist()
                        return
                    } else {
                        sessionStorage.setItem('hotel_id', res.data.data.hotel.id)
                        sessionStorage.setItem('hotelcode', res.data.data.hotel.hotel_code)
                        sessionStorage.setItem('codesh', res.data.data.hotel.code)
                        sessionStorage.setItem('hotel_name', res.data.data.hotel.hotel_name)
                        sessionStorage.setItem('dituxinxi', res.data.data.hotel.coord)
                        sessionStorage.setItem('city', res.data.data.hotel.city)
                        localStorage.setItem('mudiIndex', res.data.data.hotel.city)
                        localStorage.setItem('mudiIndexnum1', res.data.data.hotel.city)
                        localStorage.setItem('mudiIndexnum2', res.data.data.hotel.key)
                        that.infolist = res.data.data.defaul_module_list
                        that.onelist = res.data.data.defaul_module_list[0]
                        that.twolist = res.data.data.defaul_module_list[1]
                        that.therelist = res.data.data.defaul_module_list[2]
                        that.fourlist = res.data.data.defaul_module_list[3]
                        // that.fourlist =  res.data.data.319
                        if (res.data.data.defaul_module_list[4].news) {
                            that.fivelist = res.data.data.defaul_module_list[4].news
                        }

                        that.$nextTick(function () {
                            that.lunboone()
                        })
                    }

                }).catch(err => console.log(err));
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
                    that.onelist = res.data.data.defaul_module_list[0]
                    that.twolist = res.data.data.defaul_module_list[1]
                    that.therelist = res.data.data.defaul_module_list[2]
                    that.fourlist = res.data.data.defaul_module_list[3]
                    // that.fourlist =  res.data.data.319
                    if (res.data.data.defaul_module_list[4].news) {
                        that.fivelist = res.data.data.defaul_module_list[4].news
                    }

                    that.$nextTick(function () {
                        that.lunboone()
                    })

                }).catch(err => console.log(err));
        },
        //轮播
        lunboone() {
            var mySwiperone = new Swiper(".lunone", {
                loop: true, // 循环模式选项
                // autoplay:true,
                // speed:300,
                autoplay: {
                    delay: 5000
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
                observer: true,
                observerParents: true,
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
                        // console.log(this.realIndex)
                        tansuo_list[this.realIndex].style.display = 'block'
                    },
                    click: function (swiper) {
                        // console.log(1)
                        // console.log(this.activeIndex)
                        // console.log(this.clickedIndex)
                        // console.log(this.realIndex)
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
                autoplay: true,
                slidesPerView: 3,
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
            mySwiperthere.scrollbar.$dragEl.css('top', '-6px');
            mySwiperthere.scrollbar.$dragEl.css('width', '100px');

            var meal_datu_img = document.querySelectorAll(".meal_datu .meal_datu_img")
            meal_datu_img[0].style.display = 'block'
            var mySwiperfour = new Swiper(".lunfour", {
                loop: true, // 循环模式选项
                autoplay: true,
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
                        // console.log(this.realIndex)
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
            localStorage.setItem('homeImg', this.therelist.pc_image)
            localStorage.setItem('homeId', id)
            localStorage.setItem('homeName', this.therelist.name)
            console.log(this.therelist.name, this.therelist.pc_image, id);
            this.$router.push({
                name: 'Tuku',
                // query: {
                //     id: id,
                //     img: this.therelist.pc_image,
                //     name: this.therelist.name
                // }
            })
        },
        //新闻列表页
        getnewlist() {
            //that.fourlist.id
            localStorage.setItem('id', this.fourlist.id)
            localStorage.setItem('topimg', this.fourlist.pc_image)
            this.$router.push({
                name: 'NewsList',
                // query: {
                //     id: this.fourlist.id,
                //     topimg: this.fourlist.pc_image
                // }
            })
        },
        //新闻详情页
        getnewdetail(id) {
            console.log(id)
            localStorage.setItem('id', this.fourlist.id)
            localStorage.setItem('newsId', id)
            this.$router.push({
                name: 'NewsDetail',
                // query: {
                //     id: this.fourlist.id,
                //     newsId: id
                // }
            })
        },
        //  roomdeatil(id){
        //     console.log(id)
        //     this.$router.push({
        //         name:'RoomsDetail',
        //         query:{
        //             roomId:id
        //         }
        //     })
        // },
        //
        topath(link) {
            // console.log("点击了")
            // console.log(link)
            window.location.href = link
            // window.location.href="http://localhost:8081/#/banquet"
            // window.open(item.pc_link)
            // this.$router.push({name:link}) 
        }
    },
    // mounted() {
    //     var Wth = document.documentElement.clientWidth;
    //     if (Wth < 1920  ) {
    //         // console.log(document.querySelector(".quanping"))
    //         var app =document.querySelector("#app")
    //         if (navigator.userAgent.indexOf("Firefox") != -1) {
    //         app.style.width="1920px"
    //         document.documentElement.style.transform = "scale(" + Wth / 1920 + ")";
    //             // document.body.style.overflow = "hidden";
    //         document.documentElement.style.transformOrigin = "left top 0px";
    //         // if(document.querySelector(".quanping")){
    //         //   app.style.width="1920px"
    //         //   document.documentElement.style.transform = "scale(" + Wth / 1920 + ")";
    //         //   // document.body.style.overflow = "hidden";
    //         //   document.documentElement.style.transformOrigin = "left top 0px";
    //         // }else{
    //         //   app.style.width="100%"
    //         // }
    //         //判断当前浏览器是否是火狐浏览器

    //         } else {
    //         // console.log('不是火狐浏览器')
    //         var block1 = document.querySelector(".blocktwo")
    //         var block2 = document.querySelector(".blockthere")
    //         var block3 = document.querySelector(".blockfour")
    //         var footer = document.querySelector(".footer")
    //         // var block1 = document.querySelector(".blocktwo")
    //         // console.log(document.querySelector(".quanping"))
    //         if(document.querySelector(".quanping")){
    //             document.documentElement.style.zoom = '1';
    //             block1.style.zoom = (Wth / 1920) * 100 + "%";
    //             block2.style.zoom = (Wth / 1920) * 100 + "%";
    //             block3.style.zoom = (Wth / 1920) * 100 + "%";
    //             footer.style.zoom = (Wth / 1920) * 100 + "%";
    //             //footer
    //         }else{
    //         document.documentElement.style.zoom = (Wth / 1920) * 100 + "%";
    //             // footer.style.zoom ="100%";
    //         }

    //         }
    //     }
    //     // if (Wth < 1920 && Wth>1400) {
    //     //     // console.log(document.querySelector(".quanping"))
    //     //     var app =document.querySelector("#app")
    //     //     var gallery_lunbo = document.querySelector(".gallery_lunbo")
    //     //     if (navigator.userAgent.indexOf("Firefox") != -1) {
    //     //     //判断当前浏览器是否是火狐浏览器
    //     //     app.style.width="100%"
    //     //     // document.documentElement.style.transform = "scale(1)";
    //     //     // document.body.style.overflow = "hidden";
    //     //     // document.documentElement.style.transformOrigin = "left top 0px";
    //     //     } else {
    //     //     // console.log('不是火狐浏览器')
    //     //     // var block1 = document.querySelector(".blocktwo")
    //     //     // var block2 = document.querySelector(".blockthere")
    //     //     // var block3 = document.querySelector(".blockfour")
    //     //     // var footer = document.querySelector(".footer")

    //     //     // var block1 = document.querySelector(".blocktwo")
    //     //     // console.log(document.querySelector(".quanping"))
    //     //     // if(document.querySelector(".quanping")){
    //     //     //     document.documentElement.style.zoom = '1';
    //     //     //     block1.style.zoom = (Wth / 1920) * 100 + "%";
    //     //     //     block2.style.zoom = (Wth / 1920) * 100 + "%";
    //     //     //     block3.style.zoom = (Wth / 1920) * 100 + "%";
    //     //     //     footer.style.zoom = (Wth / 1920) * 100 + "%";
    //     //     //     //footer
    //     //     // }else{
    //     //     //     // document.documentElement.style.zoom = (Wth / 1920) * 100 + "%";
    //     //     //     document.documentElement.style.zoom = "100%";
    //     //     //     gallery_lunbo.style.zoom  =  (Wth / 1920) * 100 + "%";
    //     //     //     // footer.style.zoom ="100%";
    //     //     // }

    //     //     }
    //     // }

    //     // if (Wth <= 1420 && Wth > 1024) {
    //     //     // console.log(document.querySelector(".quanping"))
    //     //     var app =document.querySelector("#app")
    //     //     if (navigator.userAgent.indexOf("Firefox") != -1) {
    //     //     //判断当前浏览器是否是火狐浏览器
    //     //     app.style.width="1920px"
    //     //     document.documentElement.style.transform = "scale(" + Wth / 1420 + ")";
    //     //     // document.body.style.overflow = "hidden";
    //     //     document.documentElement.style.transformOrigin = "left top 0px";
    //     //     } else {
    //     //     // console.log('不是火狐浏览器')
    //     //     var block1 = document.querySelector(".blocktwo")
    //     //     var block2 = document.querySelector(".blockthere")
    //     //     var block3 = document.querySelector(".blockfour")
    //     //     var footer = document.querySelector(".footer")
    //     //     // var block1 = document.querySelector(".blocktwo")
    //     //     // console.log(document.querySelector(".quanping"))
    //     //     if(document.querySelector(".quanping")){
    //     //         document.documentElement.style.zoom = '1';
    //     //         block1.style.zoom = (Wth / 1420) * 100 + "%";
    //     //         block2.style.zoom = (Wth / 1420) * 100 + "%";
    //     //         block3.style.zoom = (Wth / 1420) * 100 + "%";
    //     //         footer.style.zoom = (Wth / 1420) * 100 + "%";
    //     //         gallery_lunbo.style.zoom  = (Wth / 1420) * 100 + "%";
    //     //         //footer
    //     //     }else{
    //     //         document.documentElement.style.zoom = (Wth / 1420) * 100 + "%";
    //     //         // footer.style.zoom ="100%";
    //     //     }

    //     //     }
    //     // }
    // },
};
</script>
<style scoped>
/* 公用的标题大小 */
.title {
    font-size: 30px;
    /* line-height: 86px; */
    color: #000000;
    text-align: center;
    font-weight: 400;
}

/* lunbo第一块的大图轮播 */
.lunbo {
    width: 100%;
    height: 715px;
    position: relative;
}

.lunbo /deep/ .query_hotel {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.9);
    padding-bottom: 20px;
}

.lunbo /deep/ .query_hotel .riqi .title {
    display: none;
}

.lunbo /deep/.hotel_riqi .contbox.checkin {
    width: 140px;
}

.lunbo /deep/.hotel_riqi .checkin:nth-child(1) {
    padding-right: 0;
}

/* .lunbo /deep/.contbox.jiwan{
        transform: translateY(-15px);
    } */
.lunbo /deep/ .query_hotel .hotel_riqi .contbox {
    border: none;
    background: none;
    padding-left: 0;
    height: 20px;
}

.lunbo /deep/ .query_hotel .hotel_riqi .contbox.companyid input {
    background: none;
}

.lunbo /deep/ .blocks {
    position: relative;
    margin-left: 35px;
}

.lunbo /deep/ .blocks:nth-child(1) {
    margin-left: 0;
}

.lunbo /deep/ .blocks:nth-child(3) {
    margin-left: 0;
}

.lunbo /deep/ .blocks:nth-child(4) {
    margin-left: 17px;
}

.lunbo /deep/ .blocks::after {
    position: absolute;
    content: "";
    width: 1px;
    height: 54px;
    background-color: #d5b08b;
    top: 50%;
    margin-top: -25px;
    right: -10px;
    z-index: 1;
}

.lunbo /deep/ .blocks:nth-child(2)::after,
.lunbo /deep/ .blocks:nth-child(3)::after,
.lunbo /deep/ .blocks:last-child::after {
    display: none;
}

.lunbo /deep/ .hotel_riqi .lookuplist {
    top: -50px;
}

/* {
        bbbbbb
    } */

.lunbo .lunone {
    /* width: 100%; */
    width: 1920px;
    height: 100%;
    position: absolute;
    left: 50%;
    margin-left: -960px;
    top: 0;
    z-index: 1;
}

.lunbo .lunone .swiper-slide img {
    width: 100%;
    height: 100%;
    display: block;
}

/* 探索丰富优惠 */
.explore {
    padding-top: 45px;
    padding-bottom: 63px;
}

.explore .youhui {
    /* width: 600px; */
    width: 1320px;
    margin: auto;
    position: relative;
    margin-top: 50px;
}

.explore .youhui .luntwo {
    /* width: 600px; */
    width: 100%;
    margin: auto;
    /* background-color: pink; */
    /* position: relative; */
}

.explore .youhui .luntwo .swiper-slide {
    width: 200px;
    width: 440px;
    /* border: 1px solid #000; */
}

.explore .youhui .luntwo .swiper-slide .list {
    width: 200px;
    width: 440px;
    font-size: 24px;
    color: #000000;
    text-align: center;
    cursor: pointer;
}

/* .explore .youhui .luntwo .list.active{
        color: #206079;
    } */

.explore .youhui .prevtwo,
.explore .youhui .nexttwo {
    width: 9px;
    height: 17px;
    /* background-image: url(../../assets/img/jthei.png); */
    background-size: 100%;
    background-repeat: no-repeat;
    margin-top: -7px;
    color: #000;
    z-index: 1;
}

.explore .youhui .prevtwo {
    /* transform: rotate(180deg); */
    left: -30px;
}

.explore .youhui .nexttwo {
    right: -30px;
}

.explore .youhui .prevtwo::after {
    font-size: 25px;
}

.explore .swiper-slide-active .list,
.explore .swiper-slide-duplicate-active {
    color: #206079 !important;
}

.explore .youhui .nexttwo::after {
    font-size: 25px;
}

.explore .tansuo {
    width: 1400px;
    height: 453px;
    margin-top: 60px;
}

.explore .tansuo .tansuo_list {
    width: 1400px;
    height: 453px;
    display: none;
    overflow: hidden;
    position: relative;
}

.explore .tansuo .tansuo_list img {
    width: 100%;
}

.explore .tansuo .tansuo_list .list_wen {
    position: absolute;
    top: 100px;
    right: 43px;
    z-index: 2;
    width: 595px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.5);
}

.explore .tansuo .tansuo_list .list_wen .neirong {
    width: 500px;
    margin-top: 45px;
    margin-left: 60px;
}

.explore .tansuo .tansuo_list .list_wen .neirong>span {
    font-size: 24px;
    color: #206079;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
}

.explore .tansuo .tansuo_list .list_wen .neirong .biao {
    margin-top: 20px;
    font-size: 18px;
    color: #515151;
    /* overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis; */
    line-height: 30px;
    max-height: 87px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.explore .tansuo .tansuo_list .list_wen .neirong .list_wen_text {

    margin-top: 25px;
    font-size: 18px;
    line-height: 30px;
    height: 60px;
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
    padding-top: 50px;
    padding-bottom: 55px;
    /* width: 1920px;
        margin: auto;
        height: 727px; */
}

.gallery .title {
    /* width: 200px; */
    width: 350px;
    margin: auto;
}

.gallery .title:hover {
    color: #DDA46F;
    cursor: pointer;
}

.gallery_lunbo {
    margin-top: 54px;
    position: relative;
    /* position: absolute;
        width: 1920px;
        left: 50%;
        margin-left: -960px; */
}

.gallery_lunbo .gundong {
    width: 100%;
    height: 3px;
    background-color: #fff;
    margin-top: 55px;
    position: relative;
}

.gallery_lunbo .gundong /deep/ .swiper-scrollbar-drag {
    width: 200px !important;
}

.gallery_lunbo .gall_scroll {
    width: 100%;
    height: 9px;
    background-color: #efefed;
    position: absolute;
    top: 3px;
}

.gallery_lunbo .swiper-scrollbar .swiper-scrollbar-drag {
    width: 110px !important;
    height: 9px !important;
    background: #206079 !important;
}

.gallery_lunbo .lunthere {
    width: 100%;
}

.gallery_lunbo .lunthere {
    /* width: 850px; */
    /* overflow: visible !important; */
}

.gallery_lunbo .lunthere .swiper-slide .gallery_list {
    width: 590px;
    height: 475px;
    overflow: hidden;
    position: relative;
    margin: auto;
    /* cursor: pointer; */
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
    /* display: flex;
        align-items: center;
        justify-content: center; */
    display: none;
}

.gallery_lunbo .lunthere .swiper-slide .gallery_list:hover .gallery_list_version {
    display: block;
}

.gallery_lunbo .lunthere .swiper-slide-active .gallery_list .gallery_list_version {
    display: block;
}

.gallery_list_version .version_eara {
    /* width: 650px; */
    width: 412px;
    margin: auto;
    /* margin-top: 163px;  */
    margin-top: 60px;

}

.gallery_list_version .version_eara span {
    font-size: 24px;
    color: #fff;
    text-align: center;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.gallery_list_version .version_eara p {
    margin-top: 55px;
    height: 90px;
    line-height: 30px;
    font-size: 18px;
    color: #fff;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-weight: 100;
}

.gallery_list_version .version_eara div {
    margin-top: 95px;
    text-align: center;
}

.chakan {
    width: 135px;
    height: 45px;
    margin: auto;
    border: 1px solid #847c78;
    box-sizing: border-box;
    line-height: 45px;
    color: #fff;
    cursor: pointer;
    position: relative;
    transition: 400ms ease all;
    font-size: 18px;
}

.chakan:hover {
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
}


/* 新闻动态 */
.news {
    width: 100%;
    padding-top: 65px;
    padding-bottom: 60px;
}

.news .title {
    width: 350px;
    margin: auto;
}

.news .title:hover {
    color: #DDA46F;
    cursor: pointer;
}

.news .new_list {
    width: 100%;
    margin-top: 65px;

    display: flex;
    justify-content: space-between;
}

.news .new_list .new_list_item {
    width: 450px;
    cursor: pointer;
}

.news .new_list .new_list_item .time {
    font-family: Arial;
    /* display: flex; */
}

.news .new_list .new_list_item .time span {
    font-size: 30px;
    color: #a8916f;
}

.news .new_list .new_list_item .time p {
    margin-left: 10px;
    font-size: 20px;
    color: #a8916f;
    display: inline-block;
}

.news .new_list .new_list_item .news_tu {
    margin-top: 30px;
    width: 450px;
    height: 226px;
    overflow: hidden;
}

.news .new_list .new_list_item .news_tu img {
    width: 100%;
    height: 100%;
    display: block;
    transition: all 0.3s;
}

.news .new_list .new_list_item .news_text {
    margin-top: 30px;
    font-size: 20px;
    color: #000000;
    height: 62px;
    line-height: 30px;
    /* width:200px; */
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /*要显示的行数*/
    -webkit-box-orient: vertical;
}

.news .new_list .new_list_item .news_detail {
    margin-top: 50px;
    /* width: 146px; */
    width: 165px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s;
}

.news .new_list .new_list_item:hover .news_detail p {
    transform: translateX(20px);
    color: #206079;
}

.news .new_list .new_list_item:hover .news_text {
    color: #206079;
}

.news .new_list .new_list_item:hover .news_tu img {
    transform: scale(1.2);
}

.news .new_list .new_list_item .news_detail p {
    font-size: 20px;
    color: #a8916f;
    transition: all 0.3s;
}

.news .new_list .new_list_item .news_detail img {
    width: 15px;
    height: 11px;
    display: block;
}

.news .new_list .new_list_item .news_detail::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 3px;
    bottom: 0;
    left: 0;
    z-index: 2;
    background: linear-gradient(to right, #206079 0%, #206079 40%, #a8916f 41%);
}

/* 餐饮宴会住宿 */
.meal {
    width: 100%;
}

.meal {
    /* width: 100%; */
    width: 100%;
    height: 800px;
    position: relative;
}

.meal .meal_datu {
    width: 100%;
    height: 800px;
}

.meal .meal_datu .meal_datu_img {
    width: 100%;
    height: 800px;
    overflow: hidden;
    position: relative;
}

.meal .meal_datu .meal_datu_img img {
    /* width: 100%;
        height: 800px;
        display: block; */

    width: 1920px;
    height: 800px;
    display: block;
    position: absolute;
    top: 0;
    z-index: 1;
    left: 50%;
    margin-left: -960px;
}

.meal .meal_lunbo {
    position: absolute;
    bottom: 0;
    left: 0;
    padding-bottom: 45px;
    z-index: 2;
    width: 100%;
    background: linear-gradient(to top, black, transparent);
}

.meal .meal_lunbo .lunfour {
    /* width: 460px; */
    width: 1380px;
    margin: auto;
    color: #fff;
    padding-top: 3px;
}

.meal .meal_lunbo .lunfour .swiper-slide {
    /* border: 1px solid #000; */
    height: 162px;
    display: flex;
    align-items: flex-end;
}

.meal .meal_lunbo .lunfour .swiper-slide .meal_list {
    width: 100%;
}

.meal .meal_lunbo .lunfour .swiper-slide .meal_list .meal_tubiao {
    width: 50px;
    height: 50px;
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
    margin-top: 10px;
    font-size: 30px;
}

.meal .meal_lunbo .lunfour .swiper-slide .meal_detail {
    margin: auto;
    text-align: center;
    width: 135px;
    height: 45px;
    box-sizing: border-box;
    line-height: 45px;
    border: 1px solid #6f6f6f;
    color: #fff;
    margin-top: 15px;
    font-size: 18px;
    display: none;
    cursor: pointer;
}

.meal .meal_lunbo .lunfour .swiper-slide-active .meal_list {
    border-left: 1px solid #afa9a4;
    border-right: 1px solid #afa9a4;
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


.topTips {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000000;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close {
    position: absolute;
    top: 30px;
    right: 30px;
    cursor: pointer;
    width: 40px;
    height: 40px;
}

.close img {
    width: 100%;
    height: 100%;
    display: block;
}

.lunboblos {
    /* width: 60%; */
    width: 800px;
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

.wenzis {
    color: #fff;
    font-size: 18px;
    margin-top: 20px;
    background-color: #000000;
    height: 80px;
    /* overflow: auto; */
}
</style>