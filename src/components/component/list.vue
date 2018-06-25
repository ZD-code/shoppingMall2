<template>
    <div>
        <div class="goods">
            <div class="goodsImg">
                <img v-lazy="goodImage" width="100%">
            </div>
            <div class="goodName">{{goodName}}</div>
            <div class="goodPrice">￥{{goodPrice | moneyFilter}}</div>
        </div>
    </div>
</template>

<script>
    import {
        toMoney
    } from '@/filter/money';
    export default {
        props: ["goodImage", "goodName", "goodPrice"],
        data() {
            return {

            }
        },
        filters: {
            moneyFilter(money) {
                return toMoney(money);
            }
        }
    }
</script>

<style scoped>
    .goods {
        background: #fff;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
    }
    
    .goodName {
        padding: 0 8px;
        overflow: hidden;
        font-size: 0.8rem;
        color: #999;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .goodPrice {
        padding: 0.2rem;
        font-size: 0.6rem;
        color: #444;
    }
</style>