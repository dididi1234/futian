<template>
  <div>
  <myHeader name="登录甫田网"></myHeader>
  <div class="l-wrap">
    <div class="form">
      <span class="icon-手机"></span>
      <input class="phoneNum" type="text" placeholder="手机/邮箱" ref="p1">
    </div>
    <div class="form">
      <span class="icon-锁"></span>
      <input class="phoneNum" type="password" placeholder="请输入密码" ref="p2">
      <span class="icon-眼睛-闭"></span>
    </div>
    <a class="forget" href="###">忘记密码</a>
    <button @click="login" class="btn">登录</button>
    <router-link to="/informations/register" class="no-cont">没有账号？去注册！</router-link>
  </div>
  </div>
</template>
<script>
  import myHeader from 'c/common/myHeader'
  import bus from 'com/js/bus'
    export default {
      data(){
        return{
          bol:false
        }
      },
      components:{
        myHeader
      },
      created(){
        this.bol = this.$route.query.bol;
      },
    methods:{
      login(){
        console.log(this.$refs.p1.value,this.$refs.p2.value);
        this.$http.post('/api/login',{
          user:this.$refs.p1.value,
          password:this.$refs.p2.value
        }).then((res) => {
          let data = res.data;
          console.log(data);
          if(data.status){
            sessionStorage.setItem('user',data.message.user);
            sessionStorage.setItem('countAll',data.message.countAll);
            console.log(sessionStorage.getItem('countAll'));
            this.$store.commit('isLogin');
            this.$store.commit('getCountAll',data.message.countAll);
            alert('登录成功');
            if(this.bol){
              // this.$router.push('/indexPage/myInformation');
              this.$router.go(-1);
              this.$store.commit('isLogin');
            }else{
              this.$router.push('/informations/shoppingCar');
            }
          }else{
            alert('登录失败');
          }
        })
      }
    },

    }
</script>
<!--suppress CssUnknownTarget -->
<style lang="less" type="text/less" scoped>
  @import "~less/style.less";
.l-wrap{
  margin-top: 75px;
  padding: 0 20px;
  .form{
    border:1px solid #f0f0f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    .phoneNum{
      line-height:20px;
      padding: 10px 20px;
      font-size:14px;
      color: #333;
      outline: none;
      width: 75%;
      border: 0;
    }
  }
  .forget{
    display: block;
    width:100%;
    margin: 13px 0;
    font-size: 12px;
    text-align: right;
    color: #009c4c;
  }
.btn{
  width:100%;
  height: 40px;
  background: #009c4c;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size:17px;
  outline: none;
}
  .no-cont{
    display: block;
    width:100%;
    margin: 13px 0;
    font-size: 12px;
    text-align: center;
    color: #009c4c;
  }
}
</style>
