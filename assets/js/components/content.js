export function contentComponent({content,events}){
    document.querySelector(".content").innerHTML = content;
    events();
}
export function contentType({content,events}){
    document.querySelector(".form_table").innerHTML = content
    events();
}