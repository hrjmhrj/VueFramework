<template>
    <div>
        <div class="about">
            <h1>This is an about page</h1>
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
    import { Button } from 'vant';

    export default {
        name: "About",
        components: {
            VueQr,
            "van-button":Button,//对应<van-button>标签
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
