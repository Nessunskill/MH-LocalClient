import axios from "axios";

const _url = "https://moneyholder-server.herokuapp.com/";

const $axios = axios.create({
    baseURL: _url,
    withCredentials: true,
});

$axios.interceptors.request.use(
    async config => {
        let token = localStorage.getItem("accessToken");
        config.headers.authorization = `Bearer ${token}`;
        return config
});

$axios.interceptors.response.use(function (response) {
    return response;

},  async function (error) {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;

            try {
                await axios.get("https://moneyholder-server.herokuapp.com/refresh", {withCredentials: true})
                    .then(res => res.data)
                    .then(res => {
                        localStorage.setItem("accessToken", res.accessToken);
                    })

                const oldData = JSON.parse(originalRequest.data);

                return await $axios.post(originalRequest.url, oldData);
            } catch (e) {
                console.log("Вы не авторизованы...");
            }
        }

        throw error;
})

export default $axios;