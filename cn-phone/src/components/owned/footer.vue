<template>
  <!-- <div> -->
  <div class="footer" @click="fotshow = false">
    <div class="shiji">
      <div class="shiji_logo">
        <img src="../../assets/img/shijilogo.png" alt="" />
      </div>
      <p class="jiaru" @click="pages(0)">
        {{ footlist?.str }}
      </p>
    </div>
    <div class="footer_bottom">
      <div class="bottom_right">
        <div class="guanzhu">
          <p>关注我们：</p>
          <div class="guan guan1">
            <!-- <div class="xian xian1"></div> -->
            <a href="https://weibo.com/u/2707064745"><img src="../../assets/img/weibo.png" alt="" /></a>
          </div>
          <div class="guan guan2">
            <img src="../../assets/img/weixin.png" alt="" />
            <div class="xian">
              <img src="../../assets/img/erweima.jpg" alt="" />
            </div>
          </div>
        </div>
        <!-- @click.stop="select()" -->
        <!-- <div class="switch">
          <div class="switch_wen">
            <p id="select" @click="beidian()">选择其他酒店</p>
            <img
              src="../../assets/img/botxia.png"
              :style="fotshow ? 'transform: rotate(180deg)' : ''"
              alt=""
            />
          </div>
        </div> -->
      </div>
      <div class="bottom_left">
        <div class="bot_top">
          <!-- <p @click="pages(1)">世纪会</p>
                        <p @click="pages(2)">媒体中心</p>
                        <p @click="pages(3)">联系我们</p>
                        <p @click="pages(4)">法律声明</p> -->
          <p v-for="(item, index) in botlist" :key="index" @click="pages(index + 1)">
            {{ item.title }}
          </p>
        </div>
        <div class="bot_cen">
          <p v-if="footlist?.company_address != ''">地址 : {{ footlist?.company_address }}</p>
          <p v-if="footlist?.company_email != ''">邮政编码 : {{ footlist?.company_email }}</p>
          <p v-if="footlist?.company_tphone != ''">总机 : {{ footlist?.company_tphone }}</p>
          <p v-if="footlist?.web_domain != ''">传真 : {{ footlist?.web_domain }}</p>
        </div>
        <div class="bot_fot">
          <p>{{ footlist?.web_copyright }} 保留所有权利</p>
          <br />
          <p v-html="footlist?.web_beian"></p>
          <img class="bei" src="../../assets/img/bei.png" alt="">
          <p v-html="footlist?.company_name"></p>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import MobileSelect from "../../assets/js/mobileSelect";
