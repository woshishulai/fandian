<template>
  <div class="container">
    <!-- 公共头部 -->
    <Header />
    <div class="conts">
      <div class="reserve">
        <div class="resfrom">
          <div class="resfrom_title">
            预约 <span>(*必填项)</span>
            <!-- <input readonly class="form-control" type="text" id="date-group1-6" placeholder="hh:mm"> -->
          </div>
          <div class="resfrom_inp">
            <div class="reslist">
              <span>姓名*：</span>
              <div class="reslist_you">
                <input
                  class="fullname"
                  type="text"
                  name=""
                  id=""
                  v-model="name"
                />
                <div class="sex">
                  <select name="" id="" class="sexs" @change="sexchange">
                    <option value="先生">先生</option>
                    <option value="女士">女士</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="reslist">
              <span>电话*：</span>
              <div class="reslist_you">
                <input
                  class="quhao"
                  type="text"
                  placeholder="输入区号"
                  v-model="quhao"
                />
                <input
                  class="numbers"
                  type="text"
                  placeholder="输入电话号码"
                  v-model="number"
                />
              </div>
            </div>
            <div class="reslist">
              <span>宴会日期*：</span>
              <div class="reslist_you">
                <!-- <input type="date"> -->
                <input
                  readonly=""
                  class="form-control"
                  type="text"
                  id="yanhuiriqi"
                  placeholder="yyyy/mm/dd"
                />
                <!-- date-group1-2 -->
              </div>
            </div>
            <div class="reslist">
              <span>宴会性质*：</span>
              <div class="reslist_you">
                <!-- <input type="date"> -->
                <div id="xingzhi" class="xuanxiang">请选择</div>
              </div>
            </div>
            <div class="reslist">
              <span>场地名称/宴会形式*：</span>
              <div class="reslist_you">
                <!-- <input type="date"> -->
                <!-- {{fieldList}} -->
                <div id="Table" class="xuanxiang"></div>
              </div>
            </div>
            <div class="reslist">
              <span>邮箱*：</span>
              <div class="reslist_you">
                <input type="email" placeholder="" v-model="email"/>
              </div>
            </div>
            <div class="reslist">
              <span>宴会人数*：</span>
              <!-- <div class="reslist_you">
                <div id="trigger1" class="xuanxiang"></div>
              </div> -->
              <div class="reslist_you">
                <input type="text" v-model="renshu">
              </div>
            </div>
            <div class="reslist">
              <span>备注：</span>
              <div class="reslist_you">
                <input type="text" v-model="beizhu"/>
              </div>
            </div>
            <div class="reslist anniu">
              <span></span>
              <div class="reslist_you">
                <!-- <input type="text"> -->
                <div class="butn butn1" @click="quxiao()">取消</div>
                <div class="butn butn2" @click="tijiao()">提交</div>
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
import Header from "../owned/header.vue";
import Footer from "../owned/footer.vue";
import MobileSelect from "../../assets/js/mobileSelect";
import Rolldate from "../../assets/js/rolldate";
export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      token: "", //token
      hotel_id: "", //酒店id

      tipshow: false, //提示弹窗
      tipstext: "", //提示信息
      name: "", //姓名
      sex: "先生", //性别
      quhao: "", //区号
      number: "", //电话号码
      houphone: "", //像后台传的电话带区号的
      datetime: "", //日期
      email: "", //邮箱
      xingzhi: "", //性质
      renshu: "", //人数
      beizhu: "", //备注

      Table:'',//场地名称
      Type:'',//宴会形式
      fieldList:[],
      typelist:[],
    };
  },

  created() {
    // 储存第几个头部状态
    localStorage.setItem("istrue", 4);
    this.token = sessionStorage.getItem("token");
    // console.log(this.token);
    this.hotel_id = sessionStorage.getItem("hotel_id");
    console.log(sessionStorage.getItem("hotel_id"))
    // console.log(sessionStorage.getItem("YHrenshu"));
    // console.log(sessionStorage.getItem("YHxingzhi"));
    // console.log(sessionStorage.getItem("YHdatetime"));
    this.geilistyu()
    sessionStorage.removeItem("YHrenshu","YHdatetime","YHxingzhi")
    this.$nextTick(() => {
      this.shuju();
    });
  },
  methods: {
    //新增
    geilistyu(){
      var that =this
      console.log(that.token)
      console.log(that.hotel_id)
      that.$axios
      // &module_id=3
      .post(`${this.Baseurl}feast?web_token=${that.token}&hotel_id=${that.hotel_id}`) 
      .then(function(res) {
          console.log(res)
          that.fieldList = res.data.data
          that.typelist = res.data.data[0].news
          console.log(that.typelist)
          that.Table = that.fieldList[0].name
          that.Type = that.fieldList[0].news[0].title
          //     /fieldList:[],
          // typelist:[],
          that.$nextTick(() => {
            document.querySelector("#Table").innerHTML= that.Table+'/' +that.Type+that.fieldList[0].news[0].en_title
            document.querySelector("#Table").setAttribute("digitTable",0)
            document.querySelector("#Table").setAttribute("digitType",0)
            that.yanhuiType()
          });
      }).catch(err => console.log(err));
    },
    // yuyan(){
    //     this.yanhui=true
    // },
    quxiao() {
      // this.yanhui=false
      this.$router.push("/banquet?date" + Date.now());
    },
    sexchange(e) {
      console.log(e.target.value);
      this.sex = e.target.value;
    },
    //yanhuiType
    shuju() {
      var weekdayArr2 = [
        "讲座",
        "论坛",
        "婚宴",
        "宝宝宴",
        "研讨会",
        "发布会",
        "其他",
      ];
      var mobileSelect2 = new MobileSelect({
        trigger: "#xingzhi",
        title: "宴会性质",
        wheels: [{ data: weekdayArr2 }],
        position: [0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
        transitionEnd: function (indexArr, data) {
          //console.log(data);
        },
        callback: function (indexArr, data) {
          console.log(data);
          sessionStorage.setItem("YHxingzhi", data[0]);
          document.querySelector("#xingzhi").setAttribute("ceshi",data[0])
        },
      });

      // 自定义语言
      var lang = {
        title: "选择日期",
        cancel: "取消",
        confirm: "确认",
        year: "年",
        month: "月",
        day: "日",
        hour: "时",
        min: "分",
        sec: "秒",
      };
      new Rolldate({
        el: "#yanhuiriqi",
        format: "YYYY/MM/DD",
        beginYear: 2022,
        endYear: 2100,
        lang: lang,
        init: function () {
          console.log("插件开始触发");
        },
        moveEnd: function (scroll) {
          console.log(scroll);
          console.log("滚动结束");
        },
        confirm: function (date) {
          console.log(date);
          console.log("确定按钮触发");
          sessionStorage.setItem("YHdatetime", date.replace("/", "-").replace("/", "-"));
        },
        cancel: function () {
          console.log("插件运行取消");
        },
      });
    },
    yanhuiType(){
      var array=[]
      for (let i = 0; i < this.fieldList.length; i++) {
        array.push(this.fieldList[i].name)
      }
      console.log(this.typelist)
      var shuzu = []
      for (let i = 0; i < this.fieldList.length; i++) {
        var add={
          id:i,
          value:this.fieldList[i].name
        }
        shuzu.push(add)
      }
      console.log(shuzu)
      var list = this.fieldList
      var lists2=[]
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].news.length; j++) {
          list[i].news[j].name = list[i].news[j].title+list[i].news[j].en_title
        }
      }
      
      console.log(list)
      lists2 = list
      var Table = new MobileSelect({
        trigger: "#Table",
        title: "场地名称/宴会形式",
        wheels: [{data:lists2}],
        position: [0,0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
        keyMap: {
            id:'id',
            value: 'name',
            childs :'news',
        },
        transitionEnd: function (indexArr, data) {
          //console.log(data);
        },
        callback: function (indexArr, data) {
          console.log(data);
          console.log(indexArr)//选的第几个
          document.querySelector("#Table").setAttribute("digitTable",indexArr[0])
          document.querySelector("#Table").setAttribute("digitType",indexArr[1])
        },
      });
      
      // this.yanhuiType2()
    },
    tijiao() {
      var indexTable = document.querySelector("#Table").getAttribute("digitTable")
      var indexType = document.querySelector("#Table").getAttribute("digitType")
      console.log(indexTable)
      console.log(indexType)
      this.Table = this.fieldList[indexTable].name
      this.Type = this.fieldList[indexTable].news[indexType].title
      
      console.log(this.Table)
      console.log(this.Type)
      // console.log(this.name);
      // console.log(this.sex);
      // console.log(this.number);
      // console.log(sessionStorage.getItem("YHrenshu"));
      // console.log(sessionStorage.getItem("YHxingzhi"));
      // console.log(sessionStorage.getItem("YHdatetime"));
      
      if (sessionStorage.getItem("YHdatetime")) {
        this.datetime = sessionStorage.getItem("YHdatetime");
      }
      
      if (sessionStorage.getItem("YHxingzhi")) {
        this.xingzhi = sessionStorage.getItem("YHxingzhi");
      }
      //     console.log(this.datetime);
        
      //   console.log(this.renshu);
      //     console.log(this.xingzhi);
      //     console.log(this.email);
      //   console.log(this.beizhu);
      

      if(this.name==''){
          this.tishi("请输入姓名")
          return;
      }
      if(this.quhao==""){
          this.tishi("请输入区号")
          return
      }
      var re1= /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      // var res1 = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
      if(!re1.test(this.number)){
          ///^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/
          this.tishi("请输入正确电话号码")
          return;
      }
      if (this.datetime == "" || this.datetime == null) {
        this.tishi("请选择日期");
        return;
      }
      if (this.xingzhi == "" || this.xingzhi == null) {
        this.tishi("请选择性质");
        return;
      }
      var re2 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!re2.test(this.email)) {
        this.tishi("请输入正确邮箱");
        return;
      }

      var re3 = /^[0-9]*[1-9][0-9]*$/;
      if (!re3.test(this.renshu) || this.renshu == "" || this.renshu == null) {
        ///^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/
        this.tishi("请输入人数");
        return;
      }
      
      this.quhao = this.quhao.replace("+", "%2B");
      var that = this;
        that.$axios
        // &module_id=3
        .post(`${this.Baseurl}restaurant_sjjy?web_token=${that.token}&hotel_id=${that.hotel_id}
          &name=${that.name}&phone_type=${that.quhao}&phone=${that.number}&riqi=${that.datetime}&xingzhi=${that.xingzhi}
        &sex=${that.sex}&renshu=${that.renshu}&email=${that.email}&remark=${that.beizhu}
        &tx=${that.Table}&xs=${that.Type}`)
        .then(function(res){
              console.log(res)
            if(res.data.code==1){
                that.tishi(res.data.msg)
                that.$router.go(-1)
            }else{
                that.tishi(res.data.msg)
            }
        }).catch(err => console.log(err));
    },

    //提示
    tishi(text) {
      this.tipshow = true;
      this.tipstext = text;
      setTimeout(() => {
        this.tipshow = false;
        this.tipstext = "";
      }, 2000);
    },
  },
  mounted() {},
};
</script>
<style scoped>
.reserve {
  background-color: #efefed;
  width: 100%;
  padding-bottom: 10vw;
}
.reserve .resfrom {
  width: 78.133vw;
  margin: auto;
  padding-top: 4.667vw;
}
.resfrom_title {
  width: 100%;
  font-size: 5.3vw;
  color: #000000;
  text-align: center;
}
.resfrom_title span {
  font-size: 4vw;
  color: #000000;
}
.resfrom_inp {
  margin: auto;
}
.reslist {
  margin-top: 4.267vw;
}
.reslist span {
  /* width: 147px; */
  font-size: 4vw;
  color: #000000;
}

