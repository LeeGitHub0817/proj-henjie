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
        <div class="s_cart">
          <a >
            <span class="icon_cart"></span>购物车(<strong id="cart_sum"></strong>)<span class="icon_sj"></span>
          </a>
          <div class="cart_dropdown">
            <h3>您的购物车为空~</h3>
              <ul>
                <li>
                  <a href=""><img src="" alt=""/></a>
                  <div>
                    <span>-</span><input type="text" value="item.count"/><span>+</span>
                  </div>
                  <strong></strong>
                  <em></em>
                </li>
              </ul>
              <div class="cd_js clearfloat" style="display: block;">
                <span>共计：<strong></strong></span>
                <a href="#">结算</a>
              </div>
          </div>
        </div>
      </div>
    </nav>
</div>


</template>

<script>
    export default {
        data: function(){
          return {
            isLogin: true,
            uname: "",
          }
        },
        methods: {
          signout: function(){
            sessionStorage.clear();
            this.isLogin = false;
          }
        },
        created: function(){
          if(!sessionStorage.uid){
            this.isLogin = false;
          }else{
            this.isLogin = true;
          }
          this.uname = sessionStorage.uname;
        }
    }
</script>

<style>

</style>
