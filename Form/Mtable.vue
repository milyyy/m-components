<!--
 * @Date: 2020-03-20 09:17:26
 * @Description: M-Table 动态表单组件封装
 * @LastEditTime: 2020-03-20 16:14:21
 * @FilePath: \m-components\Form\Mtable.vue
 -->
<template>
  <div class="table">
    <md-table :value="getArray" class="paginated-table table-striped table-hover">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell
          v-for="k in keys"
          :key="k"
          :md-label="k"
        >{{ item[k] }}</md-table-cell>
      </md-table-row>
    </md-table>

    <!-- <md-table :value="nullData" class="paginated-table table-striped table-hover">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell
          v-for="k in keys"
          :key="k"
          :md-label="k"
        >{{ item[k] }}</md-table-cell>
      </md-table-row>
    </md-table>-->
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 本组件适用 vuematerial-UI, 主要为行内数据渲染，不过道理类似
     * keys: 父组件传来的属性数组, 必传
     * tableData: 和属性值对应的表单数组
     * isDisplayAction: 是否展示操作列
    */
    keys: {
      type: Array,
      required: true
    },
    tableData: Array,
    isDisplayAction: Boolean
  },

  computed: {
    nullData() {
      // 空数据处理，比如M-terita如果数据为空则不显示表头，这里为了让table显示表头
      let arr = [];
      for (let i of this.keys) {
        let obj = {};
        obj[i] = "";
        arr.push(obj);
      }
      return arr;
    },
    getArray() {
      // 获取最终数据
      let len = this.tableData.length;
      return len ? this.tableData : this.nullData;
    }
  }
};
</script>

<style scoped>
.table >>> .paginated-table .md-table-head-container.md-ripple {
  text-align: left;
}
</style>