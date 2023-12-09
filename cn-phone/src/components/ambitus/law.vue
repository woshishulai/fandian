<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
        <div class="conts_top">
            <img :src="Baseurl+infolist[2].mobile_image" alt="">
            <p>{{infolist[2].title}}</p>
        </div>
      <div class="ambitus">
        <div class="main">
          <div class="huiyuan">
            <div class="huiyuan_text" v-html="infolist[2].pc_content">
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
      infolist:[],
    };
  },
  created() {
    // 储存第几个头部状态
    localStorage.setItem("istrue", 0);
    this.infolist = JSON.parse(localStorage.getItem("foot_module"))
  },
  methods: {
    
  },
  mounted() {},
};
</script>
<style scoped>

.ambitus {
  width: 100%;
  /* background-color: #efefed; */
}

.huiyuan {
  width: 100%;
  /* background: #fff; */
  padding: 4.667vw 0;
}
.huiyuan .huiyuan_text {
  width: 100%;
  margin: auto;
}
.huiyuan .huiyuan_text p {
  font-size: 3.8vw;
  color: #000000;
  line-height: 6.5vw;
  text-align: justify;
}
.huiyuan .huiyuan_text img {
  max-width: 100%;
}
.huiyuan .huiyuan_text /deep/ {
  font-size: 4.2vw !important;
  line-height: 8vw !important;
  font-family: siyuan !important;
}
.huiyuan .huiyuan_text /deep/ p{
  font-size: 4.2vw !important;
  line-height: 8vw !important;
  font-family: siyuan !important;
  line-height: 2;
}
.huiyuan .huiyuan_text /deep/ img{
  max-width: 100%;
  margin: auto;
}
</style>