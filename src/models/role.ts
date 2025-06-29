import {Schema, model} from 'mongoose'
interface IRole {
    rol: string
}
const RoleSchema = new Schema<IRole>({
	rol: {
		type: String,
		required: [true, 'the role is required']
	}
})

export const Role = model<IRole>('Role', RoleSchema)