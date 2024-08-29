import express from 'express'
import projectsController from '@/controllers/projectsController'
import projectMiddleware from '@/middlewares/projectMiddleware'

const router = express.Router()

router.get('/', projectsController.getAll)

router.post('/', [projectMiddleware.projectValidator], projectsController.create)

router.get('/:id/tasks', projectsController.getTasks)

router.route('/:id')
  .get(projectsController.get)
  .put([projectMiddleware.projectValidator], projectsController.update)
  .delete(projectsController.delete)
  
export default router