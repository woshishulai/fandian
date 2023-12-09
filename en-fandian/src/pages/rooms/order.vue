<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="crumbs">
        <p>Your location: Home > Orders</p>
      </div>
      <div class="order" @click="timeclose()">
        <div class="main">
          <div class="orderdetail">
            <div class="order_left">
              <div class="blocks">
                <div class="blocklist xuzhi">
                  <span class="spantit">Room reservation notice</span>
                  <p v-html="xinxilist.description">
                  </p>
                </div>
              </div>
              <div class="blocks">
                <div class="blocklist yuding">
                  <span class="spantit">Booking information</span>
                  <div class="reserve">
                    <!--日期  -->
                    <div class="riqi">
                      <div class="hotel_riqi">
                        <!-- 时间 -->
                        <div class="blocks">
                          <p class="blotext">Check in date</p>
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
                                  <span class="tishispan">Select check-in time </span>
                                  <span style="">
                                    {{ year }} year {{ month }} month
                                  </span>
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
                                  <p class="days" v-for="(item, idx) in monthDay[
                                    this.month - 1
                                  ] || 30" @click="setDay(idx)" :class="idx == activeDay ? 'active' : ''"
                                    :key="item.id">
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
                                  <span class="tishispan">Select check-out time </span>
                                  <span style="">
                                    {{ year2 }} year {{ month2 }} month
                                  </span>
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
                                  ] || 30" @click="setDay2(idx)" :class="idx == activeDay2 ? 'active' : ''"
                                    :key="item.id">
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
                          <p class="blotext">Check out date</p>
                          <div class="contbox checkin" @click="getrilis2()">
                            <p>{{ wwks2 }}</p>
                            <img class="rilimg" src="../../assets/img/rili.png" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- 房间数下拉 -->
                    <div class="house">
                      <p>No. of Room</p>
                      <div class="house_text" @click="getroom()">
                        <div class="getroom">{{ roomIndex }}</div>
                        <div class="roomnums" v-show="roomshow" :class="roomshow ? 'active' : ''">
                          <ul>
                            <li v-for="(list, index) in roomlist" :key="index" @click.stop="getnums(list)"
                              :class="roomIndex == list ? 'cur' : ''">
                              {{ list }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blocks">
                <div class="blocklist zhuke">
                  <span class="spantit">Guest Info</span>
                  <div class="rooms">
                    <div class="roomslist" v-if="roomIndex >= 1">
                      <p>Room1(name)</p>
                      <input type="text" placeholder="Please fill in one name per room" v-model="names1" />
                    </div>
                    <div class="roomslist" v-if="roomIndex >= 2">
                      <p>Room2(name)</p>
                      <input type="text" placeholder="Please fill in one name per room" v-model="names2" />
                    </div>
                    <div class="roomslist" v-if="roomIndex >= 3">
                      <p>Room3(name)</p>
                      <input type="text" placeholder=" Please fill in one name per room" v-model="names3" />
                    </div>
                    <div class="roomslist" v-if="roomIndex == 4">
                      <p>Room4(name)</p>
                      <input type="text" placeholder="Please fill in one name per room" v-model="names4" />
                    </div>
                    <!-- <div class="roomslist">
                      <p>房间2(姓名)</p>
                      <input type="text" placeholder="每间房填一人姓名即可">
                    </div> -->
                  </div>
                  <div class="dianhua">
                    <p>Mobile Number</p>
                    <!-- 地区 -->
                    <div class="dianhua_cont">
                      <!-- <div class="phone_group">
                        <div class="region" @click.stop="phoneis()"> 
                          <span>{{bianhao}}</span>
                          <img class="phone_group_jt" src="../../assets/img/jt.png" :class="phoneshow?'active':''" alt=""> 
                        </div>                   
                        <ul class="dropul"  :class="phoneshow?'active':''"> 
                          <li class="dropul_li" v-for="(region,index) in regions" :key="index" @click="setregion(region.zone)" :class="bianhao==region.zone?'active':''">
                            {{region.state}}
                            <span class="dropul_span">{{region.zone}}</span>
                          </li>
                        </ul>
                      </div>   -->
                      <input type="text" placeholder="Please fill in mobile number" class="phones" v-model="dianhua" />
                    </div>
                  </div>
                  <div class="youxiang">
                    <p> Personal identification Document No</p>
                    <input type="text" placeholder="Please fill in ID or passport no" class="phones"
                      v-model="shenfenID" />
                  </div>
                  <div class="youxiang">
                    <p>E-mail Address</p>
                    <input type="text" placeholder="Please fill in email address" class="phones" v-model="emalis" />
                  </div>
                </div>
              </div>
              <div class="blocks">
                <div class="blocklist daodian">
                  <span class="spantit">Estimated arrival time</span>
                  <div class="daodian_text">
                    <p> Our standard check in time is 14:00 onwards</p>
                    <p> Our front desks operate 24 hours a day</p>
                    <p>Estimated time of arrival (optional)</p>
                  </div>
                  <div class="time" @click.stop="gettime()" :class="timeshow ? 'active' : ''">
                    <div class="gettimePart">
                      <!-- <span class="getHour">00</span>
                      <span>:</span>
                      <span class="getMinute">00</span>
                      <span>请选择</span> -->
                      {{
                        timehour != "" && timeminute != ""
                        ? timehour + ":" + timeminute
                        : "Please select "
                      }}
                    </div>
                    <div class="timePart" v-if="timeshow">
                      <ul>
                        <li id="selHour">
                          <!-- <p>时</p> -->
                          <ol>
                            <!-- <li class="" @click="gethour(index,hour)">{{hour}}</li> -->
                            <li v-for="(hour, index) in hours" :key="index" @click.stop="gethour(index, hour)"
                              :class="hoursIndex == index ? 'cur' : ''">
                              {{ hour }}
                            </li>
                            <!-- <li class="cur" >00</li> -->
                          </ol>
                        </li>
                        <li id="selMinute">
                          <!-- <p>分</p> -->
                          <ol>
                            <!-- <li class="cur">00</li> -->
                            <li v-for="(minute, index) in minutes" :key="index" @click.stop="getminute(index, minute)"
                              :class="minutesIndex == index ? 'cur' : ''">
                              {{ minute }}
                            </li>
                          </ol>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blocks">
                <div class="blocklist fapiao">
                  <span class="spantit">The invoice information</span>
                  <p>Should you need an invoice for your stay, please request for it upon check in at the front desk</p>
                  <!-- <div class=""></div> -->
                  <span class="spantit">Method of Payment</span>
                  <div class="zhifu">
                    <div class="zhifulist" v-if="roomslist.zffs != '1'">
                      <div class="zhifuicon" @click="payment(2)">
                        <img v-if="zhifu == 2" src="../../assets/img/xz.png" alt="" />
                        <img v-if="zhifu == 1" src="../../assets/img/wxz.png" alt="" />
                      </div>
                      <p>WeChat pay</p>
                    </div>
                    <div class="zhifulist" v-if="roomslist.zffs != '2'">
                      <div class="zhifuicon" @click="payment(1)">
                        <!-- <img :class="zhifu==1?'img2':'img1'" src="../../assets/img/xz.png" alt="" />
                        <img :class="zhifu==1?'img1':'img2'" src="../../assets/img/wxz.png" alt="" /> -->
                        <img v-if="zhifu == 1" src="../../assets/img/xz.png" alt="" />
                        <img v-if="zhifu == 2" src="../../assets/img/wxz.png" alt="" />
                      </div>
                      <p>Pay upon Check-in</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="blocks">
                <div class="blocklist dinggou">
                  <div class="tiaokuan">
                    <img src="../../assets/img/xz.png" alt="" />
                    <p>Accept</p>
                    <span @click="getwin(2)">Terms & Conditions</span>
                  </div>
                  <div class="price">
                    <div class="price_text">
                      <p>Price:</p>
                      <span>￥{{ jiage }}</span>
                    </div>
                    <div class="price_pay" @click="tijiao">Reserve now</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="order_right">
              <span class="spantie">The order details</span>
              <div class="tupian">
                <!-- <img src="../../assets/img/room1.jpg" alt="" /> -->
                <img :src="Baseurl + roomslist.pc_image" alt="" />
              </div>
              <div class="jieshao">
                <div class="blo1">
                  <span class="spnas">Room:</span>
                  <p>{{ roomslist.title }}</p>
                </div>
                <div class="blo2">
                  <div class="blo2_left">
                    <span class="spnas">C/I Time</span>
                    <p v-if="starttime">
                      {{ starttime.split("-")[0] }}/{{ starttime.split("-")[1] }}/{{
                        starttime.split("-")[2]
                      }}
                    </p>
                    <!-- starttime: "",endtime -->
                    <!-- <p>星期{{ wwks1.slice(1, 2) }} 14:00起</p> -->
                    <p>{{ nowweek1 }}</p>
                  </div>
                  <div class="blo2_right">
                    <span class="spnas">C/O Time</span>
                    <p v-if="endtime">
                      {{ endtime.split("-")[0] }}/{{ endtime.split("-")[1] }}/{{ endtime.split("-")[2] }}
                    </p>
                    <!-- <p>星期{{ wwks2.slice(1, 2) }} 12:00前</p> -->
                    <p>{{ nowweek2 }}</p>
                  </div>
                </div>
                <div class="blo3">
                  <span class="spnas">Length of stay:</span>
                  <p>{{ numwan }}<span v-if="numwan > 1">Nights</span><span v-else>Night</span></p>
                </div>
                <div class="blo4">
                  <span class="spnas">Rate</span>
                  <div class="jiage" v-for="(item, index) in pricetimelist" :key="index">
                    <p>{{ item.day }}</p>
                    <p>￥{{ item.salePrice }}</p>
                  </div>
                  <div class="jiage">
                    <p>{{ endtime }} Check Out</p>
                  </div>
                  <div class="jiage">
                    <p>Rate:{{ numwan }}<span v-if="numwan > 1">Nights</span><span v-else>Night</span>
                      {{ roomIndex }}
                      <span v-if="roomIndex > 1">Rooms</span><span v-else>Room</span>
                    </p>
                    <p>￥{{ jiage }}</p>
                  </div>
                </div>
              </div>
              <div class="yingfu">
                <p>Total amount payable:</p>
                <p>￥{{ jiage }}</p>
              </div>
              <div class="quxiao">
                <p>Cancellation rules</p>
                <p v-html="xinxilist.description1">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Tips_elastic" v-if="tipshow">
      <div class="Tips">
        <p>{{ tipstext }}</p>
      </div>
    </div>
    <!-- 公共底部 -->
    <Footer />
    <!-- v-if="zhifushow" -->
    <div class="zhifuye" v-if="zhifushow">
      <div class="erweima">
        <div v-if="success == 0">
          <div class="erweima_title">Please scan the QR code below to pay</div>
          <div id="qrcode" ref="qrcode"></div>
        </div>
        <div class="erweima_text" v-if="success == 1">
          <img src="../../assets/img/pay_over.png" alt="" />
          <div class="erweima_title">Pay for success</div>
          <div>The order no：{{ hy_bill_no }}</div>
        </div>
        <div class="erweima_text" v-if="success == 2">
          <div class="erweima_title">The order has been cancelled</div>
          <div>The order no：{{ hy_bill_no }}</div>
        </div>
        <div class="erweima_text" v-if="success == 3">
          <div class="erweima_title">The order has timed out</div>
          <div>The order no：{{ hy_bill_no }}</div>
        </div>
        <div class="retunrnindex" @click="retunrnindex">cancellation</div>
      </div>
    </div>
    <div class="windows1" v-show="wind2" @click="btshow(2)">
      <div class="wintext">
        <span>Terms of use</span>
        <p v-html="xinxilist.description2"></p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/layout/header.vue";
import Footer from "@/components/layout/footer.vue";
import QRCode from "qrcodejs2-fix";
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
      weekList: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
      weekList2: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
      wind2: false,

      //星期
      nowweek1: '',
      nowweek2: '',

      xinxilist: '',
      prono: "",//公司Id
      ratecode: "",//房间编码
      pricetimelist: [],//房间每晚钱数
      xunhuan: ""
    };
  },
  created() {
    // if (this.$route.query.prono) {
    //   this.prono = this.$route.query.prono
    // }
    this.prono = localStorage.getItem('prono') || ''
    this.ratecode = localStorage.getItem('ratecode') || ""
    // if (this.$route.query.ratecode) {
    //   this.ratecode = this.$route.query.ratecode
    // }
    // 储存第几个头部状态
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
    // this.looks = this.$route.query.looks;
    this.looks = localStorage.getItem('looks')
    console.log(this.looks);
    // this.priceIndex = this.$route.query.priceIndex;
    this.priceIndex = localStorage.getItem('priceIndex')
    console.log(this.priceIndex);
    // this.roomId = this.$route.query.roomId;
    this.roomId = localStorage.getItem('roomId')
    this.codesh = sessionStorage.getItem("codesh");

    // this.startDate = this.$route.query.startDate;
    this.startDate = localStorage.getItem('startDate')
    // this.endDate = this.$route.query.endDate;
    this.endDate = localStorage.getItem('endDate')
    // this.numDay = this.$route.query.numDay;
    this.numDay = localStorage.getItem('numDay')
    this.roomIndex = this.numDay;
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.numDay);
    //今天明天日期
    this.nowday = this.GetDateStr(0);
    // console.log(new Date(this.startDate).getTime())
    // console.log(new Date(this.nowday).getTime())
    this.nextday = this.GetDateStr(1);
    if (new Date(this.startDate).getTime() < new Date(this.nowday).getTime()) {
      this.starttime = this.nowday;
      this.endtime = this.nextday
    } else {
      this.starttime = localStorage.getItem('startDate')
      this.endtime = localStorage.getItem('endDate')
    }



    console.log(this.starttime)
    console.log(this.endtime)
    this.numwan = this.getDaysBetween(this.starttime, this.endtime);
    console.log(this.numwan)
    this.wwks1 = this.starttime?.replace(/-/, "/").replace(/-/, "/");
    this.wwks2 = this.endtime?.replace(/-/, "/").replace(/-/, "/");
    this.nowweek1 = this.getweekday(this.wwks1)
    this.nowweek2 = this.getweekday(this.wwks2)
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
    this.wenben()
    this.getdatalist();

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
    getweekday(date) {
      var weekArray = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
      var week = weekArray[new Date(date).getDay()];//注意此处必须是先new一个Date
      return week;
    },
    //打开弹窗
    getwin() {
      // if(index==2){
      //   this.wind2=true
      // }
      this.$router.push({ name: 'Details' })
    },
    //关闭弹窗
    btshow(index) {
      if (index == 2) {
        this.wind2 = false
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
    //设置地区编号
    setregion(region) {
      console.log(region);
      this.bianhao = region;
      this.phoneshow = false;
    },
    //打开关闭地区下拉
    phoneis() {
      this.phoneshow = !this.phoneshow;
    },
    //打开选择时间下拉
    gettime() {
      // this.timeshow=true
      this.timeshow = !this.timeshow;
    },
    // 选择小时
    gethour(index, hour) {
      this.hoursIndex = index;
      // console.log(index,hour)
      this.timehour = hour;
      if (this.timehour != "" && this.timeminute != "") {
        this.timeshow = false;
        this.time = this.timehour + ":" + this.timeminute;
      }
    },
    //选择分钟
    getminute(index, minute) {
      this.minutesIndex = index;
      // console.log(index,minute)
      this.timeminute = minute;
      if (this.timehour != "" && this.timeminute != "") {
        this.timeshow = false;
        this.time = this.timehour + ":" + this.timeminute;
      }
    },
    //关闭选择时间下拉
    timeclose() {
      this.timeshow = false;
    },
    payment(num) {
      this.zhifu = num;
    },
    //房间数量的选择
    getroom() {
      this.roomshow = !this.roomshow;
    },
    getnums(list) {
      this.roomIndex = list;
      this.roomshow = false;
      var that = this;
      // that.fangfei = that.roomslist.pricec[that.priceIndex].salePrice;
      that.fangfei = that.sumElementAtIndex(that.pricetimelist, "price")
      console.log(that.fangfei);
      console.log(that.roomslist);
      that.jiage =
        parseInt(that.roomIndex) *
        // parseInt(that.numwan) *
        parseInt(that.fangfei);
    },
    //新改的
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
            that.tishi("The currently selected date does not have this room type. Please change the date or room type");
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
              that.tishi("Hotel front desk reservation successful");
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
            that.tishi("Order query failed. Please place a new order");
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
    //   this.endtime = localStorage.getItem("endtime");
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
    //   this.numwan = this.getDaysBetween(this.starttime, this.endtime);
    //   this.getdatalist();
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
    //   console.log(this.endtime)
    //   this.starttime = localStorage.getItem("starttime");
    //   //new Date(this.endtime)>=new Date(this.starttime)
    //   //this.numwan = this.getDaysBetween(this.starttime,this.endtime)
    //   console.log(new Date(this.endtime))
    //      console.log(new Date(this.starttime))
    //   if (
    //     // new Date(this.endtime) >=
    //     // new Date(
    //     //   this.starttime && new Date(this.endtime) > new Date(this.nowday)
    //     // )
    //     new Date(this.endtime)>new Date(this.starttime)
    //   ) {
    //     this.wwks2 ==
    //       this.year2 +
    //       "/" +
    //       this.month2 +
    //       "/" +
    //       this.day2;
    //       console.log( this.wwks2)
    //     this.activeDay2 = idx;
    //     localStorage.setItem("wwks2", this.wwks2);
    //     localStorage.setItem("endtime", this.endtime);
    //     localStorage.setItem("activeDay2", this.idx);
    //     this.rilishow2 = false;
    //     console.log(this.wwks2);
    //   this.numwan = this.getDaysBetween(this.starttime, this.endtime);
    //   // this.reload()
    //   this.getdatalist();
    //   } else {
    //     alert("结束日期需大于起始日期");
    //   }

    // },
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
        this.nowweek1 = this.getweekday(this.wwks1),
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
          this.nowweek2 = this.getweekday(this.wwks2)
          this.endtime = cc;
          localStorage.setItem("wwks2", this.wwks2);
          localStorage.setItem("endtime", this.endtime);
          this.numwan = this.getDaysBetween(kaishiTime, this.endtime)
          this.getdatalist()
        } else {
          this.numwan = this.getDaysBetween(kaishiTime, jieshuTime)
          this.getdatalist()
        }
      } else {
        alert("请选择大于等于今天的日期");
      }
      console.log("起始日期中的选中的天数" + this.starttime);

      // this.reload()
      // this.getDaysBetween(this.starttime, this.endtime)
      this.getdatalist()
      // this.getnums()
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
        this.nowweek2 = this.getweekday(this.wwks2)
        this.activeDay2 = idx;
        this.endtime = this.year2 + "-" + this.month2 + "-" + this.day2;
        localStorage.setItem("wwks2", this.wwks2);
        localStorage.setItem("endtime", this.endtime);
        localStorage.setItem("activeDay2", this.idx);
        this.rilishow2 = false;
        this.numwan = this.getDaysBetween(jieshuunTime, kaishiunTime)

        this.getdatalist()
      } else {
        alert("结束日期需大于起始日期");
      }
      // console.log(this.wwks2);
      // this.getnums()
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
    // this.qrcode()
    // this.creatQrCode();
  },
};
</script>
<style scoped>
.order {
  background-color: #efefed;
}

