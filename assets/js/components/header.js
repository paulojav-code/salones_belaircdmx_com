export function headerComponent({username,name,title,page,back,add,logo,desc}){
    let button_modal = "";
    if(desc){
        button_modal = `<article class="desc_forms"><div><button class="desc_button">${desc}</button></div></article>`
    }
    document.querySelector(`#main header`).innerHTML = `<article class="title_info">
        <div class="bt_back_container"><button id="button_back"${back?'':' class="disable"'}><i class="fa-solid fa-arrow-left"></i></button></div>
        <div class="header_title_container"><h2>${name?name:''}</h2><h3>${title}</h3><div id="button_new_container">${add?`<button id="button_new"><i class="fa-solid fa-plus"></i></button>`:''}</div></div>
        <article class="users_info">
            <label><i class="fa-solid fa-user"></i><span>${username}</span></label>
            <button id="button_logout"><i class="fa-solid fa-right-from-bracket"></i></button>
        </article>
    </article>
    ${button_modal}`

    document.querySelector(`#button_logout`).addEventListener('click',function(){localStorage.clear();location.reload();});
    if(back){
        document.querySelector(`#button_back`).addEventListener('click',function(){back()});
    }
    if(add){
        document.querySelector(`#button_new`).addEventListener('click',function(){add()});
    }
}
export function change_name_header(name){
    document.querySelector(`#main header h2`).innerHTML = name;
}
export function change_title_header(title){
    document.querySelector(`#main header h3`).innerHTML = title;
}
export function back(){
    document.querySelector(`#button_back`).addEventListener('click',function(){
        // start_page();
        console.log("hola");
    })
}
export function add_button(add){
    console.log("holas")
    document.querySelector(`#button_new_container`).innerHTML = add;
}