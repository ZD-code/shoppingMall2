<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="商品信息" left-arrow left-text="返回" @click-left="back" @click-right="onRightIcon">
                <van-icon name="search" slot="right"></van-icon>
            </van-nav-bar>
        </div>
        <van-row>
            <van-col span="6">
                <div id="leftNav">
                    <ul>
                        <li v-for="(item, index) in category" v-bind:key="index" v-bind:class="{categoryActive:categoryIndex==index}" @click="clickCategory(index,item.ID)">{{item.MALL_CATEGORY_NAME}}</li>
                    </ul>
                </div>
            </van-col>
            <van-col span="18">
               右侧列表
            </van-col>
        </van-row>
    </div>
</template>clickCategory

<script>
import axios from 'axios'
import url from "@/apiConfig.js"
import { Toast } from "vant";
    export default {
        data(){
            return {
                category:[],
                categoryIndex:0,
                categoryType:''
            }
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
                    if(res.data.code == 200 && res.data.message){
                        console.log(res.data.message)
                        this.category = res.data.message;
                    }else{
                        Toast('服务器错误！')
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            clickCategory(index,id){
                console.log(index,id)
                this.categoryIndex = index;
                this.categoryType=id;
            }
        },
        created(){
            this.getCategory();
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight;
            document.getElementById('leftNav').style.height=winHeight-46+"px";
        }
    }
</script>

<style scoped>
#leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}

.categoryActive{
    background-color: #fff;
}
</style>