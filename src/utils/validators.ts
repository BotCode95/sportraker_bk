import { Role } from '../models/role'

export const isRoleValidate = async (rol = 'USER_ROLE') => {
	const existeRol = await Role.findOne({rol})
	if(!existeRol) {
		throw new Error(`El rol ${rol} no está registrado en la BD`)
	}
}

export const isRoleAdmin = async (rol: string) : Promise<void> => {
	if(rol === 'ADMIN_ROLE'){
		await isRoleValidate(rol)
	} else {
		throw new Error(`El rol ${rol} no tiene permisos`)
	}
}
