import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import {
  createOrUpdatePublicProfile,
  getPublicProfileByPlayer
} from '../controllers/publicProfileController'

const router = Router()

router.post('/', [validateJWT], createOrUpdatePublicProfile)
router.get('/:playerId', getPublicProfileByPlayer)

export default router
