<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />

    <div class="conts">
      <div class="meal_top">
        <!-- <img src="../../assets/img/cande1.jpg" alt="" /> -->
          <img :src="Baseurl+topimg" alt="">
        <!-- hotle1 -->
      </div>
      <div class="canyin">
        <div class="main">
          <div class="yuxiang">
            <div class="canyinlun">
              <div class="swiper-container luncanyin">
                <!-- 如果需要导航按钮 -->
                <div class="swiper-button-prev prevcan"></div>
                <div class="swiper-button-next nextcan"></div>
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(item, index) in meallist.images"
                    :key="index"
                  >
                    <div class="can_list_img">
                      <img :src="Baseurl + item.image" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="canyin_right">
              <div class="canyin_right_text">
                <span>{{ meallist.title }}</span>
                <p>{{ meallist.description }}</p>
                <div class="cancont">
                  <div class="rig_list">
                    <img src="../../assets/img/icon1.png" alt="" />
                    <div class="rig_listtxt">
                      <span>营业时间</span>
                      <p>{{ meallist.add_time }}</p>
                    </div>
                  </div>
                  <div class="rig_list">
                    <img src="../../assets/img/icon2.png" alt="" />
                    <div class="rig_listtxt">
                      <span>电话</span>
                      <p>{{ meallist.emails }}</p>
                    </div>
                  </div>
                  <div class="rig_list">
                    <img src="../../assets/img/icon3.png" alt="" />
                    <div class="rig_listtxt">
                      <span>位置</span>
                      <p>{{ meallist.address }}</p>
                    </div>
                  </div>
                  <div class="rig_list">
                    <img src="../../assets/img/icon4.png" alt="" />
                    <div class="rig_listtxt">
                      <span>菜式</span>
                      <p>{{ meallist.en_title }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="link">
                <div class="links" @click="tolink(meallist.pc_link)">
                  <div class="img">
                    <img src="../../assets/img/link1.png" alt="">
                    <img src="../../assets/img/link1b.png" alt="">
                  </div>
                  <p>查看详细</p>
                </div>
                <div class="links" @click="hovshow()">
                  <div class="img">
                    <img src="../../assets/img/link2.png" alt="">
                    <img src="../../assets/img/link2b.png" alt="">
                  </div>
                  <p>宴会预定</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pop" @click="close()" v-if="popshow">
        <div class="fudong">
          <p>扫描二维码预定宴会</p>
          <img :src="Baseurl+meallist.pinpai" alt="">
          <div class="down" @click.stop="savePic(Baseurl+meallist.pinpai)">点击下载图片</div>
        </div>
      </div>
      
      <div class="youhui">
        <div class="main">
          <div class="youhui_title">其他餐饮推荐</div>
          <div class="vips">
            
            <div class="vips_list" v-if="mealuplist" @click="topath(boxupIndex)">
              <div class="vips_list_img">
                <!-- <img src="../../assets/img/can3.jpg" alt=""> -->
                <img :src="Baseurl + mealuplist.pc_image" alt="" />
              </div>
              <div class="vips_list_text">
                <span>{{ mealuplist.title }}</span>
              </div>
            </div>
            <div class="vips_list" v-if="mealdownlist" @click="topath(boxdownIndex)">
              <div class="vips_list_img">
                <img :src="Baseurl + mealdownlist.pc_image" alt="" />
              </div>
              <div class="vips_list_text">
                <span>{{ mealdownlist.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- 公共底部 -->
    <Footer />
  </div>
</template>

<script>
import Header from "../owned/header.vue";
import Footer from "../owned/footer.vue";
import Swiper from "swiper";
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
      id: "",
      infolist: [], //上页储存的所有列表
      boxupIndex: "", //上一个是第几个
      boxIndex: "", //当前是第几个进来的
      boxdownIndex: "", //下一个是第几个
      mealuplist: [], //上一个列表
      meallist: [], //当前的列表
      mealdownlist: [], //下一个列表
      mealId: "", //传来的id
      topimg:'',
      popshow:false
    };
  },

  created() {
    // 储存第几个头部状态
    localStorage.setItem("istrue", 3);
    this.token = sessionStorage.getItem("token");
    // console.log(this.token);
    this.hotel_id = sessionStorage.getItem("hotel_id");
    this.mealId = this.$route.query.mealId;
    // if (sessionStorage.getItem("fieldData")) {
    //   var fieldData = JSON.parse(sessionStorage.getItem("fieldData"));
    //   this.modularid = fieldData[2].id;
    // }
    this.getinfolist()
    console.log(this.mealId);
  },
  inject: ["reload"],
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
          that.modularid = fieldData[2].id
          sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
          // that.getdatalist()
          that.getdatalist(that.mealId)
        })
        .catch((err) => console.log(err));
    },
    tolink(link){
      if(link){
        window.open(link)
      }
    },
    close(){
      this.popshow = false
    },
    hovshow(){
      this.popshow = true
    },
    savePic(Url){
      let img = document.getElementById("saveImg")
      // Url = img.src; //图片路径，也可以传值进来
      Url = 'http://zs.sc798.com/upload_file/news_file/20221018163235-634e64a3617a4.jpg'
      let triggerEvent = "touchstart"; //指定下载方式
      let blob=new Blob([''], {type:'application/octet-stream'}); //二进制大型对象blob
      let url = URL.createObjectURL(blob); //创建一个字符串路径空位
      let a = document.createElement('a'); //创建一个 a 标签
      a.href = Url;  //把路径赋到a标签的href上
      a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0]; 
      let e = new MouseEvent('click', ( true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null));  
      a.dispatchEvent(e);
      //释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）
      URL.revokeObjectURL(url);  
      
    },

    getdatalist(mealId) {
      //?web_token=${that.token}&hotel_id=1
      var that = this;
      that.$axios
        // &module_id=3
        .get(
          `${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`
        )
        .then(function (res) {
          console.log(res);
          that.topimg =res.data.data.top_module_list[2].mobile_image
          // that.infolist =  res.data.data.defaul_module_list
          that.infolist = res.data.data.defaul_module_list[0].news;
          for (let i = 0; i < that.infolist.length; i++) {
            if (that.infolist[i].id == mealId) {
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
          that.meallist = that.infolist[that.boxIndex];
          that.mealuplist = that.infolist[that.boxupIndex];
          that.mealdownlist = that.infolist[that.boxdownIndex];
          console.log(that.meallist)
          that.$nextTick(function(){
              that.lunbo()
          })
        })
        .catch((err) => console.log(err));
    },
    lunbo() {
      var luncanyin = new Swiper(".luncanyin", {
        loop: true, // 循环模式选项
        autoplay: true,
        // slidesPerView: 4,
        // centeredSlides: true,//这个是让第一个居中显示的
        // spaceBetween: 47,
        navigation: {
          nextEl: ".nextcan",
          prevEl: ".prevcan",
        },
      });
    },
    topath(index,id) {
      console.log(index)
      this.boxIndex = index
      this.getdatalist(id)
      // this.reload();
    },
  },
  mounted() {
  },
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

/* 酒吧及餐厅 */
.canyin {
  width: 100%;
  background-color: #efefed;
  padding-bottom: 5.2vw;
  padding-top: 5.067vw;
}

.yuxiang {
  background-color: #fff;
  /* display: flex; */
  /* height: 520px; */
}

.canyinlun {
  width: 100%;
  /* height: 520px; */
  /* height: 85.467vw; */
  height: 86.4vw;
  position: relative;
}
.canyinlun .can_list_img {
  width: 100%;
  height: 100%;
}
.canyinlun .can_list_img img {
  width: 100%;
  height: 100%;
  display: block;
}
.prevcan,
.nextcan {
  color: #fff;
  top: 50%;
  /* margin-top: -55px; */
}
.prevcan {
  left: 3.867vw;
}
.nextcan {
  right: 3.867vw;
}
.prevcan:after,
.nextcan:after {
  font-size: 7vw;
}

.canyinlun .luncanyin {
  width: 100%;
  height: 100%;
}

.canyinlun .luncanyin .swiper-slide {
  width: 100%;
  height: 100%;
}
.canyin_right {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 76.8vw;
  margin: auto;
  margin-top: 6vw;
  position: relative;
  padding-bottom: 10vw;
}

.canyin_right .link{
  position: absolute;
  right: 0;
  bottom: 2.667vw;
  display: flex;
  align-items: center;
}
.canyin_right .link .links{
  width: 25vw;
  height: 6.667vw;
  display: flex;
  align-items: center;
  border: 0.267vw solid #a8916f;
  box-sizing: border-box;
  position: relative;
  margin-left: 4.000vw;
}

.canyin_right .link .links >.img{
  width: 3.600vw;
  height: 3.200vw;
  margin-left: 2.267vw;
  margin-right: 2.000vw;
}
.canyin_right .link .links >.img >img{
  width: 100%;
  height: 100%;
}
.canyin_right .link .links >.img >img:nth-child(1){
 display: block;
}
.canyin_right .link .links >.img >img:nth-child(2){
  display: none;
}
.canyin_right .link .links >p{
  font-size: 2.667vw;
  color: #775b3f;
}
.pop{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fudong{
  padding: 3vw 10vw;
  background-color: #fff;
  /* bottom: 8.000vw; */
  z-index: 1;
  /* display: none; */
}
.fudong>img{
  width: 60vw;
  height: 60vw;
  display: block;
}
.fudong>p{
  font-size: 3.5vw;
  color: #737373;
  margin-bottom: 3vw;
  text-align: center;
}
.down{
  width: 25vw;
  height: 6.667vw;
  margin: auto;
  background-color: #d5b08b;
  font-size: 3.5vw;
  color: #fff;
  text-align: center;
  margin-top: 3vw;
  line-height: 6.667vw;
}
.canyin_right .canyin_right_text {
  /* width: 715px; */
}
.canyin_right .canyin_right_text > span {
  font-size: 5vw;
  color: #000000;
}

.canyin_right .canyin_right_text > p {
  line-height: 5vw;
  margin-top: 3.733vw;
  font-size: 3.5vw;
  color: #000000;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 5;
  /*要显示的行数*/
  -webkit-box-orient: vertical;
}
.cancont {
  border-top: 0.133vw solid #efefed;
  margin-top: 4.667vw;
  padding-top: 4.667vw;
}
.rig_list {
  /* margin-top: 36px; */
  display: flex;
  align-items: flex-start;
  margin-bottom: 6.667vw;
}

.rig_list > img {
  width: 3.333vw;
  height: 3.067vw;
  display: block;
  margin-right: 2.667vw;
  margin-top: 1.3vw;
}

.rig_list > .rig_listtxt span {
  font-size: 3.6vw;
  color: #000000;
}

.rig_list > .rig_listtxt p {
  font-size: 3.6vw;
  color: #000000;
}

.youhui {
  width: 100%;
}

.youhui .youhui_title {
  font-size: 5vw;
  color: #000000;
  font-weight: 400;
  margin-top: 5.333vw;
}

.youhui .vips {
  /* display: flex; */
  justify-content: space-between;
  padding-bottom: 5.333vw;
}

.youhui .vips .vips_list {
  cursor: pointer;
  width: 100%;
  margin-top: 5.333vw;
}

.youhui .vips .vips_list .vips_list_img {
  width: 100%;
  /* height: 380px; */
  height: 50.667vw;
  overflow: hidden;
}

.youhui .vips .vips_list .vips_list_img img {
  width: 100%;
  height: 100%;
  display: block;
  /* transition: all 0.5s; */
}

.youhui .vips .vips_list .vips_list_text {
  margin-top: 4.333vw;
}

.youhui .vips .vips_list .vips_list_text span {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 4vw;
  color: #000000;
}

/* .youhui .vips .vips_list .vips_list_text p {
  margin-top: 1.5.000vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  font-size: 3.2vw;
  color: #000000;
} */

</style>
