<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="4">
                    <van-icon name="location" class="icon-location"></van-icon>
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="4">
                    <van-button size="mini" class="search-button" @click="goRegister">注册</van-button>
                </van-col>
            </van-row>
        </div>
        
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item,index) in bannerPicArr" :key="index">
                    <img v-lazy="item.image" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>

        <div class="type-bar">
            <div v-for="(item,index) in category" :key="index" class="type-bar-item">
                <img v-lazy="item.image" alt="" width="100%" class="img">
                <span class="word">{{item.mallCategoryName}}</span>
            </div>
        </div>
        <div class="ad-banner">
            <img v-lazy="advertes" width="100%">
        </div>

        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption" class="swiper-container">
                    <swiper-slide v-for="(item,index) in recommends" :key="index" class="swiper-slide-item">
                        <div class="recommend-item">
                            <img :src="item.image" width="100%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.mallPrice|moneyFilter}}</div>
                            <div class="oldPrice">￥{{item.price | moneyFilter}}</div>
                        </div>
                    </swiper-slide>
                </swiper>
            
            </div>
        </div>
        <!-- <swiper1></swiper1>
        <texts></texts> -->
        <floor :floorData="floor1" :floorTitle="floorNames.floor1"></floor>
        <floor :floorData="floor2" :floorTitle="floorNames.floor2"></floor>
        <floor :floorData="floor3" :floorTitle="floorNames.floor3"></floor>
        <div class="hots-area">
            <div class="hots-title">热卖商品</div>
        <van-row>
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                <hotGoods :goodImage='item.image' :goodName="item.name" :goodPrice="item.price"></hotGoods>
            </van-col>
        </van-row>
        </div>
    </div>
</template>

<script>
    import {
        toMoney
    } from "../filter/money";
    import 'swiper/dist/css/swiper.css'
    import axios from 'axios'
    // import swiper1 from './swiper/swiper1'
    // import texts from './swiper/text'
    import floor from "./component/floor";
    import hotGoods from '@/components/component/list'
    import url from '@/apiConfig.js'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                // goodsName: '',
                bannerPicArr: [],
                category: [],
                advertes: '',
                recommends: {},
                swiperOption: {
                    slidesPerView: 3
                },
                floor1: [],
                floor2: [],
                floor3: [],
                floorNames: {},
                hotGoods: []
            }
        },
        components: {
            swiper,
            swiperSlide,
            floor,
            hotGoods
            // swiper1,
            // texts
        },
        methods: {
            goRegister() {
                this.$router.push('/register')
            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        },
        created() {
            axios({
                url: url.getAll,
                method: 'get'
            }).then(res => {
                if (res.status === 200) {
                    let resData = res.data.data;
                    // console.log(resData);
                    this.bannerPicArr = resData.slides;
                    this.category = resData.category;
                    this.advertes = resData.advertesPicture.PICTURE_ADDRESS;
                    this.recommends = resData.recommend;
                    this.floor1 = resData.floor1;
                    this.floor2 = resData.floor2;
                    this.floor3 = resData.floor3;
                    this.floorNames = resData.floorName;
                    this.hotGoods = resData.hotGoods;
                }
            }).catch(err => {
                throw new Error(err);
            })
        }
    }
</script>

<style scoped>
    .search-bar {
        height: 2.2rem;
        line-height: 2.2rem;
        text-align: center;
        background: #e5017d;
        font-size: 0.8rem;
    }
    
    .icon-location {
        font-size: 1rem;
        color: #fff;
        vertical-align: middle;
    }
    
    .search-input {
        width: 100%;
        border: none;
        line-height: 2rem;
        text-align: left;
        box-sizing: border-box;
        padding: 0 0.2rem;
    }
    
    .swiper-area {
        width: 100%;
        clear: both;
    }
    
    .type-bar {
        margin: 0.3rem 0.2rem;
        background: #ffffff;
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    
    img {
        display: block;
    }
    
    .type-bar-item {
        flex: 1;
        padding: 0.3rem;
        font-size: 12px;
        text-align: center;
    }
    
    .ad-banner {
        margin: 0 0.2rem 0.3rem;
    }
    
    .recommend-area {
        background-color: #fff;
        margin-top: .3rem;
    }
    
    .recommend-title {
        border-bottom: 1px solid #eee;
        font-size: 14px;
        padding: .2rem;
        color: #e5017d;
    }
    
    .recommend-body {
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
    }
    
    .recommend-item {
        width: 100%;
        height: 100%;
        border-right: 1px solid #eee;
        text-align: center;
        box-sizing: border-box;
    }
    
    .recommend-item div {
        font-size: 0.8rem;
    }
    
    .swiper-container {
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: space-around;
        flex-wrap: nowrap;
    }
    
    .swiper-container .swiper-wrapper {
        height: auto !important;
    }
    
    .swiper-container .swiper-slide {
        height: auto !important;
    }
    
    .recommend-item .oldPrice {
        font-size: 0.6rem;
        text-decoration: line-through;
        color: #ccc;
    }
    
    .hots-title {
        padding: 0.3rem;
        font-size: 0.9rem;
        color: #e5017d;
        background: #fff;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        margin-top: 0.6rem;
    }
</style>