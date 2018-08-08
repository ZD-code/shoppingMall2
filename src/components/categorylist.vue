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
                   <van-tabs v-model="active"  @click="clickCategorySubId">
                       <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                   </van-tabs>
               </div>
               <div id="list-box" class="list-box">
                    <van-pull-refresh v-model="isRefresh" @refresh="onRefreshList">
                        <van-list v-model="loading" :finished="finished" @load="onLoadList">
                            <div class="list-item" v-for="(item,index) in list" :key="index" @click="goGoodsInfo(item.ID)">
                                <div class="list-item-img"><img :src="item.IMAGE1" width="100%" alt="" :onerror="errorImg"></div>
                                <div class="list-item-text">
                                    <div>{{item.NAME}}</div>
                                    <div>￥{{item.ORI_PRICE}}</div> 
                                </div>
                            </div>
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
import axios from "axios";
import url from "@/apiConfig.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,
      activeId: 0,
      list: [],
      loading: false,
      finished: false,
      isRefresh: false,
      page: 1,
      errorImg:'this.src="'+require('@/assets/errorimg.png')+'"',
      categorySubIdFirstId: "" //子目录的ID
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    onRightIcon() {
      Toast("点击了搜索按钮");
    },
    /**
     * 初始化目录列表，及第一个目录的子目录列表
     */
    getCategory() {
      axios({
        method: "get",
        url: url.getCategoryList
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            this.category = res.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误！");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 主目录点击事件
     * @index: 点击的第几个目录
     * @id：目录ID
     */
    clickCategory(index, id) {
      this.categoryIndex = index;
      // this.categorySubIdFirstId = id;
      this.page = 1;
      this.finished = false;
      this.list = [];
      this.getCategorySubByCategoryId(id);
    },
    /**
     * 根据目录ID，获取子目录列表
     * @categorySubId: 子目录ID
     */
    getCategorySubByCategoryId(categorySubId) {
      axios({
        method: "post",
        url: url.getCategorySubList,
        data: { categorySubId: categorySubId }
      })
        .then(res => {
          if (res.data.code == 200 && res.data.message) {
            // console.log(res.data.message)
            let _data = res.data.message;
            this.categorySub = _data;
            this.active = 0;
            /**
             * 切换子目录时，初始化商品列表
             */
            this.categorySubIdFirstId = _data[0].ID;

            this.getGoodsListByCategorySubId();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 上拉加载更多
     */
    onLoadList() {
      // this.getGoodsListByCategorySubId();
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodsListByCategorySubId();
      }, 1000);
    },
    /**
     * 下拉刷新
     */
    onRefreshList() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.page = 1;
        this.list = [];
        this.getGoodsListByCategorySubId();
      }, 500);
    },
    /**
     * 根据字目录ID，获取该目录下的商品列表
     * @categorySubId: 子目录Id
     * @page: 请求的第几页，默认 1  开始
     */
    getGoodsListByCategorySubId() {
      this.list = [];
      axios({
        url: url.getGoodsListByCategorySubId,
        method: "post",
        data: {
          categoryId: this.categorySubId,
          page: this.page
        }
      })
        .then(res => {
          this.loading = false;
          if (res.data.message.length && res.data.code === 200) {
            this.list = this.list.concat(res.data.message);
            this.page++;
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 子目录点击事件
     */
    clickCategorySubId(index, title) {
      this.list = [];
      this.finished = false;
      this.page = 1;
      let categorySubId = this.categorySub[index].ID;
      this.onLoadList();
    },
    goGoodsInfo(id){
      this.$router.push({name:'Goods',params:{goodsId:id}});
    }
  },
  /**
   * 钩子函数，页面一创建就初始化目录
   */
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 96 + "px";
    document.getElementById("list-box").style.height =
      winHeight - 90 - 50 + "px";
  }
};
</script>

<style scoped>
.van-nav-bar {
  z-index: 100 !important;
}
#leftNav ul li {
  line-height: 44px;
  border-bottom: 1px solid #e4e7ed;
  padding: 0 3px;
  font-size: 0.8rem;
  text-align: center;
}
.content {
  padding-top: 46px;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-box {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>