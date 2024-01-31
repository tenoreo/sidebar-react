import { axiosClient } from "./axiosClient";

const getPerYear=()=>{
    return axiosClient.post('/estadistica/ano',{

    });
}

const getPerMonth=()=>{
    return axiosClient.post('/estadistica/mes',{

    });
}
const getPerDay=()=>{
    return axiosClient.post('/estadistica/dia',{

    });
}

export {
    getPerDay,
    getPerMonth,
    getPerYear
}
