<template>
  <div>
    <head-part></head-part>

    <!--banner-->
    <div class="banner" @mouseenter="removeSlide"  v-on:mouseleave="startSlide">
      <!-- 练习：编写banner的html和css-->
      <!-- 图片列表-->
      <ul>
        <li v-bind:style="{background: 'url(' + require('../assets/images/banner_01.jpg') +') center 0 no-repeat', display: 'block',zIndex: 20}"><a @click.prevent href="#" class="link"></a></li>
        <li v-bind:style="{background: 'url(' + require('../assets/images/banner_02.jpg') +') center 0 no-repeat'}"><a @click.prevent href="#" class="link"></a></li>
        <li :style="{background: 'url(' + require('../assets/images/banner_03.jpg') +') center 0 no-repeat'}"><a @click.prevent href="#" class="link"></a></li>
        <li :style="{background: 'url(' + require('../assets/images/banner_04.jpg') +') center 0 no-repeat'}"><a @click.prevent href="#" class="link"></a></li>
      </ul>
      <!-- 左右箭头-->
      <span class="cut prev" @click="prevImg()"></span>
      <span class="cut next" v-on:click="nextImg"></span>
      <!-- 小圆点指示器-->
      <div class="indicator" @mouseover="indicatorHover($event)">
        <a data-num="0" href="javascript:void(0)" class="cur"></a><a data-num="1" href="javascript:void(0)"></a><a data-num="2" href="javascript:void(0)"></a><a data-num="3" href="javascript:void(0)"></a>
      </div>
    </div>
    <!--main-->
    <div class="main container">
      <div class="ind_con1">
        <h2 class="title"><a href="#" class="more">more</a>恒洁产品</h2>
        <ul class="clearfloat">
          <li><a href="#" class="link"><img src="../assets/images/01.jpg" alt=""/></a></li>
          <li><a href="#" class="link"><img src="../assets/images/01.jpg" alt=""/></a></li>
          <li><a href="#" class="link"><img src="../assets/images/01.jpg" alt=""/></a></li>
        </ul>
      </div>
      <div class="ind_con2 clearfloat">
        <div class="ind_about">
          <h2 class="title"><a href="#" class="more">more</a>关于恒洁</h2>
          <p>广东恒洁卫浴有限公司创立于1998年，是一家专业从事陶瓷卫生洁具及其相关配套产品的研发、生产、销售、服务等综合性的大型企业。在佛山陶瓷主产区均拥有大型生产基地，有陶瓷厂、木柜厂、五金厂、配套物流、贸易子公司等下属企业（6家），实现产能规模化，拥有领先世界水平的意大利SITI全自动隧道窑及澳洲通用全自动隧道窑、通用自动梭式窑、国产电脑梭式窑等一系列生产设备，建筑面积达56万平方米，员工4000多人，连年获得守合同重信用企业、纳税大户等称号。<a
            href="#">查看更多</a></p>
        </div>
        <div class="ind_news">
          <h2 class="title"><a href="#" class="more">more</a>公司动态</h2>
          <ul>
            <li><span>2018-10-24</span><a href="">危房里的百岁“宝贝”：老宅中的难舍之爱</a></li>
            <li><span>2018-10-24</span><a href="">中国厨卫榜揭晓！恒洁实力荣膺两大奖项</a></li>
            <li><span>2018-10-10</span><a href="">设计奖大满贯！恒洁喜提日本G-mark设计大奖</a></li>
            <li><span>2018-09-22</span><a href="">闪耀国际设计舞台！恒洁再获美国IDEA工业设计大奖</a></li>
          </ul>
        </div>
      </div>
    </div>

    <foot-part></foot-part>
  </div>
  
</template>

<script>
  import $ from "jquery";
  export default {
    data: function(){
      return {
        number: 0, //轮播图数量
        cur: 0, //当前轮播图
        timer: 0 //定时器变量
      }
    },
    methods: {
      slideNext: function(){ //下一张
        if(this.cur<this.number){
          $(".banner ul li").eq(this.cur).css({'z-index':10}).stop().fadeOut();
          $(".banner ul li").eq(this.cur+1).css({'z-index':20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(this.cur+1).addClass("cur");
          this.cur+=1;
        }else{
          $(".banner ul li").eq(this.cur).css({'z-index':10}).stop().fadeOut();
          $(".banner ul li").eq(0).css({'z-index':20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(0).addClass("cur");
          this.cur=0;
        }
      },
      slidePrev: function(){ //上一张
        if(this.cur>0){
          $(".banner ul li").eq(this.cur).css({'z-index':10}).stop().fadeOut();
          $(".banner ul li").eq(this.cur-1).css({'z-index':20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(this.cur-1).addClass("cur");
          this.cur-=1;
        }else{
          $(".banner ul li").eq(this.cur).css({'z-index':10}).stop().fadeOut();
          $(".banner ul li").eq(this.number).css({'z-index':20}).stop().fadeIn();
          $(".indicator a").removeClass().eq(this.number).addClass("cur");
          this.cur=this.number;
        }
      },
      removeSlide: function(){ //鼠标进入banner是停止轮播，绑定到mosueover事件上,不能用箭头函数，否则this指向会出问题
        clearInterval(this.timer);
      },
      startSlide: function(){ //鼠标移出banner是开始轮播，绑定到mosueleave事件上,
        this.timer = setInterval(this.slideNext, 3000);
      },
      nextImg: function(){ //点击下一张按钮
        this.slideNext();
      },
      prevImg: function(){ //点击上一张按钮
        this.slidePrev();
      },
      indicatorHover: function(e){
        if(e.target.nodeName == "A"){
          $(e.target).siblings().removeClass();
          $(e.target).addClass("cur");
          var now = parseInt($(e.target).attr("data-num"));
          $(".banner ul li").eq(this.cur).css({'z-index':10}).stop().fadeOut();//隐藏当前的图片
          $(".banner ul li").eq(now).css({'z-index':20}).stop().fadeIn();//显示和a序列号一样的图片
          this.cur=now;//为变量cur重新赋值，以便于再次启用定时器的时候，从当前显示的图片开始播放
        }
      }
    },
    mounted: function(){
      this.number = $(".banner ul li").length - 1; //获取轮播图总长度
      this.timer = setInterval(this.slideNext, 3000); //存储定时器
    }
  }
</script>

<style>

</style>
