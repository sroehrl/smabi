import {useCallback, useEffect, useRef, useState} from "react";
import debounce from "../utils/debounce";

export default function SearchBox({service, label, component:Component}){
    const [results, setResults] = useState([])

    const updateResults = useCallback(debounce(val=>{service.find(val).then(setResults)},300),[])

    const inputField = useRef()
    const clear = () => {
        setResults([]);
        inputField.current.value = ''
    }
    return(
        <div className={'position-relative w-100p'}>
            <div className="input">
                <input minLength={3} name="search"
                       ref={inputField}
                       onChange={ev => updateResults(ev.target.value)}
                       placeholder={label}/>
                <label>{label}</label>
                <div className="input-error">At least 3 characters!</div>
            </div>
            <div className="position-absolute w-100p">
                <div className="grid-4-4-4">
                    {results.map(res => <Component key={res.id} result={res} clear={clear}/>)}
                </div>
            </div>

        </div>

    )
}