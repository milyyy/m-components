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
            return isJPG && isLt2M;
        },

        // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        handleChange(file, fileList) {
            // 图片未上传完成状态不是success,只能去raw的type
            const isJPG = /^image\/(png|jpeg)$/.test(file.raw.type);
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

        // 文件超出个数限制时的钩子
        async handleExceed(files, fileList) {
            try {
                const isJPG = /^(image\/)(png|jpeg)$/.test(files[0].type);
                const isLt2M = files[0].size / 1024 / 1024 < this.maxM;
                if (isJPG && isLt2M) {
                    const formData = new FormData();
                    formData.append('file', files[0]); // 最新上传的超出限制的文件
                    formData.append('ossFileName', this.lastOssFileName); // 上次上传的文件的ossName

                    const res = await this.$api.replaceFile(formData);
                    if (res.status === 2000) {
                        this.$emit('onOssName', res.data);
                        // 填充替换拷贝, 修复文件更换filelist文件名不更新问题
                        const value = JSON.parse(JSON.stringify(fileList[0]));
                        fileList.fill(value, -this.limit + 1);
                        fileList[this.limit - 1].name = files[0].name;
                        fileList[this.limit - 1].size = files[0].size;
                        fileList[this.limit - 1].uid = files[0].lastModified;
                        fileList[this.limit - 1].raw = files[0];
                        this.fileList = fileList;
                    }
                }
            } catch (e) {}
            // return this.$message.warning(`最多可上传${this.limit}个文件`);
        },

        failed(err, file, fileList) {
            console.log('failed', err, file, fileList);
        },
        // 覆盖默认的上传行为，可以自定义上传的实现
        async handleRequest(data) {
            try {
                const isJPG = /^image\/(png|jpeg)$/.test(data.file.type);
                const isLt2M = data.file.size / 1024 / 1024 < this.maxM;
                console.log('isJPG', isJPG, isLt2M);
                if (isJPG && isLt2M) {
                    const formData = new FormData();
                    formData.append('file', data.file);
                    const res = await this.$api.uploadPic(formData);
                    if (res.status === 2000) {
                        this.lastOssFileName = res.data;
                        this.$emit('onOssName', res.data);
                    }
                }
            } catch (e) {}
        }
    }
};
</script>
