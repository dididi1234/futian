<template>
  <div>
    <div class="all" v-for="item in dataList">

      <div class="actImg">
        <img :src=item.imgSrc alt="">
      </div>
      <div class="foodLists">
        <div class="introAll" v-for="val in item.secondSort">
          <router-link :to="{path:'/informations/goodsDetail',query:val}">
          <div class="foodIntro">
            <div class="foodImg">
              <img :src=val.imgSrc[0] alt="">
            </div>
            <p><a href="#">{{val.name}}</a></p>
            <p class="foodWeight">{{val.spec}}</p>
            <p>
              <span class="newPic">¥{{val.price}}</span>
              <span class="oldPic" v-if="val.oldPrice">¥{{val.oldPrice}}</span>
            </p>
          </div>
          </router-link>
        </div>
        <div class="foodMore">
          <span>查看更多</span>
          <img src="../../assets/img/more-item.png" alt="">
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import foodShows from './foodShows'
    export default {
      name: "food-type",
      components:{
        foodShows
      },
      props:{
        dataList:{
          type:Array
        }
      }
    }
</script>

<style lang="less" type="text/less" scoped>
  .all{
    background-color: white;
    margin: 10px 0 10px 0;
    .actImg{
      width: 100%;
      img{
        width: 100%;
      }
    }
    .foodLists{
      width: 100%;
      height: 210px;
      overflow-y: hidden;
      overflow-x: auto;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-bottom: 20px;
      text-align: left;
      position: relative;
      .introAll{
        display: inline-block;
        width: 148px;
        .foodIntro{
          text-align: center;
          padding: 5px 13px 10px 13px;
          .foodImg{
            img{
              width: 100%;
            }
          }
          p{
            white-space: normal;
            font-size: 14px;
            a{
              height: 46px;
              font-weight: 400;
              color: black;
            }
            .newPic{
              font-size: 13px;
              color: #009C51;
            }
            .oldPic{
              font-size: 12px;
              color: #A4A4A4;
              text-decoration: line-through;
            }
          }
          .foodWeight{
            font-size: 12px;
            line-height: 1.4;
          }
        }
      }
      .foodshow{
        display: inline-block;
      }
      .foodMore{
        display: inline-block;
        width: 100px;
        height: 100px;
        background-color: #F8F8F8;
        text-align: center;
        position: absolute;
        top: 30px;
        span{
          font-size: 14px;
          border-bottom: 1px solid #717171;
          padding: 25px 0 5px 0;
          display: block;
          width: 55px;
          margin: 0 auto;
          color: #717171;
          font-weight: 400;
        }
        img{
          width: 20px;
          height: 20px;
          margin: 10px auto;
        }
      }
    }
  }

</style>
