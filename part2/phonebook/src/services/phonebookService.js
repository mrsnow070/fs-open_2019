import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const getAll = () => {
    return axios.get(baseUrl)
        .then(resp => resp.data)
        .catch(error => console.log('fail ', error));
}

export const postAddEntry = (data) => {
    return axios.post(baseUrl, data)
        .then(resp => resp)
}

export const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

export const putUpdateNumber = (id, number) => {
    return axios.put(`${baseUrl}/${id}`, number)
}




