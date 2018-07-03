<template>
    <div>
商品详情页
    </div>
</template>

<script>
import axios from "axios";
import url from "@/apiConfig";
    export default {
        data(){
            return {
                goodsId: '0032862950ca44d397e58a6fb10a3e38'
            }
        },
        created(){
            this.goodsId = this.$route.query.goodsId;
            console.log(this.goodsId)
            this.getInfo()
        },
        methods:{
            getInfo(){
                axios({
                    url:url.getDetailGoodsInfo,
                    method:'post',
                    data:{
                        goodsId: this.goodsId
                    }
                })
                .then(res => {
                    console.log(res)
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