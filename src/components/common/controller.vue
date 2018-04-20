<template>
    <div class="cart-controller">
      <transition name="move">
        <div class="decrease" @click="subtract(food.shopDetail.category_id)" v-if="food.shopCount>0">
          <span class="icon-deletes"></span>
        </div>
      </transition>
      <div class="num" v-if="food.shopCount>0">{{food.shopCount}}</div>
      <div class="add" @click="add(food.shopDetail.category_id)">
        <span class="icon-addCount"></span>
      </div>
    </div>
</template>

<script>
  import bus from 'com/js/bus'
    export default {
      name: "controller",
      data(){
        return {
          count:this.food.shopCount,
        }
      },
      props:{
        food:{
          type:Object
        },
        refIndex:{
          type:Number
        }
      },
      methods:{
        add(id){
          console.log(id)
          this.$http.get('/api/addShopCar',{params:{user:sessionStorage.getItem("user"),shopId:id,shopCount:1}}).then((res)=>{
            // console.log(res);
            if(res.data.status){
              this.food.shopCount++;
              sessionStorage.setItem('countAll',res.data.message.countAll);
              this.$store.commit('getCountAll',res.data.message.countAll);
              console.log(sessionStorage.getItem('countAll'));
              console.log(this.count);
            }
          })
        },
        subtract(id){
          console.log(id)
          this.$http.get('/api/addShopCar',{params:{user:sessionStorage.getItem("user"),shopId:id,shopCount:-1}}).then((res)=>{
            // console.log(res);
            if(res.data.status){
              this.food.shopCount--;
              sessionStorage.setItem('countAll',res.data.message.countAll);
              this.$store.commit('getCountAll',res.data.message.countAll);
              console.log(sessionStorage.getItem('countAll'));
              // bus.$emit('addCount')
            }
          })
        }
      }
    }
</script>

<!--suppress CssUnknownTarget -->
<style type="text/less" lang="less" scoped>
  @import "~less/style";
  .cart-controller{
    font-size: 0;
    .decrease{
      display: inline-block;
      padding: 0 6px;
      opacity: 1;
      transform: translate3d(0,0,0);
      span{
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: #009C56;
        transform: rotate(0);
        font-size: 16px;
      }
      &.move-enter,&.move-leave-to{
        opacity: 0;
        transform: translate3d(24px,0,0);
        span{
          transform: rotate(180deg);
        }

      }
      &.move-enter-active,&.move-leave-active{
        transition:all 0.4s linear;
        span{
          transition:all 0.4s linear;
        }
      }
    }
    .num{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
      padding: 0 5px;
      border: 1px solid #F1F1F1;
    }
    .add{
      display: inline-block;
      padding: 0 6px;
      line-height: 24px;
      font-size: 24px;
      span{
        color: #009C56;
        font-size: 16px;
      }
    }
  }
</style>
