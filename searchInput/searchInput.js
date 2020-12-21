/**
 * PROVINCE 省份信息
 * 这里默认查询所有省份，如果要查询某具体条件，改变查询条件里的data即可。
*/
export const PROVINCE = {
    data() {
        return {
            provLoading: false,
            provPageInfo: {
                page: 1,
                size: 5,
                total: 0
            },
            keyWord: '',
            PROVINCE_LIST: []
        };
    },
    mounted() {
        this.searchList();
    },
    methods: {
		clearProvInfo() {
            // 1.关键词、页数置空
            this.keyWord = '';
            this.provPageInfo.page = 1;
            // 2. 表单赋值的属性置空
            this.form.parentCode = '';
            this.form.provinceName = '';
            this.searchList();
		},
		rowClickProv(row) {
			this.form.parentCode = row.districtCode;
			this.form.provinceName = row.districtName;
		},
		// 翻页查询
        getProvinceList(propData) {
            this.provPageInfo.page = propData;
            this.searchList();
		},
		// 模糊搜索
		blurSearch(v) {
			this.keyWord = v; // 视情况而定,如果是对象,则改变对象值即可
			this.searchList();
		},
		// 默认查询
        async searchList() {
            try {
                this.provLoading = true;
                const res = await this.$api.queryProvince({
                    data: this.keyWord,
                    pageIndex: this.provPageInfo.page,
                    pageSize: this.provPageInfo.size
                });
                this.PROVINCE_LIST = res.data;
                this.provPageInfo.total = res.total;
                console.log('res', res);
            } catch (e) {
                console.log(e, e.message);
            } finally {
                this.provLoading = false;
            }
		}
    }
};
