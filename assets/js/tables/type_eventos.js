export const TAB_TYPE_EVENTOS = {
    name: "type_eventos",
	id: "id_type_eventos",
	title: {
		table: "Tipo Eventos",
		insert: "Nuevo Tipo Evento",
		update: "Modificar Tipo Evento"
	},
    columns:{
        id_type_eventos:{
            name:"id_type_eventos",
            title:"Tipo de Evento",
            primary: true,
            default: true,
            select:true,
            type: 'foreign',
            foreign: {
				table: 'type_eventos',
				id: 'id_type_eventos',
				column: 'name'
			}
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