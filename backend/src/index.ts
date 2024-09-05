import { Elysia } from "elysia"
import { cors } from '@elysiajs/cors'
import { youtubeMp36 } from "./youtube-mp36"

const app = new Elysia()

const apisv1 = new Elysia({ prefix: '/api/v1' })
	.get('/convert/:id', (req: any, res: any) => {
		const response = youtubeMp36(req.params.id)
		return response
	})

app.use(cors())
	.use(apisv1)

export default app
