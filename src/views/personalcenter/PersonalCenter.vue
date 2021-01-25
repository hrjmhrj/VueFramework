<template>
  <div class="personalcenter">
    <div class="upceng" @touchmove.prevent>
      <van-row class="content touxiangc">
        <van-col span="8"></van-col>
        <van-col span="8">
          <div class="touxiangkaung"/>
        </van-col>
        <van-col span="8"></van-col>
      </van-row>
      <van-row class="content hynamec">
        <van-col span="8"></van-col>
        <van-col span="8">
          <div class="ziti2 hyname">
            杜一平
          </div>
        </van-col>
        <van-col span="8"></van-col>
      </van-row>
    </div>
    <div class="hycell geceng" @click="wodehuiyuan">
      <van-row class="content">
        <van-col span="1">
        </van-col>
        <van-col span="2">
          <van-icon name="gem-o" class="tubiao"/>
        </van-col>
        <van-col span="5">
          <div class="ziti">
            我的会员
          </div>
        </van-col>
        <van-col span="13">
        </van-col>
        <van-col span="3">
          <van-icon name="arrow" class="tubiao1"/>
        </van-col>
      </van-row>
    </div>
    <div class="hycell" @click="wodexueyuan">
      <van-row class="content">
        <van-col span="1">
        </van-col>
        <van-col span="2">
          <van-icon name="friends-o" class="tubiao"/>
        </van-col>
        <van-col span="5">
          <div class="ziti">
            我的学员
          </div>
        </van-col>
        <van-col span="13">
        </van-col>
        <van-col span="3">
          <van-icon name="arrow" class="tubiao1"/>
        </van-col>
      </van-row>
    </div>
    <div class="hycell geceng" @click="havebought">
      <van-row class="content">
        <van-col span="1">
        </van-col>
        <van-col span="2">
          <van-icon name="shopping-cart-o" class="tubiao"/>
        </van-col>
        <van-col span="5">
          <div class="ziti">
            已购买
          </div>
        </van-col>
        <van-col span="13">
        </van-col>
        <van-col span="3">
          <van-icon name="arrow" class="tubiao1"/>
        </van-col>
      </van-row>
    </div>
    <div class="hycell" @click="reserv">
      <van-row class="content">
        <van-col span="1">
        </van-col>
        <van-col span="2">
          <van-icon name="calendar-o" class="tubiao"/>
        </van-col>
        <van-col span="5">
          <div class="ziti">
            已预约
          </div>
        </van-col>
        <van-col span="13">
        </van-col>
        <van-col span="3">
          <van-icon name="arrow" class="tubiao1"/>
        </van-col>
      </van-row>
    </div>
    <div class="hycell geceng" @click="changepassword">
      <van-row class="content">
        <van-col span="1">
        </van-col>
        <van-col span="2">
          <van-icon name="setting-o" class="tubiao"/>
        </van-col>
        <van-col span="5">
          <div class="ziti">
            修改密码
          </div>
        </van-col>
        <van-col span="13">
        </van-col>
        <van-col span="3">
          <van-icon name="arrow" class="tubiao1"/>
        </van-col>
      </van-row>
    </div>
    <div class="butt">
      <van-button color="#01A7FB" round block type="info" native-type="submit" @click="logout">
        退出登录
      </van-button>
    </div>
    <div class="grzxbottom">
      <van-row>
        <van-col span="10" @click="baoming">
          <div class="dibuneibu">
            <van-icon name="edit" :class="[!this.xuanding?'tubiaoxd':'tubiao2']"/>
            <div :class="[!this.xuanding?'zitixd':'ziti1']">
              报名
            </div>
          </div>
        </van-col>
        <van-col span="4">
        </van-col>
        <van-col span="10" @click="gerenzhongxin">
          <div class="dibuneibu">
            <van-icon name="contact" :class="[this.xuanding?'tubiaoxd':'tubiao2']"/>
            <div :class="[this.xuanding?'zitixd':'ziti1']">
              个人中心
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import {Button, Row, Col, Cell, CellGroup, Form, Notify, Field, Icon, Dialog} from 'vant';

  export default {
    name: "PersonalCenter",
    components: {
      [Cell.name]: Cell,
      [Row.name]: Row,
      [Col.name]: Col,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [Form.name]: Form,
      [Field.name]: Field,
      [Icon.name]: Icon,
      [Notify.name]: Notify,
      [Dialog.name]: Dialog,
    },
    data() {
      return {
        xuanding:true,
      }
    },
    methods: {
      wodehuiyuan() {
        console.log("点击我的会员");
      },
      wodexueyuan() {
        console.log("点击我的学员");
      },
      havebought() {
        console.log("点击已购买");
        this.$router.push({
          path: "/purchased", query: {
            token: this.token ? this.token : "",
          }
        })
      },
      reserv() {
        console.log("点击已预约");
        this.$router.push({
          path: "/reserved", query: {
            token: this.token ? this.token : "",
          }
        })
      },
      changepassword() {
        console.log("点击修改密码");
        this.$router.push({
          path: "/changepassword", query: {
            token: this.token ? this.token : "",
          }
        })
      },
      baoming() {
        console.log("点击报名");
        this.xuanding = false;
      },
      gerenzhongxin() {
        console.log("点击个人中心");
        this.xuanding = true;
      },
      logout() {
        console.log("点击退出登录");
        Dialog.confirm({
          title: '确认退出登录?',
          //message: '确认退出登录?',
        })
            .then(() => {
              console.log("确认");
              //清楚token
              this.$router.push({
                path: "/", query: {
                  token: this.token ? this.token : "",
                }
              })
            })
            .catch(() => {
              console.log("取消");
            });
      },
    },
    mounted() {
    },
    created() {
      this.xuanding = true;
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped lang="scss">
  .personalcenter {
    width: 375px;
    height: 100vh;
    overflow: scroll;
    background-color: #f7f7f7;
  }

  .zitixd {
    color: #18A6F4;
    letter-spacing: 1px;
    font-size: 10px;
    white-space: nowrap;
    height: 12px;
    font-weight: 600;
    margin-top: 2px;
  }

  .tubiaoxd {
    color: #FFF;
    font-size: 21px;
    z-index: 0;
    height: 24px;
    width: 24px;
    background-color: #18A6F4;
    border-radius: 12px;
  }

  .upceng {
    position: sticky;
    left: 0px;
    top: 0px;
    width: 375px;
    height: 207px;
    background-color: rgba(1, 167, 251, 100);
    text-align: center;
    z-index: 99;
  }

  .touxiangc {
    height: 120px;
  }

  .hynamec {
    height: 27px;
  }

  .touxiangkaung {
    width: 60px;
    height: 60px;
    background: url('../../assets/images/md-account_circle Copy.svg') no-repeat center;
    border-radius: 30px;
    margin: 60px auto 0px auto;
  }

  .hyname {
    color: #fff;
    margin-top: 10px;
  }

  .content {
    width: 375px;
  }

  .butt {
    margin-top: 60px;
    width: 340px;
    margin-left: 17px;
  }

  .tubiao {
    color: #929292;
    font-size: 23px;
    z-index: 0;
    height: 24px;
  }

  .tubiao1 {
    color: #8A8A8A;
    font-size: 19px;
    z-index: 0;
  }

  .tubiao2 {
    color: #fff;
    font-size: 21px;
    z-index: 0;
    height: 24px;
    width: 24px;
    background-color: #8A8A8A;
    border-radius: 12px;
  }

  .ziti {
    letter-spacing: 1px;
    font-size: 15px;
    white-space: nowrap;
    height: 12px;
    color: #8A8A8A;
  }

  .ziti1 {
    letter-spacing: 1px;
    font-size: 10px;
    white-space: nowrap;
    height: 12px;
    color: #8A8A8A;
    font-weight: 600;
    margin-top: 2px;
  }

  .ziti2 {
    letter-spacing: 1px;
    font-size: 18px;
    white-space: nowrap;
    color: #fff;
  }

  .dibuneibu {
    margin-top: 5px;
    width: 100%;
    text-align: center;
    white-space: nowrap;
  }

  .grzxbottom {
    float: left;
    position: fixed;
    height: 50px;
    width: 375px;
    bottom: 0px;
    background-color: #fff;
  }

  .hycell {
    position: revert;
    left: 0px;
    width: 375px;
    height: 48px;
    text-align: left;
    border-top: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    background-color: #fff;
    display: flex;
    align-items: center;
  }

  .geceng {
    margin-top: 12px;
  }
</style>