<template>
  <div>
    <head-part></head-part>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">购物车</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <h1 style="text-align: center;margin-top: 50px;" v-if="isLogin == false">亲，你还未登录哟！</h1>
      <div v-else class="cart">
        <div class="cart_header">
          <span>已选商品<em>{{ totalCount }}</em>件</span>
          <span>总金额：<strong>{{ priceSum }}</strong></span>
          <button type="button">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span><input type="checkbox"/>全选</span>
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul v-if="cartData != null">
            <!-- <h2>购物车中没有任何商品！</h2> -->
            <li v-for="(item, index) in cartData.product" :key="index">
              <input type="checkbox" class="cart_checkbox"/>
              <router-link :to="`/productdetail/${item.pid}`" class="cart_img"><img :src="require(`../${item.pic}`)" alt=""></router-link>
              <router-link :to="`/productdetail/${item.pid}`" class="cart_title">{{ item.title1 }}</router-link>
              <i>{{ item.price }}</i>
              <div>
                <span>-</span><input type="text" :value="item.count" /><span>+</span>
              </div>
              <strong>{{ item.price }}</strong>
              <!--删除按钮-->
              <em @click="deleteProduct(item.did)"></em> 
            </li>
          </ul>
        </div>
        <div class="cart_header">
          <span>已选商品<em>{{ totalCount }}</em>件</span>
          <span>总金额：<strong>{{ priceSum }}</strong></span>
          <button type="button">结算</button>
        </div>
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
        cartData: null, //购物车
        totalCount: 0, //总商品数
        priceSum: 0, //总价格
        isLogin: false,
        isBuy: false
      }
    },
    methods: {
      loadCart: function(){
        if(sessionStorage.uid){
          axios.get("http://45.32.162.42:3000/cart/select" + "?uid=" + sessionStorage.uid).then((response)=>{
            console.log(response.data);
            this.cartData = response.data;
            for(var i = 0; i < response.data.product.length; i++){
              this.totalCount += response.data.product[i].count;
              this.priceSum += response.data.product[i].count * response.data.product[i].price;
            }
          }).catch((error)=>{
            console.log(error);
          });
        }
      },
      deleteProduct: function(did){
        if(confirm("确定删除以下商品吗？")){
          axios.get("http://45.32.162.42:3000/cart/delete" + "?did=" + did).then((response)=>{
            console.log(response.data);
            this.loadCart();
          }).catch((error)=>{
            console.log(error);
          })
        }
        
      }
    },
    created: function(){
      if(!sessionStorage.uid){
        this.isLogin = false;
      }else{
        this.isLogin = true;
      }
      this.loadCart();
    }
  }
</script>

<style>

</style>