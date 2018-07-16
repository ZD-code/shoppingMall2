<template>
    <div style="padding-bottom:65px;">
        <div class="navbar-div">
            <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        </div>
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%">
        </div>
        <div class="goods-name" v-text="goodsInfo.NAME"></div>
        <div class="goods-price">价格：￥{{goodsInfo.PERSENT_PRICE | moneyFilter}}</div>
        <div>
            <van-tabs sticky swipeable>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL">

                    </div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中……
                </van-tab>
            </van-tabs>
        </div>
        <div class="goods-bottom">
            <div>
                <van-button size="large">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="primary">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import url from "@/apiConfig";
import { Toast } from "vant";
import {toMoney} from "@/filter/money";
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
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
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
 .detail{
     font-size:0px;
    }
    .goods-name{
        background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
    }
    .goods-bottom{
    position: fixed;
    bottom:0px;
    left:0px;
    background-color: #FFF;
    width:100%;

    display: flex;
    flex-direction: row;
    flex-flow: nowrap;
}
.goods-bottom > div{
    flex:1;
    padding:5px;
}

</style>