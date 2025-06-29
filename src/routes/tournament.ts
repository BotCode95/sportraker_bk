import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import {
  getTournaments,
  getTournamentById,
  createTournament,
  updateTournament
} from '../controllers/tournamentController'

const router = Router()

router.get('/', getTournaments)
router.get('/:id', getTournamentById)
router.post('/', [validateJWT], createTournament)
router.put('/:id', [validateJWT], updateTournament)

export default router
