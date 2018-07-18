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
               <div>
                   <van-tabs v-model="active">
                       <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                   </van-tabs>
               </div>
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
            return {
                category:[],
                categoryIndex:0,
                categorySub:[],
                active:0
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
                    method:'get',
                    url:url.getCategoryList
                })
                .then(res=>{
                    if(res.data.code == 200 && res.data.message){
                        this.category = res.data.message;
                    
                        this.getCategorySubByCategoryId(this.category[0].ID);
                    }else{
                        Toast('服务器错误！')
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            clickCategory(index,id){
                this.categoryIndex = index;
                this.getCategorySubByCategoryId(id);
            },
            getCategorySubByCategoryId(categorySubId){
                axios({
                    method:'post',
                    url:url.getCategorySubList,
                    data:{categorySubId:categorySubId}
                })
                .then(res=>{
                    if(res.data.code == 200 && res.data.message){
                        console.log(res.data.message)
                        this.categorySub = res.data.message;
                        this.active=0;
                    }
                }).catch(err=>{
                    console.log(err);
                })
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