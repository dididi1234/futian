<template>
    <div class="sort">
      <my-header name="分类"></my-header>
      <div class="sort_content">
        <ul>
          <li @click="goGoodList(item.categroy_id)" v-for="item in sortData">
            <img :src=item.type.imgSrc alt="">
            <span>{{item.type.title}}</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import myHeader from '../common/myHeader';
  import bus from 'com/js/bus'

    export default {
        name: "sort",
        data () {
          return {
            sortData:[]
          }
        },
        components:{
          myHeader
        },
      created(){
        // console.log(this.$route.path);
        this.$http.get('/api/topCategory').then((res)=>{
          console.log(res);
          if(res.data.status){
            this.sortData = res.data.message;
          }
        });
        bus.$emit('routeAdd',this.$route.path);

      },
      methods:{
        goGoodList(id){
          // console.log(id)
          this.$router.push({path:'/informations/goodList'});
          this.$store.commit('setInfo',id);
        }
      }
    }
</script>

<style type="less/text" lang="less" scoped>
  .sort{
    .sort_content{
      width: 100%;
      margin-top: 55px;
      margin-bottom: 55px;
      ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        >li{
          width: 33.3%;
          display: flex;
          flex-direction: column;
          text-align: center;
          margin: 10px 0 5px;
          >img{
            width: 57%;
            margin: 0 auto 5px auto;
          }
          >span{
            width: 100%;
            margin: 8px 0 10px 0;
            font-size: 14px;
            color: #717171;
          }
        }
      }
    }
  }
</style>
