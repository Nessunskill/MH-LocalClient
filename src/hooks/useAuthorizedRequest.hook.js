export const useAuthorizedRequest = () => {
    const request = async (url, method = "GET", body = null, headers = {
        "Content-Type": "application/json",
        "credentials": "include",
        "authorization": `Bearer ${localStorage.getItem("accessToken")}`
    }) => {
        try {
            const _baseURL = "https://moneyholder-server.herokuapp.com/api/";
            // const _baseURL = "http://localhost:4000/api/";
            const response = await fetch(_baseURL + url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();
            
            return await data;
        } catch (e) {
            throw e;
        }
    }

    return {request}
}

