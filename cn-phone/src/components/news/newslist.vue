<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="newslist">
        <div class="main">
          <div class="title">新闻动态</div>
          <div class="newslist_lunbo">
            <div class="news_list" v-for="(itemMsg,indexMsg) in infolist" :key="indexMsg" @click="newsdeatil(itemMsg.id)">
              <div class="newslist_img">
                <!-- <img src="../../assets/img/new1.jpg" alt="" /> -->
                <img :src="Baseurl+itemMsg.pc_image" alt="">
              </div>
              <div class="newslist_version">
                <div class="version_eara">
                  <p class="time">
                    <span class="time1">{{itemMsg.updated_at.slice(5,7)}}/{{itemMsg.updated_at.slice(8,10)}}</span>
                    <span class="time2">{{itemMsg.updated_at.slice(0,4)}}</span>
                  </p>
                  <p class="vertext">
                    {{itemMsg.title}}
                  </p>
                </div>
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
  import Header from "../owned/header.vue";
  import Footer from "../owned/footer.vue";
  export default {
    components: {
      Header,
      Footer,
    },
    data() {
      return {
        token: '',//token
        hotel_id: '',//酒店id
        modularid: '',//模块id
        infolist: '',
        name: '',
        id:''
      };
    },
    created() {
      // 储存第几个头部状态
      localStorage.setItem("istrue", 0);
      this.token = sessionStorage.getItem("token");
      // console.log(this.token);
      this.hotel_id = sessionStorage.getItem("hotel_id");
      // if (sessionStorage.getItem("fieldData")) {
      //   var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
      //   this.modularid = fieldData[4].id
      // }
      this.id = this.$route.query.id
      this.getinfolist()
    },
    methods: {
      getinfolist() {
        var that = this;
        that.$axios
            .post(
            `${this.Baseurl}public_header?web_token=${that.token}&hotel_id=${that.hotel_id}`
            )
            .then(function (res) {
            console.log(res);
            // that.menulist = res.data.data.top_module_list;
            // console.log(that.menulist)
            const fieldData = res.data.data.top_module_list;
            that.modularid = fieldData[4].id
            sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
            that.getdatalist()
            })
            .catch((err) => console.log(err));
    },
      getdatalist() {
        var that = this
        that.$axios
          // &module_id=3
          .post(`${this.Baseurl}news_list?web_token=${that.token}&hotel_id=${that.hotel_id}&id=${that.id}`)
          .then(function (res) {
            console.log(res)
            // that.name = res.data.data.news.name
            that.infolist =  res.data.data
            // console.log(that.infolist)
          }).catch(err => console.log(err));
      },
      //去新闻详情页
      newsdeatil(id) {
        // this.$router.push('/newsdetail');
        this.$router.push({
          name: 'NewsDetail',
          query: {
            newsId: id,
            id:this.id
            // module_id:this.modularid
          }
        })
      },
    },
    mounted() { },
  };
</script>
<style scoped>
  .newslist {
    background-color: #efefed;
  }

  .newslist .title {
    font-size: 5vw;
    color: #000000;
    /* text-align: center; */
    font-weight: 400;
    padding: 5.333vw 0;
  }

  /* efefed */
  .newslist_lunbo {
    position: relative;
    padding-bottom: 1px;
  }

  .news_list {
    background-color: #fff;
    margin-bottom: 5.333vw;
  }

  .news_list .newslist_img {
    /* width: 545px;
    height: 360px;
    width: 670px;
    height: 335px; */
    width: 89.333vw;
    height: 44.667vw;
    overflow: hidden;
  }

  .news_list .newslist_img img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .newslist_version {
    width: 78.933vw;
    margin: auto;
    box-sizing: border-box;
    justify-content: center;
    padding: 4.667vw 0;
  }

  .newslist_version .version_eara {
    width: 100%;
  }

  .newslist_version .version_eara .time {
    font-size: 3.5vw;
    font-family: Arial;
    color: #a8916f;

  }

  .newslist_version .version_eara .time .time1 {
    font-size: 4.3vw;
  }

  .newslist_version .version_eara .time .time2 {
    font-size: 3.2vw;
    margin-left: 1vw;
  }


  .newslist_version .version_eara .vertext {
    margin-top: 10px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 4vw;
    color: #666666;
    line-height: 6vw;
    height: 11.5vw;
  }

  /* .newslist_version .version_eara .news_detail {
        margin-top: 15px;
        float: right;
        width: 125px;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #a8916f;
        text-align: center;
    } */

  /* .news_list:hover {
        box-shadow: 0 0 6px 1px #d6d5d5;
    }

    .news_list:hover .newslist_img img {
        transform: scale(1.2);
    }

    .news_list:hover .news_detail {
        color: #fff;
        background-color: #d5b08b;
    } */
</style>