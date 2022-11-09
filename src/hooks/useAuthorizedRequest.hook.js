export const useAuthorizedRequest = () => {
    const request = async (url, method = "GET", body = null, headers = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("accessToken")}`
    }) => {
        try {
            // const _baseURL = "https://money-holder-server.herokuapp.com/api/";
            const _baseURL = "http://localhost:4000/api/";
            const response = await fetch(_baseURL + url, {method, body, headers, "credentials": "include"});

            if (!response.ok) {
                console.log("401 Error");
                const refreshRequest = await fetch("http://localhost:4000/api/refresh", {
                    "credentials": "include"
                })
                    .then(res => res.json())
                    .then(res => {
                        localStorage.setItem("accessToken", res.accessToken);
                    });
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            // if (response.status === 401) {
            //     console.log("401 Error")
            // }

            const data = await response.json();
            
            return await data;
        } catch (e) {

            throw e;
        }
    }

    return {request}
}

