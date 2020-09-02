import Koa from 'koa'
import Router from '@koa/router'
import * as fs from 'fs'
import * as util from 'util'
import cors from '@koa/cors'
import {encode} from '@msgpack/msgpack'

const app = new Koa()

app.use(cors())
const rt = new Router()

const read = async (file: string) => {
	const readFile = util.promisify(fs.readFile)
	return readFile(file)
}

rt.get('/image', async ctx => {
	const data = await read('/home/beckspoppn/Dev/trykoa/image.jpg')
	const resp = {name: 'gary', data: Uint8Array.from(data), age: 37}
	const body = encode(resp)
	console.log(body)
	ctx.status = 200
	ctx.body = body
	ctx.response.type = 'application/x-msgpack'
})

app.use(rt.routes())
app.listen(3000)

