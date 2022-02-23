import {useState, useRef, useEffect} from "react";

export default function AutoComplete({setter, options, type = 'text', label, indexKey, passedInValue, asSelect, noFloatingLabel}){
    const [input,setInput] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [preselected, setPreselected] = useState(0);
    useEffect(()=>{
        if(typeof passedInValue !== 'undefined'){

            if(indexKey){
                setInput(options.find(x => x[indexKey] === passedInValue).name)
            } else {
                setInput(passedInValue)
            }
        }
    },[passedInValue,indexKey,options])
    const autocomplete = ev => {
        setSuggestions(options.filter(options => options.name.toLowerCase().startsWith(ev.target.value.toLowerCase())))
        setInput(ev.target.value)
    }
    const inputField = useRef();
    const keydown = ev => {
        switch (ev.code) {
            case 'ArrowDown':
                setPreselected(old => old+1)
                break;
            case 'ArrowUp':
                setPreselected(old => old-1)
                break;
            case 'Enter':
                updateInput(suggestions[preselected].name, true);
                inputField.current.blur()
                break;
            default:
                setInput(ev.target.value)
                break;
        }
    }
    const updateInput = (value, final) => {
        setInput(value)
        if(indexKey){
            setter(options.find(x => x.name === value)[indexKey])
        } else {
            setter(value)
        }
        reset(final)
    }
    const reset = final =>{
        setPreselected(0);
        if(asSelect &&  !final){
            setSuggestions(options)
        } else {
            setSuggestions([])
        }

    }
    return(
        <div className={'position-relative'}>
            <div className="input position-relative">
                <input ref={inputField} onFocus={()=>reset(false)} onKeyDown={keydown} autoComplete={'list'} value={input} onChange={autocomplete} type={type} placeholder={label} />
                {!noFloatingLabel &&<label>{label}</label>}
                <div className={'select-options'}>
                    {suggestions.map((suggestion,i) => (
                        <div key={i} onClick={() => updateInput(suggestion.name,true)} className={i === preselected ? 'bg-gray-25' : ''}>{suggestion.name}</div>
                    ))}
                </div>
            </div>

        </div>

    )
}