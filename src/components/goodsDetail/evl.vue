<template>
  <div class="all">
  <div class="wrap" v-for="item in ratings">
    <div class="list">
      <div class="usernameStar">
        <p class="user"> {{item.user}}</p>
        <p class="star"><star :score=item.star></star></p>
      </div>
      <div class="tim">{{item.times}}</div>
    </div>
    <div class="con">{{item.description}}</div>
  </div>

  </div>
</template>

<script>
  import star from "c/common/star"
    export default {
      data(){
        return{
          ratings:[]
        }
      },
      name: "evl",
      components:{
          star
      },
      props:{
        goods_id:{
          type:String
        }
      },
      created(){
          this.$http.get('/api/rating',{params:{goods_id:this.goods_id}}).then((res)=>{
            console.log(res);
            if(res.data.status){
              this.ratings = res.data.message;
            }

          })
      }
    }
</script>

<style type="less/text" lang="less" scoped>
  @import "../../common/less/style.less";
  .all{
    border-top: 1px solid lightgray;
    padding-bottom: 50px;
  }
  .wrap{
    width: 90%;
    margin: 0 auto;
    border-bottom:1px solid #f0f0f0 ;
    padding-bottom: 15px;
  }
  .col{
    font-size: 13px;
  }
  .list{
    overflow: hidden;
    margin-top: 12px;
    .usernameStar{
      float: left;
      .user{
        font-size: 12px;
      }
      .star{

      }
    }
    .tim{
      float: right;
      font-size: 12px;
      line-height: 35px;
      color: #999;
    }
  }
</style>
