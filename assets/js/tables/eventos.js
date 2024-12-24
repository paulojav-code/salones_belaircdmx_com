export const TAB_EVENTOS= {
    name: "eventos",
	id: "id_eventos",
	title: {
		table: "Eventos Informacion",
		insert: "Nuevo Evento",
		update: "Modificar Info de un Evento"
	},
    columns:{
        id_eventos:{
            name:"id_eventos",
            title:"ID Eventos",
            primary: true,
            default: true,
            select:true,
            type: 'foreign',
            foreign: {
				table: 'eventos',
				id: 'id_eventos',
				column: 'name'
			}
        },
        id_type_eventos:{
            name:"id_type_eventos",
            title:"Evento",
            select:true,
            type: 'foreign',
            foreign: {
				table: 'type_eventos',
				id: 'id_type_eventos',
				column: 'name'
			}
        },
        id_salones:{
            name:"id_salones",
            title:"Salones",
            select:true,
            type: 'foreign',
            foreign: {
				table: 'salones',
				id: 'id_salones',
				column: 'name'
			}
        },
        
        id_type_status:{
            name:"id_type_status",
            title:"Estatus",
            select:true,
            type: 'foreign',
            foreign: {
				table: 'type_status',
				id: 'id_type_status',
				column: 'name'
			}
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