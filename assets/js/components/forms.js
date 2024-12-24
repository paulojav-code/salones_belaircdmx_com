import { LS_VAR_LOGIN,URL_API_LOGIN_SALONES } from "../const.js";
import { open_modal, close_modals } from './modals.js';
import { request_api,get_foreign_data } from "../utils.js";

let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));

export async function formAdminComponent({table,modal,action}){
    // Se define el tipo de action que se hara dependiendo el boton presionado
    let action_list = {
        "add":"insert",
        "edit":'update',
        "del":"delete"
    }
    // creo el json para trael la informacion que se almacenara en los inputs
    let json_input = {
        token: jwt.token,
        table : table.name,
        action:"select"
    }
    //respuesa con la lista de los datos que trae el select de la tabla
    let inputs_data = await request_api({url:URL_API_LOGIN_SALONES,json:json_input})
    // console.log(inputs_data)

    let tab = table;
    let act = action_list[action]

    // crea los inputs con lo la informacion que trae las tablas de js que se hicieron previamente
    let body = Object.keys(tab.columns).map(c => {
        console.log(c)
        let input_body = ""
        
        if(tab.columns[c].select == true){
            input_body = `<div class="select_container"><article><label>${tab.columns[c].title}</label><select id="e-${c}" class="input_form"></select></article></div>`;
        }
        else if (tab.columns[c].name == "date") {
            input_body = `<div><article><label>${tab.columns[c].title}</label><input type="datetime-local" id="e-${c}" class="input_form"></input></article></div>`;
        }
        else{
            input_body = `<div><article><label>${tab.columns[c].title}</label><input id="e-${c}" class="input_form"></input></article></div>`;
        }

        if(act == "insert" && tab.columns[c].default != true ){
            return input_body
        }
        else if(act == "update" && tab.columns[c].name != "active"){
            return input_body 
        }
        else if(act == "delete" && tab.columns[c].primary){
            return input_body 
        }
    }).join('');

    // insrtamos el body en el dom con innerHTML
    document.querySelector(`#${modal} .form_table`).innerHTML = body;
    document.querySelector(`#${modal} footer`).innerHTML = `<button class="send">enviar</button><button class="cancel">cancelar</button>`;

    document.querySelector(`#${modal} .cancel`).addEventListener('click',function(){
        close_modals(modal)
    });
    
    document.querySelectorAll(".select_container select").forEach( async (i) =>  {
        let input_id  = i.id.split("-")[1]
        let foreign = tab.columns[input_id].foreign
        let res = await get_foreign_data({
            url:URL_API_LOGIN_SALONES,
            id:foreign.id,
            column:foreign.column,
            json:{
                token: jwt.token,
                action: 'select',
                table: foreign.table
            }
        })
        // console.log(res)
        res.forEach(r => {
            let opt = document.createElement('option')
            opt.text = r.name;
            opt.value = r.id;
            i.appendChild(opt);
        });
    });

    document.querySelector(`#${modal} .send`).addEventListener('click', async function(){
        let json = {
            id:tab.id,
            token: jwt.token,
            action:act,
            table:tab.name,
            columns:{}
        }
        console.log(json)
        document.querySelectorAll(`#${modal} .form_table .input_form`). forEach  (e => {
            let i = e.id.split('-')[1];
            json.columns[i] = e.value;
        });
        let res = await request_api({url:URL_API_LOGIN_SALONES,json:json})
        let response = await res.json()
        if(act == "insert"){alert("Se guardo la informacion correctamenete")}
    });
    open_modal(modal);
}