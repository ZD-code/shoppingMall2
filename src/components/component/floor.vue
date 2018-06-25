<template>
    <div>
        <div class="floor">
            <div class="title">{{floorTitle}}</div>
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img :src="floor1_0.image" alt="" width="100%">
                </div>
                <div>
                    <div class="floor-two">
                        <img :src="floor1_2.image" width="100%">
                    </div>
                    <div>
                        <img :src="floor1_3.image" width="100%">
                    </div>
                </div>
            </div>
        
            <div class="floor-rule">
                <div v-for="(item,index) in floor2" :key="index">
                    <img :src="item.image" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['floorData', 'floorTitle'],
        data() {
            return {
                floor1_0: {},
                floor1_2: {},
                floor1_3: {},
                floor2: []
            }
        },
        watch: {
            floorData: function(val) {
                this.floor1_0 = val[0];
                this.floor1_2 = val[1];
                this.floor1_3 = val[2];
                this.floor2 = val.slice(3);
            }
        }
    }
</script>
<style scoped>
    .floor-anomaly {
        display: flex;
        background: #fff;
        border-bottom: 1px solid #ddd;
    }
    
    .floor-anomaly div {
        flex: 1;
        box-sizing: border-box;
    }
    
    .floor-one {
        border-right: 1px solid #ddd;
    }
    
    .floor-two {
        border-bottom: 1px solid #ddd;
    }
    
    .floor-rule {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #fff;
    }
    
    .floor-rule div {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 10rem;
        border-bottom: 1px solid #ddd;
    }
    
    .floor-rule div:nth-child(odd) {
        border-right: 1px solid #ddd;
    }
    
    .title {
        padding: .5rem 0;
        text-align: center;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.9rem;
        color: #e5017d;
    }
</style>