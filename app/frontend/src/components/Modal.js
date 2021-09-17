export default function Modal({visible, setVisible, title, component: Content}){
    return (
        <>
            {visible && (
                <div className={'backdrop'} style={{zIndex:9}}>
                    <div className={'modal-box'}>
                        <div className="d-flex bg-primary p-y-2 p-x-4">
                            <h3 className={' f-1 text-white font-md'}>{title}</h3>
                            <div className={'grid'}>
                                <button className="btn-warning place-y-center" onClick={()=>setVisible(false)}>close</button>
                            </div>
                        </div>
                        <div className="modal-content">
                            <Content/>
                        </div>

                    </div>
                </div>
            )}
        </>

    )
}