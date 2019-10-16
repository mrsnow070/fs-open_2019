import axios from 'axios';
const baseUrl = '/api/login';


export const login = async (payload) => {
    const response = await axios.post(baseUrl, payload)
    
    return response;
}



