import productService from "@/services/productService";


export default {
    mutations: {
        setProducts(state, products) {
            state.products = products;
        },
        addProduct(state, product) {
            const found = state.products.findIndex(x => x.id === product.id);
            if (found !== -1) {
                state.products[found] = {...product}
            } else {
                state.products.push({...product})
            }
        },
        setCurrentProduct(state, product) {
            state.currentProduct = {...product}
        }
    },
    state: {
        products: [],
        currentProduct: null
    },
    actions: {
        async storeProduct({commit}, product) {
            const method = product.id ? 'update' : 'create';
            try {
                const newOrUpdated = await productService[method](product);
                commit('addProduct', newOrUpdated)
                return true;
            } catch (e) {
                return false;
            }
        },

        async removeProduct({commit, state}, client) {
            await productService.delete(client.id);
            commit('setProducts', state.products.filter(x => x.id !== client.id))
        },
        async setCurrentProductById({commit}, productId) {
            try {
                const product = await productService.get(productId)
                commit('setCurrentProduct', product)
                commit('addProduct', product)
                return true;
            } catch (e) {
                return false;
            }
        },
        async getPaginatedProducts({commit}, config = {}) {
            config.limit = config.limit ?? 30;
            config.offset = config.offset ?? 0;
            try {
                const products = await productService.getPaginated(config.offset, config.limit);
                products.forEach(client => {
                    commit('addProduct', client)
                })
                return true;
            } catch (e) {
                return false;
            }
        }
    },
    getters: {

    }
}

export const productStructure = {
    name: '',
    item_type: '',
    description: '',
    price: '',
    sales_tax: '',
    product_number: '',
    category: '',
    product_tag: []
};
