<template>
	<div>
		<ymDialog
            :dialog-visible="dialogVisible"
            center
            :title="mark=='edit'?'编辑':'新增'"
            :width="'30%'"
            @visible="changeVisible">
			test
        </ymDialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialogVisible: false
		}
	},
	methods: {
		cancel() {
            this.dialogVisible = false;
        },
		changeVisible(bool) {
            this.dialogVisible = bool;
        }
	},
}
</script>