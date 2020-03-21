<!--
 * @Date: 2020-03-20 09:42:43
 * @Description: 子组件
 * @LastEditTime: 2020-03-20 17:58:04
 * @FilePath: \_vue\src\views\Table\MTable.vue
 -->

<template>
  <div class="table">
    <el-table :data="values" border fit stripe style="width: 100%">
      <el-table-column v-for="k in formThead" :key="k" :label="k">
        <template slot-scope="scope">{{ scope.row[k] }}</template>
      </el-table-column>
      <el-table-column v-if="isDisplayAction" label="操作">
        <template slot-scope="{row, $index}">
          <slot :rowInfo="{row, $index}"></slot>            
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
      default: []
    },
    isDisplayAction: Boolean
  },
  computed: {
    formThead(){
      return this.heads
    },
    values() {
      return this.tableData
    }
  }
};
</script>

<style scoped>
  .table >>> .el-table thead {
    color:#444;
    font-weight: bold;
  }
</style>