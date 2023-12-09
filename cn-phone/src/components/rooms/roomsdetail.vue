<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />
    <div class="conts">
      <div class="room_detail">
        <div class="detailone">
          <div class="lunbotu">
            <div class="swiper-container luncanyin">
              <!-- 如果需要导航按钮 -->
              <div class="swiper-button-prev prevcan"></div>
              <div class="swiper-button-next nextcan"></div>
              <div class="swiper-wrapper">
                <!-- Slides -->
                <div class="swiper-slide" v-for="(item, index) in listimgs" :key="index">
                  <div class="deta_leftimg">
                    <img :src="Baseurl + item.image" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="service">
            <div class="detail_tit">{{ roomslist.title }}</div>
            <div class="service_list">
              <div class="servicetit">
                <p>客房概览</p>
              </div>
              <div class="service_text">
                <p v-for="(item, index) in gailan" :key="index">{{ item }}</p>
              </div>
            </div>
            <div class="service_list">
              <div class="servicetit">
                <p>客房设施</p>
              </div>
              <div class="service_text">
                <p v-for="(item, index) in sheshi" :key="index">{{ item }}</p>
              </div>
            </div>
            <div class="service_list">
              <div class="servicetit">
                <p>其他</p>
              </div>
              <!-- <div class="service_text">
                <p v-for="(item, index) in qita" :key="index">{{ item }}</p>
              </div> -->
              <div class="service_text">
                <p v-html="roomslist.video" style="width: 100%;white-space: inherit;"></p>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="main"> -->
        <div class="detailtwo">
          <div class="detailtwo_area" v-if="paricelist == ''">
            <p style="font-size: 4vw; padding: 2vw 4vw">查询时间段内暂无房型</p>
          </div>
          <div class="detailtwo_area" v-if="paricelist != ''">
            <div class="datalist" v-for="(item, index) in paricelist" :key="index">
              <div class="datalist_left">
                <div class="listwe1">
                  <span class="spns1">{{ item.ratecodeName }}</span>
                  <span class="spns2">线上支付</span>
                </div>
                <div class="listwe2">
                  <span class="wes1">最低：</span>
                  <span class="wes2">{{ item.salePrice }}</span>
                  <span class="wes3">CNY</span>
                </div>
              </div>
              <div class="datalist_right" @click="yuding(item, index)">预定</div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <!-- 日历 -->
    <Queryhotel />
    <!-- 公共底部 -->
    <Footer />
  </div>
</template>

<script>
import Header from "../owned/header.vue";
import Footer from "../owned/footer.vue";
import Queryhotel from "../rooms/queryhotel.vue";
import Swiper from "swiper";

