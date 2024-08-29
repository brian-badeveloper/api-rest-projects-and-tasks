import { NextFunction, Request, Response } from 'express'
import { validate } from 'class-validator'
import { Task } from '@/models/taskModel'

class TaskMiddleware {

  /**
   * constructor
   * 
   */

  constructor () {}

  /**
   * validate task fields
   * 
   * @param {Request} req 
   * @param {Response} res
   * @param {NextFunction} next
   * 
   * @return {Response} res
   */
  
  taskValidator (req: Request, res: Response, next: NextFunction) {
    const {
      name,
      description,
      status,
      project
    } = req.body

    const valid = new Task()
    valid.name = name
    valid.description = description
    valid.status = status
    valid.project = project

    validate(valid, { validationError: { target: false, value: false }}).then(error => {
      if (error.length > 0) {
        return res.status(500).json(error)
      } else {
        next()
      }
    })
  }
}

export default new TaskMiddleware()