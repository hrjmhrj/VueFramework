<template>
  <div class="vip-page">
    <!--头部-->
    <van-sticky>
      <van-nav-bar title="我的会员">
        <van-icon name="arrow-left" slot="left" size="18px" color="#fff"/>
      </van-nav-bar>
    </van-sticky>
    <div>
      <!--蓝条-->
      <div class="vip-top-div"></div>
      <!--会员卡片-->
      <div :class="[data.isvipflag == 1 ? 'vip-card-box--isvip':'vip-card-box--notvip']" class="vip-card-box">
        <div class="vip-card-box_user">
          <!--头像-->
          <span class="vip-card-box_user--span vip-card-box_user--tx">
						<van-icon name="vip-card" :class="[data.isvipflag == 1 ? 'vip-card-box_user--txbg--isvip':'vip-card-box_user--txbg--notvip']"/>
					</span>
          <!--文字-->
          <span class="vip-card-box_user--span vip-card-box_user--name">
						<div class="vip-card-box_user--name--one">阿陈</div>
						<div class="vip-card-box_user--name--two">高级会员</div>
					</span>
          <span class="vip-card-box_user--span vip-card-box_user--qy">
						我的权益 >
					</span>
        </div>
        <!--数量-->
        <div class="vip-card-box_num">
					<span class="vip-card-box_num--span vip-card-box_num--span--one">
						<span class="vip-card-box_num--span--num">4</span>
						<span class="vip-card-box_num--span--name">基础课</span>
					</span>
          <span class="vip-card-box_num--line" :class="[data.isvipflag == 1 ? 'vip-card-box_num--line--isvip':'vip-card-box_num--line--notvip']">
					</span>
          <span class="vip-card-box_num--span vip-card-box_num--span--two">
						<span class="vip-card-box_num--span--num">8</span>
						<span class="vip-card-box_num--span--name">高级课</span>
					</span>
        </div>
      </div>
      <!--会员套餐-->
      <div class="vip-type">
        <p class="vip-type-text">选择会员套餐</p>
        <!--套餐列表-->
        <div
                v-for="(item, index) in data.viplist"
                :key="index"
                class="vip-type-box"
                :class="[index%2==0 ? 'vip-type-box_left':'vip-type-box_right' , {'vip-type-bg':index==isactive}]"
                @click='fn(index)'
        >
          <div class="vip-type-box_name">{{item.NAME}}</div>
          <div class="vip-type-box_price">￥{{item.PRICE}}/年</div>
          <div class="vip-type-box_date">{{item.DATE != '' ? '到期时间'+item.DATE : '您未开通该会员'}}</div>
        </div>
        <!--续费按钮-->
        <div class="vip-type-btn-div">
          <div class="vip-type-btn" @click="fn2()">{{data.viplist[isactive].DATE == '' ? '开通会员' : '立即续费'}}</div>
        </div>
      </div>
      <!--会员权益-->
      <div class="vip-qy">
        <p class="vip-qy-text">{{data.viplist[isactive].NAME}}权益</p>
        <!--权益列表-->
        <div class="vip-qy-box">
          <div class="vip-qy-li" v-for="(item,index) in data.viplist[isactive].qy">
            <van-icon :name="item.ICON" class="vip-qy-li-icon"/>
            <div class="vip-qy-li-text">
              {{item.NAME}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatTimeToStr} from '../../assets/js/date';
  import { Sticky,NavBar,Icon, } from 'vant';
  export default {
    name: "vip",
    data(){
      return {
        isactive:0,
        //进入页面的请求数据
        data:{
          //会员商品列表，date!="" 则已开通
          viplist:[
            {
              NAME:"中级会员",
              PRICE:1200,
              DATE:"2021.03.17",
              qy:[
                {
                  "NAME":"4天高级课",
                  "ICON":"vip-card",
                },
                {
                  "NAME":"微课",
                  "ICON":"column",
                },
                {
                  "NAME":"直播间",
                  "ICON":"live",
                },
                {
                  "NAME":"电话答疑",
                  "ICON":"service",
                },
                {
                  "NAME":"文字答疑",
                  "ICON":"font",
                },
                {
                  "NAME":"继续教育",
                  "ICON":"manager",
                },
                {
                  "NAME":"2次会员专享服务",
                  "ICON":"gem"
                },
                {
                  "NAME":"面授畅听课",
                  "ICON":"friends",
                },
                {
                  "NAME":"1次内审",
                  "ICON":"todo-list",
                }
              ]
            },
            {
              NAME:"高级会员A",
              PRICE:4800,
              DATE:"",
              qy:[
                {
                  "NAME":"4天基础课",
                  "ICON":"hot"
                },
                {
                  "NAME":"4天高级课",
                  "ICON":"vip-card",
                },
                {
                  "NAME":"微课",
                  "ICON":"column",
                },
                {
                  "NAME":"直播间",
                  "ICON":"live",
                },
                {
                  "NAME":"电话答疑",
                  "ICON":"service",
                },
                {
                  "NAME":"文字答疑",
                  "ICON":"font",
                },
                {
                  "NAME":"继续教育",
                  "ICON":"manager",
                },
                {
                  "NAME":"2次会员专享服务",
                  "ICON":"gem"
                },
                {
                  "NAME":"面授畅听课",
                  "ICON":"friends",
                },
                {
                  "NAME":"1次内审",
                  "ICON":"todo-list",
                }
              ]
            },
            {
              NAME:"高级会员B",
              PRICE:4800,
              DATE:"",
              qy:[
                {
                  "NAME":"8天高级课",
                  "ICON":"vip-card",
                },
                {
                  "NAME":"微课",
                  "ICON":"column",
                },
                {
                  "NAME":"直播间",
                  "ICON":"live",
                },
                {
                  "NAME":"电话答疑",
                  "ICON":"service",
                },
                {
                  "NAME":"文字答疑",
                  "ICON":"font",
                },
                {
                  "NAME":"继续教育",
                  "ICON":"manager",
                },
                {
                  "NAME":"2次会员专享服务",
                  "ICON":"gem"
                },
                {
                  "NAME":"面授畅听课",
                  "ICON":"friends",
                },
                {
                  "NAME":"1次内审",
                  "ICON":"todo-list",
                }
              ]
            },
            {
              NAME:"畅听会员",
              PRICE:9880,
              DATE:"",
              qy:[
                {
                  "NAME":"基础课不限次数",
                  "ICON":"hot"
                },
                {
                  "NAME":"高级课不限次数",
                  "ICON":"vip-card",
                },
                {
                  "NAME":"微课",
                  "ICON":"column",
                },
                {
                  "NAME":"直播间",
                  "ICON":"live",
                },
                {
                  "NAME":"电话答疑",
                  "ICON":"service",
                },
                {
                  "NAME":"文字答疑",
                  "ICON":"font",
                },
                {
                  "NAME":"继续教育",
                  "ICON":"manager",
                },
                {
                  "NAME":"2次会员专享服务",
                  "ICON":"gem"
                },
                {
                  "NAME":"面授畅听课",
                  "ICON":"friends",
                },
                {
                  "NAME":"1次内审",
                  "ICON":"todo-list",
                }
              ]
            },
          ],
          //是否开通了会员标识
          isvipflag:1,
        }
      }
    },
    methods:{
      fn (index) {
        this.isactive=index;
      },
      fn2(){
        this.data.isvipflag = (this.data.isvipflag == 1 ? 0 : 1);
      }
    },
    components:{
      [Sticky.name]:Sticky,
      [NavBar.name]:NavBar,
      [Icon.name]:Icon,
    }
  }
