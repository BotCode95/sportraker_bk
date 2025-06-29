import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import {createSponsorRequest, getSponsorById,getSponsorRequests,updateSponsor
} from '../controllers/sponsorShipController'

const router = Router()

router.get('/', getSponsorRequests)
router.get('/:id', getSponsorById)
router.post('/', [validateJWT], createSponsorRequest)
router.put('/:id', [validateJWT], updateSponsor)

export default router