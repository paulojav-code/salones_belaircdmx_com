export const TAB_EVENTOS = {
    name: "eventos",
	id: "id_eventos",
	title: {
		table: "Eventos",
		insert: "Nuevo Evento",
		update: "Modificar Evento"
	},
    columns:{
        id_eventos:{
            name:"id_eventos",
            title:"ID Eventos",
            primary: true,
            default: true
        },
        name:{
            name:"name",
            title:"Nombre",
        },
        active:{
            name:"active",
            title:"Activo",
            default: true
        }
    }
}