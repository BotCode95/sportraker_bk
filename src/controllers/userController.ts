import { Request, Response } from 'express'
import { User } from '../models/user'
import bcryptjs from 'bcryptjs'
import { generateJWT } from '../utils/generate-jwt'
import { Player } from '../models/player'

export const getUsersCounts = async (req:Request, res: Response) => {
	try {
		const count_user = await User.countDocuments()		
		res.json(count_user)
	} catch (error) {
		res.status(400).json({msg: error})
	}
}

export const getUsers = async(req:Request, res:Response) => {
	const users = await User.find()
	res.json({users})
}
export const getUserById = async(req:Request, res:Response) => {
	const {id} = req.params
	try {
		const user = await User.findById(id)
			
		res.json({
			user
		})
	} catch (error) {
		res.status(400).json({msg: error})
	}
}
export const updateUser = async(req:Request, res:Response) => {
	const {id} = req.params
	const {_id, ...resto} = req.body
	try {
		const user = await User.findByIdAndUpdate(id, resto, { new: true })
		res.json({user})
	} catch (error) {
        
		res.status(400).json({ msg: error})
	}
}
export const deleteUser = async(req:Request, res:Response) => {
	const {id} = req.params
	try {
		const user = await User.findByIdAndUpdate(id, {estado: false}, {new: true})
	
		res.json({user})
	} catch (error) {
        
		res.status(400).json({ msg: error})
	}
}


export const changePasswordUser = async(req:Request, res:Response) => {
	const user = (<any>req)?.user

	const {password} = req.body
	try {
		const salt = bcryptjs.genSaltSync()
		const passwordUpdated = bcryptjs.hashSync(password, salt)

		const userUpdated = await User.findByIdAndUpdate(user?._id, {password: passwordUpdated}, { new: true })
		res.json({userUpdated})
	} catch (error) {
        
		res.status(400).json({ msg: error})
	}
}

export const changePasswordByEmailUser = async(req:Request, res:Response) => {

	const {password, email} = req.body
	try {
		const salt = bcryptjs.genSaltSync()
		const passwordUpdated = bcryptjs.hashSync(password, salt)

		const userFinded = await User.findOne({ email })

		if(!userFinded){
			res.status(400).json({ msg: 'El usuario no existe, validar email'})
		}
		const userUpdated = await User.findByIdAndUpdate(userFinded?._id, {password: passwordUpdated}, { new: true })
		res.json({userUpdated})
	} catch (error) {
        
		res.status(400).json({ msg: error})
	}
}

export const createUser = async(req:Request, res:Response) => {
	const {name, lastname, email, password, dni, rol, status, isPremium} = req.body
	try {
		const existingUser = await User.findOne({ email })
		if (existingUser) {
			res.status(400).json({ msg: 'El correo electrónico ya está registrado' })
			return
		}

		const user = new User({name, lastname, email, dni, password, rol, status, isPremium})
		const salt = bcryptjs.genSaltSync()
		user.password = bcryptjs.hashSync(password, salt)
		user.name = user.name.trimEnd()
		user.lastname = user.lastname.trimEnd()
		await user.save()

		const player = new Player({
			userId: user._id,
			firstName: name.trimEnd(),
			lastName: lastname.trimEnd(),
		})
		await player.save()
		const token = await generateJWT({ uid: user.id })

		res.json({
			msg: 'Usuario creado correctamente',
			user,
			player,
			token
		})
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}
