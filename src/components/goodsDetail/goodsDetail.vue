<template>
    <div class="wrap">

      <template v-for="item in imgCart">
        <transition
          name="drop"
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <img v-show="item.show" class="goodImg" :src="goodsDetail.imgSrc[0]">
        </transition>
      </template>

      <div class="bar">
        <div class="left">
          <img src="../../assets/img/back.png" alt="" @click="go">
        </div>
        <div class="right" @click="goHomePage">
          <img src="../../assets/img/heart1.png" alt=""><img src="../../assets/img/home1.png" alt="">
        </div>
      </div>
      <!--轮播图-->
      <div>
      <Swiper class="swiper">
        <Slide v-for="item in goodsDetail.imgSrc">
          <img :src=item alt="">
        </Slide>
      </Swiper>
      </div>

      <div class="det">
        <div class="product-til">{{goodsDetail.name}}</div>
        <div class="met">{{goodsDetail.spec}}</div>
        <div class="price"><span class="rel">¥{{goodsDetail.price}}</span><span class="jia" v-if="goodsDetail.oldPrice">¥{{goodsDetail.oldPrice}}</span></div>
      </div>
      <div class="place">上海地区,16:00前下单当日送达</div>
      <div class="sort">
        <span :class="{spanGreen:flagBor}" @click="flagBor=true">详情</span>
        <span :class="{spanGreen:!flagBor}" @click="flagBor=false">评价</span>
        <evl active-class="ac" v-if="!flagBor" :goods_id="goodsDetail.category_id"></evl>
        <prod active-class="ac" v-else :datapProd="goodsDetail"></prod>

      </div>
      <div class="car">
        <router-link to="/informations/shoppingCar" class="shopcar"><img src="../../assets/img/shopCar1.png" alt=""><div class="amount">{{countAll}}</div></router-link>
        <div class="control"><span @click="subtract">-</span><span class="count">{{count}}</span><span @click="count++">+</span></div>
        <div class="add" @click="add(goodsDetail.category_id)">加入购物车</div>
      </div>
    </div>
</template>

<script>
    // import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { Swiper, Slide } from 'vue-swiper-component';
    import evl from "c/goodsDetail/evl";
    import prod from "c/goodsDetail/prod"
    import {mapState} from "../../vuex";

    export default {
      data(){
        return{
          count:1,
          goodsDetail:[],
          flagBor:true,
          imgCart:[{show:false},{show:false},{show:false},{show:false},{show:false}],
          dropCart:[],
          scrollY:0
        }

      },
      components: {
        Swiper,
        Slide,
        evl,
        prod
      },
      created(){
        console.log(this.$route.query);
        this.goodsDetail = this.$route.query;
        let _this = this;
        window.onscroll = function() {
          // console.log(this);
          _this.scrollY = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
//            console.log(_this.scrollY);
        }
      },
    methods:{
      subtract(){
        if(this.count>1){
          this.count--;
        }else{
          this.count=1;
        }
      },
      add(id){

        for(var i=0;i<this.imgCart.length;i++){
          let img = this.imgCart[i];
          if(!img.show){
            img.show = true;
            this.dropCart.push(img);
            continue;
          }
        }
        if(this.count>0){
          this.$http.get('/api/addShopCar',{params:{user:sessionStorage.getItem("user"),shopId:id,shopCount:this.count}}).then((res)=>{
            console.log(res);
            if(res.data.status){
              sessionStorage.setItem('countAll',res.data.message.countAll);
              this.$store.commit('getCountAll',res.data.message.countAll);
              console.log(sessionStorage.getItem('countAll'));
            }
          })
        }

      },
      go(){
        this.$router.go(-1);
      },
      goHomePage(){
        this.$router.push({path:'/'})
      },
      beforeDrop(el){
        let count = this.imgCart.length;
        while(count--){
          let imgcart = this.imgCart[count];
//          this.scrollY = document.documentElement.scrollTop;

          if(imgcart.show){
            $(el).css({
              transform:`translate(-100px,${-this.scrollY}px) scale(1)`,
              opacity:0,
            })
          }
        }
      },
      dropping(el,done){
        let rf = el.offsetHeight;
        console.log($("html").height());
//        console.log(this.scrollY);
        let y = $(window).height()+this.scrollY-100+'px';
        console.log(y);
        this.$nextTick(()=>{
          $(el).css({
            transition:'all 1s',
            transform:`translate(-260px,${y}) scale(0)`,
            opacity:0.8,
          })
          $(el).on('transitionend',function () {
            done();
          })
        })
      },
      afterDrop(el){
        let ball = this.dropCart.shift();
        ball.show = false;
//        console.log(this.scrollY)
        $(el).css({
          display:'none',
          transform:`translate(0px,${-this.scrollY}px) scale(0)`,
          opacity:0.8,
        })
      }
    },
    computed:{
      ...mapState(['countAll'])
    }
    }

</script>

<style type="text/less" lang="less" scoped>
  @import "../../common/less/style.less";
  Swiper img{
    width: 100%;
  }
  .ac{
    color:red;
  }
  .wrap{
    width: 100%;
    position: relative;
    text-align: left;
    .goodImg{
      width:50%;
      /*height: 375px;*/
      position: absolute;
      top:0;
      right: 0;
      z-index:100;
      border: 1px solid lightgray;
      border-radius: 50%;
    }
    .car{
      overflow: hidden;
      position: fixed;
      background-color: lightgray;
      width: 100%;
      height: 50px;
      left: 0;
      bottom: 0;
      .shopcar{
        width: 20%;
        display: flex;
        align-items: center;
        height: 100%;
        border-right: 1px solid white;
       justify-content: center;
        position: relative;
        .amount{
          position: absolute;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: #fe705a;
          font-size: 12px;
          color: white;
          text-align: center;
          top: 3px;
          right: 12px;
        }
      }
      .shopcar,.control{
        float: left;
        img{
          width: 32px;
          height: 30px;
        }
      }
      .control{
        width: 48%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        span{
          display: inline-block;
          margin-left: 20px;
          font-size: 20px;
          color: #a4a4a4;
        }
        .count{
          border: 1px solid gray;
          text-align: center;
          width: 20%;
          height: 27px;
          line-height: 27px;
          color: black;
        }
      }
      .add{
        float:right;
        background-color: green;
        height: 100%;
        width: 30%;
        color: white;
        line-height: 50px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
  .bar{
    width: 100%;
    height: 42px;
    overflow: hidden;
    position: absolute;
    z-index: 50;
    left: 0;
    top: 0;
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
      img{
      width:27px;
      height: 25px;
        margin-right: 10px;
      }
    }
  }
  .swiper{
    width: 100%;
    height: 375px;
    img{
      width: 100%;
    }
  }
  .product-til{
    font-size: 14px;
    padding-top: 10px;
  }
  .price{
    line-height: 30px;
  }
  .met{
    color: #009c4c;
    font-size: 12px;
    padding-top: 8px;
  }
  .det{

    padding-left: 20px;
    .rel{
      color: #009c4c;
      font-size: 17px;
    }
    .jia{
      text-decoration: line-through;
      font-size: 12px;
    }
  }
  .place{
    padding: 10px 20px;
    color: #f07641;
    font-size: 12px;
    border-top: 1px solid #f0f0f0;
    border-bottom: 10px solid #f0f0f0;

  }
  .sort{
    overflow: hidden;
    border-bottom: 1px solid #f0f0f0;
    .spanGreen{
      color: #009F9E;
      font-weight: 500;
    }
    span{
      width: 48%;
      line-height: 50px;
      font-size: 15px;
      text-align: center;
      display: inline-block;
    }
  }

</style>
