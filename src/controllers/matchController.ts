import { Request, Response } from 'express'
import { Match } from '../models/match'

export const createMatch = async (req: Request, res: Response) => {
  try {
    const match = new Match(req.body)
    await match.save()
    res.status(201).json(match)
  } catch (error) {
    res.status(500).json({ msg: 'Error creating match', error })
  }
}

export const getMatches = async (_req: Request, res: Response) => {
  try {
    const matches = await Match.find()
    res.json(matches)
  } catch (error) {
    res.status(500).json({ msg: 'Error retrieving matches', error })
  }
}

export const getMatchById = async (req: Request, res: Response) => {
  try {
    const match = await Match.findById(req.params.id)
    if (!match) {
        res.status(404).json({ msg: 'Match not found' })
    return
}
    res.json(match)
  } catch (error) {
    res.status(500).json({ msg: 'Error retrieving match', error })
  }
}

export const updateMatch = async (req: Request, res: Response) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!match) {
        res.status(404).json({ msg: 'Match not found' })
    return}
    
    res.json(match)
  } catch (error) {
    res.status(500).json({ msg: 'Error updating match', error })
  }
}

