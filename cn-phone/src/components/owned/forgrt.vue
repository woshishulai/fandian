<template>
    <div class="container">
        <div class="conts">
            <div class="login">
                <div class="login_logo">
                    <img src="../../assets/img/head_logo.png" alt="">
                </div>
                <div class="logs">
                    <div class="txt_title">
                        <div class="active">找回密码</div>
                    </div>
                    
                    <div class="fomes2" >
                        <div class="fomes2list">
                            <span>输入手机号：</span>
                            <input class="inp2list" type="text" v-model="forgetnumber">
                        </div>
                        <div class="fomes2list">
                            <span>请输入验证码：</span>
                            <div class="fors2sky">
                                <input class="inpyanma" type="text" v-model="forgetcode">
                                 <div class="yanma" @click="getcode(3)">发送验证码</div>
                            </div>
                        </div>
                        <div class="fomes2list">
                            <span>新密码：</span>
                            <input class="inp2list" type="password" v-model="forgetmima">
                        </div>
                        <div class="fomes2list">
                            <span>确认新密码：</span>
                            <input class="inp2list" type="password" v-model="forgetmima2">
                        </div>
                        <div class="fomes2list">
                            <div class="zhu" @click="forget()">提交</div>
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
    </div>
</template>

<script>

    export default {
        components: {
        },
        data() {
            return {
                denglv:1, 
                token:'',
                hotel_id:'',
                hotelcode:'',
                menulist:'',
                menushow:false,//开关
                yuyanshow:false,//语言切换
                // meau:['酒店与度假酒店','住宿','餐饮','宴会','体验','世纪会'],
                // isTrue:1,
                isTrue: localStorage.getItem("istrue"),
                tipshow:false,
                //注册
                registerNumber:'',
                tipstext:'',
                code:'',
                registerCode:"",
                registerPassword1:"",
                registerPassword2:"",
                // 登录
                signNumber:'',
                signPassword:'',

                //忘记密码
                // forgrtshow:false,
                forgetnumber:'',
                forgetcode:'',
                forgetmima:'',
                forgetmima2:'',
                //登录成功状态
                accountNumber: sessionStorage.getItem("accountNumber"),
            };
        },

        created() {
            this.token = sessionStorage.getItem("token");
            this.hotel_id = sessionStorage.getItem("hotel_id");
            this.hotelcode = sessionStorage.getItem("hotelcode");
        },
        inject:['reload'],
        methods: {
           
            // 注册获取验证码
            getcode(index){
                // console.log(this.registerNumber)
                if(index==1){
                    var that =this
                    that.$axios
                    .post(`${this.Baseurl}sendCode?web_token=${that.token}&type=${index}&tel=${that.registerNumber}`) 
                    .then(function(res) {
                        // console.log(res)
                        // console.log("type类型:"+index)
                        // console.log(res.data.code)
                        if(res.data.code=="0"){
                            that.tishi(res.data.msg)
                        }else{
                            that.tishi("已发送验证码，请注意查收")
                        }
                    }).catch(err => console.log(err));
                }
                if(index==3){
                    var that =this
                    that.$axios
                    .post(`${this.Baseurl}sendCode?web_token=${that.token}&type=${index}&tel=${that.forgetnumber}`) 
                    .then(function(res) {
                        // console.log(res)
                        // console.log("type类型:"+index)
                        // console.log(res.data.code)
                        if(res.data.code=="0"){
                            that.tishi(res.data.msg)
                        }else{
                            that.tishi("已发送验证码，请注意查收")
                        }
                    }).catch(err => console.log(err));
                }
            },
            //提示
            tishi(text){
                this.tipshow=true
                this.tipstext=text
                setTimeout(()=>{
                    this.tipshow=false
                    this.tipstext=""
                },3000)
            },
           
            forget(){
                var re1= /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                if(!re1.test(this.forgetnumber)){
                    this.tishi("请输入正确电话号码")
                    return;
                }
                if(this.forgetcode==""){
                    this.tishi("请填写验证码")
                    return;
                }
                if(this.forgetmima!=this.forgetmima2){
                    this.tishi("两次密码不一致")
                    return;
                }
                var that =this
                that.$axios
                    .post(`${this.Baseurl}reset_pwd?web_token=${that.token}&tel=${that.forgetnumber}&code=${that.forgetcode}&pwd=${that.forgetmima}&pwd1=${that.forgetmima2}`) 
                    .then(function(res) {
                        console.log(res)
                        // res.data.code
                        that.tishi(res.data.msg)
                        if(res.data.code==1){
                            setTimeout(()=>{
                                that.$router.go(-1)
                            },1000)
                        }
                        
                        
                }).catch(err => console.log(err));
            },
             

        },

    };
