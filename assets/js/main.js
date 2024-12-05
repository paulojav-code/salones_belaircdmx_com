import { LS_VAR_LOGIN,  } from "./const.js";
import { page_login, jwt_valid } from "./pages/login.js";
import { headerComponent } from "./components/header.js";
import { intinerarioComponent } from "./components/itinerario.js";
// import { MODAL_DESC,MODAL_FORM,MODAL_NEW} from "../components/modales.js"

let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));
// console.log(jwt)
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
        title:`Itinerario`
    });

    intinerarioComponent();

    
}