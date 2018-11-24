<template>
  <div>
    <head-part></head-part>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">公司动态</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="news">
        <ul v-if="newsInfo !== null">
          <li v-for="(item, index) in newsInfo.data" :key="index"><span>{{ item.pubTime | transforTime }}</span><router-link :to="`/newsdetail/${item.nid}`">{{ item.title }}</router-link></li>
        </ul>  
      </div>
      <!-- 分页导航-->
      <div v-if="newsInfo !== null" class="pages">
        <a @click.prevent="loadNewsList(newsInfo.pageNum - 1)" href="#" :class="{default: newsInfo.pageNum == 1 ? true : false}">上一页</a>
        <template>
          <a @click.prevent="loadNewsList(page)" v-for="(page, index) in newsInfo.pageCount" :key="index" href="#" :class="{cur: page == newsInfo.pageNum? true : false}">{{ page }}</a>
        </template>
        <a @click.prevent="loadNewsList(parseInt(newsInfo.pageNum)+ 1)" href="#" :class="{default: newsInfo.pageNum == newsInfo.pageCount ? true : false}">下一页</a>
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
        newsInfo: null, //新闻数据
      }
    },
    methods: {
      loadNewsList: function(pageNum=1){ //加载新闻
        axios.get("http://localhost:3000/news/list"+"?pageNum="+pageNum).then((response)=>{
          this.newsInfo = response.data;
        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    created: function(){
      this.loadNewsList();
    },
    filters: { //自定义过滤器
      transforTime: function(value){
        if(!value){
          return "";
        }else{
          var time = new Date(value);
          return time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate();
        }
      }
    }
  }
</script>

<style>

</style>