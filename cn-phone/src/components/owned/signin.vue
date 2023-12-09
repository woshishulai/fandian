<template>
    <div class="container">
        <div class="conts">
            <div class="login">
                <div class="login_logo">
                    <img src="../../assets/img/head_logo.png" alt="">
                </div>
                <div class="logs">
                    <div class="txt_title">
                        <div class="" :class="denglv==1?'active':''" @click="btns1()">会员登录</div>
                        <div class="" :class="denglv==2?'active':''" @click="btns2()">会员注册</div>
                    </div>
                    
                    <div class="fomes1" v-if="denglv==1">
                        <div class="fomes1list">
                            <span>账号：</span>
                            <input type="text" placeholder="请输入手机号" v-model="signNumber">
                        </div>
                        <!-- <div class="fomes1list">
                            <span>密码：</span>
                            <input type="password" placeholder="请输入密码" v-model="signPassword">
                        </div> -->
                        <div class="fomes1list">
                            <span>验证码：</span>
                            <div class="fors2sky">
                                <input class="inpyanma" type="text" v-model="signPassword">
                                <div class="yanma" @click="getcode(2)">发送验证码</div>
                            </div>
                        </div>
                        <!-- <div class="fomes1list">
                            <span @click="forg()">忘记密码？</span>
                        </div> -->
                       
                        <div class="fomes1list">
                            <div class="de"  @click="denglu()">登录</div>
                        </div>

                        <div class="fomes1list fomes1listp">
                            <p class="wenzi">登录可享：预定折扣、积分奖励、会员专享礼遇</p>
                        </div>
                    </div>
                  
                    <div class="fomes2"  v-if="denglv==2">
                        <div class="fomes2list">
                            <span>输入手机号：</span>
                            <input class="inp2list" type="text" v-model="registerNumber">
                        </div>
                        <div class="fomes2list">
                            <span>请输入验证码：</span>
                            <div class="fors2sky">
                                <input class="inpyanma" type="text" v-model="registerCode">
                                <div class="yanma" @click="getcode(1)">发送验证码</div>
                            </div>
                        </div>
                        <!-- <div class="fomes2list">
                            <span>密码：</span>
                            <input class="inp2list" type="password" v-model="registerPassword1">
                        </div>
                        <div class="fomes2list">
                            <span>确认密码：</span>
                            <input class="inp2list" type="password" v-model="registerPassword2">
                        </div> -->
                        <div class="fomes2list">
                            <div class="zhu" @click="zhuce()">注册</div>
                        </div>
                    </div>
                    
                </div>
                <div class="zhanwei" v-if="denglv==1"></div>
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
                forgrtshow:false,
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
            // console.log(this.token)
            this.hotel_id = sessionStorage.getItem("hotel_id");
            this.hotelcode = sessionStorage.getItem("hotelcode");
            this.diaoyong()
            console.log(localStorage.getItem("denglv"))
            if(!localStorage.getItem("denglv")){
                this.denglv=1
            }
        },
        inject:['reload'],
        methods: {
            diaoyong(){
                this.denglv = localStorage.getItem("denglv");
            },
            btns1(){
                this.denglv=1
                localStorage.setItem("denglv", 1);
                // this.diaoyong()
            },
            btns2(){
                this.denglv=2
                localStorage.setItem("denglv", 2);
                // this.diaoyong()
            },
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
                if(index==2){
                    var that =this
                    that.$axios
                    .post(`${this.Baseurl}sendCode?web_token=${that.token}&type=${index}&tel=${that.signNumber}`) 
                    .then(function(res) {
                        console.log(res)
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
            //注册账号
            zhuce(){
                var re1= /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                if(!re1.test(this.registerNumber)){
                    ///^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\d{8}$/
                    this.tishi("请输入正确电话号码")
                    return;
                }
                if(this.registerCode==""){
                    this.tishi("请填写验证码")
                    return;
                }
                
                // console.log(this.registerCode)
                var that =this
                that.$axios
                    .post(`${this.Baseurl}register_user?web_token=${that.token}&tel=${that.registerNumber}&code=${that.registerCode}&pc_mobile=2&hotel_code=${that.hotelcode}`) 
                    .then(function(res) {
                        console.log(res)
                        // console.log(res.data.code)
                        if(res.data.status =="0"){
                            this.tishi("注册成功")
                            // that.tishi(res.data.msg)
                            this.denglv=0
                            // this.forgrtshow = true
                            this.diaoyong()
                        }else{
                            that.tishi(res.data.msg)
                        }
                        // Registrationcode  
                }).catch(err => console.log(err));
            },
            //登录账号
            denglu(){
                // console.log(this.signNumber)
                // console.log(this.signPassword)
                if(this.signNumber==""){
                    this.tishi("手机号不能为空")
                    return
                }
                if(this.signPassword==""){
                    this.tishi("密码不能为空")
                    return
                }
                var that =this
                that.$axios
                    .post(`${this.Baseurl}login_user?web_token=${that.token}&tel=${that.signNumber}&code=${that.signPassword}&hotel_code=${that.hotelcode}`) 
                    .then(function(res) {
                        console.log(res)
                        // sessionStorage.clear("accountNumber");
                        if(res.data.status =="0"){
                            that.tishi(res.data.msg)
                            sessionStorage.setItem("accountNumber", that.signNumber);
                            sessionStorage.setItem("loginfou", 1);
                            setTimeout(()=>{
                                that.$router.go(-1)
                            },1000)
                           
                        }else{
                            that.tishi(res.data.msg)
                            sessionStorage.setItem("loginfou", 2);
                        }
                        setTimeout(()=>{
                            localStorage.setItem("loginfou", 0);
                            that.diaoyong()
                            that.reload();
                        },1000)
                }).catch(err => console.log(err));
            },
            
            //忘记密码
            forg(){
                // console.log("点击忘记密码")
                // this.denglv=0
                // localStorage.setItem("loginfou", 0);
                // this.diaoyong()
                // this.forgrtshow = true
                this.$router.push({name: "Forgrt",});
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
        width: 50%;
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
    .fomes1{
        margin: auto;
        padding: 0 9.333vw;
        /* padding-top: 3.333vw; */
    }
    .fomes1 .fomes1list{
        margin-top: 3.667vw;
        /* display: flex;
        align-items: center; */
    }
    .fomes1 .fomes1list span{
        font-size: 4vw;
        color: #000000;
        display: block;
    }
    .fomes1 .fomes1list input{
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
    .fomes1 .fomes1list .de{
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
    .fomes1 .fomes1list.fomes1listp{
        margin-top: 2.5vw;
    }
    .fomes1 .fomes1list .wenzi{
        font-size: 3vw;
        text-align: center;
        color: #5f5f5f;
    }
    .fomes1 .fomes1list .fors2sky{
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
    .fomes1 .fomes1list .fors2sky .inpyanma{
        width: 48.000vw;
        height: 12.000vw;
        border: none;
        outline: none;
        padding: 0 4.667vw;
        font-size: 3.5vw;
        color: #989898;
        box-sizing: border-box;
        background-color: #f6f6f6;
        margin-top: 0;
    }
    .fomes1 .fomes1list .fors2sky .yanma{
        width: 22.667vw;
        height: 12.000vw;
        background-color: #f2f2f2;
        font-size: 3.5vw;
        line-height: 12.000vw;
        color: #206079;
        text-align: center;
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