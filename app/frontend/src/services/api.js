import axios from 'axios';


let config = {
    baseURL: process.env.VUE_APP_ROOT_API,
    timeout: 6000,
    headers: {'X-Custom-Header': 'smabi'}
};


const API = axios.create(config);
API.interceptors.request.use(exitingConfig => {
    if(sessionStorage.token){
        exitingConfig.headers.Authorization =  `Bearer ${sessionStorage.token.replace('"','')}`;
    }
    return exitingConfig;
})

export default API;

// HACK: when in dev-mode
if (typeof webpackHotUpdate !== 'undefined' && webpackHotUpdate) {
    API.interceptors.request.use(exitingConfig => {
        exitingConfig.params = {
            XDEBUG_SESSION_START: 'PHPSTORM',
            ...config.params
        }

        return exitingConfig;
    })
}
