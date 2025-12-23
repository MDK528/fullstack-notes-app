import React from 'react'

function Textarea({placeholder, className, value, onChange, disabled, onClick, readOnly})
{
    return (
            <textarea
                className={className}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                onClick={onClick}
                readOnly = {readOnly}
            ></textarea>
    )
}

export default Textarea