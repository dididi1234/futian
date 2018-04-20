<template>
  <div class="headerAll">
    <div class="top">
      <!--城市-->
      <div class="address" @click="changeCity">
        <img src="../../assets/img/address.png" alt="">
        <span>{{cityName}}</span>
      </div>
      <!--搜索栏-->
      <div class="search" @click="searchPage">
        <span class="icon-search"></span>
      </div>
      <!--语言-->
      <div class="language">
        <span>Cn</span>
        <img src="../../assets/img/cn.png" alt="">
      </div>
    </div>
    <div class="continter">
      <div class="active1">
        <img src="../../assets/img/active1.jpg" alt="">
      </div>
      <div class="active2">
        <img src="../../assets/img/active2.jpg" alt="">
      </div>
      <!--轮播图-->
      <div class="swiper">
        <Swiper class="swiperAll" :autoPlay="true" :showIndicator="true" interval="2500" duration="500">
          <Slide class="slide"><img src="../../assets/img/APPl2.jpg" alt=""></Slide>
          <Slide class="slide"><img src="../../assets/img/APPl1.jpg" alt=""></Slide>
          <Slide class="slide"><img src="../../assets/img/APPl3.jpg" alt=""></Slide>
          <Slide class="slide"><img src="../../assets/img/APPl4.jpg" alt=""></Slide>
        </Swiper>
      </div>
      <!--四个活动-->
      <div class="acts">
        <div class="act">
          <img src="../../assets/img/act1.jpg" alt="">
          <p>注册好礼</p>
        </div>
        <div class="act">
          <img src="../../assets/img/act2.jpg" alt="">
          <p>本周特惠</p>
        </div>
        <div class="act">
          <img src="../../assets/img/act3.jpg" alt="">
          <p>买一得二</p>
        </div>
        <div class="act">
          <img src="../../assets/img/act4.jpg" alt="">
          <p>VIP商城</p>
        </div>
      </div>
      <!--新品上市-->
      <div class="newFoods">
        <div class="newTitle">
          <p>新品上市</p>
          <a href="###">
            <img src="../../assets/img/more-bg.png" alt="">
          </a>
        </div>
        <div class="covers">
          <div class="listAll">
            <div class="newFoodLists">

                <div class="listBor">
                  <div class="newFoodImg">
                    <img src="../../assets/img/newFood1.jpg" alt="">
                  </div>
                  <div class="newFoodMess">
                    <p class="comboName">草莓终止套装(丘比特)</p>
                    <p class="comboType">春季种植套装</p>
                    <p class="num">一套</p>
                    <p class="pic">
                      ¥39<span class="oldPic">¥49</span>
                    </p>
                  </div>
                </div>

            </div>
            <div class="newFoodLists">
              <div class="listBor">
                <div class="newFoodImg">
                  <img src="../../assets/img/newFood1.jpg" alt="">
                </div>
                <div class="newFoodMess">
                  <p class="comboName">草莓终止套装(丘比特)</p>
                  <p class="comboType">春季种植套装</p>
                  <p class="num">一套</p>
                  <p class="pic">
                    ¥39<span class="oldPic">¥49</span>
                  </p>
                </div>
              </div>

            </div>
            <div class="newFoodLists">
              <div class="listBor">
                <div class="newFoodImg">
                  <img src="../../assets/img/newFood1.jpg" alt="">
                </div>
                <div class="newFoodMess">
                  <p class="comboName">草莓终止套装(丘比特)</p>
                  <p class="comboType">春季种植套装</p>
                  <p class="num">一套</p>
                  <p class="pic">
                    ¥39<span class="oldPic">¥49</span>
                  </p>
                </div>
              </div>

            </div>
            <div class="newFoodLists">
              <div class="listBor">
                <div class="newFoodImg">
                  <img src="../../assets/img/newFood1.jpg" alt="">
                </div>
                <div class="newFoodMess">
                  <p class="comboName">草莓终止套装(丘比特)</p>
                  <p class="comboType">春季种植套装</p>
                  <p class="num">一套</p>
                  <p class="pic">
                    ¥39<span class="oldPic">¥49</span>
                  </p>
                </div>
              </div>

            </div>
            <div class="newFoodLists">
              <div class="listBor">
                <div class="newFoodImg">
                  <img src="../../assets/img/newFood1.jpg" alt="">
                </div>
                <div class="newFoodMess">
                  <p class="comboName">草莓终止套装(丘比特)</p>
                  <p class="comboType">春季种植套装</p>
                  <p class="num">一套</p>
                  <p class="pic">
                    ¥39<span class="oldPic">¥49</span>
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      <router-view></router-view>
      </div>
      <!--三个小活动-->
      <div class="appAct">
        <img src="../../assets/img/app1.jpg" alt="">
      </div>
      <div class="appAct">
        <img src="../../assets/img/app2.jpg" alt="">
      </div>
      <div class="appAct">
        <img src="../../assets/img/app3.jpg" alt="">
      </div>
        <foodType :dataList="activesList"></foodType>
      <!--商品列表-->
      <div class="crossList">
        <list2 :datas="secondList"></list2>
      </div>
      <!--到达底部-->
      <div class="toBottom">
        <p @click="addSecondList">{{moreBol?'加载更多':'没有更多数据了'}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  import foodType from './foodType';
  import bus from 'com/js/bus'
  import {Swiper,Slide} from 'vue-swiper-component'
  import {mapState} from "../../vuex";
  import list2 from 'c/goodList/list2'
  export default {
      name: "home-page",
      data(){
        return{
          activesList:[],
          secondList:[],
          moreBol:true
        }
      },
      methods:{
        changeCity(){
         this.$router.push({path:'/informations/City'})
        },
        searchPage(){
          this.$router.push({path:'/informations/search'})
        },
        // goDetail(){
        //   this.$router.push({path:'/informations/goodsDetail'})
        // }
        addSecondList(){
          this.$http.get('/api/moreData',{params:{
            skip:this.secondList.length
          }}).then((res)=>{
            console.log(res)
            if(res.data.status == 1){
              for(var i=0; i<res.data.message.length; i++){
                this.secondList.push(res.data.message[i])
              }
            }
            //没有更多数据了
            if(res.data.status == 2){
              this.moreBol = false;
            }
          })
        }
      },
      created(){
        // console.log(this.$route.path);
        this.$http.get('/api/index').then((res)=>{
          console.log(res);
          if(res.data.status){
            this.activesList = res.data.message.sorts;
            this.secondList = res.data.message.moreData;
            console.log(this.activesList);
          }
          bus.$emit('routeAdd',this.$route.path);
        })
      },
      components:{
        foodType,
        Swiper,
        Slide,
        list2
      },
      computed: {
        ...mapState(['cityName'])
      }
    }
</script>

<!--suppress CssUnknownTarget -->
<style lang="less" type="text/less" scoped>
  @import '~less/style.less';
  .headerAll{
    background-color: #F0F0F0;
    padding-bottom: 50px;
    .top{
      width: 100%;
      padding: 7px 0 5px 0;
      overflow: hidden;
      border-bottom: 1px solid #e8e8e8;
      background-color: white;
      .address{
        float: left;
        margin-left: 10px;
        line-height: 30px;
        img{
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
        span{
          font-size: 15px;
          vertical-align: middle;
          margin-left: -5px;
        }
      }
      .search{
        float: left;
        width: 60%;
        height: 30px;
        background-color: #F1F1F1;
        margin-left: 5%;
        border-radius: 5px;
        text-align: left;
        .icon-search{
          line-height: 30px;
          margin-left: 5px;
        }
      }
      .language{
        width: 13%;
        float: right;
        margin-right: 10px;
        line-height: 30px;
        span{
          font-size: 12px;
          vertical-align: middle;
        }
        img{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
    .continter{
      .active1{
        background-color: white;
        img{
          width: 100%;
        }
      }
      .active2{
        background-color: white;
        img{
          width: 100%;
        }
      }
      .swiper{
        background-color: white;
        width: 100%;
        height: 250px;
        white-space: normal;
        overflow: hidden;
        .swiperAll{
          .slide{
            img{
              width: 100%;
            }
          }
        }
      }
      .acts{
        background-color: white;
        width: 100%;
        padding-bottom: 10px;
        display: flex;
        margin: 10px 0 10px 0;
        .act{
          flex: 1;
          img{
            width: 65px;
          }
          p{
            font-size: 14px;
            color: black;
          }
        }
      }
      .newFoods{
        width: 100%;
        background-color: white;
        padding-bottom: 10px;
        .newTitle{
          position: relative;
          p{
            font-size: 14px;
            line-height: 40px;
            text-align: center;
          }
          a{
            width: 30px;
            height: 30px;
            position: absolute;
            top: 5px;
            right: 0;
            display: inline-block;
            line-height: 30px;
          }
          img{
           width: 12px;
            height: 12px;
          }
        }
        .covers{
          width: 100%;
          height: 125px;
          overflow-y: hidden;
          .listAll{
            overflow-y: hidden;
            overflow-x: auto;
            white-space: nowrap;
            padding: 0 5px;
            width: 90%;
            height: 135px;
            margin: 0 auto;
            .newFoodLists{
              padding: 4px;
              height: 112px;
              border: 1px solid #F0F0F0;
              display: inline-block;
              position: relative;
              margin-left: 5px;
              .listBor{
                min-height: 112px;
                .newFoodImg{
                  position: absolute;
                  top: 1px;
                  left: 10px;
                  width: 110px;
                  height: 110px;
                  img{
                    width: 100%;
                  }
                }
                .newFoodMess{
                  padding: 0 20px 0 120px;
                  text-align: left;
                  .comboName{
                    font-size: 14px;
                    margin-bottom: 10px;
                  }
                  .comboType{
                    font-size: 12px;
                    color: #009C51;
                    margin-bottom: 25px;
                    text-align: left;
                  }
                  .num{
                    font-size: 12px;
                  }
                  .pic{
                    font-size: 14px;
                    color: #009C51;
                    font-weight: 600;
                    .oldPic{
                      margin-left: 10px;
                      font-size: 12px;
                      color: #A4A4A4;
                      text-decoration: line-through;
                    }
                  }
                }
              }

            }
          }
        }


      }
      .appAct{
        margin: 7px 0px;
        width: 100%;
        height: 205px;
        img{
          width: 100%;
          height: 205px;
        }
      }
      .crossList{
        background-color: white;
        margin-top: 8px;
      }
      .toBottom{
        p{
          line-height: 30px;
          font-size: 12px;
          color: #a4a4a4;
          background-color: #f0f0f0;
          font-weight: 600;
        }
      }
    }
  }

</style>
