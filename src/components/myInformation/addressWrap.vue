<template>
    <div class="addressWrap">
      <my-header name="地址管理"></my-header>
      <div class="haveAddress" v-if=bol>
        <ul>
          <li v-for="(item,index) in addressData" ref="addressList">
            <div class="addressDetail">
              <div>
                <p>
                  <span>{{item.userName}}</span>
                  <span>{{item.placeType}}</span>
                </p>
                <span>{{item.phoneNumber}}</span>
              </div>
              <p>{{item.detailAddress}}</p>
            </div>

            <div class="addressEdit">
              <span v-if="item.default">默认</span>
              <p>
                <router-link tag="span" class="icon-edit" :to="{name:'addressDetail',params:{addressData:item}}"></router-link>
                <span class="icon-delete" @click="deleteAddress(item._id,index)"></span>
              </p>
            </div>
          </li>
        </ul>

      </div>

      <div class="noAddress" v-else>
        <div class="">
          <img src="../../assets/img/addressImg.png" alt="">
          <p>您还没有添加任何地址</p>
        </div>

      </div>
      <router-link tag="div" class="addBtn" :to="{name:'addressDetail',params:{addBol:true}}">
        <div>
          +添加地址
        </div>
      </router-link>
    </div>
</template>

<script>
  import myHeader from '../common/myHeader';
    export default {
      name: "Address",
      data(){
        return {
          bol:false,
          addressData:[],
          addLength:0
        }
      },
      components:{
          myHeader
      },
      created(){
        this.$http.get('/api/getAddress',{params:{user:sessionStorage.getItem('user')}}).then((res)=>{
          console.log(res)
          //防止后台报错,如果报错还是显示无地址状态
          if(res.data.status){
            if(res.data.message.length){
              this.bol = true;
              this.addressData = res.data.message;
              this.addLength = res.data.message.length;
            }else{
              this.bol = false;
            }
          }else{
            this.bol = false;
          }
        })
      },
      methods:{
        deleteAddress(id,index){
          this.$http.get('/api/delAddress',{params:{id:id}}).then((res)=>{
            if(res.data.status){
              this.$refs.addressList[index].remove();
              alert('删除成功');
              this.addLength--;
              if( this.addLength == 0){
                this.bol=false;
                console.log(54444);
              }
            }

          })
        }
      }
    }
</script>
<!--suppress CssUnknownTarget-->
<style type="less/css" lang="less" scoped>
  @import "~less/style.less";
  .addressWrap{
    padding-bottom: 60px;
    .haveAddress{
      margin-top: 46px;
      ul{
        li{
          font-size: 14px;
          position: relative;
          width: 100%;
          height: 100%;
          margin: 0 auto;
          padding: 8px 20px;
          border-top: 1px solid #f0f0f0;
          border-bottom: 8px solid #f0f0f0;
          box-sizing: border-box;
          .addressDetail{
            padding-right: 20px;
            border-bottom: 1px solid #f0f0f0;
            &>div{
              display: flex;
              position: relative;
              p{
                span:nth-of-type(2){
                  font-size: 12px;
                  line-height: 1.4;
                  position: relative;
                  display: inline-block;
                  padding: 1px 8px 0 8px;
                  color: #009c4c;
                  border: 1px solid #009c4c;
                  border-radius: 9px;
                }
              }
              &>span{
                position: absolute;
                right: 0;
              }
            }
            &>P{
              font-size: 12px;
              margin: 10px 0;
              color: #333;
            }
          }
          .addressEdit{
            overflow: hidden;
            padding: 5px 0;
            &>span{
              float: left;
              line-height: 25px;
              color: red;
            }
            &>p{
              float: right;
              font-size: 18px;
              span{
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
    .noAddress{
      text-align: center;
      margin-top: 40%;
      img{
        width: 140px;
        height: 140px;
        margin: 25px auto 10px auto;
      }
      p{
        font-size: 14px;
        color: #a4a4a4;
      }
    }
    .addBtn{
      border-top: 1px solid #f0f0f0;
      padding: 10px 20px 9px;
      width: 100%;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      background-color: white;
      text-align: center;
      div{
        width: 100%;
        font-size: 17px;
        color: white;
        background-color: #009c4c;
        line-height: 40px;
        border-radius: 4px;
      }
    }
  }
</style>
