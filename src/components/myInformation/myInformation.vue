<template>
  <div class="me-header">
    <div class="top">
      <img class="head-img" src="../../assets/img/logo.png" alt="">
      <div class="lr" v-if='username'>
        <span>欢迎回来 {{username}}</span><div class="back" @click="back">退出</div>
      </div>

      <div class="lr" v-else>
        <span class="load" @click="login">登录</span>
        <span>|</span>
        <span class="load" @click="register">注册</span>
      </div>

      <span id="s1" class="icon-设置"></span>

    </div>
    <div class="account">
      <a href="###">
        <p>余额</p>
        <span> > </span>
      </a>
      <a href="###">
        <p>积分</p>
        <span> > </span>
      </a>
      <a href="###">
        <p>优惠券</p>
        <span> > </span>
      </a>
    </div>
    <div class="order">
      <a href="###">
        <span class="icon-我的订单"></span>
        <p>我的订单</p>
      </a>
      <a href="###">
        <span class="icon-标签-订单"></span>
        <p>宅配订单</p>
      </a>
    </div>
    <div class="order">
      <a href="###">
        <span class="icon-收藏"></span>
        <p>我的收藏</p>
      </a>

      <div class="editAddress" @click="goNext('/informations/addressWrap')">
        <span class="icon-地址"></span>
        <p>地址管理</p>
      </div>
    </div>
    <div class="order">
      <a href="###">
        <span class="icon-充值1"></span>
        <p>充值特惠</p>
      </a>
      <a href="###">
        <span class="icon-vip会员皇冠"></span>
        <p>VIP商城</p>
      </a>
      <a href="###">
        <span class="icon-邀请好友"></span>
        <p>好友推荐</p>
      </a>
      <a href="###">
        <span class="icon-礼品"></span>
        <p>激活礼品卡</p>
      </a>
    </div>
    <div class="order">
      <a href="###">
        <span class="icon-客服中心"></span>
        <p>联系客服</p>
        <span class="tel-number">400-820-7708<span class="icon-0-右箭头"></span></span>

      </a>
      <a href="###">
        <span class="icon-微信"></span>
        <p>微信客服</p>
      </a>
      <a href="###">
        <span class="icon-更多"></span>
        <p>了解更多</p>
        <span id="more" class="icon-0-右箭头"></span>
      </a>
    </div>
  </div>
</template>
<script>
  import bus from 'com/js/bus'
  export default {
    data(){
      return{
        username:''
      }
    },
    methods:{
      login(){
        this.$router.push({path:'/informations/login',query:{bol:true}})
      },
      register(){
        this.$router.push({path:'/informations/register'})
      },
      goNext(addres){
        if(sessionStorage.getItem('user')){
          this.$router.push({path:addres})
        }else{
          this.$router.push({path:'/informations/login'})
        }
      },
      back(){
        sessionStorage.clear("user")
        console.log(11);
        location.reload()
      }
    },
    created(){
      // console.log(this.$route.path);
      bus.$emit('routeAdd',this.$route.path);
     console.log(sessionStorage.getItem('user'));
     if(sessionStorage.getItem('user')){
       this.username = sessionStorage.getItem('user');
     }

    },
  }
</script>
<!--suppress CssUnknownTarget -->
<style lang="less" type="text/less" scoped>
  @import "~less/style.less";

  .me-header{
    background-image: url("../../assets/img/me.png");
    width:100%;
    height: 200px;
    background-size: 100% 100%;
    .back{
      color:white;
      text-align: left;
      margin-left: 12px;
    }
    .top{
      height: 140px;
      display: flex;
      align-items: center;
      .head-img{
        width: 85px;
        height: 85px;
        border-radius: 50%;
        background: white;
        margin: -10px 0 0 30px;
      }
      .lr{
        margin-left: 15px;
        color: white;
        span{
          margin: 0 13px 0 13px;
          color: #fff;
        }
        .load{
          color: #fff;
          font-size: 14px;
        }
      }
      #s1{
        position: absolute;
        right: 20px;
        top:20px;
        color: white;
      }
    }
    .account{
      padding: 10px 20px;
      display: flex;
      a{
        width:33.3%;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }
    .order{
      width:100%;
      border-bottom: 8px solid #f0f0f0;
      .editAddress{
        padding:0 20px;
        display: flex;
        align-items: center;
        height: 40px;
        border: 1px solid #f0f0f0;
        color: #333;
        font-size: 14px;
        p{
          margin-left: 10px;
        }
        .tel-number{
          color: #009c4c;
          margin-left: 140px;
          margin-right: 10px;
          font-size: 12px;
        }
        #more{
          position: absolute;
          right: 25px;
        }
      }
      a{
        padding:0 20px;
        display: flex;
        align-items: center;
        height: 40px;
        border: 1px solid #f0f0f0;
        color: #333;
        font-size: 14px;
        position: relative;
        p{
          margin-left: 10px;
        }
        .tel-number{
          color: #009c4c;
          /*margin-left: 140px;*/
          /*margin-right: 10px;*/
          /*margin-left: 38%;*/
          /*margin-right: 1%;*/
          position: absolute;
          right: 20px;
          font-size: 12px;
        }
        #more{
          position: absolute;
          right: 25px;
        }
      }
    }
  }
</style>
