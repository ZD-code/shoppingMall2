<template>
    <div>
        <div class="main-div">
            <router-view></router-view>
        </div>
        <div>
            <van-tabbar v-model="active" @change="changeTabbar(active)">
                <van-tabbar-item icon="shop">首页</van-tabbar-item>
                <van-tabbar-item icon="records">列表</van-tabbar-item>
                <van-tabbar-item icon="cart">购物车</van-tabbar-item>
                <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
        </van-tabbar>  
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    changeTabbar(active) {
      switch (active) {
        case 0:
          this.$router.push({ name: "Home" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
        case 3:
          break;
      }
    }
  }
};
</script>

<style scoped>

</style>