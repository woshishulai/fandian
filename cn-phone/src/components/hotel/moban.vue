<template>
    <div class="container">
        <!-- 公共头部 -->
        <Header />

        <div class="conts">
            <!-- 






             -->
        </div>

        <!-- 公共底部 -->
        <Footer />
    </div>
</template>

<script>
    import Header from "../owned/header.vue"
    import Footer from "../owned/footer.vue"
    export default {
        components: {
            Header,
            Footer
        },
        data() {
            return {

            };
        },

        created() {
            // 储存第几个头部状态
            localStorage.setItem("istrue", 2);
        },
        methods: {

             

        },

    };
</script>
<style scoped>
/* 
 
  
 

*/

</style>