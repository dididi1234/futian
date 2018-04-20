<template>
  <div>
    <div class="product-list-search">
      <span @click="goSort" class="icon-左箭头"></span>
      <div @click="goSearch" class="search"><span class="icon-搜索"></span></div>
      <span id="turn" @click="change" :class="{'icon-列表':bol,'icon-图片列表':!bol}"></span>
      <span id="shopcart" class="icon-购物车">
        <div class="num" @click="gotoShopCar">{{countAll}}</div>
      </span>
    </div>
    <div class="menu-container">
      <a :class="{active:i==-1}" href="###" @click="getGoodsAll(foodListId,'-1')">全部</a>
      <a href="###" :class="{active:i==index}"  @click="getGoods(item.categroy_id,index)" v-for="(item,index) in foodListNav">{{item.type.title}}</a>
    </div>
    <div class="m-set-list">
      <p @click="turn(0)" :class="{actives:arr[0]}">最新</p>
      <p @click="turn(1)" :class="{actives:arr[1]}">价格 <i class="icon-上箭头"></i></p>
      <p @click="turn(2)" :class="{actives:arr[2]}">促销度<i class="icon-上箭头"></i></p>
      <p @click="turn(3)" :class="{actives:arr[3]}">筛选</p>
    </div>
    <div v-show="bol">
      <list :datas="secondFoodList"></list>
    </div>
    <div v-show="!bol">
      <list2 :datas="secondFoodList"></list2>
    </div>

  </div>

</template>

<script>
  import list from './list'
  import list2 from './list2'
  import bus from '../../common/js/bus'
  import {mapState} from "../../vuex";
    export default {
    data(){
      return{
        bol:true,
        arr:[false,false,false,false],
        foodListNav:[],
        secondFoodList:[],
        i:-1,
        all:-1
      }

    },
    components:{
      list,
      list2
    },
    created(){
        this.$http.get('/api/secondCategory',{params:{parent_id:this.foodListId}}).then((res)=>{
          console.log(res);
          if(res.data.status){
            this.foodListNav = res.data.message;
            console.log(this.foodListNav);
          }
        })
      this.$http.get('/api/secondCategoryGoods',{params:{granddad_id:this.foodListId}}).then((res)=>{
        if(res.data.status){
          this.secondFoodList = res.data.message;
          console.log(this.secondFoodList);
        }
      })

    },
    methods:{
      change(){
        this.bol = !this.bol;
      },
      turn(s){
        for(var i = 0;i<this.arr.length;i++){
          this.$set(this.arr,i,false);
        }
        this.$set(this.arr,s,true);
      },
      goSort(){
        this.$router.go(-1);
      },
      goSearch(){
        this.$router.push({path:'/informations/search'})
      },
      getGoods(id,index){
          this.i = index;
        console.log(id);
        this.$http.get('/api/secondCategoryGoods',{params:{parent_id:id}}).then((res)=>{
          if(res.data.status){
            this.secondFoodList = res.data.message;
            console.log(this.secondFoodList);
          }
        })
      },
      getGoodsAll(id,index){
        this.i = index;
        this.$http.get('/api/secondCategoryGoods',{params:{granddad_id:id}}).then((res)=>{
          if(res.data.status){
            this.secondFoodList = res.data.message;
            console.log(this.secondFoodList);
          }
        })
      },
      gotoShopCar(){
        this.$router.push({path:'/informations/shoppingCar'})
      }
    },
    computed:{
      ...mapState(['foodListId']),
      ...mapState(['countAll'])
    }
    }
</script>
<!--suppress CssUnknownTarget -->
<style lang="less" type="text/less" scoped>
  @import "~less/style.less";

.product-list-search{
  padding: 6px 0px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;

  .search{
    width:250px;
    height: 30px;
    background: #f1f1f1;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  span{
    margin-left: 10px;
  }
  .icon-列表{
    font-size: 20px;
  }
  .icon-图片列表{
    font-size: 22px;
  }
  #turn{
    width:30px;
    height: 20px;
  }
  #shopcart{
    position: relative;
    .num{
      position: absolute;
      top: -6px;
      right: -8px;
      border:1px solid #009c4c;
      border-radius: 50%;
      font-size: 12px;
      width:14px;
      height: 14px;
      text-align: center;
      line-height: 14px;
      color: #009c4c;
      background: white;
    }
  }
}
  .menu-container{
    width: 100%;
    height: 40px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    /*overflow:hidden;*/
    a{
      display: inline-block;
      padding: 0 10px;
      line-height: 38px;
      font-size: 14px;
      color: #333;
    }
    .active{
      color: #009c4c;
      border-bottom: 2px solid #009c4c;
    }
  }
  .m-set-list{
    width: 100%;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    p{
      width: 25%;
      margin: 12px 0 11px 0;
      font-size: 14px;
      color: #333;
      border-right: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;

    }
    .actives{
      color: #009c4c;
    }
  }


</style>
