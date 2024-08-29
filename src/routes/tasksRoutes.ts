import express from 'express'
import tasksController from '@/controllers/tasksController'
import taskMiddleware from '@/middlewares/taskMiddleware'

const router = express.Router()

router.get('/', tasksController.getAll)

router.post('/', [taskMiddleware.taskValidator], tasksController.create)

router.route('/:id')
  .get(tasksController.get)
  .put([taskMiddleware.taskValidator], tasksController.update)
  .delete(tasksController.delete)

export default router