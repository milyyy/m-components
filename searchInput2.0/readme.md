## searchInput2.0 
变化：由单向`$emit`变为双向`v-model`  

### 使用方式
#### 1. 只查`v-model`绑定的值（单参数查询）
```html
<!-- index.vue -->
<el-form-item label="所属项目" prop="projectCode">
	<project-comp v-model="form.projectName" @onProject="onProject" />
</el-form-item>
```
```js
methods: {
	onProject(data) { // 获取danhang
		this.form.projectCode = data.projectCode;
	}
}
```
```html
<!-- project-comp -->
<template>
    <search-input
        v-model="query"
        :popover-width="210"
        searchkey="projectName"
        is-need-blur
        :show-header="false"
        :remote-method="getTableData"
        :popover-titles="tableHead"
        clearable
        @clear="resetCom"
        @rowClick="rowClick" />
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            query: '',
            tableHead: [{ label: '项目名称', key: 'projectName' }]
        };
    },
    watch: {
        query(val) {
            this.$emit('input', val);
        },
        value(val) {
            this.query = val;
        }
    },
    created() {
        this.query = this.value;
    },
    methods: {
        async getTableData(params, cb) {
            try {
                const res = await this.$api.queryPageProject({
                    data: {
                        projectName: params.query
                    },
                    pageIndex: params.page,
                    pageSize: params.size
                });
                cb(res);
            } catch (e) {
                console.log('error', e);
            }
        },
        /* 重置: 搜索栏以及关键字查询id需要置空；同时抛出修改后的id值 */
        resetCom() {
            this.$emit('onProject', {});
        },
        rowClick(row) {
            this.$emit('onProject', row);
        }
    }
};
</script>

```
#### 2.查`v-model`绑定的id或者其他key的值 （多参数查询）
```html
<!-- index.vue -->
<template slot-scope="scope">
	<!-- 重点只关注这部分即可 -->
 	<pageComp v-model="scope.row.page.pageName" :system-id="scope.row.systemId" @onPage="row => onPage(row, scope.$index)" />
</template>
```
```js
methods: {
	onPage(row, idx) {
	/**
	* @row: 当前组件接收的数据
	* @data: 组件表格的当前行的数据
	*/
	},
}
```
```html
<!-- pageComp -->
<template>
    <search-input
        ref="searchInput"
        v-model="query"
        lazy
        clearable
        is-need-blur
        :popover-width="210"
        searchkey="pageName"
        :show-header="false"
        :remote-method="getTableData"
        :popover-titles="tableHead"
        @clear="resetCom"
        @rowClick="rowClick" />
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        },
        // eslint-disable-next-line vue/require-default-prop
        systemId: {
            type: [String, Number]
        }
    },
    data() {
        return {
            query: '', // 点击后赋值
            tableHead: [{ label: '页面名称', key: 'pageName' }]
        };
    },
    watch: {
        query(val) {
            this.$emit('input', val);
        },
        value(val) {
            this.query = val;
        },
        systemId(val) {
            this.query = '';
            this.$refs.searchInput.refresh();
        }
    },
    created() {
        this.query = this.value;
    },
    methods: {
        async getTableData(params, cb) {
            console.log(this.systemId, 'systemId');
            try {
                const res = await this.$api.queryPage({
                    data: {
                        pageName: params.query,
                        systemId: this.systemId
                    },
                    pageIndex: params.page,
                    pageSize: params.size
                });
                cb(res);
            } catch (error) {
                // console.log('e', e);
            }
        },
        /* 重置: 搜索栏以及关键字查询id需要置空；同时抛出修改后的id值 */
        resetCom() {
            this.$emit('onPage', {});
        },
        rowClick(row) {
            // console.log('row', row);
            this.$emit('onPage', row);
        }
    }
};
</script>

```
