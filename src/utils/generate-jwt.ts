import jwt from 'jsonwebtoken'
import type { IPlayer } from '../models/player';

interface GenerateTokenData {
	uid?: string,
	data?: Data
}
interface Data {
	player?: IPlayer | null
}

export const generateJWT = ( {uid = '', data} : GenerateTokenData ) => {

	

	return new Promise( (resolve, reject) => {
		const payload = { uid, player: data?.player}
		const secret:string = process.env.SECRETORPRIVATEKEY ?? ''
		jwt.sign( payload, secret, {
			expiresIn: '3d'
		}, ( err, token ) => {
			if ( err ) {
				console.log(err)
				reject( 'Could not generate token' )
			} else {
				resolve( token )
			}
		})

	})
}


