<template>
    <el-select
        ref="select"
        v-model="query"
        v-bind="$attrs"
        :filterable="isNeedBlur"
        :remote="isNeedBlur"
        :remote-method="selectRemoteMethod"
        v-on="$listeners"
        @visible-change="visibleChange">
        <selectTable
            v-loading="loading"
            :grid-data="gridData"
            :searchkey="searchkey"
            :popover-titles="popoverTitles"
            :show-header="showHeader"
            class="popover-table"
            :style="{width: popoverWidth + 'px' }"
            @rowClick="rowClick" />
        <el-pagination
            small
            :pager-count="page.size"
            layout="prev, pager, next"
            :current-page.sync="page.page"
            :page-size="page.size"
            :total="page.total"
            @current-change="refresh" />
    </el-select>
</template>

<script>
import selectTable from './select-table.vue';
export default {
    components: {
        selectTable
    },
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        searchkey: {
            type: String,
            default: 'value'
        },
        // popover弹窗宽度
        popoverWidth: {
            type: Number,
            default: 280
        },
        // 是否显示表头
        showHeader: {
            type: Boolean,
            default: true
        },
        // popover分页
        pageinfo: {
            type: Object,
            default: () => {
                return {
                    page: 1,
                    size: 5,
                    total: 0
                };
            }
        },
        // 悬浮窗的表格column标题
        popoverTitles: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: () => {
                return [];
            }
        },
        // 是否需要模糊搜索
        isNeedBlur: {
            type: Boolean,
            default: false
        },
        remoteMethod: {
            type: Function,
            default: () => {
                return function () {
                };
            }
        },
        lazy: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            query: '',
            searchQuery: '',
            gridData: [],
            loading: false,
            page: {
                page: 1,
                size: 5,
                total: 0
            },
            isFirst: true
        };
    },
    computed: {
        titles() {
            return this.popoverTitles;
        }
    },
    watch: {
        value(val) {
            this.query = val;
            console.log(val);
        },
        query(val) {
            this.$emit('input', val);
        },
        searchkey(v) {
            this.value = v;
        },
        pageinfo(val) {
            this.page = val;
        }
    },
    created() {
        this.query = this.value;
        this.page = this.pageinfo;
        if (!this.lazy) {
            this.refresh();
        }
    },
    methods: {
        // 翻页或刷新
        refresh() {
            this.selectRemoteMethod(this.searchQuery);
        },
        rowClick(row, column, event) {
            this.$emit('rowClick', row);
        },
        selectRemoteMethod(query) {
            this.searchQuery = query;
            const params = {
                query,
                page: this.page.page,
                size: this.page.size
            };
            this.loading = true;
            this.remoteMethod(params, this.setTableData);
        },
        setTableData(res) {
            this.gridData = res.data;
            this.page.total = res.total;
            this.loading = false;
        },
        visibleChange(show) {
            if (show && this.lazy && this.isFirst) {
                this.refresh();
                this.isFirst = false;
            }
        }
    }
};
</script>
