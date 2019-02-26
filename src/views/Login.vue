<template>
  <div>
    <head-part></head-part>
    <div class="login_box">
      <div class="container">
        <div class="login">
          <h2>用户登录</h2>
          <dl class="clearfloat">
            <dt><span v-if="isUaccount" class="tips" style="display: inline;" id="uname_prompt_text">用户名不能为空</span>用户名：</dt>
            <dd>
              <input v-model="uaccount" @blur="uaccountCheck()" type="text" id="uname"  placeholder="邮箱/手机号"/>
              <em class="icon_user"></em>
              <i class="icon_error" id="uname_prompt_icon"></i>
            </dd>
          </dl>
          <dl>
            <dt><span v-if="isUpwd" class="tips" style="display: inline;" id="pwd_prompt_text">密码不能为空</span>密码：</dt>
            <dd>
              <input v-model="upwd" v-on:blur="upwdCheck()" type="password" id="pwd" placeholder="密码"/>
              <em class="icon_pwd"></em>
              <i class="icon_error" id="pwd_prompt_icon"></i>
            </dd>
          </dl>
          <p><label>
            <input type="checkbox"/>
            <span>自动登录</span>
          </label></p>
          <button v-on:click="doLogin" type="button" id="login">立 即 登 录</button>
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
        uaccount: "", //用户账号
        upwd: "", //用户密码
        isUaccount: false, //判断用户名是否为空
        isUpwd: false, //判断密码是否为空
      }
    },
    methods: {
      uaccountCheck: function(){
        if(!this.uaccount){
          this.isUaccount = true;
        }else{
          this.isUaccount = false;
        }
      },
      upwdCheck: function(){
        if(!this.upwd){
          this.isUpwd = true;
        }else{
          this.isUpwd = false;
        }
      },
      doLogin: function(){
        if(this.uaccount.length !== 0 && this.upwd.length !== 0){
          axios.post("http://45.32.162.42:3000/user/login", {uaccount: this.uaccount, upwd: this.upwd}).
          then(function(response){
            if(response.data.code == 1){
              sessionStorage.uid = response.data.uid;
              sessionStorage.uname = response.data.uname;
              history.go(-1);
            }else{
              alert(response.data.msg)
            }
          }).catch(function(error){
            console.log(error);
          });
        }   
      }
    }
  }
</script>

<style>

</style>