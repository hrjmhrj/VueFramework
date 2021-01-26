<template>
	<div class="index-page">
		<!--蓝条-->
		<div class="index-top-div">
			<van-search
							v-model="searchVal"
							shape="round"
							show-action
							background="#01A7FB"
							maxlength="20"
							placeholder="请输入搜索关键词"
							@search="onSearch"
			>
				<template #action>
					<div @click="onSearch" style="color: #fff;">搜索</div>
				</template>
			</van-search>
		</div>
		<!--滚动区域-->
		<div class="index-swipe-div">
			<van-swipe class="index-swipe-div--van" :show-indicators="false" :autoplay="2000" indicator-color="white">
				<van-swipe-item v-for="(image, index) in swipeList" :key="index">
					<img v-lazy="getImgUrl(image.IMAGEURL)" class="index-swipe-div--img" @click="clickRouter(image.CLICKURL)"/>
				</van-swipe-item>
			</van-swipe>
		</div>
		<!--分类区域-->
		<div class="index-coursetype-div" v-if="typeList.length > 0">
			<div class="index-coursetype--item" v-for="(item,index) in typeList" @click="clickItem(item.ID,item.NAME)">
				<div class="index-coursetype--icon" :style="{'background-color':iconColer[(index%iconColer.length)].BGCOLOR}">
					<van-icon class-prefix="iconfont" :class="iconColer[(index%iconColer.length)].ICON" class="icon-style"
							  :style="{'color':iconColer[(index%iconColer.length)].ICONCOLOR}"/>
				</div>
				<div class="index-coursetype--txt">{{item.NAME}}</div>
			</div>
		</div>
		<!--热门课程-->
		<div class="index-hotcourse-div" v-if="hotList != null && hotList.length > 0">
			<div class="index-hotcourse--title">【热门课程】</div>
			<div class="index-hotcourse--items">
				<div class="index-hotcourse--item" v-for="(item,index) in hotList" :key="index"
					 @click="clickHot(item.ID,item.PAY_TYPE,item.MEANS_TYPE)">
					<div class="index-hotcourse--name">
						<span class="index-hotcourse--name--icon">{{item.TYPENAME}}</span>
						<span class="index-hotcourse--name--txt">{{item.COURSENAME}}</span>
					</div>
					<div class="index-hotcourse--time">
						{{item.COURSE_START_TIME}}-{{item.COURSE_END_TIME}} {{item.PERIODS == '' || item.PERIODS == null ? "" :
						'共'+item.PERIODS+'课时'}}
					</div>
					<div class="index-hotcourse--bz">
						{{item.DETAILS}}
					</div>
					<div class="index-hotcourse-info">
						<span class="index-hotcourse-info--icon">
							<van-icon class-prefix="iconfont icon-touxiang" class="icon-style"/>
						</span>
						<span class="index-hotcourse-info--name">
							{{item.TEACHERNAME}}
						</span>
						<span class="index-hotcourse-info--pricenum">
							<div class="index-hotcourse-info--price">
								<span class="index-hotcourse-info--yjprice" v-if="item.PRICE > item.DISCOUNT_PRICE">￥{{item.PRICE}}</span>
								<span class="index-hotcourse-info--zkprice">￥{{item.DISCOUNT_PRICE}}</span>
							</div>
							<div class="index-hotcourse-info--num">
								{{item.DEDUCT_TYPE == 1 ? "高级课"+item.DEDUCT_NUM+"次" : "普通课"+item.DEDUCT_NUM+"次"}}
							</div>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import {Swipe, SwipeItem, Icon, Search, Notify} from 'vant';

  export default {
    name: "index",
    data() {
      return {
        skip: false,
        //分类颜色和图标
        iconColer: [
          {
            ICONCOLOR: "#ff8e8e",
            BGCOLOR: "#ffe0e0",
            ICON: "icon-peixunguanli1"
          },
          {
            ICONCOLOR: "#4d9fff",
            BGCOLOR: "#e8f5fc",
            ICON: "icon-lingdai"
          },
          {
            ICONCOLOR: "#febc30",
            BGCOLOR: "#fff3d9",
            ICON: "icon-peixunguanli"
          },
          {
            ICONCOLOR: "#99da71",
            BGCOLOR: "#e1f2d7",
            ICON: "icon-jiangbei"
          },
          {
            ICONCOLOR: "#BEA0FB",
            BGCOLOR: "#f5f0ff",
            ICON: "icon-peixunxuexi"
          },
          {
            ICONCOLOR: "#4d9fff",
            BGCOLOR: "#e8f5fc",
            ICON: "icon-minzhengtubiao1-04"
          },
          {
            ICONCOLOR: "#BEA0FB",
            BGCOLOR: "#f5f0ff",
            ICON: "icon-guanli"
          },
          {
            ICONCOLOR: "#ff8e8e",
            BGCOLOR: "#ffe0e0",
            ICON: "icon-shoucang"
          },
          {
            ICONCOLOR: "#febc30",
            BGCOLOR: "#fff3d9",
            ICON: "icon-xiangqing"
          }
        ],
        //滚动数据
        swipeList: [],
        //分类数据
        typeList: [],
        //热门课程
        hotList: [],
        //搜索输入的内容
        searchVal: "",
      }
    },
    methods: {
      getImgUrl(val){
        return process.env.VUE_APP_BASE_API + val;
      },
      //点击跳转路由
      clickRouter(val) {
        if (this.skip == false) {
          return
        }
        if(val != null && val != ""){
          this.$router.push({
            path: val
          })
        }
      },
      //初始加载数据
      onload() {
        this.$axios({
          url: '/iPhone/getsignuplist',
          method: 'post',
        }).then(res => {
          if (res.data.code == 200) {
            let map = res.data.data
            this.swipeList = map.swipeList
            this.typeList = map.typeList
            this.hotList = map.hotList
            if(map.swipeList.length == 0){
              this.skip = false
            }else {
              this.skip = true
            }
          } else {
            this.skip = false
            Notify({type: 'danger', message: '暂无数据，请稍后再试。'});
          }
        }).catch((error) => {
          this.skip = false
          Notify({type: 'danger', message: '网络错误，请稍后再试。'});
        });
      },
      //点击热门 1课程 2套餐PAY_TYPE: "2",0不交资料 1交资料MEANS_TYPE:"1",
      clickHot(ID, PAY_TYPE, MEANS_TYPE) {
        if (PAY_TYPE == '1') {
          if (MEANS_TYPE == '0') {
            this.$router.push("/courseinfo/" + ID);
          } else if (MEANS_TYPE == '1') {
            this.$router.push("/courseinfo/" + ID);
          }
        } else if (PAY_TYPE == '2') {
          this.$router.push("/tccourseinfo/" + ID);
        }
      },
      //点击搜索
      onSearch() {
        //跳转页面传递搜索的文字
        this.$router.push("/searchlist/000/课程列表/" + this.searchVal);
      },
      //点击分类
      clickItem(ID, NAME) {
        this.$router.push("/searchlist/" + ID + "/" + NAME);
      }
    },
    mounted() {
      this.onload();
    },
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Icon.name]: Icon,
      [Search.name]: Search,
      [Notify.name]: Notify,
    }
  }
</script>

<style scoped src="./index.css">
</style>
