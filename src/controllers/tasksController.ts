import { Request, Response } from 'express'
import { AppDataSource } from '@/db/conexion'
import { Task } from '@/models/taskModel'
import { Project } from '@/models/projectModel'
import validateProject from '@/helpers/projectHelper'
import { TaskQuery } from '@/models/query/taskQuery'

const TaskRepository = AppDataSource.getRepository(Task)
const ProjectRepository = AppDataSource.getRepository(Project)

class TasksController {

  /**
   * constructor
   * 
   */

  constructor() {}


  /**
   * get all tasks
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async getAll(req: Request, res: Response) {
    const { search, skip = 0, take = 50 } = req.query

    try {
        const rows = await new TaskQuery(TaskRepository.createQueryBuilder("tasks").setFindOptions({relations: {project: true}, order: { id: 'DESC' }}))
        .scopeName(search as string)
        .scopeDescription(search as string)
        .scopeStatus(Number(search))
        .skip(Number(skip))
        .take(Number(take))
        .getMany()
        res.status(200).json({data: rows, skip: Number(skip), take: Number(take), total: rows.length})

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
      const rows = await TaskRepository.findOne({where:{id: Number(id)}, relations: {project: true,}})
      if (!rows) {
        return res.status(404).json({message: 'Record Not Found'})
      }

      res.status(200).json(rows)
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }

  /**
   * create new task
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async create(req: Request, res: Response) {
    try {
      const { project, status } = req.body
      const projectRecord = await ProjectRepository.findOne({where: {id: Number(project)}, relations: {tasks: true}}) 
      if (!projectRecord) {
        return res.status(404).json({message: 'Project not found'})
      }

      const rows = await TaskRepository.save(req.body)
      const data = await validateProject(project)

      if (data.error) {
        return res.status(403).json({message: data.message})
      }

      res.status(201).json({message: 'Record created correctly', data: rows})
      
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }

  /**
   * update task
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async update(req: Request, res: Response) {
    const { id } = req.params
    try {
      const { project } = req.body
      const projectRecord = await ProjectRepository.findOneBy({id: Number(project)}) 
      if (!projectRecord) {
        return res.status(404).json({message: 'Project not found'})
      }

      const rows = await TaskRepository.findOne({where: {id: Number(id)}, relations: {project: true}})
      if (!rows) {
        return res.status(404).json({message: 'Record Not Found'})
      }
      
      const idTaskCurrent = rows.project.id
      if (idTaskCurrent && Number(project) != Number(idTaskCurrent)) {
        const dataChange = await validateProject(Number(idTaskCurrent),true,Number(id))
      }

      const row = await TaskRepository.update({id: Number(id)}, req.body)
      const data = await validateProject(Number(project))

      if (!row.affected) {
        return res.status(400).json({message: 'Record has not been updated'})
      }

      if (data.error) {
        return res.status(403).json({message: data.message})
      }

      res.status(201).json({message: 'Record updated correctly'})
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }

  /**
   * delete task
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const rows = await TaskRepository.findOne({where: {id: Number(id)}, relations: {project: true}})
      if (!rows) {
        return res.status(404).json({message: 'Record Not Found'})
      }

      const project = rows.project.id
      const data = await validateProject(Number(project),true,Number(id))

      if (data.error) {
        return res.status(403).json({message: data.message})
      } else {
        const row = await TaskRepository.delete({id: Number(id)})
      }

      res.status(202).json({message: 'Record delete correctly'})
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }
}

export default new TasksController()