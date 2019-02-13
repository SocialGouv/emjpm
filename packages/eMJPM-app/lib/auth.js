// import redirect from "./redirect";
// import { setCookie, getCookie, removeCookie } from "./session";
// import { authenticate } from "../services/authApi";
// import { createUser } from "../services/userApi";
// import { validateCredentials, validateNewUser } from "./validation";
// import cookie from 'react-cookie'
//
// export const signIn = async (email, password) => {
//     const error = validateCredentials(email, password);
//     if (error) {
//         return error;
//     }
//
//     const res = await authenticate(email, password);
//     if (!res.jwt) {
//         return res;
//     }
//
//     setCookie("jwt", res.jwt);
//     redirect("/");
//     return null;
// };
//
// export const signUp = async (name, email, password, password_confirmation) => {
//     const error = validateNewUser(name, email, password, password_confirmation);
//     if (error) {
//         return error;
//     }
//
//     const res = await createUser(name, email, password, password_confirmation);
//
//     if (!res.data) {
//         return res;
//     }
//
//     setCookie("success", `${name}, your account was created.`);
//     redirect("/login");
//     return null;
// };
//
// export const signOut = (ctx = {}) => {
//     if (process.browser) {
//         removeCookie("jwt");
//         redirect("/login", ctx);
//     }
// };
//
// export const getJwt = ctx => {
//     return getCookie("jwt", ctx.req);
// };
//
// export const isAuthenticated = ctx => !!getJwt(ctx);
//
// export const redirectIfAuthenticated = ctx => {
//     if (isAuthenticated(ctx)) {
//         redirect("/", ctx);
//         return true;
//     }
//     return false;
// };
//
// export const redirectIfNotAuthenticated = ctx => {
//     if (!isAuthenticated(ctx)) {
//         redirect("/login", ctx);
//         return true;
//     }
//     return false;
// };
