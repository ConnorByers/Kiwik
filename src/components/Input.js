import React from 'react'
import useWindowDimensions from './useWindowDImensions.js';

export default function Input(props) {
    const { 
        value,
        setValue,
        type,
        id,
        placeholder,
    } = props;
    const { height, width } = useWindowDimensions(); 
    return (
        <div className="inputWrapper">
            {value && type !== 'textarea' && <p className="inputLabel">{placeholder}</p>}
            {type === 'textarea' ?
                <textarea className="InputStyle" onChange={(e) => setValue(e.target.value)} id={id} name={id} value={value} placeholder={placeholder} rows="5" cols={width > 600 ? 50 : 20} />
                :
                <input className="InputStyle" onChange={(e) => setValue(e.target.value)} id={id} name={id} type={type} value={value} placeholder={placeholder} />
            }
        </div>
    )
}
