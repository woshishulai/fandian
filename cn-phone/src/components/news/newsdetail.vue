<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="news">
        <div class="details">
          <!-- <div class="newszuo"> -->
          <div class="newszuo_title">
                {{ meallist.title }}
          </div>
          <div class="main">
            <div class="tishi">
              <span class="time">{{ meallist.updated_at }}</span>
            </div>
            <div class="newszuo_text" ref="ziti" v-html="meallist.pc_content">
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
import Header from "../owned/header.vue";
import Footer from "../owned/footer.vue";
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

      boxIndex: "", //当前是第几个进来的
      meallist: [], //当前的列表
    };
  },
  created() {
    // 储存第几个头部状态
    localStorage.setItem("istrue", 0);
    this.token = sessionStorage.getItem("token");
    // console.log(this.token);
    this.hotel_id = sessionStorage.getItem("hotel_id");
    this.newsId = this.$route.query.newsId;
    this.id = this.$route.query.id;
    console.log(this.newsId);
    // if (sessionStorage.getItem("fieldData")) {
    //   var fieldData = JSON.parse(sessionStorage.getItem("fieldData"));
    //   this.modularid = fieldData[4].id;
    // }
    // //
    this.getinfolistALL()
  },
  methods: {
    getinfolistALL() {
        var that = this;
        that.$axios
            .post(
            `${this.Baseurl}public_header?web_token=${that.token}&hotel_id=${that.hotel_id}`
            )
            .then(function (res) {
            console.log("113",res);
            // that.menulist = res.data.data.top_module_list;
            // console.log(that.menulist)
            const fieldData = res.data.data.top_module_list;
            that.modularid = fieldData[4].id
            sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
            that.getdatalist();
            })
            .catch((err) => console.log(err));
    },
    
    getinfolist() {
      //?web_token=${that.token}&hotel_id=1
      var that = this;
      that.$axios
        // &module_id=3
        .post(
          `${this.Baseurl}new_details?web_token=${that.token}&hotel_id=${that.hotel_id}&new_id=${that.newsId}`
        )
        .then(function (res) {
          console.log(res);
          that.meallist = res.data.data.new_details
          // that.infolist = res.data.data.news.news;
          // for (let i = 0; i < that.infolist.length; i++) {
          //   if (that.infolist[i].id == that.newsId) {
          //     that.boxIndex = i;
          //   }
          // }
          // that.meallist = that.infolist[that.boxIndex];
          // console.log(that.meallist);
        })
        .catch((err) => console.log(err));
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
          console.log("--------------",res);
          that.meallist = res.data.data.new_details
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {},
};
</script>
<style scoped>

.news {
  background-color: #efefed;
}
.details {
  background-color: #fff;
  /* padding-top: 40px; */
  width: 100%;
  /* padding: 0 13px; */
  /* padding-bottom: 45px; */
}

.details .newszuo_title {
  padding: 5.333vw;
  font-size: 5.3vw;
  color: #000000;
  text-align: center;
  font-weight: 400;
  background-color: #efefed;
}
.details .tishi {
  width: 100%;
  padding: 4.000vw 0;
}
.details .tishi .time {
  font-size: 3.5vw;
  color: #666666;
  display: block;
}
.details .newszuo_text {
  width: 100%;
  margin: auto;
  /* margin-top: 10px; */
  font-size: 4.2vw;
  color: #000000;
  text-indent: 2em;
  line-height: 8vw;
}
/* .details .newszuo_text p {
  margin-bottom: 5.667vw;
  line-height: 8vw;
}
.details .newszuo_text img {
  margin-bottom: 5.667vw;
  max-width: 100%;
} */

.details  .newszuo_text /deep/ p,.details  .newszuo_text /deep/ span{
  /* line-height: 40px; */
  font-size: 4.2vw !important;
  line-height: 8vw !important;
  font-family: siyuan !important;
}
.details  .newszuo_text /deep/ img{
  margin: 5.667vw 0;
  max-width: 100%;
}
.details  .newszuo_text /deep/ p  img{
  margin: 5.667vw 0;
  max-width: 100%;
  display: block;
}


</style>
