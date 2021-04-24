import React from 'react'

export default function Button(props) {
    const {
        onClick,
        children,
    } = props;
    return (
        <a className="button" onClick={onClick}>
           {children} 
        </a>
    )
}
