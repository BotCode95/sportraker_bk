import { Request, Response } from 'express'
import { PublicProfileView } from '../models/publicProfileView'

export const getPublicProfileByPlayer = async (req: Request, res: Response) => {
	const { playerId } = req.params
	try {
		const profile = await PublicProfileView.findOne({ player: playerId })
			.populate('player')
			.populate('statsPreview')

		if (!profile) {
            res.status(404).json({ msg: 'Public profile not found' })
            return
        }

		res.json({ profile })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}

export const createOrUpdatePublicProfile = async (req: Request, res: Response) => {
	const { player } = req.body
	try {
		const existing = await PublicProfileView.findOne({ player })

		if (existing) {
			const updated = await PublicProfileView.findOneAndUpdate({ player }, req.body, { new: true })
			res.json({ msg: 'Profile updated', profile: updated })
            return
		}

		const profile = new PublicProfileView(req.body)
		await profile.save()
		res.status(201).json({ msg: 'Public profile created', profile })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}
