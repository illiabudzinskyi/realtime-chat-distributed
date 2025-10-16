import axios from 'axios';

const USER_SERVICE = import.meta.env.VITE_USER_SERVICE
const CHAT_SERVICE = import.meta.env.VITE_CHAT_SERVICE

export const userApi = axios.create({
    baseURL: USER_SERVICE,
    headers: { 'Content-Type': 'application/json' }
});

export const chatApi = axios.create({
    baseURL: CHAT_SERVICE,
    headers: { 'Content-Type': 'application/json' }
});