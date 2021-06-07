export default {
    template: '#productModal-template',
    props: {
        product: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            modal: null,
            status: {},
            tempProduct: {},
            qty: 1,
        }
    },
    watch: {
        product() {
            this.tempProduct = this.product;
        }
    },
    methods: {
        openModal() {
            this.modal.show();
        },
        hideModal() {
            this.modal.hide();
        }
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal, {
            keyboard: false,
            backdrop: 'static'
        })
    },
}