export const TAB_USUARIOS = {
    name: "users",
	id: "id_users",
	title: {
		table: "Usuarios",
		insert: "Nuevo Usuario",
		update: "Modificar Usuario"
	},
    columns:{
        id_users:{
            name:"id_users",
            title:"ID Usuarios",
            primary: true,
            default: true
        },
        id_type_users:{
            name:"id_type_users",
            title:"ID tipo de usuario",
            select:true
        },
        username:{
            name:"username",
            title:"Usuario",
        },
        password:{
            name:"password",
            title:"Contraseña",
        },
        active:{
            name:"active",
            title:"Activo",
            default: true
        }
    }
}