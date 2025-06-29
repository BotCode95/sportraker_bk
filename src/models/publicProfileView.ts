import { Schema, model, Types } from 'mongoose'

export interface IPublicProfileView {
	player: Types.ObjectId
	fullName: string
	avatarUrl?: string
	disciplines: ('tenis' | 'padel')[]
	level?: 'Inicial' | 'Intermedio' | 'Avanzado' | 'Profesional'
	rankingPosition?: number
	updatedAt?: Date
}


const publicProfileViewSchema = new Schema<IPublicProfileView>({
	player: { type: Schema.Types.ObjectId, ref: 'Player', required: true, unique: true },
	fullName: { type: String, required: true },
	avatarUrl: { type: String },
	disciplines: [{
		type: String,
		enum: ['tennis', 'padel'],
		required: true
	}],
	level: {
		type: String,
		enum: ['Inicial', 'Intermedio', 'Avanzado', 'Profesional']
	},
	rankingPosition: { type: Number },
	updatedAt: { type: Date, default: Date.now }
}, {
	timestamps: true
})

export const PublicProfileView = model<IPublicProfileView>('PublicProfileView', publicProfileViewSchema)
