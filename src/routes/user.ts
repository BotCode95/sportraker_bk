import { Router } from 'express'
import { check } from 'express-validator'
import { isRoleValidate } from '../utils/validators'
import {validateJWT} from '../middlewares/validate-jwt'
import {createUser, getUsers, getUserById, updateUser, deleteUser, getUsersCounts, changePasswordUser, changePasswordByEmailUser} from '../controllers/userController'

const router = Router()
router.get('/', [validateJWT], getUsers)
router.get('/count', getUsersCounts)
router.get('/:id', getUserById)
router.post('/', [
	check('name', 'El nombre es requerido').not().isEmpty(),
	check('lastname', 'El apellido es requerido').not().isEmpty(),
	check('password', 'La contraseña debe contener al menos 6 caracteres').isLength({min: 6}),
	check('email', 'El email no es valido').isEmail(),
	check('rol').custom(isRoleValidate),
], createUser)
router.post('/change-password', [validateJWT],changePasswordUser)
router.post('/change-password-by_email',changePasswordByEmailUser) 
router.put('/:id', [
	check('rol').custom(isRoleValidate),
],updateUser)
router.delete('/:id', [
	validateJWT,
],deleteUser)

export default router