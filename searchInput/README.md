## searchInput 
说明： 此组件为支持模糊搜索，动态分页功能；

#### Params
```js
searchkey: 搜索关键词 （这里与最好rowclick互相配合）
// popover弹窗宽度
popoverWidth: Number类型, 默认280
// 是否显示表头
showHeader: 布尔类型,是否显示表头
// popover分页
pageinfo: 对象类型，有默认值
popoverTitles: Array类型，配置弹窗显示的表头，支持格式化
// popover表格数据
gridData: 列表数据
// 是否需要模糊搜索
isNeedBlur: 是否需要模糊搜索
```

#### 使用方式：
可以参考`example.vue`, 提示： 很多data属性和方法都写在`searchInput.js`里，方便管理和使用。
有啥问题可以提issue留言噢~ 谢谢😀