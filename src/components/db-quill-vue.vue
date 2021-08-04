<template>
  <div class="quill-editor" ref="editor"></div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "./lineHeight.js";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import ImageResize from 'quill-image-resize-module'

const titleConfig = [
  { Choice: ".ql-bold", title: "加粗" },
  { Choice: ".ql-italic", title: "斜体" },
  { Choice: ".ql-underline", title: "下划线" },
  { Choice: ".ql-header", title: "段落格式" },
  { Choice: ".ql-strike", title: "删除线" },
  { Choice: ".ql-blockquote", title: "块引用" },
  { Choice: ".ql-code", title: "插入代码" },
  { Choice: ".ql-code-block", title: "插入代码段" },
  { Choice: ".ql-font", title: "字体" },
  { Choice: ".ql-size", title: "字体大小" },
  { Choice: '.ql-list[value="ordered"]', title: "编号列表" },
  { Choice: '.ql-list[value="bullet"]', title: "项目列表" },
  { Choice: ".ql-direction", title: "文本方向" },
  { Choice: '.ql-header[value="1"]', title: "h1" },
  { Choice: '.ql-header[value="2"]', title: "h2" },
  { Choice: ".ql-align", title: "对齐方式" },
  { Choice: ".ql-color", title: "字体颜色" },
  { Choice: ".ql-background", title: "背景颜色" },
  { Choice: ".ql-image", title: "图像" },
  { Choice: ".ql-video", title: "视频" },
  { Choice: ".ql-link", title: "添加链接" },
  { Choice: ".ql-formula", title: "插入公式" },
  { Choice: ".ql-clean", title: "清除字体格式" },
  { Choice: '.ql-script[value="sub"]', title: "下标" },
  { Choice: '.ql-script[value="super"]', title: "上标" },
  { Choice: '.ql-indent[value="-1"]', title: "向左缩进" },
  { Choice: '.ql-indent[value="+1"]', title: "向右缩进" },
  { Choice: ".ql-header .ql-picker-label", title: "标题大小" },
  { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: "标题一" },
  { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: "标题二" },
  { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: "标题三" },
  { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: "标题四" },
  { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: "标题五" },
  { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: "标题六" },
  { Choice: ".ql-header .ql-picker-item:last-child", title: "标准" },
  { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: "小号" },
  { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: "大号" },
  { Choice: '.ql-size .ql-picker-item[data-value="huge"]', title: "超大号" },
  { Choice: ".ql-size .ql-picker-item:nth-child(2)", title: "标准" },
  { Choice: ".ql-align .ql-picker-item:first-child", title: "居左对齐" },
  {
    Choice: '.ql-align .ql-picker-item[data-value="center"]',
    title: "居中对齐",
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="right"]',
    title: "居右对齐",
  },
  {
    Choice: '.ql-align .ql-picker-item[data-value="justify"]',
    title: "两端对齐",
  },
];

