<template>
  <div class="changepassword">
    <!--返回箭-->
    <van-row class="toubu">
      <van-col span="4" @click="goback" class="toubukuai">
        <van-icon name="arrow-left" class="tubiao"/>
      </van-col>
      <van-col span="16" class="toubukuai">
        <div class="ziti">修改密码</div>
      </van-col>
      <van-col span="4" class="toubukuai">
      </van-col>
    </van-row>
    <van-form @submit="onchangepwd">
      <div class="cell">
        <van-field
                v-model="uname"
                name="uname"
                type="tel"
                label="手机号"
                placeholder="请输入"
                :rules="[{ required: true}]"
        />
      </div>
      <div class="cell">
        <van-field
                v-model="code"
                type="tel"
                name="code"
                label="验证码"
                placeholder="请输入"
                :rules="[{ required: true}]"
        >
          <template #button>
            <div @click="getverifycode()">
              <van-button style="border-color: transparent;" plain round size="mini" type="info" v-if="getvc">获取验证码
              </van-button>
              <van-button style="border-color: transparent;" round plain type="info" size="mini" disabled v-if="!getvc">
                {{countdown}}秒
              </van-button>
            </div>
          </template>
        </van-field>
      </div>
      <div class="cell">
        <van-field
                v-model="zcmima"
                :type="type"
                name="zcmima"
                label="设置密码"
                placeholder="请输入"
                :rules="[{ required: true}]"
        >
          <template #button>
            <van-icon @click="showpasswd" name="eye-o" v-if="type == 'password'"/>
            <van-icon @click="showpasswd" name="closed-eye" v-if="type == 'text'"/>
          </template>
        </van-field>
      </div>
      <div class="cell">
        <van-field
                v-model="querenzcmm"
                :type="type"
                name="querenzcmm"
                label="确认密码"
                placeholder="请输入"
                :rules="[{ required: true}]"
        >
          <template #button>
            <van-icon @click="showpasswd" name="eye-o" v-if="type == 'password'"/>
            <van-icon @click="showpasswd" name="closed-eye" v-if="type == 'text'"/>
          </template>
        </van-field>
      </div>

      <div class="butt">
        <van-button color="#01A7FB" round block type="info" native-type="submit" v-if="updateing">
          确认
        </van-button>
        <van-button color="#01A7FB" round block type="info" disabled loading loading-text="修改密码中..." v-else/>
      </div>

    </van-form>
  </div>
</template>

<script>
  import {Button, Row, Col, Cell, CellGroup, Form, Notify, Field, Icon} from 'vant';

  export default {
    name: "changepassword",
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
      //修改密码
      onchangepwd(values) {
        console.log('onchangepwd', values);
        let reg = /^1[0-9]{10}$/;
        let pswd = /^[A-Za-z0-9]{6,20}$/;
        if (!reg.test(this.uname)) {
          Notify({type: 'danger', message: '请填写正确的手机号!'});
          return
        }
        if (!pswd.test(this.zcmima)) {
          Notify({
            type: 'danger',
            duration: 4000, message: '密码最少六位最多二十位，字母、数字组合，请区分大小写!'
          });
          return
        }
        ;
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
          } else {
            Notify({type: 'danger', message: res.data.msg});
          }
          this.updateing = true
        }).catch((error) => {
          Notify({type: 'danger', message: '修改失败'});
          this.updateing = true
        });
      },
    },
    mounted() {
      this.getvc = true
    },
    created() {
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped lang="scss">
  .changepassword {
    width: 375px;
    height: 100vh;
    overflow: scroll;
    background-color: #f7f7f7;
  }

  .toubu {
    background-color: #01A7FB;
    color: #FFFFFF;
    font-size: 18px;
    width: 375px;
    height: 52px;
  }

  .toubukuai {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .tubiao {
    font-size: 23px;
    z-index: 0;
  }

  .ziti {
    letter-spacing: 1px;
    font-size: 16px;
    white-space: nowrap;
  }

  .cell {
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

  .butt {
    margin-top: 33px;
    width: 340px;
    margin-left: 17px;
  }

</style>