import { useState, useEffect } from 'react';
import axios from "axios";
export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (url) => {
    const [resources, setResources] = useState([])
    const [baseUrl] = useState(url);

    useEffect(() => {
        const fetchInitialData = async () => {
            const response = await axios.get(url);
            setResources(response.data)
        }

        fetchInitialData();
    }, [url])

    const getAll = async () => {
        const response = await axios.get(baseUrl);
        setResources(response.data)
    }

    const create = async (data) => {
        const response = await axios.post(
            baseUrl,
            data
        )
        return response
    }


    const service = {
        create,
        getAll
    }

    return [
        resources, service
    ]
}
