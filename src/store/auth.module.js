import AuthService from '../services/auth.service';
import { useToast } from 'vue-toastification'
const toast = useToast()
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          if(error.response.data) {
            localStorage.setItem('setError',error.response.data.errors[0])
            // toast.error(error.response.data.errors[0],{
            //   timeout: 3000
            // });
          }
          else if(error.response.status == 500) {
            toast.error('Sorry something went wrong',{
              timeout: 3000
            });
          }
          else if(error.response.status == 404) {
            toast.error('Invalid URL request',{
              timeout: 3000
            });
          }
          
        }
      )
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    }
  }
};