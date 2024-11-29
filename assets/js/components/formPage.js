import { LS_VAR_LOGIN, URL_API_FILE } from "../const.js";
import { alert_msg, request_api, request_file, get_foreign_data } from "../utils.js";
import { formField } from "./formField.js";
import { get_table_data } from "../template/pages/table.js";
import { close_modals } from "./modales.js";


let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));

export function formPageComponent({tab,back,url,datas,id_foreign,id_files}){
    let table = {};
    let col = tab.columns;
    let data;
    table.body = async () => {
        let file_list = [];
        if(tab.file){
            if(!id_files){id_files = id_foreign.id;}
            file_list = await get_table_data({table: 'files',id_foreign: {name: 'id_pages',id: id_files}});
        }
        let foreign_list = {};
        for(const c of Object.keys(col)){
            if(col[c].type == 'foreign'){
                let f = await get_foreign_data({
                    url: url,
                    id: col[c].foreign.id,
                    column: col[c].foreign.column,
                    json:{
                        token: jwt.token,
                        action: 'select',
                        table: col[c].foreign.table
                    }
                });
                foreign_list[col[c].name] = f;
            }
        }
        if(datas){
            data = await datas();
            data = data[0];
        }
        
        let fields = await Promise.all(Object.keys(col).map(async (c)=>{
            if(!data && typeof col[c].default !== 'undefined' && col[c].default){return '';}
            let json = {
                type:'text',
                id:`input-${tab.name}-${col[c].name}`,
                id_form:`form-${tab.name}-${col[c].name}`,
                class_name:'normal'
            }
            json.title = `${(col[c].title||col[c].name)}${(typeof col[c].required !== 'undefined' && col[c].required)?'*':''}`
            json.value = data?data[c]:(id_foreign && c == id_foreign.name)?id_foreign.id:'';
            if(typeof col[c].primary !== 'undefined'){json.primary = col[c].primary;}
            if(col[c].class_name){json.class_name = col[c].class_name;}
            if(col[c].type){
                json.type = col[c].type;
                if(col[c].type == 'files'){
                    json.type = 'select';
                    json.select = file_list;
                }else if(col[c].type == 'foreign'){
                    json.type = 'select';
                    json.select = foreign_list[col[c].name];
                }else if(col[c].type == 'select'){
                    json.select = col[c].select;
                }
            }
            // adaptacion styles
            if(data && tab.name == 'styles' && c == 'style'){
                json.type = 'select';
                let f = await get_foreign_data({
                    url: url,
                    id: 'id_type_styles_options',
                    column: 'name',
                    json:{token:jwt.token,action:'select',table:'type_styles_options',id_foreign:{name:'id_type_styles',id:data.id_type_styles}}
                });
                if(f.length > 1){
                    json.select = f;
                }else{
                    let c = await get_foreign_data({
                        url:url,
                        id:'id_colors',
                        column:'name',
                        json:{token:jwt.token,action:'select',table:'colors',id_foreign:{name:'id_pages',id:id_foreign.id}}
                    });
                    json.select = c;
                }
            }
            if(typeof col[c].show !== 'undefined' && col[c].show != true && col[c].show != 'field'){return '';}
            if(data && json.type == 'file'){return '';}
            return formField(json);
        }));
        return `<article class="forms">
            <header><h3>${data?tab.title.update:tab.title.insert}<h3></header>
            <div>${fields.join('')}</div>
            <footer>
                <button id="button_save" class="action">Guardar</button>
                <button id="button_cancel" class="action">Cancelar</button>
            </footer>
        </<article>`;
    };
    table.buttons = [
        {
            id:'button_cancel',
            fun: async () => {
                close_modals();
            }
        },
        {
            id:'button_save',
            fun: async () => {
                let file = {};
                let required = [];
                let json = {
                    token: jwt.token,
                    action: data?'update':'insert',
                    table: tab.name,
                    columns: {}
                };
                if(data){
                    json[tab.id] = data[tab.id];
                }
                document.querySelectorAll(`.forms .field_form`).forEach(async function(i){
                    let c = i.id.split('-')[2];
                    if(typeof col[c].required !== 'undefined' && col[c].required && i.value == ''){
                        required.push(col[c].title || col[c].name);
                    }
                    if(data){
                        if(data[c] != i.value){
                            json.columns[c] = i.value;
                        }
                    }else{
                        if(i.type == 'file'){
                            file[c] = i.files[0];
                        }else{
                            json.columns[c] = i.value;
                        }
                    }
                });
                if(required.length > 0){
                    alert_msg({msg:`Campos faltantes: ${required.join()}`});
                }else{
                    if(Object.keys(json.columns).length == 0){
                        alert_msg({msg:'No se detectaron cambios'});
                        back();
                    }else{
                        let res = '';
                        if(Object.keys(file).length > 0){
                            let id_file = Object.keys(file)[0];
                            res = await request_file({file: file[id_file], token: jwt.token, id: id_foreign.id, url: URL_API_FILE});
                            json.columns[id_file] = res.file;
                        }
                        res = await request_api({url: url, json: json});
                        if(typeof res.error !== 'undefined'){
                            alert_msg({msg:`No se pudo ${data?`Modificar`:`Insertar`} el elemento en: ${tab.title.table}`});
                        }else{
                            alert_msg({msg:`Se ${data?`Modificó`:`Insertó`} el elemento en: ${tab.title.table}`});
                            back();
                        }
                    }
                }
                close_modals();
            }
        }
    ];
    // adaptacion styles
    if(tab.name == 'styles'){
        table.buttons.push({
            id:`input-styles-id_type_styles`,
            type:'change',
            fun: async (b) => {
                let id_input = `input-styles-style`;
                let field = document.createElement('select');
                document.getElementById(id_input).remove();
                field.className = 'field_form';
                field.id = id_input;
                let f = await get_foreign_data({
                    url: url,
                    id: 'id_type_styles_options',
                    column: 'name',
                    json:{
                        token:jwt.token,action:'select',table:'type_styles_options',
                        id_foreign:{name:'id_type_styles',id:b.value}
                    }
                });
                if(f.length > 1){
                    let option = document.createElement('option');
                    option.value = "";
                    option.text = "Seleccione Opción";
                    field.appendChild(option);
                    f.forEach(e=>{
                        let option = document.createElement('option');
                        option.value = e.id;
                        option.text = `${e.id}: ${e.name}`;
                        field.appendChild(option);
                    });
                }else{
                    let option = document.createElement('option');
                    option.value = "";
                    option.text = "Seleccione Color";
                    field.appendChild(option);
                    let c = await get_foreign_data({
                        url:url,
                        id:'id_colors',
                        column:'name',
                        json:{
                            token:jwt.token,action:'select',table:'colors',
                            id_foreign:{name:'id_pages',id:id_foreign.id}
                        }
                    });
                    c.forEach(e=>{
                        let option = document.createElement('option');
                        option.value = e.id;
                        option.text = `${e.id}: ${e.name}`;
                        field.appendChild(option);
                    });
                }
                document.querySelector(`#form-styles-style`).appendChild(field);
            }
        })
    }

    return table;
}