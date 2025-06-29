import {Schema, model} from 'mongoose'

interface IUser {
    name: string,
    lastname: string,
    email: string,
    password: string
	dni: number
    rol?: string,
    status: boolean
	isPremium?: boolean
	lastLogin?: Date
}

const userSchema = new Schema<IUser>({
	name: {type:String, required: false},
	lastname: {type:String, required: false},
	email: {type:String, required: false, unique: true, lowercase: true},
	password: {type:String, required: false},
	dni: {type: Number, required: true},
	rol: {type: String,default: 'USER_ROLE',enum: ['ADMIN_ROLE','USER_ROLE']},
	status: {type: Boolean,default: true},
	isPremium: {type: Boolean,default: false},
	lastLogin: { type: Date, default: Date.now },
})


userSchema.methods.toJSON = function() {
	const {__v,password, ...user} = this.toObject()

	return user
}

export const User = model<IUser>('User', userSchema)