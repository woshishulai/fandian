<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="meal_top">
        <!-- <img loading="lazy"src="../../assets/img/cande1.jpg" alt="" /> -->
        <img loading="lazy" :src="Baseurl + topimg" alt="">
      </div>
      <div class="crumbs">
        <p>您的位置：首页 > 餐饮</p>
      </div>
      <div class="canyin">
        <div class="main">
          <div class="yuxiang">
            <div class="canyinlun">
              <div class="swiper-container luncanyin">
                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev prevcan"></div>
                <div class="swiper-button-next nextcan"></div>

                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(item, index) in meallist.images" :key="index">
                    <div class="can_list_img">
                      <img loading="lazy" :src="Baseurl + item.image" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="canyin_right">
              <div class="canyin_right_text">
                <span>{{ meallist.title }}</span>
                <p v-html="meallist.description"></p>
                <div class="cancont">
                  <div class="rig_list">
                    <img loading="lazy" src="../../assets/img/icon1.png" alt="" />
                    <span>营业时间</span>
                    <!-- <p>午餐: 11:30 - 14:00 , 晚餐: 17:30 - 22:00</p> -->
                    <p>{{ meallist.add_time }}</p>
                  </div>
                  <div class="rig_list">
                    <img loading="lazy" src="../../assets/img/icon2.png" alt="" />
                    <span>电话</span>
                    <p>{{ meallist.emails }}</p>
                  </div>
                  <div class="rig_list">
                    <img loading="lazy" src="../../assets/img/icon3.png" alt="" />
                    <span>位置</span>
                    <p>{{ meallist.address }}</p>
                  </div>
                  <div class="rig_list">
                    <img loading="lazy" src="../../assets/img/icon4.png" alt="" />
                    <span>菜式</span>
                    <p>{{ meallist.en_title }}</p>
                  </div>
                </div>
              </div>
              <div class="link">
                <div class="links" @click="tolink(meallist.pc_link)">
                  <div class="img">
                    <img loading="lazy" src="../../assets/img/link1.png" alt="">
                    <img loading="lazy" src="../../assets/img/link1b.png" alt="">
                  </div>
                  <p>查看详细</p>
                </div>
                <div class="links">
                  <div class="img">
                    <img loading="lazy" src="../../assets/img/link2.png" alt="">
                    <img loading="lazy" src="../../assets/img/link2b.png" alt="">
                  </div>
                  <p>宴会预定</p>
                  <div class="fudong">
                    <p>扫描二维码预定宴会</p>
                    <img loading="lazy" :src="Baseurl + meallist.pinpai" alt="">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="youhui">
        <div class="main">
          <div class="youhui_title">其他餐饮推荐</div>
          <div class="vips">
            <div class="vips_list" v-if="mealuplist" @click="topath(boxupIndex, mealuplist.id)">
              <div class="vips_list_img">
                <!-- <img loading="lazy"src="../../assets/img/can3.jpg" alt=""> -->
                <img loading="lazy" :src="Baseurl + mealuplist.pc_image" alt="" />
              </div>
              <div class="vips_list_text">
                <span>{{ mealuplist.title }}</span>
              </div>
            </div>
            <div class="vips_list" v-if="mealdownlist" @click="topath(boxdownIndex, mealdownlist.id)">
              <div class="vips_list_img">
                <img loading="lazy" :src="Baseurl + mealdownlist.pc_image" alt="" />
              </div>
              <div class="vips_list_text">
                <span>{{ mealdownlist.title }}</span>
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
      modularid: "", //模块id
      id: "",
      infolist: [], //上页储存的所有列表
      boxupIndex: "", //上一个是第几个
      boxIndex: "", //当前是第几个进来的
      boxdownIndex: "", //下一个是第几个
      mealuplist: [], //上一个列表
      meallist: [], //当前的列表
      mealdownlist: [], //下一个列表
      mealId: "", //传来的id
      // erwei:false,
      topimg: ''
    };
  },

  created() {
    // 储存第几个头部状态
    localStorage.setItem("istrue", 3);
    this.token = sessionStorage.getItem("token");
    // console.log(this.token);
    this.hotel_id = sessionStorage.getItem("hotel_id");

    this.mealId = this.$route.query.mealId || localStorage.getItem('mealId')
    // if (sessionStorage.getItem("fieldData")) {
    //   var fieldData = JSON.parse(sessionStorage.getItem("fieldData"));
    //   this.modularid = fieldData[2].id;
    // }
    this.getinfolist()
    console.log(this.mealId);
  },
  inject: ["reload"],
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
          // that.getdatalist()
          that.getdatalist(that.mealId)
        })
        .catch((err) => console.log(err));
    },
    tolink(link) {
      if (link) {
        window.open(link)
      }
    },
    // get_ma(){
    //   this.erwei =true
    // },
    // getinfolist(){
    //     var that =this
    //     that.$axios
    //     .post(`${this.Baseurl}new_details?web_token=${that.token}&hotel_id=${that.hotel_id}&new_id=${that.meallist.id}`)
    //     .then(function(res) {
    //         console.log(res)
    //     }).catch(err => console.log(err));
    // },
    getdatalist(mealId) {
      //?web_token=${that.token}&hotel_id=1
      var that = this;
      that.$axios
        // &module_id=3
        .get(
          `${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`
        )
        .then(function (res) {
          console.log(res);
          // that.infolist =  res.data.data.defaul_module_list
          that.topimg = res.data.data.top_module_list[2].pc_image
          that.infolist = res.data.data.defaul_module_list[0].news;
          for (let i = 0; i < that.infolist.length; i++) {
            if (that.infolist[i].id == mealId) {
              console.log(i);
              that.boxIndex = i;
            }
          }
          if (that.boxIndex == 0) {
            console.log("1111")
            that.boxupIndex = that.infolist.length - 1;
            that.boxdownIndex = parseInt(that.boxIndex) + 1;
          } else if (that.boxIndex == that.infolist.length - 1) {
            that.boxupIndex = parseInt(that.boxIndex) - 1;
            that.boxdownIndex = 0;
          } else {
            that.boxupIndex = parseInt(that.boxIndex) - 1;
            that.boxdownIndex = parseInt(that.boxIndex) + 1;
          }
          // if(that.infolist.length!=0){

          // }
          // else if(that.infolist.length==2){
          //   // that.boxupIndex = 0;
          //   // that.boxdownIndex = 0;1 2
          //   if (that.boxIndex == that.infolist.length - 1) {
          //     that.boxupIndex = parseInt(that.boxIndex) - 1;
          //     that.boxdownIndex = 0;
          //   } else {
          //     that.boxupIndex = 0;
          //     that.boxdownIndex = parseInt(that.boxIndex) + 1;
          //   }
          // }
          // else if(that.infolist.length==1){
          //   that.boxupIndex = 0;
          //   that.boxdownIndex = 0;
          // }

          that.meallist = that.infolist[that.boxIndex];
          console.log(that.meallist)
          that.mealuplist = that.infolist[that.boxupIndex];
          that.mealdownlist = that.infolist[that.boxdownIndex];
          //   console.log("上" + that.boxupIndex);
          //   console.log("当前" + that.boxIndex);
          //   console.log("下" + that.boxdownIndex);
          //   console.log(that.meallist);
          // this.getinfolist()

          that.$nextTick(function () {
            that.lunbo()
          })
        })
        .catch((err) => console.log(err));
    },
    lunbo() {
      var luncanyin = new Swiper(".luncanyin", {
        loop: true, // 循环模式选项
        autoplay: true,
        // slidesPerView: 4,
        // centeredSlides: true,//这个是让第一个居中显示的
        // spaceBetween: 47,
        navigation: {
          nextEl: ".nextcan",
          prevEl: ".prevcan",
        },
      });
    },
    topath(index, id) {
      console.log(index)
      this.boxIndex = index
      this.getdatalist(id)
      // this.reload();
    },
  },
  mounted() { },
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

