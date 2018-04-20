<template>
  <div class="all">
    <div>

      <myHeader name="配送城市"></myHeader>
      <div ref="addWrapper" class="address-list">
        <div>
          <div class="nowCity">
            <img src="../../assets/img/nowAddress1.png" alt="">
            <span>{{cityName}}</span>
          </div>

          <div class="hotCity">
            <p>热门城市</p>
            <div class="hotCities" @click="replaceCity">
              <span>上海</span>
              <span>北京</span>
              <span>南京</span>
              <span>宁波</span>
              <span>杭州</span>
              <span>苏州</span>
            </div>
          </div>
          <div class="allCities" @click="replaceCity">
            <p class="allTitle">所有城市</p>
            <div class="letter" v-for="item in cities" ref="cityList">
              <p>{{item.letter}}</p>
              <div class="letterCity">
                <span v-for="key in item.area">{{key}}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div ref="menuwrapper">
        <ul class="skip">
          <li ref="letterList" :class="{current:currentIndex == 0}">#</li>
          <li v-for="(item,index) in cities" ref="letterList" :class="{current:currentIndex == index+1}" @click="selectCity(index)">{{item.letter}}</li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script>
  import myHeader from 'c/common/myHeader'
  import bus from 'com/js/bus'
  import {mapState} from "../../vuex";
  import BScroll from 'better-scroll';
    export default {
      name: "city",
      data(){
        return {
          cities:[],
          heightList:[],
          scrollY:0,
        }
      },
      components:{
        myHeader
      },
      methods:{
        replaceCity(e){
          if (e.target.tagName == "SPAN"){
            // bus.$emit('place',this.cityName);
            // this.$router.push({path:'/indexPage'})
            this.$store.commit('change',e.target.innerHTML)
            this.$router.go(-1);

          }
        },
        initialScroll (){
          let addWrapper = this.$refs.addWrapper;
          this.cityScroll = new BScroll(addWrapper,{
            probeType:3,//会在滚动以及滚动动画时派发scroll事件
            click:true
          });
          //this.foodScroll事件监听
          this.cityScroll.on('scroll',(pos)=>{
            // console.log(pos);
            this.scrollY = Math.abs(Math.floor(pos.y))
          })
        },
        calulateHeight(){
          let cityList = this.$refs.cityList;
          // console.log(foodList);
          let height = 0;
          this.heightList.push(height);
          for(var i=0;i < cityList.length;i++){
            // height += cityList[i].clientHeight;
            height = $(cityList[i]).offset().top-46;
            this.heightList.push(height);
          }
          console.log(this.heightList);
        },
        selectCity(index){
          let cityList = this.$refs.cityList;
          console.log(cityList);
          let el = cityList[index];
          console.log(el)
          let y = this.heightList[index+1]
          // this.cityScroll.scrollToElement(el,300);
          this.cityScroll.scrollTo(0,-y,300)
        }
      },
      computed: {
        ...mapState(['cityName']),
        currentIndex (){
          for(var i=0;i<this.heightList.length-1;i++){
            let height1 = this.heightList[i];
            let height2 = this.heightList[i+1];
            if(this.scrollY >= height1 && this.scrollY<height2){
              return i;
            }
          }
        },
      },
      created(){
        this.$http.get('/api/city').then((res)=>{
          console.log(res);
          this.cities= res.data.message;
          console.log(this.cities);
          this.$nextTick(()=>{
            this.initialScroll();
            this.calulateHeight();
          })
        })

      }
    }
</script>

<style lang="less" type="text/less" scoped>
  .current{
    color: #009C51;
    font-size: 20px;
    font-weight: 600;
  }

  .all{
    position: relative;
    width: 100%;
    height: 100vh;
    z-index: 50;
    &>div{
      height: 100%;
      .address-list{
        height: 100%;
        overflow: hidden;
        &>div{
          padding-top: 46px;
        }
      }
    }
    .nowCity{
      padding:0 20px;
      line-height: 40px;
      font-size: 14px;
      text-align: left;
      img{
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      span{
        font-size: 15px;
        vertical-align: middle;

      }

    }
    .hotCity{
      padding: 10px 20px 20px 20px;
      background-color: rgba(0,0,0,0.03);
      p{
        text-align: left;
        font-size: 14px;
        line-height: 40px;
        color: red;
      }
      .hotCities{
        font-size: 14px;
        span{
          width: 30%;
          line-height: 30px;
          border-radius: 5px;
          text-align: center;
          display: inline-block;
          background-color: white;
          margin: 2px;
          border: 1px solid #E6E6E6;
          border-radius: 5px;
        }
      }
    }
    .allCities{
      padding: 0 20px;
      .allTitle{
        text-align: left;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid #E6E6E6;
        color:black;
        font-weight: 500;
      }
      .letter{
        padding-bottom: 10px;
        .letterA{
          border: 0;
        }
        p{
          width: 90%;
          text-align: left;
          font-weight: 500;
          line-height: 40px;
          border-top: 1px solid #E6E6E6;
          margin: 0 auto;
          color: #009C51;
        }
        .letterCity{
          text-align: left;
          span{
            width: 30%;
            line-height: 40px;
            margin: 2px;
            display: inline-block;
            text-align: center;
          }
        }
      }
      .letter:nth-of-type(1){
        p{
          border: 0;
        }
      }
    }
    .skip{
      position: fixed;
      top: 50px;
      right: 5px;
      font-size: 12px;
      li{
        width: 20px;
        height: 20px;
        margin-top: 5px;
        text-align: center;
      }
    }
  }
</style>
