import { Request, Response } from 'express'
import { Sponsorship as Sponsor } from '../models/sponsorship'

export const createSponsorRequest = async (req: Request, res: Response) => {
  try {
    const sponsor = new Sponsor(req.body)
    await sponsor.save()
    res.status(201).json(sponsor)
  } catch (error) {
    res.status(500).json({ msg: 'Error creating sponsor request', error })
  }
}

export const getSponsorRequests = async (_req: Request, res: Response) => {
  try {
    const sponsors = await Sponsor.find()
    res.json(sponsors)
  } catch (error) {
    res.status(500).json({ msg: 'Error retrieving sponsor requests', error })
  }
}

export const getSponsorById = async (req: Request, res: Response) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id)
    if (!sponsor)  {
        res.status(404).json({ msg: 'Sponsor request not found' })
    return
}
    res.json(sponsor)
  } catch (error) {
    res.status(500).json({ msg: 'Error retrieving sponsor request', error })
  }
}

export const updateSponsor = async (req: Request, res: Response) => {
  try {
    const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!sponsor) {
        res.status(404).json({ msg: 'Sponsor request not found' })
        return
    } 
    res.json(sponsor)
  } catch (error) {
    res.status(500).json({ msg: 'Error updating sponsor request', error })
  }
}
