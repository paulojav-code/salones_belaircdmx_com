import { formAdminComponent } from './forms.js'

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
                    formAdminComponent({table:tab,modal:'modal_f',action:act})
                })
            });
            // document.querySelector("#see-itinerario").addEventListener('click', function(){
            //     location.reload();
            // })
        }
    }
}