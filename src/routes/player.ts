import { Router } from 'express'
import { check } from 'express-validator'
import { validateJWT } from '../middlewares/validate-jwt'
import {
  getPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
} from '../controllers/playerController'

const router = Router()

router.get('/', getPlayers)
router.get('/:id', getPlayerById)
router.post('/', [validateJWT], createPlayer)
router.put('/:id', [validateJWT], updatePlayer)
router.delete('/:id', [validateJWT], deletePlayer)

export default router