import {useCallback, useMemo, useRef, useState} from "react";
import debounce from "../utils/debounce";

export default function SearchBox({service, label, component: Component}) {
    const [results, setResults] = useState([])
    const [selected, setSelected] = useState(0)
    const [externalTrigger, setExternalTrigger] = useState(false)

    // eslint-disable-line react-hooks/exhaustive-deps
    const updateResults = useMemo(()=>debounce(val => {
        service.find(val).then(setResults)
    }, 200), [service])

    const inputField = useRef()
    const clear = () => {
        setResults([]);
        setExternalTrigger(false)
        setSelected(0)
        inputField.current.value = ''
    }
    const evaluateKey = ev => {
        switch (ev.code) {
            case 'ArrowRight':
                setSelected(old => old + 1)
                break;
            case 'ArrowLeft':
                setSelected(old => old - 1)
                break;
            case 'Enter':
                ev.preventDefault()
                setExternalTrigger(true)
                break;
            default:
                break;
        }
    }
    return (
        <div className={'position-relative w-100p'}>
            <div className="input">
                <input minLength={3} name="search" autoComplete={'off'}
                       ref={inputField}
                       onKeyDown={evaluateKey}
                       onChange={ev => updateResults(ev.target.value)}
                       placeholder={label}/>
                <label>{label}</label>
                <div className="input-error">At least 3 characters!</div>
            </div>
            <div className="position-absolute w-100p" style={{zIndex: 2}}>
                <div className="grid-4-4-4">
                    {results.map((res, i) => <Component key={res.id} trigger={externalTrigger} result={res}
                                                        clear={clear} isSelected={i === selected}/>)}
                </div>
            </div>

        </div>

    )
}