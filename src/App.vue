<template>
  <DbQuillVue></DbQuillVue>
</template>

<script>
  import DbQuillVue from "db-quill-vue";

  export default {
    name: "App",
    components: {
      DbQuillVue,
    },
    methods: {
      /**
       * 自定义文件是哪个
       * @params {Object} {flies: '上传返回的文件'}
       * @params {Function} 将图片插入文本框的方法
       */
      imgUploadCallBack(obj, insertImg) {
        console.log("callBack", obj, insertImg);
      },
    },
  };
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
