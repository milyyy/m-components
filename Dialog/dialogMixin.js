export const DialogMixin = {
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        open() {
            this.dialogVisible = true;
        },
        visible(data) {
            this.dialogVisible = data;
        }
    }
};
