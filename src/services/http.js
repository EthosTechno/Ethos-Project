import axios from "axios";
import { useToast } from 'vue-toastification';
import authHeader from './auth-header';

const API_URL = import.meta.env.VITE_APP_API_URL;

export default class Http {
    static get(url) {
        return new Promise((resolve, reject) => {
            let token = authHeader();
            axios({
                method: "get",
                url: `${API_URL}${url}`,
                headers: token,
            })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                          });
                          localStorage.removeItem('user')
                        router.push('sign-in');
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 500) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }
    static getwithparams(url, params) {
        return new Promise((resolve, reject) => {
            let token = authHeader();
            axios({
                method: "get",
                url: `${API_URL}${url}`,
                headers: token,
                params: params,
            })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                          });
                          localStorage.removeItem('user')
                          router.push('sign-in');
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 500 ) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }
    static post(url, body) {
        return new Promise((resolve, reject) => {
            let token = authHeader();
            axios({
                method: "post",
                url: `${API_URL}${url}`,
                data: body,
                headers: token,
            })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                          });
                          localStorage.removeItem('user')
                          router.push('sign-in');
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 500) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }
    static postResType(url, body) {
        return new Promise((resolve, reject) => {
            let token = authHeader();
            axios({
                method: "post",
                url: `${API_URL}${url}`,
                data: body,
                headers: token,
                responseType: "blob"
            })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                          });
                          localStorage.removeItem('user')
                          router.push('sign-in');
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 500) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }
    static postnotoken(url, body) {
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: `${API_URL}${url}`,
                data: body,
            })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                        });
                        localStorage.removeItem('user')
                        router.push('sign-in');
                    }
                    else if(error.response.status == 500 ) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }
    static postnobody(url) {
        return new Promise((resolve, reject) => {
            let token = authHeader();
            axios({
                method: "post",
                url: `${API_URL}${url}`,
                headers: token,
            })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                        });
                        localStorage.removeItem('user')
                        router.push('sign-in');
                    }
                    else if(error.response.status == 500) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }
    static postrequestmultipart(url, body) {
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem("token");
            axios({
                method: "post",
                url: `${API_URL}${url}`,
                data: body,
                headers: {
                    Authorization: `Bearer ${token}`,
                    contentType: "multipart/form-data",
                },
            })
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                        });
                        localStorage.removeItem('user')
                        router.push('sign-in');
                        
                    }
                    else if(error.response.status == 500) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }

    static put(url, body) {
        return new Promise((resolve, reject) => {
            let token = authHeader();
            axios({
                method: "put",
                url: `${API_URL}${url}`,
                data: body,
                headers: token,
            })
                .then(function (response) {
                    if (response.data && response.data.success) {
                        resolve(response.data);
                    } else {
                        reject(response.data);
                    }
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                          });
                          localStorage.removeItem('user')
                          router.push('sign-in');
                    }
                    else if(error.response.status == 500) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }
    static delete(url, params) {
        return new Promise((resolve, reject) => {
            let token = authHeader();
            axios({
                method: "delete",
                url: `${API_URL}${url}`,
                headers: token,
                params: params,
            })
                .then(function (response) {
                    if (response && response) {
                        resolve(response);
                    } else {
                        reject(response.data);
                    }
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                        });
                        localStorage.removeItem('user')
                        router.push('sign-in');
                    }
                    else if(error.response.status == 500) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }
    static deletewithbody(url, body) {
        return new Promise((resolve, reject) => {
            let token = authHeader();
            axios({
                method: "delete",
                url: `${API_URL}${url}`,
                data: body,
                headers: token,
            })
                .then(function (response) {
                    if (response.data && response.data.success) {
                        resolve(response.data);
                    } else {
                        reject(response.data);
                    }
                })
                .catch(function (error) {
                    if (error.response.status === 404) {
                        useToast().error("Invalid URL request", {
                            timeout: 3000
                        });
                    }
                    else if(error.response.status == 400) {
                        useToast().error(error.response.data.Errors[0],{
                            timeout: 3000
                          });
                    }
                    else if(error.response.status == 401) {
                        useToast().error("Your session is expired. Please login again.",{
                            timeout: 3000
                          });
                        localStorage.removeItem('user')
                        router.push('sign-in');
                    }
                    else if(error.response.status == 500) {
                        useToast().error('Sorry something went wrong',{
                          timeout: 3000
                        });
                    }
                    reject(error);
                });
        });
    }
}
