<template>
    <ul>
      <li class="goods-list" v-for="item in datas">
        <router-link :to="{path:'/informations/goodsDetail',query:item}">
          <img :src=item.imgSrc[0] alt="">
          <p class="til">{{item.name}}</p>
        </router-link>
          <p class="cont">{{item.point}}</p>
          <p class="place">{{item.yieldly}}</p>
          <p class="g">{{item.spec}}</p>
          <p class="price"><span class="s1">￥{{item.price}}</span><span class="s2" v-if="item.oldPrice">￥{{item.oldPrice}}</span></p>
          <p class="p1" @click="joinSC(item.category_id)"><child :item="item"></child></p>
      </li>
    </ul>
</template>
<script>
  import child from "c/goodList/anmit2"
    export default {
      components:{
        child
      },
      props:{
        datas:{
          type:Array
        }
      },
      methods:{
        joinSC(id){
          console.log(sessionStorage.getItem("user"));
          if(sessionStorage.getItem("user")){
            this.$http.get('/api/addShopCar',{params:{user:sessionStorage.getItem("user"),shopId:id,shopCount:1}}).then((res)=>{
              console.log(res);
              if(res.data.status){
                sessionStorage.setItem('countAll',res.data.message.countAll);
                this.$store.commit('getCountAll',res.data.message.countAll);
                console.log(sessionStorage.getItem('countAll'));
              }

            })
          }else{
            this.$router.push({path:'/informations/login',query:{bol:true}})
          }

        }
      }
    }
</script>
<!--suppress CssUnknownTarget -->
<style lang="less" type="text/less" scoped>
  @import "~less/style.less";

  ul{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    .goods-list{
      width: 42%;
      margin-top: 3.5%;
      margin-left: 3.5%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      img{
        width: 135px;
        height: 135px;
      }
      .til{
        height: 32px;
        line-height: 16px;
        font-size: 14px;
        color: #333;
        text-align: center;
      }
      .cont{
        height: 18px;
        font-size: 12px;
        color: #009c4c;
      }
      .place{
        font-size: 12px;
        line-height: 16px;
        color: #717171;
      }
      .g{
        font-size: 12px;
        line-height: 16px;
        color: #717171;
      }
      .price{
        .s1{
          font-size: 14px;
          color: #009c4c;
        }
        .s2{
          font-size: 12px;
          color: #a4a4a4;
          text-decoration: line-through;
        }
        #shop{
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
      .p1{
        position: absolute;
        right: 0;
        bottom: 0;
        .icon-购物车2{
          font-size: 20px;
        }
        .icon:before{
          color: #009c4c;
        }
      }
    }
  }
</style>
