export const TAB_ITINERARIO = {
    name: "itinerario",
	id: "id_itinerario",
	title: {
		table: "Itinerario",
		insert: " ",
		update: " "
	},
    columns:{
        id_itinerario:{
            name:"id_itinerario",
            title:"ID Itinerario",
            primary: true,
            default: true,
        },
        id_eventos:{
            name:"id_eventos",
            title:"ID Eventos",
        },
        id_salones:{
            name:"id_salones",
            title:"ID Salones",
        },
        id_type_status:{
            name:"id_type_status",
            title:"status",
        },
        name:{
            name:"name",
            title:"Nombre",
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