<template>
  <div>
    <head-part></head-part>
    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input v-model="uname" @blur="checkEmail()" type="text" id="uname" placeholder="请输入邮箱名"/>
          <em></em>
          <i></i>
        </li>
        <li>
          <span>密码：</span>
          <input v-model="upwd" @blur="checkPwd" type="password" id="upwd" placeholder="请输入密码"/>
          <em></em>
          <i></i>
        </li>
        <li>
          <span>重复密码：</span>
          <input @blur="checkRepeatPwd" type="password" id="upwd2" placeholder="请重复输入密码"/>
          <em></em>
          <i></i>
        </li>
        <li>
          <span>手机号：</span>
          <input v-model="phone" @blur="checkPhone" type="text" id="phone" placeholder="请输入手机号"/>
          <em></em>
          <i></i>
        </li>
        <li>
          <span>验证码：</span>
          <input type="text" class="inp_yzm" placeholder="请输入验证码"/>
          <img src="../assets/images/yzm.png" alt=""/>
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox"><label>
          <input v-model="isAgreed" type="checkbox" checked/>
          <span>我已阅读并同意用户注册协议 {{isAgreed ? "ok" : "no"}} </span>
        </label>
        </li>
        <li class="li_btn">
          <button v-on:click="doRegister()" type="button">提交注册</button>
        </li>
      </ul>
    </div>
    <foot-part></foot-part>
  </div>
</template>

<script>
  import axios from "axios";
  import $ from "jquery";

  export default {
    data: function(){
      return {
        uname: "", //用户名，此处为email
        upwd: "", //密码
        phone: "", //手机号码
        isAgreed: true //是否同意注册
      }
    },
    methods: {
      doRegister: function(){  //注册按钮
        var c_email = this.checkEmail();
        var c_upwd = this.checkPwd();
        var c_upwd_repeat = this.checkRepeatPwd();
        var c_phone = this.checkPhone();
        if(c_email && c_upwd && c_upwd_repeat && c_phone && this.isAgreed){
          axios.post("http://localhost:3000/user/register", {
            uname: this.uname,
            upwd: this.upwd,
            phone: this.phone
          }).then((response)=>{
            if(response.data.code == 1){
              alert(response.data.msg);
              this.$router.push('/index');
            }else{
              alert(response.data.msg);
            }
          }).catch((error)=>{
            console.log(error);
          });
        }
        
      },
      checkEmail(){ //检查email
        var uname= $.trim($("#uname").val().toString());
        var regEmail= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if(!uname){//邮箱为空时
            $("#uname").siblings("em").show().attr("class","icon_error");
            $("#uname").siblings("i").show().text("请输入您的注册邮箱");
            return false;
        }else if(!regEmail.test(uname)){ 
            $("#uname").siblings("em").show().attr("class","icon_error");
            $("#uname").siblings("i").show().text("请输入正确的邮箱格式");
            return false;
        }else if(this.checkEmailExist(uname)){
            $("#uname").siblings("em").show().attr("class","icon_error");
            $("#uname").siblings("i").show().text("此邮箱已被其他用户注册");
            return false;
        }else{
            $("#uname").siblings("em").show().attr("class","icon_ok");
            $("#uname").siblings("i").hide();
            return true;
        }
      },
      checkEmailExist(uname){
        var back=false;
        $.ajax({
            type:"post",
            url:"http://localhost:3000/user/uname",
            data:{uname:uname},
            async:false,
            dataType: "json",
            success:function(d){
                if(d.code==2){//用户名已经存在
                    back=true;
                }else{
                    back=false;
                }
            }
        });
        return back;
      },
      checkPwd(){ //验证密码
        var pwdSize= $.trim($("#upwd").val().toString()).length;
        if(!pwdSize){//邮箱为空时
          $("#upwd").siblings("em").show().attr("class","icon_error");
          $("#upwd").siblings("i").show().text("请输入您的密码");
          return false;
        }else if(pwdSize<6||pwdSize>12){
          $("#upwd").siblings("em").show().attr("class","icon_error");
          $("#upwd").siblings("i").show().text("密码长度应为6~12个字符之间");
          return false;
        }else{
          $("#upwd").siblings("em").show().attr("class","icon_ok");
          $("#upwd").siblings("i").hide();
          return true;
        }
      },
      checkRepeatPwd(){
        var pwd= $.trim($("#upwd").val().toString());
        var pwd2= $.trim($("#upwd2").val().toString());
        if(this.checkPwd()){
          if(pwd!=pwd2){
            $("#upwd2").siblings("em").show().attr("class","icon_error");
            $("#upwd2").siblings("i").show().text("两次输入的密码不一致");
            return false;
          }else{
            $("#upwd2").siblings("em").show().attr("class","icon_ok");
            $("#upwd2").siblings("i").hide();
            return true;
          }
        }
      },
      checkPhone(){
        var phone= $.trim($("#phone").val().toString());
        var regPhone= /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
        if(!phone){
          $("#phone").siblings("em").show().attr("class","icon_error");
          $("#phone").siblings("i").show().text("请填写您的手机号");
          return false;
        }else if(!regPhone.test(phone)){
          $("#phone").siblings("em").show().attr("class","icon_error");
          $("#phone").siblings("i").show().text("请输入正确的手机号码");
          return false;
        }else if(this.checkPhoneExist(phone)){
          $("#phone").siblings("em").show().attr("class","icon_error");
          $("#phone").siblings("i").show().text("此手机号已被其他用户绑定");
          return false;
        }else{
          $("#phone").siblings("em").show().attr("class","icon_ok");
          $("#phone").siblings("i").hide();
          return true;
        }
      },
      checkPhoneExist(phone){
        var back=false;
        $.ajax({
            type:"post",
            url:"http://localhost:3000/user/phone",
            data:{phone:phone},
            async:false,
            dataType: "json",
            success:function(d){
                if(d.code==2){//用户名已经存在
                    back=true;
                }else{
                    back=false;
                }
            }
        });
        return back;
      }
    },
    created: function(){

    }
  }
</script>

<style>

</style>