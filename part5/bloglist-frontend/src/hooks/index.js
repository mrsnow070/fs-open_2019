import { useState } from 'react';

export const useField = (type) => {
    const [value, setValue] = useState('')
    const [style, setStyle] = useState({})

    const onChange = (event) => {
        setStyle({ backgroundColor: 'white' })
        setValue(event.target.value)
    }
    
    const onReset = () => {
        setStyle({ backgroundColor: '#fff0f0' })
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        onReset,
        style
    }
}

export const useResource = (baseUrl)=>{
    
}

