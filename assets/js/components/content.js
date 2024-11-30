export function contentComponent({content,events}){
    document.querySelector(".content").innerHTML = content;
    events();
}