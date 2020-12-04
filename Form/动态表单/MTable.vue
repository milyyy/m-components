<!--
 * @Date: 2020-03-20 09:42:43
 * @Description: 子组件
 * @LastEditTime: 2020-03-20 17:58:04
 * @FilePath: \_vue\src\views\Table\MTable.vue
 -->

<template>
    <div class="table">
        <el-table :data="values"
                  :height="height"
                  border
                  fit
                  stripe
                  style="width: 100%">
                  <el-table-column
                      v-for="item in formThead"
                      :key="item.key"
                      :label="item.title"
                      :width="item.width"
                      :fixed="item.fixed">
                      <template slot-scope="scope">
                          {{ scope.row[item.key] }}
                      </template>
                  </el-table-column>
                  <el-table-column v-if="isDisplayAction" label="操作">
                      <template slot-scope="{ row, $index }">
                          <slot :rowInfo="{ row, $index }" />
                      </template>
                  </el-table-column>
        </el-table>
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
        isDisplayAction: {
            type: Boolean,
            default: false
        },
        height: {
            // 是否设置滚动
            type: Number,
            default: 540
        },
        fixed: {
            type: Boolean || String,
            default: 'right'
        }
    },
    computed: {
        formThead() {
            return this.heads;
        },
        values() {
            return this.tableData;
        }
    }
};
</script>

<style scoped>
.table >>> .el-table thead {
    color: #444;
    font-weight: bold;
}
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>
