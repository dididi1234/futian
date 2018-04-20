<template>
<div class="wrap">
  <div class="bar">
    <div class="left">
      <img src="../../assets/img/back.png" alt="" @click="back">
    </div>
    <span class="adds">
      加入购物车
    </span>

      <template v-if="flag" >
        <div class="right" @click="hide" v-show="kongBol">
          编辑
        </div>
      </template>
      <template v-else>
        <div class="right" @click="apper" v-show="kongBol">
          完成
        </div>
      </template>




  </div>
  <template v-if="kongBol">
  <div class="carlist" v-for="(item,index) in goodsMess" v-if="item.shopCount > 0" >
    <span :class="activeClass[index]" @click="changeClass(index)"></span>
    <!--<span class="icon-checkOn"></span>-->
    <div class="goodsImg">
    <img :src=item.shopDetail.imgSrc[0] alt="">
    </div>
    <div class="prod">
      <p>{{item.shopDetail.name}}</p>
      <p class="price">¥{{item.shopDetail.price}}</p>
    </div>
    <div class="control">
      <controller :food=item></controller>
    </div>
  </div>
  <p class="change">精品推荐</p>
  <div class="sba">
  <div class="slide" ref="details">
    <ul>
      <li>
        <img src="../../assets/img/drink1.jpg" alt="">
        <p class="til">郎格多克红葡萄酒</p>
        <p class="kio">700毫升</p>
        <p class="price">¥335</p>
      </li>
      <li>
        <img src="../../assets/img/drink2.jpg" alt="">
        <p class="til">1800典藏银龙舌兰</p>
        <p class="kio">750毫升</p>
        <p class="price">¥335</p>
      </li>
      <li>
        <img src="../../assets/img/drink3.jpg" alt="">
        <p class="til">月桂冠牌起泡清酒</p>
        <p class="kio">650毫升</p>
        <p class="price">¥225</p>
      </li>
      <li>
        <img src="../../assets/img/drink4.jpg" alt="">
        <p class="til">珍匣黑皮诺葡萄酒</p>
        <p class="kio">550毫升</p>
        <p class="price">¥350</p>
      </li>
    </ul>
  </div>
  </div>
  <div class="barbottom" ref="barbottoms">
    <div class="ap">
    <div class="checkAll" @click="checkAll">
      <span :class="activeAllClass" ></span>
      <p>全选</p>
    </div>
    <div class="allPrice"></div>
    </div>
    <div class="allPrice">总价: ¥ {{totalAll}}</div>
    <div class="cash">结算({{endPayNum}})</div>
  </div>
  <div class="barbottom1">
    <div class="ap1">
      <div class="checkAll1" @click="checkAll">
        <span :class="activeAllClass" ></span>
        <span>全选</span>
      </div>
    </div>
    <div class="dele" @click="deleteShop">删除商品</div>
  </div>
  </template>
  <template v-else><div><div class="emptyImg">
    <img src="../../assets/img/J-lazy_4.png" alt="">
    </div></div>
    <div class="emptyCar">购物车空空如也</div>
    <div class="gogo" @click="gotoHome">去逛一逛</div>
  </template>
</div>
</template>

