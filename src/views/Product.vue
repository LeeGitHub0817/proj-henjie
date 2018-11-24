<template>
<div>
  <head-part></head-part>
  <!--面包屑导航-->
  <div class="breadcrumb">
    <div class="container">
      <h2>
        <a href="">首页</a>&gt;<a href="">产品中心</a>
      </h2>
    </div>
  </div>
  <!--页面主体-->
  <div class="main container">
    <div class="pl_header">
      <router-link :class="{cur: type == 1 ? true : false}" to="/product/1">洗漱产品</router-link><router-link :class="{cur: type == 2 ? true : false}" to="/product/2">淋浴产品</router-link>
    </div>
    <!-- 产品列表-->
    <ul v-if="productData !== null" class="product_list clearfloat">
      <li v-for="(item, index) in productData" :key="index">
        <router-link to="`/productdetail/${item.pid}`"><img :src="require(`../${item.pic}`)" alt=""/></router-link>
        <div class="pdlist_text clearfloat">
          <h3>
            <p>{{ item.title1 }}</p>
            <span>{{ item.title2 }}</span>
          </h3>
          <router-link to="">查看详情</router-link>
        </div>
      </li>
    </ul>
    <!-- 分页导航-->
    <div class="pages">
      <a href="">上一页</a>
      <template>
        <a href=""></a>
      </template>
      <a href="">下一页</a>
    </div>
  </div>
  <foot-part></foot-part>
</div> 
</template>

<script>
  import axios from "axios";

  export default {
    data: function(){
      return {
        type: null, //产品类型
        productData: null //产品数据
      }
    },
    methods: {
      loadProductList: function(type){
        axios.get("http://localhost:3000/product" + "?type=" + type).then((response)=>{
          this.productData = response.data.data;
          console.log(response)
        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    created: function(){
      this.type = this.$route.params.type;
      this.loadProductList(this.type);
    },
    watch: { //默认vue只是改变参数的话不会重新绘制dom,所以需要监听
      $route: function(){
        this.type = this.$route.params.type;
        this.loadProductList(this.type)
      }
    }
  }
</script>

<style>

</style>