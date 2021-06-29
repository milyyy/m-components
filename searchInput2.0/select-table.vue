<template>
    <el-table :data="gridData" :show-header="showHeader" class="popover-table" @row-click="rowClick">
        <el-table-column v-for="(item, i) in popoverTitles" :key="i" :property="item.key" :label="item.label">
            <template slot-scope="scope">
                <span v-if="item.formatter">
                    {{ item.formatter(scope.row[item.key]) }}
                </span>
                <span v-else>{{ scope.row[item.key] }}</span>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import emitter from './emitter';
export default {
    mixins: [emitter],
    inject: ['select'],
    props: {
        searchkey: {
            type: String,
            default: 'value'
        },
        // popover表格数据
        gridData: {
            type: Array,
            default: () => {
                return [];
            }
        },
        // 是否显示表头
        showHeader: {
            type: Boolean,
            default: true
        },
        // 悬浮窗的表格column标题
        popoverTitles: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            value: ''
        };
    },
    methods: {
        rowClick(row, column, event) {
            this.value = row[this.searchkey];
            this.$emit('rowClick', row);
            this.dispatch('ElSelect', 'handleOptionClick', [this, true]);
        }
    }
};
</script>
