<template>
    <div>
        <el-button type="text" @click="open">点击打开 Dialog</el-button>
        <dialog :dialog-visible="dialogVisible" :done="test" @visible="visible">
            这是一个测试
        </dialog>
    </div>
</template>

<script>
import dialog from './Dialog'; // 这里dialog最好注册为全局组件
import { DialogMixin } from './dialogMixin';
export default {
    components: {dialog},
    mixins: [DialogMixin],
    methods: {
        test() {
            setTimeout(() => {
                console.log('test');
                // return 2;
            }, 200);
        }
    }
};
</script>