.orderdetail {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 15px;
}

.orderdetail .order_left {
  width: 978px;
}

.orderdetail .order_left .blocks {
  background-color: #fff;
  margin-bottom: 15px;
  padding: 30px 0;
}

.blocklist {
  width: 900px;
  margin: auto;
}

.blocklist .spantit {
  font-size: 24px;
  color: #000000;
  font-weight: 400;
}

.xuzhi p {
  font-size: 18px;
  color: #000000;
  line-height: 30px;
  margin-top: 15px;
  text-align: justify;
}

.xuzhi p {
  font-size: 18px;
  color: #000000;
  line-height: 30px;
  margin-top: 15px;
  text-align: justify;
}

/* 到店时间 */
.daodian_text {
  margin-top: 15px;
}

.daodian_text p {
  font-size: 18px;
  color: #000000;
  line-height: 30px;
}

/* 发票信息 支付方式 */
.fapiao>p {
  /* line-height: 30px; */
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  color: #000000;
}

.fapiao .zhifu {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.fapiao .zhifu .zhifulist {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.fapiao .zhifu .zhifulist .zhifuicon {
  width: 17px;
  height: 17px;
  /* overflow: hidden; */
  cursor: pointer;
}

.fapiao .zhifu .zhifulist .zhifuicon img {
  width: 100%;
  display: block;
}

.fapiao .zhifu .zhifulist .zhifuicon img:hover {
  opacity: 0.8;
}

.fapiao .zhifu .zhifulist p {
  font-size: 18px;
  color: #000000;
  margin-left: 12px;
}

/* 使用条款 去订购 */
/* .dinggou{

} */
.tiaokuan {
  display: flex;
  align-items: center;
}

.tiaokuan img {
  width: 17px;
  height: 17px;
  cursor: pointer;
}

.tiaokuan img:hover {
  opacity: 0.8;
}

.tiaokuan p {
  font-size: 18px;
  color: #000000;
  margin-left: 12px;
  height: 25px;
}

.tiaokuan span {
  font-size: 18px;
  color: #206079;
  display: inline-block;
  box-sizing: border-box;
  height: 25px;
  border-bottom: 1px solid #206079;
  cursor: pointer;
}

.price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.price .price_text {
  display: flex;
  align-items: center;
}

.price .price_text p {
  font-size: 18px;
  color: #000000;
  margin-left: 12px;
}

.price .price_text span {
  font-size: 30px;
  color: #206079;
  font-weight: 400;
}

.price_pay {
  width: 190px;
  height: 60px;
  background-color: #d5b08b;
  font-size: 20px;
  color: #fff;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}

.orderdetail .order_right {
  width: 400px;
  background-color: #fff;
  padding: 30px 0;
}

.orderdetail .order_right>.spantie {
  font-size: 24px;
  color: #000000;
  font-weight: 400;
  padding: 0 20px;
}

.orderdetail .order_right>.tupian {
  width: 100%;
  margin-top: 30px;
}

.orderdetail .order_right>.tupian img {
  width: 100%;
  display: block;
}

.jieshao {
  padding: 0 20px;
}

.jieshao .spnas {
  font-size: 18px;
  color: #000000;
  font-weight: 400;
  margin-bottom: 10px;
  display: block;
}

.jieshao p {
  font-size: 18px;
  color: #000000;
}

/* blo2_left */
.blo1 {
  margin-top: 20px;
}

.blo2 {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.blo2 .blo2_left {
  width: 150px;
  position: relative;
}

.blo2 .blo2_left::after {
  position: absolute;
  content: "";
  width: 1px;
  height: 45px;
  bottom: 7px;
  right: -25px;
  background-color: #f2f2f2;
}

.blo2 .blo2_right {
  width: 130px;
}

.blo3 {
  margin-top: 20px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 20px;
}

.blo4 {
  margin-top: 20px;
}

.blo4 .jiage {
  display: flex;
  justify-content: space-between;
}

.yingfu {
  padding: 0 20px;
  background-color: #d5b08b;
  display: flex;
  justify-content: space-between;
  height: 70px;
  align-items: center;
  margin-top: 20px;
}

.yingfu p {
  font-size: 20px;
  color: #fff;
}

.quxiao {
  padding: 0 20px;
  margin-top: 20px;
}

.quxiao p {
  font-size: 16px;
  color: #5f5f5f;
  line-height: 30px;
  text-align: justify;
}

/* 时间选择器 */
.time {
  width: 220px;
  height: 30px;
  border-bottom: 1px solid rgb(118, 118, 118);
  margin-right: 40px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
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

ol,
ul,
li {
  list-style: none;
}

.gettimePart {
  width: 100%;
  height: 100%;
  line-height: 30px;
  /* padding-left: 10px; */
  font-size: 18px;
  color: #5f5f5f;
  cursor: pointer;
}

.timePart {
  text-align: center;
  color: #333;
  line-height: 22px;
  /* background: #c0b7b7; */
  position: absolute;
  top: 40px;
  left: 10px;
  box-shadow: 2px 2px 15px #ccc;
}

.timePart p,
.timePart ul {
  background: #fff;
}

.timePart>ul>li {
  float: left;
  width: 60px;
  background: #fff;
  color: #333;
  border-right: none;
}

.timePart ul {
  overflow: hidden;
  padding-top: 5px;
}

.timePart>ul>li p {
  line-height: 30px;
  border-bottom: 1px solid #ccc;
}

.timePart ol {
  width: 60px;
  height: 250px;
  overflow-y: hidden;
  overflow-y: auto;
  overflow-x: hidden;
}

.timePart ol::-webkit-scrollbar {
  display: none;
}

.timePart ol:hover {
  overflow-y: auto;
}

.timePart ol li {
  line-height: 30px;
  text-align: center;
  width: 50px;
  height: 35px;
  line-height: 35px;
  margin: auto;
  color: #000;
}

.timePart ol li:hover {
  /* background: #7eb9ff;  */
  background: #ead7c3;
}

.timePart ol li.cur {
  background: #d5b08b;
  color: #fff;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #5f5f5f;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #5f5f5f;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #5f5f5f;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #5f5f5f;
}

/* 住客 */
.roomslist {
  margin-top: 20px;
}

.roomslist>p {
  font-size: 18px;
  color: #000000;
  font-weight: 400;
}

.roomslist>input {
  width: 325px;
  border: none;
  border-bottom: 1px solid #868686;
  font-size: 18px;
  color: #5f5f5f;
  /* padding: 0 10px; */
  box-sizing: border-box;
  height: 30px;
  outline: none;
  margin-top: 10px;
}

/* 邮箱 */
.youxiang {
  margin-top: 20px;
}

.youxiang>p {
  font-size: 18px;
  color: #000000;
  font-weight: 400;
}

.youxiang>input {
  width: 325px;
  border: none;
  border-bottom: 1px solid #868686;
  font-size: 18px;
  color: #5f5f5f;
  /* padding: 0 10px; */
  box-sizing: border-box;
  height: 30px;
  outline: none;
  margin-top: 10px;
}

/* 电话前缀+86 */
.dianhua {
  margin-top: 20px;
}

.dianhua>p {
  font-size: 18px;
  color: #000000;
  font-weight: 400;
}

.dianhua_cont {
  display: flex;
}

.dianhua_cont .phones {
  width: 325px;
  border: none;
  border-bottom: 1px solid #868686;
  font-size: 18px;
  color: #5f5f5f;
  /* padding: 0 10px; */
  box-sizing: border-box;
  height: 30px;
  outline: none;
  margin-top: 10px;
}

.phone_group {
  width: 110px;
  position: relative;
  height: 30px;
  border-bottom: 1px solid #868686;
  box-sizing: border-box;
}

.phone_group .region {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
}

.phone_group .region span {
  font-size: 18px;
  color: #000000;
  font-weight: 400;
}

.phone_group_jt {
  width: 9px;
  height: 17px;
  display: block;
  transform: rotate(-90deg);
  /* transition: all 0.5s; */
}

.phone_group_jt.active {
  transform: rotate(90deg);
}

.phone_group .dropul {
  /* height: 360px; */
  height: 0;
  overflow: hidden;
  width: 250px;
  /* width: 320px; */
  /* text-transform: lowercase; */
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
  cursor: pointer;
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

/* 预定信息 房间数量 */
.yuding .house>p {
  font-size: 18px;
  color: #000000;
  font-weight: 400;
}

.yuding .house .house_text {
  width: 200px;
  height: 30px;
  border-bottom: 1px solid rgb(118, 118, 118);
  margin-right: 40px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.yuding .house .house_text::after {
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

.yuding .house .house_text.active::after {
  transform: rotate(90deg);
}

.yuding .house .house_text .getroom {
  width: 100%;
  height: 100%;
  line-height: 30px;
  /* padding-left: 10px; */
  font-size: 18px;
  color: #5f5f5f;
  cursor: pointer;
}

.roomnums {
  width: 200px;
  text-align: center;
  color: #333;
  line-height: 22px;
  position: absolute;
  top: 40px;
  left: 0;
  background: #fff;
  box-shadow: 2px 2px 15px #ccc;
}

.roomnums ul {}

.roomnums ul li {
  line-height: 30px;
  text-align: center;
  width: 100%;
  height: 35px;
  line-height: 35px;
  margin: auto;
  color: #000;
  font-size: 18px;
}

.roomnums ul li.cur {
  background: #d5b08b;
  color: #fff;
}

.roomnums ul li:hover {
  background: #ead7c3;
}

.reserve {
  display: flex;
  align-items: center;
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

.riqi .blockriqi {
  position: relative;
}

.hotel_riqi {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  width: 590px;
}

.hotel_riqi .blocks {
  /* position: relative; */
}

.hotel_riqi .blotext {
  font-size: 18px;
  color: #000000;
  height: 30px;
}

.hotel_riqi .contbox {
  height: 30px;
  background-color: #fff;
  /* border-bottom: 1px solid #b0b0b0; */

  border-bottom: 1px solid rgb(118, 118, 118);
  padding-left: 19px;
  padding-right: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
}

.jiwan {
  border: none !important;
}

.hotel_riqi .contbox>p {
  font-size: 18px;
  color: #5f5f5f;
}

.hotel_riqi .contbox>img {
  width: 9px;
  height: 5px;
}

/* 日期 */
.hotel_riqi .contbox.checkin {
  width: 200px;
}

.hotel_riqi .contbox.checkin .rilimg {
  width: 16px;
  height: 17px;
  display: block;
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
  width: 800px;
  padding: 30px;
  /* height: 500px; */
}

.erweima_title {
  color: #6b6a6a;
  font-size: 25px;
  text-align: center;
}

#qrcode {
  width: 300px;
  margin: auto;
  margin-top: 30px;
}

#qrcode img {
  margin: auto;
}

.erweima_text {
  margin: auto;
  text-align: center;
  font-size: 20px;
  color: #6b6a6a;
}

.erweima_text img {
  margin: auto;
}

.retunrnindex {
  font-size: 20px;
  color: #6b6a6a;
  margin: auto;
  text-align: center;
  border: 1px solid #6b6a6a;
  width: 150px;
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 30px;
}

.retunrnindex:hover {
  background: #a1a1a1;
  border: 1px solid #a1a1a1;
  color: #fff;
}

.windows1 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
}

.windows1 .wintext {
  width: 800px;
  margin: auto;
  background-color: #fff;
  box-sizing: border-box;
  padding: 30px;
}

.windows1 .wintext span {
  font-size: 25px;
  color: #000;
}

.windows1 .wintext p {
  font-size: 20px;
  line-height: 30px;
  margin-top: 20px;
}
</style>
