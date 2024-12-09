import { formAdminComponent } from './forms.js'
import { contentType } from './content.js'
import { OPTIONS,ADMIN } from "../tables/admin.js";
import { close_modals } from './modals.js';

export function mainCards(data){
    let body = data.map((d,i)=>{
        // let i_buton = `<div class="butons"><a><i id="see-${d.class_name}" class="fa-solid fa-eye"></i></a></div>`;
        let butons = `<div class="butons"><a><i id="add-${d.class_name}" class="fa-solid fa-plus b_form"></i></a><a><i id="edit-${d.class_name}" class="fa-solid fa-pen-to-square b_form"></i></a><a><i id="del-${d.class_name}" class="fa-solid fa-trash b_form"></i></a></div>`
        return `<div class="card c${i}"><h2>${d.title}</h2>${butons }</div>`;
    }).join('');
    return {
        content: `${body}`,
        events: () => {
            document.querySelectorAll(".b_form").forEach(b => {
                let tab = b.id.split("-")[1];
                let act = b.id.split("-")[0];
                b.addEventListener('click',function(){
                    formAdminComponent({table:ADMIN[tab],modal:'modal_f',action:act})
                })
            });
            // document.querySelector("#see-itinerario").addEventListener('click', function(){
            //     location.reload();
            // })
        }
    }
}
export function card_menu(){
    let modal = "modal_f"
    let body = Object.values(OPTIONS).map((o)=>{
    let butons = `<div class="butons"><a><i id="add-${o.name}" class="fa-solid fa-plus bt_menu_type"></i></a><a><i id="edit-${o.name}" class="fa-solid fa-pen-to-square bt_menu_type"></i></a><a ><i id="del-${o.name}" class="fa-solid fa-trash bt_menu_type"></i></a></div>`
        return `<section class="type_card"><div class="menu_c"><div>${o.title.table}</div><div>${butons}</div></div></section>`
    }).join('')
    body += `<div class="type_card"><button class="cancel">Cancelar</button></div>`
    contentType({
        content:body,
        events: () => {
            document.querySelector(".cancel").addEventListener('click',function(){close_modals('modal_f')})
            // console.log() 
            document.querySelectorAll(".bt_menu_type").forEach(b => {
                let tab = b.id.split("-")[1];
                let act = b.id.split("-")[0];
                b.addEventListener('click', () => {
                    document.querySelector(`.back_container`).classList.remove('hide')
                    document.querySelector(`.back_container .back`).addEventListener('click', () => {
                        document.querySelector(`.back_container`).classList.add('hide')
                        document.querySelector(`footer`).innerHTML= " "
                        card_menu()
                    })
                    formAdminComponent({table:OPTIONS[tab],modal:modal,action:act})
                })
            });
        }
    })
}