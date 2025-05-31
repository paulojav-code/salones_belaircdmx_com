import { ADMIN} from "../tables/admin.js";
import { request_api,get_foreign_data } from "../utils.js";
import { LS_VAR_LOGIN,URL_API_LOGIN_SALONES } from "../const.js";

let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));

export async function intinerarioComponent(){

    //LLamo a la tabla para crear los nombres y utilizarla para hacer la petiion a la api
    let tab_eventos = ADMIN['eventos'];

    // Creo la barra de los nombres de la tabla itinerario
    document.querySelector("#tab_titles").innerHTML = Object.keys(tab_eventos.columns).map(c => {
        return `<div id="name_cel">${(tab_eventos.columns[c].title) }</div>`
    }).join('');

    //Crea el la seccion donde se mostraran los datos de la respuesta de la api en forma de tabla
    let section = document.createElement('section');
    section.id = "itinerario_content";
    document.querySelector('.content').appendChild(section);

    //crea el json que se envira para hacer la peticion a la api y mostrar la informacion en la tabla
    let json = {
        token:jwt.token,
        table:tab_eventos.name,
        action:"select"
    };
    // con lo que me responde la api crea la tabla utilizando map para reccorre e impirmir la respuesta de la api 
    let response_eventos = await request_api({url: URL_API_LOGIN_SALONES, json: json});

    let data_foreign = {
        'id_salones':[],
        'id_type_eventos':[],
        'id_type_status':[],
    }

    for (let d of Object.keys(data_foreign)) {
        let foreign = tab_eventos.columns[d].foreign;
        let foreign_data = await get_foreign_data({
            url: URL_API_LOGIN_SALONES,
            id: foreign.id,
            column: foreign.column,
            json: {
                token: jwt.token,
                table: foreign.table,
                action: "select"
            }
        });
    // Transformar el array en un objeto donde las claves sean los id y los valores sean los name
    data_foreign[d] = foreign_data.reduce((acc, item) => {
        acc[item.id] = item.name;
        return acc;
    }, {});
    };
    
    console.log(data_foreign)
    let sections = response_eventos.map(e => {
        let sectionContent = Object.keys(e).map(n => {
            let info = "";
            if(data_foreign[n]){
                info = data_foreign[n][e[n]]
                // console.log(data_foreign[n][e[n]]);
            }
            else{
                info = e[n];
                // console.log(e[n])
            }
            return `<div class="tab_cel">${info}</div>`;
            
        });
        return `<section class="sec_itinerario">${sectionContent.join('')}</section>`;
    });
    document.querySelector("#itinerario_content").innerHTML = sections.join('');

    // console.log(data_foreign)
    // let sections = await Promise.all(response_eventos.map(async (res,i) => {
    //     console.log(i)
    //     let sectionContent = await Promise.all(Object.keys(res).map(async (r) => {
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
    //             });
    //             console.log(foreing);
    //             foreing = foreing[i].name;
    //         } else {
    //             foreing = res[r];
    //         }
    //         return `<div class="tab_cel">${foreing}</div>`;
    //     }));
    //     return `<section class="sec_itinerario">${sectionContent.join('')}</section>`;
    // }));
    // document.querySelector("#itinerario_content").innerHTML = sections.join('');




// console.log(array);
//     document.querySelector("#itinerario_content").innerHTML = response.map(res => {
//         return `<section class="sec_itinerario">${Object.keys(res).map( async (r) =>{
//             let f_tab = tab.columns[r].foreign;
//             let foreing = "";
//             if (f_tab && f_tab.table != "eventos") {
//                             foreing = await get_foreign_data({
//                                 url: URL_API_LOGIN_SALONES,
//                                 id: f_tab.id,
//                                 column: f_tab.column,
//                                 json: {
//                                     token: jwt.token,
//                                     table: f_tab.table,
//                                     action: "select"
//                                 }
//                             })
//                             foreing = foreing[0].name
//                             array.push(foreing)
//                         } else {
//                             foreing = (res[r]);
//                             array.push(foreing)
//                         }
//             console.log(f_tab)
//             return `<div class="tab_cel">${r}</div>`
//         }).join('')}</section>`
//     }).join('');
}