<script>
  import {mapState} from "../../vuex";
  import controller from "c/common/controller";
  import bus from 'com/js/bus'
    export default {
      name: "shopping-car",
      data(){
        return{
          bol:false,
          activeClass:[],
          flag:true,
          have:false,
          carFood:[],
          goodsMess:[],
          activeAllClass:"icon-checkOff",
          totalAll:0,
          endPayNum:0,
          cancelIndex:-1,
          recommendList:[],
        }
      },
      components:{
        controller
      },
      created(){
        this.$http.get('/api/getShopCar',{params:{user:sessionStorage.getItem('user')}}).then((res)=>{
          if(res.data.status){
            this.goodsMess = res.data.message;
            for(var i = 0; i < this.goodsMess.length; i++){
              this.$set(this.activeClass,i,"icon-checkOff");
            }

          }
        })

        this.$http.get('/api/index').then((res)=>{
          console.log(res);
          if(res.data.status){
            this.recommendList = res.data.message.moreData;
          }
        })

      },
      watch:{
        activeClass:function () {
          this.endPayNum = 0;
          this.totalAll = 0;
          var a = 0;
          for(var i = 0; i < this.activeClass.length;i++){
            if(this.activeClass[i] == "icon-checkOn"){
              this.totalAll+=this.goodsMess[i].shopCount *this.goodsMess[i].shopDetail.price;
              this.endPayNum+=this.goodsMess[i].shopCount;
              a++;
            }
          }
          if(a==this.activeClass.length){
            this.activeAllClass = "icon-checkOn";
          }else{
            this.activeAllClass = "icon-checkOff";
          }

        },
        goodsMess:function () {
          console.log(123);
          this.endPayNum = 0;
          this.totalAll = 0;
          var a = 0;
          if(this.goodsMess.length){
            for(var i = 0; i < this.activeClass.length;i++){
              if(this.activeClass[i] == "icon-checkOn"){
                this.totalAll+=this.goodsMess[i].shopCount *this.goodsMess[i].shopDetail.price;
                this.endPayNum+=this.goodsMess[i].shopCount;
                a++;
              }
            }
          }

          if(a==this.activeClass.length){
            this.activeAllClass = "icon-checkOn";
          }else{
            this.activeAllClass = "icon-checkOff";
          }
        }
      },
      methods:{
        changeClass(index){
          // this.bol=!this.bol
          if(this.activeClass[index]=="icon-checkOff"){
            this.$set(this.activeClass,index,"icon-checkOn");
          }else{
            this.$set(this.activeClass,index,"icon-checkOff");
          }
        },
        back(){
          this.$router.push('/')
        },
        hide(){
          this.bol=false
          this.flag=!this.flag
          console.log(this.$refs.barbottoms);
          var a=this.$refs.barbottoms
          var timer=setInterval(function () {
            a.style.top=a.offsetTop+3+"px"
            if(a.offsetTop>=window.innerHeight){
              clearInterval(timer)
            }
          },10)
        },
        apper(){
          this.bol=true
          this.flag=!this.flag
          var a=this.$refs.barbottoms
          var timer=setInterval(function () {
            a.style.top=a.offsetTop-3+"px"
            if(a.offsetTop<=window.innerHeight-a.offsetHeight){
              clearInterval(timer)
            }
          },10)
        },
        gotoHome(){
          this.$router.push({path:'/'})
        },
        checkAll(){
          if(this.activeAllClass=="icon-checkOff"){
            this.activeAllClass="icon-checkOn";
            for(var i = 0; i < this.goodsMess.length; i++){
              this.$set(this.activeClass,i,"icon-checkOn");
              console.log();
            }
          }else{
            this.activeAllClass="icon-checkOff";
            for(var i = 0; i < this.goodsMess.length; i++){
              this.$set(this.activeClass,i,"icon-checkOff");
              console.log();
            }
          }

        },
        deleteShop(){
          var arr=[];
          for(var i in this.activeClass){
            if(this.activeClass[i] == "icon-checkOn"){
              arr.push(this.goodsMess[i].shopDetail.category_id);
            }
          }
          console.log(arr);
          if(arr.length){
            this.$http.get('/api/deletShopCar',{params:{user:sessionStorage.getItem('user'),shopIdArr:arr}}).then((res)=>{
              sessionStorage.setItem('countAll','');
              this.$store.commit('getCountAll',sessionStorage.getItem('countAll'));
              this.$http.get('/api/getShopCar',{params:{user:sessionStorage.getItem('user')}}).then((res)=>{
                if(res.data.status){
                  this.goodsMess = res.data.message;
                  var countAlls = 0;
                  if(res.data.message.length){
                    for(var i = 0; i < res.data.message.length; i++){
                      countAlls+=res.data.message[i].shopCount;
                    }

                  }
                  sessionStorage.setItem('countAll',countAlls);
                  this.$store.commit('getCountAll',sessionStorage.getItem('countAll'));
                  this.activeClass = [];
                  for(var i = 0; i < res.data.message.length;i++){
                    this.activeClass[i] = "icon-checkOff";
                  }
                  this.activeAllClass = "icon-checkOff";
                }
              })
            })
          }

        }
      },
      computed:{
        kongBol(){
          console.log(this.goodsMess);
          this.totalAll=0;
          this.endPayNum=0;
          var count = 0;
          for(var i=0; i<this.goodsMess.length; i++){
            count += this.goodsMess[i].shopCount;
          }
          console.log(this.activeClass);
          if(this.goodsMess.length){
            for(var i = 0; i < this.activeClass.length;i++){
              if(this.activeClass[i] == "icon-checkOn"){
                this.totalAll+=this.goodsMess[i].shopCount *this.goodsMess[i].shopDetail.price;
                this.endPayNum+=this.goodsMess[i].shopCount;
              }
            }
          }
          if(count == 0){
            return false;
          }else{
            return true;
          }

        }
      }
    }
