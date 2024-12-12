export const TAB_SALONES = {
    name: "salones",
	id: "id_salones",
	title: {
		table: "Salones",
		insert: "Nuevo Salon",
		update: "Modificar Salon"
	},
    columns:{
        id_salones:{
            name:"id_salones",
            title:"ID Salones",
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