.reslist .reslist_you {
  width: 100%;
  height: 12vw;
  /* width: 585px;
        height: 90px; */
  width: 78vw;
  height: 12vw;
  margin-top: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.reslist .reslist_you input {
  outline: none;
  border: none;
  border-radius: 2vw;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  font-size: 4vw;
  color: #575757;
  padding: 0 4.667vw;
  box-sizing: border-box;
}
.reslist .reslist_you .xuanxiang {
  outline: none;
  border: none;
  border-radius: 2vw;
  width: 100%;
  height: 100%;
  line-height: 12vw;
  background-color: #ffffff;
  font-size: 4vw;
  color: #575757;
  padding-left: 26px;
  box-sizing: border-box;
}
.reslist .reslist_you .fullname {
  /* width: 243px; */
  width: 48.4vw;
  border-radius: 2vw 0 0 2vw;
}
.reslist .reslist_you .sex {
  width: 29.6vw;
  height: 100%;
  background-color: #ffffff;
  outline: none;
  border: none;
  border-radius: 0 2vw 2vw 0;
  padding: 0 6.667vw;
  box-sizing: border-box;
  font-size: 4vw;
  color: #5f5f5f;
  position: relative;
}
.reslist .reslist_you .sexs {
  height: 100%;
  background-color: #ffffff;
  outline: none;
  border: none;
  font-size: 4vw;
  color: #5f5f5f;
}
.reslist .reslist_you .sex select {
  width: 16vw;
}
.reslist .reslist_you .sex::before {
  position: absolute;
  content: "";
  width: 0.267vw;
  height: 3.467vw;
  /* width: 30px;
         height: 10px; */
  background-color: #989898;
  left: 0;
  top: 50%;
  margin-top: -1.73vw;
  z-index: 1;
}
.reslist .reslist_you .quhao {
  width: 32vw;
}
.reslist .reslist_you .numbers {
  width: 44vw;
}
.anniu {
  margin-top: 10vw;
}
.butn {
  width: 37.6vw;
  height: 12vw;
  line-height: 12vw;
  font-size: 4.5vw;
  color: #fff;
  text-align: center;
  border-radius: 2vw;
  cursor: pointer;
}
.butn1 {
  background-color: #cfcfcf;
}
.butn2 {
  background-color: #d5b08b;
}
</style>