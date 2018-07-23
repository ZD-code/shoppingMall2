<template>
    <div>
        <div class="nav-bar">
            <van-nav-bar title="商品信息" left-arrow left-text="返回" @click-left="back" @click-right="onRightIcon" fixed>
                <van-icon name="search" slot="right"></van-icon>
            </van-nav-bar>
        </div>
        <div class="content">
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
               <div id="list-box" class="list-box">
                    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" @load="onLoad">
                            <div class="list-item" v-for="(item,index) in list" :key="index">{{'item '+item}}</div>
                        </van-list>
                   </van-pull-refresh>
               </div>
            </van-col>
        </van-row>
        </div>
        <div>
            <van-tabbar v-model="activeId" fixed z-index=999>
                <van-tabbar-item icon='wap-home'>首页</van-tabbar-item>
                <van-tabbar-item icon='more'>分类</van-tabbar-item>
                <van-tabbar-item icon='shopping-cart'>购物车</van-tabbar-item>
                <van-tabbar-item icon='contact'>会员中心</van-tabbar-item>
            </van-tabbar>
        </div>
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
                active:0,
                activeId:0,
                list:[],
                loading:false,
                finished: false,
                isRefresh:false
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
            },
            onLoad(){
                setTimeout(() => {
                    for (let index = 0; index < 10; index++) {
                        this.list.push(this.list.length+1);
                    }
                    this.loading=false;
                    if(this.list.length >= 40){
                        this.finished=true;
                    }
                }, 500);
            },
            onRefresh(){
                setTimeout(() => {
                    this.isRefresh=false;
                    this.list=[];
                    this.onLoad();
                }, 500);
            }
        },
        created(){
            this.getCategory();
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight;
            document.getElementById('leftNav').style.height=winHeight-96+"px";
            document.getElementById('list-box').style.height=winHeight-90-50+'px';
        }
    }
</script>

<style scoped>
.van-nav-bar{
    z-index:100 !important;
}
#leftNav ul li {
    line-height: 44px;
    border-bottom:1px solid #E4E7ED;
    padding:0 3px;
    font-size:0.8rem;
    text-align: center;
}
.content{
    padding-top:46px;
}
.categoryActive{
    background-color: #fff;
}
    .list-item{
        text-align: center;
        line-height: 80px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
    }
    #list-box{
        overflow: scroll;
    }
</style>