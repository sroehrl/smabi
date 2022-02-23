import {useEffect, useState} from "react";
import AddContact from "./AddContact";
import Modal from "./Modal";
import {observer} from "mobx-react-lite";
import {clientStructure} from "../store/ClientStore";

export default observer(({contactId, client})=>{
    const [contact,setContact] = useState(clientStructure)
    const [showModal, setShowModal] = useState(false)
    const titles = ['Mrs', 'Mr', 'Mx']
    const propagate = () => {
        setShowModal(false)
    }
    useEffect(()=>{
        setContact({...client.currentClient.client_contact.find(x=>x.id===contactId)})
    },[client,contactId,showModal])
    return(
        <>
            <div className={'raise-1-gray p-3 m-1'}>
                <h3>{titles[contact.gender]} {contact.first_name} {contact.last_name} <i onClick={()=>setShowModal(true)} className={'bi-pencil cursor-pointer'}/></h3>
                <p className={'font-strong'}>{contact.position}</p>
                <a href={'mailto:'+contact.email}>{contact.email}</a> <br/>
                <a href={'tel:'+contact.phone}>{contact.phone}</a>
            </div>
            <Modal visible={showModal} setVisible={setShowModal} title={'Edit contact'} component={()=>AddContact({client,existingContact:contact,propagate})}/>
        </>

    )
})