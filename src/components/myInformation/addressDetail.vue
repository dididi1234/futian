<template>
  <div class="addressDetail">
    <my-header :name="addBol?'添加地址':'修改地址'"></my-header>
    <ul v-if=addBol>
      <li>
        <input type="text" placeholder="收货人姓名" v-model="userName">
      </li>
      <li>
        <input type="text" placeholder="手机号码" v-model="phoneNumber">
      </li>
      <li>
        <textarea placeholder="详细地址" v-model="detailAddress"></textarea>
      </li>
      <li class="default">
        <input type="text" disabled placeholder="设为默认">
        <div @click="setDefault" :style="defaultBol?'backgroundColor: #c8c8c8':'backgroundColor: green'">
          <span :style="defaultBol?'left: 1px':'right:1px'"></span>
        </div>
      </li>
      <li>
        <select name="" id="selea" v-model="placeType">
          <option value="">地址标签</option>
          <option value="家">家</option>
          <option value="朋友">朋友</option>
          <option value="公司">公司</option>
        </select>
        <span class="icon-more_unfold"></span>
      </li>
    </ul>

    <ul v-else>
      <li>
        <input type="text" placeholder="收货人姓名" v-model="userName">
      </li>
      <li>
        <input type="text" placeholder="手机号码" v-model="phoneNumber">
      </li>
      <li>
        <textarea placeholder="详细地址" v-model="detailAddress"></textarea>
      </li>
      <li class="default">
        <input type="text" disabled placeholder="设为默认">
        <div @click="setDefault" :style="defaultBol?'backgroundColor: #c8c8c8':'backgroundColor: green'">
          <span :style="defaultBol?'left: 1px':'right:1px'"></span>
        </div>
      </li>
      <li>
        <select name="" id="seles" v-model="placeType">
          <option value="">地址标签</option>
          <option value="家">家</option>
          <option value="朋友">朋友</option>
          <option value="公司">公司</option>
        </select>
        <span class="icon-more_unfold"></span>
      </li>
    </ul>

    <div class="saveAddress">
      <div @click="saveAddress" :style="saveBol?'backgroundColor:#009c4c;color:white;':'backgroundColor:#f0f0f0;color:#a4a4a4;'">保存</div>
    </div>
  </div>
</template>

<script>
  import myHeader from '../common/myHeader';
    export default {
        name: "address-detail",
        data(){
          return {
            defaultBol: true,
            userName:'',
            phoneNumber:'',
            detailAddress:'',
            placeType:'',
            addressData:{},
            addBol:false
          }
        },
      created(){
        console.log(typeof this.$route.params.addressData)
        if(this.$route.params.addBol){
            this.addBol = true;
        }else{
          if(typeof this.$route.params.addressData == 'object'){
            console.log(1)
            sessionStorage.setItem('addressData',JSON.stringify(this.$route.params.addressData));
            this.addressData = this.$route.params.addressData;
            this.userName = this.addressData.userName;
            this.phoneNumber = this.addressData.phoneNumber;
            this.detailAddress = this.addressData.detailAddress;
            this.placeType = this.addressData.placeType;
            this.defaultBol = this.addressData.default?0:1;
          }else{
            this.addressData = JSON.parse(sessionStorage.getItem('addressData'));
            this.userName = this.addressData.userName;
            this.phoneNumber = this.addressData.phoneNumber;
            this.detailAddress = this.addressData.detailAddress;
            this.placeType = this.addressData.placeType;
            this.defaultBol = this.addressData.default?0:1;
          }
        }
      },
        methods:{
          setDefault(){
            this.defaultBol = !this.defaultBol;
          },
          saveAddress(){
            console.log(this.userName)
            if(this.saveBol){
              console.log(this.addBol?0:this.addressData._id)
              this.$http.get('/api/address',{params:{
                id:this.addBol?0:this.addressData._id,
                user:sessionStorage.getItem('user'),
                userName:this.userName,
                phoneNumber:this.phoneNumber,
                detailAddress:this.detailAddress,
                placeType:this.placeType,
                default: this.defaultBol?0:1
              }}).then((res)=>{
                console.log(res);
              })
            }
          }
        },
      components:{
        myHeader
      },
      computed:{
        saveBol(){
          console.log(/^1[3|4|5|8][0-9]\d{8}$/.test(this.phoneNumber))
          if(/^1[3|4|5|8][0-9]\d{8}$/.test(this.phoneNumber) && this.userName != '' && this.detailAddress != '' && this.placeType != ''){
            return true;
          }else{
            return false;
          }
        }
      }
    }
</script>
<!--suppress CssUnknownTarget-->
<style type="less/css" lang="less" scoped>
  @import "~less/style.less";
  .addressDetail{
    ul{
      margin-top: 46px;
      font-size: 14px;
      li{
        width: 100%;
        padding: 10px 20px;
        border-bottom: 1px solid #f0f0f0;
        box-sizing: border-box;
        position: relative;
        input{
          outline: none;
          border: 0;
          width: 100%;
        }
        textarea{
          width: 100%;
          height: 40px;
          resize: none;
          outline: none;
          border: 0;
        }
        .icon-more_unfold{
          position: absolute;
          right: 20px;
          top: 13px;
        }
        select{
          width: 100%;
          outline: none;
          font-size: 14px;
          border: 0;
          background: 0;
        }
      }
      .default{
        position: relative;
        input{
          background-color: white;
          width: 100%;
        }
        &>div{
          position: absolute;
          right: 16px;
          top: 7px;
          width: 46px;
          height: 26px;
          background-color: green;
          border-radius: 20px;
          span{
            display: inline-block;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: white;
            position: absolute;
            /*left: 1px;*/
            top: 1px;
          }
        }
      }
    }
    .saveAddress{
      padding: 0 20px;
      margin: 10px 0;
      text-align: center;
      div{
        width: 100%;
        font-size: 17px;
        line-height: 40px;
        border-radius: 4px;
      }
    }
  }
</style>
