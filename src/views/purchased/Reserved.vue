<template>
  <div class="purchased">
    <!--返回箭-->
    <van-row class="toubu">
      <van-col span="4" @click="goback" class="toubukuai">
        <van-icon name="arrow-left" class="tubiao"/>
      </van-col>
      <van-col span="16" class="toubukuai">
        <div class="ziti">已预约</div>
      </van-col>
      <van-col span="4" @click="gosearch" class="toubukuai">
        <van-icon name="search" class="tubiao"/>
      </van-col>
    </van-row>
    <div class="dibu">
      <van-pull-refresh style="overflow: scroll!important;height: 100%;width: 100%" v-model="refreshing"
                        @refresh="onRefresh">
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
          <div class="cell" @click="clickcell(item)" v-for="(item,index) in list" :key="index" :title="item">
            <van-row class="cellhead">
              <van-col span="3">
                <div class="tupianc">
                  {{item.kctype}}
                </div>
              </van-col>
              <van-col span="16">
                <div class="celltitle">
                  {{item.kcname}}
                </div>
              </van-col>
              <van-col span="2">
              </van-col>
              <van-col span="3">
                <div :class="[item.kcstatus=='已购买'?'cellpurchased':'cellnopayment']">
                  {{item.kcstatus}}
                </div>
              </van-col>
            </van-row>
            <van-row class="cellcontent">
              <van-col span="1">
              </van-col>
              <van-col span="23">
                <div class="cellkcdate">
                  {{item.kcdate}}
                </div>
                <div class="cellkcby">
                  {{kcby}}
                </div>
              </van-col>
            </van-row>
            <van-row class="cellbottom">
              <van-col span="3" class="cellheadimg">
              </van-col>
              <van-col span="5">
                <div class="celllsname">
                  {{item.kclsname}}
                </div>
              </van-col>
              <van-col span="8">
              </van-col>
              <van-col span="8">
                <div class="cellkcje">
                  <div class="kcyuanjia">
                    ￥1111
                  </div>
                  <div class="kczhehoujia">
                    ￥11
                  </div>
                </div>
                <div class="cellkcbmrs">
                  {{item.kcbmrs}}人报名
                </div>
              </van-col>
            </van-row>
          </div>
        </van-list>
      </van-pull-refresh>
      <!--弹出层-->
      <van-popup v-model="show" position="right" class="popupc">
        <van-form @submit="onSearch" style="width: 100%;height: 100%">
          <div class="popupsaixuan">筛选</div>
          <div class="popupname">课程名称</div>
          <div class="popupinput">
            <van-field
                    v-model="search.kcname"
                    type="text"
                    name="kcname"
                    placeholder="请输入课程名称"
            />
          </div>
          <div class="popupname">预约时间</div>
          <div class="popupinput1">
            <van-col span="10" class="popupinput2">
              <van-field placeholder="请选择" input-align="center" name="starttime" readonly @click="clickDate1" v-model="search.starttime"/>
            </van-col>
            <van-col span="3" class="popupname1">至</van-col>
            <van-col span="10" class="popupinput2">
              <van-field placeholder="请选择" input-align="center" name="endtime" readonly @click="clickDate2" v-model="search.endtime"/>
            </van-col>
            <van-col span="1"></van-col>
          </div>
          <div class="xztime">
            <van-datetime-picker v-if="datetimeShowOrHidden1"
                                 v-model="currentDate"
                                 type="date"
                                 :max-date="maxDate"
                                 :min-date="minDate"
                                 :title="dateTitle"
                                 @cancel="clickQx1"
                                 @confirm="clickQr1"
            />
            <van-datetime-picker v-if="datetimeShowOrHidden2"
                                 v-model="currentDate"
                                 type="date"
                                 :max-date="maxDate"
                                 :min-date="minDate"
                                 :title="dateTitle"
                                 @cancel="clickQx2"
                                 @confirm="clickQr2"
            />
          </div>
          <div class="buttonc">
            <van-button class="searchbutton" plain round type="info" size="small" @click="reset()">重置</van-button>
            <van-button class="searchbutton" round type="info" size="small" native-type="submit">确定</van-button>
          </div>
        </van-form>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {formatTimeToStr} from '../../assets/js/date';
  import {
    Button,
    Row,
    Col,
    Cell,
    CellGroup,
    Form,
    Popup,
    Notify,
    Field,
    Icon,
    List,
    PullRefresh,
    DatetimePicker
  } from 'vant';

  export default {
    name: "reserved",
    components: {
      [Cell.name]: Cell,
      [Row.name]: Row,
      [Col.name]: Col,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [Form.name]: Form,
      [Field.name]: Field,
      [Icon.name]: Icon,
      [Popup.name]: Popup,
      [Notify.name]: Notify,
      [List.name]: List,
      [PullRefresh.name]: PullRefresh,
      [DatetimePicker.name]: DatetimePicker,
    },
    data() {
      return {
        show: false,
        kcby: '名师直播 · 专项提分 · 领跑新学期',
        list: [
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '证书',
            'kcname': '中级会计师特训班',
            'kcstatus': '未支付',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '5123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },],
        page: 1,
        limit: 10,
        loading: false,
        finished: false,
        refreshing: false,
        datetimeShowOrHidden1: false,
        datetimeShowOrHidden2: false,
        minDate: new Date(2021, 0, 1), // 最小时间
        maxDate: new Date(2031, 0, 1),// 最大时间
        currentDate: new Date(), // 默认选择的时间
        dateTitle: '预约时间',  // 标题
        search: {
          kcname: '',
          starttime: '',
          endtime: '',
        },
      }
    },
    methods: {
      goback() {
        window.history.back()
      },
      gosearch() {
        this.show = true;
      },
      clickDate1() {
        this.datetimeShowOrHidden1 = true;
        this.datetimeShowOrHidden2 = false;
      },
      clickDate2() {
        this.datetimeShowOrHidden2 = true;
        this.datetimeShowOrHidden1 = false;
      },
      // 点击取消
      clickQx1() {
        this.datetimeShowOrHidden1 = false;
      },
      // 点击确认
      clickQr1(value) {
        this.datetimeShowOrHidden1 = false;
        this.search.starttime = formatTimeToStr(value, "yyyy-MM-dd");
      },
      // 点击取消
      clickQx2() {
        this.datetimeShowOrHidden2 = false;
      },
      // 点击确认
      clickQr2(value) {
        this.datetimeShowOrHidden2 = false;
        this.search.endtime = formatTimeToStr(value, "yyyy-MM-dd");
      },
      clickcell(value) {
        console.log("点击单元格");
        console.log(value);
      },
      onLoad() {
        console.log('触发刷新');
        setTimeout(() => {
          /*if (this.refreshing) {
            this.list = [];
            this.refreshing = false;
          }*/
          this.refreshing = false;
          /*for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }*/
          this.loading = false;
          this.finished = true;
          /*if (this.list.length >= 10) {
            this.finished = true;
          }*/
        }, 1000);
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false;
        this.list = [];
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        //模仿重新请求到数据
        this.list = [
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '证书',
            'kcname': '中级会计师特训班',
            'kcstatus': '未支付',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '5123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },
          {
            'kctype': '课程',
            'kcname': '【财务】寒假特训班',
            'kcstatus': '已购买',
            'kcdate': '2021年2月1日-2月23日  共10课时',
            'kclsname': '刘纯老师',
            'kcbmrs': '52123',
          },];
        this.onLoad();
      },
      onSearch(value) {
        console.log(value);
        console.log(this.search);
      },
      reset() {
        this.search = {
          kcname: '',
          starttime: '',
          endtime: '',
        }
      },
    },
    mounted() {
    },
    created() {
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped lang="scss">
  .purchased {
    width: 375px;
    height: 666px;
    overflow: scroll;
    background-color: #f7f7f7;
  }

  .toubu {
    background-color: #01A7FB;
    color: #FFFFFF;
    font-size: 21px;
    width: 375px;
    height: 52px;
    position: absolute;
    display: flex;
    z-index: 999999;
  }

  .dibu {
    height: 594px;
    width: 100%;
    padding-top: 52px;
    display: flex;
  }

  .toubukuai {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .tubiao {
    font-size: 22px;
    z-index: 0;
  }

  .ziti {
    letter-spacing: 1px;
    font-size: 16px;
    white-space: nowrap;
  }

  .cell {
    position: revert;
    margin-top: 12px;
    margin-left: 15px;
    border-radius: 6px;
    line-height: 20px;
    width: 343px;
    height: 134px;
    text-align: center;
    border: 1px solid #f7f7f7;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.12);
    background-color: #fff;
  }

  .cellhead {
    left: 0px;
    margin-top: 14px;
    width: 100%;
    height: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .cellcontent {
    width: 100%;
    height: 34px;
    margin-top: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .cellbottom {
    width: 100%;
    height: 32px;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .tupianc {
    background: url('../../assets/images/typebiaozhi.png') no-repeat center;
    color: #FFFFFF;
    font-size: 10px;
    text-align: center;
    white-space: nowrap;
  }

  .celltitle {
    color: rgba(0, 0, 0, 1);
    font-size: 15px;
    text-align: left;
    font-weight: 600;
    white-space: nowrap;
  }

  .cellpurchased {
    font-size: 10px;
    text-align: left;
    color: rgba(45, 43, 43, 100);
    white-space: nowrap;
    font-weight: 600;
  }

  .cellnopayment {
    font-size: 10px;
    text-align: left;
    color: rgba(24, 166, 244, 100);
    white-space: nowrap;
    font-weight: 600;
  }

  .cellkcdate {
    color: rgba(45, 43, 43, 100);
    font-size: 11px;
    text-align: left;
    height: 16px;
    white-space: nowrap;
  }

  .cellkcby {
    margin-top: 4px;
    height: 14px;
    color: rgba(123, 123, 123, 100);
    font-weight: 600;
    font-size: 10px;
    text-align: left;
    white-space: nowrap;
  }

  .cellheadimg {
    width: 21px;
    height: 21px;
    background: url('../../assets/images/teacher.svg') no-repeat center;
    background-size: cover;
  }

  .celllsname {
    padding-left: 9px;
    color: rgba(45, 43, 43, 100);
    font-size: 10px;
    text-align: left;
    white-space: nowrap;
  }

  .cellkcje {
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .kcyuanjia {
    height: 17px;
    color: rgba(164, 160, 160, 100);
    font-size: 12px;
    text-decoration: line-through;
    text-align: left;
    white-space: nowrap;
  }

  .kczhehoujia {
    margin-left: 4px;
    height: 18px;
    color: rgba(255, 88, 43, 100);
    font-size: 16px;
    text-align: left;
    white-space: nowrap;
  }

  .cellkcbmrs {
    margin-top: 3px;
    height: 14px;
    color: rgba(123, 123, 123, 100);
    font-size: 10px;
    text-align: right;
    white-space: nowrap;
  }

  .van-cell {
    background-color: transparent !important;
  }

  .popupc {
    right: 0px;
    height: 100%;
    width: 267px;
  }

  .popupsaixuan {
    height: 42px;
    width: 267px;
    line-height: 42px;
    background-color: rgba(246, 244, 245, 100);
    padding-top: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 14px;
    color: #959494;
    white-space: nowrap;
  }

  .popupname {
    margin-top: 12px;
    height: 20px;
    width: 100%;
    padding-left: 5px;
    color: rgba(149, 148, 148, 100);
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
  }

  .popupinput {
    margin-left: 5px;
    margin-top: 4px;
    margin-bottom: 3px;
    height: 42px;
    width: 257px;
    border-radius: 4px;
    background-color: rgba(245, 245, 245, 100);
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
  }

  .popupinput1 {
    margin-left: 5px;
    margin-top: 4px;
    margin-bottom: 3px;
    height: 42px;
    width: 100%;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .popupinput2 {
    border-radius: 4px;
    height: 100%;
    white-space: nowrap;
    background-color: rgba(245, 245, 245, 100);
    font-size: 14px;
  }

  .popupname1 {
    height: 100%;
    color: rgba(149, 148, 148, 100);
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
  }

  .xztime {
    margin-top: 5px;
    height: 315px;
    width: 100%;
  }

  .buttonc {
    margin-top: 27px;
    margin-left: 60px;
  }

  .searchbutton {
    margin-left: 7px;
    width: 94px;
    height: 45px;
    border-radius: 25px;
  }
</style>