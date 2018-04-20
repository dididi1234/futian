<template>
  <div class="search">
    <search-top></search-top>
    <div class="searchOption" v-if="searchOk">
      <div class="search_mid">
        <p>热搜</p>
        <div ref="topSearch" @click="searchRecommend">
          <span>苹果</span>
          <span>水蜜桃</span>
          <span>马陆葡萄</span>
          <span>酸奶</span>
          <span>西瓜</span>
          <span>蓝莓</span>
          <span>极黑猪</span>
          <span>三文鱼</span>
        </div>
      </div>
      <div class="search_bottom">
        <p>历史搜索</p>
        <p v-if="historyBol">暂无历史搜索</p>
        <div>
          <span v-for="item in historyData">{{item}}</span>
        </div>
      </div>
      <div class="clearHistory">
        <span @click="clearHistory">清除历史搜索</span>
      </div>
    </div>
    <div class="searchResult" v-if="!searchOk">
      <list2 :datas="message"></list2>
    </div>

  </div>
</template>

<script>
    import searchTop from './searchTop';
    import bus from 'com/js/bus'
    import list2 from 'c/goodList/list2'
    export default {
        name: "search",
        data(){
          return {
            historyData:[],
            searchOk:true,
            message:[],
            searchName:''
          }
        },
        computed:{
          //监听是否有无历史记录
          historyBol () {
            if(this.historyData.length == 0){
              return true;
            }else{
              return false;
            }
          }
        },
        created(){

          bus.$on('history',(res) => {
            // this.historyData.push(res);
            if(!sessionStorage.getItem('historyData')){
              console.log(1)
              var arr = [];
              arr.push(res);
              arr = JSON.stringify(arr);
              console.log(arr);
              sessionStorage.setItem('historyData',arr);
            }else{
              console.log(2)
              var arr = JSON.parse(sessionStorage.getItem('historyData'));
              var bol = false;
              console.log(arr[0],arr.length);

              for(var i=0; i<arr.length; i++){
                if(res == arr[i]){
                  bol = true;
                }
              }

              if(!bol){
                arr.push(res);
              }

              arr = JSON.stringify(arr);

              sessionStorage.setItem('historyData',arr);
            }


            this.$http.get('/api/muhuSelect',{params:{'name':res}}).then((res)=>{
              this.message = res.data.message;
              this.searchOk = false;
            })
          })

          if(!sessionStorage.getItem('historyData')){
            this.historyData = [];
          }else{
            this.historyData = JSON.parse(sessionStorage.getItem('historyData'));
          }

        },
        methods:{
          clearHistory(){
            this.historyData = [];
            sessionStorage.setItem('historyData','');
          },
          //点击热搜进行搜索
          searchRecommend(e){
            console.log(e.target.innerHTML);
            this.searchName = e.target.innerHTML;
            bus.$emit('dataName',e.target.innerHTML);

            //设置sessionStorage.setItem('historyData),就是设置历史记录
            var arr = JSON.parse(sessionStorage.getItem('historyData'));
            var bol = false;
            var arr = [];
            // console.log(!sessionStorage.getItem('historyData'))
            if(sessionStorage.getItem('historyData')){
              arr = JSON.parse(sessionStorage.getItem('historyData'));
              for(var i=0; i<arr.length; i++){
                if(e.target.innerHTML == arr[i]){
                  bol = true;
                }
              }
            }

            if(!bol){
              arr.push(e.target.innerHTML);
            }
            arr = JSON.stringify(arr);
            sessionStorage.setItem('historyData',arr);

            this.$http.get('/api/muhuSelect',{params:{'name':e.target.innerHTML}}).then((res)=>{
              this.message = res.data.message;
              this.searchOk = false;
            })
          }
        },
        components:{
          searchTop,
          list2
        }
    }
</script>


<style type="text/less" lang="less" scoped>
  .search{
    .searchOption{
      .search_mid{
        padding: 8px 0;
        background-color: #f0f0f0;
        >p{
          background-color: white;
          padding: 9px 18px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
          color: #333;
        }
        >div{
          background-color: white;
          padding: 18px 18px 12px 18px;
          >span{
            display: inline-block;
            padding: 3px 8px;
            margin: 0 8px 8px 0;
            border-radius: 4px;
            color: #333;
            font-size: 12px;
            background-color: #f0f0f0;
          }
        }
      }
      .search_bottom{
        p:first-child{
          background-color: white;
          padding: 9px 18px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 14px;
          color: #333;
        }
        p:nth-of-type(2){
          color: #a4a4a4;
          font-size: 14px;
          padding: 18px 18px 12px 18px;
        }
        >div{
          background-color: white;
          padding: 18px 18px 12px 18px;
          >span{
            display: inline-block;
            padding: 3px 8px;
            margin: 0 8px 8px 0;
            border-radius: 4px;
            color: #333;
            font-size: 12px;
            background-color: #f0f0f0;
          }
        }
      }
      .clearHistory{
        width: 100%;
        text-align: center;
        padding: 0px 20px;
        box-sizing: border-box;
        position: fixed;
        bottom: 10px;
        span{
          display: inline-block;
          border: 1px solid #009c4c;
          color: #009c4c;
          width: 100%;
          padding: 10px 0;
          font-size: 14px;
          border-radius: 4px;
        }
      }
    }
    .searchResult{
      border-top: 1px solid #F0F0F0;
    }
  }
</style>
