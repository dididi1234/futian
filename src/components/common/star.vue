<template>
  <div class="stars" :class="starsType">
    <span class="star-item" v-for="starClass in starArr" :class="starClass"></span>
  </div>
</template>

<script>
  /*
  * ['on','on','on','half','off']
  * class = on 显示全星
  * class = half 显示半星
  * class = off 显示灰色星星
  *
  * type: 返回 .item-48,.item-36,.item-24
  * 代表星星组件的大小
  * */
  export default {
    name: "star",
    props: {
      score: {
        type: String,
        default: 3.2
      }
    },
    computed:{
      starsType () {
        return 'star-48';
      },
      starArr () {
        let arr = [];
        let interge = Math.floor(this.score);
        let score = Math.floor(this.score*2)/2;
        let hasHalf = score%1 != 0;

        for (var i=0; i<interge; i++){
          arr.push('on');
        }
        if(hasHalf){
          arr.push('half');
        }
        while(arr.length<5){
          arr.push('off');
        }

        return arr;
      }
    }
  }
</script>
<!--suppress CssUnknownTarget-->
<style lang="less" type="text/less" scoped>
  .stars{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    /*type为48的星星样式*/
    &.star-48{
      padding:5px 0 5px 0;
      .star-item{
        width: 10px;
        height: 10px;
        margin-right: 5px;
        background-size: 10px 10px;
        &:last-child{
          margin-right: 0;
        }
        /*on:显示全星*/
        &.on{
          background-image:url("../../assets/img/star48_on@2x.png");
        }
        &.half{
          background-image:url("../../assets/img/star48_half@2x.png")
        }
        &.off{
          background-image:url("../../assets/img/star48_off@2x.png")
        }
      }
    }
  }
</style>
