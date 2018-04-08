// import axios from "axios";
//
// const API_HOST = "http://localhost:3005";
//
// const getUrl = endpoint => API_HOST + endpoint;
//
// export const post = async (endpoint, data) => {
//     return axios.post(getUrl(endpoint), data, {
//         headers: { "Content-Type": "application/json" }
//     });
// };
//
// export const get = async (endpoint, jwt) => {
//     const headers = jwt
//         ? {
//             headers: { Authorization: `Bearer ${jwt}` }
//         }
//         : null;
//     return axios.get(getUrl(endpoint), headers);
// };
