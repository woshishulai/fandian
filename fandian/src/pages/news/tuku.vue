<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="meal_top">
        <!-- <img src="../../assets/img/newwbg.jpg" alt="" /> -->
        <img :src="Baseurl+topimg" alt="">
      </div>
      <div class="crumbs">
        <p>您的位置：首页 > {{topname}}</p>
      </div>
      <div class="newslist">
        <div class="main">
          <div class="title">{{topname}}</div>
          <div class="newslist_lunbo">
            <div class="tuku">
              <div class="tuku_list" v-for="(item, index) in infolist" :key="index" @click="start(index)">
                <img :src="Baseurl + item.pc_image" alt="" />
                <div class="names">{{ item.description }}</div>
              </div>
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
            <div class="swiper-slide" v-for="(item, index) in infolist" :key="index">
              <!-- <img src="../../assets/img/hotle1.jpg" alt="" /> -->
              <img :src="Baseurl + item.pc_image" alt="" />
              <div class="wenzis">{{item.title}}<br />{{ item.description }}</div>
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
import Header from "@/components/layout/header.vue";
import Footer from "@/components/layout/footer.vue";
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
      topimg:'',
      topname:''
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
     this.topname = this.$route.query.name
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
      console.log(that.infolist)
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
  margin-top: 10px;
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

.tuku {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.tuku_list {
  width: 686px;
  height: 553px;
  margin-top: 30px;
  overflow: hidden;
  position: relative;
}

.tuku_list img {
  width: 100%;
  height: 100%;
  display: block;
  transition: all 0.5s;
}

.tuku_list .names {
  width: 100%;
  height: 0;
  line-height: 70px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 30px;
  padding: 0 35px;
  box-sizing: border-box;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.5s;
}

.tuku_list:hover img {
  transform: scale(1.2);
  transition: transform 3s cubic-bezier(0.2, 0.96, 0.34, 1);
}

.tuku_list:hover .names {
  /* transform: height ; */
  height: 70px;
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
}</style>