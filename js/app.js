// esm module
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';



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
        }
    },
    methods: {
        getProducts(page = 1) {
            const url = `${this.apiBaseUrl}/api/${this.apiPath}/products?page=${page}`;
            axios.get(url)
                .then(res => {
                    if (res.data.success) {
                        console.log(res.data);
                        this.products = res.data.products;
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(error => {
                    console.dir(error);
                })
        },
        getProduct() {

        },
        getCart() {

        },
        addToCart() {

        },
        updateCart() {

        },
        removeCartItem() {

        },
        deleteAllCarts() {

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
    },
})

app.mount('#app');