<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />

        <div class="conts">
            <div class="meal_top">
                <!-- <img src="../../assets/img/cande1.jpg" alt=""> -->
                <img :src="Baseurl+topimg" alt="">
            </div>
            <div class="crumbs">
                <p>您的位置：首页 > {{topname}}</p>
            </div>
            <Queryhotel class="Queryhotel" />
            <div class="canyin">
                <div class="main">
                    <div class="yuxiang" v-if="infolist[0]">
                        <div class="canyinlun">
                            <div class="swiper-container luncanyin">
                                <!-- 如果需要导航按钮 -->
                                <div class="swiper-button-prev prevcan"></div>
                                <div class="swiper-button-next nextcan"></div>
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide" v-for="(item,index) in swiperImg" :key="index">
                                        <div class="can_list_img">
                                            <img :src="Baseurl+item.image" alt="">
                                            <!-- <img src="../../assets/img/yanhui1.jpg" alt=""> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="canyin_right">
                            <div class="canyin_right_text clearfix">
                                <span>{{infolist[0].name}}</span>
                                <p>{{infolist[0].news[0].description}}</p>
                                <div class="anniuyu" @click="yuyan()">预定宴会</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="youhui">
                <div class="main">
                    <div class="vips" v-if="infolist[1]">
                        <div class="vips_list" @click="todetail(infolist[1].news[0].id)">
                            <div class="youhui_title">{{infolist[1].name}}</div>
                            <div class="vips_list_img">
                                <img :src="Baseurl+infolist[1].news[0].pc_image" alt="">
                            </div>
                            <div class="vips_list_text clearfix">
                                <p v-html="infolist[1].news[0].en_title"></p>
                                <div class="detal">查看详细</div>
                            </div>
                        </div>
                        <div class="vips_list" @click="todetail(infolist[2].news[0].id)">
                            <div class="youhui_title">{{infolist[2].name}}</div>
                            <div class="vips_list_img">
                                <img :src="Baseurl+infolist[2].news[0].pc_image" alt="">
                            </div>
                            <div class="vips_list_text clearfix">
                                <p v-html="infolist[2].news[0].en_title"></p>
                                <div class="detal">查看详细</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="reserve" v-show="yanhui">
                <div class="resfrom">
                    <div class="resfrom_title">
                        预约 <span>(*必填项)</span>
                    </div>
                    <div class="resfrom_inp">
                        <div class="reslist">
                            <span>姓名*：</span>
                            <div class="reslist_you">
                                <input class="fullname" type="text" name="" id="" v-model="name">
                                <select name="" id="" class="sex" @change="sexchange">
                                    <option value="先生">先生</option>
                                    <option value="女士">女士</option>
                                </select>
                            </div>
                        </div>
                        <div class="reslist">
                            <span>电话*：</span>
                            <div class="reslist_you">
                                <input class="quhao" type="text" placeholder="输入区号" v-model="quhao">
                                <input class="numbers" type="text" placeholder="请输入电话号码" v-model="number">
                            </div>
                        </div>
                        <div class="reslist">
                            <span>宴会日期*：</span>
                            <div class="reslist_you">
                                <!-- @change="datechange" -->
                                <input type="date" v-model="datetime">
                            </div>
                        </div>
                        <div class="reslist">
                            <span>邮箱*：</span>
                            <div class="reslist_you">
                                <input type="email" placeholder="请输入邮箱" v-model="email">
                            </div>
                        </div>
                        <div class="reslist">
                            <span>宴会性质*：</span>
                            <div class="reslist_you">
                                <select name="" id="" class="xingzhi" @change="xingzhichange">
                                    <option value="讲座">讲座</option>
                                    <option value="论坛">论坛</option>
                                    <option value="婚宴">婚宴</option>
                                    <option value="宝宝宴">宝宝宴</option>
                                    <option value="研讨会">研讨会</option>
                                    <option value="发布会">发布会</option>
                                    <option value="其他">其他</option>
                                </select>
                            </div>
                        </div>
                        <div class="reslist">
                            <span>场地名称*：</span>
                            <div class="reslist_you">
                                <select name="" id="" class="xingzhi" @change="Tablechange">
                                    <!-- <option value="大宴会厅">大宴会厅</option> -->
                                    <option v-for="(item,index) in fieldList" :key="index" :value="item.name">{{item.name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="reslist">
                            <span>宴会形式*：</span>
                            <div class="reslist_you">
                                <select name="" id="" class="xingzhi" @change="Typechange">
                                    <!-- <option value="剧院式">剧院式</option> -->
                                    <option v-for="(item,index) in typelist" :key="index" :value="item.title">{{item.title}}
                                        ({{item.en_title}})</option>
                                </select>
                            </div>
                        </div>
                        <div class="reslist">
                            <span>宴会人数*：</span>
                            <div class="reslist_you">
                                <input type="text" v-model="renshu">
                            </div>
                            <!-- en_title -->
                        </div>
                        <div class="reslist">
                            <span>备注：</span>
                            <div class="reslist_you">
                                <input type="text" v-model="beizhu">
                            </div>
                        </div>
                        <div class="reslist">
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
                <p>{{tipstext}}</p>
            </div>
        </div>
        <!-- bushi       haorenxuan -->

        <!-- 公共底部 -->
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/layout/header.vue"
import Footer from "@/components/layout/footer.vue"
import Swiper from "swiper";
import Queryhotel from "../rooms/queryhotel.vue";
export default {
    components: {
        Header,
        Footer,
        Queryhotel
    },
    data() {
        return {
            token: '',//token
            hotel_id: '',//酒店id
            modularid: '',//模块id
            infolist: '',
            yanhui: false,

            content1: '',
            content2: '',
            tipshow: false,//提示弹窗
            tipstext: '',//提示信息
            name: '',//姓名
            sex: "先生",//性别
            quhao: '',//区号
            number: '',//电话号码
            houphone: '',//像后台传的电话带区号的
            datetime: '',//日期
            email: '',//邮箱
            xingzhi: '讲座',//性质
            renshu: '',//人数
            beizhu: '',//备注
            topimg: '',
            swiperImg: '',
            topname: '',

            Table: '',//场地名称
            Type: '',//宴会形式
            fieldList: [],
            typelist: [],
        };
    },

    created() {
        // 储存第几个头部状态
        localStorage.setItem("istrue", 4);
        this.token = sessionStorage.getItem("token");
        // console.log(this.token);
        this.hotel_id = sessionStorage.getItem("hotel_id");
        // if(sessionStorage.getItem("fieldData")){
        //     var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
        //    this.modularid = fieldData[3].id
        // }
        // this.getdatalist()
        this.getinfolist()
        this.geilistyu()
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
                    const fieldData = res.data.data.top_module_list;
                    that.modularid = fieldData[3].id
                    sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
                    that.getdatalist()
                })
                .catch((err) => console.log(err));
        },
        //新增
        geilistyu() {
            var that = this
            that.$axios
                // &module_id=3
                .post(`${this.Baseurl}feast?web_token=${that.token}&hotel_id=${that.hotel_id}`)
                .then(function (res) {
                    // console.log(that.modularid)
                    console.log(res)
                    that.fieldList = res.data.data
                    // console.log(that.fieldList)
                    that.typelist = res.data.data[0].news
                    console.log(that.typelist)
                    that.Table = that.fieldList[0].name
                    that.Type = that.fieldList[0].news[0].title
                    //     /fieldList:[],
                    // typelist:[],

                }).catch(err => console.log(err));
        },
        showHtml: function (str) {
            return str
                .replace(str ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, "\"")
                .replace(/&#39;/g, "\'");
        },
        getdatalist() {
            //?web_token=${that.token}&hotel_id=1
            var that = this
            that.$axios
                // &module_id=3
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`)
                .then(function (res) {
                    console.log(that.modularid)
                    console.log(res)
                    that.topimg = res.data.data.top_module_list[3].pc_image
                    that.topname = res.data.data.top_module_list[3].name
                    that.infolist = res.data.data.defaul_module_list
                    console.log(that.infolist)
                    //infolist
                    //defaul_module_list 
                    that.infolist[1].news[0].pc_content = that.showHtml(that.infolist[1].news[0].pc_content)
                    var array = that.infolist[0].news[0].images
                    var result = []
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].type == 1)
                            result.push(array[i])
                    }
                    that.swiperImg = result
                    that.$nextTick(function () {
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
                    })
                }).catch(err => console.log(err));
        },
        todetail(id) {
            console.log('id:' + id)
            this.$router.push({
                name: 'Details',
                query: {
                    detailsId: id,
                    img: this.topimg
                }
            })
        },
        yuyan() {
            this.yanhui = true
        },
        quxiao() {
            this.yanhui = false
        },
        sexchange(e) {
            console.log(e.target.value)
            this.sex = e.target.value
        },
        datechange(e) {
            console.log(e.target.value)
        },
        xingzhichange(e) {
            console.log(e.target.value)
            this.xingzhi = e.target.value
        },
        //场地名称
        Tablechange(e) {
            console.log(e.target.value)
            this.Table = e.target.value
            //fieldList
            var array = this.fieldList
            for (let i = 0; i < array.length; i++) {
                if (array[i].name == e.target.value) {
                    console.log(i)
                    this.typelist = this.fieldList[i].news
                    this.Type = this.fieldList[i].news[0].title
                }
            }
            // this.Table
            //typelist
            // this.typelist= 
        },
        //宴会形式
        Typechange(e) {
            console.log(e.target.value)
            this.Type = e.target.value
        },
        //Tablechange Typechange
        tijiao() {
            // console.log(this.name)
            // console.log(this.sex)
            // console.log(this.number)
            // console.log(this.datetime)
            // console.log(this.email)
            // console.log(this.renshu)
            // console.log(this.beizhu)
            // Table:'',//场地名称
            // Type:'',//宴会形式
            // console.log(this.Table)
            // console.log(this.Type)
            // console.log(this.xingzhi)
            // return false;
            if (this.name == '') {
                this.tishi("请输入姓名")
                return;
            }
            // if(this.quhao==""){
            //     this.tishi("请输入区号")
            //     return
            // }
            var re1 = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
            if (!re1.test(this.number)) {
                ///^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/
                this.tishi("请输入正确电话号码")
                return;
            }
            if (this.datetime == '') {
                this.tishi("请选择日期")
                return;
            }
            var re2 = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
            if (!re2.test(this.email)) {
                this.tishi("请输入正确邮箱")
                return;
            }
            var re3 = /^[0-9]*[1-9][0-9]*$/
            if (!re3.test(this.renshu)) {
                ///^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/
                this.tishi("请输入正确人数")
                return;
            }

            // this.houphone = this.quhao+','+this.number

            this.quhao = this.quhao.replace("+", "%2B")
            var that = this
            that.$axios
                // &module_id=3
                .post(`${this.Baseurl}restaurant_sjjy?web_token=${that.token}&hotel_id=${that.hotel_id}
                &name=${that.name}&phone_type=${that.quhao}&phone=${that.number}&riqi=${that.datetime}&xingzhi=${that.xingzhi}
                &sex=${that.sex}&renshu=${that.renshu}&email=${that.email}&remark=${that.beizhu}
                &tx=${that.Table}&xs=${that.Type}`)
                .then(function (res) {
                    console.log(res)
                    if (res.data.code == 1) {
                        that.tishi(res.data.msg)
                        that.yanhui = false
                    } else {
                        that.tishi(res.data.msg)
                    }

                    // that.infolist =  res.data.data.defaul_module_list
                    // console.log(that.infolist)	
                    //infolist
                    //defaul_module_list 

                    // that.$nextTick(function(){
                    //     that.lunboone()
                    // })
                }).catch(err => console.log(err));
            //http://ssjydfd.sc798.com/restaurant_sjjy
        },


        //提示
        tishi(text) {
            this.tipshow = true
            this.tipstext = text
            setTimeout(() => {
                this.tipshow = false
                this.tipstext = ""
            }, 2000)
        },


        // yanhui(){
        //     // this.yanhui=true
        // }
    },
    mounted() {

    },

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


/* 酒吧及餐厅 */
.canyin {
    width: 100%;
    background-color: #efefed;
    padding-bottom: 74px;
}

.yuxiang {
    background-color: #fff;
    display: flex;
    height: 520px;
}


.canyinlun {
    width: 545px;
    height: 520px;
    position: relative;
}

.canyinlun .can_list_img {
    width: 100%;
    height: 100%;
}

.canyinlun .can_list_img img {
    width: 100%;
    height: 100%;
}

.prevcan,
.nextcan {
    color: #fff;
    top: 100%;
    margin-top: -55px;
}

.prevcan {
    left: 38px;
}

.nextcan {
    right: 38px;
}

.prevcan:after,
.nextcan:after {
    font-size: 25px;
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
    width: 855px;
}

.canyin_right .canyin_right_text {
    width: 715px;
}

.canyin_right .canyin_right_text>span {
    font-size: 30px;
    color: #000000;
}

.canyin_right .canyin_right_text>p {
    line-height: 30px;
    margin-top: 25px;
    font-size: 18px;
    color: #000000;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    /*要显示的行数*/
    -webkit-box-orient: vertical;
}

.anniuyu {
    margin-top: 100px;
    width: 185px;
    height: 55px;
    background-color: #d5b08b;
    font-size: 20px;
    color: #fff;
    line-height: 55px;
    text-align: center;
    float: right;
    cursor: pointer;
}

.youhui {
    width: 100%;
}

.youhui .vips {
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
}

.youhui .vips .vips_list {
    cursor: pointer;
    width: 670px;
}

.youhui .vips .vips_list .youhui_title {
    font-size: 30px;
    color: #000000;
    font-weight: 400;
    padding: 40px 0;
}

.youhui .vips .vips_list .vips_list_img {
    width: 670px;
    height: 380px;
    overflow: hidden;
}

.youhui .vips .vips_list .vips_list_img img {
    width: 100%;
    height: 100%;
    display: block;
    transition: all 0.5s;
}

.youhui .vips .vips_list:hover .vips_list_img img {
    transform: scale(1.2);
}

.youhui .vips .vips_list .vips_list_text {
    background-color: #efefed;
    padding: 45px 50px 60px;
}

.youhui .vips .vips_list .vips_list_text p {
    font-size: 18px;
    color: #010101;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /*要显示的行数*/
    -webkit-box-orient: vertical;
    line-height: 30px;
    height: 60px;
}

.youhui .vips .vips_list .vips_list_text .detal {
    float: right;
    margin-top: 10px;
    font-size: 18px;
    color: #a8916f;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;

}

.youhui .vips .vips_list:hover .vips_list_text .detal {
    background-color: #d5b08b;
    color: #fff;
}

.reserve {
    background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    display: flex;
    align-items: center;
}

.reserve .resfrom {
    width: 1000px;
    height: 970px;
    background: #fff;
    margin: auto;
}

.resfrom_title {
    height: 90px;
    background: #f4f4f4;
    width: 100%;
    font-size: 30px;
    color: #000000;
    line-height: 90px;
    text-align: center;
}

.resfrom_title span {
    font-size: 20px;
    color: #000000;
}

.resfrom_inp {
    width: 580px;
    margin: auto;
}

.reslist {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.reslist span {
    width: 147px;
    font-size: 20px;
    color: #000000;
}

.reslist .reslist_you {
    /* hahahaha */
    width: 433px;
    /* background-color: #f4f4f4; */
    height: 52px;
}

.reslist .reslist_you {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.reslist .reslist_you input {
    outline: none;
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    font-size: 18px;
    color: #575757;
    padding-left: 26px;
    box-sizing: border-box;
    padding-right: 40px;
}

.reslist .reslist_you .fullname {
    width: 243px;
}

.reslist .reslist_you .sex {
    width: 170px;
    height: 100%;
    background-color: #f4f4f4;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 0 26px;
    box-sizing: border-box;
    font-size: 18px;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /*用图片替换*/
    background-image: url("../../assets/img/botxia.png");
    background-size: 11px 6px;
    background-position: 90% 50%;
    background-repeat: no-repeat;
}

.reslist .reslist_you .xingzhi {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 0 26px;
    box-sizing: border-box;
    font-size: 18px;

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /*用图片替换*/
    background-image: url("../../assets/img/botxia.png");
    background-size: 11px 6px;
    background-position: 90% 50%;
    background-repeat: no-repeat;
}

.reslist .reslist_you .quhao {
    width: 170px;
}

.reslist .reslist_you .numbers {
    width: 243px;
}

.butn {
    width: 190px;
    height: 52px;
    line-height: 52px;
    font-size: 20px;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
}

.butn1 {
    background-color: #cfcfcf;
}

.butn2 {
    background-color: #d5b08b;
}</style>