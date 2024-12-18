export const TAB_EVENTOS_INFO = {
    name: "eventos_info",
	id: "id_eventos_info",
	title: {
		table: "Eventos Informacion",
		insert: "Nuevo Evento",
		update: "Modificar Info de un Evento"
	},
    columns:{
        id_eventos_info:{
            name:"id_eventos_info",
            title:"ID Info Eventos",
            primary: true,
            default: true,
            select:true
        },
        id_eventos:{
            name:"id_eventos",
            title:"ID Eventos",
            select:true
        },
        id_salones:{
            name:"id_salones",
            title:"ID Salones",
            select:true
        },
        
        id_type_status:{
            name:"id_type_status",
            title:"ID Estatus",
            select:true
        },
        date:{
            name:"date",
            title:"Fecha"
        },
        active:{
            name:"active",
            title:"Activo",
            default: true
        }
    }
}