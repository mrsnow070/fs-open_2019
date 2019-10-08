import axios from 'axios';

const baseUrl = '/api/persons';

export const getAll = () => {
    return axios.get(baseUrl)
        .then(resp => resp.data)
}

export const postAddEntry = (data) => {
    return axios.post(baseUrl, data)
        .then(resp => resp)
}

export const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export const putUpdateNumber = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
}

export const getByName = name => {
    return axios.get(baseUrl)
        .then(resp => resp.data.filter((person) => {

            return person.name === name
        }))
}




