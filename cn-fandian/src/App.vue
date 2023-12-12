<template>
  <div id="app">
    <router-view v-if="isReactive"></router-view>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <!-- <router-view /> -->
  </div>
</template>
<script>
export default {
  // components: {
  //   Swiper
  //     },
  //     name: "Swiper",
  //     data() {
  //         return {
  //             menushow:false,
  //         };
  // },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      token: "",
      routerState: true,
      isReactive: true,
      hotelist: "",
      hotelcode: "",
      city: [],
      mudiIndex: "",
      mudiIndexnum1: "",
      mudiIndexnum2: "",
      city_centry: "",
    };
  },
  created() {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile && !window.location.href.includes("/phone")) {
      console.log("跳转");
      // window.location.href = window.location.href + 'phone/#/';
      window.location.href = "https://grand.empark.com.cn/" + "phone/#/";
      // window.open('https://grand.empark.com.cn/phone/');
      // const newPageUrl = 'https://grand.empark.com.cn/phone/#/';
      // const newPage = window.open(newPageUrl);
      // newPage.onload = function () {
      //   window.close();
      // };
      return;
    }
    // localStorage.clear();
    // if (sessionStorage.getItem("hotelcode") && sessionStorage.getItem("hotelcode") != '') {
    this.gettoken();
    setTimeout(() => {
      this.reload();
      this.gettoken();
    }, 1500);
    this.goOrther();
  },
  methods: {
    goOrther() {
      var is_mobi =
        navigator.userAgent
          .toLowerCase()
          .match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
          ) != null;
      if (is_mobi) {
        // 如果是移动端就跳转到移动端地址
        //http://zs.sc798.com/fandian/#/rooms
        // let params = new URL(window.location.href).hash;   // new URL 可以得到相关的地址详情
        // let baseurl = "https://grand.empark.com.cn/web/" + params;   // 测试接口
        // window.location.href = baseurl;
        let params = new URL(window.location.href).hash;
        let test = window.location.href;
        let arr = test.split("fandian/");
        let baseurl = arr.join("web/"); // 测试接口
        window.location.href = baseurl;
      } else {
        // let a = "https://grand.empark.com.cn/fandian/#/"
        // let b = a.split('fandian/');
        // let c = b.join('web/');
        // console.log(c)
      }
    },
    reload() {
      this.isReactive = false;
      this.$nextTick(() => {
        this.isReactive = true;
      });
    },
    gettoken() {
      var that = this;
      that.$axios
        .post(`${this.Baseurl}/hotel_state_token`)
        .then(function (res) {
          sessionStorage.setItem("token", res.data.token);
          that.token = res.data.token;
          // that.getlist();
          that.getdiqulist();
        })
        .catch((err) => console.log(err));
    },
    //获取酒店id
    getlist() {
      //http://ssjydfd.sc798.com/hotel_list
      var that = this;
      that.$axios
        .get(`${this.Baseurl}hotel_list?web_token=${that.token}`)
        .then(function (res) {
          that.hotelist = res.data.data;
          // // console.log("获取到index", sessionStorage.getItem("hotel_index_data"))
          // if (
          //   sessionStorage.getItem("hotel_index_data") != null &&
          //   sessionStorage.getItem("hotel_index_data") != ""
          // ) {
          //   for (let i = 0; i < that.hotelist.length; i++) {
          //     if (
          //       that.hotelist[i].id ==
          //       sessionStorage.getItem("hotel_index_data")
          //     ) {
          //       var index_data = parseInt(i);
          //     }
          //   }
          //   // console.log("index_data",index_data)
          //   //  var index_data = parseInt(sessionStorage.getItem("hotel_index_data"))
          //   //     sessionStorage.setItem("hotel_id", that.hotelist[index_data].id);
          //   sessionStorage.setItem(
          //     "hotelcode",
          //     that.hotelist[index_data].hotel_code
          //   );
          //   sessionStorage.setItem("codesh", that.hotelist[index_data].code);
          //   // console.log(sessionStorage.getItem("codesh"))
          //   sessionStorage.setItem(
          //     "hotelname",
          //     that.hotelist[index_data].hotel_name
          //   );
          //   sessionStorage.setItem("dituxinxi", JSON.stringify(that.hotelist[index_data]))
          //   that.hotel_id = that.hotelist[index_data].id;
          //   that.hotelcode = that.hotelist[index_data].hotel_code;
          // } else {
          //   sessionStorage.setItem("hotel_id", that.hotelist[0].id);
          //   sessionStorage.setItem("hotelcode", that.hotelist[0].hotel_code);
          //   sessionStorage.setItem("codesh", that.hotelist[0].code);
          //   // console.log(sessionStorage.getItem("codesh"))
          //   sessionStorage.setItem("hotelname", that.hotelist[0].hotel_name);
          //   sessionStorage.setItem("dituxinxi", JSON.stringify(that.hotelist[0]))
          //   that.hotel_id = that.hotelist[0].id;
          //   that.hotelcode = that.hotelist[0].hotel_code;
          // }
          sessionStorage.setItem("hotel_id", that.hotelist[0].id);
          sessionStorage.setItem("hotelcode", that.hotelist[0].hotel_code);
          sessionStorage.setItem("codesh", that.hotelist[0].code);
          // console.log(sessionStorage.getItem("codesh"))
          sessionStorage.setItem("hotelname", that.hotelist[0].hotel_name);
          sessionStorage.setItem("dituxinxi", JSON.stringify(that.hotelist[0]));
          that.hotel_id = that.hotelist[0].id;
          that.hotelcode = that.hotelist[0].hotel_code;
          that.getinfolist();
        })
        .catch((err) => console.log(err));
    },
    //获取头部信息
    getinfolist() {
      // if(this.web_token==null || this.hotel_id==null){
      //     this.reload();
      // }
      var that = this;
      that.$axios
        .post(
          `${this.Baseurl}public_header?web_token=${that.token}&hotel_id=${that.hotel_id}`
        )
        .then(function (res) {
          that.menulist = res.data.data.top_module_list;
          // console.log(that.menulist)
          const fieldData = that.menulist;
          sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
        })
        .catch((err) => console.log(err));
    },
    getdiqulist() {
      var that = this;
      that.$axios
        .get(`${this.Baseurl}hotel_new?web_token=${that.token}`)
        .then(function (res) {
          that.city = res.data.data;
          if (
            localStorage.getItem("mudiIndex") &&
            localStorage.getItem("mudiIndex") != "" &&
            localStorage.getItem("mudiIndexnum1")
          ) {
            that.mudiIndex = localStorage.getItem("mudiIndex");
            that.mudiIndexnum1 = localStorage.getItem("mudiIndexnum1");
            that.mudiIndexnum2 = localStorage.getItem("mudiIndexnum2");
            that.city_centry = that.city[that.mudiIndexnum1];

            sessionStorage.setItem(
              "hotel_id",
              that.city[that.mudiIndexnum1][that.mudiIndexnum2].id
            );
            sessionStorage.setItem(
              "hotelcode",
              that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_code
            );
            sessionStorage.setItem(
              "codesh",
              that.city[that.mudiIndexnum1][that.mudiIndexnum2].code
            );
            sessionStorage.setItem(
              "hotelname",
              that.city[that.mudiIndexnum1][that.mudiIndexnum2].hotel_name
            );
            sessionStorage.setItem(
              "dituxinxi",
              JSON.stringify(that.city[that.mudiIndexnum1][that.mudiIndexnum2])
            );
          } else {
            that.city_centry = that.city["北京"];
            that.mudiIndex = that.city["北京"][0].hotel_name;
            that.mudiIndexnum1 = "北京";
            that.mudiIndexnum2 = 0;
            // that.jiudianid = that.city["北京"][0].id;
            localStorage.setItem("mudiIndex", that.mudiIndex);
            // localStorage.setItem("jiudianid", that.jiudianid);
            localStorage.setItem("mudiIndexnum1", "北京");
            localStorage.setItem("mudiIndexnum2", 0);

            sessionStorage.setItem("hotel_id", that.city["北京"][0].id);
            sessionStorage.setItem(
              "hotelcode",
              that.city["北京"][0].hotel_code
            );
            sessionStorage.setItem("codesh", that.city["北京"][0].code);
            sessionStorage.setItem(
              "hotelname",
              that.city["北京"][0].hotel_name
            );
            sessionStorage.setItem(
              "dituxinxi",
              JSON.stringify(that.city["北京"][0])
            );
          }
        })
        .catch((err) => console.log(err));
    },
    //dituxinxi
    //利用$nextTick特性，router跳转完成后展示页面
    // reload(){
    // 	this.routerState = false;
    // 	this.$nextTick(()=>{
    // 	this.routerState = true;
    // 	})
    // }
  },

  mounted() {
    cx();
    // if (navigator.userAgent.indexOf("Firefox") != -1) {
    //   document.querySelector(".logins").style.position = "absolute"
    //       document.querySelector(".login").style.top = "400px"
    //       document.querySelector(".login").style.maginTop = "0px"
    // }

    function cx() {
      var Wth = document.documentElement.clientWidth;
      if (Wth < 1920) {
        // console.log(document.querySelector(".quanping"))
        var app = document.querySelector("#app");
        if (navigator.userAgent.indexOf("Firefox") != -1) {
          // app.style.width = "1920px";
          // document.documentElement.style.transform =
          //   "scale(" + Wth / 1920 + ")";
          // // document.body.style.overflow = "hidden";
          // document.documentElement.style.transformOrigin = "left top 0px";
          // // if(document.querySelector(".quanping")){
          // //   app.style.width="1920px"
          // //   document.documentElement.style.transform = "scale(" + Wth / 1920 + ")";
          // //   // document.body.style.overflow = "hidden";
          // //   document.documentElement.style.transformOrigin = "left top 0px";
          // // }else{
          // //   app.style.width="100%"
          // // }
          // //判断当前浏览器是否是火狐浏览器
          // document.querySelector(".logins").style.position = "absolute !important"
          // document.querySelector(".login").style.top = "400px !important"
          // document.querySelector(".login").style.maginTop = "0px !important"
        } else {
          // console.log('不是火狐浏览器')
          var block1 = document.querySelector(".blocktwo");
          var block2 = document.querySelector(".blockthere");
          var block3 = document.querySelector(".blockfour");
          var footer = document.querySelector(".footer");
          // var block1 = document.querySelector(".blocktwo")
          // console.log(document.querySelector(".quanping"))
          if (document.querySelector(".quanping")) {
            document.documentElement.style.zoom = "1";
            block1.style.zoom = (Wth / 1920) * 100 + "%";
            block2.style.zoom = (Wth / 1920) * 100 + "%";
            block3.style.zoom = (Wth / 1920) * 100 + "%";
            footer.style.zoom = (Wth / 1920) * 100 + "%";
            //footer
          } else {
            document.documentElement.style.zoom = (Wth / 1920) * 100 + "%";
            // footer.style.zoom ="100%";
          }
        }
      }
    }

    window.addEventListener("resize", function () {
      cx();
    });
  },
};
</script>
<style>
/* @import "../node_modules/swiper/swiper.min.css"; */
/* @import "../node_modules/swiper/swiper-bundle.css"; */
/* @import "../node_modules/swiper/dist/css/swiper.css"; */
@import "./assets/css/gstatic.css";
@import "../node_modules/swiper/css/swiper.css";
@import "./assets/css/animate.css";

