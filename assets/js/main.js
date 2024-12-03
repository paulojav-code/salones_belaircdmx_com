import { LS_VAR_LOGIN, SERVICES_LIST } from "./const.js";
import { page_login, jwt_valid } from "./pages/login.js";
import { headerComponent } from "./components/header.js";
import { mainCards } from './components/cards.js';
import { contentComponent } from "./components/content.js";
import { modalsComponent, modalForm } from "./components/modals.js";
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
    // let cards = mainCards(SERVICES_LIST);

    // contentComponent({
    //     content: `${cards.content}`,
    //     events: () => {
    //         cards.events();
    //     }
    // })

    // let modal_form = modalForm({});

    // modalsComponent({
    //     content: `${modal_form.content}`,
    //     events: () => {
    //         modal_form.events();
    //     }
    // });
}