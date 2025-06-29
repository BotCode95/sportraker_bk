import { Router } from 'express'
import { validateJWT } from '../middlewares/validate-jwt'
import {
    createPlayerStats,
  getStatsByPlayer,
  updateStats
} from '../controllers/playerStatsController'

const router = Router()

router.post('/', [validateJWT], createPlayerStats)
router.get('/:id', getStatsByPlayer)
router.put('/:id', [validateJWT], updateStats)

export default router