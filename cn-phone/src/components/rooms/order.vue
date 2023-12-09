<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />
    <div class="conts">
      <!-- @click="timeclose()" -->
      <div class="order">
        <div class="orderdetail">
          <div class="order_left">
            <div class="blocks">
              <span class="spantit spanone">订房详情</span>
              <!-- <div class="shijian">
              </div> -->
              <div class="jieshao">
                <div class="blo2">
                  <div class="shijian">
                    <div class="blo2_left">
                      <p>入住时间：</p>
                      <p>{{ starttime.split("-")[0] }}年
                        {{ starttime.split("-")[1] }}月{{
                          starttime.split("-")[2]
                        }}日</p>
                      <p>{{ nowweek1 }} 14:00起</p>
                    </div>
                    <div class="blo2_left">
                      <p>退房时间：</p>
                      <p>{{ endtime.split("-")[0] }}年
                        {{ endtime.split("-")[1] }}月{{ endtime.split("-")[2] }}日</p>
                      <p>{{ nowweek2 }} 12:00前</p>
                    </div>
                  </div>
                  <div class="shijian2">{{ numwan }}晚</div>
                </div>
                <div class="apartment">
                  <p>{{ roomslist.title }}</p>
                  <!-- <p>1.8米水景大床房</p>
                  <p>1间</p>
                  <p>无早餐</p> -->
                </div>

                <div class="xuzhi" @click="getwin(1)">
                  <p v-html="xinxilist.description">

                  </p>
                  <div class="bidu">订房必读</div>
                </div>
              </div>
            </div>

            <!-- 预定信息 -->
            <div class="blocks">
              <span class="spantit">预定信息</span>
              <div class="blocklist yuding">
                <div class="reserve">
                  <!--日期  -->
                  <div class="house">
                    <p class="leftps">入住日期</p>
                    <div class="house_text" @click="getrilis()">
                      {{ starttime.split("-")[0] }}年
                      {{ starttime.split("-")[1] }}月{{
                        starttime.split("-")[2]
                      }}日({{ nowweek1 }})
                    </div>
                    <div id="calender" v-show="rilishow">
                      <div class="calender_close" @click="guan()">
                        <img src="../../assets/img/gunbi.png" alt="" />
                      </div>
                      <div class="daterangepicker">
                        <div class="drp_calendar left">
                          <div class="drp_calendar_top">
                            <div @click="prev" class="prev">
                              <img src="../../assets/img/jt.png" alt="" />
                            </div>
                            <div @click="next" class="next">
                              <img src="../../assets/img/jt.png" alt="" />
                            </div>
                            <span class="tishispan">选择入住时间 </span>
                            <span style=""> {{ year }}年{{ month }}月 </span>
                            <!-- <div @click="next" class="next"> 
                        <img src="../../assets/img/jt.png" alt=""> 
                      </div> -->
                          </div>
                          <div class="weekDay week">
                            <p v-for="item in weekList" :key="item.id">
                              {{ item }}
                            </p>
                          </div>
                          <div class="weekDay">
                            <!-- 这个是前面的空格 -->
                            <p class="kongge" v-for="item in spaceDay" :key="item.id"></p>
                            <p class="days" v-for="(item, idx) in monthDay[this.month - 1] ||
                              30" @click="setDay(idx)" :class="idx == activeDay ? 'active' : ''" :key="item.id">
                              {{ item }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="wancheng" @click="wancheng()">完成</div> -->
                    </div>

                  </div>
                  <div class="house">
                    <p class="leftps">退房日期</p>
                    <div class="house_text" @click="getrilis2()">{{ endtime.split("-")[0] }}年
                      {{ endtime.split("-")[1] }}月{{ endtime.split("-")[2] }}日 ({{ nowweek2 }})</div>
                    <div id="calender" v-show="rilishow2">
                      <div class="calender_close" @click="guan2()">
                        <img src="../../assets/img/gunbi.png" alt="" />
                      </div>
                      <div class="daterangepicker">
                        <div class="drp_calendar left">
                          <div class="drp_calendar_top">
                            <!-- ⬅️ ➡️️️️-->
                            <!-- <div @click="prev" class="prev"> 
                        <img src="../../assets/img/jt.png" alt=""> 
                      </div> -->
                            <span class="tishispan">选择退房时间 </span>
                            <span style=""> {{ year2 }}年{{ month2 }}月 </span>
                            <div @click="prev" class="prev">
                              <img src="../../assets/img/jt.png" alt="" />
                            </div>
                            <div @click="next" class="next">
                              <img src="../../assets/img/jt.png" alt="" />
                            </div>
                            <!-- <div @click="next" class="next">
                      <img src="../../assets/img/jt.png" alt="" />
                    </div> -->
                          </div>
                          <div class="weekDay">
                            <p class="disabled" v-for="item in weekList" :key="item.id">
                              {{ item }}
                            </p>
                          </div>
                          <div class="weekDay">
                            <!-- 这个是前面的空格 -->
                            <p v-for="item in spaceDay2" :key="item.id"></p>
                            <p v-for="(item, idx) in monthDay2[
                              this.month2 - 1
                            ] || 30" @click="setDay2(idx)" :class="idx == activeDay2 ? 'active' : ''" :key="item.id">
                              {{ item }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="wancheng" @click="wancheng()">完成</div> -->
                    </div>
                  </div>
                  <!-- 房间数下拉 -->
                  <div class="house">
                    <p class="leftps">房间数量</p>
                    <div class="peolist_right">
                      <div class="addsubtra jian active" @click.stop="jian(0)">-</div>
                      <div class="peolist_num">{{ roomIndex }}间</div>
                      <div class="addsubtra jia" @click.stop="jia(0)">+</div>
                    </div>
                    <!-- <div class="house_text" id="trigger1">1间</div> -->
                  </div>
                </div>
              </div>
            </div>
            <!-- 住客信息 -->
            <div class="blocks">
              <span class="spantit">住客信息</span>
              <div class="blocklist zhuke">
                <div class="rooms">
                  <div class="roomslist" v-if="roomIndex >= 1">
                    <p class="leftps">房间1(姓名)</p>
                    <input type="text" placeholder="每间房填一人姓名即可" v-model="names1" />
                  </div>
                  <div class="roomslist" v-if="roomIndex >= 2">
                    <p class="leftps">房间2(姓名)</p>
                    <input type="text" placeholder="每间房填一人姓名即可" v-model="names2" />
                  </div>
                  <div class="roomslist" v-if="roomIndex >= 3">
                    <p class="leftps">房间3(姓名)</p>
                    <input type="text" placeholder="每间房填一人姓名即可" v-model="names3" />
                  </div>
                  <div class="roomslist" v-if="roomIndex >= 4">
                    <p class="leftps">房间4(姓名)</p>
                    <input type="text" placeholder="每间房填一人姓名即可" v-model="names4" />
                  </div>
                  <!-- <div class="roomslist">
                      <p>房间2(姓名)</p>
                      <input type="text" placeholder="每间房填一人姓名即可">
                    </div> -->
                </div>
                <div class="dianhua">
                  <p class="leftps">电话号码</p>
                  <!-- 地区 -->
                  <div class="dianhua_cont">
                    <input type="text" placeholder="请填写预定人电话号码" class="phones" v-model="dianhua" />
                  </div>
                </div>
                <div class="dianhua">
                  <p class="leftps">身份证号</p>
                  <!-- 地区 -->
                  <div class="dianhua_cont">
                    <input type="text" placeholder="请填写预定人身份证号" class="phones" v-model="shenfenID" />
                  </div>
                </div>
                <div class="youxiang">
                  <p class="leftps">邮箱地址</p>
                  <input type="text" placeholder="输入后请核查一下，避免输入错误" class="phones" v-model="emalis" />
                </div>
              </div>
            </div>
            <div class="blocks">
              <span class="spantit">到店时间</span>
              <div class="blocklist daodian">
                <div class="daodian_text">
                  <p>客房14:00可办理入住</p>
                  <p>24小时前台-随时提供帮助！</p>
                  <p>预计到店时间（可选）</p>
                </div>
                <div class="time" id="time">请选择</div>
              </div>
            </div>
            <div class="blocks">
              <span class="spantit">发票信息</span>
              <div class="blocklist fapiao">
                <p>如需要发票，请在入住当天从酒店前台索取</p>
                <!-- <div class=""></div> -->
                <span class="spantits2">支付方式</span>
                <div class="zhifu">
                  <div class="zhifulist" v-if="roomslist.zffs != '1'">
                    <div class="zhifuicon" @click="payment(2)">
                      <img v-if="zhifu == 2" src="../../assets/img/xz.png" alt="" />
                      <img v-if="zhifu == 1" src="../../assets/img/wxz.png" alt="" />
                    </div>
                    <p>微信支付</p>
                  </div>
                  <div class="zhifulist" v-if="roomslist.zffs != '2'">
                    <div class="zhifuicon" @click="payment(1)">
                      <!-- <img :class="zhifu==1?'img2':'img1'" src="../../assets/img/xz.png" alt="" />
                        <img :class="zhifu==1?'img1':'img2'" src="../../assets/img/wxz.png" alt="" /> -->
                      <img v-if="zhifu == 1" src="../../assets/img/xz.png" alt="" />
                      <img v-if="zhifu == 2" src="../../assets/img/wxz.png" alt="" />
                    </div>
                    <p>酒店前台支付</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="blocks">
              <div class="blocklist dinggou">
                <div class="tiaokuan">
                  <img src="../../assets/img/xz.png" alt="" />
                  <p>同意</p>
                  <span @click="getwin(2)">使用条款</span>
                </div>
                <div class="quxiao" @click="getwin(3)">
                  <p>取消规则</p>
                </div>

                <!-- <div class="price_text">
                  <p>价格：</p>
                  <span>{{ jiage }}元</span>
                </div> -->

                <div class="jiage" v-for="(item, index) in pricetimelist" :key="index">
                  <p>{{ item.day }}</p>
                  <p>{{ item.salePrice }}元</p>
                </div>
                <div class="jiage">
                  <p>{{ endtime }}离店</p>
                </div>
                <div class="jiage">
                  <p>总计：{{ numwan }}晚{{ roomIndex }}间</p>
                  <p>{{ jiage }}元</p>
                </div>
                <div class="price_pay">
                  <div class="price_left"><span>{{ jiage }}</span>元</div>
                  <div class="price_right" @click="tijiao">去订购</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="windows1" v-show="wind1" @click="btshow(1)">
        <div class="wintext">
          <span>订房必读</span>
          <p v-html="xinxilist.description">
          </p>
        </div>
      </div>
      <div class="windows1" v-show="wind2" @click="btshow(2)">
        <div class="wintext">
          <span>使用条款</span>
          <p></p>

        </div>
      </div>
      <div class="windows1" v-show="wind3" @click="btshow(3)">
        <div class="wintext">
          <span>取消规则</span>
          <p v-html="xinxilist.description1">
          </p>
        </div>
      </div>
    </div>
    <div class="Tips_elastic" v-if="tipshow">
      <div class="Tips">
        <p>{{ tipstext }}</p>
      </div>
    </div>
    <div class="zhifuye" v-if="zhifushow">
      <div class="erweima">
        <div v-if="success == 0">
          <div class="erweima_title">请扫描下方二维码支付</div>
          <div id="qrcode" ref="qrcode"></div>
        </div>
        <div class="erweima_text" v-if="success == 1">
          <img src="../../assets/img/pay_over.png" alt="" />
          <div class="erweima_title">支付成功</div>
          <div>订单号：{{ hy_bill_no }}</div>
        </div>
        <div class="erweima_text" v-if="success == 2">
          <div class="erweima_title">订单已取消</div>
          <div>订单号：{{ hy_bill_no }}</div>
        </div>
        <div class="erweima_text" v-if="success == 3">
          <div class="erweima_title">订单已超时</div>
          <div>订单号：{{ hy_bill_no }}</div>
        </div>
        <div class="retunrnindex" @click="retunrnindex">取消</div>
      </div>
    </div>
    <!-- 公共底部 -->
    <Footer />
    <div class="zhanwei"></div>
  </div>
</template>

<script>
import Header from "../owned/header.vue";
import Footer from "../owned/footer.vue";
// import MobileSelect from "../../assets/js/mobileSelect";
import Rolldate from "../../assets/js/rolldate";
import QRCode from "qrcodejs2";
// import Swiper from "swiper";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      success: 0,
      zhifushow: false,
      tipshow: false,
      rilishow: false,
      rilishow2: false,
      year: "", // 年份
      month: "", // 月份
      day: "", // 天数
      current: "", // 当前时间
      weekList: ["一", "二", "三", "四", "五", "六", "日"],
      monthDay: [31, "", 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      activeDay: 40, // 选中的日期
      spaceDay: "", // 每个月第一天是星期几
      February: "", // 判断2月份的天数

      wwks1: "",
      wwks2: "",

      weekdate: "",
      weekdate2: "",

      year2: "", // 年份
      month2: "", // 月份
      day2: "", // 天数
      current2: "", // 当前时间
      weekList2: ["一", "二", "三", "四", "五", "六", "日"],
      monthDay2: [31, "", 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      activeDay2: 40, // 选中的日期
      spaceDay2: "", // 每个月第一天是星期几
      February2: "", // 判断2月份的天数year2: "",
      starttime: "",
      endtime: "",
      numwan: "", //住多少晚

      fangfei: "", //房价
      jiage: "", //价格

      token: "", //token
      hotel_id: "", //酒店id
      modularid: "", //模块id
      hotelcode: "", //酒店编码
      hours: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      hoursIndex: 0,
      minutes: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "45",
        "46",
        "47",
        "38",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
      ],
      minutesIndex: 0,
      timeshow: false,
      time: "", //传到后台的时间
      timehour: "", //选择展示的小时
      timeminute: "", //选择展示的分钟
      phoneshow: false,
      zhifu: 2, // 支付方式选择
      regions: [], //地区编号数组
      bianhao: "+86", //传到后台的区号
      roomlist: ["1", "2", "3", "4"], //房间数量列表
      roomIndex: 1, //传到后台的房间数量默认1
      roomshow: false,

      names1: "",
      names2: "",
      names3: "",
      names4: "",
      zhucename: "",
      dianhua: "",
      emalis: "",
      shenfenID: "",
      roomId: [], //房间id
      ratecodeCode: "", //价格编码
      priceIndex: "", //上一个页面传来的选择的第几种价格
      infolist: [], //
      roomslist: [],
      order_num: "",
      hy_bill_no: "",
      startDate: "",
      endDate: "",
      numDay: "",

      accountNumber: sessionStorage.getItem("accountNumber"), //登录账号
      nowday: "", //今天的时间
      nextday: "", //明天的时间
      looks: "",
      codesh: "",

      //星期
      nowweek1: "",
      nowweek2: "",

      wind1: false,
      wind2: false,
      wind3: false,


      xinxilist: '',
      prono: "",//公司Id
      ratecode: "",//房间编码
      pricetimelist: [],//房间每晚钱数
      xunhuan: ""
    };
  },
  created() {
    if (this.$route.query.prono) {
      this.prono = this.$route.query.prono
    }
    if (this.$route.query.ratecode) {
      this.ratecode = this.$route.query.ratecode
    }
    if (sessionStorage.getItem("orderTime")) {
      sessionStorage.clear("orderTime")
    }
    /// 储存第几个头部状态
    localStorage.setItem("istrue", 2);
    this.token = sessionStorage.getItem("token");
    this.hotel_id = sessionStorage.getItem("hotel_id");
    this.hotelcode = sessionStorage.getItem("hotelcode");
    if (sessionStorage.getItem("fieldData")) {
      var fieldData = JSON.parse(sessionStorage.getItem("fieldData"));
      console.log(fieldData);
      this.modularid = fieldData[1].id;
    }
    // console.log(this.Baseurl)
    this.looks = this.$route.query.looks;
    this.priceIndex = this.$route.query.priceIndex;
    this.roomId = this.$route.query.roomId;
    this.codesh = sessionStorage.getItem("codesh");


    this.startDate = this.$route.query.startDate;
    this.endDate = this.$route.query.endDate;

    this.numDay = this.$route.query.numDay;
    this.roomIndex = this.numDay;
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.numDay);
    //今天明天日期
    this.nowday = this.GetDateStr(0);
    this.nextday = this.GetDateStr(1);

    this.starttime = this.$route.query.startDate;
    this.endtime = this.$route.query.endDate;
    console.log(this.starttime);
    console.log(this.endtime);
    this.numwan = this.getDaysBetween(this.starttime, this.endtime);
    this.wwks1 = this.starttime.replace(/-/, "/").replace(/-/, "/");
    this.wwks2 = this.endtime.replace(/-/, "/").replace(/-/, "/");
    this.nowweek1 = "星期" + this.getweekday(this.wwks1);
    this.nowweek2 = "星期" + this.getweekday(this.wwks2);

    this.current = new Date();
    // console.log(this.current)
    var nowDate = this.current;
    //当前月1号
    //var nowMonth = nowDate.getFullYear() + "-" + (parseInt(nowDate.getMonth() + 1) < 10 ? "0" + parseInt(nowDate.getMonth() + 1):parseInt(nowDate.getMonth() + 1)) + "-01";
    //下月1号
    var afterMonth =
      nowDate.getFullYear() +
      "-" +
      (parseInt(nowDate.getMonth() + 2) < 10
        ? "0" + parseInt(nowDate.getMonth() + 2)
        : parseInt(nowDate.getMonth() + 2)) +
      "-01";
    // console.log(nowMonth)
    // console.log(afterMonth)
    // console.log(new Date(afterMonth))
    // this.current2 = new Date(afterMonth);
    this.current2 = new Date();
    this.getTheCurrentDate();
    this.getTheCurrentDate2();

    this.getMonthFisrtDay();
    this.getMonthFisrtDay2();

    // 调取当前年的2月天数 年份变则调用这两个
    this.February = this.isLeapYear(this.year) ? 29 : 28;
    this.monthDay.splice(1, 1, this.February);
    // this.getroomlist2();
    this.wenben()
    this.getdatalist();
    this.$nextTick(() => {
      this.shuju();
    });
  },
  inject: ["reload"],
  methods: {
    jian(index) {
      if (index == 0) {
        if (parseInt(this.roomIndex) > 1) {
          this.roomIndex--;
          this.getnums()
        }
      }
    },
    jia(index) {
      if (index == 0) {
        if (
          parseInt(this.roomIndex) < 4
        ) {
          this.roomIndex++;
          this.getnums()
        }
      }
    },
    shuju() {
      var lang = {
        title: "选择时间",
        cancel: "取消",
        confirm: "确认",
        year: "年",
        month: "月",
        day: "日",
        hour: "时",
        min: "分",
        sec: "秒",
      };
      new Rolldate({
        el: "#time",
        format: "hh:mm",
        // beginYear: 2000,
        // endYear: 2100,
        lang: lang,
        init: function () {
          console.log("插件开始触发");
        },
        moveEnd: function (scroll) {
          console.log(scroll);
          console.log("滚动结束");
        },
        confirm: function (date) {
          console.log(date);
          console.log("确定按钮触发");
          sessionStorage.setItem("orderTime", date)
        },
        cancel: function () {
          console.log("插件运行取消");
        },
      });
    },
    getweekday(date) {
      var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
      var week = weekArray[new Date(date).getDay()]; //注意此处必须是先new一个Date
      return week;
    },
    //打开弹窗
    getwin(index) {
      if (index == 1) {
        this.wind1 = true;
      }
      if (index == 2) {
        // this.wind2 = true;
        this.$router.push({ name: 'Details' })
      }
      if (index == 3) {
        this.wind3 = true;
      }
    },
    //关闭弹窗
    btshow(index) {
      if (index == 1) {
        this.wind1 = false;
      }
      if (index == 2) {
        this.wind2 = false;
      }
      if (index == 3) {
        this.wind3 = false;
      }
    },
    wenben() {
      //?web_token=${that.token}&hotel_id=1
      var that = this;
      that.$axios
        .get(
          `${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`
        )
        .then(function (res) {
          console.log(res);
          that.xinxilist = res.data.data.top_module_list[1]; //住宿的
          console.log(that.xinxilist);
        })
        .catch((err) => console.log(err));
    },
    retunrnindex() {
      this.$router.push({ name: "orderlist" });//取消去列表页
      this.reload()
      if (this.xunhuan) {
        clearTimeout(this.xunhuan);
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
    // 支付
    payment(num) {
      this.zhifu = num;
    },
    //房间数量的选择
    getroom() {
      this.roomshow = !this.roomshow;
    },
    getnums() {
      var that = this;
      that.fangfei = that.sumElementAtIndex(that.pricetimelist, "price")
      console.log(that.fangfei);
      console.log(that.roomslist);
      that.jiage =
        parseInt(that.roomIndex) *
        // parseInt(that.numwan) *
        parseInt(that.fangfei);
    },
    getdatalist() {
      var that = this;
      // console.log(that.looks)
      that.$axios
        .post(
          `${this.Baseurl}home_room_data?web_token=${that.token}&hotel_id=${that.hotel_id}&hotel_code=${that.hotelcode}&channelCode=${that.codesh}
                &id=${that.roomId}&startDate=${that.starttime}&endDate=${that.endtime}&numDay=${that.numDay}
                &looks=${that.looks}&tel=${that.accountNumber}&prono=${that.prono}&ratecode=${that.ratecode}`
        )
        .then(function (res) {
          console.log(res);
          console.log(res.data.data.News_info);

          that.infolist = res.data.data.News_info;
          that.roomslist = res.data.data.News_info;
          if (that.roomslist.zffs == '1') {
            that.zhifu = 1
          }
          if (that.roomslist.zffs == '2') {
            that.zhifu = 2
          }
          console.log(that.roomslist);
          that.pricetimelist = that.roomslist.pricec
          that.fangfei = that.sumElementAtIndex(that.pricetimelist, "salePrice")
          that.ratecodeCode = res.data.data.ratecode;
          if (that.pricetimelist.length == 0) {
            that.tishi("当前所选日期暂无此房型,请更换日期或房型");
          }
          that.jiage =
            parseInt(that.roomIndex) *
            // parseInt(that.numwan) *
            parseInt(that.fangfei);
        })
        .catch((err) => console.log(err));
    },
    sumElementAtIndex(arrays, index) {
      let sum = 0;
      for (let i = 0; i < arrays.length; i++) {
        sum += arrays[i][index];
      }
      return sum;
    },

    //提交订单
    tijiao() {
      // var num = this.roomIndex
      // this.zhucename =
      if (this.roomIndex == 1) {
        this.zhucename = this.names1;
      }
      if (this.roomIndex == 2) {
        this.zhucename = this.names1 + "," + this.names2;
      }
      if (this.roomIndex == 3) {
        this.zhucename = this.names1 + "," + this.names2 + "," + this.names3;
      }
      if (this.roomIndex == 4) {
        this.zhucename =
          this.names1 +
          "," +
          this.names2 +
          "," +
          this.names3 +
          "," +
          this.names4;
      }
      // console.log(this.zhucename);
      // console.log("电话" + this.dianhua);
      // console.log("邮箱" + this.emalis);
      // &p_id=${that.roomslist.id}&r_id=${that.roomslist.looks}

      var that = this;
      if (sessionStorage.getItem("orderTime") || sessionStorage.getItem("orderTime") != null && sessionStorage.getItem("orderTime") != '') {
        that.time = sessionStorage.getItem("orderTime")
      } else {
        that.time = ''
      }
      // console.log(that.looks)
      // console.log(that.roomslist.looks)
      console.log(that.ratecodeCode);
      //&r_id=${that.roomslist.looks}
      if (that.time == '') {
        that.time = "00:00"
      }
      that.$axios
        .post(
          `${this.Baseurl}order_submit?web_token=${that.token}&hotel_id=${that.hotel_id}&hotel_code=${that.hotelcode}
          &tel=${that.accountNumber}&phone=${that.dianhua}&email=${that.emalis}
          &p_id=${that.roomslist.id}
          &ratecodeCode=${that.ratecodeCode}&roomTypeCode=${that.roomslist.looks}
          &people_list=${that.zhucename}&room_num=${that.roomIndex}&money=${that.jiage}&pay_type=${that.zhifu}
        &start_time=${that.starttime}&end_time=${that.endtime}&arrive_time=${that.time}&sfz=${that.shenfenID}`
        )
        .then(function (res) {
          console.log(res);
          that.tishi(res.data.msg);
          if ((res.data.status == '000000')) {
            if (res.data.pay_type == '1') {
              that.tishi("酒店前台预定成功");
              setTimeout(() => {
                that.$router.push({ name: "orderlist" });//取消去列表页
              }, 2000)
            } else {
              that.order_num = res.data.order_num;
              that.hy_bill_no = res.data.hy_bill_no;
              that.zhifushow = true;
              var tuop_url = unescape(res.data.code_url)
              console.log(tuop_url)
              that.$nextTick(() => {
                that.showQrcode(tuop_url);
              });
              that.xunhuan = setInterval(() => {
                that.dingdan();
                // console.log(that.success);
                if (that.success == 1 || that.success == null) {
                  clearTimeout(that.xunhuan);
                }
              }, 2000);
              setTimeout(() => {
                if (that.success == 0) {
                  clearTimeout(that.xunhuan);
                  that.success == 3;
                }
              }, 300000);
            }

          }
          // if (res.data.code == 0) {
          //   // tishi
          //   that.tishi(res.data.msg);
          // } else {

          // }
        })
        .catch((err) => console.log(err));
    },
    showQrcode(text) {
      document.getElementById("qrcode").innerHTML = "";
      var qrcode = new QRCode("qrcode", {
        // 第一个参数是组件的id值
        text: text, // 生成二维码的文本
        width: 300,
        height: 300,
        colorDark: "#000000", // 二维码色
        colorLight: "#ffffff", // 二维码背景色
        correctLevel: QRCode.CorrectLevel.H, // 容错等级
      });
    },
    dingdan() {
      // order_num: "F62723314735812495"
      // order_num_third: "2206271748005904720000100546"
      // url: "https://pay.heepay.com/Cashier/WeixinRedirect.aspx?stid=H2206277367199AV_2db013a6483d55756b3add6caa65f3d6"
      console.log(this.token);
      var that = this;
      that.$axios
        // .post(
        //   `${this.Baseurl}order_request?web_token=${that.token}
        //   &order_num=${that.order_num}
        //   &hy_bill_no=${that.hy_bill_no}`
        // )
        .post(
          `${this.Baseurl}order_request?web_token=${that.token}&hotel_id=${that.hotel_id}
          &order_num=${that.order_num}
          &order_num_third=${that.hy_bill_no}`
        )
        .then(function (res) {
          // console.log(res);
          if (res.data.status == "000000") {
            that.success = res.data.type;
          } else {
            that.tishi("订单查询失败请重新下单");
          }
        })
        .catch((err) => console.log(err));
    },

    GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期
      var d = dd.getDate();
      return y + "-" + m + "-" + d;
    },
    getrilis() {
      // console.log("kai")
      // console.log(this.rilishow)
      this.rilishow = true;
    },
    getrilis2() {
      // console.log("kai")
      // console.log(this.rilishow)
      this.rilishow2 = true;
      this.rilishow = false;
      this.peopleshow = false;
      this.roomshow = false;
      this.houseshow = false;
    },
    guan() {
      // console.log("guan")
      // console.log(this.rilishow)
      this.rilishow = false;
    },
    guan2() {
      // console.log("guan")
      // console.log(this.rilishow)
      this.rilishow2 = false;
    },
    // 判断是否是闰年
    isLeapYear(year) {
      // console.log(year)
      return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    },
    // 判断是否是闰年2
    isLeapYear2(year2) {
      // console.log(year)
      return (year2 % 4 == 0 && year2 % 100 != 0) || year2 % 400 == 0;
    },
    // 选取特定天数
    setDay(idx) {
      this.day = idx + 1;
      var kaishiTime = this.year + "-" + this.month + "-" + this.day;
      // console.log("起始日期中的点击的天数"+kaishiTime)
      // console.log("起始日期中的结束时间"+this.wwks2)
      var jieshuTime = this.wwks2.replace(/\//g, "-");
      // console.log("起始日期中的结束"+jieshuTime)

      if (new Date(kaishiTime.replace(/-/g, "/")) >= new Date(this.nowday.replace(/-/g, "/"))) {
        this.wwks1 =
          this.year +
          "/" +
          this.month +
          "/" +
          this.day;
        this.nowweek1 = "星期" + this.getweekday(this.wwks1),
          this.starttime = this.year + "-" + this.month + "-" + this.day;
        this.activeDay = idx;
        localStorage.setItem("wwks1", this.wwks1);
        localStorage.setItem("starttime", this.starttime);
        localStorage.setItem("activeDay", this.idx);
        this.rilishow = false;
        if (new Date(kaishiTime.replace(/-/g, "/")) >= new Date(jieshuTime.replace(/-/g, "/"))) {
          var aa = new Date(kaishiTime.replace(/-/g, "/"))
          var bb = aa.setDate(aa.getDate() + 1)
          var cc = this.timestampToTime(bb)
          this.wwks2 = cc.replace(/-/g, '/')
          this.nowweek2 = "星期" + this.getweekday(this.wwks2)
          this.endtime = cc;
          localStorage.setItem("wwks2", this.wwks2);
          localStorage.setItem("endtime", this.endtime);
          this.numwan = this.getDaysBetween(kaishiTime, this.endtime)
        } else {
          this.numwan = this.getDaysBetween(kaishiTime, jieshuTime)
        }
      } else {
        alert("请选择大于等于今天的日期");
      }
      console.log("起始日期中的选中的天数" + this.starttime);
      // this.reload()
      //this.getDaysBetween(this.starttime, d2)
      this.getdatalist()
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      // var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var M = (date.getMonth() + 1) + '-';
      var D = date.getDate();
      // var h = date.getHours() + ':';
      // var m = date.getMinutes() + ':';
      // var s = date.getSeconds();
      return Y + M + D;
    },
    // 选取特定天数2
    setDay2(idx) {
      // this.activeDay2 = idx;
      this.day2 = idx + 1;

      var kaishiunTime = this.year2 + "-" + this.month2 + "-" + this.day2;

      var jieshuunTime = this.wwks1.replace(/\//g, "-");

      if (new Date(kaishiunTime.replace(/-/g, "/")) > new Date(jieshuunTime.replace(/-/g, "/"))) {
        this.wwks2 =
          this.year2 +
          "/" +
          this.month2 +
          "/" +
          this.day2;
        this.nowweek2 = "星期" + this.getweekday(this.wwks2)
        this.activeDay2 = idx;
        this.endtime = this.year2 + "-" + this.month2 + "-" + this.day2;
        localStorage.setItem("wwks2", this.wwks2);
        localStorage.setItem("endtime", this.endtime);
        localStorage.setItem("activeDay2", this.idx);
        this.rilishow2 = false;
        this.numwan = this.getDaysBetween(jieshuunTime, kaishiunTime)
      } else {
        alert("结束日期需大于起始日期");
      }
      // console.log(this.wwks2);
      this.getdatalist()
    },
    // 判断月份的第一天是星期几
    getMonthFisrtDay() {
      var firstDayOfCurrentMonth = new Date(this.year, this.month - 1, 1); // 某年某月的第一天
      if (firstDayOfCurrentMonth.getDay() == 0) {
        this.spaceDay = 6;
      } else {
        this.spaceDay = firstDayOfCurrentMonth.getDay() - 1;
      }
    },
    // 判断月份的第一天是星期几2
    getMonthFisrtDay2() {
      var firstDayOfCurrentMonth = new Date(this.year2, this.month2 - 1, 1); // 某年某月的第一天
      if (firstDayOfCurrentMonth.getDay() == 0) {
        this.spaceDay2 = 6;
      } else {
        this.spaceDay2 = firstDayOfCurrentMonth.getDay() - 1;
      }
    },
    // 获取当前的日期
    getTheCurrentDate() {
      this.year = this.current.getFullYear();
      this.month = this.current.getMonth() + 1;
      this.day = this.current.getDate();
    },
    //this.current2
    // 获取当前的日期2
    getTheCurrentDate2() {
      this.year2 = this.current2.getFullYear();
      this.month2 = this.current2.getMonth() + 1;
      this.day2 = this.current2.getDate();
    },
    prev() {
      if (this.month == 1) {
        this.year--;
        this.month = 12;
        this.February = this.isLeapYear(this.year) ? 29 : 28;
        this.monthDay.splice(1, 1, this.February);
      } else {
        this.month--;
      }
      this.activeDay = 40;
      // console.log(this.year);
      this.getMonthFisrtDay();

      if (this.month2 == 1) {
        this.year2--;
        this.month2 = 12;
        this.February2 = this.isLeapYear2(this.year2) ? 29 : 28;
        this.monthDay2.splice(1, 1, this.February2);
      } else {
        this.month2--;
      }
      this.activeDay2 = 40;
      // console.log(this.year2);
      this.getMonthFisrtDay2();
    },
    next() {
      if (this.month == 12) {
        this.year++;
        this.month = 1;
        this.February = this.isLeapYear(this.year) ? 29 : 28;
        this.monthDay.splice(1, 1, this.February);
      } else {
        this.month++;
      }
      this.activeDay = 40;
      this.getMonthFisrtDay();

      if (this.month2 == 12) {
        this.year2++;
        this.month2 = 1;
        this.February2 = this.isLeapYear2(this.year2) ? 29 : 28;
        this.monthDay2.splice(1, 1, this.February2);
      } else {
        this.month2++;
      }
      this.activeDay2 = 40;
      this.getMonthFisrtDay2();
    },
    getDaysBetween(startDate, enDate) {
      const sDate = Date.parse(startDate);
      const eDate = Date.parse(enDate);
      if (sDate > eDate) {
        return 0;
      }
      if (sDate === eDate) {
        return 1;
      }
      const daysa = (eDate - sDate) / (1 * 24 * 60 * 60 * 1000);
      const days = Math.floor(daysa)
      return days;
    },
  },
  mounted() {

  },
};
</script>
<style scoped>
.order {
  background-color: #efefed;
}

.orderdetail {
  /* padding-bottom: 15px; */
}

.orderdetail .order_left {
  width: 100%;
}

.orderdetail .order_left .blocks {
  background-color: #fff;
  margin-bottom: 4vw;
  box-sizing: border-box;
  width: 100%;
  padding-bottom: 4.667vw;
}

.orderdetail .order_left .blocks:last-child {
  margin-bottom: 0;
}

.orderdetail .order_left .blocks .spantit {
  width: 100%;
  display: block;
  height: 12.267vw;
  line-height: 12.267vw;
  font-size: 5vw;
  color: #000000;
  font-weight: 400;
  border-bottom: 0.133vw solid #d5d5d3;
  padding: 0 5.333vw;
  box-sizing: border-box;
}

.orderdetail .order_left .blocks .spanone {
  border: none;
  background-color: #efefed;
}

/* 5.333vw */
.blocklist {
  width: 100%;
  margin: auto;
  padding: 0 5.333vw;
  box-sizing: border-box;
}

.leftps {
  font-size: 4vw;
  color: #000000;
  font-weight: 400;
  width: 23.2vw;
}

/*   padding: 0 5.333vw; */
.xuzhi {
  padding: 0 5.333vw;
  border-top: 0.133vw solid #d5d5d3;
  margin-top: 4vw;
  padding-top: 4vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.xuzhi p {
  width: 70vw;
  font-size: 4vw;
  color: #000000;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.xuzhi .bidu {
  font-size: 4vw;
  color: #206079;
}

/* 到店时间 */
.daodian_text {
  margin-top: 15px;
}

.daodian_text p {
  font-size: 4vw;
  color: #000000;
  line-height: 7vw;
}

/* 发票信息 支付方式 */
.fapiao>p {
  /* line-height: 30px; */
  margin-top: 4vw;
  margin-bottom: 7vw;
  font-size: 4vw;
  color: #000000;
}

.fapiao>.spantits2 {
  /* margin-top: 4vw; */
  /* margin-bottom: 20px; */
  font-size: 4.5vw;
  font-weight: 500;
  color: #000000;
}

.fapiao .zhifu {
  margin-top: 5.333vw;
  display: flex;
  align-items: center;
}

.fapiao .zhifu .zhifulist {
  display: flex;
  align-items: center;
  margin-right: 7.333vw;
}

.fapiao .zhifu .zhifulist .zhifuicon {
  width: 4vw;
  height: 4vw;
  /* cursor: pointer; */
}

.fapiao .zhifu .zhifulist .zhifuicon img {
  width: 100%;
  display: block;
}

.fapiao .zhifu .zhifulist p {
  font-size: 4vw;
  color: #000000;
  margin-left: 3.333vw;
}

/* 使用条款 去订购 */
.dinggou {
  padding-top: 4vw;
  position: relative;
}

.tiaokuan {
  display: flex;
  align-items: center;
}

.tiaokuan img {
  width: 4vw;
  height: 4vw;
  /* cursor: pointer; */
}

.tiaokuan>p {
  font-size: 4vw;
  color: #000000;
  margin-left: 3.333vw;
  height: 6.5vw;
}

.tiaokuan>span {
  font-size: 4vw;
  color: #206079;
  display: inline-block;
  box-sizing: border-box;
  height: 6.5vw;
  border-bottom: 0.1333vw solid #206079;
  /* cursor: pointer; */
}

.quxiao {
  position: absolute;
  top: 1vw;
  right: 5.333vw;
  z-index: 1;
  border-bottom: 0.1333vw solid #206079;
}

.quxiao p {
  font-size: 3.5vw;
  color: #206079;
  text-align: justify;
}

/* .price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
} */
.price_text {
  display: flex;
  align-items: center;
  margin-top: 4vw;
  margin-left: 7vw;
}

.price_text p {
  font-size: 4vw;
  color: #000000;

}

.price_text span {
  font-size: 4vw;
  color: #000000;
  font-weight: 400;
}

.jiage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 4vw;
  color: #000000;
  margin-left: 7vw;
  margin: 1vw 0;
}

.price_pay {
  position: fixed;
  width: 100%;
  height: 17.333vw;
  left: 0;
  bottom: 0;
  z-index: 3;
  background-color: #d5b08b;
  font-size: 4vw;
  color: #fff;
  text-align: center;
  line-height: 60px;
  /* cursor: pointer; */
  box-shadow: 0 -1vw 20px #dac0a7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5.333vw;
  box-sizing: border-box;
}

.price_pay .price_left {
  font-size: 4vw;
}

.price_pay .price_left span {
  font-size: 7vw;
  font-family: Arial;
}

.price_pay .price_right {
  width: 46.667vw;
  height: 13.333vw;
  line-height: 13.333vw;
  background-color: #fff;
  text-align: center;
  color: #206079;
  font-size: 5.5vw;
  border-radius: 10vw;
}

.jieshao {
  /* padding: 0 20px; */
  padding-top: 4vw;
}

.apartment {
  display: flex;
  width: 89.333vw;
  margin: auto;
  margin-top: 2vw;
}

.apartment p {
  font-size: 4vw;
  color: #000000;
  padding: 0 2.667vw;
  /* border-right: 0.133vw solid #9b9b9b; */
  position: relative;
}

.apartment p::before {
  position: absolute;
  content: "";
  width: 0.267vw;
  height: 3vw;
  left: 0;
  top: 50%;
  margin-top: -1.5vw;
  z-index: 1;
  background-color: #9b9b9b;
}

.apartment p:first-child {
  padding-left: 0;
}

.apartment p:first-child::before {
  display: none;
}

/* .jieshao .spnas {
  font-size: 18px;
  color: #000000;
  font-weight: 400;
  margin-bottom: 10px;
  display: block;
}
.jieshao p {
  font-size: 18px;
  color: #000000;
} */
.blo1 {
  margin-top: 20px;
}

.jieshao .blo2 {
  width: 89.333vw;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.jieshao .blo2 .shijian2 {
  font-size: 4vw;
  color: #000000;
}

.jieshao .blo2 .shijian {
  /* margin-top: 20px; */
  /* display: flex;
  justify-content: space-between; */
  position: relative;
  width: 80vw;
}

.jieshao .shijian::after {
  position: absolute;
  content: "";
  width: 0.133vw;
  height: 12.133vw;
  top: 50%;
  margin-top: -6.066vw;
  right: 0;
  background-color: #9b9b9b;
}

.jieshao .shijian .blo2_left {
  width: 125px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  height: 8vw;
  /* background: pink; */
}

.jieshao .shijian .blo2_left p {
  font-size: 4vw;
}

/* .jieshao .shijian2 {
} */

/* 时间选择器 */
.time {
  width: 100%;
  height: 8vw;
  border-bottom: 0.133vw solid rgb(118, 118, 118);
  position: relative;
  display: flex;
  align-items: center;
  /* cursor: pointer; */
  font-size: 4vw;
  margin-top: 2vw;
}

.time.active::after {
  transform: rotate(90deg);
}

.time::after {
  position: absolute;
  content: "";
  width: 9px;
  height: 17px;
  bottom: 3px;
  right: 10px;
  transform: rotate(-90deg);
  background-image: url("../../assets/img/jt.png");
  background-repeat: no-repeat;
  background-size: 100%;
}

/* 预定信息 房间数量 */
.yuding .house {
  display: flex;
  align-items: center;
  height: 8vw;
  margin-top: 4.667vw;
  position: relative;
}

.yuding .house>p {
  font-size: 4vw;
  color: #000000;
  font-weight: 400;
  width: 23.2vw;
}

.yuding .house .house_text {
  width: 66.4vw;
  height: 100%;
  border-bottom: 0.133vw solid rgb(118, 118, 118);
  position: relative;
  display: flex;
  align-items: center;
  /* cursor: pointer; */
  font-size: 4vw;
  font-weight: 500;
}

/* 住客 */
/* .rooms{
  
} */
.peolist_right {
  font-size: 4vw;
  display: flex;
  align-content: center;
}

.peolist_num {
  width: 10vw;
  text-align: center;
  font-size: 4vw;
}

.addsubtra {
  width: 5vw;
  height: 5vw;
  border: 0.133vw solid #c4c4c4;
  border-radius: 50%;
  font-size: 5.5vw;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  /* cursor: pointer; */
}

.jian {
  /* transform: scaleY(-1.333vw); */
  line-height: 5vw;
}

.jia {
  line-height: 5vw;
}

.addsubtra.active {
  color: #c4c4c4;
}

.roomslist {
  display: flex;
  align-items: center;
  height: 8vw;
  margin-top: 4.667vw;
}

.roomslist>input {
  width: 66.4vw;
  border: none;
  border-bottom: 0.133vw solid #868686;
  font-size: 4vw;
  color: #5f5f5f;
  box-sizing: border-box;
  height: 100%;
  outline: none;
}

/* 邮箱 */
.youxiang {
  display: flex;
  align-items: center;
  height: 8vw;
  margin-top: 4.667vw;
}

.youxiang>input {
  width: 66.4vw;
  border: none;
  border-bottom: 0.133vw solid #868686;
  font-size: 4vw;
  color: #5f5f5f;
  box-sizing: border-box;
  height: 100%;
  outline: none;
}

/* 电话前缀+86 */
.dianhua {
  display: flex;
  align-items: center;
  height: 8vw;
  margin-top: 4.667vw;
}

.dianhua_cont {
  display: flex;
  border-bottom: 0.133vw solid #868686;
}

.dianhua_cont .phones {
  width: 66.4vw;
  border: none;
  font-size: 4vw;
  color: #5f5f5f;
  /* padding: 0 5vw; */
  box-sizing: border-box;
  height: 100%;
  outline: none;
}

.phone_group {
  width: 23.067vw;
  position: relative;
  height: 100%;
  box-sizing: border-box;
}

.phone_group .region {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  /* cursor: pointer; */
  font-size: 4vw;
}

.phone_group .region span {
  color: #000000;
  font-weight: 400;
  font-size: 4vw;
}

.phone_group_jt {
  width: 1.867vw;
  height: 3.467vw;
  display: block;
  transform: rotate(-90deg);
}

.phone_group_jt.active {
  transform: rotate(90deg);
}

.phone_group .dropul {
  height: 0;
  overflow: hidden;
  width: 250px;
  position: absolute;
  z-index: 9;
  top: 32px;
  left: 0;
  overflow-y: scroll;
  background-color: white;
  border: 1px solid #fff;
  transition: all 0.5s;
}

.phone_group .dropul.active {
  height: 360px;
  /* border: 1px solid lightgray;  */
  box-shadow: 0 8px 20px 0 rgb(0 41 99 / 20%);
}

.phone_group .dropul .dropul_li {
  color: #6b6a6a;
  font-size: 16px;
  line-height: 30px;
  font-weight: 300;
  /* cursor: pointer; */
  padding-left: 10px;
}

.phone_group .dropul .dropul_li:hover {
  background: #d5b08b;
  color: #fff;
}

.phone_group .dropul .dropul_li.active {
  background: #d5b08b;
  color: #fff;
}

.phone_group .dropul .dropul_span {
  float: right;
  font-size: 16px;
  font-weight: 300;
  padding-right: 10px;
}

.zhanwei {
  width: 100%;
  height: 17.333vw;
}


.zhifuye {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.erweima {
  background-color: #fff;
  width: 80vw;
  padding: 5vw;
  /* height: 500px; */
}

.erweima_title {
  color: #6b6a6a;
  font-size: 5vw;
  text-align: center;
}

#qrcode {
  width: 80vw;
  margin: auto;
  margin-top: 5vw;
}

#qrcode img {
  margin: auto;
}

.erweima_text {
  margin: auto;
  text-align: center;
  font-size: 3.5vw;
  color: #6b6a6a;
}

.erweima_text img {
  margin: auto;
}

.retunrnindex {
  font-size: 3.5vw;
  color: #6b6a6a;
  margin: auto;
  text-align: center;
  border: 1px solid #6b6a6a;
  width: 18vw;
  height: 10vw;
  line-height: 10vw;
  border-radius: 2vw;
  cursor: pointer;
  margin-top: 5vw;
}

.windows1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
}

.windows1 .wintext {
  width: 80vw;
  margin: auto;
  background-color: #fff;
  box-sizing: border-box;
  padding: 5vw;
}

.windows1 .wintext span {
  font-size: 5vw;
  color: #000;
}

.windows1 .wintext p {
  font-size: 3.8vw;
  line-height: 6vw;
  margin-top: 4vw;
}

#calender {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 0.533vw 2.667vw 0 rgb(0, 0, 0, 0.07);
  box-shadow: 0 0.533vw 2.667vw 1vw rgb(0, 0, 0, 0.1);
  /* box-shadow: 0 0.533vw 2.667vw 1vw rgb(19 19 19 / 7%); */
  background: #fff;
  left: 0;
  top: 13.333vw;
  padding: 0 6.667vw;
  border-radius: 2.133vw;
  z-index: 9;
}

