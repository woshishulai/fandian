<template>
  <div class="header" id="header">
    <div class="logins" v-show="denglv != 0">
      <div class="login">
        <img class="login_close" src="../../assets/img/close.png" alt="" @click="guanbi()" />
        <div class="login_logo">
          <img src="../../assets/img/head_logo.png" alt="" />
        </div>
        <div class="txt_title">
          <div class="" :class="denglv == 1 ? 'active' : ''" @click="btns1()">
            会员登录
          </div>
          <div class="" :class="denglv == 2 ? 'active' : ''" @click="btns2()">
            会员注册
          </div>
        </div>
        <div class="fomes1" v-if="denglv == 1">
          <div class="fomes1list">
            <span>账号：</span>
            <input type="text" placeholder="请输入手机号" v-model="signNumber" />
          </div>
          <div class="fomes1list">
            <span>验证码：</span>
            <input class="inpyanma" type="text" v-model="signPassword" />
            <div class="yanma" @click="getcode(2)">发送验证码</div>
            <!-- <span>密码：</span>
                        <input type="password" placeholder="请输入密码" v-model="signPassword">
                        <div class="forget"  @click="forg()">忘记密码？</div> -->
          </div>
          <div class="fomes1list">
            <span></span>
            <div class="de" @click="denglu()">登录</div>
          </div>
          <div class="fomes1list">
            <span></span>
            <p>登录可享：预定折扣、积分奖励、会员专享礼遇</p>
          </div>
        </div>
        <div class="fomes2" v-if="denglv == 2">
          <div class="fomes2list">
            <span>输入手机号：</span>
            <input class="inp2list" type="text" v-model="registerNumber" />
          </div>
          <div class="fomes2list">
            <span>请输入验证码：</span>
            <input class="inpyanma" type="text" v-model="registerCode" />
            <div class="yanma" @click="getcode(1)">发送验证码</div>
          </div>
          <!-- <div class="fomes2list">
                        <span>密码：</span>
                        <input class="inp2list" type="password" v-model="registerPassword1">
                    </div>
                    <div class="fomes2list">
                        <span>确认密码：</span>
                        <input class="inp2list" type="password" v-model="registerPassword2">
                    </div> -->
          <div class="fomes2list">
            <span></span>
            <div class="zhu" @click="zhuce()">注册</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 公共头部 -->
    <div class="header_head">
      <div class="head_operation headbg">
        <!-- <div class="head_top">
            <p @click="pinpai()">返回品牌页</p>
        </div> -->
        <div class="header_right">
          <!-- @click="pinpai()" -->
          <a class="head_top" href="https://empark.com.cn/" style="text-decoration: none;">
            <img style="
                width: 18px;
                height: 17px;
                margin-right: 10px;
                cursor: pointer;
              " src="../../assets/img/back_roll_03.png" alt="" />
            <p>返回品牌页</p>
          </a>
          <!-- http://group.sc798.com/grouphotel/#/ -->
          <!-- <div class="switch" @click.stop="select()">
            <div class="switch_wen">
              <p>{{mudiIndex}}</p>
              <img
                src="../../assets/img/botxia.png"
                :style="fotshow ? 'transform: rotate(180deg)' : ''"
                alt=""
              />
            </div>
            <div class="el-select-dropdown" v-show="fotshow" >
              <div class="el-scrollbar" >
                <div class="el-select-dropdown__wrap">
                  <ul class="el-scrollbar__view el-select-dropdown__list">
                    <ul class="el-select-group__wrap" v-for="(item,index) in city" :key="index">
                      <li class="el-select-group__title">{{index}}</li>
                      <li>
                        <ul class="el-select-group">
                          <li class="el-select-dropdown__item" :class="mudiIndexnum1==index&&mudiIndexnum2==indexMsg?'hover':''" v-for="(listMsg,indexMsg) in item" :key="indexMsg"
                          @click="changejiu(listMsg,indexMsg,index)">
                            <span>{{listMsg.hotel_name}}</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    
                  </ul>
                </div> 
              </div>
            </div>
          </div> -->
          <div class="head_top head_top2">
            <p class="jituanguan" @click="jituan()">集团官网</p>
            <div class="rig_item hengyan">
              <img src="../../assets/img/diqiu.png" alt="" />
              <!-- <div class="rig_item_left"> 
                                <p>EN</p>
                                <span>/</span>
                                <p>中文</p>
                            </div> -->
              <select name="" id="yunyan" @change="yuyanchange">
                <option value="CN">CN</option>
                <option value="EN">EN</option>
              </select>
            </div>
            <div class="rig_item">
              <!-- <img src="../../assets/img/huiyuan.png" alt=""> -->
              <div class="rig_item_left" v-if="accountNumber == '' || accountNumber == null">
                <img class="rig_img" src="../../assets/img/login.png" alt="" />
                <p @click="login()">登录</p>
                <img class="rig_img" src="../../assets/img/join.png" alt="" />
                <p class="zhuce" @click="restigc()">加入</p>
              </div>
              <div class="rig_item_right" v-if="accountNumber != '' && accountNumber != null">
                <img class="rig_img" src="../../assets/img/login.png" alt="" />
                {{ accountNumber }}
                <div class="rig_tuichu">
                  <div class="ri_one" @click="goorderlist">我的订单</div>
                  <div class="ri_two" @click="exitaccount">退出登录</div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="head_bot" @click="yuding()">立即预定</div> -->
        </div>
      </div>
      <div class="head_operation">
        <div class="header_left">
          <div class="header_logo" @click="menu(0, menulist[0].id)">
            <!-- <img src="../../assets/img/head_logo.png" alt="" /> -->
            <img :src="Baseurl + logos" alt="">
          </div>
          <div class="head_bot">
            <div class="head_list" v-for="(item, index) in menulist" :key="index" :class="{ active: isTrue == index + 1 }"
              @click="menu(index, item.id)">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- 忘记密码不需要了 -->
    <!-- <div class="logins" v-if="forgrtshow">
            <div class="login">
                <img class="login_close" src="../../assets/img/close.png" alt="" @click="guanbi()">
                <div class="login_logo">
                    <img src="../../assets/img/head_logo.png" alt="">
                </div>
                <div class="txt_title">
                <div class="forgitmima">找回密码</div>
                </div>
                <div class="fomes2" >
                    <div class="fomes2list">
                        <span>输入手机号：</span>
                        <input class="inp2list" type="text" v-model="forgetnumber">
                    </div>
                    <div class="fomes2list">
                        <span>请输入验证码：</span>
                        <input class="inpyanma" type="text" v-model="forgetcode">
                        <div class="yanma" @click="getcode(3)">发送验证码</div>
                    </div>
                    <div class="fomes2list">
                        <span>新密码：</span>
                        <input class="inp2list" type="password" v-model="forgetmima">
                    </div>
                    <div class="fomes2list">
                        <span>确认新密码：</span>
                        <input class="inp2list" type="password" v-model="forgetmima2">
                    </div>
                    <div class="fomes2list">
                        <span></span>
                        <div class="zhu" @click="forget()">提交</div>
                    </div>
                </div>
            </div>
        </div> -->
    <div class="Tips_elastic" v-if="tipshow">
      <div class="Tips">
        <p>{{ tipstext }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      hotel_id: "",
      hotelist: [],
      hotelcode: "",
      logos: '',
      menulist: "",
      // meau:['酒店与度假酒店','住宿','餐饮','宴会','体验','世纪会'],
      // isTrue:1,
      isTrue: localStorage.getItem("istrue"),
      denglv: 0,
      tipshow: false,
      //注册
      registerNumber: "",
      tipstext: "",
      code: "",
      registerCode: "",
      registerPassword1: "",
      registerPassword2: "",
      // 登录
      signNumber: "",
      signPassword: "",

      //忘记密码
      forgrtshow: false,
      forgetnumber: "",
      forgetcode: "",
      forgetmima: "",
      forgetmima2: "",
      //登录成功状态
      accountNumber: sessionStorage.getItem("accountNumber"),

      fotshow: false,
      fotslist: [],
      city: [],
      city_centry: [],
      mudiIndex: "",
      mudiIndexnum1: "",
      mudiIndexnum2: "",
      mudisaaa: ''
    };
  },

  created() {
    this.gettoken()
    this.token = sessionStorage.getItem("token");
    this.hotel_id = sessionStorage.getItem("hotel_id");
    this.hotelcode = sessionStorage.getItem("hotelcode");
    if (sessionStorage.getItem("hotel_id")) {
      this.hotel_id = sessionStorage.getItem("hotel_id");
    } else {
      this.hotel_id = 1;
    }
    if (sessionStorage.getItem("hotelcode")) {
      this.hotelcode = sessionStorage.getItem("hotelcode");
    } else {
      this.hotelcode = "gw";
    }
    console.log(this.token)
    // this.hotel_id = sessionStorage.getItem("hotel_id");
    // this.hotelcode = sessionStorage.getItem("hotelcode");
    // console.log(this.hotelcode)  
    if (
      !localStorage.getItem("loginfou") ||
      localStorage.getItem("loginfou") == ""
    ) {
      localStorage.setItem("loginfou", 0);
    }

    this.diaoyong();
    this.getinfolist()
    this.getdiqulist()
  },
  inject: ["reload"],
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

    goorderlist() {
      this.$router.push({ name: "orderlist" });
    },
    //底部选择
    select() {
      this.fotshow = !this.fotshow;
    },
    changejiu(listMsg, indexMsg, index) {
      console.log(listMsg)
      console.log(indexMsg)
      console.log(index)
      if (listMsg.path && listMsg.path != "") {
        window.open(listMsg.path)
      } else {
        this.fotshow = false
        // this.mudishow = false;
        // this.cityshow = false;
        this.mudiIndex = listMsg.hotel_name;
        this.mudiIndexnum1 = index
        this.mudiIndexnum2 = indexMsg
        console.log(index)
        localStorage.setItem("mudiIndex", this.mudiIndex);
        localStorage.setItem("mudiIndexnum1", index);
        localStorage.setItem("mudiIndexnum2", indexMsg);
        // console.log( this.mudiIndexnum1)
        // console.log( this.mudiIndexnum2)

        var that = this
        sessionStorage.setItem("hotel_id", that.city[that.mudiIndexnum1][that.mudiIndexnum2].id);
        console.log("酒店hotel_id:", sessionStorage.getItem("hotel_id"))

        sessionStorage.setItem("hotelcode", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code);
        console.log("酒店hotelcode:", sessionStorage.getItem("hotelcode"))

        sessionStorage.setItem("codesh", that.city[that.mudiIndexnum1][that.mudiIndexnum2].code);
        console.log("酒店codesh:", sessionStorage.getItem("codesh"))

        sessionStorage.setItem("hotelname", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name);
        console.log("酒店hotelname:", sessionStorage.getItem("hotelname"))
        sessionStorage.setItem("dituxinxi", JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
        this.reload()
      }

    },
    getdiqulist() {
      var that = this;
      that.$axios
        .get(`${this.Baseurl}hotel_new?web_token=${that.token}`)
        .then(function (res) {
          that.city = res.data.data;
          console.log(
            "citycitycitycitycitycitycitycitycitycitycitycitycitycitycity"
          );
          console.log(that.city);
          if (
            localStorage.getItem("mudiIndex") &&
            localStorage.getItem("mudiIndex") != ""
          ) {
            that.mudiIndex = localStorage.getItem("mudiIndex");
            that.mudiIndexnum1 = localStorage.getItem("mudiIndexnum1");
            that.mudiIndexnum2 = localStorage.getItem("mudiIndexnum2");
            console.log(that.mudiIndexnum1);
            console.log(that.mudiIndexnum2);
            that.city_centry = that.city[that.mudiIndexnum1];

            sessionStorage.setItem(
              "hotel_id",
              that.city[that.mudiIndexnum1][that.mudiIndexnum2].id
            );
            console.log(that.city[that.mudiIndexnum1][that.mudiIndexnum2].id)
            sessionStorage.setItem(
              "hotelcode",
              that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code
            );
            sessionStorage.setItem(
              "codesh",
              that.city[that.mudiIndexnum1][that.mudiIndexnum2].code
            );
            sessionStorage.setItem(
              "hotelname",
              that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name
            );
            sessionStorage.setItem("dituxinxi", JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
          } else {
            that.city_centry = that.city["北京"];
            that.mudiIndex = that.city["北京"][0].hotel_name;
            that.mudiIndexnum1 = "北京";
            that.mudiIndexnum2 = 0;
            localStorage.setItem("mudiIndex", that.mudiIndex);
            localStorage.setItem("mudiIndexnum1", "北京");
            localStorage.setItem("mudiIndexnum2", 0);

            sessionStorage.setItem("hotel_id", that.city["北京"][0].id);
            sessionStorage.setItem(
              "hotelcode",
              that.city["北京"][0].hotel_code
            );
            sessionStorage.setItem("codesh", that.city["北京"][0].code);
            sessionStorage.setItem(
              "hotelname",
              that.city["北京"][0].hotel_name
            );
            sessionStorage.setItem("dituxinxi", JSON.stringify(that.city["北京"][0]))
          }
          console.log(that.city_centry);
        })
        .catch((err) => console.log(err));
    },
    yuyanchange(e) {
      console.log(e.target.value);
      var yuyan = e.target.value;
      console.log(window.location.href);
      var nowhref = window.location.href;
      // http://localhost:8083/#/hotel
      // http://zs.sc798.com/fandian/#/hotel
      //en_
      // var nowhref = "http://zs.sc798.com/fandian/#/hotel"
      if (yuyan == "EN") {
        var newhref = nowhref.replace("https://", "https://en.");
        // var newhref = nowhref.replace("ls_dfdcn.sc798.com", "en_zs.sc798.com");
        console.log(newhref);
        window.location.href = newhref;
      }
      // this.sex= e.target.value
    },
    // sexchange(e){
    //     console.log(e.target.value)
    //     this.sex= e.target.value
    // },
    //获取头部信息
    getinfolist() {
      // if(this.web_token==null || this.hotel_id==null){
      //     this.reload();
      // }
      var that = this;
      that.$axios
        .post(
          `${this.Baseurl}public_header?web_token=${that.token}&hotel_id=${that.hotel_id}`
        )
        .then(function (res) {
          console.log(res);
          that.menulist = res.data.data.top_module_list;
          that.logos = res.data.data.this_hotel_logo.hotel_logo;

          // console.log(that.menulist)
          const fieldData = that.menulist;
          sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
        })
        .catch((err) => console.log(err));
    },
    //点击弹出登录弹窗
    login() {
      localStorage.setItem("loginfou", 1);
      this.diaoyong();
    },
    //点击弹出注册弹窗
    restigc() {
      localStorage.setItem("loginfou", 2);
      this.diaoyong();
    },
    diaoyong() {
      this.denglv = localStorage.getItem("loginfou");
    },
    // skip() {
    // 	// this.isTrue = 1
    // 	// this.$router.push('/aisle?date' + Date.now());
    // 	localStorage.setItem("istrue", this.isTrue);
    // },
    //头部菜单切换
    menu(index, id) {
      this.isTrue = index;
      if (index == 0) {
        this.$router.push({ name: "Hotel" });
      }
      if (index == 1) {
        this.$router.push({ name: "Rooms" });
      }
      if (index == 2) {
        this.$router.push({ name: "Meal" });
      }
      if (index == 3) {
        this.$router.push({ name: "Banquet" });
      }
      if (index == 4) {
        this.$router.push({ name: "Century" });
      }
      if (index == 5) {
        this.$router.push({ name: "Ambitus" });
      }
      this.reload();
      localStorage.setItem("istrue", this.isTrue);
    },
    //返回品牌页
    pinpai() {
      this.$router.push({ name: "Pinpai" });
    },
    //去集团官网
    jituan() {
      // window.open("https://www.empark.com.cn/");
      window.open("https://empark.com.cn/");
      // http://group.sc798.com/grouphotel/#/
    },
    //点击立即预定去房型列表页
    yuding() {
      this.$router.push({ name: "RoomsList" });
    },
    //点击关闭登录注册弹窗
    guanbi() {
      localStorage.setItem("loginfou", 0);
      // console.log(this.denglv)
      this.diaoyong();
      this.forgrtshow = false;
    },
    btns1() {
      this.denglv = 1;
      localStorage.setItem("loginfou", 1);
      this.diaoyong();
    },
    btns2() {
      this.denglv = 2;
      localStorage.setItem("loginfou", 2);
      this.diaoyong();
    },
    // 注册获取验证码
    getcode(index) {
      // console.log(this.registerNumber)
      if (index == 1) {
        var that = this;
        that.$axios
          .post(
            `${this.Baseurl}sendCode?web_token=${that.token}&type=${index}&tel=${that.registerNumber}`
          )
          .then(function (res) {
            // console.log(res)
            // console.log("type类型:"+index)
            // console.log(res.data.code)
            if (res.data.code == "0") {
              that.tishi(res.data.msg);
            } else {
              that.tishi("已发送验证码，请注意查收");
            }
          })
          .catch((err) => console.log(err));
      }
      if (index == 2) {
        var that = this;
        that.$axios
          .post(
            `${this.Baseurl}sendCode?web_token=${that.token}&type=${index}&tel=${that.signNumber}`
          )
          .then(function (res) {
            console.log(res);
            // console.log("type类型:"+index)
            // console.log(res.data.code)
            if (res.data.code == "0") {
              that.tishi(res.data.msg);
            } else {
              that.tishi("已发送验证码，请注意查收");
            }
          })
          .catch((err) => console.log(err));
      }
      if (index == 3) {
        var that = this;
        that.$axios
          .post(
            `${this.Baseurl}sendCode?web_token=${that.token}&type=${index}&tel=${that.forgetnumber}`
          )
          .then(function (res) {
            // console.log(res)
            // console.log("type类型:"+index)
            // console.log(res.data.code)
            if (res.data.code == "0") {
              that.tishi(res.data.msg);
            } else {
              that.tishi("已发送验证码，请注意查收");
            }
          })
          .catch((err) => console.log(err));
      }
    },
    //提示
    tishi(text) {
      this.tipshow = true;
      this.tipstext = text;
      setTimeout(() => {
        this.tipshow = false;
        this.tipstext = "";
      }, 3000);
    },
    //注册账号
    zhuce() {
      var re1 =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!re1.test(this.registerNumber)) {
        ///^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/
        this.tishi("请输入正确电话号码");
        return;
      }
      if (this.registerCode == "") {
        this.tishi("请填写验证码");
        return;
      }
      // console.log(this.registerCode)
      var that = this;
      that.$axios
        .post(
          `${this.Baseurl}register_user?web_token=${that.token}&tel=${that.registerNumber}&code=${that.registerCode}&pc_mobile=1&hotel_code=${that.hotelcode}`
        )
        .then(function (res) {
          console.log(res);
          // console.log(res.data.code)
          if (res.data.status == "0") {
            that.tishi(res.data.msg);
            // that.tishi(res.data.msg)
            this.denglv = 0;
            // this.forgrtshow = true
            this.diaoyong();
          } else {
            that.tishi(res.data.msg);
          }
          // Registrationcode
        })
        .catch((err) => console.log(err));
    },
    //登录账号
    denglu() {
      // console.log(this.signNumber)
      // console.log(this.signPassword)
      if (this.signNumber == "") {
        this.tishi("手机号不能为空");
        return;
      }
      if (this.signPassword == "") {
        this.tishi("验证码不能为空");
        return;
      }
      var that = this;
      that.$axios
        .post(
          `${this.Baseurl}login_user?web_token=${that.token}&tel=${that.signNumber}&code=${that.signPassword}&hotel_code=${that.hotelcode}`
        )
        .then(function (res) {
          console.log(res);
          // sessionStorage.clear("accountNumber");
          if (res.data.status == "0") {
            that.tishi(res.data.msg);
            sessionStorage.setItem("accountNumber", that.signNumber);
            sessionStorage.setItem("loginfou", 1);
          } else {
            that.tishi(res.data.msg);
            sessionStorage.setItem("loginfou", 2);
          }
          setTimeout(() => {
            localStorage.setItem("loginfou", 0);
            that.diaoyong();
            that.reload();
          }, 1000);
        })
        .catch((err) => console.log(err));
    },
    //退出账号
    exitaccount() {
      sessionStorage.setItem("accountNumber", "");
      sessionStorage.setItem("loginfou", 2);
      this.reload();
    },
    //忘记密码
    forg() {
      // console.log("点击忘记密码")
      // this.denglv=0
      localStorage.setItem("loginfou", 0);
      this.diaoyong();
      this.forgrtshow = true;
    },
    forget() {
      // console.log(this.forgetnumber)
      // console.log(this.forgetcode)
      // console.log(this.forgetmima)
      // console.log(this.forgetmima2)
      var re1 =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!re1.test(this.forgetnumber)) {
        this.tishi("请输入正确电话号码");
        return;
      }
      if (this.forgetcode == "") {
        this.tishi("请填写验证码");
        return;
      }
      if (this.forgetmima != this.forgetmima2) {
        this.tishi("两次密码不一致");
        return;
      }
      var that = this;
      that.$axios
        .post(
          `${this.Baseurl}reset_pwd?web_token=${that.token}&tel=${that.forgetnumber}&code=${that.forgetcode}&pwd=${that.forgetmima}&pwd1=${that.forgetmima2}`
        )
        .then(function (res) {
          // console.log(res)
          this.tishi(res.data.msg);
          that.forgrtshow = false;
        })
        .catch((err) => console.log(err));
    },

  },
  mounted() {
    var that = this
    document.querySelector("#app").onclick = function () {
      that.fotshow = false
    }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  /* height: 140px; */
}

