/**
* author: milyyy
* descriton: 只需父组件绑定loading即可
*/
<template>
    <div
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.3)">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
};
</script>
