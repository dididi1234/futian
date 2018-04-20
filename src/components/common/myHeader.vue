<template>
  <div class="header">
    <img src="../../assets/img/back.png" alt="" @click="backTo">
    <h2>{{name}}</h2>
  </div>
</template>

<script>
    export default {
      name: "myHeader",
      props:{
        name:{
          type:String
        }
      },
      methods:{
        backTo(){
          this.$router.go(-1);
        }
      }

    }
</script>

<style type="text/less" lang="less" scoped>
  .header{
    display: flex;
    width: 100%;
    height: 46px;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #f0f0f0;
    background-color: white;
    z-index: 100;
    >img{
      width: 30px;
      height: 32px;
      position: absolute;
    }
    >h2{
      width: 100%;
      color: #333;
      font-size: 18px;
      text-align: center;
    }
  }
</style>
