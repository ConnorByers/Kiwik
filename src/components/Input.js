import React from 'react'

export default function Input(props) {
    const { 
        value,
        setValue,
        type,
        id,
        placeholder,
    } = props;
    return (
        <div className="inputWrapper">
            {value && <p className="inputLabel">{placeholder}</p>}
            <input className="InputStyle" onChange={(e) => setValue(e.target.value)} id={id} name={id} type={type} value={value} placeholder={placeholder} />
        </div>
    )
}