.header .header_head {
  /* width: 1400px; */
  margin: auto;
  /* display: flex; */
}

.header .header_head .header_logo {
  /* width: 76px;
        height: 73px; */
  width: 223px;
  height: 54px;
  margin-right: 50px;
  cursor: pointer;
}

.header .header_head .header_logo img {
  width: 100%;
  display: block;
}

.header .header_head .head_operation {
  width: 100%;
  /* margin-top: 13px; */
  /* margin-left: 60px; */
  /* display: flex; */
  /* padding: 0 ; */
  /* justify-content: space-between; */
  /* flex: 1; */
}

.headbg {
  background-color: #f3f3f3;
}

.head_top {
  display: flex;
}

.head_top p {
  display: block;
  font-size: 16px;
  color: #5f5f5f;
  cursor: pointer;
}

.hengyan {
  /* border: 1px solid #fff; */
  position: relative;
  margin-left: 20px;
}

.hengyan::before {
  position: absolute;
  content: "";
  width: 1px;
  height: 20px;
  background-color: #929292;
  left: -10px;
  top: 50%;
  margin-top: -10px;
  z-index: 1;
}

.hengyan::after {
  position: absolute;
  content: "";
  width: 1px;
  height: 20px;
  background-color: #929292;
  right: -10px;
  top: 50%;
  margin-top: -10px;
  z-index: 1;
}

