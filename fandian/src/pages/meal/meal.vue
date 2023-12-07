<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />

        <div class="conts">

            <div class="meal_top">
                <!-- <img loading="lazy"src="../../assets/img/can1.jpg" alt=""> -->
                <img loading="lazy" :src="Baseurl + topimg" alt="">
            </div>

            <div class="crumbs">
                <p>您的位置：首页 > {{ topname }}</p>
            </div>
            <Queryhotel class="Queryhotel" />
            <div class="canyin">
                <div class="main" v-if="infolist[0]">
                    <div class="introdu">
                        <span class="introdu_tie">{{ infolist[0].name }}</span>
                        <p v-html="infolist[0].description"></p>
                    </div>
                    <div class="canyinlun">
                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev prevcan"></div>
                        <div class="swiper-button-next nextcan"></div>
                        <div class="swiper-container luncanyin">
                            <!-- 如果需要分页器
                            <div class="swiper-pagination"></div> -->
                            <div class="swiper-wrapper">
                                <!-- @click='topath(index,item.id)'
                                :data-item="func_str(item)" -->
                                <div class="swiper-slide" v-for="(item, index) in meallist" :key="index"
                                    @click='topath(item.id)'>
                                    <div class="can_list">
                                        <div class="can_list_img">
                                            <img loading="lazy" :src="Baseurl + item.pc_image" alt="">
                                        </div>
                                        <div class="can_list_text">
                                            <p class="title">{{ item.title }}</p>
                                            <p class="can_list_cont">{{ item.description }}</p>
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
                    <div class="youhui_title">{{ infolist[1].name }}</div>
                    <div class="vips">
                        <div class="vips_list" v-for="(item, index) in infolist[1].news" :key="index"
                            @click="todetail(item.id)">
                            <div class="vips_list_img">
                                <!-- <img loading="lazy"src="../../assets/img/can3.jpg" alt=""> -->
                                <img loading="lazy" :src="Baseurl + item.pc_image" alt="">
                            </div>
                            <div class="vips_list_text">
                                <span>{{ item.title }}</span>
                                <p>{{ item.en_title }}</p>
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
import Swiper from "swiper";
import Queryhotel from "../rooms/queryhotel.vue";
let vm = null
export default {
    components: {
        Header,
        Footer,
        Queryhotel
    },
    data() {
        return {
            swiperOption: {
                autoplay: true,
            },
            token: '',//token
            hotel_id: '',//酒店id
            modularid: '',//模块id
            infolist: '',
            meallist: [],
            topimg: '',
            topname: ''
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
        getdatalist() {
            //?web_token=${that.token}&hotel_id=1
            var that = this
            that.$axios
                // &module_id=3
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`)
                .then(function (res) {
                    console.log(res)
                    that.topimg = res.data.data.top_module_list[2].pc_image
                    that.topname = res.data.data.top_module_list[2].name
                    that.infolist = res.data.data.defaul_module_list
                    that.meallist = res.data.data.defaul_module_list[0].news
                    console.log(that.meallist)
                    console.log(that.infolist)
                    that.$nextTick(function () {
                        that.lunbo()
                    })
                }).catch(err => console.log(err));
        },
        lunbo() {
            var luncanyin = new Swiper(".luncanyin", {
                // loop: true, // 循环模式选项
                slidesPerView: 3,
                autoplay: true,
                // centeredSlides: true,//这个是让第一个居中显示的
                spaceBetween: 47,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, //修改swiper的父元素时，自动初始化swiper
                navigation: {
                    nextEl: ".nextcan",
                    prevEl: ".prevcan",
                },
                // on: {
                //     click: function (swiper) {
                //         console.log(this)
                //         console.log(this.activeIndex)
                //     },
                // },
            });
        },

        topath(id) {
            console.log('id:' + id)
            this.$router.push({
                name: 'MealDetail',
                query: {
                    mealId: id
                }
            })
        },
        todetail(id) {
            console.log('id:' + id)
            this.$router.push({
                name: 'Details',
                query: {
                    detailsId: id,
                    img: this.topimg
                }
            })
        }
        // handleClickSlide(vm){
        //     console.log(vm)
        //     console.log(vm.clickedIndex)
        //     console.log(vm.activeIndex)
        //     console.log(vm.realIndex)
        //     const index= vm.clickedIndex - vm.activeIndex +vm.clickedIndex -vm.activeIndex +vm.realIndex
        //     console.log(index,vm,'vm')
        // }

    },
    mounted() {

    },

};
</script>
<style scoped>
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

/* 酒吧及餐厅 */
.canyin {
    width: 100%;
    background-color: #efefed;
    padding-bottom: 74px;
}

.canyin .introdu span {
    font-size: 30px;
    color: #000000;
    font-weight: 400;
}

.canyin .introdu p {
    margin-top: 20px;
    font-size: 20px;
    color: #5f5f5f;
    width: 920px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /*要显示的行数*/
    -webkit-box-orient: vertical;
    line-height: 30px;
    height: 60px;
}

.canyinlun {
    padding-top: 65px;
    position: relative;
}

.canyinlun .luncanyin {
    width: 100%;
}

.prevcan,
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
}

.canyinlun .luncanyin .swiper-slide {
    /* width: 315px !important; */
    /* width: px !important; */
    /* margin-right: 35px; */
}

.canyinlun .luncanyin .swiper-slide .can_list {
    cursor: pointer;
    width: 408px;
}

.canyinlun .luncanyin .swiper-slide .can_list:hover .can_list_img img {
    transform: scale(1.2);
}

.can_list .can_list_img {
    /* width: 315px;
        height: 302px; */
    width: 408px;
    height: 284px;
    overflow: hidden;
}

.can_list .can_list_img img {
    width: 100%;
    height: 100%;
    display: block;
    transition: all 0.5s;
}

.can_list .can_list_text {
    background-color: #fff;
    /* height: 90px; */
    width: 100%;
    /* width: 350px; */
    padding: 0 30px;
    box-sizing: border-box;
    padding-bottom: 30px;
}

.can_list .can_list_text .title {
    line-height: 80px;
    text-align: center;
    font-size: 24px;
    color: #000000;
}

.can_list .can_list_text .can_list_cont {
    font-size: 16px;
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

.can_list .can_list_text .button {
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
}

.can_list:hover .button {
    background-color: #d5b08b;
    color: #fff;
}

.youhui {
    width: 100%;

}

.youhui .youhui_title {
    font-size: 30px;
    color: #000000;
    font-weight: 400;
    margin-top: 50px;
}

.youhui .vips {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
}

.youhui .vips .vips_list {
    cursor: pointer;
    width: 670px;
}

.youhui .vips .vips_list .vips_list_img {
    width: 670px;
    height: 380px;
    overflow: hidden;
}

.youhui .vips .vips_list .vips_list_img img {
    width: 100%;
    height: 100%;
    display: block;
    transition: all 0.5s;
}

.youhui .vips .vips_list:hover .vips_list_img img {
    transform: scale(1.2);
}

.youhui .vips .vips_list .vips_list_text {
    margin-top: 45px;
}

.youhui .vips .vips_list .vips_list_text span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 24px;
    color: #000000;
}

.youhui .vips .vips_list .vips_list_text p {
    margin-top: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    font-size: 18px;
    color: #000000;
}
</style>