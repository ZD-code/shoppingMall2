<template>
    <div>
        <swiper v-bind:options="optionsSwiper" class="swiperContainer">
            <swiper-slide class="swiepr-slide" v-for="(item,index) in slides" :key="index">
                Slide {{item}}
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                slides: [1, 2, 3, 4, 5],
                optionsSwiper: {
                    loop: true,
                    direction: 'vertical',
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
    .swiper-slide {
        width: 100%;
        height: 5rem;
        line-height: 5rem;
        text-align: center;
        border-bottom: 1px solid #cccccc;
    }
    
    .swiperContainer {
        height: 5rem;
    }
</style>