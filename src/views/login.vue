<template>
  <div style="width: 100%;height: 100%;overflow: hidden;">
    <div style="margin-top: 30%;text-align: left;margin-left: 5%;margin-bottom: 8%;font-size: 8vw;font-weight: 600;">
      培训报名系统
    </div>
    <!--表单-->
    <van-form @submit="onSubmit">
      <div class="inputstyle">
        <van-field
                v-model="username"
                name="username"
                type="tel"
                placeholder="请输入手机号码"
                :rules="[{ required: true}]"
        />
      </div>
      <div class="inputstyle">
        <van-field
                v-model="password"
                :type="type"
                name="password"
                placeholder="请输入密码"
                :rules="[{ required: true}]"
        >
          <template #button>
            <van-icon @click="showpasswd" name="eye-o" v-if="type == 'password'"/>
            <van-icon @click="showpasswd" name="closed-eye" v-if="type == 'text'"/>
          </template>
        </van-field>
      </div>
      <div style="margin-left:5%;margin-top:5%;width:91%;">
        <van-button color="#01A7FB" round block type="info" native-type="submit" v-if="logining">
          登录
        </van-button>
        <van-button color="#01A7FB" round block type="info" disabled loading loading-text="登录中..." v-else/>
      </div>
    </van-form>
    <div style="width: 100%;margin-top: 5%;">
      <van-row>
        <van-col span="1">
        </van-col>
        <van-col span="4">
          <div class="ziti" @click="forgetpassword">
            忘记密码?
          </div>
        </van-col>
        <van-col span="14">
        </van-col>
        <van-col span="4">
          <div class="ziti" @click="register">
            立即注册
          </div>
        </van-col>
        <van-col span="1">
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import {Button, Row, Col, Cell, CellGroup, Form, Notify, Field, Icon} from 'vant';

  export default {
    name: "login",
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
        logining: true,
        username: '',
        password: '',
        type: 'password',
      }
    },
    methods: {
      //显示密码
      showpasswd() {
        this.type === 'password' ? this.type = 'text' : this.type = 'password'
      },
      //忘记密码
      forgetpassword() {
        this.$router.push({
          path: "/forgetpassword", query: {
            tel: this.username ? this.username : "",
          }
        })
      },
      //点击注册
      register() {
        this.$router.push({
          path: "/register", query: {
            tel: this.username ? this.username : "",
          }
        })
      },
      //登录
      onSubmit(values) {
        //console.log('submit', values);
        let reg = /^1[0-9]{10}$/;
        if (!reg.test(this.username)) {
          Notify({type: 'danger', message: '请填写正确的手机号!'});
          return
        }
        this.logining = false;
        let data = {
          "password": values.password,
          "tel": values.username,
        }
        this.$axios({
          url: '/iPhone/iphonelogin',
          method: 'post',
          data: data
        }).then(res => {
          if (res.data.code == 200) {
            console.log(res);
            Notify({type: 'success', message: res.data.msg});
          } else {
            Notify({type: 'danger', message: res.data.msg});
          }
          this.logining = true;
        }).catch((error) => {
          Notify({type: 'danger', message: '登录失败'});
          this.logining = true;
        });
      },
    },
    mounted() {
      this.logining = true;
    },
    created() {
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped>
  .inputstyle {
    margin-left: 5%;
    margin-top: 5%;
    width: 90%;
    border: 2px solid #F5F5F5;
    border-radius: 30px;
  }

  .ziti {
    font-size: 12px;
    white-space: nowrap;
  }

  .van-button__text {
    width: 100%;
  }

  .van-cell {
    background-color: transparent !important;
  }
</style>