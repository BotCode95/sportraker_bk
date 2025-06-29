import { Request,Response } from 'express'
import { generateJWT } from '../utils/generate-jwt'
import bcryptjs from 'bcryptjs'
import { User } from '../models/user'
import { Player } from '../models/player'

export const login = async (req:Request, res: Response) => {
	const {email, password} =req.body

	try {
		const user = await User.findOne({email})
		if(!user){
			 res.status(400).json({
				msg: 'Email / Passsword no es correcto'
			})
			return
		}

		if(!user.status){
			 res.status(400).json({
				msg: 'El usuario esta desactivado'
			})
			return
		}
		const validPassword = bcryptjs.compareSync(password, user.password)
		if(!validPassword){
			 res.status(400).json({
				msg: 'La Contraseña es incorrecta'
			})
			return
		}

		try {
			await User.findOneAndUpdate(
				{ email }, 
				{ lastLogin: new Date() },
				{ new: true } 
			)
		} catch (error) {
			res.status(500).json({
				msg: 'Error al actualizar la fecha de inicio de sesión',
				error
			})
			return
		}

		const player = await Player.findOne({userId: user._id})
		
		const token = await generateJWT({uid: user?._id.toString(), data: {player} })

		res.json({
			user,
			player,
			token
		})
	} catch (error) {
		 res.status(500).json({
			msg: 'Hable con el administrador'
		})
		return
	}
}

export const validateTokenUser = async (req:Request, res:Response ) => {		
	const data = {
		player: (<any>req).player,
	}

	const token = await generateJWT({uid: (<any>req).user, data})
    
	res.json({
		user: (<any>req).user,
		token: token,
	})

}