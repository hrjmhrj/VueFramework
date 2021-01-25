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
					<img v-lazy="image.IMAGEURL" class="index-swipe-div--img" @click="clickRouter(image.CLICKURL)"/>
				</van-swipe-item>
			</van-swipe>
		</div>
		<!--分类区域-->
		<div class="index-coursetype-div">
			<div class="index-coursetype--item" v-for="(item,index) in typeList" @click="clickItem(item.ID,item.NAME)">
				<div class="index-coursetype--icon" :style="{'background-color':iconColer[(index%iconColer.length)].BGCOLOR}">
					<van-icon class-prefix="iconfont" :class="iconColer[(index%iconColer.length)].ICON" class="icon-style" :style="{'color':iconColer[(index%iconColer.length)].ICONCOLOR}"/>
				</div>
				<div class="index-coursetype--txt">{{item.NAME}}</div>
			</div>
		</div>
		<!--热门课程-->
		<div class="index-hotcourse-div" v-if="hotList.length > 0">
			<div class="index-hotcourse--title">【热门课程】</div>
			<div class="index-hotcourse--items">
				<div class="index-hotcourse--item" v-for="(item,index) in hotList" :key="index" @click="clickHot(item.ID,item.PAY_TYPE,item.MEANS_TYPE)">
					<div class="index-hotcourse--name">
						<span class="index-hotcourse--name--icon">{{item.TYPENAME}}</span>
						<span class="index-hotcourse--name--txt">{{item.COURSENAME}}</span>
					</div>
					<div class="index-hotcourse--time">
						{{item.COURSE_START_TIME}}-{{item.COURSE_END_TIME}} {{item.PERIODS == '' || item.PERIODS == null ? "" : '共'+item.PERIODS+'课时'}}
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
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Swipe, SwipeItem ,Icon ,Search } from 'vant';
	export default {
		name: "index",
		data(){
			return{
				//分类颜色和图标
				iconColer:[
					{
						ICONCOLOR:"#ff8e8e",
						BGCOLOR:"#ffe0e0",
						ICON:"icon-peixunguanli1"
					},
					{
						ICONCOLOR:"#4d9fff",
						BGCOLOR:"#e8f5fc",
						ICON:"icon-lingdai"
					},
					{
						ICONCOLOR:"#febc30",
						BGCOLOR:"#fff3d9",
						ICON:"icon-peixunguanli"
					},
					{
						ICONCOLOR:"#99da71",
						BGCOLOR:"#e1f2d7",
						ICON:"icon-jiangbei"
					},
					{
						ICONCOLOR:"#BEA0FB",
						BGCOLOR:"#f5f0ff",
						ICON:"icon-peixunxuexi"
					},
					{
						ICONCOLOR:"#4d9fff",
						BGCOLOR:"#e8f5fc",
						ICON:"icon-minzhengtubiao1-04"
					},
					{
						ICONCOLOR:"#BEA0FB",
						BGCOLOR:"#f5f0ff",
						ICON:"icon-guanli"
					},
					{
						ICONCOLOR:"#ff8e8e",
						BGCOLOR:"#ffe0e0",
						ICON:"icon-shoucang"
					},
					{
						ICONCOLOR:"#febc30",
						BGCOLOR:"#fff3d9",
						ICON:"icon-xiangqing"
					}
				],
				//滚动数据
				swipeList:[
					{
						IMAGEURL:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg',
						CLICKURL:"/vip"
					},
					{
						IMAGEURL:'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2554473871,4215869341&fm=15&gp=0.jpg',
						CLICKURL:"/vip"
					},
					{
						IMAGEURL:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1337468057,2000893104&fm=15&gp=0.jpg',
						CLICKURL:"/vip"
					},
					{
						IMAGEURL:'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4012687869,2932786528&fm=15&gp=0.jpg',
						CLICKURL:"/vip"
					},
				],
				//分类数据
				typeList:[
					{
						ID:"1",
						NAME:"课程",
					},
					{
						ID:"2",
						NAME:"职称",
					},
					{
						ID:"3",
						NAME:"继续教育",
					},
					{
						ID:"4",
						NAME:"证书",
					},
					{
						ID:"5",
						NAME:"学历",
					},
				],
				//热门课程
				hotList:[
					{
						ID:1,
						TYPENAME:"套餐",
						COURSENAME:"【财务】寒假特训班",
						COURSE_START_TIME:"2021年12月29日",
						COURSE_END_TIME:"2021年12月21日",
						PERIODS:null,
						DETAILS:"名师直播.专享提分.领跑新年度",
						TEACHERNAME:"刘存老师",
						PRICE:1080.99,
						DISCOUNT_PRICE:999.99,
						//1课程 2套餐
						PAY_TYPE: "2",
						//0不交资料 1交资料
						MEANS_TYPE:"1",
					},
					{
						ID:33,
						TYPENAME:"课程",
						COURSENAME:"【成都】财务特训班",
						COURSE_START_TIME:"2021年12月29日",
						COURSE_END_TIME:"2021年12月21日",
						PERIODS:5,
						DETAILS:"名师直播.专享提分.领跑新年度",
						TEACHERNAME:"刘存老师",
						PRICE:1080.99,
						DISCOUNT_PRICE:999.99,
						//1课程 2套餐
						PAY_TYPE: "1",
						//0不交资料 1交资料
						MEANS_TYPE: "0"
					},
					{
						ID:2,
						TYPENAME:"继续教育",
						COURSENAME:"【财务】寒假特训班寒假特训班寒假特训班寒假特训班",
						COURSE_START_TIME:"2021年12月29日",
						COURSE_END_TIME:"2021年12月21日",
						PERIODS:null,
						DETAILS:"名师直播.专享提分.领跑新年度.名师直播.专享提分.领跑新年度",
						TEACHERNAME:"刘存老师",
						PRICE:1080.99,
						DISCOUNT_PRICE:999.99,
						PAY_TYPE: "1",
						MEANS_TYPE:"1",
					},
					{
						ID:3,
						TYPENAME:"学历",
						COURSENAME:"【财务】寒假特训班寒假特训班寒假特训班寒假特训班",
						COURSE_START_TIME:"2021年12月29日",
						COURSE_END_TIME:"2021年12月21日",
						PERIODS:5,
						DETAILS:"名师直播.专享提分",
						TEACHERNAME:"刘存老师",
						PRICE:1080.99,
						DISCOUNT_PRICE:1080.99,
						PAY_TYPE: "1",
						MEANS_TYPE:"1",
					}
				],
				//搜索输入的内容
				searchVal:"",
			}
		},
		methods:{
			//点击跳转路由
			clickRouter(val){
				this.$router.push({
					path: val
				})
			},
			//初始加载数据
			onload(){
			  //let data = {}
              this.$axios({
                url: '/iPhone/getsignuplist',
                method: 'post',
                //data: data
              }).then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  //this.swipeList = res.data
                  /*this.$router.push({
                    path: "/", query: {
                    }
                  })*/
                } else {
                }
              }).catch((error) => {
              });
				//swipeList
				//typeList
				//hotList
			},
			//点击热门
			/*
			//1课程 2套餐
			PAY_TYPE: "2",
			//0不交资料 1交资料
			MEANS_TYPE:"1",
			*/
			clickHot(ID,PAY_TYPE,MEANS_TYPE){
				if(PAY_TYPE == '1'){
					if(MEANS_TYPE == '0'){
						this.$router.push("/courseinfo/"+ID);
					}else if(MEANS_TYPE == '1'){
						this.$router.push("/courseinfo/"+ID);
					}
				}else if(PAY_TYPE == '2'){
					this.$router.push("/tccourseinfo/"+ID);
				}
			},
			//点击搜索
			onSearch(){
				//跳转页面传递搜索的文字
				this.$router.push("/searchlist/000/课程列表/"+this.searchVal);
			},
			//点击分类
			clickItem(ID,NAME){
				this.$router.push("/searchlist/"+ID+"/"+NAME);
			}
		},
		mounted(){
			this.onload();
		},
		components:{
			[Swipe.name]:Swipe,
			[SwipeItem.name]:SwipeItem,
			[Icon.name]:Icon,
			[Search.name]:Search
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.css";
</style>