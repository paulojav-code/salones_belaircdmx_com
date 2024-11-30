import { LS_VAR_LOGIN } from "../const.js";
import { ADMIN } from "../tables/admin.js";
import { open_modal, close_modals } from './modals.js';

let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));

export async function formAdminComponent({table,modal}){
    let tab = ADMIN[table];
    let body = Object.keys(tab.columns).map(c => {
        return `<div><article><label>${tab.columns[c].title}</label><input id="e-${c}" class="input_form"></input></article></div>`;
    }).join('');
    document.querySelector(`#${modal} .form_table`).innerHTML = body;
    document.querySelector(`#${modal} footer`).innerHTML = `<button class="send">enviar</button><button class="cancel">cancelar</button>`;

    document.querySelector(`#${modal} .cancel`).addEventListener('click',function(){
        close_modals(modal)
    });

    document.querySelector(`#${modal} .send`).addEventListener('click',function(){
        let json = {
            token: jwt.token,
            tab:tab.name,
            action:"insert",
            columns:{}
        }

        document.querySelectorAll(`#${modal} .form_table .input_form`).forEach(e => {
            let i = e.id.split('-')[1];
            json.columns[i] = e.value;
        });

        console.log(json);
    });

    open_modal(modal);
}