/* .jituanguan{
        position: relative;
    } */

.header .header_head .head_operation .header_left {
  width: 1400px;
  margin: auto;
  display: flex;
  align-items: center;
  padding: 25px 0;
}

.header .header_head .head_operation .header_left .head_bot {
  display: flex;
  /* height: 49px; */
  align-items: center;
  /* margin-top: 30px; */
  box-sizing: border-box;
}

.header .header_head .head_operation .header_left .head_bot .head_list {
  font-size: 20px;
  /* line-height: 49px; */
  color: #000000;
  margin-right: 55px;
  cursor: pointer;
  font-weight: 500;
  box-sizing: border-box;
  /* border-bottom: 3px solid #fff; */
  position: relative;
}

.header .header_head .head_operation .header_left .head_bot .head_list::after {
  position: absolute;
  content: "";
  width: 40px;
  height: 3px;
  background-color: #206079;
  bottom: -10px;
  left: 50%;
  margin-left: -20px;
  z-index: 9;
  display: none;
  border-radius: 30px;
}

/* #header .header_head .head_operation .header_left .head_bot .head_list.active{
        color: #206079;
        border-bottom: 3px solid #206079;
    } */
/* 头部样式切换 */
#header .header_head .head_operation .header_left .head_bot .head_list.active::after {
  display: block;
}

