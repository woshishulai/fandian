<script setup>
import { ref, computed, reactive, onMounted, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Header from '@/components/layout/header.vue';
import Footer from '@/components/layout/footer.vue';
import Queryhotel from '../rooms/queryhotel.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({})
onMounted(() => { });
const token = ref('')
const hotel_id = ref('')
const modularid = ref('')
const infolist = ref([])
const topimg = ref('')
const topname = ref('')
localStorage.setItem("istrue", 6);
token.value = sessionStorage.getItem("token");
hotel_id.value = sessionStorage.getItem("hotel_id");
const reload = inject('reload');

</script>

<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />

        <div class="conts">
            <div class="meal_top">
                <!-- <img :src="Baseurl+infolist[0].pc_image" alt=""> -->
                <img :src="Baseurl + topimg" alt="">
            </div>
            <div class="crumbs">
                <p>您的位置：首页 > {{ topname }}</p>
            </div>
            <Queryhotel class="Queryhotel" />
            <div class="ambitus">
                <div class="main">
                    <div class="assoc">
                        <div class="shiji">
                            <div class="shiji_logo"><img src="../../assets/img/shijilogo.png" alt=""></div>
                            <p class="jiaru">{{ infolist[0]?.news[0]?.description }}</p>
                        </div>
                        <div class="buttons">
                            <div class="btn" @click="denglv()">登录</div>
                            <div class="btn" @click="zhuce()">注册</div>
                        </div>
                    </div>
                    <div class="huiyuan">
                        <div class="huiyuan_text" v-html="infolist[0]?.news[0].pc_content">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 公共底部 -->
        <Footer />
    </div>
</template>

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

.ambitus {
    width: 100%;
    background-color: #efefed;
}

.assoc .shiji {
    width: 100%;
}

.assoc .shiji .shiji_logo {
    width: 122px;
    height: 86px;
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
    font-size: 18px;
    color: #5f5f5f;
    margin-top: 30px;
    font-weight: 400;
}

.assoc .buttons {
    margin-top: 30px;
    display: flex;
    /* margin: auto; */
    justify-content: center;
}

.assoc .buttons .btn {
    width: 185px;
    height: 55px;
    background-color: #d5b08b;
    text-align: center;
    color: #fff;
    line-height: 55px;
    font-size: 20px;
    margin: 0 45px;
    cursor: pointer;
}

.huiyuan {
    width: 100%;
    background: #fff;
    padding: 35px 0;
    margin-top: 80px;
}

.huiyuan .huiyuan_text {
    width: 1200px;
    margin: auto;
    font-size: 18px;
}

.huiyuan .huiyuan_text p {
    font-size: 18px;
}

.huiyuan .huiyuan_text img {
    max-width: 100%;
    display: block;
}

.huiyuan .huiyuan_text /deep/ p,
.huiyuan .huiyuan_text /deep/ span {
    /* font-size: 18px; */
    font-family: siyuan !important;
}

.huiyuan .huiyuan_text /deep/ img {
    max-width: 100%;
    display: block;
    margin: auto;
}
</style>