#calender .calender_close {
  width: 3.4vw;
  height: 3.4vw;
  margin: 1.867vw 1.867vw 2.4vw;
  margin-left: 100%;
}

#calender .calender_close img {
  width: 100%;
  display: block;
}

.daterangepicker {
  display: flex;
  justify-content: space-between;
  /* width: 46.667vw; */
}

.tishispan {
  position: absolute;
  width: 100%;
  text-align: center;
  color: #000 !important;
  font-size: 4vw !important;
  top: -4vw;
}

#calender .daterangepicker .drp_calendar {
  width: 76vw;
  /* width: 46.667vw; */
  margin-top: 1.333vw;
  min-height: 50vw;
}

#calender .daterangepicker .drp_calendar.right {
  margin-left: 6.667vw;
}

.drp_calendar .drp_calendar_top {
  position: relative;
  text-align: center;
  width: 100%;
}

.drp_calendar .drp_calendar_top span {
  display: block;
  margin: auto;
  color: #707070;
  line-height: 6vw;
  font-size: 3vw;
}

.drp_calendar .drp_calendar_top .prev {
  /* transform: rotate(180deg); */
  width: 2.3vw;
  height: 5.2vw;
  position: absolute;
  left: 0;
  top: 0;
}

.drp_calendar .drp_calendar_top .next {
  transform: rotate(180deg);
  width: 2.3vw;
  height: 5.2vw;
  position: absolute;
  right: 0;
  top: 0;
}

