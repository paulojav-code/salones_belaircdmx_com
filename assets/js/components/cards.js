import { MODAL_FORM ,modal_form} from "./modales.js"
import { ceate_form } from "./form.js";
export async function create_card(data) {
    data.forEach((d,i) => {
        let i_buton = `<div class="butons"><a><i id="add_${d.class_name}" class="fa-solid fa-eye"></i></a></div>`;
        let butons = `<div class="butons"><a><i id="add_${d.class_name}" class="fa-solid fa-plus b_form"></i></a><a><i id="edit_${d.class_name}" class="fa-solid fa-pen-to-square b_form"></i></a><a><i class="fa-solid fa-trash"></i></a></div>`
        let card = `<div class="card c${i}"><h2>${d.title}</h2>${ d.class_name == "itinerario" ? i_buton : butons }</div>`
        document.querySelector(".content").insertAdjacentHTML('beforeend', card);;
    });
    document.querySelector(".content").insertAdjacentHTML('beforeend',MODAL_FORM,)

    document.querySelectorAll(".b_form").forEach(b => {
        let tab = b.id.split("_")[1];
        b.addEventListener('click',function(){
            modal_form(tab);
            ceate_form(tab);
        })
    });
}