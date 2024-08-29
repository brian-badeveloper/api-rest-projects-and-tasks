import {Request, Response} from 'express'
import { Project } from '@/models/projectModel'
import { Task } from '@/models/taskModel'
import { TaskQuery } from '@/models/query/taskQuery'
import { AppDataSource } from '@/db/conexion'

const ProjectRepository = AppDataSource.getRepository(Project)
const TaskRepository = AppDataSource.getRepository(Task)

class GraphicsController {

  /**
   * constructor
   *
   */

  constructor() {}

  /**
   * get all projects
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async getAll(req: Request, res: Response) {
    try {
        const projects = await ProjectRepository.createQueryBuilder("project").getCount()
        const tasks = await TaskRepository.createQueryBuilder("task").getCount()
        const tasksCompleted = await TaskRepository.createQueryBuilder("task").where({status: 1}).getCount()
        const countProjectsCompleted = await ProjectRepository.createQueryBuilder("project").where({isCompleted: true}).getCount()

        res.status(200).json({
          countProjects: projects,
          countTasks: tasks,
          countTasksCompleted: tasksCompleted,
          countProjectsCompleted: countProjectsCompleted
        })

    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }

  /**
   * get a project
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async get(req: Request, res: Response) {
    const { id } = req.params
    try {
      const rows = await ProjectRepository.findOne({where: {id: Number(id)}, relations: {tasks: true}})
      if (!rows) {
        return res.status(404).json({message: 'Record Not Found'})
      }

      const tasksCompleted = await TaskRepository.createQueryBuilder("task").where({project:Number(id), status: 1}).getCount()

      const response = {
        ...rows,
        countTasks: rows.tasks.length,
        countCompledTasks: tasksCompleted 
      }

      res.status(200).json(response)
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }
}

export default new GraphicsController()