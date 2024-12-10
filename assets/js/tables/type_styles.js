export const TAB_TYPE_STYLES = {
    name: "type_styles",
	id: "id_type_styles",
	title: {
		table: "Tipo de Estilos",
		insert: "Nuevo Estilo",
		update: "Modificar Estilo"
	},
    columns:{
        id_type_styles:{
            name:"id_type_styles",
            title:"ID Estilos",
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