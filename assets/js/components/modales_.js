import { LS_VAR_LOGIN } from "../const.js";
let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));
// import { DESCRIPTIONS,ADMIN_TABLE } from "../template/tables/admin.js"
// export const MODAL_DESC = `
//     <dialog id="modal_d">
//     <div class="header_desc">
//             <button class="close_modal_d"><i class="fa-solid fa-x"></i></button>
//     </div>
//         <div class="content_desc">
//         ${DESCRIPTIONS.map((i)=>{
//             let t = ADMIN_TABLE[i];
//             return `<button id="button-element-edit-${i}" class="options_desc element_edit_desc">${t.title.table||t.name}</button>`
//         }).join('')}
//         </div>
//         <div class="form_desc">Formulario</div>
        
//     </dialog>
//     `;

    export const MODAL_FORM = `
    <dialog  id="modal_f">
    <div class="header_desc">
        <button class="close_modal_f"><i class="fa-solid fa-x"></i></button>
    </div>
    </div>
        <div class="form_table"></div>
        <div class="modal_buttons"><button class="enviar">enviar</button><button class="cancelar">cancelar</button></div>
    </dialog>
    `

    // export const MODAL_NEW = `
    // <dialog id="modal_a">
    // <div class="header_desc">
    //     <button class="close_modal_n"><i class="fa-solid fa-x"></i></button>
    // </div>
    // </div>
    //     <div class="form_new_item"></div>
    // </dialog>
    // `

// export async function modal_desc(){
//     document.querySelector(".desc_button").addEventListener("click",()=>{
//         document.querySelector(".form_desc").innerHTML=""
//         modal_d.showModal();
//         document.querySelector(".close_modal_d").addEventListener("click",()=>{
//             modal_d.close();
//         })
//     })
    
// }

export async function modal_form(b){
    document.querySelector(".close_modal_f").addEventListener("click",() => {
        modal_f.close();
    });
    document.querySelector(".cancelar").addEventListener("click",() => {
        close_modals();
    });
    // document.querySelector(".enviar").addEventListener("click",() => {
    //     let body = Array.from(document.querySelectorAll("input")).map(i => i.value);
    //     //recorrer columnas y valores IMPORTANTEEEEEEEEEEE AQUI VAS 
    //     let json = {
    //         token: jwt.token,
    //         tab:b,
    //         action:"insert",
    //         columns:{}
    //     }
    //     close_modals ()
    //     console.log(body);
    // })
    // 
}

// export async function modal_new(){
//     modal_a.showModal();
//     document.querySelector(".close_modal_n").addEventListener("click",()=>{
//         modal_a.close();
//     })
// }
export function open_modal(){
    modal_f.showModal();
}
export function close_modals() {
    // modal_a.close();
    // modal_d.close();1
    modal_f.close();
    // document.querySelector(".form_new_item").innerHTML=""
    document.querySelector(".form_table").innerHTML = "";
    // document.querySelector(".form_desc").innerHTML=""
}


// function send () {
    
// }