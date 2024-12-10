export const TAB_TYPE_USERS = {
    name: "type_users",
	id: "id_type_users",
	title: {
		table: "Tipos de Usuario",
		insert: "Nuevo Tipo de Usuario",
		update: "Modificar Tipo de Usuario"
	},
    columns:{
        id_type_users:{
            name:"id_type_users",
            title:"ID Tipo de Usuario",
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