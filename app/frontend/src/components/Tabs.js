import {useState} from "react";

export default function Tabs({tabs, onSelect}){
    const [localTabs, setTabs] = useState(tabs)
    const setActive = index => {
        const newTabs = [];
        localTabs.forEach((tab,i) => {
            let n = {...tab};
            n.active = i === index;
            newTabs.push(n)
        })
        setTabs(newTabs);
        onSelect(index)
    }
    return (
        <section className={'d-flex b-b-1'}>
            {localTabs.map((tab, i) => (
                <div key={i} onClick={() => setActive(i)}
                     className={' b-l-1 b-t-1 b-r-1 m-r-1 p-1 cursor-pointer' + (tab.active ? ' bg-primary text-white' : '')}>{tab.label}</div>
            ))}
        </section>

    )
}