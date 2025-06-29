import {Schema, Types, model} from 'mongoose'

export interface IPlayer {
  	userId: Types.ObjectId
	firstName: string
	lastName: string
	city?: string
	province?: string,
	birthDate?: Date
	gender?: 'masculino' | 'femenino' | 'otro'
	avatarUrl?: string
	disciplines: ('tenis' | 'padel')[]
	technicalSkills: {
		power: number
		endurance: number
		technique: number
	}
}

const playerSchema = new Schema({
	userId: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	city: { type: String },
	province: { type: String },
	birthDate: { type: Date },
	gender: { type: String, enum: ['masculino', 'femenino', 'otro'] },
	avatarUrl: { type: String },
	disciplines: [{ type: String, enum: ['tenis', 'padel'] }],
	technicalSkills: {
		power: { type: Number, min: 0, max: 10 },
		endurance: { type: Number, min: 0, max: 10 },
		technique: { type: Number, min: 0, max: 10 }
	}
}, {
	timestamps: true
})

playerSchema.methods.toJSON = function() {
    const {__v,password, ...player} = this.toObject()

    return player
}

export const Player = model<IPlayer>('Player', playerSchema)