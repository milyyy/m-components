## imgUpload 文件上传组件

### params

```js
// 必要参数
maxM: 文件最大体积
limit: 文件最大个数
files: 父组件有文件传过来是则可以预览,没有就是空

// 非必要 视情况而定
imgURL: '', // 预览的图片地址
uploadVisible: false, // 弹窗显示
fileList: this.files, // 初始赋值
lastOssFileName: '' // 保存上次的oss文件名
```

### event

具体可以查阅 [element upload](https://element.eleme.cn/#/zh-CN/component/upload)

### 使用方式

具体参考 `./example.vue`