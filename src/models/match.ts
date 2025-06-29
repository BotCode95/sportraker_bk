import { Schema, model, Types } from 'mongoose'

export interface IMatch {
  tournament: Types.ObjectId
  playerOne: Types.ObjectId
  playerTwo: Types.ObjectId
  date: Date
  location?: string
  result?: {
    winner: Types.ObjectId
    score?: string
  }
  status: 'POR JUGAR' | 'FINALIZADO' | 'SUSPENDIDO' | 'CANCELADO' 
  createdAt?: Date
}

const MatchSchema = new Schema<IMatch>({
  tournament: {
    type: Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  playerOne: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  playerTwo: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String
  },
  result: {
    winner: {
      type: Types.ObjectId,
      ref: 'Player'
    },
    score: {
      type: String
    }
  },
  status: {
    type: String,
    enum: ['POR JUGAR', 'FINALIZADO', 'SUSPENDIDO','CANCELADO'],
    default: 'POR JUGAR'
  }
}, {
  timestamps: true
})

export const Match = model<IMatch>('Match', MatchSchema)
