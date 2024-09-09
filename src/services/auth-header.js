import { useRoute, useRouter } from 'vue-router'
import router from '../router';
export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        return { "Authorization": 'Bearer ' + user.token, "Access-Control-Allow-Origin":"http://localhost:3000" };
    } else {
        router.push("/")
    }
}