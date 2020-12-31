## ym-dialog 为全局弹窗组件

### 支持动态定义标题，按钮，宽度，颜色自己拓展吧。。。


### 使用方式：
模板`<template></template>`中添加

说明：  

*  visible [Boolean] 为必要属性，其余均为非必要
*  done    [Function] submit确定时的回调函数


```html
<!-- 父组件 -->
<template>
	<ymDialog :dialog-visible="dialogVisible" :is-show-btns="false" center :width="'40%'" :done="test" @visible="visible" :is-body="false" />
</template>

<script>
// DialogMixin 弹窗混入，则不需要每个页面都写
import { DialogMixin } from '@/libs/dialogMixin';
export default {
    components: {},
    mixins: [DialogMixin],
    methods: {
        test() {
            setTimeout(() => {
                console.log('test');
            }, 200);
        }
    }
};
</script>
```

`dialog`prop解释：
```js
props: {
	center: { // 是否居中，默认布局中，否则右对齐
		type: Boolean,
		default: false
	},
	title: { // 自定义弹窗标题
		type: String,
		default: '提示'
	},
	dialogVisible: { // 弹窗是否显示属性
		type: Boolean,
		default: false
	},
	width: { // 自定义弹窗宽度
		type: String,
		default: '30%'
	},
	cancelText: { // 取消按钮，可自定义
		type: String,
		default: '取 消'
	},
	submitText: { // 确定按钮，可自定义
		type: String,
		default: '确 定'
	},
	isShowBtns: { // 是否显示底部按钮组，不显示则需要自定义按钮
		type: Boolean,
		default: true
	}
},
```
