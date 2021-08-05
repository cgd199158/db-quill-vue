<template>
  <div id="app">
    <DbQuillVue  ></DbQuillVue>
  </div>
</template>

<script>
import DbQuillVue from 'db-quill-vue'
// import DbQuillVue from '@/components/db-quill-vue.vue'

export default {
  name: 'App',
  components: {
    DbQuillVue
  },
  methods:{
    // 自定义图片上传得回调
    imgUploadCallBack(obj, insertImg){
      console.log('callBack', obj, insertImg)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
