import express from 'express'
import graphicsController from '@/controllers/graphicsController'

const router = express.Router()

router.get('/', graphicsController.getAll)

router.get('/projects/:id', graphicsController.get)
  
export default router