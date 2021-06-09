// esm module
// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';
import productModal from './productModal.js'

// VeeValidate
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

// rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

// languages
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');
configure({
    generateMessage: localize('zh_TW'),
});

const app = Vue.createApp({
    data() {
        return {
            apiBaseUrl: api_base_url,
            apiPath: api_path,
            products: [],
            product: {},
            cart: {
                total: 0,
                final_total: 0,
                carts: [],
            },
            loadingStatus: {
                loadingItem: '',
            },
            hasCartsItems: false,
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
        }
    },
    components: {
        productModal,
        VForm: Form,
        VField: Field,
        ErrorMessage: ErrorMessage,
    },
    methods: {
        getProducts(page = 1) {
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/products?page=${page}`;
            axios.get(url)
                .then(res => {
                    if (res.data.success) {
                        this.products = res.data.products;
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        openProductModal(item) {
            this.loadingStatus.loadingItem = item.id;
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/product/${item.id}`;
            axios.get(url)
                .then(res => {
                    if (res.data.success) {
                        this.product = res.data.product;
                        this.$refs.productModalA.openModal();
                        this.loadingStatus.loadingItem = '';
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        getCart() {
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/cart`;
            axios.get(url)
                .then(res => {
                    if (res.data.success) {
                        this.cart = res.data.data;
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        addCart(id, qty = 1) {
            this.loadingStatus.loadingItem = id;
            const data = {
                'product_id': id,
                qty
            }
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/cart`
            axios.post(url, { data })
                .then(res => {
                    if (res.data.success) {
                        this.getCart();
                        this.loadingStatus.loadingItem = '';
                        this.$refs.productModalA.hideModal();
                    }
                    alert(res.data.message);
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        updateCart(item) {
            this.loadingStatus.loadingItem = item.id;
            const data = {
                product_id: item.product_id,
                qty: item.qty,
            }
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/cart/${item.id}`
            axios.put(url, { data })
                .then(res => {
                    if (res.data.success) {
                        this.getCart();
                        this.loadingStatus.loadingItem = '';
                    }
                    alert(res.data.message);
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        removeCartItem(id) {
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/cart/${id}`
            axios.delete(url)
                .then(res => {
                    if (res.data.success) {
                        this.getCart();
                    }
                    alert(res.data.message);
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        deleteAllCarts() {
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/carts`
            axios.delete(url)
                .then(res => {
                    if (res.data.success) {
                        this.getCart();
                    }
                    alert(res.data.message);
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        createOrder() {
            const order = this.form;
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/order`
            axios.post(url, { data: order })
                .then(res => {
                    if (res.data.success) {
                        this.getCart();
                        // 清空表單資料
                        this.$refs.form.resetForm();
                    }
                    alert(res.data.message);
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        toThousand(num) {
            // 千分位
            let temp = num.toString().split(".");
            temp[0] = temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return temp.join(".");
        },
    },
    watch: {
        cart() {
            // 購物車是否有資料， 是:true 否:false
            this.hasCartsItems = (this.cart.carts.length) ? true : false;
        }
    },
    created() {
        this.getProducts();
        this.getCart();
    },
})

app.mount('#app');