import axios from "axios";


export const HttpService = axios.create({

    baseURL: 'https://wallet.runasp.net/api/v1',
    headers: {
        'Content-Type' : 'application/json'
    }


});