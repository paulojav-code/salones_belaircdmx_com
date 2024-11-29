import { request_api } from "../utils.js";
import { URL_API_LOGIN, LS_VAR_LOGIN } from "../const.js";

export function page_login(){
    document.querySelector(`#main .content`).innerHTML = `<section id="login"><article class="user">
            <label for="login_user">Usuario</label>
            <input type="text" id="login_user">
        </article>
        <article class="user">
            <label for="login_pass">Contraseña</label>
            <input type="password" id="login_pass">
        </article>
        <article class="buttons">
            <button id="login_button" class="action">Acceder</button>
        </article></section>`;

    document.querySelector(`#login_button`).addEventListener('click',async function(){
        console.log(URL_API_LOGIN)
        let res = await request_api({
            url:URL_API_LOGIN,
            json:{
                username: document.querySelector(`#login_user`).value,
                password: document.querySelector(`#login_pass`).value
            }
        });
        localStorage.setItem(LS_VAR_LOGIN, JSON.stringify(res));
        location.reload();
        
    });
}

export async function jwt_valid(d){
    return await request_api({
        url:URL_API_LOGIN,
        json:{
            token: d.token
        }
    });
}