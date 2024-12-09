import { SERVICES_LIST } from "../const.js";
import { mainCards,card_menu } from './cards.js';
import { contentComponent } from "./content.js";
import { modalsComponent, modalForm,open_modal } from "./modals.js";
export function headerComponent({username,name,title,page,back,add,logo,desc}){

    let button_modal = "";
    if(desc){
        button_modal = `<article class="desc_forms"><div><button class="desc_button">${desc}</button></div></article>`
    }
    document.querySelector(`#main header`).innerHTML = `<article class="title_info">
        <div class="menu_container"><button id="button_menu"><i class="fa-solid fa-bars"></i></button></div>
        <div class="header_title_container"><h3>${title}</h3><div id="button_new_container" class="hide"><button>Opciones</button></div></div>
        <article class="users_info">
            <label><i class="fa-solid fa-user"></i><span>${username}</span></label>
            <button id="button_logout"><i class="fa-solid fa-right-from-bracket"></i></button>
        </article>
    </article>
    ${button_modal}`

    document.querySelector('#button_menu').addEventListener('click',function(){
        let cards = mainCards(SERVICES_LIST);
        console.log(cards)
        contentComponent({
            content: `${cards.content}`,
            events: () => {
                cards.events();
            }
        })
        let modal_form = modalForm({});

        modalsComponent({
            content: `${modal_form.content}`,
            events: () => {
                modal_form.events();
            }
        });
        document.querySelector('.header_title_container').querySelector("h3").textContent = "Menu"
        document.querySelector('#button_menu').querySelector(".fa-solid ").className = "fa-solid fa-arrow-left"
        document.querySelector('#button_menu').id = "back";
        document.querySelector('#back').addEventListener('click', () => {location.reload();})
        document.querySelector("#button_new_container").classList.remove('hide');
        document.querySelector("#button_new_container").addEventListener("click",() => {
            card_menu()
            open_modal('modal_f')
        })
    })
    document.querySelector(`#button_logout`).addEventListener('click',function(){localStorage.clear();location.reload();});
}