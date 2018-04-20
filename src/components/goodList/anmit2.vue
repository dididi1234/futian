<template>
  <div class="wrap">
    <template v-for="(caritem,index) in onshow">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"><div class="Image" v-if="onshow[index]"><img :src=item.imgSrc[0] alt=""></div>
      </transition>
    </template>

    <span class="icon-shoppingcars icon"  @click="show()" ref="car"></span>
  </div>
</template>

<script>

  export default {
    name: "anmit",
    data(){
      return {
        onshow:[false,false,false,false,false],
        count:0,
        x:document.documentElement.clientWidth
      }
    },
    props:{
      //msg:Number
      item:{
        type:Object
      },
    },
    methods:{
      show(){

        this.$set(this.onshow,this.count,!this.onshow[this.count])
        this.count++
        if(this.count==5){
          this.count=0
        }
      },
      beforeEnter(el){
        $(el).css({
          opacity:1,
          marginLeft:-157,
          marginTop:-235,
          width:135,
          height:135
        })
      },
      enter(el,done){
        $(el).animate({
            opacity:0,
            marginLeft:0,
            marginTop:0,
            width:0,
            height:0
          },function(){
            done()
          }
        )
      },
      beforeLeave(el){
        $(el).css({
          opacity:1,
          marginLeft:-157,
          marginTop:-235,
          width:135,
          height:135
        })
      },
      leave(el,done){
        $(el).animate({
          opacity:0,
          marginLeft:0,
          marginTop:0,
          width:0,
          height:0
        },function(){
          done()
        })
      },
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .wrap{
    position: relative;
    .icon-shoppingcars{
      font-size: 20px;
    }
    .Image{
      position: absolute;
      top: 10px;
      left: 10px;
      width: 110px;
      height:110px;
      border-radius: 50%;
      border: 1px solid lightgray;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
