// esm module
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';
import productModal from './productModal.js'


const app = createApp({
    data() {
        return {
            apiBaseUrl: api_base_url,
            apiPath: api_path,
            products: [],
            product: {},
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
            cart: {},
            loadingStatus: {
                loadingItem: '',
            },
        }
    },
    components: {
        productModal,
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
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/product/${item.id}`;
            axios.get(url)
                .then(res => {
                    if (res.data.success) {
                        this.product = res.data.product;
                        this.$refs.productModalA.openModal();
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
            const data = {
                'product_id': id,
                qty
            }
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/cart`
            axios.post(url, { data })
                .then(res => {
                    if (res.data.success) {
                        this.getCart();
                        this.$refs.productModalA.hideModal();
                    }
                    alert(res.data.message);
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        updateCart(item) {
            const data = {
                product_id: item.product_id,
                qty: item.qty,
            }
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/cart/${item.id}`
            axios.put(url, { data })
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

        },
        toThousand(num) {
            // 千分位
            let temp = num.toString().split(".");
            temp[0] = temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return temp.join(".");
        },
    },
    created() {
        this.getProducts();
        this.getCart();
    },
})

app.mount('#app');