const IN_PRODUCTION = window.location.host!='localhost';

export const LS_VAR_LOGIN = `salones_belaircdmx_com_login`;

const URL_API = `http://localhost/web/salones_belaircdmx_com/api/`;
export const LS_VAR_ITINERARIO = `${URL_API}salones/`;
export const URL_API_LOGIN = `${URL_API}login/`;

export const TEMP_URL_ROOT_IMG = `../assets/img/pages/`;

//NUEVO SERVICIOS


export const WEDD_DEFAULT_PAGE_ID = 'admin';
export const WEDD_PAGES_CONF = {
    'admin':{name:'Administrar'},
    'wedding':{name:'Boda'},
    'admin_weddings':{name:'Administrar_Bodas'}
}

export const SERVICES_LIST = [
    {title:'Itinerario',url:'./itinerario/',class_name:'itinerario'},
    {title:'Eventos',url:'./eventos/',class_name:'eventos'},
    {title:'Salones',url:'./salones/',class_name:'salones'},
    {title:'Usuarios',url:'./usuarios/',class_name:'usuarios'}
];