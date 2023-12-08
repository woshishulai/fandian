<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="meal_top">
        <img loading="lazy" :src="Baseurl + img" alt="">
        <p></p>
      </div>
      <div class="crumbs">
        <p>Your location: Home > Details</p>
      </div>
      <div class="ambitus" v-if="xinxilist.length == 0">
        <div class="main">
          <div class="huiyuan">
            <div class="huiyuan_text">
              <p class="bigtitle">{{ infolist.title }}</p>
              <div v-html="infolist.pc_content"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="ambitus" v-if="xinxilist.length != 0">
        <div class="main">
          <div class="huiyuan">
            <div class="huiyuan_text">
              <p class="bigtitle">Terms & Conditions</p>
              <div v-html="xinxilist.description2"></div>
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
      token: "", //token
      hotel_id: "", //酒店id
      modularid: "", //模块id
      infolist: [],
      detailsId: "",
      img: '',
      xinxilist: []
    };
  },
  created() {
    // 储存第几个头部状态
    localStorage.setItem("istrue", 0);
    //detailsId
    this.token = sessionStorage.getItem("token");
    // console.log(this.token);
    this.hotel_id = sessionStorage.getItem("hotel_id");

    if (sessionStorage.getItem("fieldData")) {
      var fieldData = JSON.parse(sessionStorage.getItem("fieldData"));
      this.modularid = fieldData[1].id;
    }
    localStorage.getItem('detailsId')
    if (localStorage.getItem('detailsId') && localStorage.getItem('detailsId') != '') {
      this.detailsId = localStorage.getItem('detailsId');
      this.img = localStorage.getItem('img')
      this.getdatalist();
    }
    else {
      this.wenben()
    }

  },
  methods: {
    getdatalist() {
      //?web_token=${that.token}&hotel_id=1
      var that = this;
      console.log(that.token);
      console.log(that.hotel_id);
      console.log(that.detailsId);
      that.$axios
        // &module_id=3
        .post(
          `${this.Baseurl}new_details?web_token=${that.token}&hotel_id=${that.hotel_id}&new_id=${that.detailsId}`
        )
        .then(function (res) {
          console.log(res);
          // console.log(res.data.data.new_details);
          that.infolist = res.data.data.new_details;
        })
        .catch((err) => console.log(err));
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
          // this.img = this.$route.query.img
          that.xinxilist = res.data.data.top_module_list[1]; //住宿的
          that.img = that.xinxilist.pc_image
          console.log(that.xinxilist);
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

.ambitus {
  width: 100%;
  background-color: #efefed;
}

.huiyuan {
  width: 100%;
  background: #fff;
  padding: 64px 0;
}

.huiyuan .huiyuan_text {
  width: 1100px;
  margin: auto;
  font-size: 18px;
}

.huiyuan .bigtitle {
  font-size: 30px !important;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 30px;
}

.huiyuan .huiyuan_text p {
  font-size: 18px;
}

.huiyuan .huiyuan_text img {
  max-width: 100%;
}

.huiyuan .huiyuan_text /deep/ p,
.huiyuan .huiyuan_text /deep/ span {
  /* font-size: 18px; */
  font-family: siyuan !important;
  background: none !important;
}

.huiyuan .huiyuan_text /deep/ {
  font-size: 18px;
  line-height: 30px;
  font-family: siyuan !important;
}

.huiyuan .huiyuan_text /deep/ img {
  max-width: 100%;
  margin: 20px auto !important;
  display: block;
  /* margin: auto; */
}
</style>