.drp_calendar .drp_calendar_top .prev img,
.drp_calendar .drp_calendar_top .next img {
  width: 100%;
  height: 100%;
}

.wancheng {
  margin: 4vw auto;
  width: 14.533vw;
  height: 6.667vw;
  line-height: 6.667vw;
  font-size: 4vw;
  text-align: center;
  color: #000000;
  border-radius: 4vw;
  font-weight: 400;
  border: 0.133vw solid #000000;
  /* cursor: pointer; */
}

.wancheng:hover {
  background: #000000;
  color: #fff;
}

.weekDay {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.weekDay p {
  text-align: center;
  position: relative;
  background: transparent;
  color: #000000;
  font-size: 3.2vw;
  font-weight: 500;
  width: 10vw;
  height: 10vw;
  line-height: 10vw;
  text-align: center;
  border-radius: 0.533vw;
  border: 0.133vw solid transparent;
  white-space: nowrap;
  /* cursor: pointer; */
}

.weekDay .days:hover {
  background-color: #eee;
  border-color: transparent;
  color: #fff;
}

.weekDay p.active {
  background-color: #d5b08b;
  color: #fff;
  border-radius: 50%;
}

.weekDay p.disabled {
  color: #999;
  /* cursor: not-allowed; */
}

.weekDay.week p {
  color: #999;
  /* cursor: not-allowed; */
}
</style>
