/* eslint-disable no-tabs */
<template>
    <div>
        <el-upload
            class="upload-demo"
            action="#"
            :http-request="handleRequest"
            :on-change="handleChange"
            :on-preview="handlePreview"
            :before-remove="beforeRemove"
            :on-remove="handleRemove"
            :limit="limit"
            :on-exceed="handleExceed"
            :on-error="handlefailed"
            :file-list="fileList"
            :before-upload="beforeUpload">
            <el-button size="small" type="success" plain>点击上传</el-button>
            <span v-if="isShowText" slot="tip"> 当前未选中任何文件 </span>
            <!-- <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过500kb</div> -->
        </el-upload>
    </div>
</template>

<script>
export default {
    props: {
        maxM: {
            type: Number,
            default: 50
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
            file: {},
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
        // 文件上传前钩子函数
        beforeUpload(file) {
            const isPDF = /^application\/pdf$/.test(file.type);
            const isLt2M = file.size / 1024 / 1024 < this.maxM;
            if (!isPDF) {
                return this.$message.error('上传文件只能是 PDF 格式!');
            }
            if (!isLt2M) {
                return this.$message.error(`上传文件大小不能超过 ${this.maxM}MB!`);
            }
        },
        // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        handleChange(file, fileList) {
            const isPDF = /^application\/pdf$/.test(file.raw.type);
            const isLt2M = file.size / 1024 / 1024 < this.maxM;

            if (isPDF && isLt2M) {
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
        // 预览
        handlePreview(file) {
            // console.log(file);
        },
        // 超出限制时的钩子函数, 使最新上传的文件替换上一个旧文件
        async handleExceed(files, fileList) {
            try {
                const isPDF = /^application\/pdf$/.test(files[0].type);
                const isLt2M = files[0].size / 1024 / 1024 < this.maxM;
                if (isPDF && isLt2M) {
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
        // 上传失败
        handlefailed(err, file, fileList) {
            console.log('failed', err, file, fileList);
        },
        // 移除前
        beforeRemove(file, fileList) {
            // return this.$confirm(`确定移除 ${file.name}？`);
        },
        // 覆盖默认的上传行为，可以自定义上传的实现
        async handleRequest(data) {
            try {
                const isPDF = /^application\/pdf$/.test(data.file.type);
                const isLt2M = data.file.size / 1024 / 1024 < this.maxM;
                if (isPDF && isLt2M) {
                    const formData = new FormData();
                    formData.append('file', data.file);
                    const res = await this.$api.uploadPdf(formData);
                    if (res.status === 2000) {
                        this.lastOssFileName = res.data;
                        this.$emit('onOssName', res.data);
                    }
                }
            // eslint-disable-next-line no-unreachable
            } catch (e) {}
        }
    }
};
</script>
