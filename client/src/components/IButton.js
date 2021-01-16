import React from 'react'
import "./IButton.css"
const IButton = ({label, onClick, color="primary", type="button"}) => {
    return (
    <button onClick={onClick} type={type} className={"i-button " + color}>{label}</button>
    )
}

export default IButton