</script>

<style scoped lang="scss">
  .vip-page{
    width: 375px;
    height: 100vh;
    overflow: scroll;
  }
  .vip-top-div{
    background: #2F344F;
    width: 375px;
    height: 89px;
    z-index: 22;
  }
  /*vip卡片*/
  .vip-card-box{
    width: 341px;
    height: 142px;
    z-index: 30;
    margin:-71px 17px 0 17px;
    border-radius: 12px;
  }
  .vip-card-box--isvip{
    background-image: linear-gradient(125deg, #e8d2a8, #e1c99b 25%,#e7d0a6 25%, #d0af79 65%,#d4b480 65%,#c9a56b);
  }
  .vip-card-box--notvip{
    background-image: linear-gradient(125deg, #cdc9c9, #c7c4c3 25%,#ccc9c8 25%, #b9b5b5 65%,#bcb8b8 65%,#b4afaf);
  }
  .vip-card-box_user{
    height: 59px;
    width: 100%;
    padding-top: 12px;
  }
  .vip-card-box_user--span{
    display: inline-block;
    vertical-align: middle;
  }
  .vip-card-box_user--tx{
    width: 55px;
    height: 55px;
    border-radius: 27.5px;
    background: #fff;
    margin-left: 11px;
    line-height: 55px;
    text-align: center;
  }
  .vip-card-box_user--txbg--notvip{
    color: #cdc9c9;
  }
  .vip-card-box_user--txbg--isvip{
    color: #e8d2a8;
  }
  .vip-card-box_user--name{
    width: 150px;
    height: 55px;
    margin-left: 18px;
  }
  .vip-card-box_user--name--one{
    height: 29px;
    font-size: 20px;
    line-height: 29px;
  }
  .vip-card-box_user--name--two{
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    margin-top: 3px;
  }
  .vip-card-box_user--qy{
    width: 80px;
    height: 20px;
    position: relative;
    top: -20px;
    left: 20px;
    font-size: 14px;
    color: #4f4f4f;
    line-height: 20px;
  }
  .vip-card-box_num{
    height: 61px;
    width: 100%;
    padding-top: 10px;
  }
  .vip-card-box_num--span{
    height: 71px;
    display: inline-block;
    vertical-align: middle;
    line-height: 71px;
    text-align: center;
  }
  .vip-card-box_num--span--one{
    float: left;
    width:170px;
  }
  .vip-card-box_num--span--two{
    float: right;
    width:169px;
  }
  .vip-card-box_num--line{
    display: inline-block;
    width: 1px;
    height: 30px;
  }
  .vip-card-box_num--line--isvip{
    background: #ffd49a;
  }
  .vip-card-box_num--line--notvip{
    background: #fff;
  }
  .vip-card-box_num--span--num{
    height: 27px;
    line-height:27px;
    display: block;
    color: #4f4f4f;
    font-size: 18px;
    font-style: italic;
  }
  .vip-card-box_num--span--name{
    height: 20px;
    line-height:20px;
    display: block;
    font-size: 14px;
  }
  /*vip种类*/
  .vip-type{
    width: 341px;
    margin: 0 17px;
    background: #fff;
  }
  .vip-type-text{
    color: #101010;
    padding: 16px 0;
    font-size: 18px;
  }
  .vip-type-box{
    box-sizing: border-box;
    border:2px solid #DBB588;
    width: 163px;
    height: 132px;
    border-radius:10px;
    margin-bottom:12px;
  }
  .vip-type-box_left{
    float: left;
  }
  .vip-type-box_right{
    float: right;
  }
  .vip-type-btn-div{
    clear:both;
    padding-top: 7px;
  }
  .vip-type-btn{
    width: 263px;
    height: 50px;
    background: #E9C897;
    color: #A48053;
    margin: 0 auto;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    border-radius: 25px;
  }
  .vip-type-bg{
    background: #FBF1DF;
  }
  .vip-type-box_name{
    font-size: 18px;
    height: 29px;
    width: 100%;
    line-height: 29px;
    text-align: center;
    padding-top: 15px;
  }
  .vip-type-box_price{
    font-size: 20px;
    height: 31px;
    width: 100%;
    line-height: 31px;
    text-align: center;
    color: #DBB588;
    padding-top: 14px;
  }
  .vip-type-box_date{
    font-size: 12px;
    height: 17px;
    width: 100%;
    line-height: 17px;
    text-align: center;
    color: #D0CCC1;
    padding-top: 13px;
  }
  /*vip权益*/
  .vip-qy{
    width: 341px;
    margin: 0 17px 24px 17px;
    background: #fff;
  }
  .vip-qy-text{
    color: #101010;
    padding: 22px 0 15px 0;
    font-size: 18px;
  }
  .vip-qy-box{
    width: 339px;
    box-shadow: 1px 1px 5px 0px rgba(170, 170, 170, 100);
    border-radius: 10px 10px 10px 10px;
    padding-bottom: 18px;
    border: 1px solid rgba(255, 255, 255, 100);
    height: auto;
  }
  .vip-qy-li{
    display: inline-block;
    width: 113px;
    height: 50px;
    margin-top: 18px;
  }
  .vip-qy-li-icon,.vip-qy-li-text{
    width: 113px;
    text-align: center;
  }
  .vip-qy-li-icon{
    color: #F2D497;
  }
  .vip-qy-li-text{
    margin-top: 5px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
</style>
<style>
  .vip-page .van-nav-bar__content{
    height: 40px;
    background: #01A7FB;
  }
  .vip-page .van-nav-bar{
    line-height: 40px;
  }
  .vip-page .van-nav-bar__title{
    color: #fff;
    font-size: 18px;
    height: 40px;
  }
  .vip-page .van-nav-bar .van-icon{
    font-size: 18px !important;
  }
  .vip-page .vip-qy-li .van-icon{
    font-size: 24px !important;
  }
  .vip-page .vip-card-box_user--tx .van-icon{
    font-size: 40px !important;
    vertical-align: middle;
  }
  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }
</style>