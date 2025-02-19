import axios from 'axios';
import { RANK_GM, RANK_OFFICER } from '../constants/users';

const BASE_URL = 'http://localhost:3001/';

export default class AuthService {
    constructor(domain) {
        this.domain = domain || BASE_URL;
    }

    login = (username, password) => {
        // Get a token
        return this.api('post', '/users/login', {
            data: {
                username,
                password
            }
        }).then(res => {
            this.setToken(res.tokens[0]);
            this.setProfile(res);
            return Promise.resolve(res);
        });
    };

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token;
    };

    setProfile = profile => {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile));
    };

    validRoute = () => {
        if (typeof window === 'undefined') {
            return false;
        }
        if (typeof window.localStorage === 'undefined') {
            return false;
        }
        return true;
    };

    getProfile = () => {
        // Retrieves the profile data from localStorage
        if (!this.validRoute()) return {};
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {};
    };

    isAdmin = () => {
        const profile = this.getProfile();
        const { rank } = profile;

        if (rank === RANK_GM || rank === RANK_OFFICER) {
            return true;
        }
        return false;
    };

    setToken = ({ token }) => {
        // Saves user token to localStorage
        localStorage.setItem('token', token);
    };

    getToken = () => {
        // Retrieves the user token from localStorage
        if (!this.validRoute()) return null;
        return localStorage.getItem('token');
    };

    logout = () => {
        // Clear user token and profile data from localStorage
        this.api('delete', '/users/logout').then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
        });
    };

    _checkStatus = response => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    };

    api = async (method, endpoint, options) => {
        // performs api calls sending the required authentication headers
        const newOptions = options;

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };

        if (this.loggedIn()) {
            headers['x-auth'] = this.getToken();
        }
        if (newOptions && newOptions.headers) {
            Object.keys(newOptions.headers).forEach(key => {
                headers[key] = newOptions.headers[key];
            });

            delete newOptions.headers;
        }

        return new Promise((resolve, reject) => {
            axios({
                method,
                url: endpoint,
                baseUrl: this.domain,
                headers,
                ...newOptions
            })
                .then(res => {
                    return resolve(res.data);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    };
}
