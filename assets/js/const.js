const IN_PRODUCTION = window.location.host!='localhost';

export const LS_VAR_LOGIN = `salones_belaircdmx_com_login`;

const URL_API = `http://localhost/web/salones_belaircdmx_com/api/`;
export const URL_API_LOGIN = `${URL_API}login/`;

export const TEMP_URL_ROOT_IMG = `../assets/img/pages/`;

//NUEVO SERVICIOS
export const BOOK_DEFAULT_PAGE_ID = 'booker';
export const BOOK_PAGES_CONF = {
    'booker':{name: 'Motores'},
    'admin':{name: 'Administrar'}
};

export const TEMP_PAGES_CONF = {
    'site':{name: 'Sitios'},
    'page':{name: 'Paginas'},
    'admin':{name: 'Administrar'},
    'file':{name: 'Archivos'}
};

export const WEDD_DEFAULT_PAGE_ID = 'admin';
export const WEDD_PAGES_CONF = {
    'admin':{name:'Administrar'},
    'wedding':{name:'Boda'},
    'admin_weddings':{name:'Administrar_Bodas'}
}

