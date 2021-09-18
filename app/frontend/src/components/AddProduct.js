import {useState} from "react";
import {productStructure} from "../store/ProductStore";
import productService from "../services/product";
import {updateState} from "../utils/stateUpdater";
import AutoComplete from "./AutoComplete";

export default function AddProduct({productStore}) {
    const [product, setProduct] = useState(productStructure)
    const updateProduct = updateState(setProduct)

    const storeProduct = async ev => {
        ev.preventDefault();
        productStore.set([...productStore.products, await productService.create(product)])
    }

    return (
        <form className={'grid'} onSubmit={storeProduct}>
            <div className="w-75p place-x-center">
                <div className="input">
                    <input required minLength={5} type="text" name={'name'} placeholder={'Name'} value={product.name}
                           onChange={updateProduct}/>
                    <label>Name</label>
                </div>
            </div>
            <div className="w-75p place-x-center">
                <div className="m-y-5">
                    <AutoComplete asSelect={true} options={[{name: 'hour'}, {name: 'fixed'}]} label={'Type'}
                                  setter={val => setProduct({...product, item_type: val})}/>
                </div>
            </div>
            <div className="w-75p place-x-center grid lg:grid-5-2-5">
                <div className="input">
                    <input type="number" name={'price'} min={0} step={.01} placeholder={'Price'} value={product.price}
                           onChange={updateProduct}/>
                    <label>Price</label>
                </div>
                <div/>
                <div className="input">
                    <input type="number" name={'sales_tax'} min={0} step={.01} placeholder={'Sales Tax (%)'} value={product.sales_tax}
                           onChange={updateProduct}/>
                    <label>Sales Tax (%)</label>
                </div>
            </div>
            <div className="w-75p place-x-center">
                <div className="input">
                    <textarea name="description" rows="10" value={product.description} onChange={updateProduct}/>
                </div>
            </div>
            <div className="w-75p place-x-center grid">
                <button className="btn-primary place-x-end" type={'submit'}>create</button>
            </div>
        </form>
    )
}