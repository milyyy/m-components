/* eslint-disable no-tabs */
<template>
    <div>
        <!-- 图片上传预览 -->
        <el-upload
            action="#"
            class="upload-demo"
            list-type="picture"
            :http-request="handleRequest"
            :limit="limit"
            :show-file-list="true"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-preview="handlePreview"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :before-upload="beforeUpload">
            <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
            <span v-if="isShowText" slot="tip"> 当前未选中任何文件 </span>
            <!-- <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过2M
            </div> -->
        </el-upload>
        <el-dialog :visible.sync="uploadVisible" class="content">
            <img width="100%" :src="imgURL" alt="">
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        maxM: {
            type: Number,
            default: 2
        },
        limit: {
            type: Number,
            default: 1
        },
        files: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            imgURL: '',
            uploadVisible: false,
            fileList: this.files,
            lastOssFileName: ''
        };
    },
    computed: {
        isShowText() {
            return !(this.fileList.length > 0);
        }
    },
    methods: {
        // 预览
        handlePreview(file) {
            console.log('preview', file);
            this.imgURL = file.url;
            this.uploadVisible = true;
        },

        // 文件上传前钩子函数
        beforeUpload(file) {
            const isJPG = /^(image\/)(png|jpeg)$/.test(file.type);
            const isLt2M = file.size / 1024 / 1024 < this.maxM;

            if (!isJPG) {
                return this.$message.error('上传图片只能是 PNG/JPG/JEPG 格式!');
            }
            if (!isLt2M) {
                return this.$message.error(`上传图片大小不能超过 ${this.maxM}MB!`);
            }
            // return isJPG && isLt2M;
        },

        handleChange(file, fileList) {
	   /*
	      文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
	      注意,这里如果是上传错误的文件类型,还是会被执行,即 fileList 依然会被赋值
	      所以,这里做了一个被禁止类型文件的删除操作
	   */
            const isJPG = /^(image\/)(png|jpeg)$/.test(file.type);
            const isLt2M = file.size / 1024 / 1024 < this.maxM;

            if (isJPG && isLt2M) {
                this.fileList = fileList;
                this.$emit('onFileList', this.fileList);
            } else {
                const index = fileList.findIndex(item => item.uid === file.uid);
                fileList.splice(index, 1);
                this.fileList = fileList;
            }
        },

        // 移除
        handleRemove(file, fileList) {
            this.fileList = fileList;
            this.$emit('onFileList', this.fileList);
        },
		// 上传失败钩子
        handleFailed(err, file, fileList) {
            console.log('failed', err, file, fileList);
	},

	async handleExceed(files, fileList) {
	 /**
	  * 文件超出个数限制时的钩子
	  * 至于这里为什么要做这个操作, (强颜欢笑看需求)
	  * 后台的逻辑是第一次调上传接口, 成功返回一个ossName,然后想修改的时候调替换接口
	  * 如果后台逻辑是只调一个上传接口就可以替换,这里就不需要操作 ,直接return一个提示信息即可.
	 */
            try {
                const formData = new FormData();
                formData.append('file', files[0]); // 最新上传的超出限制的文件
                formData.append('ossFileName', this.lastOssFileName); // 上次上传的文件的ossName

                const res = await this.$api.replaceFile(formData);
                if (res.status !== 2000) {
                    return this.$message({
                        message: '文件上传失败, 请重试',
                        type: 'warning'
                    });
                } else {
                    this.$emit('onOssName', res.data);
                }
            } catch (e) {}
            // return this.$message.warning(`最多可上传${this.limit}个文件`);
		},

        // 覆盖默认的上传行为，可以自定义上传的实现
        async handleRequest(data) {
            try {
                const formData = new FormData();
                formData.append('file', data.file);
                const res = await this.$api.uploadPic(formData);
                console.log('logo', res);
                if (res.status !== 2000) {
                    return this.$message({
                        message: '图片上传失败, 请重试',
                        type: 'warning'
                    });
                } else {
                    this.lastOssFileName = res.data;
                    this.$emit('onOssName', res.data);
                }
            } catch (e) {}
        }
    }
};
</script>
