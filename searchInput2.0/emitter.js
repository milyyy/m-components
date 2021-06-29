const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
function broadcast(componentName, eventName, params) {
    this.$children.forEach((child) => {
        const name = child.$options.componentName;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}
export default {
    props: {
        label: [String, Number],
        created: Boolean
    },
    data() {
        return {
            groupDisabled: false,
            visible: true
        };
    },
    created() {
        this.select.options.push(this);
        this.select.cachedOptions.push(this);
        this.select.optionsCount++;
        this.select.filteredOptionsCount++;

        this.$on('queryChange', this.queryChange);
        this.$on('handleGroupDisabled', this.handleGroupDisabled);
    },
    computed: {
        currentLabel() {
            return this.label || (this.isObject ? '' : this.value);
        }
    },
    methods: {
        queryChange(query) {
            // console.log(query, 'queryChange');
            this.visible = new RegExp(escapeRegexpString(query), 'i').test(this.currentLabel) || this.created;
            if (!this.visible) {
                this.select.filteredOptionsCount--;
            }
        },
        handleGroupDisabled(val) {
            // console.log(val, 'handleGroupDisabled');
            this.groupDisabled = val;
        },
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};
