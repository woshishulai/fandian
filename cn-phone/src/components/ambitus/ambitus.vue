<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />
        <!-- 日历 -->
        <Queryhotel />
        <div class="conts">
            <div class="meal_top">
                <!-- <img src="../../assets/img/shiji.jpg" alt=""> -->
                <img :src="Baseurl+topimg" alt="">
            </div>
            <div class="ambitus">
                <div class="assoc">
                        <div class="shiji">
                            <div class="shiji_logo"><img src="../../assets/img/shijilogo.png" alt=""></div>
                            <p class="jiaru">加入世纪会wow体验我们为您提供贴心贴意的服务</p>
                        </div>
                        <div class="buttons">
                            <div class="btn" @click="denglv()">登录</div>
                            <div class="btn" @click="zhuce()">注册</div>
                        </div>
                </div>
                <div class="main">
                    
                    <div class="huiyuan">
                        <!-- <div class="huiyuan_text">
                            <p>加入世纪会wow体验我们为您提供贴心贴意的服务'w</p>
                            <img src="../../assets/img/shiji.jpg" alt="">
                            
                        </div> -->
                        <div class="huiyuan_text" v-html="infolist[0].news[0].pc_content">
                            <!-- <p>加入世纪会wow体验我们为您提供贴心贴意的服务'w</p>
                            <img src="../../assets/img/shiji.jpg" alt=""> -->
                            
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
                infolist:[],
                topimg:''
            };
        },
        created() {
            // 储存第几个头部状态
            localStorage.setItem("istrue", 6);
            this.token = sessionStorage.getItem("token");
            // console.log(this.token);
            this.hotel_id = sessionStorage.getItem("hotel_id");
            // if(sessionStorage.getItem("fieldData")){
            //     var fieldData = JSON.parse(sessionStorage.getItem("fieldData"))
            //    this.modularid = fieldData[5].id
            // }
            this.getinfolist()
            // this.getdatalist()
        },
        inject:['reload'],
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
                        that.modularid = fieldData[5].id
                        sessionStorage.setItem("fieldData", JSON.stringify(fieldData));
                        that.getdatalist()
                    })
                    .catch((err) => console.log(err));
            },
            getdatalist(){
                //?web_token=${that.token}&hotel_id=1
                var that =this
                that.$axios
                // &module_id=3
                .get(`${this.Baseurl}home_data?web_token=${that.token}&hotel_id=${that.hotel_id}&module_id=${that.modularid}`) 
                .then(function(res) {
                    console.log(res)
                    that.topimg =res.data.data.top_module_list[5].mobile_image
                    that.infolist =  res.data.data.defaul_module_list
                    console.log(that.infolist)	
                    //infolist
                    //defaul_module_list 
                    
                    // that.$nextTick(function(){
                    //     that.lunboone()
                    // })
                }).catch(err => console.log(err));
            },
            denglv(){
                 localStorage.setItem("denglv", 1);
                //  this.$router.push('/signin?date' + Date.now());
                 this.$router.push({name:'Signin'}) 
               
                // // console.log(localStorage.getItem("denglv"))
                this.reload();
            },
            zhuce(){
                localStorage.setItem("denglv", 2);
                // this.$router.push('/signin?date' + Date.now());
                this.$router.push({name:'Signin'}) 
                
                this.reload();
            }
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


    .ambitus{
        width: 100%;
        
    }
    .assoc{
        background-color: #efefed;
        padding-bottom: 8.000vw;
    }
    .assoc .shiji {
        padding-top: 8.133vw;
        width: 100%;
        /* 71.600vw */
    }

    .assoc .shiji .shiji_logo {
        width: 16.267vw;
        height: 11.467vw;
        margin: auto;
        text-align: center;
    }

    .assoc .shiji .shiji_logo img {
        width: 100%;
        height: 100%;
        display: block;
    }

    .assoc .shiji .jiaru {
        text-align: center;
        margin: auto;
        font-size: 3.2vw;
        color: #5f5f5f;
        margin-top: 2.667vw;
        font-weight: 400;
    }
    .assoc .buttons{
        width: 71.600vw;
        margin: auto;
        margin-top: 6vw;
        display: flex;
        justify-content: space-between;
    }
    .assoc .buttons .btn{
        width: 32.000vw;
        height: 10.000vw;
        background-color: #d5b08b;
        text-align: center;
        color: #fff;
        line-height: 10.000vw;
        font-size: 4vw;
        /* margin: 0 45px; */
        cursor: pointer;
    }
    .huiyuan{
        width: 100%;
        background: #fff;
        padding: 35px 0;
    }
    .huiyuan .huiyuan_text{
        width: 100%;
        margin: auto;
    }
    .huiyuan .huiyuan_text p{
        font-size: 3.4vw;
    }
    .huiyuan .huiyuan_text img{
        max-width: 100%;
        display: block;
    }
    .huiyuan .huiyuan_text /deep/ p, .huiyuan .huiyuan_text /deep/ span{
        font-family: siyuan !important;
    }
    .huiyuan .huiyuan_text /deep/ img{
        max-width: 100%;
        display: block;
        margin: auto;
    }
    
</style>