export default {
  data() {
    return {
      token: "",
      hotel_id: "",
      footlist: "",
      fotshow: false,
      hotelist: [],
      botlist: [],
      hotelcode: "",
      selectxuan: 0,
      time: null,
    };
  },
  inject: ["reload"],
  created() {
    this.gettoken()
    this.token = sessionStorage.getItem("token");
    this.hotel_id = sessionStorage.getItem("hotel_id");
    this.getinfolist()
  },

  methods: {
    gettoken() {
      var that = this;
      that.$axios
        .post(`${this.Baseurl}/hotel_state_token`)
        .then(function (res) {
          console.log(res.data.token);
          sessionStorage.setItem("token", res.data.token);
          that.token = res.data.token;
          that.getdiqulist()
        })
        .catch((err) => console.log(err));
    },
    getdiqulist() {
      var that = this;
      that.$axios
        .get(`${this.Baseurl}hotel_new?web_token=${that.token}`)
        .then(function (res) {
          console.log(res)
          that.city = res.data.data;
          console.log("citycitycitycitycitycitycitycitycitycitycitycitycitycitycity");
          console.log(that.city);
          if (
            localStorage.getItem("mudiIndex") &&
            localStorage.getItem("mudiIndex") != "" && localStorage.getItem("mudiIndexnum1")
          ) {
            that.mudiIndex = localStorage.getItem("mudiIndex");
            that.mudiIndexnum1 = localStorage.getItem("mudiIndexnum1");
            that.mudiIndexnum2 = localStorage.getItem("mudiIndexnum2");
            console.log(that.mudiIndexnum1);
            console.log(that.mudiIndexnum2);
            that.city_centry = that.city[that.mudiIndexnum1];

            sessionStorage.setItem("hotel_id", that.city[that.mudiIndexnum1][that.mudiIndexnum2].id);
            sessionStorage.setItem("hotelcode", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code);
            sessionStorage.setItem("codesh", that.city[that.mudiIndexnum1][that.mudiIndexnum2].code);
            sessionStorage.setItem("hotelname", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name);
            sessionStorage.setItem("dituxinxi", JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
          } else {
            that.city_centry = that.city["北京"];
            that.mudiIndex = that.city["北京"][0].hotel_name;
            that.mudiIndexnum1 = "北京";
            that.mudiIndexnum2 = 0;
            // that.jiudianid = that.city["北京"][0].id;
            localStorage.setItem("mudiIndex", that.mudiIndex);
            // localStorage.setItem("jiudianid", that.jiudianid);
            localStorage.setItem("mudiIndexnum1", "北京");
            localStorage.setItem("mudiIndexnum2", 0);

            sessionStorage.setItem("hotel_id", that.city["北京"][0].id);
            sessionStorage.setItem("hotelcode", that.city["北京"][0].hotel_code);
            sessionStorage.setItem("codesh", that.city["北京"][0].code);
            sessionStorage.setItem("hotelname", that.city["北京"][0].hotel_name);
            sessionStorage.setItem("dituxinxi", JSON.stringify(that.city["北京"][0]))
          }
          console.log(that.city_centry);
        })
        .catch((err) => console.log(err));
    },

    //获取底部信息
    getinfolist() {
      var that = this;
      that.$axios
        .post(
          `${this.Baseurl}public_footer?web_token=${that.token}&hotel_id=${that.hotel_id}&hotel_code=${that.hotelcode}`
        )
        .then(function (res) {
          console.log(res);
          that.footlist = res.data.data.foot_module_list[0];
          that.botlist = res.data.data.foot_module;
          localStorage.setItem("foot_module", JSON.stringify(that.botlist)); //列表
        })
        .catch((err) => console.log(err));
    },

    pages(index) {
      if (index == 0) {
        this.$router.push({ name: "Ambitus" });
      }
      if (index == 1) {
        //that.$router.push("/Boxsingle?date" + Date.now());
        this.$router.push({ name: "Media" });
      }
      if (index == 2) {
        this.$router.push({ name: "Contact" });
      }
      if (index == 3) {
        this.$router.push({ name: "Law" });
      }
      this.reload();
    },

    // beidian() {
    //   this.time = setInterval(() => {
    //     console.log(sessionStorage.getItem("selectxuan"));
    //     if (
    //       sessionStorage.getItem("selectxuan") &&
    //       sessionStorage.getItem("selectxuan") != "" &&
    //       sessionStorage.getItem("selectxuan") != null
    //     ) {
    //       this.selectxuan = sessionStorage.getItem("selectxuan");
    //       sessionStorage.setItem(
    //         "hotel_index_data",
    //         this.hotelist[this.selectxuan].id
    //       );
    //       this.reload();
    //       this.gettoken();
    //       setTimeout(() => {
    //         this.reload();
    //       }, 1000);
    //     }
    //   }, 3000);
    //   setTimeout(() => {
    //     clearInterval(this.time);
    //   }, 10000);
    // },
    //底部选择
    // select() {
    //   console.log(this.hotelist);
    //   // console.log(that.hotelist)
    //   // this.fotshow = !this.fotshow
    //   var weekdayArr = [];
    //   for (let i = 0; i < this.hotelist.length; i++) {
    //     var aa = this.hotelist[i].hotel_name;
    //     weekdayArr.push(aa);
    //   }
    //   var mobileSelect1 = new MobileSelect({
    //     trigger: "#select",
    //     title: "选择其他酒店",
    //     wheels: [{ data: weekdayArr }],
    //     position: [0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
    //     transitionEnd: function (indexArr, data) {
    //       //console.log(data);
    //     },
    //     callback: function (indexArr, data) {
    //       console.log(indexArr);
    //       // console.log(data[0]);
    //       sessionStorage.setItem("selectxuan", indexArr);
    //       // console.log(sessionStorage.getItem("selectxuan"));
    //       // this.resetSetItem("selectxuan", indexArr);
    //       // this.reload()
    //       //
    //     },
    //   });
    // },
    // //
    // qiehuan(item, index) {
    //   // console.log(item.id);
    //   // console.log(index);
    //   sessionStorage.setItem("hotel_index_data", item.id);
    //   // this.gettoken()
    //   //buxingazhezenmebanne
    //   this.reload();
    //   this.gettoken();
    //   setTimeout(() => {
    //     this.reload();
    //   }, 1000);
    // },
  },
  mounted() { },
  beforeDestroy() {
    this.reload();
    clearInterval(this.time);
  },
};
</script>
<style scoped>
.footer {
  padding-bottom: 4vw;
}

.footer .shiji {
  width: 100%;
  height: 32vw;
  background: linear-gradient(to bottom, #efece7 40%, #f7f6f3 60%, #fff);
  border-bottom: 0.133vw solid #dae4e4;
}

.footer .shiji .shiji_logo {
  width: 16.267vw;
  height: 11.467vw;
  margin: auto;
  text-align: center;
  padding-top: 6vw;
}

.footer .shiji .shiji_logo img {
  width: 100%;
  height: 100%;
  display: block;
}

.footer .shiji .jiaru {
  text-align: center;
  margin: auto;
  font-size: 3.2vw;
  color: #a8916f;
  display: table;
  border-bottom: 0.133vw solid #a8916f;
  cursor: pointer;
  margin-top: 4vw;
}

.footer .footer_bottom {
  width: 89.333vw;
  margin: auto;
  box-sizing: border-box;
}

.footer .footer_bottom .bottom_left {
  margin-top: 8vw;
  line-height: 6vw;
}

.footer .footer_bottom .bottom_left .bot_top {
  display: flex;
  font-size: 3.2vw;
  color: #5f5f5f;
}

.footer .footer_bottom .bottom_left .bot_top p {
  margin-right: 4vw;
  cursor: pointer;
}

.footer .footer_bottom .bottom_left .bot_cen {
  font-size: 3.2vw;
  color: #5f5f5f;
  /* margin: 2vw 0; */
}

.footer .footer_bottom .bottom_left .bot_cen p {
  display: inline-block;
  margin-right: 1.6vw;
}

.footer .footer_bottom .bottom_left .bot_fot {
  font-size: 2.6vw;
  color: #5f5f5f;
}

.footer .footer_bottom .bottom_left .bot_fot p {
  margin-right: 0.667vw;
  display: inline-block;
}

.footer .footer_bottom .bottom_left .bot_fot /deep/ a {
  text-decoration: none;
  font-size: 2.6vw;
  color: #5f5f5f;
}

.footer .footer_bottom .bottom_right {
  display: flex;
  margin-top: 3.333vw;
  justify-content: space-between;
  align-items: center;
}

.footer .footer_bottom .bottom_right .guanzhu {
  display: flex;
  height: 100%;
  align-items: center;
}

.footer .footer_bottom .bottom_right .guanzhu p {
  font-size: 3.2vw;
  color: #5f5f5f;
}

.footer .footer_bottom .bottom_right .guanzhu .guan {
  width: 5.6vw;
  cursor: pointer;
  position: relative;
  margin-left: 2.667vw;
  width: 5.333vw;
  height: 4.533vw;
}

.footer .footer_bottom .bottom_right .guanzhu .guan img {
  width: 100%;
}

.footer .footer_bottom .bottom_right .guanzhu .guan .xian {
  background-color: #fff;
  padding: 3vw;
  border-radius: 2vw;
  width: 13.333vw;
  height: 13.333vw;
  position: absolute;
  top: -21.333vw;
  left: 50%;
  margin-left: -8.667vw;
  display: none;
  /* box-shadow: 0 4px 20px 0 rgb(0, 0, 0, 0.07); */
  box-shadow: 0 0.533vw 2.667vw 0 rgba(0, 0, 0, 0.07);
}

.footer .footer_bottom .bottom_right .guanzhu .guan1 a {
  width: 100%;
  height: 100%;
  display: block;
}

.footer .footer_bottom .bottom_right .guanzhu .guan2:hover>.xian {
  display: block;
}

/* .chooise */
.footer .footer_bottom .bottom_right .switch {
  width: 30.067vw;
  height: 7.6vw;
  box-sizing: border-box;
  border: 0.133vw solid #c5c5c5;
  position: relative;
  /* margin-top: 5.600vw; */

  line-height: 7.6vw;
  text-align: center;
  font-size: 3vw;
  color: #5f5f5f;
}

.footer .footer_bottom .bottom_right .switch .switch_wen {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 2.133vw 0 3.467vw;
  box-sizing: border-box;
  cursor: pointer;
}

.footer .footer_bottom .bottom_right .switch .switch_wen p {
  font-size: 3vw;
  color: #5f5f5f;
  width: 22vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}

.footer .footer_bottom .bottom_right .switch .switch_wen img {
  width: 1.934vw;
  height: 1vw;
}

.footer .footer_bottom .bottom_right .switch .chooise {
  position: absolute;
  z-index: 9;
  border: 0.133vw solid #e4e7ed;
  border-radius: 0.533vw;
  background-color: #fff;
  /* box-shadow: 0 0.267vw 1.600vw 0 rgb(0 0 0 / 10%); */
  box-shadow: 0 0.533vw 2.667vw 0 rgba(0, 0, 0, 0.07);
  box-sizing: border-box;
  margin: 0.667vw 0;
  min-width: 40vw;
  transform-origin: center top;
  bottom: 8vw;
  right: 0;
  /* display: none; */
}

.footer .footer_bottom .bottom_right .switch .chooise.active {
  display: block;
}

.chooise-scrollbar {
  overflow: hidden;
  position: relative;
}

.chooise-scrollbar_wrap {
  overflow: scroll;
  /* height: 100%; */
  margin-bottom: -2.267vw;
  margin-right: -2.267vw;
  max-height: 32vw;
}

.chooise_list {
  list-style: none;
  padding: 0.8vw 0;
  margin: 0;
  box-sizing: border-box;
}

.chooise_list_item {
  font-size: 3.2vw;
  padding: 0 2.667vw;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 5.333vw;
  line-height: 5.333vw;
  box-sizing: border-box;
  cursor: pointer;
}

.chooise_list_item.selected {
  color: #409eff;
  font-weight: 700;
}

.chooise_list_item:hover {
  background-color: #f5f7fa;
}

.bei {
  width: 3vw;
  height: 3vw;
  margin-left: 1vw;
}

/* .chooise_popper__arrow {
        position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
        top: -10px;
        left: 50%;
        margin-right: 3px;
        border-top-width: 0;
        border-bottom-color: #ebeef5;
        border-width: 6px;
    filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
        
    }
    .chooise_popper__arrow::after {
        position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 6px;
    filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #fff;
    }
    .a{
        min-width: 240px;
    transform-origin: center top;
    z-index: 2076;
    position: absolute;
    top: 425px;
    left: 366px;
    } */
</style>