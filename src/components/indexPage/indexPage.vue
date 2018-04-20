<template>
  <div class="footNav">
  <router-view></router-view>
  <div class="tab">
    <router-link to="homePage" class="tab-item">
      <div>
        <!--<span class="icon-home" v-if="!navList[0]"></span>-->
        <!--<span class="icon-homeGreen" v-if="navList[0]"></span>-->
        <span class="icon-home" v-if="routerName !== '/indexPage/homePage'"></span>
        <span class="icon-homeGreen" v-if="routerName == '/indexPage/homePage'"></span>
      </div>

      <p>莆田</p>
    </router-link>
    <!--分类-->
    <router-link to="sort" class="tab-item" >
      <div>
        <span class="icon-all" v-if="routerName !== '/indexPage/sort'"></span>
        <span class="icon-sort2" v-if="routerName == '/indexPage/sort'"></span>
      </div>
      <p>分类</p>
    </router-link>
    <!--购物车-->
    <router-link :to=address class="tab-item" >
      <div class="shopNum">
        <span class="icon-shopCar"></span>
        <span>{{countAll}}</span>
      </div>
    </router-link>
    <!--食记-->
    <router-link to="FoodRecord" class="tab-item">
      <div>
        <span class="icon-pen" v-if="routerName !== '/indexPage/FoodRecord'"></span>
        <span class="icon-pen1" v-if="routerName == '/indexPage/FoodRecord'"></span>
      </div>
      <p>食记</p>
    </router-link>
    <!--我-->
    <router-link to="myInformation" class="tab-item">
      <div>
        <span class="icon-account" v-if="routerName !== '/indexPage/myInformation'"></span>
        <span class="icon-people1" v-if="routerName == '/indexPage/myInformation'"></span>
      </div>
      <p>我</p>
    </router-link>
  </div>
  </div>
</template>

<script>
  import bus from 'com/js/bus'
  import {mapState} from '../../vuex'
  export default {
      name: "index-page",
      data(){
        return{
          routerName:'/indexPage/homePage',
        }
      },
      methods:{

      },
      created(){
        bus.$on('routeAdd',(res)=>{
          // console.log(res);
          // console.log(11);
          this.routerName = res;
        })
      },
      computed:{
        address(){
          if(sessionStorage.getItem('user')){
            return '/informations/shoppingCar';
          }else{
            return '/informations/login';
          }
        },
        ...mapState(['countAll'])
      }
    }
</script>
<!--suppress CssUnknownTarget -->
<style lang="less" type="text/less" scoped>
  @import "~less/style.less";
  .footNav{
    /*max-width: 640px;*/
    text-align: center;
  .tab{
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    display: flex;
    border-top: 1px solid #F0F0F0;
    z-index: 100;
    background-color: white;
    .tab-item{
      flex: 1;
      padding: 5px 0;
      .shopNum{
        position: relative;
        &>span:nth-of-type(2){
          background-color: white;
          display: inline-block;
          width: 18px;
          height: 18px;
          line-height: 18px;
          border: 1px solid #009c4c;
          border-radius: 50%;
          position: absolute;
          font-size: 12px;
          right: 10px;
          top: -3px;
        }
      }
      span{
        font-size: 20px;
        display: inline-block;
      }
      p{
        font-size: 12px;
      }
      .icon-shopCar{
        font-size: 35px;
      }
    }

  }
  }
</style>
