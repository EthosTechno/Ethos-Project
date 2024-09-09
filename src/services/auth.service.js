import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL

class AuthService {
    async login(user) {
        const response = await axios
            .post(API_URL + 'AuthManagement/Login', {
                email: user.email,
                password: user.password
            })
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    }

    SendForgotPasswordEmail(body){
       return  axios.post(API_URL + 'Admin/User/SendForgotPasswordEmail', body)
    }
}

export default new AuthService();