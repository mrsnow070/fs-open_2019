import { useState } from 'react';
import axios from 'axios';

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

export const useResource = (url) => {
    const [baseUrl] = useState(url);
    const [token, setToken] = useState(null)
    const [config, setConfig] = useState(null);

    const updateConfig = (newToken) => {
        setToken(`bearer ${newToken}`);
        setConfig({
            headers: {
                Authorization: token
            }
        })
    }

    const getAll = () => {
        const request = axios.get(baseUrl)
        return request.then(response => response.data)
    }

    const create = async (newBlog) => {

        const response = await axios.post(baseUrl, newBlog, config)

        return response
    }



    return {
        getAll,
        create,
        updateConfig
    }
}

