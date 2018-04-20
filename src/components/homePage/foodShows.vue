<template>
    <div class="introAll">
      <div class="foodIntro">
        <div class="foodImg">
          <img src="../../assets/img/dogCan.jpg" alt="">
        </div>
        <p><a href="#">纽崔宝犬用鸡肉罐头</a></p>
        <p class="foodWeight">95克</p>
        <p>
          <span class="newPic">¥13</span>
          <span class="oldPic">¥14</span>
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "food-shows"
    }
</script>

<style lang="less" type="text/less" scoped>
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

</style>
