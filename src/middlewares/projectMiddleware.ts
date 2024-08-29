import { NextFunction, Request, Response } from 'express'
import { validate } from 'class-validator'
import { Project } from '@/models/projectModel'

class ProjectMiddleware {

  /**
   * constructor
   * 
   */

  constructor () {}

  /**
   * validate project fields
   * 
   * @param {Request} req 
   * @param {Response} res
   * @param {NextFunction} next
   * 
   * @return {Response} res
   */
  
  projectValidator (req: Request, res: Response, next: NextFunction) {
    
    const {
      name,
      description
    } = req.body

    const valid = new Project()
    valid.name = name
    valid.description = description

    validate(valid, { validationError: { target: false, value: false }}).then(error => {
      if (error.length > 0) {
        return res.status(403).json(error)
      } else {
        next()
      }
    })
    
  }
}

export default new ProjectMiddleware()