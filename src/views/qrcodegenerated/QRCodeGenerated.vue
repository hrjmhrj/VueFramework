<template>
    <div style="height: 100%;width: 100%">
        <van-row class="about" type="flex" justify="center">
            二维码生成
        </van-row>
        <div class="qrcode">
            <div class="qrbeijing"><img class="qrbjt"  :src="require('../../assets/images/qrbjall.png')" /></div>
                <vue-qr ref="Qrcode" class="qrcodetp" v-if="showqrcode"
                        :text="qrCodeConfig.text"
                        :download="downloadFilename"
                        :margin="10"
                        :size="200"
                        :dotScale="qrCodeConfig.dotScale"
                >
                </vue-qr>
        </div>
        <van-row class="bdform">
            <van-form validate-first @failed="onFailed">
                <!-- 通过 validator 进行函数校验 -->
                <van-field
                        v-model="ygname"
                        name="姓名"
                        label="姓名"
                        placeholder="请输入姓名"
                />
                <!-- 通过 validator 进行异步函数校验 -->
                <van-field
                        v-model="yggh"
                        name="工号"
                        label="工号"
                        placeholder="请输入工号"
                />
                <van-field
                        v-model="password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="请输入密码"
                />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" @click="tosubmit()">
                        生成二维码
                    </van-button>
                </div>
            </van-form>
        </van-row>
    </div>
</template>

<script>
    import VueQr from "vue-qr";
    import axios from 'axios';
    import {Button, Form, Toast, Field, Col, Row, Popup,Picker,Notify  } from 'vant';

    export default {
        name: "QRCodeGenerated",
        components: {
            VueQr,
            [Button.name]: Button,
            [Form.name]: Form,
            [Toast.name]: Toast,
            [Field.name]: Field,
            [Col.name]: Col,
            [Row.name]: Row,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [Notify.name]: Notify,
        },
        data() {
            return {
                showqrcode:false,
                qrCodeConfig: {
                    text: "",
                    dotScale: 0.9,
                },
                downloadFilename: "",
                yewu: '',
                ygname: '',
                yggh: '',
                password: '',
                QYID: '',
                openid: '',
                pattern: /\S{1}/,
            }
        },
        methods: {
            //校验QYID 区域ID是否存在
            xiaoyanqyid(){
                let _this = this;
                if(_this.QYID == ''){
                    _this.$router.push("/405")
                } else {
                axios.post('/qrcode/xiaoyanqyid', {qyid:_this.QYID}).then(response => {
                    if(response.data.success){
                    }else{
                        //提示查询失败
                        _this.$router.push("/405")
                    }
                }).catch((error)=> {
                    _this.$router.push("/500")
                });
                }
            },
            //保存二维码
            saveqrcode(){
              this.ygname = this.ygname.replace(new RegExp(/( )/g),"");
              this.yggh = this.yggh.replace(new RegExp(/( )/g),"");
                let data = {
                    ygname:this.ygname,
                    yggh:this.yggh,
                    password:this.password,
                    qyid:this.QYID,
                    openid:this.openid
                }
                if(this.ygname == ""){
                  Notify({ type: 'danger', message: '姓名不能为空' });
                  return;
                }else if(this.yggh == ""){
                  Notify({ type: 'danger', message: '工号不能为空' });
                  return;
                }else if(!this.validator()){
                  Notify({ type: 'danger', message: '动态密码错误' });
                  return;
                }else{
                  this.createqrcode(7758258);
                  axios.post('/qrcode/qrcodeSave', data).then(response => {
                    if(response.data.success){
                      this.createqrcode(response.data.obj);
                    }else{
                      //提示查询失败
                      Notify({ type: 'danger', message: '生成二维码失败' });
                    }
                  }).catch((error)=> {
                    Notify({ type: 'danger', message: '生成二维码失败' });
                  });
                }
            },
            //生成二维码
            createqrcode(qrcodeid){
                this.showqrcode = true;
                this.qrCodeConfig.text = process.env.QRCode_URL+"BeforeIndex"+"/"+this.QYID+"/"+qrcodeid;
            },
            //提交数据
            tosubmit(){
                //this.xiaoyanqyid();
                this.saveqrcode();
            },
            // 校验函数返回 true 表示校验通过，false 表示不通过
            validator() {
                let now = new Date();
                let year = now.getFullYear();       //年
                let month = (now.getMonth() + 1)*2;     //月
                let day = now.getDate()*2;            //日
                if(month < 10){
                  month = "0"+month;
                }
                if(day < 10){
                  day = "0"+day;
                }
                let dtmm = year+""+month+""+day+""
                if (this.password.length > 8 || this.password.length < 7) {
                    return false
                }
                if (this.password == dtmm) {
                    return true
                }else {
                    return false
                }
            },
            onFailed(errorInfo) {
            },
        },
        created(){
            /*this.QYID = this.$route.params.QYID;
            this.openid = sessionStorage.getItem("openid")
            this.xiaoyanqyid();*/
        }
    };
</script>

<style scoped>
    .about {
        background: #0057c8;
        color: #fff;
        font-size: 3vh;
        padding: 10% 0% 30% 0%;
    }
    .qrcode {
        width: 100%;
        height: 44%;
        z-index: 9;
        position: relative;
        margin-top: -10%;
    }
    .qrcodetp {
        position: absolute;
        width: 54%;
        margin-left: -26%;
        margin-top: -66%;
        z-index: 10;
    }
    .bdform {
        width: 100%;
        height: 100%;
    }
    .qrbeijing {
        width: 100%;
        height: 100%;
    }
    .qrbjt {
        height: 100%;
        width: 78%;
        margin-left: 11%;
        z-index: 10;
        margin-top: -17%;
        position: relative;
    }
    .van-button--round {
        border-radius: 5px!important;
        background-color: #4a9df9!important;
    }
</style>