.header .header_head .head_operation .header_left .head_bot .head_list:hover::after {
  display: block;
}

/* #header .header_head .head_operation .header_left .head_bot .head_list.active{
        color: #206079;
        border-bottom: 3px solid #206079;
    }
    .header .header_head .head_operation .header_left .head_bot .head_list:hover{
        color: #206079;
        border-bottom: 3px solid #206079;
    } */
/* .header .header_head .head_operation .header_left .head_bot  .head_list:nth-child(1){
        color: #206079;
        border-bottom: 3px solid #206079;
    } */
.header .header_head .head_operation .header_right {
  display: flex;
  /* background-color: #b8b8b8; */
  width: 1400px;
  margin: auto;
  height: 68px;
  align-items: center;
  /* justify-content: space-between; */
}

.header .header_head .head_operation .header_right .head_bot {
  width: 259px;
  height: 49px;
  border: 1px solid #a8916f;
  font-size: 18px;
  color: #775b3f;
  text-align: center;
  margin-top: 30px;
  box-sizing: border-box;
  line-height: 49px;
  cursor: pointer;
}

.header .header_head .head_operation .header_right .head_top {
  display: flex;
  align-items: center;
}

.head_top2 {
  margin-left: auto;
}

.header .header_head .head_operation .header_right .head_top .rig_item {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #5f5f5f;
}

