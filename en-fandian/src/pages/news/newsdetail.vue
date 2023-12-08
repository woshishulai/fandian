<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="crumbs">
        <p>Your location: Home > News</p>
      </div>
      <div class="news">
        <div class="main">
          <div class="details">
            <div class="newszuo">
              <div class="newszuo_title">
                {{ meallist.title }}
              </div>
              <div class="tishi">
                <span class="time">{{ meallist.updated_at }}</span>
                <span class="jian" @click="jian()">A</span>
                <span class="jia" @click="jia()">A</span>
              </div>
              <div class="newszuo_text" ref="ziti" v-html="meallist.pc_content">
              </div>
            </div>
            <div class="newsyou">
              <div class="newsyou_list" @click="qiehuan(mealuplist.id)">
                <span class="newsyou_list_tit">In the previous</span>
                <span class="time">{{ mealuplist.updated_at }}</span>
                <p>{{ mealuplist.title }}</p>
              </div>
              <div class="newsyou_list" @click="qiehuan(mealdownlist.id)">
                <span class="newsyou_list_tit">The next article</span>
                <span class="time">{{ mealdownlist.updated_at }}</span>
                <p>{{ mealdownlist.title }}</p>
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
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      sz: 18,
      token: "", //token
      hotel_id: "", //酒店id
      modularid: "", //模块id
      infolist: "",
      new_id: "",
      newsId: "",

      newslist: [], //上页储存的所有列表
      boxupIndex: "", //上一个是第几个
      boxIndex: "", //当前是第几个进来的
      boxdownIndex: "", //下一个是第几个
      mealuplist: [], //上一个列表
      meallist: [], //当前的列表
      mealdownlist: [], //下一个列表

      id: "",
    };
  },
  created() {
    // 储存第几个头部状态
    localStorage.setItem("istrue", 0);
    this.token = sessionStorage.getItem("token");
    // console.log(this.token);
    this.hotel_id = sessionStorage.getItem("hotel_id");
    this.newsId = localStorage.getItem('newsId')
    this.id = localStorage.getItem('id')
    console.log(this.newsId);
    // if (sessionStorage.getItem("fieldData")) {
    //   var fieldData = JSON.parse(sessionStorage.getItem("fieldData"));
    //   this.modularid = fieldData[4].id;
    // }
    //
    this.getinfolistALL()
  },
  inject: ["reload"],
  methods: {
    getinfolistALL() {
      var that = this;
      that.$axios
        .post(
          `${this.Baseurl}public_header?web_token=${that.token}&hotel_id=${that.hotel_id}`
        )
        .then(function (res) {
          console.log("113", res);
          // that.menulist = res.data.data.top_module_list;
          // console.log(that.menulist)
          const fieldData = res.data.data.top_module_list;
          that.modularid = fieldData[4].id
          sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
          that.getdatalist();
        })
        .catch((err) => console.log(err));
    },
    // getinfolist2() {
    //   //?web_token=${that.token}&hotel_id=1
    //   var that = this;
    //   that.$axios
    //     // &module_id=3
    //     .get(
    //       `${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`
    //     )
    //     .then(function (res) {
    //       console.log(res);
    //       that.infolist = res.data.data.news.news;
    //       // console.log(that.infolist);
    //       // console.log(that.newsId);
    //       for (let i = 0; i < that.infolist.length; i++) {
    //         if (that.infolist[i].id == that.newsId) {
    //           console.log(i);
    //           that.boxIndex = i;
    //         }
    //       }
    //       if (that.boxIndex == 0) {
    //         that.boxupIndex = that.infolist.length - 1;
    //         that.boxdownIndex = parseInt(that.boxIndex) + 1;
    //       } else if (that.boxIndex == that.infolist.length - 1) {
    //         that.boxupIndex = parseInt(that.boxIndex) - 1;
    //         that.boxdownIndex = 0;
    //       } else {
    //         that.boxupIndex = parseInt(that.boxIndex) - 1;
    //         that.boxdownIndex = parseInt(that.boxIndex) + 1;
    //       }
    //       that.meallist = that.infolist[that.boxIndex];
    //       that.mealuplist = that.infolist[that.boxupIndex];
    //       that.mealdownlist = that.infolist[that.boxdownIndex];
    //       // console.log("上" + that.boxupIndex);
    //       // console.log("当前" + that.boxIndex);
    //       // console.log("下" + that.boxdownIndex);

    //       console.log(that.meallist);
    //     })
    //     .catch((err) => console.log(err));
    // },
    getinfolist() {
      var that = this;
      that.$axios
        .post(
          `${this.Baseurl}news_list?web_token=${that.token}&hotel_id=${that.hotel_id}&id=${that.id}`
        )
        .then(function (res) {
          console.log("news_list---", res);
          // that.name = res.data.data.news.name
          that.infolist = res.data.data;
          console.log(that.infolist)
          for (let i = 0; i < that.infolist.length; i++) {
            if (that.infolist[i].id == that.newsId) {
              console.log(i);
              that.boxIndex = i;
            }
          }
          if (that.boxIndex == 0) {
            that.boxupIndex = that.infolist.length - 1;
            that.boxdownIndex = parseInt(that.boxIndex) + 1;
          } else if (that.boxIndex == that.infolist.length - 1) {
            that.boxupIndex = parseInt(that.boxIndex) - 1;
            that.boxdownIndex = 0;
          } else {
            that.boxupIndex = parseInt(that.boxIndex) - 1;
            that.boxdownIndex = parseInt(that.boxIndex) + 1;
          }
          // that.meallist = that.infolist[that.boxIndex];
          that.mealuplist = that.infolist[that.boxupIndex];
          that.mealdownlist = that.infolist[that.boxdownIndex];
        })
        .catch((err) => console.log(err));
    },
    //字号加大
    jia() {
      this.sz = this.sz + 1;
      this.$refs.ziti.style.fontSize = this.sz + "px";
      // txt.style.fontSize = sz + 'px';
    },
    //字号减小
    jian() {
      this.sz = this.sz - 1;
      this.$refs.ziti.style.fontSize = this.sz + "px";
    },
    // 切换新闻
    qiehuan(id) {
      this.newsId = id
      this.getinfolist();
      this.getdatalist();
    },
    getdatalist() {
      //?web_token=${that.token}&hotel_id=1
      var that = this;
      that.$axios
        // &module_id=3
        .post(
          `${this.Baseurl}new_details?web_token=${that.token}&hotel_id=${that.hotel_id}&new_id=${that.newsId}`
        )
        .then(function (res) {
          console.log("--------------", res);
          that.meallist = res.data.data.new_details
        })
        .catch((err) => console.log(err));
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

.news {
  background-color: #efefed;
}

.details {
  display: flex;
  /* padding: 0 13px; */
  background-color: #fff;
  padding-top: 40px;
}

.details .newszuo {
  width: 1090px;
  padding: 0 13px;
  border-right: 1px solid #eaeaea;
  padding-bottom: 45px;
}

.details .newszuo .newszuo_title {
  padding: 40px 43px;
  padding-top: 0;
  font-size: 30px;
  color: #000000;
  text-align: center;
  font-weight: 400;
}

.details .newszuo .tishi {
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
}

.details .newszuo .tishi .time {
  font-size: 18px;
  color: #000000;
  margin-right: 35px;
  display: block;
}

.details .newszuo .tishi .jian {
  font-size: 18px;
  color: #000000;
  position: relative;
  margin-right: 37px;
  cursor: pointer;
}

.details .newszuo .tishi .jian::after {
  position: absolute;
  content: "-";
  top: -14px;
  right: -11px;
  z-index: 1;
  font-size: 28px;
}

.details .newszuo .tishi .jia {
  font-size: 18px;
  color: #000000;
  position: relative;
  margin-right: 37px;
  cursor: pointer;
}

.details .newszuo .tishi .jia::after {
  position: absolute;
  content: "+";
  top: -2px;
  right: -10px;
  z-index: 1;
  font-size: 16px;
}

.details .newszuo .newszuo_text {
  width: 1000px;
  margin: auto;
  margin-top: 30px;
  font-size: 18px;
  color: #000000;
  text-indent: 2em;
}

.details .newszuo .newszuo_text /deep/ p,
.details .newszuo .newszuo_text /deep/ span {
  line-height: 40px;
  font-size: 18px !important;
  font-family: siyuan !important;
}

.details .newszuo .newszuo_text p {
  margin-top: 40px;
}

.details .newszuo .newszuo_text img {
  margin-top: 40px;
  max-width: 100%;
}

.details .newszuo .newszuo_text /deep/ img {
  margin-top: 40px;
  max-width: 100%;
  display: block !important;
  margin: auto !important;
}

.newsyou {}

.newsyou_list {
  width: 222px;
  margin-bottom: 45px;
  padding-left: 32px;
  position: relative;
  cursor: pointer;
}

.newsyou_list::before {
  position: absolute;
  content: "";
  width: 13px;
  height: 17px;
  top: 12px;
  left: 0;
  z-index: 1;
  background-color: #eaeaea;
}

.newsyou_list .newsyou_list_tit {
  display: block;
  font-size: 24px;
  color: #000000;
  font-weight: 400;
}

.newsyou_list .time {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  color: #000000;
}

.newsyou_list p {
  display: block;
  margin-top: 10px;
  font-size: 18px;
  color: #000000;
}


/* <div class="newsyou_list">
                  <span class="newsyou_list">下一篇</span>
                  <span class="time">2022.0.10</span>
                  <p>荣耀时刻 | 北京华侨大厦睿世酒店喜获甄选期待新开业酒店奖</p>
              </div> */
</style>
