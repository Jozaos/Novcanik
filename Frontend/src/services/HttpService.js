import axios from "axios";


export const HttpService = axios.create({

    baseURL: 'https://wallet.runasp.net/swagger/index.html',
    headers: {
        'Content-Type' : 'application/json'
    }


});