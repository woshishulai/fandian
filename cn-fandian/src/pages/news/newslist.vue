<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />

        <div class="conts">
            <div class="meal_top">
                <img loading="lazy" :src="Baseurl + topimg" alt="">
            </div>
            <div class="crumbs">
                <p>您的位置：首页 > 新闻</p>
            </div>
            <div class="newslist">
                <div class="main">
                    <div class="title">{{ name }}</div>
                    <div class="newslist_lunbo">
                        <div class="swiper-container lunroom">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item, index) in infolist" :key="index">
                                    <div class="news_list" v-for="(itemMsg, indexMsg) in item" :key="indexMsg"
                                        @click="newsdeatil(itemMsg.id)">
                                        <div class="newslist_img">
                                            <!-- <img loading="lazy"src="../../assets/img/new1.jpg" alt=""> -->
                                            <img loading="lazy" :src="Baseurl + itemMsg.pc_image" alt="">
                                        </div>
                                        <div class="newslist_version">
                                            <div class="version_eara">
                                                <span class="time">{{ itemMsg.updated_at.slice(0, 10) }}</span>
                                                <span class="vertit">{{ itemMsg.title }}</span>
                                                <p class="vertext">
                                                    {{ itemMsg.description }}
                                                </p>
                                                <div class="news_detail">查看详细</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev prevroom"></div>
                        <div class="swiper-button-next nextroom"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 公共底部 -->
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/layout/header.vue";
import Footer from "@/components/layout/footer.vue";
import Swiper from "swiper";
export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            token: '',//token
            hotel_id: '',//酒店id
            modularid: '',//模块id
            infolist: '',
            name: '',
            topimg: '',
            id: ''
        };
    },
    created() {
        // 储存第几个头部状态
        localStorage.setItem("istrue", 0);
        this.token = sessionStorage.getItem("token");
        // console.log(this.token);
        this.hotel_id = sessionStorage.getItem("hotel_id");
        // if(sessionStorage.getItem("fieldData")){
        //     var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
        //     this.modularid = fieldData[4].id
        // }
        this.id = localStorage.getItem('id')
        // this.getinfo()
        this.topimg = localStorage.getItem('topimg')
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
                    that.modularid = fieldData[4].id
                    sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
                    that.getdatalist()
                })
                .catch((err) => console.log(err));
        },
        getdatalist() {
            var that = this
            that.$axios
                // &module_id=3
                .post(`${this.Baseurl}news_list?web_token=${that.token}&hotel_id=${that.hotel_id}&id=${that.id}`)
                .then(function (res) {
                    console.log(res)
                    // that.name = res.data.data.news.name
                    // that.infolist =  res.data.data
                    // console.log(that.infolist)
                    var result = res.data.data
                    var data = []
                    for (var i = 0; i < result.length; i += 5) {
                        data.push(result.slice(i, i + 5))
                    }
                    that.infolist = data
                    that.$nextTick(function () {
                        that.lunboone()
                    })
                }).catch(err => console.log(err));
        },

        //去新闻详情页
        newsdeatil(id) {
            // this.$router.push('/newsdetail');
            localStorage.setItem('newsId', id)
            localStorage.setItem('id', this.id)
            this.$router.push({
                name: 'NewsDetail',
                // query: {
                //     newsId: id,
                //     id: this.id
                //     // module_id:this.modularid
                // }
            })
        },
        lunboone() {
            var lunroom = new Swiper(".lunroom", {
                // loop: true, // 循环模式选项
                // slidesPerView: 3,
                // centeredSlides: true,//这个是让第一个居中显示的
                spaceBetween: 20,
                // slidesPerView: 3,
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: ".nextroom",
                    prevEl: ".prevroom",
                },
            });
        }
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

.newslist {
    background-color: #efefed;
}

.newslist .title {
    font-size: 30px;
    color: #000000;
    text-align: center;
    font-weight: 400;
}

/* efefed */
.newslist_lunbo {
    position: relative;
    /* bottom: ; */
    padding-bottom: 85px;
}

.prevroom,
.nextroom {
    background-image: url(../../assets/img/xiangyou.png);
    background-size: 100%;
    background-repeat: no-repeat;
    width: 33px;
    height: 20px;
    top: 100%;
    margin-top: -50px;
}

.prevroom {
    transform: rotate(180deg);
}

.prevroom::after,
.nextroom::after {
    display: none;
}

.news_list {
    margin-top: 48px;
    background-color: #fff;
    display: flex;
    cursor: pointer;
}

.news_list .newslist_img {
    /* width: 576px;
        height: 363px; */
    width: 545px;
    /* height: 360px; */
    height: 273px;
    overflow: hidden;
}

.news_list .newslist_img img {
    width: 100%;
    display: block;
    transition: all 0.5s;
}

.newslist_version {
    width: 856px;
    /* padding: 75px 80px 0; */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}

.newslist_version .version_eara {
    width: 706px;
}

/* <span class="time"></span>
                                                <span class="vertit">豪华客房豪华客房</span>
                                                <p class="vertext"> */
.newslist_version .version_eara .time {
    font-size: 18px;
    color: #000000;
    font-family: Arial;
}

.newslist_version .version_eara .vertit {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 24px;
    color: #000000;
    margin-top: 10px;
}

.newslist_version .version_eara .vertext {
    margin-top: 10px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size: 18px;
    color: #666666;
    line-height: 32px;
    height: 96px;
}

.newslist_version .version_eara .news_detail {
    margin-top: 15px;
    float: right;
    width: 125px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #a8916f;
    text-align: center;
}

.news_list:hover {
    box-shadow: 0 0 6px 1px #d6d5d5;
}

.news_list:hover .newslist_img img {
    transform: scale(1.2);
}

.news_list:hover .news_detail {
    color: #fff;
    background-color: #d5b08b;
}
</style>