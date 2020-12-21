<template>
    <div>
        <el-popover
            v-model="visible"
            placement="bottom-start"
            :width="popoverWidth"
            trigger="focus"
            @show="showAction"
            @hide="hideAction">
            <el-table :data="gridData" :show-header="showHeader" @row-click="rowClick">
                <el-table-column v-for="(item, i) in titles" :key="i" :property="item.key" :label="item.label">
                    <template slot-scope="scope">
                        <span v-if="item.formatter">
                            {{ item.formatter(scope.row[item.key]) }}
                        </span>
                        <span v-else>{{ scope.row[item.key] }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                small
                :hide-on-single-page="true"
                :pager-count="7"
                layout="prev, pager, next"
                :current-page.sync="pageinfo.page"
                :page-size="pageinfo.size"
                :total="pageinfo.total"
                @current-change="handleCurrentChange"/>
            <!-- 当设置isNeedBlur的值位false时，input为只读状态 -->
            <el-input
                slot="reference"
                v-model.trim="value"
                :readonly="!isNeedBlur"
                :placeholder="isNeedBlur?'请输入内容':'请选择'"
                suffix-icon="el-icon-arrow-down"
                clearable
                @focus="focus"
                @input="input"
                @clear="clear"
            />
        </el-popover>
    </div>
</template>

<script>
export default {
    props: {
        searchkey: {
            type: String,
            default: ''
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
            default: () => {
                return [];
            }
        },
        // popover表格数据
        gridData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 是否需要模糊搜索
        isNeedBlur: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            visible: false,
            value: this.searchkey,
            timer: null
        };
    },
    computed: {
        titles() {
            return this.popoverTitles;
        }
    },
    watch: {
        searchkey(v) {
            this.value = v;
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    methods: {
        focus() {
            this.visible = true;
        },
        // 显示时触发
        showAction() {
            this.$emit('changePopoverPage', 1, this.value);
        },
        // 隐藏时出发
        hideAction() {},
        input(v) {
            // 只读状态禁止模糊查询, 反之；
            if (!this.isNeedBlur) { return; }
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.$emit('blurSearch', v);
            }, 300);
        },
        clear() {
            this.$emit('clear');
        },
        // 翻页
        handleCurrentChange(page) {
            this.$emit('changePopoverPage', page, this.value);
        },
        rowClick(row, column, event) {
            this.$emit('rowClick', row);
            this.visible = false;
        }
    }
};
</script>
