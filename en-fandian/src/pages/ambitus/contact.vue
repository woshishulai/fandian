<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="conts_top">
        <img loading="lazy" :src="Baseurl + infolist[1].pc_image" alt="" />
        <p>{{ infolist[1].title }}</p>
      </div>
      <div class="crumbs">
        <p>您的位置：首页 > {{ infolist[1].title }}</p>
      </div>
      <div class="ambitus">
        <div class="main">
          <div class="lianxi">
            <div class="lianxileft">
              <div class="jieshao" v-html="infolist[1].pc_content">
              </div>
              <div class="ditu">
                <!--百度地图容器-->
                <baidu-map class="bm-view" :center="center" :zoom="zoom" :scroll-wheel-zoom="true">
                  <bm-label :content="contents" :position="center" :labelStyle="{
                    color: '#808080', fontSize: '20px', padding: '5px 20px',
                    border: '1px solid #bababa', borderRadius: '10px',
                    marginLeft: '-120px', textAlign: 'center', marginTop: '-40px'
                  }" title="Hover me" />
                </baidu-map>
              </div>
            </div>
            <div class="lianxiright">
              <div class="lianxi_form">
                <div class="xinxi">
                  <span>联系我们</span>
                  <p>
                    如果您有任何问题或意见，请通过一下方式与我们联系，我们会尽快回复。
                  </p>
                </div>
                <div class="inpform">
                  <div class="inplist">
                    <p>姓名：</p>
                    <div class="inp">
                      <input type="text" v-model="name" />
                      <p v-show="nameshow">请填写姓名</p>
                    </div>
                  </div>
                  <div class="inplist">
                    <p>电话：</p>
                    <div class="inp">
                      <input type="text" v-model="phone" />
                      <p v-show="phoneshow">请填写电话</p>
                    </div>
                  </div>
                  <div class="inplist">
                    <p>邮箱：</p>
                    <div class="inp">
                      <input type="text" v-model="email" />
                      <p v-show="emailshow">请填写邮箱</p>
                    </div>
                  </div>
                  <div class="inplist clearfix">
                    <p>留言内容：</p>
                    <div class="inptext">
                      <textarea cols="30" rows="10" v-model="wenben" maxlength="200"
                        οnchange="this.value=this.value.substring(0, 200)"
                        οnkeydοwn="this.value=this.value.substring(0, 200)"
                        οnkeyup="this.value=this.value.substring(0, 200)"></textarea>
                      <p v-show="wenbenshow">请填写留言</p>
                    </div>
                    <div class="shuzi">{{ wenben.length }}/200</div>
                  </div>
                  <div class="tijiao" @click="tijiao()">提交</div>
                </div>
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
      hotelcode: "", //酒店编码
      hotelname: "", //酒店名字
      name: "",
      phone: "",
      email: "",
      wenben: "",
      nameshow: false,
      phoneshow: false,
      emailshow: false,
      wenbenshow: false,
      infolist: [],
      tipshow: false,
      tipstext: "",



      // 地图
      center: { lng: 0, lat: 0 },
      zoom: 20,
      contents: '北京世纪金源大饭店1',
      dituxinxi: [],
    };
  },
  created() {
    // 储存第几个头部状态
    localStorage.setItem("istrue", 0);
    this.infolist = JSON.parse(localStorage.getItem("foot_module"));
    this.token = sessionStorage.getItem("token");
    this.hotel_id = sessionStorage.getItem("hotel_id");
    this.hotelcode = sessionStorage.getItem("hotelcode");
    this.hotelname = sessionStorage.getItem("hotelname");
    console.log(this.infolist);
    console.log(JSON.parse(sessionStorage.getItem("dituxinxi")))
    this.dituxinxi = JSON.parse(sessionStorage.getItem("dituxinxi"))
    //dituxinxi
    var zuobiao = this.dituxinxi.coord.split(',')
    console.log(zuobiao)
    // this.center.lng = 116.286812
    // this.center.lat = 39.959567
    var array = {
      lng: zuobiao[0], lat: zuobiao[1]
    }
    // this.center.lng = zuobiao[0]
    // this.center.lat = zuobiao[1]
    this.center = array
    this.zoom = 20
    this.contents = this.dituxinxi.hotel_name
  },
  inject: ["reload"],
  methods: {
    handler({ BMap, map }) {
      setTimeout(() => {
        console.log(BMap, map)
        var zuobiao = this.dituxinxi.coord.split(',')
        console.log(zuobiao)
        // this.center.lng = 116.286812
        // this.center.lat = 39.959567
        var array = {
          lng: zuobiao[0], lat: zuobiao[1]
        }
        // this.center.lng = zuobiao[0]
        // this.center.lat = zuobiao[1]
        this.center = array
        this.zoom = 20
        this.contents = this.dituxinxi.hotel_name
      }, 500)
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
    tijiao() {
      console.log("提交的数据");
      console.log(this.token);
      console.log(this.hotel_id);
      console.log(this.hotelname);
      console.log(this.name);
      console.log(this.phone);
      console.log(this.email);
      console.log(this.wenben);
      // contact_us
      if (this.name == "") {
        this.nameshow = true;
        setTimeout(() => {
          this.nameshow = false;
        }, 1500);
        return
      }
      if (this.phone == "") {
        this.phoneshow = true;
        setTimeout(() => {
          this.phoneshow = false;
        }, 1500);
        return
      }
      if (this.email == "") {
        this.emailshow = true;
        setTimeout(() => {
          this.emailshow = false;
        }, 1500);
        return
      }
      if (this.wenben == "") {
        this.wenbenshow = true;
        setTimeout(() => {
          this.wenbenshow = false;
        }, 1500);
        return
      }
      var that = this;
      that.$axios
        // &module_id=3
        .post(
          `${this.Baseurl}contact_us?web_token=${that.token}&hotel_id=${that.hotel_id}
          &hotel_name=${that.hotelname}&name=${that.name}&phone=${that.phone}&email=${that.email}
          &contact=${that.wenben}`
        )
        .then(function (res) {
          console.log(res);
          // console.log(res.data.msg);

          that.tishi(res.data.msg);
          setTimeout(() => {
            that.reload();
          }, 1000)
        })
        .catch((err) => console.log(err));
    },
    getdatalist() {
      //?web_token=${that.token}&hotel_id=1
      var that = this;
      that.$axios
        // &module_id=3
        .get(
          `${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`
        )
        .then(function (res) {
          console.log(res);
          that.name = res.data.data.news.name;
          // that.infolist =  res.data.data.news.news
          console.log(that.infolist);
          var result = res.data.data.news.news;
          var data = [];
          for (var i = 0; i < result.length; i += 5) {
            data.push(result.slice(i, i + 5));
          }
          that.infolist = data;
          that.$nextTick(function () {
            that.lunboone();
            that.initMap()
          });
        })
        .catch((err) => console.log(err));
    },

  },
  mounted() { }
};
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 100%;
}

