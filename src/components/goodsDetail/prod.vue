<template>
  <div class="all">
    <div class="wrap">
      <div class="spec">
        <div class="klo"><span>规格:</span><span class="klom">{{datapProd.spec}}</span></div>
        <div class="prp">产地: {{datapProd.yieldly}}</div>
        <div class="met">存储方式: {{datapProd.lay}}</div>

      </div>
      <div class="info">
        <p>产品详情介绍:</p>
        <p>{{datapProd.details}}</p>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
      name: "prod",
      props:{
        datapProd:{
            type:Object
          }
      },
      created(){
        console.log(this.datapProd);
      }
    }
</script>
<style type="less/text" lang="less" scoped>
  @import "../../common/less/style.less";
  .all{
    border-top: 1px solid #F0F0F0;
  }
  .wrap{
    width: 95%;
    margin: 0 auto;
    padding-bottom: 50px;
  }
.spec{
  .klo{
    margin-top: 10px;
    span{
    line-height: 30px;display: inline-block;
      margin-right: 10px;
    }
    .klom{
      border: 1px dashed green;
      display: inline-block;
      padding: 0 5px 0 5px;
      font-size: 12px;
    }
  }
  .prp,.met{
    margin-top: 5px;
    font-size: 12px;
  }
  padding-bottom: 10px;
  border-bottom: 10px solid #f0f0f0;
;
}
  .info{
    font-size: 12px;
    padding:10px 0 10px 0;
  }
</style>
