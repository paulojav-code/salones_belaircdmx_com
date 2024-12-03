import { TAB_ITINERARIO } from "../tables/itinerario.js";
import { request_api } from "../utils.js";
import { LS_VAR_LOGIN,LS_VAR_ITINERARIO } from "../const.js";

let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));
console.log(jwt)

export async function intinerarioComponent(){
    //LLamo a la tabla para crear los nombres y utilizarla para hacer la petiion a la api
    let tab = TAB_ITINERARIO;
    // Creo la barra de los nombres de la tabla itinerario
    document.querySelector("#tab_titles").innerHTML = Object.keys(tab.columns).map(c => {
        return `<div id="name_cel">${(tab.columns[c].title) }</div>`
    }).join('');
    //Creo el la seccion donde se mostraran los datos de la respuesta de la api en forma de tabla
    let section = document.createElement('section');
    section.id = "itinerario_content";
    document.querySelector('.content').appendChild(section);
    //creo el json que se envira para hacer la peticion a la api y mostrar la informacion en la tabla
    let json = {
        token:jwt.token,
        table:tab.name,
        action:"select"
    };
    // con lo que me responde la api creo la tabla utilizando map para reccorre e impirmir la respuesta de la api 
    let response = await request_api({url:LS_VAR_ITINERARIO,json:json})
    document.querySelector("#itinerario_content").innerHTML =response.map(res => {
        return `<section class="sec_itinerario">${Object.values(res).map(r =>{
            return `<div class="tab_cel">${r}</div>`
        }).join('')}</section>`
    }).join('');

    //Creamos
}