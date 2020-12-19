<!--
 * @author: milyyy
 * @Description: 全局table组件, 基于Mtable做的升级,支持点击单元格增加tip提示功能
 -->
<template>
    <div class="table">
        <el-table
            :data="values"
            border
            fit
            stripe
            :row-style="tableRowClassName"
            style="width: 100%"
            @cell-click="cellClick">
            <el-table-column
                v-for="item in formThead"
                :key="item.key"
                :label="item.title"
                :width="item.width"
                :fixed="item.fixed"
                :show-overflow-tooltip="item.isShowTooltip"
                :align="isAlign">
                <template slot-scope="scope">
                    <!-- 是否悬浮显示 -->
                    <el-popover
                        v-if="item.hasHover"
                        style="width: 100px"
                        trigger="click"
                        placement="top"
                        popper-class="popoverClass"
                        @show="getImage(scope)">
                        <div style="text-align:center">
                            <img :src="imgURL" style="width: 50px; height:50px">
                            <p class="sm-tip">右键另存</p>
                        </div>
                        <div slot="reference" class="name-wrapper">
                            <span v-if="item.formatter">
                                {{ item.formatter(scope.row[item.key]) }}
                            </span>
                            <span v-else>{{ scope.row[item.key] }}</span>
                        </div>
                    </el-popover>

                    <div v-else>
                        <span v-if="item.formatter">
                            {{ item.formatter(scope.row[item.key]) }}
                        </span>
                        <span v-else>{{ scope.row[item.key] }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                v-if="isDisplayAction"
                :align="isAlign"
                :width="actionWidth"
                fixed="right"
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
        // 是否需要分页, 如果不需要分页，父组件必须绑定 hasPage为false
        hasPage: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            imgURL: ''
        };
    },
    computed: {
        formThead() {
            return this.heads;
        },
        values() {
            return this.tableData;
        }
    },
    mounted() {},
    methods: {
        tableRowClassName(obj) {
        },
        // 翻页
        handleCurrentChange(val) {
            this.$emit('changePage', val);
        },
        cellClick(row, column, cell, event) {
            this.$emit('cellClick', row, column);
		},
		// 为请求图片方法, 如果后台返回可以不用请求直接url赋值给image
        getImage(scope) {
            let data;
            if (scope.column.label === '企业logo') {
                data = scope.row.logoOssName;
            }
            if (scope.column.label === '企业二维码') {
                data = scope.row.qrcodeOssName;
            }
            if (scope.column.label === '企业营业执照') {
                data = scope.row.qualificationOssName;
            }
            this.$api.getImageSrc(data).then((res) => {
                if (res.status === 2000) {
                    this.imgURL = res.data;
                }
            });
        },
        test({ row, column, $index, store }) {
            return 1;
        }
    }
};
</script>

<style lang="scss">
.sm-tip {
    font-size: 12px;
    transform: scale(.9);
}
.el-popover {
    min-width: 80px;
}
</style>
