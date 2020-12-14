<!--
 * @Date: 2020-03-20 09:42:43
 * @Description: 子组件
 * @LastEditTime: 2020-12-9 14:25:04
 -->

<template>
    <div class="table">
        <el-table
            :data="values"
            border
            fit
            stripe
            :row-style="tableRowClassName"
            style="width: 100%">
            
            <el-table-column
                v-for="item in formThead"
                :key="item.key"
                :label="item.title"
                :width="item.width"
                :fixed="item.fixed"
                :show-overflow-tooltip="item.isShowTooltip"
                :align="isAlign">
                <template slot-scope="scope">
                    <span v-if="item.formatter">
                        {{ item.formatter(scope.row[item.key]) }}
                    </span>
                    <span v-else>{{ scope.row[item.key] }}</span>
                </template>
            </el-table-column>
            
            <el-table-column
                v-if="isDisplayAction"
                :align="isAlign"
                :width="actionWidth"
                label="操作">
                <template slot-scope="{ row, $index }">
                    <slot :rowInfo="{ row, $index }" />
                </template>
            </el-table-column>
        </el-table>
        <div v-if="hasPage" class="block">
            <el-pagination
                :current-page.sync="pageNation.page"
                :page-size="pageNation.size"
                layout="total, prev, pager, next, jumper"
                :total="pageNation.total"
                @current-change="handleCurrentChange"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        heads: {
            type: Array,
            required: true
        },
        tableData: {
            type: Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: []
        },
        pageNation: {
            type: Object,
            default: () => {}
        },
        isDisplayAction: {
            type: Boolean,
            default: false
        },
        height: {
            // 是否设置滚动
            type: Number,
            default: 400
        },
        isAlign: {
            type: String,
            default: 'center'
        },
        actionWidth: {
            type: Number,
            default: 140
        },
        // 是否需要分页
        hasPage: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        formThead() {
            return this.heads;
        },
        values() {
            return this.tableData;
        }
    },
    methods: {
        tableRowClassName(obj) {
            // console.log(0, obj);
        },
        // 翻页
        handleCurrentChange(val) {
            this.$emit('changePage', val);
        }
    }
};
</script>
