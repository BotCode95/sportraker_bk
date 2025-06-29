import { Request, Response } from 'express'
import { Tournament } from '../models/tournament'

export const createTournament = async (req: Request, res: Response) => {
	try {
		const tournament = new Tournament(req.body)
		await tournament.save()
		res.status(201).json({ msg: 'Tournament created', tournament })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}

export const getTournaments = async (_req: Request, res: Response) => {
	try {
		const tournaments = await Tournament.find()
		res.json({ tournaments })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}

export const getTournamentById = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const tournament = await Tournament.findById(id)
		if (!tournament) {
            res.status(404).json({ msg: 'Tournament not found' })
            return
        }

		res.json({ tournament })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}

export const updateTournament = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const updated = await Tournament.findByIdAndUpdate(id, req.body, { new: true })
		res.json({ tournament: updated })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}
