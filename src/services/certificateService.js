import axios from "axios";

// Shared Axios instance for certificate API requests.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    params: {
        "subscription-key": import.meta.env.VITE_API_SUBSCRIPTION_KEY,
    },
});

export async function requestCertificate(formData) {
    const response = await api.post("/request-certificate", formData);

    return response.data;
}

/**
 * Fetches the existing certificate requests from the API.
 */
export async function getCertificateRequests() {
    const response = await api.get("/request-list");
    return response.data;
}
