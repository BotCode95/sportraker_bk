import { Schema, model, Types } from 'mongoose'

interface ISponsorship {
  player: Types.ObjectId
  title: string
  description: string
  amountNeeded: number
  amountCollected?: number
  status: 'active' | 'closed'
  createdAt: Date
}

const SponsorshipSchema = new Schema<ISponsorship>({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  amountNeeded: {
    type: Number,
    required: true,
  },
  amountCollected: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Sponsorship = model('Sponsorship', SponsorshipSchema)
