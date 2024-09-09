import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;
class setupProfile {

    checkUserEmailConfirm(data) {
        return axios.get(`${API_URL}Admin/User/CheckUserEmailConfirm?userId=${data}`)
    }

    updateUserPassword(body) {
        return axios.post(`${API_URL}Admin/User/UpdateUserPassword`,body)
    }

    CheckResetPasswordLink(data) {
        return axios.get(`${API_URL}Admin/User/CheckResetPasswordLink?resetPasswordToken=${data}`)
    }

    ResetUserPassword(body){
        return axios.post(`${API_URL}Admin/User/ResetUserPassword`,body)
    }

}

export default new setupProfile();