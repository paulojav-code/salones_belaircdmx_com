import { ADMIN } from "../tables/admin.js";
export async function ceate_form(tab){
    let table = ADMIN[tab];
    let body = "";
    Object.keys(table.columns).forEach(c => {
        body += `<div><article><label>${c}</label><input></input></article></div>`
    })
    document.querySelector(".form_table").innerHTML = body;
    console.log(table);
}