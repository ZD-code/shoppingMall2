<template>
    <div>
<div class="navbar-div">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
</div>
<div class="topimage-div">
    <img :src="goodsInfo.IMAGE1" width="100%">
</div>
<div class="goods-detail" v-html="goodsInfo.DETAIL">

</div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/apiConfig";
import { Toast } from "vant";
    export default {
        data(){
            return {
                goodsId: '',
                goodsInfo: {}
            }
        },
        created(){
            this.goodsId = this.$route.query.goodsId;
            console.log(this.goodsId)
           this.getGoodsInfo();
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            getGoodsInfo(){
                axios({
                    url:url.getDetailGoodsInfo,
                    method:'post',
                    data:{
                        goodsId: this.goodsId
                    }
                })
                .then(res => {
                    console.log(res)

                    if(res.data.code == 200 && res.data.message){
                        this.goodsInfo = res.data.message;
                    }else{
                        Toast('服务器错误，数据获取失败');
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>

</style>