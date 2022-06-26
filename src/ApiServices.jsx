export const LOCAL_API_URL = "http://192.168.43.220:4000/";
export const LIVE_API_URL = "https://task-node-react.herokuapp.com/";
export const BASE_API_URL = `${LIVE_API_URL}api/v1`;

export const CHECK_AUTH_API = `${BASE_API_URL}/me`;
export const LOGIN_API = `${BASE_API_URL}/login`;
export const SIGNUP_API = `${BASE_API_URL}/signup`;
export const GET_TODO_LIST_API = `${BASE_API_URL}/todo`;
export const ADD_TODO_API = `${BASE_API_URL}/add/todo`;
export const DELETE_TODO_API = `${BASE_API_URL}/delete/todo`;
export const COMPLETE_TODO_API = `${BASE_API_URL}/complete/todo`;
