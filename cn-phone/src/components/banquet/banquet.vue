<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <!-- 日历 -->
        <Queryhotel />
        <div class="conts">
            <div class="meal_top">
                <!-- <img src="../../assets/img/cande1.jpg" alt=""> -->
                <img :src="Baseurl+topimg" alt="">
            </div>
            <div class="canyin">
                <div class="main">
                    <div class="yuxiang" v-if="infolist[0]">
                        <div class="canyin_right">
                            <div class="canyin_right_text clearfix">
                                <span>{{infolist[0].name}}</span>
                                <p>{{infolist[0].news[0].description}}</p>
                                <div class="anniuyu" @click="yuyan()">预定宴会</div>
                            </div>
                        </div>
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
                        
                    </div>
                </div>
            </div>
            <div class="youhui">
                <div class="main">
                    <div class="vips" v-if="infolist[1]" >
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
            
        </div>
        <!-- bushi       haorenxuan -->

        <!-- 公共底部 -->
        <Footer />
    </div>
</template>

<script>
    import Header from "../owned/header.vue"
    import Footer from "../owned/footer.vue"
    import Swiper from "swiper";
    import Queryhotel from "../rooms/queryhotel.vue";
    export default {
        components: {
            Header,
            Footer,
            Queryhotel,
        },
        data() {
            return {
                token:'',//token
                hotel_id:'',//酒店id
                modularid:'',//模块id
                infolist:'',
                // yanhui:false,

                content1:'',
                content2:'',
                tipshow:false,//提示弹窗
                tipstext:'',//提示信息
                name:'',//姓名
                sex:1,//性别
                number:'',//电话号码
                datetime:'',//日期
                email:'',//邮箱
                xingzhi:'讲座',//性质
                renshu:'',//人数
                beizhu:'',//备注
                topimg:'',
                swiperImg:''
            };
        },

        created() {
             // 储存第几个头部状态
            localStorage.setItem("istrue", 4);
            this.token = sessionStorage.getItem("token");
            // console.log(this.token);
            this.hotel_id = sessionStorage.getItem("hotel_id");
            console.log(this.hotel_id)
            // if(sessionStorage.getItem("fieldData")){
            //     var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
            //    this.modularid = fieldData[3].id
            // }
            // this.getdatalist()
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
                    const fieldData = res.data.data.top_module_list;
                    that.modularid = fieldData[3].id
                    sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
                    that.getdatalist()
                    })
                    .catch((err) => console.log(err));
            },
            showHtml:function(str){
                        return str
                        .replace(str ? /&(?!#?\w+;)/g : /&/g, '&amp;')
                        .replace(/&lt;/g,"<")
                        .replace(/&gt;/g,">")
                        .replace(/&quot;/g,"\"")
                        .replace(/&#39;/g, "\'");
                    },
            getdatalist(){
                //?web_token=${that.token}&hotel_id=1
                var that =this
                that.$axios
                // &module_id=3
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`) 
                .then(function(res) {
                    console.log(that.modularid)
                    console.log(res)
                    that.topimg =res.data.data.top_module_list[3].mobile_image
                    that.infolist =  res.data.data.defaul_module_list
                    console.log(that.infolist)	
                    //infolist
                    //defaul_module_list 
                    that.infolist[1].news[0].pc_content=that.showHtml(that.infolist[1].news[0].pc_content)
                    var array =  that.infolist[0].news[0].images
                    var result = []
                    for (let i = 0; i < array.length; i++) {
                        if(array[i].type==1)
                        result.push(array[i])
                    }
                    that.swiperImg = result
                   
                    that.$nextTick(function(){
                        var luncanyin = new Swiper(".luncanyin", {
                            loop: true, // 循环模式选项
                            autoplay:true,
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
            todetail(id){
                console.log('id:'+id)
                this.$router.push({name:'Details',
                query:{
                        detailsId:id,
                        img:this.topimg
                    }
                }) 
            },
            yuyan(){
                // this.$router.push('/banquetyu?date' + Date.now());
                this.$router.push({name:'BanquetYu'}) 
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
        padding-bottom: 74px;
        padding-top: 1px;
    }

    .yuxiang {
        margin-top: 5.333vw;
        background-color: #fff;
        /* display: flex; */
        /* height: 520px; */
    }


    .canyinlun {
        width: 100%;
        /* height: 520px; */
        height: 85.467vw;
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
    .canyin_right{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-bottom: 6.667vw;
    }
    .canyin_right .canyin_right_text{
        width: 76.000vw;
        padding-top: 5.333vw;
    }
    .canyin_right .canyin_right_text>span {
        font-size: 5vw;
        color: #000000;
    }

    .canyin_right .canyin_right_text>p {
        line-height: 6vw;
        margin-top: 4.000vw;
        font-size: 3.5vw;
        color: #000000;
        /* display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical; */
    }
    .anniuyu{
        width: 74.667vw;
        height: 9.333vw;
        background-color: #d5b08b;
        font-size: 4vw;
        color: #fff;
        line-height: 9.333vw;
        text-align: center;
        /* float: right; */
        margin: auto;
        margin-top: 6.667vw;
    }

    .youhui {
        width: 100%;
    }

    .youhui .vips {
        /* display: flex;
        justify-content: space-between; */
        padding-bottom: 5.333vw;
    }

    .youhui .vips .vips_list{
        width: 100%;
        cursor: pointer;
        /* width: 670px; */
    }
    .youhui .vips .vips_list .youhui_title {
        font-size: 5vw;
        color: #000000;
        font-weight: 400;
        padding: 5.067vw 0;
    }

    .youhui .vips .vips_list .vips_list_img {
        width: 100%;
        /* height: 423px; */
        height: 50.667vw;
        overflow: hidden;
    }

    .youhui .vips .vips_list .vips_list_img img {
        width: 100%;
        height: 100%;
        display: block;
        /* transition: all 0.5s; */
    }

    /* .youhui .vips .vips_list:hover .vips_list_img img {
        transform: scale(1.2);
    } */

    .youhui .vips .vips_list .vips_list_text {
        background-color: #efefed;
        width: 76.000vw;
        width: 100%;
        margin: auto;
        padding: 5.867vw 6.667vw 5.067vw;
        box-sizing: border-box;
    }

    .youhui .vips .vips_list .vips_list_text p {
        font-size: 3.5vw;
        color: #010101;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        /*要显示的行数*/
        -webkit-box-orient: vertical;
        line-height: 6vw;
        height: 12vw;
    }
    .youhui .vips .vips_list .vips_list_text .detal{
        float: right;
        margin-top: 10px;
        font-size: 18px;
        color: #a8916f;
    }
    .reserve{
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
    .reserve .resfrom{
        width: 1000px;
        height: 870px;
        background: #fff;
        margin: auto;
    }
    .resfrom_title{
        height: 100px;
        background: #f4f4f4;
        width: 100%;
        font-size: 30px;
        color: #000000;
        line-height: 100px;
        text-align: center;
    }
    .resfrom_title span{
        font-size: 20px;
        color: #000000;
    }
    .resfrom_inp{
        width: 580px;
        margin: auto;
    }
    .reslist{
        margin-top: 39px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .reslist span{
       width: 147px;
       font-size: 20px;
       color: #000000;
    }
    .reslist .reslist_you{
        /* hahahaha */
        width: 433px;
        /* background-color: #f4f4f4; */
        height: 52px;
    }
    .reslist .reslist_you{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .reslist .reslist_you input{
        outline: none;
        border: none;
        border-radius: 5px;
    }
    .reslist .reslist_you input{
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
        font-size: 18px;
        color: #575757;
        padding-left: 26px;
        box-sizing: border-box;
    }
    .reslist .reslist_you .fullname{
        width: 243px;
    }
    .reslist .reslist_you .sex{
        width: 170px;
        height: 100%;
        background-color: #f4f4f4;
        outline: none;
        border: none;
        border-radius: 5px;
        padding:0 26px;
        box-sizing: border-box;
    }
    .reslist .reslist_you .quhao{
        width: 170px;
    }
    .reslist .reslist_you .numbers{
        width: 243px;
    }
    .butn{
        width: 190px;
        height: 52px;
        line-height: 52px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
    }
    .butn1{
        background-color: #cfcfcf;
    }
    .butn2{
        background-color: #d5b08b;
    }

</style>