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
      <div class="bottom_left">
        <div class="bot_top">
          <!-- <div ></div> -->
          <p v-for="(item, index) in botlist" :key="index" @click="pages(index + 1)">
            {{ item.title }}
          </p>
          <!-- <p @click="pages(2)">媒体中心</p>
                        <p @click="pages(3)">联系我们</p>
                        <p @click="pages(4)">法律声明</p> -->
        </div>
        <div class="bot_cen">
          <p v-if="footlist?.company_address != ''">Add : {{ footlist?.company_address }}</p>
          <p v-if="footlist?.company_email != ''">Zipcode : {{ footlist?.company_email }}</p>
          <p v-if="footlist?.company_tphone != ''">Switchboard : {{ footlist?.company_tphone }}</p>
          <p v-if="footlist?.web_domain != ''">Fax : {{ footlist?.web_domain }}</p>
        </div>

        <!-- <div class="bot_fot">
          <p>{{ footlist.web_copyright }} All rights reserved.</p>
          <p>{{ footlist.web_beian }}</p>
          <p>{{ footlist.company_name }}</p>
        </div> -->
        <div class="bot_fot">
          <p>{{ footlist?.web_copyright }} All rights reserved.</p>
          <p v-html="footlist?.web_beian"></p>
          <img class="bei" src="../../assets/img/bei.png" alt="">
          <p v-html="footlist?.company_name"></p>
        </div>
      </div>
      <div class="bottom_right">
        <div class="guanzhu">
          <p>Follow us:</p>
          <div class="guan guan1">
            <!-- <div class="xian xian1"></div> -->
            <!-- footlist.web_name -->
            <a :href="footlist?.web_name"><img src="../../assets/img/weibo.png" alt="" /></a>
          </div>
          <div class="guan guan2">
            <img src="../../assets/img/weixin.png" alt="" />
            <div class="xian">
              <!-- <img src="../../assets/img/erweima.jpg" alt=""> -->
              <!-- weixin_path -->
              <img :src="Baseurl + footlist?.weixin_path" alt="" />
            </div>
          </div>
        </div>
        <!-- <div class="switch" @click.stop="select()">
          <div class="switch_wen">
            <p>Choose another hotel</p>
            <img
              src="../../assets/img/botxia.png"
              :style="fotshow ? 'transform: rotate(180deg)' : ''"
              alt=""
            />
          </div>
          <div class="chooise" v-show="fotshow">
            <div class="chooise-scrollbar">
              <div class="chooise-scrollbar_wrap">
                <ul class="chooise_list">
                  <li
                    class="chooise_list_item"
                    v-for="(item, index) in hotelist"
                    :key="index"
                    @click="qiehuan(index)"
                  >
                    <span>{{ item.hotel_name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
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
    //底部选择
    select() {
      this.fotshow = !this.fotshow;
    },
    qiehuan(item, index) {
      // console.log(item.id);
      // console.log(index);
      sessionStorage.setItem("hotel_index_data", item.id);
      // this.gettoken()
      this.reload();
      this.gettoken()
      setTimeout(() => {
        this.reload();
      }, 1000)

    },
  },
};
</script>
<style scoped>
.footer .shiji {
  width: 100%;
  height: 240px;
  background: linear-gradient(to bottom, #efece7 40%, #f7f6f3 60%, #fff);
  border-bottom: 1px solid #dae4e4;
}

.footer .shiji .shiji_logo {
  width: 122px;
  height: 86px;
  margin: auto;
  text-align: center;
  padding-top: 45px;
}

.footer .shiji .shiji_logo img {
  width: 100%;
  height: 100%;
  display: block;
}

.footer .shiji .jiaru {
  text-align: center;
  margin: auto;
  font-size: 18px;
  color: #a8916f;
  display: table;
  border-bottom: 1px solid #a8916f;
  cursor: pointer;
  margin-top: 30px;
}

.footer .footer_bottom {
  height: 210px;
  /* margin-top: 60px; */
  /* padding: 0 260px; */
  padding-top: 60px;
  width: 1400px;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.footer .footer_bottom .bottom_left .bot_top {
  display: flex;
  font-size: 18px;
  color: #5f5f5f;
}

.footer .footer_bottom .bottom_left .bot_top p {
  margin-right: 30px;
  cursor: pointer;
}

.footer .footer_bottom .bottom_left .bot_cen {
  display: flex;
  font-size: 18px;
  color: #5f5f5f;
  margin-top: 38px;
}

.footer .footer_bottom .bottom_left .bot_cen p {
  margin-right: 12px;
}

.footer .footer_bottom .bottom_left .bot_fot {
  display: flex;
  font-size: 14px;
  color: #5f5f5f;
  margin-top: 15px;
}

.footer .footer_bottom .bottom_left .bot_fot p {
  margin-right: 5px;
}

.footer .footer_bottom .bottom_left .bot_fot /deep/ a {
  text-decoration: none;
  font-size: 14px;
  color: #5f5f5f;
}

/* .footer .footer_bottom .bottom_right{
        
    } */
.footer .footer_bottom .bottom_right .guanzhu {
  display: flex;
}

.footer .footer_bottom .bottom_right .guanzhu p {
  font-size: 18px;
  color: #5f5f5f;
}

.footer .footer_bottom .bottom_right .guanzhu .guan {
  width: 27px;
  /* margin: 0 10px; */
  cursor: pointer;
  position: relative;
  margin-left: 25px;
}

.footer .footer_bottom .bottom_right .guanzhu .guan img {
  width: 100%;
}

.footer .footer_bottom .bottom_right .guanzhu .guan .xian {
  background-color: #fff;
  width: 100px;
  height: 100px;
  position: absolute;
  border-radius: 10px;
  top: -187px;
  left: -70px;
  display: none;
  padding: 30px;
  box-shadow: 0 4px 20px 0 rgb(0, 0, 0, 0.07);
}

/* .footer .footer_bottom .bottom_right .guanzhu .guan1:hover .xian1 {
        display: block;
    } */
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
  width: 188px;
  height: 42px;
  box-sizing: border-box;
  border: 1px solid #c5c5c5;
  position: relative;
  margin-top: 42px;
}

.footer .footer_bottom .bottom_right .switch .switch_wen {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 16px 0 26px;
  box-sizing: border-box;
  cursor: pointer;
}

.footer .footer_bottom .bottom_right .switch .switch_wen p {
  font-size: 16px;
  color: #5f5f5f;
}

.footer .footer_bottom .bottom_right .switch .switch_wen img {
  width: 11px;
  height: 6px;
}

.footer .footer_bottom .bottom_right .switch .chooise {
  position: absolute;
  z-index: 9;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  box-sizing: border-box;
  margin: 5px 0;
  min-width: 300px;
  transform-origin: center top;
  bottom: 45px;
  left: 0;
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
  margin-bottom: -17px;
  margin-right: -17px;
  max-height: 240px;
}

.chooise_list {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
}

.chooise_list_item {
  font-size: 16px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 40px;
  line-height: 40px;
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
  width: 15px;
  height: 15px;
  margin-left: 10px;
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