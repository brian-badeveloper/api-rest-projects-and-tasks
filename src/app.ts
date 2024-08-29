import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import tasksRoutes from '@/routes/tasksRoutes'
import projectsRoutes from '@/routes/projectsRoutes'
import graphicsRoutes from '@/routes/graphicsRoutes'
import config from '@/config/config'

const app = express()

console.log(`NODE_ENV=${config.NODE_ENV}`)

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Api!!!')
})

app.use('/projects', projectsRoutes)
app.use('/tasks', tasksRoutes)
app.use('/graphics', graphicsRoutes)

export default app