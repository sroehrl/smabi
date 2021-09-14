export default function Modal({visible, setVisible, title, component: Content}){
    return (
        <>
            {visible && (
                <div className={'backdrop'}>
                    <div className={'modal-box'}>
                        <div className="d-flex bg-primary p-2">
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