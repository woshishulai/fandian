<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="newslist">
        <div class="main">
          <div class="title">图库展示</div>
          <div class="tuku">
            <div
                class="tuku_list"
                v-for="(item, index) in infolist"
                :key="index"
                @click="start(index)"
              >
                <img :src="Baseurl + item.pc_image" alt="" />
                <div class="names">{{ item.description }}</div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="topTips" v-if="swipershow">
      <div class="close" @click="guanbi()">
        <img src="../../assets/img/cha.png" alt="" />
      </div>
      <div class="lunboblos">
        <div class="swiper-container lunbotuku">
          <!-- 如果需要分页器 -->
          <!-- <div class="swiper-pagination"></div> -->
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev lunzuotuku"></div>
          <div class="swiper-button-next lunyoutuku"></div>
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in infolist"
              :key="index"
            >
              <!-- <img src="../../assets/img/hotle1.jpg" alt="" /> -->
              <img :src="Baseurl + item.pc_image" alt="" />
              <!-- <p>文字描述</p> -->
              <div class="wenzis">{{item.title}}<br/>{{ item.description }}</div>
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
import Header from "../owned/header.vue";
import Footer from "../owned/footer.vue";
import Swiper from "swiper";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      token: "", //token
      hotel_id: "", //酒店id
      hotelcode: "", //酒店编码
      list: [],
      infolist: [],
      tukuId: "", //上页传来的图库id
      swipershow: false,
      topimg:''
    };
  },

  created() {
     // 储存第几个头部状态
    localStorage.setItem("istrue", 0);
    this.token = sessionStorage.getItem("token");
    // console.log(this.token);
    this.hotel_id = sessionStorage.getItem("hotel_id");
    this.hotelcode = sessionStorage.getItem("hotelcode");
    this.topimg = this.$route.query.img
    this.tukuId = this.$route.query.id;
    this.getlist();
  },
  methods: {
    getlist() {
      var that = this;
      that.$axios
        .post(
          `${this.Baseurl}imgs_list?web_token=${that.token}&img_id=${that.tukuId}`
        )
        .then(function (res) {
          console.log(res);
          that.infolist = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    start(index) {
      this.swipershow = true;
      var that = this;
      console.log(index);
      this.$nextTick(function () {
        // this.lunbo();
        var mySwiper = new Swiper(".lunbotuku", {
          effect: "fade",
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
      this.swipershow = false;
    },
    lunbo() {},
  },
  mounted() {},
};
</script>
<style scoped>
.newslist {
  background-color: #efefed;
}
.newslist .title {
  font-size: 5vw;
  color: #000000;
  font-weight: 400;
  padding: 4.267vw 0;
}

.tuku {
  width: 100%;
  padding-bottom: 3.333vw;
}
.tuku_list {
  width: 100%;
  /* height: 553px; */
  margin-bottom: 4vw;
  overflow: hidden;
  position: relative;
}
.tuku_list_img {
  width: 100%;
  height: 72vw;
  overflow: hidden;
}
.tuku_list img {
  width: 100%;
  height: 100%;
  display: block;
}
.tuku_list .names {
  width: 100%;
  /* height: 0; */
  line-height: 12vw;
  background: #fff;
  /* position: absolute; */
  /* bottom: 0;
        left: 0; */
  font-size: 3.5vw;
  padding: 0 5.333vw;
  box-sizing: border-box;
  color: #000000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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