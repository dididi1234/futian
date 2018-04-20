<template>
  <ul>
    <li class="goods-lists" v-for="(item,index) in datas">
      <router-link :to="{path:'/informations/goodsDetail',query:item}">
        <img :src=item.imgSrc[0] alt="">
        <template v-for="">
          <transition name="fade"
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @before-leave="beforeLeave"
                      @leave="leave">
            <img :src=item.imgSrc[0] alt="" v-show="" class="animg"></transition></template>
      </router-link>
      <div class="right">
        <router-link :to="{path:'/informations/goodsDetail',query:item}">
          <p class="til">{{item.name}}</p>
        </router-link>
        <p class="cont">{{item.point}}</p>
        <p class="place">{{item.yieldly}}</p>
        <p class="g">{{item.spec}}</p>
        <p class="price"><span class="s1">￥{{item.price}}</span><span class="s2" v-if="item.oldPrice">￥{{item.oldPrice}}</span></p>

        <p class="p1" @click="joinSC(item.category_id)"><child :item="item"></child></p>
      </div>
    </li>

  </ul>
</template>
<script>
  import child from "c/goodList/anmit.vue"
  export default {
    components:{
      child
    },
    data(){
      return {
        onshow:[],
        Images:[true,true,true,true,true],
      }
    },
    created(){
      this.x= document.documentElement.clientWidth-30
      console.log(this.x);

    },
    props:{
      datas:{
        type:Array
      }
    },
    methods:{
      show(index){
        console.log(index);

      },
      joinSC(id){
        if(sessionStorage.getItem("user")){
          this.$http.get('/api/addShopCar',{params:{user:sessionStorage.getItem("user"),shopId:id,shopCount:1}}).then((res)=>{
            if(res.data.status){
              sessionStorage.setItem('countAll',res.data.message.countAll);
              this.$store.commit('getCountAll',res.data.message.countAll);
            }

          })
        }else{
          this.$router.push({path:'/informations/login',query:{bol:true}})
        }
      },
      beforeEnter(el){
        console.log('beforeEnter');
        console.log(el);
        $(el).css({
          opacity:1,
          marginLeft:0,
          marginTop:0,
          width:110,
          height:110
        })
      },
      enter(el,done){
        console.log('enter');
        console.log(el);
        $(el).animate({
            opacity:0,
            marginLeft:this.x,
            marginTop:100,
            width:0,
            height:0
          },function(){
            done()
          }
        )
      },
      enterTo(el){
        console.log('enterTo');
        console.log(el);
      },
      beforeLeave(el){
        console.log('beforeLeave');
        console.log(el);
        $(el).css({
          opacity:1,
          marginLeft:0,
          marginTop:0,
          width:110,
          height:110
        })
      },
      leave(el,done){
        console.log('leave');
        console.log(el);
        $(el).animate({
          opacity:0,
          marginLeft:this.x,
          marginTop:100,
          width:0,
          height:0
        },function(){
          done()
        })
      },
      leaveTo(el){
        console.log('leaveTo');
        console.log(el);
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
    .goods-lists{
      width: 100%;
      padding: 20px 10px 0 10px;
      display: flex;
      align-items: center;
      position: relative;
      img{
        width: 110px;
        height: 110px;
      }
      .animg{
        position: absolute;
        left: 10px;
        top: 20px;
      }
      /*.fade-enter-to,.fade-leave-to{*/
      /*opacity: 0;*/
      /*transform: translate(300px,50px) scale(0);*/
      /*}*/

      .right{
        margin-left: 10px;
        text-align: left;
        .til{
          height: 32px;
          line-height: 16px;
          font-size: 14px;
          color: #333;
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
            margin-left: 10px;
          }
        }
        .p1{
          position: absolute;
          right: 10px;
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
  }
</style>
