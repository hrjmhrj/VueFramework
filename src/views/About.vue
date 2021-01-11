<template>
  <div>
    <div class="about">
      <h1>This is an about page</h1>
      <van-cell-group>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
    </div>
    <vue-qr ref="Qrcode"
            :text="qrCodeConfig.text"
            :download="downloadFilename"
            :margin="10"
            :size="200"
            :dotScale="qrCodeConfig.dotScale"
    >
    </vue-qr>
    <div>
      <van-button type="info">信息按钮</van-button>
    </div>
  </div>
</template>
<script>
  import VueQr from "vue-qr";
  import {Button, Popup,Cell, CellGroup} from 'vant';

  export default {
    name: "About",
    components: {
      VueQr,
      "van-cell": Cell,
      "van-cell-group":CellGroup,
      "van-button": Button,//对应<van-button>标签
    },
    data() {
      return {
        qrCodeConfig: {
          text: "https://www.baidu.com",
          dotScale: 0.9
//colorDark: '#663300'
        },
        downloadFilename: ""
      }
    }
  }
</script>
