import { Request,Response } from 'express'
import { Role } from '../models/role'


export const createRole = async (req: Request,res: Response) => {
	const {rol}  = req.body
	try {
		const role = new Role({rol})

		await role.save()

		res.json({
			msg: 'Rol Creado',
			role
		})
	} catch (error) {
        
		res.status(400).json({ msg: error})
	}
}

export const getRoles =async (req: Request,res: Response) => {
	const roles = await Role.find()
	res.json({roles})
}