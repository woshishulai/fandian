<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="meal_top">
        <img :src="Baseurl+img" alt="" />
        <p></p>
      </div>
      <!-- <div class="crumbs">
        <p>您的位置：首页 > 详情</p>
      </div> -->
      <!-- v-if="xinxilist==[]" -->
      <div class="ambitus" v-if="xinxilist.length==0">
        <div class="main">
          <div class="huiyuan">
            <div class="huiyuan_text">
              <p class="bigtitle">{{ infolist.title }}</p>
              <div v-html="infolist.pc_content"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="ambitus" v-if="xinxilist.length!=0">
        <div class="main">
          <div class="huiyuan">
            <div class="huiyuan_text">
              <p class="bigtitle">使用条款</p>
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
import Header from "../owned/header.vue";
import Footer from "../owned/footer.vue";
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
      img:'',
      xinxilist:[]
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
    
    if(this.$route.query.detailsId && this.$route.query.detailsId!=''){
      this.detailsId = this.$route.query.detailsId;
      this.img = this.$route.query.img
      this.getdatalist();
      console.log("this.getdatalist")
    }
    else{
      this.wenben()
      console.log("this.wenben")
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
          console.log(that.xinxilist)
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
          that.xinxilist= res.data.data.top_module_list[1]; //住宿的
          that.img = that.xinxilist.mobile_image
          console.log( that.xinxilist);
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {},
};
</script>
<style scoped>
 .meal_top {
        width: 100%;
        height: 48vw;
        position: relative;
    }

    .meal_top img {
        width: 100%;
        height: 100%;
        display: block;
    }
.ambitus {
  width: 100%;
  background-color: #efefed;
  padding-top: 5vw;
}

.huiyuan {
  width: 100%;
  background: #fff;
  padding: 3vw 0;
  
}
.huiyuan .huiyuan_text {
  width: 100%;
  margin: auto;
  font-size: 4.2vw;
  box-sizing: border-box;
  padding: 0 3vw;
}
.huiyuan .bigtitle {
  font-size: 5vw !important;
  font-weight: 400;
  color: #000000;
  text-align: center;
  margin: 3vw 0;
}
.huiyuan .huiyuan_text p {
  font-size: 4.2vw;
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

.huiyuan .huiyuan_text /deep/{
  font-size: 4.2vw;
  line-height: 7vw;
  font-family: siyuan !important;
}
.huiyuan .huiyuan_text /deep/ img{
  max-width: 100%;
  margin: 4vw auto !important;
  display: block;
  /* margin: auto; */
}
</style>