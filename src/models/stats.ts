import { Schema, model, Types } from 'mongoose'

export interface IPlayerStats {
	playerId: Types.ObjectId
	totalMatches: number
	matchesWon: number
	points: number
	lastUpdated?: Date
}

const playerStatsSchema = new Schema<IPlayerStats>({
	playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true, unique: true },
	totalMatches: { type: Number, default: 0 },
	matchesWon: { type: Number, default: 0 },
	points: { type: Number, default: 0 },
	lastUpdated: { type: Date, default: Date.now }
}, {
	timestamps: true
})

export const PlayerStats = model<IPlayerStats>('PlayerStats', playerStatsSchema)