#yunyan {
  font-size: 16px;
  color: #5f5f5f;
  border: none;
  outline: none;
  background-color: #f3f3f3;
  height: 24px;
  margin-left: 10px;
  /* line-height: 15px; */
  /* margin-left: 10px; */
}

.rig_item_left {
  display: flex;
  align-items: center;
  /* margin-left: 20px; */
}

.rig_img {
  width: 13px;
  height: 13px;
  /* margin: 0 10px; */
  margin-left: 10px;
  margin-right: 5px;
}

.rig_item_right {
  margin-left: 20px;
  position: relative;
  transform: translateY(1px);
  display: flex;
  align-items: center;
}

.rig_item_right .rig_tuichu {
  position: absolute;
  background-color: #b8b8b8;
  color: #fff;
  padding: 5px 10px;
  right: 0;
  top: 20px;
  cursor: pointer;
  display: none;
}

.rig_item_right:hover .rig_tuichu {
  display: block;
}

.header .header_head .head_operation .header_right .head_top .rig_item p {
  cursor: pointer;
  /* margin-left: 20px; */
}

.zhuce {
  /* margin-left: 15px; */
}

.header .header_head .head_operation .header_right .head_top .rig_item:first-child {
  /* border-right: 1px solid #999999; */
  padding-right: 23px;
}