</script>

<style type="text/less" lang="less" scoped>
  @import "../../common/less/style.less";
  .wrap{
    padding-bottom: 50px;
    .emptyCar{
      text-align: center;
      color: #a4a4a4;
      font-size: 14px;
    }
    .gogo{
      width: 80%;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px;
      border: 1px solid #009c4c;
      line-height: 42px;
    }
    .emptyImg{
      text-align: center;
      padding-top: 60px;
      img{
        width: 140px;
        height: 140px;
      }
    }
    text-align: left;
    .barbottom{
      position: fixed;
      z-index: 20;
      left: 0;
      bottom: 0;
      height: 50px;
      border-top: 1px solid lightgray;
      width: 100%;
      overflow: hidden;
      background-color: white;
      .ap{
        height: 100%;
        float: left;
        display: flex;
        align-items: center;
        .checkAll{
          float: left;
          text-align: center;
          font-size: 12px;
          padding-left: 20px;
          span{
            font-size: 16px;
          }
        }
      }
      .allPrice{
        float: left;
        text-align: center;
        font-size: 16px;
        padding-left: 10px;
        height: 100%;
        line-height: 51px;

      }
      .cash{
        float: right;
        height: 100%;
        background-color:#009c4c;
        width: 35%;
        text-align: center;
        line-height: 50px;
        color: white;
        font-weight: 700;
      }
    }
    .barbottom1{
      position: fixed;
      left: 0;
      bottom: 0;
      height: 50px;
      width: 100%;
      overflow: hidden;
      border-top: 1px solid lightgray;
      background-color: white;
      .ap1{
        height: 100%;
        float: left;
        display: flex;
        align-items: center;
        .checkAll1{
          float: left;
          text-align: center;
          font-size: 16px;
          display: flex;
          text-align: center;
          margin-left: 10px;
          span{
            margin-left: 5px;
            line-height: 16px;
          }
        }
      }
      .dele{
        float: right;
        height: 100%;
        background-color:green;
        width: 35%;
        text-align: center;
        line-height: 50px;
        color: white;
      }
    }
  }
  .bar{
    width: 100%;
    height: 42px;
    overflow: hidden;
    position: fixed;
    text-align: center;
    left: 0;
    top: 0;
    background-color: white;
    z-index: 100;
    .left{
      float: left;
      display: inline-block;
      padding-top: 9px;
      img{
        width: 20px;
        height: 30px;
        margin-right: 10px;
      }
    }
    .right{
      float: right;
      display: inline-block;
      padding-top: 9px;
      font-size: 12px;
      padding-right:10px;
    }
    .adds{
      display: inline-block;
      line-height: 42px;
    }
  }
  .carlist{
    padding:50px 10px 10px 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    height: 77px;
    border-bottom: 10px solid #F1F1F1;
    padding-bottom:20px ;
    position: relative;
    .icon-checkOff{
      color: #009C51;
    }
    span{
      float: left;
    }
    .goodsImg{
      float: left;
      width: 77px;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .prod{
      float: left;
      height: 100%;
      p{
        margin-top: 10px;
        font-size: 12px;
      }
      .price{
        margin-top: 30px;
        width: 100%;
        color: #009c51;
      }
    }
    .control{
      float: right;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      margin-left: 30px;
      position: absolute;
      bottom: 20px;
      right: 10px;
      span{
        display: inline-block;
        margin-left: 20px;
        font-size: 20px;
        color: #a4a4a4;
      }
      .count{
        border: 1px solid lightgray;
        text-align: center;
        width: 32px;
        height: 29px;
        line-height: 27px;
        color: black;
      }
    }
  }
  .change{
    line-height: 40px;
    border-bottom: 1px solid lightgray;
    padding-left: 10px;
  }
  .sba{
    overflow: hidden;
    height:220px;
  }
  .slide{
    width: 100%;
    height: 230px;
    overflow: scroll;
    ul{
      white-space: nowrap;
      li{
        text-align: center;
        display: inline-block;
        .til{
          height: 20px;
          font-size: 14px;
        }
        .kio{
          font-size: 12px;
          color:gray;
        }
        .price{
          font-size: 13px;
          color:green;
        }
      }
      img{
        width: 134px;
      }
    }
  }
</style>
