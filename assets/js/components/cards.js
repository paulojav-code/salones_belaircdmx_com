import { formAdminComponent } from './forms.js'

export function mainCards(data){
    let body = data.map((d,i)=>{
        let i_buton = `<div class="butons"><a><i id="add-${d.class_name}" class="fa-solid fa-eye"></i></a></div>`;
        let butons = `<div class="butons"><a><i id="add-${d.class_name}" class="fa-solid fa-plus b_form"></i></a><a><i id="edit_${d.class_name}" class="fa-solid fa-pen-to-square b_form"></i></a><a><i class="fa-solid fa-trash"></i></a></div>`
        return `<div class="card c${i}"><h2>${d.title}</h2>${ d.class_name == "itinerario" ? i_buton : butons }</div>`;
    }).join('');
    return {
        content: `${body}`,
        events: () => {
            document.querySelectorAll(".b_form").forEach(b => {
                let tab = b.id.split("-")[1];
                b.addEventListener('click',function(){
                    formAdminComponent({table:tab,modal:'modal_f'})
                })
            });
        }
    }
}