.yuxiang {
  background-color: #fff;
  display: flex;
  height: 520px;
}

.canyinlun {
  width: 545px;
  height: 520px;
  position: relative;
}

.canyinlun .can_list_img {
  width: 100%;
  height: 100%;
}

.canyinlun .can_list_img img {
  width: 100%;
  height: 100%;
  display: block;
}

.prevcan,
.nextcan {
  color: #fff;
  top: 100%;
  margin-top: -55px;
}

.prevcan {
  left: 38px;
}

.nextcan {
  right: 38px;
}

.prevcan:after,
.nextcan:after {
  font-size: 25px;
}

.canyinlun .luncanyin {
  width: 100%;
  height: 100%;
}

.canyinlun .luncanyin .swiper-slide {
  width: 100%;
  height: 100%;
}

.canyin_right {
  display: flex;
  /* align-items: center; */
  justify-content: center;
  width: 855px;
  position: relative;
}

.canyin_right .link {
  position: absolute;
  right: 0;
  bottom: 20px;
  display: flex;
  align-items: center;
}

.canyin_right .link .links {
  width: 160px;
  height: 50px;
  display: flex;
  align-items: center;
  border: 2px solid #a8916f;
  box-sizing: border-box;
  position: relative;
  margin-right: 30px;
  cursor: pointer;
}