export default {
  components: {
    Header,
    Footer,
    Queryhotel
  },
  data() {
    return {
      //   // close1:true,
      //   close2: true,
      //   close3: true,
      token: "", //token
      hotel_id: "", //酒店id
      modularid: "", //模块id
      hotelcode: "", //酒店编码
      close1: true,
      close2: true,
      close3: true,
      infolist: [], //酒店列表
      roomslist: [],
      roomId: "", //点击的第几个房间
      paricelist: [],
      gailan: [], //概览
      sheshi: [], //设施
      qita: [], //其他
      listimgs: [], //酒店的图片
      startDate: "",
      endDate: "",
      numDay: "",
      looks: "",
      accountNumber: sessionStorage.getItem("accountNumber"), //用户手机号
      codesh: '',
      // kefangid:''
      prono: "",//公司Id
      listid: ""
    };
  },

  created() {
    if (this.$route.query.listid) {
      this.listid = this.$route.query.listid
    }
    if (this.$route.query.prono) {
      this.prono = this.$route.query.prono
    }
    // 储存第几个头部状态
    localStorage.setItem("istrue", 2);
    this.token = sessionStorage.getItem("token");
    this.hotel_id = sessionStorage.getItem("hotel_id");
    this.hotelcode = sessionStorage.getItem("hotelcode");

    this.codesh = sessionStorage.getItem("codesh");
    this.looks = this.$route.query.looks;
    this.startDate = this.$route.query.startDate;
    this.endDate = this.$route.query.endDate;
    this.numDay = this.$route.query.numDay;
    this.roomId = this.$route.query.roomId;
    if (this.accountNumber == null) {
      this.accountNumber == ''
    }
    this.getroomlist();
  },
  methods: {
    getidprice() {
      console.log(this.listid)
      var that = this
      that.$axios
        .post(`${this.Baseurl}home_list?web_token=${that.token}&hotel_id=${that.hotel_id}
          &beginDate=${that.startDate}&endDate=${that.endDate}&prono=${that.prono}&hotel_code=${that.hotelcode}`)
        .then(function (res) {
          console.log(res)
          var ptriclist = res.data.data.database_room
          console.log(ptriclist)
          for (let i = 0; i < ptriclist.length; i++) {
            if (ptriclist[i].id == that.listid) {
              that.paricelist = ptriclist[i].xyprice
            }
          }
          console.log(that.paricelist)
        }).catch(err => console.log(err));
    },
    getroomlist() {
      var that = this;
      // console.log(that.looks)
      that.$axios
        .post(
          `${this.Baseurl}home_room_data?web_token=${that.token}&hotel_id=${that.hotel_id}&hotel_code=${that.hotelcode}
                &channelCode=${that.codesh}
                &id=${that.roomId}&startDate=${that.startDate}&endDate=${that.endDate}&numDay=${that.numDay}&looks=${that.looks}&tel=${that.accountNumber}`
        )
        .then(function (res) {
          console.log(res);
          console.log(res.data.data.News_info);
          that.infolist = res.data.data.News_info;
          that.roomslist = res.data.data.News_info;
          console.log(that.roomslist);
          // that.infolist = res.data.data.database_room
          // for (let i = 0; i < that.infolist.length; i++) {
          //     if(that.infolist[i].id == that.roomId){
          //         console.log(i)
          //         that.roomslist = that.infolist[i]
          //     }
          // }
          that.listimgs = [];
          for (let i = 0; i < that.roomslist.images.length; i++) {
            that.roomslist.images[i].type = 1;
            that.listimgs.push(that.roomslist.images[i]);
          }

          // that.listimgs = that.roomslist.images

          if (that.listimgs != "") {
            that.$nextTick(function () {
              that.lunbo();
              console.log("调用了吗");
            });
          }
          // that.paricelist =  that.roomslist.rateCodeInfos//价格
          if (that.prono && that.prono != '') {
            that.getidprice()
          } else {
            that.paricelist = that.roomslist.pricec
          }

          if (
            that.roomslist.description != "" &&
            that.roomslist.description != null
          ) {
            that.gailan = that.roomslist.description.split(",");
          }
          if (
            that.roomslist.description1 != "" &&
            that.roomslist.description1 != null
          ) {
            that.sheshi = that.roomslist.description1.split(",");
          }
          if (that.roomslist.video != "" && that.roomslist.video != null) {
            that.qita = that.roomslist.video.split(",");
          }
        })
        .catch((err) => console.log(err));
    },

    close(num) {
      if (num == 1) {
        this.close1 = !this.close1;
      }
      if (num == 2) {
        this.close2 = !this.close2;
      }
      if (num == 3) {
        this.close3 = !this.close3;
      }
    },
    yuding(item, index) {
      //需要判断一下是否登录
      // this.$router.push({
      //     name:'Order',
      //     // query:{
      //     //     id:id,
      //     //     module_id:this.modularid
      //     // }
      // })
      console.log(item);
      if (item.canSaleNum < 1) {
        that.tishi("该房源不足,请更换房型或日期");
        console.log(item);
        return
      }
      if (
        sessionStorage.getItem("accountNumber") &&
        sessionStorage.getItem("accountNumber") != ""
      ) {
        this.$router.push({
          name: "Order",
          query: {
            roomId: this.roomId,
            priceIndex: index,
            startDate: this.startDate,
            endDate: this.endDate,
            numDay: this.numDay, //默认一天
            looks: this.looks,
            prono: this.prono,
            ratecode: item.ratecodeCode,
          },
        });
      } else {
        alert("请先登录");
        // localStorage.setItem("denglv", 1);
        this.$router.push('/signin?date' + Date.now());
      }
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
  },
  mounted() {
    // var luncanyin = new Swiper(".luncanyin", {
    //   loop: true, // 循环模式选项
    //   autoplay: true,
    //   // slidesPerView: 4,
    //   // centeredSlides: true,//这个是让第一个居中显示的
    //   // spaceBetween: 47,
    //   navigation: {
    //     nextEl: ".nextcan",
    //     prevEl: ".prevcan",
    //   },
    // });
  },
};
</script>
<style scoped>
.room_detail {
  width: 100%;
  /* background-color: #efefed; */
  /* padding-bottom: 30px; */
}

.detailone {
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
}

/* 轮播图 */
.lunbotu {
  width: 100%;
  height: 62vw;
  overflow: hidden;
}

.prevcan,
.nextcan {
  color: #fff;
  top: 50%;
  /* margin-top: -55px; */
}

.prevcan {
  left: 3.867vw;
}

.nextcan {
  right: 3.867vw;
}

.prevcan:after,
.nextcan:after {
  font-size: 7vw;
}

.deta_leftimg {
  width: 100%;
  height: 100%;
}

.deta_leftimg img {
  width: 100%;
  height: 100%;
  display: block;
}

.detail_tit {
  font-size: 5vw;
  color: #000000;
  line-height: 13.333vw;
  padding: 0 5.333vw;
}

/* 设施... */
.service {
  width: 100%;
}

.service .service_list {
  border-top: 0.133vw solid #d8d8d8;
  padding: 4.667vw 5.333vw;
  box-sizing: border-box;
}

.service .service_list .servicetit {
  display: flex;
}

.service .service_list .servicetit>p {
  font-size: 4vw;
  color: #000000;
  font-weight: 400;
}

.service .service_list .service_text {
  margin-top: 3.667vw;
}

.service .service_list .service_text p {
  font-size: 3.5vw;
  color: #666666;
  line-height: 6vw;
  width: 100%;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.detailtwo {
  width: 100%;
}

.detailtwo .detailtwo_area {
  width: 100%;
  border-bottom: 0.133vw solid #e3e3e3;
}

.datalist {
  border-top: 0.133vw solid #e3e3e3;
  padding: 5.333vw 5.333vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.datalist_left .listwe1 {
  /* font-size: 32px;
color: #d5b08b; */
  width: 60vw;
}

.datalist_left .listwe1 .spns1 {
  font-size: 4.5vw;
  color: #d5b08b;
}

.datalist_left .listwe1 .spns2 {
  font-size: 3.2vw;
  color: #000;
  /* margin-left: 2vw; */
  display: block;
}

.datalist_left .listwe2 {
  /* font-size: ;
color: #; */
}

.datalist_left .listwe2 .wes1 {
  font-size: 3vw;
  color: #000;
}

.datalist_left .listwe2 .wes2 {
  font-size: 5vw;
  color: #000;
  font-family: Arial;
}

.datalist_left .listwe2 .wes3 {
  font-size: 3.2vw;
  color: #000;
  margin-left: 1vw;
}

.datalist_right {
  width: 22.667vw;
  height: 8vw;
  background-color: #efefed;
  color: #206079;
  font-size: 4.8vw;
  text-align: center;
  line-height: 8vw;
}

/* wes1 */
</style>