const lineHeight = [
  "1",
  "1.1",
  "1.2",
  "1.3",
  "1.4",
  "1.5",
  "1.6",
  "1.7",
  "1.8",
  "1.9",
  "2",
  "2.1",
  "2.2",
  "2.3",
  "2.4",
  "2.5",
  "2.6",
  "2.7",
  "2.8",
  "2.9",
  "3",
];
export default {
  name: "db-quill-vue",
  props: {
    value: {
      type: String,
      required: false,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请书写你的内容",
    },
    options: {
      type: Object,
    },
    imgUploadCallBack: {
      type: Function,
    },
  },
  data() {
    return {
      lineHeight: lineHeight,
      Quill: undefined,
      currentValue: "",
      quillOptions: {},
    };
  },
  watch: {
    value: {
      handler(val) {
        // 确认是新的值
        if (val !== this.currentValue) {
          this.currentValue = val;
          // 尝试更新
          if (this.Quill) {
            this.Quill.pasteHTML(this.value);
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    Quill.register("modules/imageResize", ImageResize);
    Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
    this.quillOptions = {
      theme: "snow",
      bounds: document.body,
      debug: "warn",
      modules: this.options
        ? {
            ...this.options,
            ...{
              imageDropAndPaste: {
                handler: this.imageHandler,
              },
              ImageResize: {},
            },
          }
        : {
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["clean"],
              ["link", "image"],
              [{ lineHeight: lineHeight }],
            ],
            imageDropAndPaste: {
              handler: this.imageHandler,
            },
            ImageResize: {
              displayStyles: {
                backgroundColor: "black",
                border: "none",
                color: "white",
              },
              modules: ["Resize", "DisplaySize", "Toolbar"],
            },
          },
      placeholder: this.placeholder,
      readOnly: false,
    };
    this.init();
  },
  methods: {
    addQuillTitle() {},
    init() {
      const editor = this.$refs.editor;
      // 初始化编辑器
      this.Quill = new Quill(editor, this.quillOptions);
      // 默认值
      this.Quill.pasteHTML(this.currentValue);
      // 绑定事件
      this.Quill.on("text-change", () => {
        const html = this.$refs.editor.children[0].innerHTML;
        const text = this.Quill.getText();
        const quill = this.Quill;
        // 更新内部的值
        this.currentValue = html;
        // 发出事件 v-model
        this.$emit("input", html);
        // 发出事件
        this.$emit("change", { html, text, quill });
      });
      // 将一些 quill 自带的事件传递出去
      this.Quill.on("text-change", (delta, oldDelta, source) => {
        this.$emit("text-change", delta, oldDelta, source);
      });
      this.Quill.on("selection-change", (range, oldRange, source) => {
        this.$emit("selection-change", range, oldRange, source);
      });
      this.Quill.on("editor-change", (eventName, ...args) => {
        this.$emit("editor-change", eventName, ...args);
      });
      // 修改样式
      var Align = Quill.import("attributors/style/align");
      Align.whitelist = ["right", "center", "justify"];
      Quill.register(Align, true);

      /* 传入布尔值，控制编辑器是否可用 */
      this.Quill.enable();

      let toolbar = this.Quill.getModule("toolbar");
      //  是否自定义上传图片
      if (this.imgUploadCallBack) {
        toolbar.addHandler("image", () => {
          var input = document.createElement("input");
          input.type = "file";
          input.name = this.fileName;
          input.accept = "image/jpeg,image/png,image/jpg,image/gif";
          input.onchange = this.onFileChange;
          input.click();
        });
      }

      autotip: {
        document.getElementsByClassName("ql-editor")[0].dataset.placeholder =
          "";
        for (let item of titleConfig) {
          let tip = document.querySelectorAll(item.Choice);
          // console.log('tip', tip)
          if (!tip) continue;
          // tip.setAttribute('title', item.title)
          for (let i = 0; i < tip.length; i++) {
            tip[i].setAttribute("title", item.title);
          }
        }
      }
    },
    insertImg(url) {
      const range = self.Quill.getSelection();
      self.Quill.insertEmbed(range.index, "image", url);
    },
    async onFileChange(e) {
      const self = this;
      const fileInput = e.target;
      if (fileInput.files.length == 0) {
        console.log("清先选择文件!");
        return;
      }
      const formData = new FormData();
      formData.append("file", fileInput.files[0], fileInput.files[0].name);
      if (this.imgUploadCallBack) {
        this.imgUploadCallBack(
          { files: fileInput.files, e: e },
          self.insertImg
        );
      }
    },
    imageHandler(dataUrl, type, imageData) {
      const self = this;
      imageData
        .minify({
          maxWidth: 320,
          maxHeight: 320,
          quality: 0.7,
        })
        .then((miniImageData) => {
          const blob = miniImageData.toBlob();
          const file = miniImageData.toFile("my_cool_image.png");
          console.log(`type: ${type}`);
          console.log(`dataUrl: ${dataUrl}`);
          console.log(`blob: ${blob}`);
          console.log(`file: ${file}`);
          this.image = { type, dataUrl, blob, file };
          this.blobUrl = URL.createObjectURL(blob);
          const range = self.Quill.getSelection();
          if (this.imgUploadCallBack) {
            self.imgUploadCallBack({ files: [file] }, self.insertImg);
          } else {
            this.insertImg(dataUrl);
          }
        });
    },
  },
};
</script>
<style >
/** 设置行高 */

.quill-editor .ql-size .ql-picker-options {
  height: 200px;
  overflow: auto;
}

.ql-container {
  min-height: 350px;
  font-size: 16px;
  line-height: 1.4;
}

.ql-toolbar {
  text-align: left;
}

.ql-lineHeight {
  margin: 6px 0 0 0;
}

.ql-picker-options {
  height: 200px;
  overflow: auto;
}

.ql-lineHeight::before {
  content: "行高：";
  position: relative;
  top: 0px;
  left: 8px;
}

.ql-lineHeight .ql-picker-label {
  left: 50px;
  top: -18px;
}

.ql-lineHeight .ql-picker-options {
  left: 50px;
}

.ql-picker.ql-lineHeight .ql-picker-label[data-value="1"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1"]::before {
  content: "1.0";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="1.1"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1.1"]::before {
  content: "1.1";
}

.ql-picker.ql-lineHeight .ql-picker-label[data-value="1.2"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1.2"]::before {
  content: "1.2";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="1.3"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1.3"]::before {
  content: "1.3";
}

.ql-picker.ql-lineHeight .ql-picker-label[data-value="1.4"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1.4"]::before {
  content: "1.4";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="1.5"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1.5"]::before {
  content: "1.5";
}

.ql-picker.ql-lineHeight .ql-picker-label[data-value="1.6"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1.6"]::before {
  content: "1.6";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="1.7"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1.7"]::before {
  content: "1.7";
}

.ql-picker.ql-lineHeight .ql-picker-label[data-value="1.8"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1.8"]::before {
  content: "1.8";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="1.9"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="1.9"]::before {
  content: "1.9";
}

.ql-picker.ql-lineHeight .ql-picker-label[data-value="2"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2"]::before {
  content: "2.0";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="2.1"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2.1"]::before {
  content: "2.1";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="2.2"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2.2"]::before {
  content: "2.2";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="2.3"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2.3"]::before {
  content: "2.3";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="2.4"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2.4"]::before {
  content: "2.4";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="2.5"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2.5"]::before {
  content: "2.5";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="2.6"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2.6"]::before {
  content: "2.6";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="2.7"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2.7"]::before {
  content: "2.7";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="2.8"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2.8"]::before {
  content: "2.8";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="2.9"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="2.9"]::before {
  content: "2.9";
}
.ql-picker.ql-lineHeight .ql-picker-label[data-value="3"]::before,
.ql-picker.ql-lineHeight .ql-picker-item[data-value="3"]::before {
  content: "3.0";
}
</style>