import {observer} from "mobx-react-lite";
import Dashboard from "../layout/Dashboard";
import {useEffect, useState} from "react";
import productService from "../services/product";
import Modal from "../components/Modal";
import AddProduct from "../components/AddProduct";

export default observer(({productStore}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [retireProduct, setRetireProduct] = useState(null)
    const [showRetireModal, setShowRetireModal] = useState(false)
    const [productFilter, setProductFilter] = useState('')
    const [expandedProduct, setExpandedProduct] = useState(null)

    useEffect(() => {
        if (productStore.products.length < 1) {
            productService.find().then(res => {
                setProducts(res)
                setFilteredProducts(res)
                productStore.set(res)
            })
        }
    }, [productStore])

    useEffect(()=>{
        setFilteredProducts(products.filter(p => p.name.toLowerCase().includes(productFilter.toLowerCase())))
    },[productFilter])

    const toggleExpanded = iterator => {
        setExpandedProduct(expandedProduct===null?iterator:null)
    }
    const retireProductConfirmation = product => {
        const retire = ev => {
            productService.delete(product).then(res => {
                const newProducts = productStore.products.filter(p => p.id !== product.id)
                productStore.set([...newProducts])
                setShowRetireModal(false)
            })
        }
        return (
            <div>
                <h3>Are you sure you want to retire this product?</h3>
                <p>Invoices using this product will not be affected.</p>
                <button className="btn-primary" onClick={retire}>Confirm</button>
            </div>
        )
    }

    return (
        <Dashboard children={(
            <>
                <div className="p-3">
                    <h3>Products</h3>
                    <div className="d-flex">
                        <div className={'f-1 input'}>
                            <input type="text" value={productFilter} onChange={ev => setProductFilter(ev.target.value)}
                                   placeholder={'Filter products'}/>
                            <label>Filter products</label>
                        </div>
                        <div className={'place-y-center m-l-1'}>
                            <button className="btn-primary" onClick={()=>setShowModal(true)}>+</button>
                        </div>
                    </div>
                    <div className="m-y-3">
                        <div className="grid-4-2-2-2-2 p-x-3">
                            <p className="font-strong">name</p>
                            <p className="font-strong">type</p>
                            <p className="font-strong">price</p>
                            <p className="font-strong">sales tax</p>
                        </div>
                        {filteredProducts.map((product,i) => (
                            <div className={'p-3 b-1 b-gray m-y-1'} key={product.id}>
                                <div className="grid-4-2-2-2-2">
                                    <p>{product.name}</p>
                                    <p>{product.item_type}</p>
                                    <p>{product.price}</p>
                                    <p>{product.sales_tax}</p>
                                    <div className={'place-y-center place-x-end'}>
                                        <button className={'btn-gray'} onClick={()=>toggleExpanded(i)}><i className={'bi bi-chevron-expand'}/></button>
                                    </div>
                                </div>
                                {expandedProduct === i && (
                                    <div className={'grid-10-2'}>
                                        <p className={'font-light'}>{product.description}</p>
                                        <div className={'place-y-center place-x-end'}>
                                            <button title={'retire product'} className={'btn-warning'} onClick={()=>{setRetireProduct(product); setShowRetireModal(true)}}><i className={'bi bi-x-circle'}/></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <Modal visible={showModal} setVisible={setShowModal} title={'New Product'} component={()=>(<AddProduct propagate={() => setShowModal(false)} productStore={productStore}/>)}/>
                <Modal visible={showRetireModal} setVisible={setShowRetireModal} title={'Retire Product'} component={()=>retireProductConfirmation(retireProduct)}/>
            </>
        )}/>
    )
})