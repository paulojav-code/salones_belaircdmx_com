import { formAdminComponent } from './forms.js';

export function modalsComponent({content,events}){
    let modal = document.createElement('div');
    modal.classList.add('modals');
    modal.innerHTML = content;
    document.querySelector(`#main`).append(modal);
    events();
}

export function modalForm(){
    let id = `modal_f`
    return {
        content: `<dialog  id="${id}">
            <header>
                <button class="close"><i class="fa-solid fa-x"></i></button>
            </header>
            <div class="form_table"></div>
            <footer></footer>
        </dialog>`,
        events: () => {
            document.querySelector(`#${id} .close`).addEventListener('click',function(){
                close_modals(id)
            });
        }
    }
}

export function open_modal(id){
    document.querySelector(`#${id}`).showModal();
}
export function close_modals(id) {
    document.querySelector(`#${id}`).close();
}