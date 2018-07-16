<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="商品信息" left-arrow left-text="返回" @click-left="back" @click-right="onRightIcon">
                <van-icon name="search" slot="right"></van-icon>
            </van-nav-bar>
        </div>
        <van-row>
            <van-col span="6">
                <div id="leftNav">左侧导航</div>
            </van-col>
            <van-col span="18">
                右侧列表
            </van-col>
        </van-row>
    </div>
</template>

<script>
import axios from 'axios'
import url from "@/apiConfig.js"
import { Toast } from "vant";
    export default {
        data(){
            return {}
        },
        methods:{
            back(){
                this.$router.go(-1);
            },
            onRightIcon(){
                Toast('点击了搜索按钮')
            },
            getCategory(){
                axios({
                    type:'get',
                    url:url.getCategoryList
                })
                .then(res=>{
                     console.log(res)
                    if(res.data.code == 200 && res.data.message){
                        // console.log(res.data.message)
                    }else{
                        Toast('服务器错误！')
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        created(){
            this.getCategory();
        }
    }
</script>

<style scoped>

</style>