import authService from "@/services/authService";
let user = null
if(sessionStorage.getItem('user')){
    user = JSON.parse(sessionStorage.getItem('user'));
}

export default {
    mutations: {
        setUser(state, user){
            state.user = user;
            sessionStorage.setItem('user', JSON.stringify(user));
        },
        setToken(state, token){
            state.token = token;
            sessionStorage.setItem('token', token);
        }
    },
    state: {
        user: user,
        token: sessionStorage.getItem('token') || null
    },
    actions: {
        async login({commit}, credentials){
            try{
                const authCall = await authService.login(credentials);
                commit('setUser', authCall.user)
                commit('setToken', authCall.token)
                return true;
            } catch (e) {
                return false;
            }
        }
    },
    getters: {
        isLoggedIn(state){
            return state.user
        }
    }
}