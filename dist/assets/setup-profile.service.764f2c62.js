import{Q as e}from"./index.07cdec20.js";const r="http://203.109.113.154:8092/api/";class t{checkUserEmailConfirm(s){return e.get(`${r}Admin/User/CheckUserEmailConfirm?userId=${s}`)}updateUserPassword(s){return e.post(`${r}Admin/User/UpdateUserPassword`,s)}CheckResetPasswordLink(s){return e.get(`${r}Admin/User/CheckResetPasswordLink?resetPasswordToken=${s}`)}ResetUserPassword(s){return e.post(`${r}Admin/User/ResetUserPassword`,s)}}var i=new t;export{i as s};