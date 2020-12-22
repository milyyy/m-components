<template>
	<div>
		<el-form ref="ruleForm" :model="formData">
			<el-form-item label="企业logo" prop="logoFileName">
				<!-- 这里注意需要加v-if进行渲染,不然会有缓存 -->
				<imgUpload
					v-if="dialogVisible"
					:files="logoFileList"
					@onOssName="getLogoOssName"
					@onFileList="getLogo" />
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
// imgUpload 即 index.vue, 如果不是全局组件 则需要引入
export default {
	data() {
		return {
			dialogVisible: false,
			logoFileList: [],
			upLogoOssName: '', //生成的oss文件名
			formData: {
				logoFileName: '', // 上传文件名
				logoOssName: ''	  // oss文件名
			}
		}
	},
	methods: {
		// 获取上传后的oss文件名, 文件上传时已经调了上传文件的接口
        getLogoOssName(data) {
            this.upLogoOssName = data;
		},
		// 设置上传表单 图片文件名以及oss名
        getLogo(fileList) {
            if (fileList.length > 0) {
                this.formData.logoFileName = fileList[0].name;
                this.formData.logoOssName = this.upLogoOssName;
            } else {
                this.formData.logoFileName = '';
                this.formData.logoOssName = '';
            }
        },
		async updated() {
			try {
				// 获取图片, 如果后台直接返回图片地址 则不需要进行此请求
			    const res = await this.$api.getImageSrc(row.logoOssName);
				if (res.status === 2000) {
					// 当文件需要修改时, 这里需要做一个赋值,实际是一个预览的操作
					this.$nextTick(() => {
						this.logoFileList = [{
							name: row.logoOssName,
							url: res.data
						}];
					});
					this.dialogVisible = true;
					this.isEdit = true;
				}
			} catch (e) {
				console.log('e', e.message);
			}
		}
	},
}
</script>