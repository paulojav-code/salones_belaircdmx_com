import { LS_VAR_LOGIN } from "./const.js";
import { page_login, jwt_valid } from "./pages/login.js";
import { headerComponent } from "./components/header.js";

let jwt = JSON.parse(localStorage.getItem(LS_VAR_LOGIN));
console.log("Esta entrando a aqui");
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

function start_page(){
    headerComponent({
        username:jwt.username,
        title:`Servicios`
    });

    let services_list = [
        {title:'Templates',url:'./template/',class_name:'template'},
        {title:'Bookers',url:'./book/',class_name:'book'},
        {title:'Weddings',url:'./weddings/',class_name:'weddings'}
    ];

}