<template>
  <div class="search_top">
    <div>
      <span class="icon-search"></span>
      <input type="text" placeholder="搜索您喜欢的商品" @focus="bol=false" @blur="bol=true" ref="inp" v-model="goodsName">
    </div>
    <span v-if="bol" @click="cancel">取消</span>
    <span v-if="!bol" @click="search">搜索</span>
  </div>
</template>

<script>
  import bus from 'com/js/bus'
    export default {
        name: "search-top",
        // props:{
        //   dataName:{
        //     type:String
        //   }
        // },
        data(){
          return {
            bol:true,
            goodsName:'',
          }
        },
        methods:{
          cancel(){
            this.$router.go(-1);
          },
          search(){
            console.log("进入搜索页");
            console.log(this.$refs.inp);
            if(this.$refs.inp.value != ""){
              //往search.vue传一个历史搜索记录
              bus.$emit('history',this.$refs.inp.value)
            }

          }
        },
      created(){
          bus.$on('dataName',(res)=>{
            this.goodsName= res;

          })
      }
        // computed:{
        //   keyWord(){
        //     if(this.dataName){
        //       console.log(this.dataName);
        //       this.goodsName = this.dataName;
        //       return this.dataName;
        //     }
        //   }
        //
        // }
    }
</script>

<!--suppress CssUnknownTarget-->
<style type="text/less" lang="less" scoped>
  @import "~less/style.less";
  .search_top{
    display: flex;
    padding: 7px 0px;
    align-items: center;
    >div{
      border: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      width: 75%;
      height: 28px;
      margin-left: 20px;
      >span{
        font-size: 22px;
        margin-left: 8px;
      }
      >input{
        margin-left: 5px;
        outline: none;
        border: 0;
      }
    }
    >span{
      font-size: 14px;
      margin-left: 5%;
    }
  }
</style>
