<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="conts_top">
        <img loading="lazy" :src="Baseurl + infolist[0].pc_image" alt="">
        <p>{{ infolist[0].title }}</p>
      </div>
      <div class="crumbs">
        <p>您的位置：首页 > {{ infolist[0].title }}</p>
      </div>
      <div class="ambitus">
        <div class="main">
          <div class="huiyuan">
            <div class="huiyuan_text" v-html="infolist[0].pc_content">
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
      infolist: [],
    };
  },
  created() {
    // 储存第几个头部状态
    localStorage.setItem("istrue", 0);
    this.infolist = JSON.parse(localStorage.getItem("foot_module"))
    console.log(this.infolist)
  },
  methods: {

  },
  mounted() { },
};
</script>
<style scoped>
.ambitus {
  width: 100%;
  background-color: #efefed;
}

.huiyuan {
  width: 100%;
  background: #fff;
  padding: 35px 0;
}

.huiyuan .huiyuan_text {
  width: 1280px;
  margin: auto;
}

.huiyuan .huiyuan_text p {
  font-size: 18px;
  color: #000000;
  line-height: 30px;
  text-align: justify;
}

.huiyuan .huiyuan_text img {
  max-width: 100%;
}

.huiyuan .huiyuan_text /deep/ {
  font-size: 18px;
  line-height: 30px;
  font-family: siyuan !important;
  line-height: 2;
}

.huiyuan .huiyuan_text /deep/ img {
  max-width: 100%;
  margin: auto;
}
</style>