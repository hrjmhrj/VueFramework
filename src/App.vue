<template>
  <div id="app">
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view />
  </div>
</template>

<style lang="scss">
  body {
    margin: 0 !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    min-height:100vh !important;
    width: 100vw !important;
    background: #fff !important;
    -webkit-text-size-adjust: 100% !important;
  }
  html{color:#000;background:#FFF;}
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,
  fieldset,input,textarea,p,blockquote,th,td {
    margin:0;
    padding:0;
  }
</style>
