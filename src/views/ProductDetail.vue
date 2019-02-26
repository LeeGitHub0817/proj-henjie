<template>
  <div>
    <head-part></head-part>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品详情</a><a href=""></a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <template v-if="productDetailData != null">
        <div class="pd_info clearfloat">
          <div class="pdinfo_img">
            <img :src="require('../' + productDetailData.pic)" alt=""/>
          </div>
          <div class="pdinfo_text">
            <h2>{{ productDetailData.title1 }}</h2>
            <ul>
              <li>品牌：{{ productDetailData.model }}</li>
              <li>名称：{{ productDetailData.func }}</li>
              <li>商品编号：{{productDetailData.noise}}</li>
              <li>店铺：{{productDetailData.wind}}</li>
              <li>商品毛重：{{productDetailData.applyTo}}</li>
              <li>类别：{{productDetailData.size}}</li>
              <li>材质：{{productDetailData.level}}</li>
            </ul>
            <p>价格：<span>¥</span><strong id="price">{{ productDetailData.price }}</strong></p>
            <a href="" id="addCart" @click.prevent="addCart()" ><span class="icon_cart"></span>加入购物车</a>
          </div>
        </div>
        <div class="details_box">
          <h2 class="title">产品详情</h2>
          <div class="pd_details" v-html="productDetailData.detail">
            
          </div>
        </div>
      </template>
    </div>
    <foot-part></foot-part>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data: function(){
      return {
        productDetailData: null // 产品详情数据
      }
    },
    methods: {
      loadDetail: function(){
        axios.get("http://45.32.162.42:3000/productdetail/detail" + "?pid=" + this.$route.params.pid).then((response)=>{
          this.productDetailData = response.data[0];
          console.log(response.data);
        }).catch((error)=>{
          console.log(error);
        })
      },
      addCart: function(){
        if(sessionStorage.uid){
          axios.get("http://45.32.162.42:3000/cart/add" + "?uid=" + sessionStorage.uid + "&pid=" + this.$route.params.pid).then((response)=>{
            console.log(response.data);
            if(response.data.stat == 1){
              alert("加入购物车成功！");
            }else{
              alert("加入购物车失败，请稍后重试!");
            }
          }).catch((error)=>{
            console.log(error);
          });
        }else{
          alert("亲，你还未登录哟！");
        }
        
      }
    },
    created: function(){
      this.loadDetail();
    }
  }
</script>

<style>

</style>