import { TAB_EVENTOS} from "../tables/eventos.js";
import { request_api,get_foreign_data } from "../utils.js";
import { LS_VAR_LOGIN,URL_API_LOGIN_SALONES } from "../const.js";

let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));

export async function intinerarioComponent(){

    //LLamo a la tabla para crear los nombres y utilizarla para hacer la petiion a la api
    let tab = TAB_EVENTOS;

    // Creo la barra de los nombres de la tabla itinerario
    document.querySelector("#tab_titles").innerHTML = Object.keys(tab.columns).map(c => {
        return `<div id="name_cel">${(tab.columns[c].title) }</div>`
    }).join('');

    //Crea el la seccion donde se mostraran los datos de la respuesta de la api en forma de tabla
    let section = document.createElement('section');
    section.id = "itinerario_content";
    document.querySelector('.content').appendChild(section);

    //crea el json que se envira para hacer la peticion a la api y mostrar la informacion en la tabla
    let json = {
        token:jwt.token,
        table:tab.name,
        action:"select"
    };
    // con lo que me responde la api crea la tabla utilizando map para reccorre e impirmir la respuesta de la api 
    let response = await request_api({url: URL_API_LOGIN_SALONES, json: json});
    let array = []
// await Promise.all(response.map(async (res) => {
//     await Promise.all(Object.keys(res).map(async (r) => {
//         let foreing = "";
//         let f_tab = tab.columns[r].foreign;
//         if (f_tab && f_tab.table != "eventos") {
//             foreing = await get_foreign_data({
//                 url: URL_API_LOGIN_SALONES,
//                 id: f_tab.id,
//                 column: f_tab.column,
//                 json: {
//                     token: jwt.token,
//                     table: f_tab.table,
//                     action: "select"
//                 }
//             })
//             foreing = foreing[0].name
//             array.push(foreing)
//         } else {
//             foreing = (res[r]);
//             array.push(foreing)
//         }
//     }));
// }));
console.log(array);
    document.querySelector("#itinerario_content").innerHTML = response.map(res => {
        return `<section class="sec_itinerario">${Object.keys(res).map( async (r) =>{
            let f_tab = tab.columns[r].foreign;
            let foreing = "";
            if (f_tab && f_tab.table != "eventos") {
                            foreing = await get_foreign_data({
                                url: URL_API_LOGIN_SALONES,
                                id: f_tab.id,
                                column: f_tab.column,
                                json: {
                                    token: jwt.token,
                                    table: f_tab.table,
                                    action: "select"
                                }
                            })
                            foreing = foreing[0].name
                            array.push(foreing)
                        } else {
                            foreing = (res[r]);
                            array.push(foreing)
                        }
            console.log(f_tab)
            return `<div class="tab_cel">${r}</div>`
        }).join('')}</section>`
    }).join('');
}