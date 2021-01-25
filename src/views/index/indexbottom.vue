<template>
	<div class="index-bottom-page">
		<router-view/>
		<!--底部-->
		<van-tabbar v-model="active">
			<van-tabbar-item to="/index">
				<span>报名</span>
				<template #icon="props">
					<van-icon name="wap-home" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="/personalcenter">
				<span>个人中心</span>
				<template #icon="props">
					<van-icon name="friends" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import { Icon,Tabbar, TabbarItem } from 'vant';
	export default {
		name: "indexbottom",
		data(){
			return {
				active:0
			}
		},
		methods:{

		},
		components:{
			[Icon.name]:Icon,
			[Tabbar.name]:Tabbar,
			[TabbarItem.name]:TabbarItem
		},
		mounted(){
			const navBarActive = window.location.pathname;
			if (navBarActive.includes('/index')) {
				this.active = 0
			} else if (navBarActive.includes('/personalcenter')) {
				this.active = 1
			}
		}
	}
</script>

<style scoped lang="scss">

</style>