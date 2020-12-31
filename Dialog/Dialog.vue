<template>
    <div>
        <el-dialog
            :center="center"
            :title="title"
            :custom-class="myClass"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :width="width"
            :modal="hasModal"
            :modal-append-to-body="isBody"
            :before-close="cancel">
            <slot />
            <span
                v-if="isShowBtns"
                slot="footer"
                class="dialog-footer"
                :isShowBtns="isShowBtns">
                <el-button @click="cancel">{{ cancelText }}</el-button>
                <el-button type="primary" @click="submit(done)">{{ submitText }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/require-prop-types
    props: {
        done: {
            type: Function,
            default: () => {}
        },
        center: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '提示'
        },
        dialogVisible: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '30%'
        },
        cancelText: {
            type: String,
            default: '取 消'
        },
        submitText: {
            type: String,
            default: '确 定'
        },
        isShowBtns: {
            type: Boolean,
            default: true
        },
        isBody: { // 遮罩层是否在body上
            type: Boolean,
            default: true
        },
        hasModal: { // 是否需要遮罩层
            type: Boolean,
            default: true
        },
        myClass: {
            type: String,
            default: 'ym-dialog'
        }
    },
    data() {
        return {};
    },
    methods: {
        cancel() {
            this.$emit('visible', false);
        },
        submit(_done) {
            if (_done instanceof Function) {
                // eslint-disable-next-line no-new
                new Promise((resolve, reject) => {
                    _done();
                    resolve();
                });
            } else {
                throw new TypeError('请确保done为Fuction类型');
            }
            this.$emit('visible', false);
        }
    }
};
</script>

<style lang="scss" scoped>
/deep/ .ym-dialog {
    color: 343434;
    overflow: hidden;
    .el-dialog__header {
        padding: 10px 20px;
        text-align: left;
        // background-color: #409eff;
        background-color: #5faeff;
    }
    .el-dialog__footer {
        padding: 10px 20px;
    }
    .el-dialog__title {
        color: #fff;
        font-size: 16px;
        &::before {
            content: '';
            display: inline-block;
            width: 2px;
            height: 14px;
            background: #fff;
            position: relative;
            top: 2px;
            margin-right: 8px;
        }
    }
    .el-dialog__close {
        color: #343434;
        position: relative;
        top: -5px;
        border-radius: 50%;
        color: #fff;
    }
    // .el-button--primary {
    //     background-color: #409eff;
    //     border-color: #409eff;
    //     &:hover {
    //         background-color: #0781ff;
    //         border-color: #409eff;
    //     }
    // }
}
</style>
