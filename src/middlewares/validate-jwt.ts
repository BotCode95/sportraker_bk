import { NextFunction, Request,RequestHandler,Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import {User} from '../models/user'

export const validateJWT: RequestHandler = async (req:Request,res:Response,next:NextFunction)=> {
	const token = req.header('x-token')

	if(!token) {
		res.json({
			msg: 'there is not token in the request'
		});
		return;
	}

	try {
		const secret:string = process.env.SECRETORPRIVATEKEY ?? ''
		const {uid, player}:  any = jwt.verify(token,secret)
		const user = await User.findById(uid)
		if(!user) {
			res.status(401).json({
				msg: 'El usuario no existe'
			});
			return;
		}

		if(!user.status) {
			res.status(401).json({
				msg: 'El usuario esta desactivado'
			});
			return;
		}
		try {
			const now = new Date()
			now.setHours(now.getHours() - 3)
			user.lastLogin = now
			await user.save()
		} catch (error) {
			res.status(500).json({
				msg: 'Error al actualizar la fecha de inicio de sesión',
				error
			});
			return;
		}

		(<any>req).user = user;
		(<any>req).player = player;
		next();
	} catch (error) {
		console.log(error)
		res.status(401).json({
			msg: 'Token is not valid'
		});
		return;
	}
}