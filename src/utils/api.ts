import axios from 'axios'

export const api = axios.create({
    baseURL: '',
    withCredentials: true,
});

let logoutHandler: () => void = () => {};

export const injectLogoutHandler = (handler: () => void) =>{
    logoutHandler = handler;
}

api.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                await axios.post('/auth/refresh',{},{withCredentials:true});
                return api(originalRequest);
            }catch(refreshError){
                logoutHandler();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error)
    }
)