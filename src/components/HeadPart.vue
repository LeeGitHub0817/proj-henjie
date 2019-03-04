<template>
<div class="header_box">
  <header class="header container">
      <h1 class="logo"><router-link to="/" class="link"></router-link></h1>
      <div class="h_con">
        <ul class="clearfloat">
            <li class="phone">400-833-1350</li>
            <li><a href="#">中文</a></li>
            <li><em>|</em></li>
            <li><a href="#">English</a></li>
            <li><a href="#" class="weixin"></a></li>
            <li><a href="#" class="weibo"></a></li>
            <template v-if="isLogin">
              <li class="top_user"><a href="">{{ uname }}</a></li>
              <li class="top_quit"><a @click.prevent="signout()" href="#">退出</a></li> 
            </template>  
            <template v-else>
              <li><router-link to="/login" class="h_login">登录</router-link></li>
              <li><em>|</em></li>
              <li><router-link to="/register" class="h_register">注册</router-link></li> 
            </template> 
        </ul>
        <div class="search clearfloat">
          <button type="button"></button>
          <input type="text"/>
        </div>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="container">
        <div class="nav">
          <ul>
            <li><router-link to="/"><span class="icon_home"></span>首页</router-link></li>
            <li><router-link to="/about">关于恒洁</router-link></li>
            <li><router-link to="/news">公司动态</router-link></li>
            <li class="nav_pd">
              <router-link to="/product/1">产品中心<span class="icon_pd"></span></router-link>
              <div class="pd_dropdown">
                <router-link to="/product/1">洗漱产品</router-link>
                <router-link to="/product/2">淋浴产品</router-link>
              </div>
            </li>
            <li><router-link to="/contact">联系我们</router-link></li>
          </ul>
        </div>
        <div v-on:mouseenter="showCartInfo()" @mouseleave="hideCartInfo()" class="s_cart">
          <router-link to="/cart">
            <span class="icon_cart"></span>购物车(<strong v-if="isLogin == true" id="cart_sum">{{ totalCount }}</strong>)<span class="icon_sj"></span>
          </router-link>
          <div class="cart_dropdown">
            <h3 v-if="isLogin == false">您还未登陆哟~</h3>
            <h3 v-else-if="isCartEmpty == true">您的购物车为空~</h3>
            <template v-else>
              <ul>
                <li v-for="(item, index) in productInfo" :key="index">
                  <router-link :to="'/productdetail/' + item.pid"><img :src="item.pic" alt=""/></router-link>
                  <div>
                    <span>-</span><input type="text" :value="item.count"/><span>+</span>
                  </div>
                  <strong>{{ item.price | getDecimalTwo }}</strong>
                  <em></em>
                </li>
              </ul>
              <div class="cd_js clearfloat" style="display: block;">
                <span>共计：<strong>{{ totalPrice | getDecimalTwo }}</strong></span>
                <a href="#">结算</a>
              </div>
            </template> 
          </div>
        </div>
      </div>
    </nav>
</div>


</template>

<script>
  import axios from "axios";
  import $ from "jquery";

  export default {
    data: function(){
      return {
        isLogin: true, // 判断是否登陆
        uname: "", //存储用户名
        isCartEmpty: false, //判断购物车是否为空
        productInfo: [], //存储购物车信息
        totalCount: 0, //总购买数量
        totalPrice: 0 //总价格
      }
    },
    methods: {
      signout: function(){ //退出按钮函数
        sessionStorage.clear();
        this.isLogin = false;
      },
      loadCart: function(uid){ //加载购物车函数
        axios.get("http://localhost:3000/cart/select"+"?uid="+uid).then((response)=>{
          if(response.data.product.length == 0){
            this.isCartEmpty = true;
          }else{
            this.productInfo = response.data.product;
            for(var i = 0; i < response.data.product.length; i++){
              this.productInfo[i].pic = require("../" + response.data.product[i].pic);
              this.totalCount += response.data.product[i].count;
              this.totalPrice += response.data.product[i].price;
            }
          }
        }).catch(function(error){
          console.log(error);
        })
      },
      showCartInfo(){ //鼠标hover时显示购物车信息
        $(".cart_dropdown").stop().slideDown(100);
      },
      hideCartInfo(){ //鼠标hover时显示购物车信息
        $(".cart_dropdown").stop().slideUp(100)
      }
    },
    created: function(){
      if(!sessionStorage.uid){
        this.isLogin = false;
      }else{
        this.isLogin = true;
        this.uname = sessionStorage.uname;
        //调用购物车加载函数
        this.loadCart(sessionStorage.uid);
      }
    },
    filters: { //自定义过滤器
      getDecimalTwo: function(value){
        if(!value) {
          return "";
        }else{
          return value.toFixed(2);
        }
      }
    }
  }
</script>

<style>

</style>
