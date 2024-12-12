export const TAB_TYPE_STATUS = {
    name: "type_status",
	id: "id_type_status",
	title: {
		table: "Tipo de Estatus",
		insert: "Nuevo Estatus",
		update: "Modificar Estatus"
	},
    columns:{
        id_type_status:{
            name:"id_type_status",
            title:"ID Estatus",
            primary: true,
            default: true,
            select:true
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