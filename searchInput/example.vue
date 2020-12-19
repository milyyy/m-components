<template>
	<div>
		<el-form-item label="xx名称:" prop="provinceName">
			<!-- 示例1 不需要 支持模糊搜索, 通用组件数据最好用mixins管理 -->
			<!-- 这里多数属性都用mixins写在PROVINCE里， 方便管理 -->
			<searchInput
				:searchkey="form.provinceName"
				:is-need-blur="false"
				:show-header="false"
				:pageinfo="provPageInfo"
				:grid-data="PROVINCE_LIST"
				:popover-titles="popoverTitles"
				@changePopoverPage="getProvinceList"
				@clear="clearProvInfo"
				@rowClick="rowClickProv"/>
		</el-form-item>

		<!-- 示例2 默认支持模糊搜索, 通用组件数据最好用mixins管理 -->
		<el-form-item label="xx名称:" prop="provinceName">
			<searchInput
				:searchkey="form.provinceName"
				:pageinfo="provPageInfo"
				:grid-data="PROVINCE_LIST"
				:popover-titles="popoverTitles"
				@changePopoverPage="getProvinceList"
				@clear="clearProvInfo"
				@blurSearch="blurSearch"
				@rowClick="rowClickProv"/>
			<!-- 这里多数属性都用mixins写在PROVINCE里， 方便管理 -->
	<!-- 示例1 需要支持模糊搜索, 通用组件数据最好用mixins管理 -->

		</el-form-item>
	</div>
</template>

<script>
import { PROVINCE } from './searchInput';
export default {
	mixins: [ PROVINCE ],
	data() {
		return {
			form: {
				provinceName: '',
				parentCode: ''
			},
			popoverTitles: [
                { label: '承揽项目编码', key: 'projectCode' },
                { label: '承揽项目', key: 'projectName' },
				// ... 添加列表要显示的列，支持格式化
                { label: '状态', key: 'status', formatter: this.formatter }
			]
		}
	}
}
</script>