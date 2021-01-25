import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/login.vue";
import qrcode from "../views/qrcodegenerated/QRCodeGenerated.vue";
import forgetpassword from "../views/system/ForgetPassword.vue";
import register from "../views/system/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    name: "login",
    meta: {
      title:"登录",
      requireAuth:false,
    },
    component: login
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title:"注册",
      requireAuth:false,
    },
    component: register
  },
  {
    path: "/forgetpassword",
    name: "forgetpassword",
    meta: {
      title:"密码",
      requireAuth:false,
    },
    component: forgetpassword
  },
  {
    path: "/qrcode",
    name: "qrcode",
    meta: {
      title:"二维码",
      requireAuth: false,
    },
    component: qrcode
  },
  /*{
    path: "/personalcenter",
    name: "personalcenter",
    meta: {
      title: "个人",
      requireAuth:true,
    },
    component: () => import("../views/personalcenter/PersonalCenter.vue")
  },
  {
    path: "/changepassword",
    name: "changepassword",
    meta: {
      title: "密码",
      requireAuth:true,
    },
    component: () => import("../views/personalcenter/subpage/ChangePassword.vue")
  },
  {
    path: "/purchased",
    name: "purchased",
    meta:{
      title:"购买",
      requireAuth:true,
    },
    component: () => import("../views/purchased/Purchased.vue")
  },
  {
    path: "/reserved",
    name: "reserved",
    meta: {
      title:"预约",
      requireAuth:true,
    },
    component: () => import("../views/purchased/Reserved.vue")
  },
  {
    path: "/vip",
    name: "vip",
    meta: {
      title:"会员",
      requireAuth:true,
    },
    component: () =>
        import("../views/vip/vip.vue")
  },
  {
    path: "/qy",
    name: "qy",
    meta: {
      title:"权益",
      requireAuth:true,
    },
    component: () =>
        import("../views/vip/qy.vue")
  },
  {
    path: "/index",
    name: "index",
    meta: {
      title:"首页",
      requireAuth:true,
    },
    component: () =>
        import("../views/index/index.vue")
  },
  {
    path: "/searchlist/:TYPEID/:TITLE/:SEARCHSTR?",
    name: "searchlist",
    meta: {
      title:"课程",
      requireAuth:true,
    },
    component: () =>
        import("../views/search/searchList.vue")
  },*/
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  //base: process.env.BASE_URL,
  base: '/test/',
  routes
});

export default router;
