# db-quill-vue 支持修改字体行号、拖拽/粘贴图片、修改图片大小功能的quill富文本编辑器

> 【db-quill-vue富文本编辑器】日常开发工作中经常会用到富文本编辑器,但是ueditor、ckeditor等编辑器虽然功能强大,但是太过于臃肿并且不好集成,所以这里将quill编辑器进行封装,在满足日常功能的前提下能够快速开发。

1. 在github中访问：[https://github.com/cgd199158/db-quill-vue](https://github.com/cgd199158/db-quill-vue)


2. 在线demo体验地址： [db-quill-vue demo](https://codepen.io/cgd199158/pen/NWjLBKx)

3. 基本使用
```
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
       * @params {Object} {files: '上传返回的文件'}
       * @params {Function} 将图片插入文本框的方法
       */
      imgUploadCallBack(obj, insertImg) {
        // upload obj.files
        // insertImg(url)
      },
    },
  };
</script>
```
4. 属性

### <p style="color:#007AFF;font-weight:bold">【常规】配置</p>

|          参数          |                             说明                             |      类型      | 默认值 |                            可选值                            |
| :--------------------: | :----------------------------------------------------------: | :------------: | :----: | :----------------------------------------------------------: |
|    options    |                     同quill的配置文件                     | Object |       |
|    imgUploadCallBack    |                     自定义图片上传的回调                     | Function |  imgUploadCallBack(obj, insertImg)     |              obj为返回的图片文件,insertImg(url)便于返回图片后将图片插入富文本                             |
