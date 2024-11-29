import { change_title_header } from "./header.js";

export async function print_table({header_title,body,buttons,admin,type_modal}){
    const body_content = await body();
    if(body_content){
        if(type_modal){
            if(type_modal === "modal_table_desc"){document.querySelector(`.form_table`).innerHTML = body_content}
            else if( type_modal === "modal_desc"){document.querySelector(`.form_desc`).innerHTML = body_content}
            else{
                    document.querySelector(`.form_new_item`).innerHTML = body_content
            }
        }
        else{
            change_title_header(header_title);
            document.querySelector(`.show_table`).innerHTML = body_content;
        }   
    }
    
    if(buttons){
        buttons.forEach((e)=>{
            if(e.id){
                document.querySelector(`#${e.id}`).addEventListener(e.type?e.type:'click',async function(){
                    await e.fun(this);
                });
            }
            if(e.name){
                document.querySelectorAll(`button.${e.name}`).forEach((b)=>{
                    b.addEventListener('click',async function(){
                        await e.fun(b);
                    });
                });
            }
        });
    }
}