</script>
<style scoped>
/* body{
    background-color: #efefed !important;
} */
    .conts{
        width: 100%;
        /* height: 100vh; */
        background-color: #efefed;
    }

    .login{
        width: 100%;
        margin: auto;
        margin-top: 12.933vw;
        /* background-color: #fff; */
        position: relative;
        padding-bottom: 7.333vw;
    }
    
    .login_logo{
        width: 21.333vw;
        margin: auto;
        padding-top: 3.333vw;
    }
    .login_logo img{
        width: 100%;
        display: block;
       
    }
    .logs{
        width: 89.333vw;
        background-color: #fff;
        padding-bottom: 10.000vw;
        margin: auto;
        box-shadow: 0px 0px 2px 3px #000;
        border-radius: 2vw;
        overflow: hidden;
        margin-top: 12.267vw;
        box-shadow: 0px 0px 9px 1px #d4d2d2;
        
    }
    .txt_title{
        display: flex;
        align-items: center;
    }
    .txt_title div{
        width: 100%;
        height: 12.667vw;
        background-color: #f2f2f2;
        font-size: 4.5vw;
        color: #9f9f9f;
        text-align: center;
        line-height: 12.667vw;
        cursor: pointer;
    }
    .txt_title div.active{
        background-color: #d5b08b;
        color: #fff;
    }
    .fomes2{
        margin: auto;
        padding: 0 9.333vw;
    }
    .fomes2 .fomes2list{
        margin-top: 3.667vw;
    }
    .fomes2 .fomes2list span{
        font-size: 4vw;
        color: #000000;
        display: block;
    }
    .fomes2 .fomes2list .inp2list{
        width: 70.667vw;
        height: 12.000vw;
        border: none;
        border-radius: 2vw;
        background-color: #f6f6f6;
        outline: none;
        padding: 0 4.667vw;
        font-size: 3.5vw;
        color: #989898;
        box-sizing: border-box;
        margin-top: 3.333vw;
    }
    .fomes2 .fomes2list .fors2sky{
        width: 70.667vw;
        height: 12.000vw;
        border: none;
        border-radius: 2vw;
        background-color: #f6f6f6;
        box-sizing: border-box;
        margin-top: 4.333vw;
        overflow: hidden;
        display: flex;
    }
    .fomes2 .fomes2list .fors2sky .inpyanma{
        width: 48.000vw;
        height: 12.000vw;
        border: none;
        outline: none;
        padding: 0 4.667vw;
        font-size: 3.5vw;
        color: #989898;
        box-sizing: border-box;
        background-color: #f6f6f6;
    }
    .fomes2 .fomes2list .fors2sky .yanma{
        width: 22.667vw;
        height: 12.000vw;
        background-color: #f2f2f2;
        font-size: 3.5vw;
        line-height: 12.000vw;
        color: #206079;
        text-align: center;
    }
    .fomes2 .fomes2list .zhu{
         width: 70.667vw;
        height: 12.000vw;
        background-color: #d5b08b;
        color: #fff;
        text-align: center;
        line-height: 12.000vw;
        font-size: 4.5vw;
        border-radius: 2vw;
        margin-top: 6.667vw;
    }
    .zhanwei{
        height: 48vw;
    }

</style>