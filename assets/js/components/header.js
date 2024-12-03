export function headerComponent({username,name,title,page,back,add,logo,desc}){
    let button_modal = "";
    if(desc){
        button_modal = `<article class="desc_forms"><div><button class="desc_button">${desc}</button></div></article>`
    }
    document.querySelector(`#main header`).innerHTML = `<article class="title_info">
        <div class="menu_container"><button id="button_menu"><i class="fa-solid fa-bars"></i></button></div>
        <div class="header_title_container"><h2>${name?name:''}</h2><h3>${title}</h3><div id="button_new_container"></div></div>
        <article class="users_info">
            <label><i class="fa-solid fa-user"></i><span>${username}</span></label>
            <button id="button_logout"><i class="fa-solid fa-right-from-bracket"></i></button>
        </article>
    </article>
    ${button_modal}`
    document.querySelector('#button_menu').addEventListener('click',function(){
        
    })
    document.querySelector(`#button_logout`).addEventListener('click',function(){localStorage.clear();location.reload();});
}