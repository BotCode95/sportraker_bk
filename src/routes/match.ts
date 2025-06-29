import { Router } from 'express'
import { check } from 'express-validator'
import { validateJWT } from '../middlewares/validate-jwt'
import {
    createMatch,getMatchById,getMatches,updateMatch
} from '../controllers/matchController'

const router = Router()

router.get('/', getMatches)
router.get('/:id', getMatchById)
router.post('/', [validateJWT], createMatch)
router.put('/:id', [validateJWT], updateMatch)

export default router