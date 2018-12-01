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
      <div class="cart">
        <div class="cart_header">
          <span>已选商品<em></em>件</span>
          <span>总金额：<strong></strong></span>
          <button type="button">结算</button>
        </div>
        <div class="cart_con">
          <div class="cartcon_title">
            <span><input type="checkbox"/> 全选</span>
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
          </div>
          <ul>
            <!-- <h2>购物车中没有任何商品！</h2> -->
            <li >
              <input type="checkbox" class="cart_checkbox"/>
              <a href="" class="cart_img"><img src="item.pic" alt=""/></a>
              <a href="" class="cart_title"></a>
              <i></i>
              <div>
                <span>-</span><input type="text" /><span>+</span>
              </div>
              <strong></strong>
              <em></em>
            </li>
          </ul>
        </div>
        <div class="cart_header">
          <span>已选商品<em></em>件</span>
          <span>总金额：<strong></strong></span>
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
        cartData: null,
        totalCount: 0,
        priceSum: 0
      }
    },
    methods: {
      loadCart: function(){
        if(sessionStorage.uid){
          axios.get("http://localhost:3000/cart/select" + "?uid=" + sessionStorage.uid).then((response)=>{
            console.log(response.data);
          }).catch((error)=>{

          });
        }
      }
    },
    created: function(){
      this.loadCart();
    }
  }
</script>

<style>

</style>