.crumbs {
  background-color: #fff;
}

.ambitus {
  width: 100%;
  /* background-color: #efefed; */
}

.lianxi {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 65px;
}

.lianxi .lianxileft {
  width: 820px;
}

.lianxi .lianxileft .jieshao>span {
  font-size: 30px;
  color: #000000;
  font-weight: 400;
}

.lianxi .lianxileft .jieshao>p {
  font-size: 18px;
  color: #000000;
  margin-top: 20px;
  line-height: 30px;
  text-align: justify;
}

/* .lianxi .lianxileft .jieshao /deep/ p {
  font-size: 18px;
  color: #000000;
  margin-top: 20px;
  line-height: 30px;
  text-align: justify;
} */
.lianxi .lianxileft .jieshao>.list {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.lianxi .lianxileft .jieshao>.list>span {
  font-size: 18px;
  color: #000000;
  font-weight: 400;
}

.lianxi .lianxileft .jieshao>.list>p {
  font-size: 18px;
  color: #000000;
}

.lianxi .lianxileft .jieshao /deep/ img {
  max-width: 100%;
  display: block;
}

.lianxi .lianxiright {
  width: 500px;
  background-color: #efefed;
  padding: 30px 0 50px;
}

.lianxi .lianxiright .lianxi_form {
  width: 400px;
  margin: auto;
}

.lianxi .lianxiright .lianxi_form .xinxi span {
  font-size: 30px;
  color: #000000;
  font-weight: 400;
}

.lianxi .lianxiright .lianxi_form .xinxi p {
  font-size: 18px;
  color: #5f5f5f;
  margin-top: 10px;
}

.inpform {
  margin-top: 10px;
}

.inpform .inplist {
  margin-top: 20px;
}

.inpform .inplist>p {
  font-size: 18px;
  color: #000000;
  display: block;
}

.inpform .inplist .inp {
  width: 100%;
  height: 60px;
  border: 1px solid #9f9f9f;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  margin-top: 15px;
}

.inpform .inplist .inp>input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 18px;
  color: #000000;
  background: rgba(0, 0, 0, 0);
}

.inpform .inplist .inp>p {
  position: absolute;
  left: 20px;
  top: 0;
  line-height: 60px;
  z-index: 1;
  font-size: 18px;
  color: #ff1414;
}

.inpform .inplist .inptext {
  width: 100%;
  height: 130px;
  border: 1px solid #9f9f9f;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  margin-top: 15px;
}

.inpform .inplist .inptext textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 18px;
  color: #000000;
  background: rgba(0, 0, 0, 0);
  resize: none;
}

.inpform .inplist .inptext>p {
  position: absolute;
  left: 20px;
  top: 0;
  line-height: 60px;
  z-index: 1;
  font-size: 18px;
  color: #ff1414;
}

textarea::-webkit-scrollbar {
  /*隐藏滚动条*/
  display: none;
}

.shuzi {
  float: right;
  font-size: 14px;
  color: #5f5f5f;
  font-family: Arial;
  margin-top: 10px;
}

.inpform .tijiao {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #d5b08b;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  margin-top: 30px;
}

.ditu {
  width: 820px;
  height: 400px;
  margin-top: 30px;
}

/* 地图 */
.iw_poi_title {
  color: #cc5522;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  padding-right: 13px;
  white-space: nowrap;
}

.iw_poi_content {
  font: 12px arial, sans-serif;
  overflow: visible;
  padding-top: 4px;
  white-space: -moz-pre-wrap;
  word-wrap: break-word;
}

.conts_top {
  height: 350px;
}

.conts_top img {
  height: 350px;
}

.conts_top p {
  height: 350px;
  line-height: 350px;
}
</style>
