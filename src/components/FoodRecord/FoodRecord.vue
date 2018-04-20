<template>
<div class="alls">
  <myHeader name="食记"></myHeader>
 <div class="foot-cart">
   <div class="sort">
     <p class="til">食品分类</p>
     <div class="Img"><img src="../../assets/img/foods_1.jpg" alt=""></div>
   </div>
   <div class="sort">
     <p class="til">美味记事</p>
     <div class="Img Img1"><img src="../../assets/img/foods_2.jpg" alt=""></div>
   </div>
 </div>
  <div class="food-content">
  <ul>
    <li class="Jlazy"><img src="../../assets/img/purple_asparagus.jpg" alt=""></li>
    <li class="title">烤紫芦笋配黑米、牛油果和豆苗 <div class="clock">45分钟<span class="icon-clock"></span></div> </li>
    <li class="info">紫黑色食品中富含大量的花青素，具有清除自由基，抗氧化，防止衰老的功能。可起到护肝、养目、防癌、修复等作用。</li>
    <li class="difecult"><span>难易程度</span><div class="lab"><div ></div></div></li>
  </ul>

</div>
  <div class="food-content">
    <ul>
      <li class="Jlazy"><img src="../../assets/img/purple_asparagus.jpg" alt=""></li>
      <li class="title">烤紫芦笋配黑米、牛油果和豆苗 <div class="clock">45分钟<span class="icon-clock"></span></div> </li>
      <li class="info">紫黑色食品中富含大量的花青素，具有清除自由基，抗氧化，防止衰老的功能。可起到护肝、养目、防癌、修复等作用。</li>
      <li class="difecult"><span>难易程度</span><div class="lab"><div ></div></div></li>
    </ul>

  </div>
  <div class="food-content">
    <ul>
      <li class="Jlazy"><img src="../../assets/img/purple_asparagus.jpg" alt=""></li>
      <li class="title">烤紫芦笋配黑米、牛油果和豆苗 <div class="clock">45分钟<span class="icon-clock"></span></div> </li>
      <li class="info">紫黑色食品中富含大量的花青素，具有清除自由基，抗氧化，防止衰老的功能。可起到护肝、养目、防癌、修复等作用。</li>
      <li class="difecult"><span>难易程度</span><div class="lab"><div ></div></div></li>
    </ul>

  </div>

</div>
</template>

<script>
  import myHeader from 'c/common/myHeader'
  import bus from 'com/js/bus'
    export default {
       name:"fort-cart",
      components:{
        myHeader
      },
        methods:{

        },
      created(){
        // console.log(this.$route.path);
        bus.$emit('routeAdd',this.$route.path);

      },
    }
</script>

<style type="text/less" lang="less" scoped>
  @import "../../common/less/style.less";
  .alls{
    padding-bottom: 50px;
  }
     .foot-cart{
       padding: 10px;
       overflow: hidden;
       margin-top: 45px;
       .sort{
         text-align: center;
         width: 50%;
         float: left;
         .Img{
          margin-top: 10px;
             border-right: 1px solid lightgray;
           img{
             width: 115px;
             height: 115px;

           }
         }
         .Img1{
           border: none;
         }
       }
     }
  .food-content{
    ul{
      li{

        img{
          width: 100%;
        }
      }
      .title{
        padding: 0 20px 0 20px;
        position: relative;
        .clock{
          position: absolute;
          right: 0;
          top: -10px;
          color:gray;
          font-size: 12px;
          .icon-clock{
            margin-left: 10px;
            background-color: white;
            padding: 3px;
            font-size: 20px;
            border-radius: 50%;
            color: lightgray;
            border: 1px solid lightgray;
          }
        }

      }
      .difecult{
        height: 40px;
        border-top: 1px dashed lightgray ;
        padding: 0 20px 0 20px;
        display: flex;
        align-items: center;
        span{
          float: left;
          font-size: 12px;
          color: #717171;
        }
        .lab{
          float: left;
          width: 202px;
          border: 1px solid lightgray;
          height: 14px;
          border-radius: 10px;
          margin-left: 10px;
          div{
            width: 30%;
            height: 14px;
            border-radius: 10px;
            background-color: lightgray;
          }
        }
      }
      .info{
        padding: 10px 20px 10px 20px;
        font-size: 14px;
        color: #717171;
      }
    }
  }
</style>
