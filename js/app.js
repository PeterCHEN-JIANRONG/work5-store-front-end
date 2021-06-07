// esm module
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';



const app = createApp({
    data() {
        return {
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
        getProducts() {
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
    },
    created() {

    },
})

app.mount('#app');