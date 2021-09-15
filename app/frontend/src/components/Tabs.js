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
                     className={'m-r-1 p-y-1 p-x-3 cursor-pointer b-b-2' + (tab.active ? ' b-primary ' : ' b-transparent')}>{tab.label}</div>
            ))}
        </section>

    )
}