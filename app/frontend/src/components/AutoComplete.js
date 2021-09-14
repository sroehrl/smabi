import {useState, useRef} from "react";

export default function AutoComplete({setter, options, type = 'text', label, key}){
    const [input,setInput] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [preselected, setPreselected] = useState(0);
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
                updateInput(suggestions[preselected].name);
                inputField.current.blur()
                break;
            default:
                setInput(ev.target.value)
                break;
        }
    }
    const updateInput = value => {
        setInput(value)
        setter(value)
        reset()
    }
    const reset = () =>{
        setPreselected(0);
        setSuggestions([])
    }
    return(
        <div className={'position-relative'}>
            <div className="input position-relative">
                <input ref={inputField} onFocus={reset} onKeyDown={keydown} autoComplete={'list'} value={input} onChange={autocomplete} type={type} placeholder={label} />
                <label>{label}</label>
                <div className={'select-options'}>
                    {suggestions.map((suggestion,i) => (
                        <div key={suggestion.code} onClick={() => updateInput(suggestion.name)} className={i === preselected ? 'bg-gray-25' : ''}>{suggestion.name}</div>
                    ))}
                </div>
            </div>

        </div>

    )
}