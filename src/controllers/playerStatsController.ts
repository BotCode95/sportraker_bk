import { Request, Response } from 'express'
import { PlayerStats } from '../models/stats'

export const createPlayerStats = async (req: Request, res: Response) => {
	try {
		const stats = new PlayerStats(req.body)
		await stats.save()
		res.status(201).json({ msg: 'Stats created', stats })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}

export const getStatsByPlayer = async (req: Request, res: Response) => {
	const { playerId } = req.params
	try {
		const stats = await PlayerStats.findOne({ player: playerId })
		if (!stats) {
			res.status(404).json({ msg: 'Stats not found' })
			return
		}

		res.json({ stats })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}

export const updateStats = async (req: Request, res: Response) => {
	const { playerId } = req.params
	try {
		const stats = await PlayerStats.findOneAndUpdate(
			{ player: playerId },
			req.body,
			{ new: true }
		)
		res.json({ stats })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}
