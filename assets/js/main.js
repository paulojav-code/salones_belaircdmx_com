import { LS_VAR_LOGIN } from "./const.js";
import { page_login, jwt_valid } from "./pages/login.js";
import { headerComponent } from "./components/header.js";
import { create_card } from './components/cards.js';
// import { MODAL_DESC,MODAL_FORM,MODAL_NEW} from "../components/modales.js"

let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));
console.log(jwt)
if(jwt == null){
    page_login();
}else{
    let jwt_status = await jwt_valid(jwt);
    if(!jwt_status.login){
        page_login();
    }else{
        start_page();
    }
}
export async function start_page(){
    headerComponent({
        username:jwt.username,
        title:`Servicios`
    });

    let services_list = [
        {title:'Itinerario',url:'./itinerario/',class_name:'itinerario'},
        {title:'Eventos',url:'./eventos/',class_name:'eventos'},
        {title:'Salones',url:'./salones/',class_name:'salones'},
        {title:'Usuarios',url:'./usuarios/',class_name:'usuarios'}
    ];
    await create_card(services_list);
}