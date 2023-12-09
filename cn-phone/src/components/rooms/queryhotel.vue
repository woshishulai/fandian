<template>
  <div class="query_hotel">
    <div class="main">
      <div class="riqi">
        <div class="title">查找酒店</div>
        <div class="hotel_riqi">
          <!-- 目的地 -->
          <div class="blocks">
            <p class="blotext">目的地：</p>
            <div class="contbox mudi" @click="getomudi()">
              <p>{{ mudiIndex }}</p>
              <img src="../../assets/img/botxia.png" alt="" />
            </div>
            <!-- v-show="mudishow" :class="mudishow ? 'active' : ''" -->
            <div
              class="roomnums mudione"
              v-show="mudishow" :class="mudishow ? 'active' : ''" 
              
            >
              <ul>
                <!-- <li
                  v-for="(list, index) in mudilist"
                  :key="index"
                  @click.stop="getmudi(list)"
                  :class="mudiIndex == list ? 'cur' : ''"
                >
                  {{ list }}
                </li> -->
                <li  v-for="(list, index) in city"
                  :key="index" @click="getcitylist(index)"
                   :class="index==mudiIndexnum1&&index==mudisaaa ? 'cur' : ''"
                  > 
                    <div></div>
                    {{index}}
                  <!-- v-show="cityshow" -->
                </li>
              </ul>
              <div class="mudidiv">
                <p v-for="(listMsg,indexMsg) in city_centry" :key="indexMsg" 
                :class="mudiIndexnum1== listMsg.city&&indexMsg==mudiIndexnum2? 'active' : ''" 
                @click="changejiu(listMsg,indexMsg)">
                {{listMsg.hotel_name}}</p>
              </div>
            </div>
          </div>
          <!-- 时间 -->
          <div class="blocks">
            <p class="blotext">入住：</p>
            <div class="contbox checkin" @click="getrilis()">
              <p>{{ wwks1 }}</p>
              <img class="rilimg" src="../../assets/img/rili.png" alt="" />
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
                    <p v-for="item in weekList" :key="item.id">{{ item }}</p>
                  </div>
                  <div class="weekDay">
                    <!-- 这个是前面的空格 -->
                    <p
                      class="kongge"
                      v-for="item in spaceDay"
                      :key="item.id"
                    ></p>
                    <p
                      class="days"
                      v-for="(item, idx) in monthDay[this.month - 1] || 30"
                      @click="setDay(idx)"
                      :class="idx == activeDay ? 'active' : ''"
                      :key="item.id"
                    >
                      {{ item }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- <div class="wancheng" @click="wancheng()">完成</div> -->
            </div>
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
                    <p
                      v-for="(item, idx) in monthDay2[this.month2 - 1] || 30"
                      @click="setDay2(idx)"
                      :class="idx == activeDay2 ? 'active' : ''"
                      :key="item.id"
                    >
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
              <p>{{ numwan }}晚</p>
            </div>
          </div>
          <div class="blocks">
            <p class="blotext">退房：</p>
            <div class="contbox checkin" @click="getrilis2()">
              <p>{{ wwks2 }}</p>
              <img class="rilimg" src="../../assets/img/rili.png" alt="" />
            </div>
          </div>
          <!-- 房间数 -->
          <div class="blocks" v-if="zhankai">
            <p class="blotext">房间数量：</p>
            <div class="contbox romsnum" @click="getroom()">
              <p>{{ roomIndex }}间</p>
              <img
                src="../../assets/img/botxia.png"
                alt=""
                :style="roomshow ? 'transform: rotate(180deg)' : ''"
              />
            </div>
            <div
              class="roomnums"
              v-show="roomshow"
              :class="roomshow ? 'active' : ''"
            >
              <ul>
                <li
                  v-for="(list, index) in roomlist"
                  :key="index"
                  @click.stop="getnums(list)"
                  :class="roomIndex == list ? 'cur' : ''"
                >
                  {{ list }}
                </li>
              </ul>
            </div>
          </div>
          <!-- 人数 -->
          <div class="blocks" v-if="zhankai" @click="people()">
            <p class="blotext">人数：</p>
            <div class="contbox peoplenum">
              <p>{{ daren }}成人,{{ xiaohai }}儿童</p>
              <img src="../../assets/img/botxia.png" alt="" />
            </div>
            <div class="persons" v-if="peopleshow">
              <!--  -->
              <!-- <div @click="prev" class="person s_prev">
                <img src="../../assets/img/jt.png" alt="" />
              </div> -->
              <div class="peolcont">
                <div class="peolcontlist">
                  <div class="peolist_left">每间房最多住3人</div>
                  <!-- <div class="peolist_right">
                    <div class="addsubtra jian active" @click.stop="jian(0)">-</div>
                    <div class="peolist_num">{{daren}}</div>
                    <div class="addsubtra jia"  @click.stop="jia(0)">+</div>
                  </div> -->
                </div>
                <div class="peolcontlist">
                  <div class="peolist_left">成人</div>
                  <div class="peolist_right">
                    <div class="addsubtra jian active" @click.stop="jian(0)">
                      -
                    </div>
                    <div class="peolist_num">{{ daren }}</div>
                    <div class="addsubtra jia" @click.stop="jia(0)">+</div>
                  </div>
                </div>
                <div class="peolcontlist">
                  <div class="peolist_left">儿童</div>
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
          <div class="blocks" v-if="zhankai">
            <p class="blotext">房屋偏好：</p>
            <div class="contbox housegood" @click="getoianhao()">
              <p class="text_hidden">{{ compIndex }}</p>
              <img src="../../assets/img/botxia.png" alt="" />
            </div>
            <div
              class="roomnums"
              v-show="houseshow"
              :class="houseshow ? 'active' : ''"
            >
              <ul>
                <li
                  v-for="(list, index) in cpmlist"
                  :key="index"
                  @click.stop="getcomp(list)"
                  :class="compIndex == list ? 'cur' : ''"
                >
                  {{ list }}
                </li>
              </ul>
            </div>
          </div>
          <!-- 公司ID -->
          <div class="blocks" v-if="zhankai">
            <p class="blotext">公司ID：</p>
            <div class="contbox companyid">
              <input type="text" v-model="compid" />
              <!-- <p>1间</p> -->
              <!-- <img src="../../assets/img/botxia.png" alt="" /> -->
            </div>
          </div>
          <!-- 查询-->
          <div class="lookup" v-if="zhankai">
            <div class="lookuplist" @click="tolist()">
              <p>查找酒店</p>
            </div>
          </div>
        </div>
        <div class="upmore">
          <div class="anniu anniu1" v-if="!zhankai" @click="dianji()">
              <img src="../../assets/img/updown.png" alt="">
              <p>展开</p>
          </div>
          <div class="anniu anniu2" v-if="zhankai" @click="dianji()">
              <img src="../../assets/img/updown.png" alt="">
              <p>收起</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <li>日历</li> -->

    <!-- <div class="calender">
      <div class="txt-c">
        <span> - </span>
        <span>
          <input type="text" name="" id="" />
        </span>
        <span> + </span>
      </div>
    </div> -->
    <!-- a -->
  </div>
</template>

<script>
// import Header from "../owned/header.vue"
// import Footer from "../owned/footer.vue"
export default {
  // components: {
  //     Header,
  //     Footer
  // },
  data() {
    return {
      zhankai:false,
      rilishow: false,
      rilishow2: false,
      token:'',
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
      numwan: "",

      roomlist: ["1", "2", "3", "4"], //房间数量列表
      roomIndex: 1, //默认一间
      roomshow: false,

      houseshow: false, //房间偏好弹窗
      compid: "", //公司id
      cpmlist: [
        "全部",
        "最优门市价含单早",
        "最优门市价无早",
        "会员价格",
        "最优门市价含双早",
        "协议价格",
      ],
      compIndex: "全部",
      mudishow: false,
      mudiid: "",
      mudilist: ["北京", "上海", "深圳", "杭州"],
      mudiIndex: "北京",
      peopleshow: false, //人数列表
      daren: 1,
      xiaohai: 0,
      yesdazhu: "", //能住几个大人
      // yesxizhu:'',//能住几个小孩
      // daxiao:"",//大人小孩
      nowday: "", //今天的时间
      nextday: "", //明天的时间
      city:[],
      city_centry:[],
      cityshow:false,
      mudiIndexnum1:'0',
      mudiIndexnum2:'0',
      mudisaaa:'0',
      hotelist:[],
    };
  },

  created() {
    this.token = sessionStorage.getItem("token");
    if(this.$route.query.prono){
      this.compid = this.$route.query.prono
    }
    if(localStorage.getItem("mudiIndex")&&localStorage.getItem("mudiIndex")!=""){
      this.mudiIndex = localStorage.getItem("mudiIndex")
      this.mudiIndexnum1 = localStorage.getItem("mudiIndexnum1");
      this.mudisaaa = localStorage.getItem("mudiIndexnum1");
      this.mudiIndexnum2 = localStorage.getItem("mudiIndexnum2");
      console.log(this.mudiIndexnum1 )
      //that.city_centry = 
      console.log(this.mudiIndexnum2 )
    }


    this.current = new Date();
    // console.log(this.current)
    // var nowDate = this.current;
    // //当前月1号
    // //var nowMonth = nowDate.getFullYear() + "-" + (parseInt(nowDate.getMonth() + 1) < 10 ? "0" + parseInt(nowDate.getMonth() + 1):parseInt(nowDate.getMonth() + 1)) + "-01";
    // //下月1号
    // var afterMonth =
    //   nowDate.getFullYear() +
    //   "-" +
    //   (parseInt(nowDate.getMonth() + 2) < 10
    //     ? "0" + parseInt(nowDate.getMonth() + 2)
    //     : parseInt(nowDate.getMonth() + 2)) +
    //   "-01";
    // console.log(nowMonth)
    // console.log(afterMonth)
    // console.log(new Date(afterMonth))
    // this.current2 = new Date(afterMonth);
    this.current2 = new Date();
    if (
      localStorage.getItem("compIndex") != "undefined" &&
      localStorage.getItem("compIndex") != null &&
      localStorage.getItem("compIndex") != ""
    ) {
      this.compIndex = localStorage.getItem("compIndex");
    }
    if (
      localStorage.getItem("activeDay") != "undefined" &&
      localStorage.getItem("activeDay") != null &&
      localStorage.getItem("activeDay") != ""
    ) {
      this.activeDay = localStorage.getItem("activeDay");
      console.log(this.activeDay);
    } else {
    }
    if (
      localStorage.getItem("activeDay2") != "undefined" &&
      localStorage.getItem("activeDay2") != null &&
      localStorage.getItem("activeDay2") != ""
    ) {
      this.activeDay2 = localStorage.getItem("activeDay2");
    }
    //今天明天日期
    this.nowday = this.GetDateStr(0);
    this.nextday = this.GetDateStr(1);
    console.log(localStorage.getItem("wwks1"));
    if (
      localStorage.getItem("wwks1") != null &&
      localStorage.getItem("wwks1") != "" &&
      localStorage.getItem("wwks2") != null &&
      localStorage.getItem("wwks2") != ""
    ) {
      var shijianQi = localStorage.getItem("wwks1").replace(/\//g, "-");
      // console.log("时间起"+shijianQi)
      if (
        new Date(shijianQi.replace(/-/g, "/")) >=
        new Date(this.nowday.replace(/-/g, "/"))
      ) {
        this.wwks1 = localStorage.getItem("wwks1");
        this.wwks2 = localStorage.getItem("wwks2");
        console.log("今天星期几！" + new Date().getDay());
        this.numwan = this.getDaysBetween(
          this.wwks1.replace(/-/g, "/"),
          this.wwks2.replace(/-/g, "/")
        );
      }else{
        var ddsc = new Date().getDay();
        if (ddsc == 7) {
          this.wwks1 = this.nowday.replace(/-/g, "/");
          this.wwks2 = this.nextday.replace(/-/g, "/");
        } else {
          this.wwks1 = this.nowday.replace(/-/g, "/");
          this.wwks2 = this.nextday.replace(/-/g, "/");
        }
        localStorage.setItem("wwks1", this.wwks1);
        localStorage.setItem("wwks2", this.wwks2);
        this.numwan = this.getDaysBetween(
          this.wwks1.replace(/-/g, "/"),
          this.wwks2.replace(/-/g, "/")
        );
      }
    } else {
      // console.log('没有起始时间')
      // console.log(localStorage.getItem("wwks1"))
      var ddsc = new Date().getDay();
      if (ddsc == 7) {
        this.wwks1 = this.nowday.replace(/-/g, "/");
        this.wwks2 = this.nextday.replace(/-/g, "/");
      } else {
        this.wwks1 = this.nowday.replace(/-/g, "/");
        this.wwks2 = this.nextday.replace(/-/g, "/");
      }
      localStorage.setItem("wwks1", this.wwks1);
      localStorage.setItem("wwks2", this.wwks2);
      this.numwan = this.getDaysBetween(
        this.wwks1.replace(/-/g, "/"),
        this.wwks2.replace(/-/g, "/")
      );
    }
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
    console.log(this.daren);
    console.log(localStorage.getItem("daren"));
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
    getdiqulist() {
      var that = this;
      that.$axios
        .get(`${this.Baseurl}hotel_new?web_token=${that.token}`)
        .then(function (res) {
        that.city = res.data.data;
        console.log("citycitycitycitycitycitycitycitycitycitycitycitycitycitycity");
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
          

          sessionStorage.setItem("hotel_id", that.city[that.mudiIndexnum1][that.mudiIndexnum2].id);
          sessionStorage.setItem("hotelcode",that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code);
          sessionStorage.setItem("codesh", that.city[that.mudiIndexnum1][that.mudiIndexnum2].code);
          sessionStorage.setItem("hotelname",that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name);
          sessionStorage.setItem("dituxinxi",JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
        } else {
          that.city_centry = that.city["北京"];
          that.mudiIndex = that.city["北京"][0].hotel_name;
          that.mudiIndexnum1 = "北京";
          that.mudiIndexnum2 = 0;
          localStorage.setItem("mudiIndex", that.mudiIndex);
          localStorage.setItem("mudiIndexnum1", "北京");
          localStorage.setItem("mudiIndexnum2", 0);

          sessionStorage.setItem("hotel_id", that.city["北京"][0].id);
          sessionStorage.setItem("hotelcode",that.city["北京"][0].hotel_code);
          sessionStorage.setItem("codesh", that.city["北京"][0].code);
          sessionStorage.setItem("hotelname",that.city["北京"][0].hotel_name);
          sessionStorage.setItem("dituxinxi",JSON.stringify(that.city["北京"][0]))
        }
        console.log(that.city_centry);
        })
        .catch((err) => console.log(err));
    },
    
    changejiu(listMsg,indexMsg){
      console.log(listMsg)
      console.log(indexMsg)
      if(listMsg.path&&listMsg.path!=""){
        window.open(listMsg.path)
      }else{
      this.mudishow = false;
      this.cityshow = false;
      this.mudiIndex = listMsg.hotel_name;
      this.mudiIndexnum1 = this.mudisaaa
      this.mudiIndexnum2 = indexMsg
      console.log(this.mudisaaa)
      localStorage.setItem("mudiIndex", this.mudiIndex);
      localStorage.setItem("mudiIndexnum1", this.mudisaaa);
      localStorage.setItem("mudiIndexnum2", indexMsg);
      // console.log( this.mudiIndexnum1)
      // console.log( this.mudiIndexnum2)
      var that = this
      sessionStorage.setItem("hotel_id", that.city[that.mudiIndexnum1][that.mudiIndexnum2].id);
      console.log("酒店hotel_id:",sessionStorage.getItem("hotel_id"))

      sessionStorage.setItem("hotelcode",that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code);
      console.log("酒店hotelcode:",sessionStorage.getItem("hotelcode"))

      sessionStorage.setItem("codesh", that.city[that.mudiIndexnum1][that.mudiIndexnum2].code);
      console.log("酒店codesh:",sessionStorage.getItem("codesh"))

      sessionStorage.setItem("hotelname",that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name);
      console.log("酒店hotelname:",sessionStorage.getItem("hotelname"))
      sessionStorage.setItem("dituxinxi",JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2]))
      }
      
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
              if(that.hotelist[i].id == sessionStorage.getItem("hotel_index_data")){
                var index_data = parseInt(i);
              }
            }
            sessionStorage.setItem("hotel_id", that.hotelist[index_data].id);
            sessionStorage.setItem("hotelcode",that.hotelist[index_data].hotel_code);
            sessionStorage.setItem("codesh", that.hotelist[index_data].code);
            console.log(sessionStorage.getItem("codesh"));
            sessionStorage.setItem("hotelname",that.hotelist[index_data].hotel_name);
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
    
    getcitylist(index){
      // this.cityshow = true
      // this.mudiIndexnum1 = index
      this.mudisaaa = index
      this.city_centry =  this.city[this.mudisaaa]
    },
    // getcitylist2(index){
    //   this.cityshow = false
    // },
    dianji(){
      this.zhankai =  !this.zhankai
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
    getmudi(index) {
      this.mudiIndex = index;
      this.mudishow = false;
      localStorage.setItem("mudiIndex", this.mudiIndex);
    },
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
      var time1 = this.wwks1.replace(/\//g, "-");
      var time2 = this.wwks2.replace(/\//g, "-");
      this.$router.push({
        name: "RoomsList",
        query: {
          // startDate:this.starttime,
          // endDate:this.endtime,
          startDate: time1,
          endDate: time2,
          numDay: this.roomIndex, //默认一天
          prono:this.compid,
        },
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
    setDay(idx) {
      this.day = idx + 1;
      var kaishiTime = this.year + "-" + this.month + "-" + this.day;
      // console.log("起始日期中的点击的天数"+kaishiTime)
      // console.log("起始日期中的结束时间"+this.wwks2)
      var jieshuTime = this.wwks2.replace(/\//g, "-");
      if (
        new Date(kaishiTime.replace(/-/g, "/")) >=
        new Date(this.nowday.replace(/-/g, "/"))
      ) {
        this.wwks1 = this.year + "/" + this.month + "/" + this.day;
        this.starttime = this.year + "-" + this.month + "-" + this.day;
        this.activeDay = idx;
        localStorage.setItem("wwks1", this.wwks1);
        localStorage.setItem("starttime", this.starttime);
        localStorage.setItem("activeDay", this.idx);
        this.rilishow = false;
        if (
          new Date(kaishiTime.replace(/-/g, "/")) >=
          new Date(jieshuTime.replace(/-/g, "/"))
        ) {
          var aa = new Date(kaishiTime.replace(/-/g, "/"));
          var bb = aa.setDate(aa.getDate() + 1);
          var cc = this.timestampToTime(bb);
          this.wwks2 = cc.replace(/-/g, "/");
          this.endtime = cc;
          localStorage.setItem("wwks2", this.wwks2);
          localStorage.setItem("endtime", this.endtime);
          this.numwan = this.getDaysBetween(kaishiTime, this.endtime);
        } else {
          this.numwan = this.getDaysBetween(kaishiTime, jieshuTime);
        }
      } else {
        alert("请选择大于等于今天的日期");
      }
      console.log("起始日期中的选中的天数" + this.starttime);
      // this.reload()
      //this.getDaysBetween(this.starttime, d2)
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      // var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var M = date.getMonth() + 1 + "-";
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

      if (
        new Date(kaishiunTime.replace(/-/g, "/")) >
        new Date(jieshuunTime.replace(/-/g, "/"))
      ) {
        this.wwks2 = this.year2 + "/" + this.month2 + "/" + this.day2;
        this.activeDay2 = idx;
        this.endtime = this.year2 + "-" + this.month2 + "-" + this.day2;
        localStorage.setItem("wwks2", this.wwks2);
        localStorage.setItem("endtime", this.endtime);
        localStorage.setItem("activeDay2", this.idx);
        this.rilishow2 = false;
        this.numwan = this.getDaysBetween(jieshuunTime, kaishiunTime);
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
      const days  = Math.floor(daysa)
      return days;
    },
  },
  mounted() {},
};
</script>
<style scoped>
/* .mudidiv{
  background-color: pink;
  width: 100%;
} */
.mudione{
  display: flex;
}
.mudione ul{
  width: 25% !important;
  /* border-right: #000; */
  border-right: 1px solid rgb(189, 189, 189);
  display: block;
}
.mudione ul li{
  /* background-color: #d5b08b; */
}

.mudidiv{
  /* position: absolute; */
  /* left: 30%;
  top: 0; */
  background-color: #fff;
  /* box-shadow: 0 4px 20px 0 rgb(0 0 0 / 7%); */
  /* margin-left: 10px; */
  /* width: 300px; */
  /* background-color: pink; */
  width: 75%;
}
.mudidiv p{
  /* margin: 5px 0 !important; */
    text-align: left;
    padding: 0 2vw;
    box-sizing: border-box;
    width: 100%;
    height: 8vw;
    line-height: 8vw;
    margin: auto;
    color: #000;
    font-size: 3.5vw;
}

.mudidiv p:hover{
  /* background-color: #d5b08b !important;
  color: #fff; */
  background: #ead7c3;
}
.mudidiv p.active{
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
  padding-bottom: 12vw;
  padding-top: 0.133vw;
}

.riqi {
  position: relative;
  width: 100%;
}
.riqi .upmore{
    position: absolute;
    bottom: -10.5vw;
    left: 50%;
    margin-left: -2.5vw;
}
.riqi .upmore .anniu>img{
    width: 4vw;
    height: 3.5vw;
    display: block;
    margin: auto;
}
.riqi .upmore .anniu2>img{
    transform: rotate(180deg);
}
.riqi .upmore .anniu>p{
    font-size: 2.8vw;
    display: block;
    margin: auto;
    color: #1d1c1c;
    margin-top: 0.5vw;
}
.riqi .title {
  font-size: 5vw;
  color: #000000;
  font-weight: 400;
  margin-top: 4vw;
}
.hotel_riqi {
  /* margin-top: 3.333vw; */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.hotel_riqi .blocks {
  position: relative;
}
.hotel_riqi .blotext {
  font-size: 4vw;
  color: #000000;
  padding: 2vw 0;
  height: 6vw;
  font-weight: 300;
}
.hotel_riqi .contbox {
  height: 6.667vw;
  background-color: #fff;
  /* border: 0.133vw solid #b0b0b0; */
  padding-left: 2.533vw;
  padding-right: 2.267vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
  box-sizing: border-box;
  width: 38vw;
  height: 10.667vw;
}
.hotel_riqi .contbox > p {
  font-size: 4vw;
  color: #5f5f5f;
}
.hotel_riqi .contbox > img {
  /* width: 1.200vw;
  height: 0.667vw; */
  width: 2vw;
  height: 1.3vw;
}
.hotel_riqi .contbox.mudi {
  width: 100%;
}
.hotel_riqi .blocks:nth-child(1) {
  width: 100%;
}

/* 日期 */
/* .hotel_riqi .contbox.checkin {
  width: 21.333vw;
} */
.hotel_riqi .contbox.checkin .rilimg {
  width: 3.133vw;
  height: 3.267vw;
  display: block;
}
/* 几晚 */
.hotel_riqi .contbox.jiwan {
  width: 13vw;
  background: none;
  padding: 0;
  border: none;
  justify-content: center;
}

/* 房间数量 */
/* .hotel_riqi .contbox.romsnum {
  width: 14.667vw;
} */
.roomnums {
  width: 100%;
  text-align: center;
  color: #333;
  line-height: 2.933vw;
  position: absolute;
  top: 21vw;
  left: 0;
  background: #fff;
  box-shadow: 0 0.533vw 2.667vw 0 rgb(0, 0, 0, 0.07);
  z-index: 9;
  /* border-radius: 2.000vw;
  overflow: hidden; */
}
.roomnums ul {
  display: block;
  width: 100%;
}
.roomnums ul li {
  text-align: left;
  padding: 0 2vw;
  box-sizing: border-box;
  width: 100%;
  height: 8vw;
  line-height: 8vw;
  margin: auto;
  color: #000;
  font-size: 3.5vw;
  /* cursor: pointer; */
}
.roomnums ul li.cur {
  background: #d5b08b;
  color: #fff;
}
.roomnums ul li:hover {
  background: #ead7c3;
}

/* 人数 */
/* .hotel_riqi .contbox.peoplenum {
  width: 23.333vw;
} */
.hotel_riqi .persons {
  /* 文字  */
  width: 45vw;
  position: absolute;
  /* height: 40vw; */
  background: #fff;
  z-index: 10;
  box-shadow: 0 0.533vw 2.667vw 0 rgb(0 0 0 / 7%);
  /* left: 50%; */
  left: -4vw;
  /* margin-left: -16.667vw; */
  top: 21vw;
  box-sizing: border-box;
  padding: 4vw 2.667vw;
  border-radius: 2.133vw;
}
.hotel_riqi .persons .peolcont .peolcontlist {
  display: flex;
  align-items: center;
  margin: 2vw 0;
  justify-content: space-between;
}
.hotel_riqi .persons .peolcont .peolcontlist .peolist_left {
  font-size: 4vw;
}
.hotel_riqi .persons .peolcont .peolcontlist .peolist_right {
  font-size: 4vw;
  display: flex;
  align-content: center;
}
.peolist_num {
  width: 7vw;
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

/* 房屋偏好 */
/* .hotel_riqi .contbox.housegood {
  width: 24.667vw;
} */
.hotel_riqi .contbox.housegood p {
  display: block;
  white-space: nowrap;
  /*	单行显示，不换行	*/
  overflow: hidden;
  /*	超出隐藏	*/
  text-overflow: ellipsis;
  /*	显示点	*/
}
/* 公司ID */
/* .hotel_riqi .contbox.companyid {
  width: 22.667vw;
} */
.hotel_riqi .contbox.companyid input {
  width: 100%;
  height: 100%;
  /* background-color: pink; */
  background-color: #fff;
  outline: none;
  border: none;
  font-size: 4vw;
  color: #5f5f5f;
}
/* 查询 */
.hotel_riqi .lookup {
  width: 10vw;
  position: relative;
  background: none;
  border: none;
  width: 100%;
  height: 13.333vw;
  margin-top: 8vw;
}

.hotel_riqi .lookup p {
  color: #fff;
  font-size: 4vw;
}
.hotel_riqi .lookuplist {
  /* position: absolute; */

  width: 100%;
  height: 100%;
  background: #d5b08b;
  /* border-radius: 1.600vw; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* transform: translateY(-3.200vw); */
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
/* .weekDay .days:hover {
  background-color: #eee;
  border-color: transparent;
  color: #fff;
} */
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
