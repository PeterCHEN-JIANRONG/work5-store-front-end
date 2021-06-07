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
            tempProduct: {
                origin_price: 0,
                price: 0
            },
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
        },
        toThousand(num) {
            // 千分位
            let temp = num.toString().split(".");
            temp[0] = temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return temp.join(".");
        },
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.modal, {
            keyboard: false,
            backdrop: 'static'
        })
    },
}