.header .header_head .head_operation .header_right .head_top .rig_item:last-child {
  padding-left: 23px;
}

.header .header_head .head_operation .header_right .head_top .rig_item img {
  width: 13px;
  height: 13px;
  display: block;
  /* margin-right: 20px; */
}

.header .header_head .head_operation .header_right .head_top .rig_item span {
  margin: 0 5px;
}

.logins {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99;
  /* transform: scale(1.617708);
  transform-origin: left top 0px;
  height: 100%; */
}

.login {
  width: 800px;
  margin: auto;
  /* margin-top: 230px; */
  background-color: #fff;
  /* position: relative; */
  padding-bottom: 55px;

  position: absolute;
  padding-bottom: 55px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login_close {
  position: absolute;
  top: 16px;
  right: 17px;
  width: 14px;
  height: 14px;
  cursor: pointer;
}

.login_logo {
  /* width: 110px;
        margin: auto;
        padding-top: 25px;
        margin-bottom: 10px; */

  width: 250px;
  margin: auto;
  padding-top: 34px;
  margin-bottom: 28px;
}

.login_logo img {
  width: 100%;
  display: block;
}

.txt_title {
  display: flex;
  align-items: center;
}

.txt_title div {
  width: 400px;
  height: 80px;
  background-color: #f2f2f2;
  font-size: 24px;
  color: #9f9f9f;
  text-align: center;
  line-height: 80px;
  cursor: pointer;
}

.txt_title div.active {
  background-color: #d5b08b;
  color: #fff;
}

.fomes1 {
  width: 450px;
  margin: auto;
}

.fomes1 .fomes1list {
  margin-top: 36px;
  display: flex;
  align-items: center;
  position: relative;
}

.forget {
  top: calc(50% - 11px);
  position: absolute;
  right: -80px;
  font-size: 14px;
  cursor: pointer;
}

.txt_title .forgitmima {
  width: 100%;
  background-color: #d5b08b;
  color: #fff;
}

.forget:hover {
  color: #d5b08b;
}

.fomes1 .fomes1list span {
  width: 90px;
  font-size: 20px;
  color: #000000;
}

.fomes1 .fomes1list input {
  width: 360px;
  height: 60px;
  border: 1px solid #bababa;
  outline: none;
  padding: 0 20px;
  font-size: 18px;
  color: #989898;
  box-sizing: border-box;
}

.fomes1 .fomes1list .de {
  width: 360px;
  height: 60px;
  background-color: #d5b08b;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  cursor: pointer;
}

.fomes1 .fomes1list .inpyanma {
  width: 240px;
  height: 60px;
  border: 1px solid #bababa;
  outline: none;
  padding: 0 20px;
  font-size: 18px;
  color: #989898;
  box-sizing: border-box;
}

.fomes1 .fomes1list .yanma {
  width: 120px;
  height: 60px;
  background-color: #f2f2f2;
  font-size: 18px;
  line-height: 60px;
  color: #206079;
  text-align: center;
  cursor: pointer;
}

.fomes2 {
  width: 505px;
  margin: auto;
}

.fomes2 .fomes2list {
  margin-top: 35px;
  display: flex;
  align-items: center;
}

.fomes2 .fomes2list span {
  width: 140px;
  font-size: 20px;
  color: #000000;
}

.fomes2 .fomes2list .inp2list {
  width: 360px;
  height: 60px;
  border: 1px solid #bababa;
  outline: none;
  padding: 0 20px;
  font-size: 18px;
  color: #989898;
  box-sizing: border-box;
}

.fomes2 .fomes2list .inpyanma {
  width: 240px;
  height: 60px;
  border: 1px solid #bababa;
  outline: none;
  padding: 0 20px;
  font-size: 18px;
  color: #989898;
  box-sizing: border-box;
}

.fomes2 .fomes2list .yanma {
  width: 120px;
  height: 60px;
  background-color: #f2f2f2;
  font-size: 18px;
  line-height: 60px;
  color: #206079;
  text-align: center;
  cursor: pointer;
}

.fomes2 .fomes2list .zhu {
  width: 360px;
  height: 60px;
  background-color: #d5b08b;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  cursor: pointer;
}

.switch {
  min-width: 188px;
  height: 42px;
  box-sizing: border-box;
  border: 1px solid #c5c5c5;
  position: relative;
  /* margin-top: 42px; */
  margin-left: 30px;
}

.switch .switch_wen {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 16px 0 26px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}

.switch .switch_wen p {
  font-size: 16px;
  color: #5f5f5f;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

.switch .switch_wen img {
  width: 11px;
  height: 6px;
  margin-left: 10px;
}


.el-select-dropdown {
  position: absolute;
  z-index: 10;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  box-sizing: border-box;
  margin: 5px 0;
  top: 45px;
  left: 0;
  min-width: 250px;
}

.el-scrollbar {
  overflow: hidden;
  position: relative;
}

.el-select-dropdown__wrap {
  max-height: 300px;
  overflow: scroll;
  height: 100%;
  /* margin-bottom: -17px; */
  margin-right: -17px
}

.el-select-dropdown__list {
  list-style: none;
  padding: 6px 0;
  margin: 0;
  box-sizing: border-box;
}

.el-select-group__wrap:not(:last-of-type) {
  padding-bottom: 24px;
}

.el-select-group__wrap {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.el-select-group__title {
  padding-left: 20px;
  font-size: 16px;
  color: #909399;
  line-height: 30px;
}

.el-select-group {
  margin: 0;
  padding: 0;
}

.el-select-dropdown__item {
  font-size: 18px;
  padding: 0 20px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #606266;
  height: 35px;
  line-height: 35px;
  box-sizing: border-box;
  cursor: pointer;
  padding-left: 20px;
}

/* .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #f5f7fa;
    color:#d5b08b;
    background-color: #d5b08b;
    color:#fff;
} */
.el-select-dropdown__item.hover {
  background-color: #d5b08b;
  color: #fff;
}

.el-select-dropdown__item:hover {
  color: #316c83;
}

.el-select-group__wrap:not(:last-of-type):after {
  content: "";
  position: absolute;
  display: block;
  left: 20px;
  right: 20px;
  bottom: 12px;
  height: 1px;
  background: #e4e7ed;
}
</style>