import axios from 'axios';

const baseUrl='http://localhost:3068';

export const axiosClient=axios.create({
    baseURL:baseUrl,
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
    }
})