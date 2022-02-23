import {makeAutoObservable} from "mobx";

export default class ProductStore{
    constructor() {
        this.products = []
        makeAutoObservable(this)
    }
    set(products){
        this.products = products;
    }
}
export const productStructure = {
    name:'',
    item_type: 'hour',
    description: 'Description',
    price: 0,
    sales_tax: 0
};