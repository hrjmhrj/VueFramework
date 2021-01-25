<template>
  <div style="width: 100%;height: 100%;overflow: hidden;">
    <!--返回箭-->
    <div @click="goback" style="font-size: 3vw;text-align: left;margin-left: 3%;margin-top: 8%;width: 30%;height: 5%">
      取消
    </div>
    <div style="margin-top: 18%;text-align: left;margin-left: 5%;margin-bottom: 8%;font-size: 6vw;font-weight: 600;">
      忘记密码
    </div>
    <!--表单-->
    <van-form @submit="onForgetPassword">
      <div class="inputstyle">
        <van-field
                v-model="uname"
                name="uname"
                type="tel"
                placeholder="请输入手机号码"
                :rules="[{ required: true}]"
        />
      </div>
      <div class="inputstyle">
        <van-field
                v-model="code"
                type="tel"
                name="code"
                placeholder="请输入验证码"
                :rules="[{ required: true}]"
        >
          <template #button>
            <div style="border-left: 3px solid #F5F5F5" @click="getverifycode()">
              <van-button style="border-color: transparent;" plain round size="mini" type="info" v-if="getvc">获取验证码
              </van-button>
              <van-button style="border-color: transparent;" round plain type="info" size="mini" disabled v-if="!getvc">
                {{countdown}}秒
              </van-button>
            </div>
          </template>
        </van-field>
      </div>
      <div class="inputstyle">
        <van-field
                v-model="zcmima"
                :type="type"
                name="zcmima"
                placeholder="设置密码"
                :rules="[{ required: true}]"
        >
          <template #button>
            <van-icon @click="showpasswd" name="eye-o" v-if="type == 'password'"/>
            <van-icon @click="showpasswd" name="closed-eye" v-if="type == 'text'"/>
          </template>
        </van-field>
      </div>
      <div class="inputstyle">
        <van-field
                v-model="querenzcmm"
                :type="type"
                name="querenzcmm"
                placeholder="确认密码"
                :rules="[{ required: true}]"
        >
          <template #button>
            <van-icon @click="showpasswd" name="eye-o" v-if="type == 'password'"/>
            <van-icon @click="showpasswd" name="closed-eye" v-if="type == 'text'"/>
          </template>
        </van-field>
      </div>
      <div style="margin-left:5%;margin-top:5%;width: 91%">
        <van-button round block type="info" native-type="submit" v-if="updateing">
          确认
        </van-button>
        <van-button round block type="info" disabled loading loading-text="修改密码中..." v-else/>
      </div>
    </van-form>
  </div>
</template>

<script>
  import {Button, Row, Col, Cell, CellGroup, Form, Notify, Field, Icon} from 'vant';

  export default {
    name: "ForgetPassword",
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
    },
    data() {
      return {
        updateing: true,
        getvc: true,
        uname: '',
        zcmima: '',
        querenzcmm: '',
        code: '',
        countdown: 60,
        inter: '',
        type: 'password',
      }
    },
    methods: {
      goback() {
        window.history.back()
      },
      //显示密码
      showpasswd() {
        this.type === 'password' ? this.type = 'text' : this.type = 'password'
      },
      //修改密码
      onForgetPassword(values) {
        //console.log('onForgetPassword', values);
        let reg = /^1[0-9]{10}$/;
        let pswd = /^[A-Za-z0-9]{6,20}$/;
        if (!reg.test(this.uname)) {
          Notify({type: 'danger', message: '请填写正确的手机号!'});
          return
        }
        if (!pswd.test(this.zcmima)) {
          Notify({type: 'danger',
            duration: 4000,message: '密码最少六位最多二十位，字母、数字组合，请区分大小写!'});
          return
        };
        if (values["zcmima"] != values["querenzcmm"]) {
          Notify({type: 'danger', message: '两次输入的密码不一致，请重试。'});
          return
        }
        this.updateing = false
        let data = {
          "code": values.code,
          "password": values.zcmima,
          "tel": values.uname,
        }
        this.$axios({
          url: '/iPhone/updatepwd',
          method: 'post',
          data: data
        }).then(res => {
          if (res.data.code == 200) {
            Notify({type: 'success', message: res.data.msg});
            this.$router.push({
              path: "/", query: {
              }
            })
          } else {
            Notify({type: 'danger', message: res.data.msg});
          }
          this.updateing = true
        }).catch((error) => {
          Notify({type: 'danger', message: '修改失败'});
          this.updateing = true
        });
      },
      //获取验证码
      getverifycode() {
        let data = {}
        let reg = /^1[0-9]{10}$/;
        if (this.getvc == false) {
          return
        }
        if (this.uname == '' || this.uname == undefined) {
          Notify({type: 'danger', message: '请填写手机号!'});
          return
        }
        if (!reg.test(this.uname)) {
          Notify({type: 'danger', message: '请填写正确的手机号!'});
          return
        }
        data = {
          "tel": this.uname
        }
        this.getvc = false;
        this.inter = setInterval(this.getcountdown, 1000);
        this.$axios({
          url: '/iPhone/sendVerifyCode',
          method: 'post',
          data: data
        }).then(res => {
          if (res.data.code == 200) {
            Notify({type: 'success', message: res.data.msg});
          } else {
            Notify({type: 'danger', message: res.data.msg});
          }
        }).catch((error) => {
          Notify({type: 'danger', message: '获取验证码失败'});
        });
      },
      //倒计时
      getcountdown() {
        (this.countdown == '' || this.countdown == undefined) ? this.countdown = 60 : this.countdown
        this.countdown--;
        //console.log(this.countdown);
        if (this.countdown <= 0) {
          clearInterval(this.inter);
          this.countdown = 60
          this.getvc = true;
        }
      },
    },
    mounted() {
    },
    created() {
      this.uname = this.$route.query.tel;
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped>
  .inputstyle {
    margin-left: 5%;
    margin-top: 3%;
    width: 90%;
    border: 2px solid #F5F5F5;
    border-radius: 30px;
  }

  .van-button__text {
    width: 100%;
  }

  .van-cell {
    background-color: transparent !important;
  }
</style>