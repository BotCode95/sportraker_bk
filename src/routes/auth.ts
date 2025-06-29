import {Router} from 'express'
import {check} from 'express-validator'
import {login, validateTokenUser} from '../controllers/authController'
import {validateJWT} from'../middlewares/validate-jwt'

const router = Router()

router.get('/',[validateJWT], validateTokenUser )
router.post('/login', [
	check('email', 'the email address is required').isEmail(),
	check('password', 'the password is required').not().isEmpty(),
], login)



export default router