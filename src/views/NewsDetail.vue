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
      <template v-if="newsDetailData != null">
        <div class="news_details">
          <h2>{{ newsDetailData.title }}</h2>
          <span>发布时间：{{ newsDetailData.pubTime | transforTime }}</span>
          <div class="news_content" v-html="newsDetailData.content">               
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
        newsDetailData: null,
        nid: 1
      }
    },
    methods: {
      loadNewsDetail: function(nid){
        axios.get("http://45.32.162.42:3000/news/detail" + "?nid=" + nid).then((response)=>{
          this.newsDetailData = response.data;
          console.log(response.data);
        }).catch((error)=>{
          console.log(error);
        })
      }
    },
    created: function(){
      console.log(12)
      this.nid = this.$route.params.nid;
      this.loadNewsDetail(this.nid);
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