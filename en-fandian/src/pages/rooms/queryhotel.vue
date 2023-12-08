<template>
  <div class="query_hotel">
    <div class="main">
      <div class="riqi">
        <div class="hotel_riqi">
          <!-- 目的地 -->
          <div class="blocks">
            <p class="blotext">Destination：</p>
            <div class="contbox mudi" @click="getomudi()">
              <p>{{ mudiIndex }}</p>
              <img loading="lazy" src="../../assets/img/botxia.png" alt="" />
            </div>
            <!-- v-show="mudishow" :class="mudishow ? 'active' : ''" -->
            <div class="roomnums " v-show="mudishow" :class="mudishow ? 'active' : ''">
              <ul>
                <!-- <li
                  v-for="(list, index) in mudilist"
                  :key="index"
                  @click.stop="getmudi(list)"
                  :class="mudiIndex == list ? 'cur' : ''"
                >
                  {{ list }}
                </li> -->
                <!-- city -->
                <!-- @click.stop="getmudi(list)"
                  :class="mudiIndex == list ? 'cur' : ''" -->
                <!-- 这个方法 第一个展示城市列表，第二个展示切换城市 第三个对应城市酒店列表 -->
                <li v-for="(list, index) in city" :key="index" @mouseover="getcitylist(index)"
                  :class="index == mudiIndexnum1 ? 'cur' : ''">
                  {{ index }}
                  <!-- v-show="cityshow" -->
                </li>
                <div class="mudidiv" v-show="cityshow" @mouseleave="getcitylist2()">
                  <p v-for="(listMsg, indexMsg) in city_centry" :key="indexMsg"
                    :class="mudiIndexnum1 == listMsg.city && indexMsg == mudiIndexnum2 ? 'active' : ''"
                    @click="changejiu(listMsg, indexMsg)">{{ listMsg.hotel_name }}</p>
                </div>
              </ul>

            </div>
          </div>
          <!-- 时间 -->
          <div class="blocks">
            <p class="blotext">C/I Date：</p>
            <div class="contbox checkin" @click="getrilis()">
              <p>{{ wwks1 }}</p>
              <img loading="lazy" class="rilimg" src="../../assets/img/rili.png" alt="" />
            </div>
            <div id="calender" v-show="rilishow">
              <div class="calender_close" @click="guan()">
                <img loading="lazy" src="../../assets/img/gunbi.png" alt="" />
              </div>
              <div class="daterangepicker">
                <div class="drp_calendar left">
                  <div class="drp_calendar_top">
                    <div @click="prev" class="prev">
                      <img loading="lazy" src="../../assets/img/jt.png" alt="" />
                    </div>
                    <div @click="next" class="next">
                      <img loading="lazy" src="../../assets/img/jt.png" alt="" />
                    </div>
                    <span class="tishispan">Select check-in time </span>
                    <span style=""> {{ year }}年{{ month }}month </span>
                  </div>
                  <div class="weekDay week">
                    <p v-for="item in weekList" :key="item.id">{{ item }}</p>
                  </div>
                  <div class="weekDay">
                    <p class="kongge" v-for="item in spaceDay" :key="item.id"></p>
                    <p class="days" v-for="(item, idx) in monthDay[this.month - 1] || 30" @click="setDay(idx)"
                      :class="idx == activeDay ? 'active' : ''" :key="item.id">
                      {{ item }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div id="calender" v-show="rilishow2">
              <div class="calender_close" @click="guan2()">
                <img loading="lazy" src="../../assets/img/gunbi.png" alt="" />
              </div>
              <div class="daterangepicker">
                <div class="drp_calendar left">
                  <div class="drp_calendar_top">
                    <span class="tishispan">Select check-out time </span>
                    <span style=""> {{ year2 }}year{{ month2 }}month </span>
                    <div @click="prev" class="prev">
                      <img loading="lazy" src="../../assets/img/jt.png" alt="" />
                    </div>
                    <div @click="next" class="next">
                      <img loading="lazy" src="../../assets/img/jt.png" alt="" />
                    </div>
                  </div>
                  <div class="weekDay">
                    <p class="disabled" v-for="item in weekList" :key="item.id">
                      {{ item }}
                    </p>
                  </div>
                  <div class="weekDay">
                    <!-- 这个是前面的空格 -->
                    <p v-for="item in spaceDay2" :key="item.id"></p>
                    <p v-for="(item, idx) in monthDay2[this.month2 - 1] || 30" @click="setDay2(idx)"
                      :class="idx == activeDay2 ? 'active' : ''" :key="item.id">
                      {{ item }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- <div class="wancheng" @click="wancheng()">完成</div> -->
            </div>
          </div>
          <div class="blocks">
            <p class="blotext"></p>
            <div class="contbox jiwan">
              <p>{{ numwan }}<span v-if="numwan > 1">Nights</span><span v-else>Night</span></p>
            </div>
          </div>
          <div class="blocks">
            <p class="blotext">C/O Date：</p>
            <div class="contbox checkin" @click="getrilis2()">
              <p>{{ wwks2 }}</p>
              <img loading="lazy" class="rilimg" src="../../assets/img/rili.png" alt="" />
            </div>
          </div>
          <!-- 房间数 -->
          <div class="blocks">
            <p class="blotext">Rooms：</p>
            <div class="contbox romsnum" @click="getroom()">
              <p>{{ roomIndex }} <span v-if="roomIndex > 1">Rooms</span><span v-else>Room</span></p>
              <img loading="lazy" src="../../assets/img/botxia.png" alt=""
                :style="roomshow ? 'transform: rotate(180deg)' : ''" />
            </div>
            <div class="roomnums" v-show="roomshow" :class="roomshow ? 'active' : ''">
              <ul>
                <li v-for="(list, index) in roomlist" :key="index" @click.stop="getnums(list)"
                  :class="roomIndex == list ? 'cur' : ''">
                  {{ list }}
                </li>
              </ul>
            </div>
          </div>
          <!-- 人数 -->
          <div class="blocks" @click="people()">
            <p class="blotext">Number of people：</p>
            <div class="contbox peoplenum">
              <p>{{ daren }}<span v-if="daren > 1">Adults</span><span v-else>Adult</span>,{{ xiaohai }}<span
                  v-if="xiaohai > 1">Childrens</span><span v-else>Children</span></p>
              <img loading="lazy" src="../../assets/img/botxia.png" alt="" />
            </div>
            <div class="persons" v-if="peopleshow">
              <!--  -->
              <!-- <div @click="prev" class="person s_prev">
                <img loading="lazy"src="../../assets/img/jt.png" alt="" />
              </div> -->
              <div class="peolcont">
                <div class="peolcontlist">
                  <div class="peolist_left">Maximum 3 pax in one room</div>
                  <!-- <div class="peolist_right">
                    <div class="addsubtra jian active" @click.stop="jian(0)">-</div>
                    <div class="peolist_num">{{daren}}</div>
                    <div class="addsubtra jia"  @click.stop="jia(0)">+</div>
                  </div> -->
                </div>
                <div class="peolcontlist">
                  <div class="peolist_left">Adult</div>
                  <div class="peolist_right">
                    <div class="addsubtra jian active" @click.stop="jian(0)">
                      -
                    </div>
                    <div class="peolist_num">{{ daren }}</div>
                    <div class="addsubtra jia" @click.stop="jia(0)">+</div>
                  </div>
                </div>
                <div class="peolcontlist">
                  <div class="peolist_left">Children</div>
                  <div class="peolist_right">
                    <div class="addsubtra jian" @click.stop="jian(1)">-</div>
                    <div class="peolist_num">{{ xiaohai }}</div>
                    <div class="addsubtra jia" @click.stop="jia(1)">+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 房屋偏好 -->
          <div class="blocks">
            <p class="blotext">Rates：</p>
            <div class="contbox housegood" @click="getoianhao()">
              <p>{{ compIndex }}</p>
              <img loading="lazy" src="../../assets/img/botxia.png" alt="" />
            </div>
            <div class="roomnums" v-show="houseshow" :class="houseshow ? 'active' : ''">
              <ul>
                <li v-for="(list, index) in cpmlist" :key="index" @click.stop="getcomp(list)"
                  :class="compIndex == list ? 'cur' : ''">
                  {{ list }}
                </li>
              </ul>
            </div>
          </div>
          <!-- 公司ID -->
          <div class="blocks">
            <p class="blotext">Corporate ID：</p>
            <div class="contbox companyid">
              <input type="text" v-model="compid" />
              <!-- <p>1间</p> -->
              <!-- <img loading="lazy"src="../../assets/img/botxia.png" alt="" /> -->
            </div>
          </div>
          <!-- 查询-->
          <div class="blocks">
            <p class="blotext"></p>
            <div class="contbox lookup">
              <div class="lookuplist" @click="tolist()">
                <svg class="icon" width="18px" height="18px" viewBox="0 0 1028 1024" version="1.1"
                  href="https://www.w3.org/2000/svg">
                  <path fill="#ffffff"
                    d="M1007.548064 899.256487L801.043871 692.754294c-3.577986-3.577986-8.032969-5.329979-12.194952-8.032969C908.82345 515.091988 893.926508 279.233909 742.042101 127.349503c-169.701337-169.775337-444.918262-169.775337-614.692598 0-169.775337 169.701337-169.775337 444.845262 0 614.692598 153.5634 153.5644 392.635466 166.708349 562.701801 42.498834 2.701989 3.869985 4.380983 8.104968 7.73997 11.536955L904.296468 1002.582084c28.624888 28.551888 74.773708 28.551888 103.252596 0 28.477889-28.623888 28.477889-74.846708 0-103.324597zM655.074441 654.927442c-121.653525 121.654525-318.884754 121.654525-440.611279 0-121.653525-121.652525-121.653525-318.956754 0-440.610279s318.884754-121.653525 440.611279 0c121.726525 121.726525 121.726525 318.957754 0 440.611279z" />
                </svg>
                <p>Search</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Header from "@/components/layout/header.vue"
// import Footer from "@/components/layout/footer.vue"
export default {
  // components: {
  //     Header,
  //     Footer
  // },
  data() {
    return {
      rilishow: false,
      rilishow2: false,
      token: '',
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
      numwan: '',

      roomlist: ["1", "2", "3", "4"], //房间数量列表
      roomIndex: 1, //默认一间
      roomshow: false,

      houseshow: false, //房间偏好弹窗
      compid: "", //公司id
      cpmlist: [
        "All",
        "最优门市价含单早",
        "最优门市价无早",
        "会员价格",
        "最优门市价含双早",
        "协议价格",
      ],
      compIndex: "全部",
      mudishow: false,
      mudiid: '',
      mudilist: [
        "北京",
        "上海",
        "深圳",
        "杭州",
      ],
      mudiIndex: '北京',
      peopleshow: false, //人数列表
      daren: 1,
      xiaohai: 0,
      yesdazhu: "", //能住几个大人
      // yesxizhu:'',//能住几个小孩
      // daxiao:"",//大人小孩
      nowday: "", //今天的时间
      nextday: "", //明天的时间
      city: [],//城市
      city_centry: [],//所选城市里面的所有酒店
      cityshow: false,
      mudiIndexnum1: '0',//城市
      mudiIndexnum2: '0',//城市里面的第几个
      mudisaaa: '0',
      hotelist: [],
      showName: 'bjeg'
    };
  },

  created() {
    this.token = sessionStorage.getItem("token");
    console.log('我是token', this.token);
    if (this.$route.query.prono) {
      this.compid = this.$route.query.prono
    }

    //mudiIndex
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
    if (localStorage.getItem("compIndex") && localStorage.getItem("compIndex") != "") {
      this.compIndex = localStorage.getItem("compIndex")
    }
    if (
      localStorage.getItem("activeDay") &&
      localStorage.getItem("activeDay") != ""
    ) {
      //activeDay2
      this.activeDay = localStorage.getItem("activeDay");
    } else {
    }
    if (
      localStorage.getItem("activeDay2") &&
      localStorage.getItem("activeDay2") != ""
    ) {
      //activeDay2
      this.activeDay2 = localStorage.getItem("activeDay2");
    }
    //今天明天日期
    this.nowday = this.GetDateStr(0);
    this.nextday = this.GetDateStr(1);
    if (localStorage.getItem("wwks1") != null && localStorage.getItem("wwks1") != '' && localStorage.getItem("wwks2") != null && localStorage.getItem("wwks2") != '') {
      var shijianQi = localStorage.getItem("wwks1").replace(/\//g, "-")
      // console.log("时间起"+shijianQi)
      if (new Date(shijianQi.replace(/-/g, "/")) >= new Date(this.nowday.replace(/-/g, "/"))) {
        this.wwks1 = localStorage.getItem("wwks1");
        this.wwks2 = localStorage.getItem("wwks2");
        // console.log("今天星期几！"+new Date().getDay())
        this.numwan = this.getDaysBetween(this.wwks1.replace(/-/g, "/"), this.wwks2.replace(/-/g, "/"))
      } else {
        var ddsc = new Date().getDay();
        if (ddsc == 7) {
          this.wwks1 =
            this.nowday.replace(/-/g, "/");
          this.wwks2 =
            this.nextday.replace(/-/g, "/");
        } else {
          this.wwks1 =
            this.nowday.replace(/-/g, "/");
          this.wwks2 =
            this.nextday.replace(/-/g, "/");
        }
        localStorage.setItem("wwks1", this.wwks1)
        localStorage.setItem("wwks2", this.wwks2)
        this.numwan = this.getDaysBetween(this.wwks1.replace(/-/g, "/"), this.wwks2.replace(/-/g, "/"))
      }
    } else {
      // console.log('没有起始时间')
      // console.log(localStorage.getItem("wwks1"))
      var ddsc = new Date().getDay();
      if (ddsc == 7) {
        this.wwks1 =
          this.nowday.replace(/-/g, "/");
        this.wwks2 =
          this.nextday.replace(/-/g, "/");
      } else {
        this.wwks1 =
          this.nowday.replace(/-/g, "/");
        this.wwks2 =
          this.nextday.replace(/-/g, "/");
      }
      localStorage.setItem("wwks1", this.wwks1)
      localStorage.setItem("wwks2", this.wwks2)
      this.numwan = this.getDaysBetween(this.wwks1.replace(/-/g, "/"), this.wwks2.replace(/-/g, "/"))
    }
    this.starttime = localStorage.getItem("wwks1").replace("/", "-").replace("/", "-");
    this.endtime = localStorage.getItem("wwks2").replace("/", "-").replace("/", "-");

    //roomIndex
    if (
      localStorage.getItem("roomIndex") &&
      localStorage.getItem("roomIndex") != null
    ) {
      this.roomIndex = localStorage.getItem("roomIndex");
    }
    if (
      localStorage.getItem("daren") &&
      localStorage.getItem("daren") != null
    ) {
      this.daren = localStorage.getItem("daren");
    }
    // console.log(this.daren);
    // console.log(localStorage.getItem("daren"));
    if (
      localStorage.getItem("xiaohai") &&
      localStorage.getItem("xiaohai") != null
    ) {
      this.xiaohai = localStorage.getItem("xiaohai");
    }

    this.getTheCurrentDate();
    this.getTheCurrentDate2();

    this.getMonthFisrtDay();
    this.getMonthFisrtDay2();

    // 调取当前年的2月天数 年份变则调用这两个
    this.February = this.isLeapYear(this.year) ? 29 : 28;
    this.monthDay.splice(1, 1, this.February);
    this.getdiqulist()
  },

  watch: {
    month() {
      if (this.month > 12 || this.month < 1) {
        console.log("请输入正确月份");
        return;
      }
      this.getMonthFisrtDay();
      // this.getMonthFisrtDay2();
    },
    year() {
      this.getMonthFisrtDay();
    },
    month2() {
      if (this.month2 > 12 || this.month2 < 1) {
        console.log("请输入正确月份");
        return;
      }
      this.getMonthFisrtDay2();
      // this.getMonthFisrtDay2();
    },
    year2() {
      this.getMonthFisrtDay2();
    },
  },
  inject: ["reload"],
  methods: {
    // getdiqulist(){
    //   // hotel_new
    //   var that =this
    //   that.$axios
    //   // &module_id=3
    //   .get(`${this.Baseurl}hotel_new?web_token=${that.token}`) 
    //   .then(function(res) {
    //       that.city = res.data.data
    //       console.log(that.city)
    //       //city_centry

    //       if(localStorage.getItem("mudiIndex")&&localStorage.getItem("mudiIndex")!=""){
    //         that.mudiIndex = localStorage.getItem("mudiIndex")
    //         that.mudiIndexnum1 = localStorage.getItem("mudiIndexnum1");
    //         that.mudiIndexnum2 = localStorage.getItem("mudiIndexnum2");
    //         console.log(that.mudiIndexnum1 )
    //         console.log(that.mudiIndexnum2 )
    //         that.city_centry  = that.city[that.mudiIndexnum1]
    //       }else{
    //         that.city_centry =  that.city["北京"]
    //       }
    //   }).catch(err => console.log(err));
    // },
    getdiqulist() {
      var that = this;
      that.$axios
        .get(`${this.Baseurl}hotel_new?web_token=${that.token}`)
        .then(function (res) {
          //获取数组
          that.city = res.data.data;
          if (
            //先判断本地有没有选中的城市
            localStorage.getItem("mudiIndex") &&
            localStorage.getItem("mudiIndex") != ""
          ) {
            //如果有 
            that.mudiIndex = localStorage.getItem("mudiIndex");//城市
            that.mudiIndexnum1 = localStorage.getItem("mudiIndexnum1");//对应的城市
            that.mudiIndexnum2 = localStorage.getItem("mudiIndexnum2");//对应的城市酒店索引的第几个
            that.city_centry = that.city[that.mudiIndexnum1];
            console.log(that.city_centry);
            sessionStorage.setItem("hotel_id", that.city[that.mudiIndexnum1][that.mudiIndexnum2].id);//酒店id
            sessionStorage.setItem("hotelcode", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code);//酒店code获取token用的
            sessionStorage.setItem("codesh", that.city[that.mudiIndexnum1][that.mudiIndexnum2].code);//
            sessionStorage.setItem("hotelname", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name);//酒店名字
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
            sessionStorage.setItem("hotelcode", that.city["北京"][0].hotel_code);
            sessionStorage.setItem("codesh", that.city["北京"][0].code);
            sessionStorage.setItem("hotelname", that.city["北京"][0].hotel_name);
            sessionStorage.setItem("dituxinxi", JSON.stringify(that.city["北京"][0]))
          }
          console.log(sessionStorage.getItem('dituxinxi'));
          console.log(that.city_centry);
          console.log(sessionStorage.getItem('hotel_id'));
          console.log(sessionStorage.getItem('hotelcode'));
        })
        .catch((err) => console.log(err));
    },
    changejiu(listMsg, indexMsg) {
      console.log(listMsg, indexMsg)//listMsg酒店信息,indexMsg酒店里面的第几个
      this.showName = listMsg.hotel_img
      console.log(this.showName);//酒店二级域名
      console.log(indexMsg)
      if (listMsg.path && listMsg.path != "") {
        window.open(listMsg.path)
      } else {
        this.mudishow = false;
        this.cityshow = false;
        this.mudiIndex = listMsg.hotel_name;//改酒店名字
        this.mudiIndexnum1 = this.mudisaaa//改酒店城市
        this.mudiIndexnum2 = indexMsg//改酒店里面的第几个
        console.log('酒店城市', this.mudisaaa)
        localStorage.setItem("mudiIndex", this.mudiIndex);
        localStorage.setItem("mudiIndexnum1", this.mudisaaa);
        localStorage.setItem("mudiIndexnum2", indexMsg);
        // console.log( this.mudiIndexnum1)
        // console.log( this.mudiIndexnum2)
        var that = this
        //存第几个的id
        sessionStorage.setItem("hotel_id", that.city[that.mudiIndexnum1][that.mudiIndexnum2].id);
        console.log("酒店hotel_id:", sessionStorage.getItem("hotel_id"))
        //存酒店的code
        sessionStorage.setItem("hotelcode", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code);
        console.log("酒店hotelcode:", sessionStorage.getItem("hotelcode"))
        //存酒店房型
        sessionStorage.setItem("codesh", that.city[that.mudiIndexnum1][that.mudiIndexnum2].code);
        console.log("酒店codesh:", sessionStorage.getItem("codesh"))
        //酒店名字
        sessionStorage.setItem("hotelname", that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name);
        console.log("酒店hotelname:", sessionStorage.getItem("hotelname"))
        sessionStorage.setItem("dituxinxi", JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
      }
      console.log(sessionStorage.getItem('dituxinxi'));
    },

    //获取酒店id
    getlist() {
      //http://ssjydfd.sc798.com/hotel_list
      var that = this;
      that.$axios
        .get(`${this.Baseurl}hotel_list?web_token=${that.token}`)
        .then(function (res) {
          console.log(res);
          that.hotelist = res.data.data;
          if (
            sessionStorage.getItem("hotel_index_data") != null &&
            sessionStorage.getItem("hotel_index_data") != ""
          ) {
            for (let i = 0; i < that.hotelist.length; i++) {
              if (that.hotelist[i].id == sessionStorage.getItem("hotel_index_data")) {
                var index_data = parseInt(i);
              }
            }
            sessionStorage.setItem("hotel_id", that.hotelist[index_data].id);
            sessionStorage.setItem("hotelcode", that.hotelist[index_data].hotel_code);
            sessionStorage.setItem("codesh", that.hotelist[index_data].code);
            console.log(sessionStorage.getItem("codesh"));
            sessionStorage.setItem("hotelname", that.hotelist[index_data].hotel_name);
          } else {
            sessionStorage.setItem("hotel_id", that.hotelist[0].id);
            sessionStorage.setItem("hotelcode", that.hotelist[0].hotel_code);
            sessionStorage.setItem("codesh", that.hotelist[0].code);
            console.log(sessionStorage.getItem("codesh"));
            sessionStorage.setItem("hotelname", that.hotelist[0].hotel_name);
          }
        })
        .catch((err) => console.log(err));
    },

    getcitylist(index) {
      this.cityshow = true
      this.mudisaaa = index
      this.city_centry = this.city[this.mudisaaa]
    },
    getcitylist2() {
      this.cityshow = false
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
      this.rilishow2 = true;
      this.rilishow = false;
      this.peopleshow = false;
      this.roomshow = false;
      this.houseshow = false;
      this.mudishow = false;
    },
    guan() {
      this.rilishow = false;
    },
    guan2() {
      this.rilishow2 = false;
    },
    // wancheng() {
    //   this.rilishow = false;
    //   console.log(this.starttime);
    //   console.log(this.endtime);
    //   // this.weekdate
    //   // wwks1:"",
    //   // wwks2:'',
    //   console.log(this.wwks1);
    //   console.log(this.wwks2);
    // },
    //房间数量的选择
    getroom() {
      this.roomshow = !this.roomshow;
      this.rilishow = false;
      this.rilishow2 = false;
      this.peopleshow = false;
      this.houseshow = false;
      this.mudishow = false;
      this.mudishow = false;
    },
    getnums(list) {
      this.roomIndex = list;
      this.roomshow = false;
      //roomIndex
      localStorage.setItem("roomIndex", this.roomIndex);
      this.yesdazhu = parseInt(this.roomIndex) * 3;
      console.log(this.yesdazhu);
      if (parseInt(this.daren) < parseInt(this.roomIndex)) {
        this.daren = this.roomIndex;
      }
      localStorage.setItem("daren", this.daren);
    },
    getoianhao() {
      this.houseshow = !this.houseshow;
      this.mudishow = false;
      this.rilishow = false;
      this.rilishow2 = false;
      this.peopleshow = false;
      this.roomshow = false;
      this.mudishow = false;
    },
    getomudi() {
      this.houseshow = false;
      this.mudishow = !this.mudishow;
      this.rilishow = false;
      this.rilishow2 = false;
      this.peopleshow = false;
      this.roomshow = false;
    },
    getcomp(index) {
      this.compIndex = index;
      this.houseshow = false;
      localStorage.setItem("compIndex", this.compIndex);
    },
    // getmudi(index) {
    //   this.mudiIndex = index;
    //   this.mudishow = false;
    //   localStorage.setItem("mudiIndex", this.mudiIndex);
    // },
    people() {
      this.peopleshow = !this.peopleshow;
      this.rilishow = false;
      this.rilishow2 = false;
      this.roomshow = false;
      this.houseshow = false;
      // console.log(this.roomIndex)
      this.yesdazhu = parseInt(this.roomIndex) * 3;
      // console.log(this.yesdazhu)
      if (parseInt(this.daren) < parseInt(this.roomIndex)) {
        this.daren = this.roomIndex;
      }
    },
    // nodaren:'',//现在有几个大人
    // nohaizi:"",//现在有几个小孩
    jian(index) {
      if (index == 0) {
        // console.log(this.daren)
        // console.log(this.roomIndex)
        if (parseInt(this.daren) > parseInt(this.roomIndex)) {
          this.daren--;
          localStorage.setItem("daren", this.daren);
        }
      }
      if (index == 1) {
        if (parseInt(this.xiaohai) > 0) {
          this.xiaohai--;
          localStorage.setItem("xiaohai", this.xiaohai);
        }
      }
    },
    jia(index) {
      if (index == 0) {
        if (
          parseInt(this.daren) + parseInt(this.xiaohai) <
          parseInt(this.yesdazhu)
        ) {
          this.daren++;
          localStorage.setItem("daren", this.daren);
        }
      }
      if (index == 1) {
        if (
          parseInt(this.daren) + parseInt(this.xiaohai) <
          parseInt(this.yesdazhu)
        ) {
          this.xiaohai++;
          localStorage.setItem("xiaohai", this.xiaohai);
        }
      }
    },
    //查找酒店去酒店列表页
    tolist() {
      // console.log(this.starttime);
      // console.log(this.endtime);
      // console.log(this.roomIndex);
      // console.log(this.daren);
      localStorage.setItem('startDate', this.starttime)
      localStorage.setItem('endDate', this.endtime)
      localStorage.setItem('numDay', this.roomIndex)
      localStorage.setItem('prono', this.compid)
      this.$router.push({
        path: `/roomslist`,
        // query: {
        //   startDate: this.starttime,
        //   endDate: this.endtime,
        //   numDay: this.roomIndex,//默认一天
        //   prono: this.compid,
        // },
      });

      this.reload()
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
    // setDay(idx) {
    //   this.day = idx + 1;
    //   console.log(
    //     "选择的日期是" + this.year + " " + this.month + " " + this.day
    //   );
    //   var firstDayOfCurrentMonth = new Date(
    //     this.year,
    //     this.month - 1,
    //     this.day
    //   ); // 某年某月的第一天
    //   var weekdays = 0;
    //   if (firstDayOfCurrentMonth.getDay() == 0) {
    //     weekdays = 6;
    //   } else {
    //     weekdays = firstDayOfCurrentMonth.getDay() - 1;
    //   }
    //   console.log("选择的星期是：星期" + this.weekList[weekdays]);
    //   // new Date(this.year, this.month - 1, 1)

    //   this.starttime = this.year + "-" + this.month + "-" + this.day;
    //   console.log(this.starttime);
    //   //this.getDaysBetween(this.starttime, this.nowday)
    //   var aa =  this.year + "-" + this.month + "-" + this.day;
    //   console.log(new Date(this.starttime))

    //   if (new Date(this.starttime) >= new Date(this.nowday)) {
    //     this.wwks1 =
    //       this.year +
    //       "/" +
    //       this.month +
    //       "/" +
    //       this.day;
    //     this.starttime = this.year + "-" + this.month + "-" + this.day;
    //     this.activeDay = idx;
    //     localStorage.setItem("wwks1", this.wwks1);
    //     localStorage.setItem("starttime", this.starttime);
    //     localStorage.setItem("activeDay", this.idx);
    //     this.rilishow = false;
    //   } else {
    //     alert("请选择大于等于今天的日期");
    //   }

    //   console.log(this.starttime);

    //   // this.reload()
    //   //this.getDaysBetween(this.starttime, d2)
    // },
    // // 选取特定天数2
    // setDay2(idx) {
    //   // this.activeDay2 = idx;
    //   this.day2 = idx + 1;
    //   console.log(
    //     "选择的日期是" + this.year2 + " " + this.month2 + " " + this.day2
    //   );
    //   var firstDayOfCurrentMonth = new Date(
    //     this.year2,
    //     this.month2 - 1,
    //     this.day2
    //   ); // 某年某月的第一天
    //   var weekdays = 0;
    //   if (firstDayOfCurrentMonth.getDay() == 0) {
    //     weekdays = 6;
    //   } else {
    //     weekdays = firstDayOfCurrentMonth.getDay() - 1;
    //   }
    //   console.log("选择的星期是：星期" + this.weekList2[weekdays]);

    //   this.endtime = this.year2 + "-" + this.month2 + "-" + this.day2;
    //   console.log(this.starttime)
    //     console.log(this.endtime)
    //   this.starttime = localStorage.getItem("starttime");
    //   //new Date(this.endtime)>=new Date(this.starttime)
    //   if (new Date(this.endtime) >= new Date(this.starttime)) {
    //     this.wwks2 =

    //       this.year2 +
    //       "/" +
    //       this.month2 +
    //       "/" +
    //       this.day2;
    //     this.activeDay2 = idx;
    //     localStorage.setItem("wwks2", this.wwks2);
    //     localStorage.setItem("endtime", this.endtime);
    //     localStorage.setItem("activeDay2", this.idx);
    //     this.rilishow2 = false;
    //   } else {
    //     alert("结束日期需大于起始日期");
    //   }
    //   console.log(this.wwks2);
    // },
    setDay(idx) {
      this.day = idx + 1;
      var kaishiTime = this.year + "-" + this.month + "-" + this.day;
      // console.log("起始日期中的点击的天数"+kaishiTime)
      // console.log("起始日期中的结束时间"+this.wwks2)
      var jieshuTime = this.wwks2.replace(/\//g, "-");
      if (new Date(kaishiTime.replace(/-/g, "/")) >= new Date(this.nowday.replace(/-/g, "/"))) {
        this.wwks1 =
          this.year +
          "/" +
          this.month +
          "/" +
          this.day;
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
  mounted() { },
};
</script>
<style scoped>
.mudi p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}

.roomnums ul li {
  position: relative;
}

.mudidiv {
  position: absolute;
  left: 100%;
  top: 0;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 7%);
  /* margin-left: 10px; */
  width: 400px;
  min-height: 100%;
}

.mudidiv p {
  /* margin: 5px 0 !important; */
  padding: 0 20px !important;
  display: block;
  line-height: 30px;
  text-align: left;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  line-height: 35px;
  margin: auto;
  color: #000;
  font-size: 18px;
  cursor: pointer;
}

.mudidiv p:hover {
  /* background-color: #d5b08b !important;
  color: #fff; */
  background: #ead7c3;
}

.mudidiv p.active {
  background-color: #d5b08b !important;
  color: #fff;
}

ol,
ul,
li {
  list-style: none;
}

.query_hotel {
  width: 100%;
  background-color: #efefed;
  padding-bottom: 48px;
  padding-top: 1px;
}

.riqi {
  position: relative;
  width: 100%;
}

.riqi .title {
  font-size: 30px;
  color: #000000;
  font-weight: 400;
}

.hotel_riqi {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
}

.hotel_riqi .blocks {
  position: relative;
}

.hotel_riqi .blotext {
  font-size: 18px;
  color: #000000;
  margin-bottom: 10px;
  height: 30px;
  font-weight: 200;
}

.hotel_riqi .contbox {
  height: 50px;
  background-color: #fff;
  /* border: 1px solid #b0b0b0; */
  padding-left: 19px;
  padding-right: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
}

.hotel_riqi .contbox>p {
  font-size: 20px;
  color: #5f5f5f;
}

.hotel_riqi .contbox>img {
  width: 9px;
  height: 5px;
}

.mudi {
  width: 100px;
}

/* 日期 */
.hotel_riqi .contbox.checkin {
  width: 160px;
}

.hotel_riqi .contbox.checkin .rilimg {
  width: 16px;
  height: 17px;
  display: block;
}

/* 几晚 */
.hotel_riqi .contbox.jiwan {
  width: 50px;
  background: none;
  padding: 0;
  border: none;
  justify-content: center;
}

/* 房间数量 */
.hotel_riqi .contbox.romsnum {
  /* width: 110px; */
  width: 130px;
}

.roomnums {
  width: 100%;
  text-align: center;
  color: #333;
  line-height: 22px;
  position: absolute;
  top: 90px;
  left: 0;
  background: #fff;
  box-shadow: 0 4px 20px 0 rgb(0, 0, 0, 0.07);
  z-index: 9;
  /* border-radius: 15px;
  overflow: hidden; */
}

.roomnums.pianhao {
  width: 474px;
}

.hotel_riqi .contbox.housegood>p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}

.roomnums ul {
  display: block;
  width: 100%;
}

.roomnums ul li {
  line-height: 30px;
  text-align: left;
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  line-height: 35px;
  margin: auto;
  color: #000;
  font-size: 18px;
  cursor: pointer;
}

.roomnums ul li.cur {
  background: #d5b08b;
  color: #fff;
}

.roomnums ul li:hover {
  background: #ead7c3;
}

/* 人数 */
.hotel_riqi .contbox.peoplenum {
  /* width: 175px; */
  width: 220px;
}

.hotel_riqi .persons {
  /* 文字  */
  /* width: 250px; */
  width: 300px;
  position: absolute;
  /* height: 300px; */
  background: #fff;
  z-index: 10;
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 7%);
  left: 50%;
  margin-left: -125px;
  top: 100px;
  box-sizing: border-box;
  padding: 30px 20px;
  border-radius: 16px;
}

.hotel_riqi .persons .peolcont .peolcontlist {
  display: flex;
  align-items: center;
  margin: 15px 0;
  justify-content: space-between;
}

.hotel_riqi .persons .peolcont .peolcontlist .peolist_left {
  font-size: 20px;
}

.hotel_riqi .persons .peolcont .peolcontlist .peolist_right {
  font-size: 20px;
  display: flex;
  align-content: center;
}

.peolist_num {
  width: 30px;
  text-align: center;
  font-size: 20px;
}

.addsubtra {
  width: 25px;
  height: 25px;
  border: 1px solid #c4c4c4;
  border-radius: 50%;
  font-size: 30px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  cursor: pointer;
}

.jian {
  /* transform: scaleY(-10px); */
  line-height: 20px;
}

.jia {
  line-height: 25px;
}

.addsubtra.active {
  color: #c4c4c4;
}


/* 房屋偏好 */
.hotel_riqi .contbox.housegood {
  /* width: 170px; */
  /* width: 220px; */
  width: 185px;
}

/* 公司ID */
.hotel_riqi .contbox.companyid {
  width: 170px;
}

.hotel_riqi .contbox.companyid input {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
  background-color: #fff;
  outline: none;
  border: none;
  font-size: 20px;
  color: #5f5f5f;
}

/* 查询 */
.hotel_riqi .lookup {
  width: 75px;
  position: relative;
  background: none;
  margin-left: 10px;
  border: none;
}

.hotel_riqi .lookup p {
  color: #fff;
  font-size: 16px;


}

.hotel_riqi .lookuplist {
  position: absolute;
  left: 0;
  width: 75px;
  height: 75px;
  background: #d5b08b;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  top: -23px;
  /* transform: translateY(-24px); */

}

#calender {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 4px 20px 0 rgb(0, 0, 0, 0.07);
  background: #fff;
  left: 0;
  top: 100px;
  padding: 0 50px;
  border-radius: 16px;
  z-index: 9;
}

#calender .calender_close {
  width: 18px;
  height: 18px;
  margin: 14px 14px 18px;
  margin-left: 100%;
}

#calender .calender_close img {
  width: 100%;
  display: block;
}

.daterangepicker {
  display: flex;
  justify-content: space-between;
  /* width: 810px; */
  width: 350px;
}

.tishispan {
  position: absolute;
  width: 100%;
  text-align: center;
  color: #000 !important;
  font-size: 20px !important;
  top: -30px;
}

#calender .daterangepicker .drp_calendar {
  width: 340px;
  /* width: 350px; */
  margin-top: 10px;
  min-height: 360px;
}

#calender .daterangepicker .drp_calendar.right {
  margin-left: 50px;
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
  line-height: 16px;
  font-size: 16px;
}

.drp_calendar .drp_calendar_top .prev {
  /* transform: rotate(180deg); */
  width: 9px;
  height: 17px;
  position: absolute;
  left: 0;
  top: 0;
}

.drp_calendar .drp_calendar_top .next {
  transform: rotate(180deg);
  width: 9px;
  height: 17px;
  position: absolute;
  right: 0;
  top: 0;
}

.wancheng {
  margin: 30px auto;
  width: 109px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  color: #000000;
  border-radius: 30px;
  font-weight: 400;
  border: 1px solid #000000;
  cursor: pointer;
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
  font-size: 14px;
  font-weight: 500;
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid transparent;
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
