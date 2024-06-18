import axios from "axios"

import Config from "../api/Config"
import { store } from "../redux/store"
import Crypto from "../security/Crypto"
import CookieServices from "./CookieServices"
import { COOKIE_KEYS } from "../utils/Constants"

class HttpServices {
    protected decryptSanctumTokenCookie() {
        const cipherText = CookieServices.get(COOKIE_KEYS.SANCTUM)

        return (cipherText != null)
            ? Crypto.decryptDataUsingAES256(cipherText)
            : null
    }

    async httpGet(url: string) {
        try {
            const GET_API_URL = Config.API_DOMAIN + url
            return await axios.get(GET_API_URL, this.axiosInstanceHeaders())
        } catch (error: any) {
            let ERR = {
                status: error.response?.status,
                message: error.message,
                code: error.code
            }

            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                let statusCode = error.response?.status;

                if (statusCode === 401) {
                    return this.revokeAuthenticatedSession();
                } else {
                    return ERR;
                }
            } else {
                // Handle other types of errors
                return ERR;
            }
        }
    }

    async httpPost(url: string, data: any, options: any = null) {
        try {
            const finalOptions = Object.assign(this.axiosInstanceHeaders(), options)
            const POST_API_URL = Config.API_DOMAIN + url

            return await axios.post(POST_API_URL, data, finalOptions);
        } catch (error: any) {
            const ERR = {
                status: error.response?.status,
                message: error.message,
                code: error.code
            }

            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                let statusCode = error.response?.status;

                if (statusCode === 401) {
                    return this.revokeAuthenticatedSession();
                } else {
                    return ERR;
                }
            } else {
                // Handle other types of errors
                return ERR;
            }
        }
    }

    async httpPut(url: string, data: any, options: any = null) {
        try {
            const finalOptions = Object.assign(this.axiosInstanceHeaders(), options)
            const PUT_API_URL = Config.API_DOMAIN + url

            return await axios.put(PUT_API_URL, data, finalOptions);
        } catch (error: any) {
            const ERR = {
                status: error.response?.status,
                message: error.message,
                code: error.code
            }

            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                let statusCode = error.response?.status;

                if (statusCode === 401) {
                    return this.revokeAuthenticatedSession();
                } else {
                    return ERR;
                }
            } else {
                // Handle other types of errors
                return ERR;
            }
        }
    }

    async httpDelete(url: string, options: any = null) {
        try {
            const finalOptions = Object.assign(this.axiosInstanceHeaders(), options)
            const DEL_API_URL = Config.API_DOMAIN + url

            return await axios.delete(DEL_API_URL, finalOptions);
        } catch (error: any) {
            const ERR = {
                status: error.response?.status,
                message: error.message,
                code: error.code
            }

            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                let statusCode = error.response?.status;

                if (statusCode === 401) {
                    return this.revokeAuthenticatedSession();
                } else {
                    return ERR;
                }
            } else {
                // Handle other types of errors
                return ERR;
            }
        }
    }

    async httpMultipartForm(url: string, data: any, options: any = null) {
        try {
            const finalOptions = Object.assign(this.axiosInstanceHeaders(true), options)
            const POST_API_URL = Config.API_DOMAIN + url

            return await axios.post(POST_API_URL, data, finalOptions);
        } catch (error: any) {
            const ERR = {
                status: error.response?.status,
                message: error.message,
                code: error.code
            }

            if (axios.isAxiosError(error)) {
                // Handle Axios-specific errors
                let statusCode = error.response?.status;

                if (statusCode === 401) {
                    return this.revokeAuthenticatedSession();
                } else {
                    return ERR;
                }
            } else {
                // Handle other types of errors
                return ERR;
            }
        }
    }

    axiosInstanceHeaders(multipart: boolean = false) {
        const contentType = multipart === true
            ? 'multipart/form-data'
            : 'application/json'

        return {
            headers: {
                'Content-Type': contentType,
                Authorization: "Bearer " + this.decryptSanctumTokenCookie(),
            }
        }
    }

    revokeAuthenticatedSession() {
        // store.dispatch(revokeAuthSession())
    }
}

export default new HttpServices()