.canyin_right .link .links>.img {
  width: 27px;
  height: 24px;
  margin-left: 17px;
  margin-right: 15px;
}

.canyin_right .link .links>.img>img {
  width: 100%;
  height: 100%;
}

.canyin_right .link .links>.img>img:nth-child(1) {
  display: block;
}

.canyin_right .link .links>.img>img:nth-child(2) {
  display: none;
}

.canyin_right .link .links>p {
  font-size: 20px;
  color: #775b3f;
}

.canyin_right .link .links .fudong {
  position: absolute;
  /* width: 209px;
  height: 237px; */
  padding: 15px 13px;
  background-color: #efefed;
  bottom: 60px;
  right: 0;
  z-index: 1;
  display: none;
}

.canyin_right .link .links:hover {
  background-color: #d5b08b;
  border-color: #d5b08b;
}

.canyin_right .link .links:hover>p {
  color: #fff;
}

.canyin_right .link .links:hover .fudong {
  display: block;
}

.canyin_right .link .links:hover>.img>img:nth-child(1) {
  display: none;
}

.canyin_right .link .links:hover>.img>img:nth-child(2) {
  display: block;
}

.canyin_right .link .links .fudong>img {
  width: 185px;
  height: 185px;
  display: block;
}

.canyin_right .link .links .fudong>p {
  font-size: 18px;
  color: #737373;
  margin-bottom: 10px;
  text-align: center;
}



.canyin_right .canyin_right_text {
  width: 715px;
  margin-top: 53px;
}

.canyin_right .canyin_right_text>span {
  font-size: 30px;
  color: #000000;
}

.canyin_right .canyin_right_text>p {
  line-height: 30px;
  margin-top: 25px;
  font-size: 18px;
  color: #000000;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  /*要显示的行数*/
  -webkit-box-orient: vertical;
  /* line-height: 30px;
        height: 60px; */
}

.rig_list {
  margin-top: 27px;
  display: flex;
  align-items: flex-start;
}

.rig_list>img {
  width: 20px;
  height: 20px;
  display: block;
  margin-right: 25px;
  transform: translateY(5px);
}

.rig_list>span {
  margin-right: 13px;
  font-size: 18px;
  color: #000000;
}

.rig_list>p {
  font-size: 18px;
  color: #000000;
  flex: 1;
}

.youhui {
  width: 100%;
}

.youhui .youhui_title {
  font-size: 30px;
  color: #000000;
  font-weight: 400;
  margin-top: 40px;
}

.youhui .vips {
  margin-top: 40px;
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
  margin-top: 35px;
}

.youhui .vips .vips_list .vips_list_text span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 24px;
  color: #000000;
}
</style>