/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  } */
html {
  /* height: 100%; */
  margin: 0;
  padding: 0;
}

#app {
  /* overflow-x: hidden; */
  /* width: 1920px; */
  position: relative;
}

* {
  margin: 0;
  padding: 0;
  /* font-family: 'siyuan'; */
  font-weight: 300;
}

/* 清除浮动 */
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}

/* 公共的全包 */
.container {
  width: 100%;
  min-width: 1420px;
}

/* 公共的中间部分 */
.conts {
  width: 100%;
  overflow: hidden;
}

/* 公共的中间部分里的1400px */
.main {
  width: 1400px;
  margin: auto;
}

/* 公用的头部横条 */
.conts_top {
  width: 100%;
  height: 150px;
  position: relative;
}

.conts_top img {
  position: absolute;
  top: 0;
  width: 1920px;
  height: 150px;
  left: 50%;
  margin-left: -960px;
  z-index: 1;
}

.conts_top p {
  position: absolute;
  top: 0;
  width: 1400px;
  height: 150px;
  left: 50%;
  margin-left: -700px;
  z-index: 2;
  font-size: 30px;
  color: #fff;
  line-height: 150px;
}

.crumbs {
  width: 100%;
  background-color: #efefed;
}

.crumbs p {
  width: 1400px;
  margin: auto;
  text-align: right;
  line-height: 75px;
  font-size: 18px;
}

.Tips_elastic {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
}

.Tips {
  position: absolute;
  z-index: 9;
  background-color: #000;
  border-radius: 10px;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.Tips p {
  font-size: 18px;
  color: #fff;
}
</style>
