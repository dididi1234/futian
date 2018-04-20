<template>
  <div>
    <myHeader name="注册甫田网账号"></myHeader>
    <div class="r-wrap">
      <div class="form">
        <span class="icon-手机"></span>
        <input class="phoneNum" type="text" placeholder="手机/邮箱" ref="p1" v-model="pn">
      </div>
      <div class="form">
        <span class="icon-拼图－互动"></span>
        <input v-model="pictake" class="phoneNum" type="text" placeholder="图形验证码">

        <div class="code" @click="createCode">{{checkCode}}</div>
      </div>
      <div class="form">
        <span class="icon-标识类_钥匙"></span>
        <input class="phoneNum" type="text" placeholder="短信验证码">
        <button>获取验证码</button>
      </div>
      <div class="form">
        <span class="icon-锁"></span>
        <input  class="phoneNum" :type="type" placeholder="请输入密码" ref="p2" v-model="pwd">
        <div class="s1"> <span @click="change" :class="{'icon-眼睛-闭':bol,'icon-眼睛-睁':!bol}"></span></div>
      </div>
      <label for="agree">
        <input id="agree" type="checkbox" checked>我已阅读并同意 <a href="###">甫田网的条款和使用条件</a>
      </label>
      <button @click="register" class="reg" :class="{active:isactive}">注册</button>
      <!--<button class="reg" v-else>注册</button>-->
      <router-link tag="span" to="/informations/login" class="log" >已有账号，去登陆？</router-link>
    </div>
  </div>

</template>
<script>
  import myHeader from 'c/common/myHeader'
  import BScroll from 'better-scroll';
  export default {
    data(){
      return {
        bol:true,
        type:"password",
        checkCode:[],
        pictake:'',
//          isactive:false,
        pn:'',
        pwd:''
      }
    },
    components:{
      myHeader
    },
    methods:{
//        判断输入条件是否正确
      register(){
        if(this.isactive){
          if(!/^1[3|4|5|8][0-9]\d{8}$/.test(this.$refs.p1.value)){
            alert("手机号码不符合形式");
            return
          }
//          验证图形码
          if(this.pictake.toLowerCase()!=this.checkCode.toLowerCase()){
            alert('验证码错误');
            this.createCode();
            return
          }
          if(/\s/.test(this.$refs.p2.value)){
            alert("不能输入空格！！！");
            return
          }
          this.$http.post('/api/register',{
            user:this.$refs.p1.value,
            password:this.$refs.p2.value
          }).then((res)=>{
            console.log(res);
            if(res.data.status){
              this.$router.push({path:'/informations/login'})
            }
          })
        }


      },
      change(){
        this.bol=!this.bol;
        var password = this.$refs.p2;
        console.log(password);
        if(this.bol){
          password.setAttribute("type","password")
        }else{
          password.setAttribute("type","text")
        }
      },
//        生成图形码
      createCode(){
        var code = "";
        var codeLength = 4; //验证码的长度
        //    var checkCode = document.getElementById("checkCode");
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
          'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
        for(var i = 0; i < codeLength; i++)
        {
          var charNum = Math.floor(Math.random() * 52);
          code += codeChars[charNum];
        }
        console.log(code);
        this.checkCode = code;

      },
//        验证图形码
//      Verification(){
//        console.log(this.pictake);
//        if(this.pictake.toLowerCase()!=this.checkCode.toLowerCase()){
//          alert('验证码错误');
//          this.createCode();
//        }
//      }
    },
//      进入页面，生成验证码
    created(){
      this.createCode();

    },
    computed:{
      isactive(){
        if(this.pictake.toLowerCase()!=''&&this.pn!=""&&this.pwd!=''){
          return true;
        }else{
          return false;
        }
      },
    }
  }
</script>

<!--suppress CssUnknownTarget -->
<style lang="less" type="text/less" scoped>
  @import "~less/style.less";
  .r-wrap{
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
        width: 50%;
        border: 0;
      }
      .code{
        font-family:Arial;
        font-style:italic;
        color:orange;
        font-size:20px;
        border:0;
        letter-spacing:10px;
        font-weight:bolder;
        float:left;
        cursor:pointer;
        width:150px;
        height:40px;
        line-height:40px;
        text-align:center;
        vertical-align:middle;
      }
      img{
        width:100px;
        height: 30px;
      }
      button{
        line-height: 30px;
        width:100px;
        height:30px;
        cursor: default;
        background: #a4a4a4;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 4px;
      }
      .s1{
        margin-left: 80px;
      }
    }
    label{
      margin: 13px 0;
      display: block;
      font-weight: 400;
      color: #a4a4a4;
      font-size: 12px;
      display: flex;
      align-items: center;
      input{
        width:14px;
        height: 14px;
        border-radius: 2px;
        background: #009c4c;
        margin-right: 5px;
      }
      a{
        color: #009c4c;
        margin-left: 5px;
      }
    }
    .reg{
      width:100%;
      height: 40px;
      background: #f0f0f0;
      border-radius: 4px;
      cursor: pointer;
      color: #a4a4a4;
      font-size:17px;
      outline: none;
      border: none;

    }
    .active{
      background: #009c4c;
      color: #fff;
    }
    .log{
      display: block;
      width:100%;
      margin: 13px 0;
      font-size: 12px;
      text-align: center;
      color: #009c4c;
    }
  }
</style>
