import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {

        setValue(event.target.value)
    }

    const onReset = () => {

        setValue('')
    }

    return {
        type,
        value,
        onChange,
        onReset 
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


    const getConfig = (newToken) => {
        return {
            headers: {
                Authorization: `bearer ${newToken}`
            }
        }
    }

    const create = async (data, token) => {
        const response = await axios.post(
            baseUrl,
            data,
            getConfig(token)
        )
        return response
    }

    const update = async (id, data) => {
        const response = await axios.put(`${baseUrl}/${id}`, data)

        return response;
    }

    const remove = async (id, token) => {

        const response = await axios.delete(
            `${baseUrl}/${id}`,
            getConfig(token)
        )
        return response
    }

    const service = {
        create,
        getAll,
        update,
        remove
    }

    return [
        resources, service
    ]
}

