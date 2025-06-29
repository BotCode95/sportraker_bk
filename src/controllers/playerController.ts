import { Request, Response } from 'express'
import { Player } from '../models/player'

export const createPlayer = async (req: Request, res: Response) => {
	try {
		const player = new Player(req.body)
		await player.save()

		res.status(201).json({
			msg: 'Player created successfully',
			player
		})
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}

export const getPlayers = async (req: Request, res: Response) => {

		const { value = '', query = 'name' } = req.query

	try {
			const regex = new RegExp(`^${value}$`, 'i')
		let filter = {}

		if (query === 'city') {
			filter = { city: regex }
		} else if (query === 'province') {
			filter = { province: regex }
		} else {
			filter = {
				$or: [{ firstName: regex }, { lastName: regex }]
			}
		}


		const players = await Player.find(filter)
		res.json({ players })

	} catch (error) {
		console.error(error)
		res.status(500).json({ msg: 'Error fetching players', error })
	}
}

export const getPlayerById = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const player = await Player.findById(id).populate('user')
		if (!player) {
            res.status(404).json({ msg: 'Player not found' })
            return
        }

		res.json({ player })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}

export const updatePlayer = async (req: Request, res: Response) => {
	const { id } = req.params
	const { _id, ...rest } = req.body
	try {
		const player = await Player.findByIdAndUpdate(id, rest, { new: true })
		res.json({ player })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}

export const deletePlayer = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const player = await Player.findByIdAndUpdate(id, { active: false }, { new: true })
		res.json({ player })
	} catch (error) {
		res.status(400).json({ msg: error })
	}
}
