import express,{Application} from 'express'
import cors from 'cors'
import authRoutes from '../routes/auth'
import userRoutes from '../routes/user'
import playerRoutes from '../routes/player'
import publicProfileRoutes from '../routes/publicProfile'
import statsRoutes from '../routes/stats'
import tournamentRoutes from '../routes/tournament'
import sponsorshipRoutes from '../routes/sponsorShip'
import matchRoutes from '../routes/match'
import { dbConnection } from '../database/config'
export class Server {

	private port : string | undefined
	private app : Application
	private pathBase = '/api'
	private path = {
		auth: `${this.pathBase}/auth`,
		users: `${this.pathBase}/user`,
		player: `${this.pathBase}/player`,
		stats: `${this.pathBase}/stats`,
		tournament: `${this.pathBase}/tournament`,
		publicProfile: `${this.pathBase}/public-profile`,
		match: `${this.pathBase}/match`,
		sponsorship: `${this.pathBase}/sponsorship`,
	}

	// corsOptions = {
	// 	origin: ['http://localhost:5173', 'http://192.168.0.103:5173'], // Permitir solo este origen
	// 	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
	// 	allowedHeaders: ['Content-Type', 'x-token', 'Authorization'], // Encabezados permitidos
	// }


	constructor(){
		this.app = express()
		this.port = process.env.NODE_ENV === 'dev' ? process.env.PORT_DEVELOPMENT : process.env.PORT
		this.connectionDB()
		this.middlewares()
		this.routes()
	}


	middlewares() {
		this.app.use(cors())
		this.app.use(express.json())
		// this.app.options('*', cors(this.corsOptions))
	}


	async connectionDB() {
		await dbConnection()
	}

	routes() {
		this.app.use(this.path.auth,authRoutes)
		this.app.use(this.path.users, userRoutes)
		this.app.use(this.path.player, playerRoutes)
		this.app.use(this.path.publicProfile, publicProfileRoutes)
		this.app.use(this.path.stats, statsRoutes)
		this.app.use(this.path.tournament, tournamentRoutes)
		this.app.use(this.path.match, matchRoutes)
		this.app.use(this.path.sponsorship, sponsorshipRoutes)
	}	
   
	listen(){
		this.app.listen(this.port, () => {
			console.log(`Server run in ${this.port}`)
		})
	}

}

