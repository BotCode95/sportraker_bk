import { Schema, model, Types } from 'mongoose'

export interface ITournament {
	name: string
	discipline: 'tenis' | 'padel'
	organizer: Types.ObjectId 
	startDate: Date
	endDate: Date
	participants: {
		player: Types.ObjectId 
		result: 'ganador' | 'finalista' | 'semifinalista' | 'eliminado' | 'otro'
	}[]
}



const tournamentSchema = new Schema<ITournament>({
	name: { type: String, required: true },
	discipline: { type: String, enum: ['tennis', 'padel'], required: true },
	organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	participants: [
		{
			player: { type: Types.ObjectId, ref: 'Player', required: true },
			result: {
				type: String,
				enum: ['ganador', 'finalista', 'semifinalista', 'eliminado', 'otro'],
				default: 'otro'
			}
		}
	]
}, {
	timestamps: true
})


// Ejemplo
// {
//   "_id": "665f24d0531fbe0a2f123abc",
//   "name": "Summer Open 2025",
//   "discipline": "tennis",
//   "organizer": "665f120e531fbe0a2f122222",  // user._id
//   "startDate": "2025-01-10T00:00:00.000Z",
//   "endDate": "2025-01-15T00:00:00.000Z",
//   "participants": [
//     {
//       "player": "665f150b531fbe0a2f122aaa",
//       "result": "champion"
//     },
//     {
//       "player": "665f150b531fbe0a2f122bbb",
//       "result": "finalist"
//     },
//     {
//       "player": "665f150b531fbe0a2f122ccc",
//       "result": "semifinalist"
//     },
//     {
//       "player": "665f150b531fbe0a2f122ddd",
//       "result": "eliminated"
//     }
//   ],
//   "createdAt": "2025-01-01T12:00:00.000Z",
//   "updatedAt": "2025-01-16T18:00:00.000Z"
// }

export const Tournament = model<ITournament>('Tournament', tournamentSchema)
