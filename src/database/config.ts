import mongoose from 'mongoose'

export const dbConnection = async() => {
	const mongoConnection : string  = process.env.MONGODB_CNN ?? ''

	try {
		mongoose.connect(mongoConnection)
		console.log('Base de datos online')
	} catch (error) {
		console.log(error)
	}
}
