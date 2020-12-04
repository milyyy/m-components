<!--
 * @Date: 2020-03-19 10:48:43
 * @author: milyyy
 * @Description: 动态表单，支持动态添加表头和功能按钮
 * @LastEditTime: 2020-03-20 18:10:02
 * @FilePath: \m-components\Form\动态表单\Parent.vue
 -->
<template>
  <div>
    <m-table :heads="heads" :tableData="tableData" :isDisplayAction="isDisplayAction">
      <template v-slot:default="slotData">
        <el-button @click="del(slotData.rowInfo)" size="small">删除</el-button>
      </template>
    </m-table>
  </div>
</template>

<script>
import MTable from "./MTable";
export default {
  components: {
    MTable
  },
  data() {
    return {
      /**
       * isDisplayAction: 是否展示操作列，必传
       * heads:           thead数组，必传
       * tableData：      表单数据， 必传
       * template         为默认插槽部分，可以自定义操作添加各种button
       * slotData.rowInfo： slot子组件传来的数据{row, $index}
       * 支持添加具名插槽，但需要重新进行子组件配置~
       * 支持el-table原有属性和方法
       */
      isDisplayAction: true,
      heads: [
          { title: 'id', key: 'id', width: 180 },
          { title: '姓名', key: 'name', width: 180, fixed: 'left' }, // 动态设定宽度，是否固定列
          { title: '年龄', key: 'age', width: 180 },
          { title: '性别', key: 'sex', width: 180 }
      ],
      tableData: [
        {
          id: "03",
          name: "mily",
          age: "永远18",
          weight: "50kg"
        },
        {
          id: "07",
          name: "korol",
          age: "我不管了",
          weight: "74kg"
        }
      ]
    };
  },
  methods: {
    del({ row, $index }) {
      // console.log(row, $index);
      // 可以依据后台逻辑删除
      this.tableData.splice($index, 1);
      this.$message({
        message: '删除成功',
        type: 'success'
      });
    }
  }
};
</script>