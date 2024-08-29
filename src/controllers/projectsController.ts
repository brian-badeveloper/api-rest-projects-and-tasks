import {Request, Response} from 'express'
import { Project } from '@/models/projectModel'
import { Task } from '@/models/taskModel'
import { TaskQuery } from '@/models/query/taskQuery'
import { AppDataSource } from '@/db/conexion'
import { ProjectQuery } from '@/models/query/projectQuery'

const ProjectRepository = AppDataSource.getRepository(Project)
const TaskRepository = AppDataSource.getRepository(Task)

class ProjectsController {

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
    const {search, skip = 0, take = 50} = req.query
    try {
        const rows = await new ProjectQuery(ProjectRepository.createQueryBuilder("projects").setFindOptions({relations: {tasks: true}, order: { id: 'DESC' }}))
            .scopeName(search as string)
            .scopeDescription(search as string)
            .skip(Number(skip))
            .take(Number(take))
            .distinct()
            .getManyAndCount()
        res.status(200).json({data: rows[0], skip: Number(skip), take: Number(take), total: rows[1]})

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
      const rows = await new ProjectQuery(ProjectRepository.createQueryBuilder('projects').setFindOptions({relations: {tasks: true}, order: {id: 'ASC'}}))
          .scopeId(Number(id))
          .getOne()
  
      if (!rows) {
        return res.status(404).json({message: 'Records Not Found'})
      }

      res.status(200).json(rows)
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }

  /**
   * get all project tasks
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async getTasks(req: Request, res: Response) {
    const { id } = req.params
    const { search, skip = 0, take = 50 } = req.query

    try {
      const rows = await new TaskQuery(TaskRepository.createQueryBuilder('tasks').setFindOptions({relations: {project: true}, order: {id: 'ASC'}}))
          .scopeIdProject(Number(id))
          .scopeName(search as string)
          .scopeDescription(search as string)
          .scopeStatus(Number(search))
          .skip(Number(skip))
          .take(Number(take))
          .getMany()
      const rowsTotal = await new TaskQuery(TaskRepository.createQueryBuilder('tasks').setFindOptions({relations: {project: true}, order: {id: 'ASC'}}))
          .scopeIdProject(Number(id))
          .scopeName(search as string)
          .scopeDescription(search as string)
          .scopeStatus(Number(search))
          .getMany()
  
      res.status(200).json({data: rows, skip: Number(skip), take: Number(take), total: rowsTotal.length})
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }

  /**
   * create new project
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async create(req: Request, res: Response) {
    try {
      const rows = await ProjectRepository.save(req.body)
      res.status(201).json({message: 'Record created correctly', data: rows})
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }

  /**
   * update project
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async update(req: Request, res: Response) {
    const { id } = req.params
    try {
      const rows = await ProjectRepository.findOneBy({id: Number(id)})
      if (!rows) {
        return res.status(404).json({message: 'Record Not Found'})
      }

      const row = await ProjectRepository.update({id: Number(id)}, req.body)

      if (!row.affected) {
        res.status(400).json({message: 'Record has not been updated'})
      }

      res.status(201).json({message: 'Record updated correctly'})
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }

  /**
   * delete project
   * 
   * @param {Request} req 
   * @param {Response} res
   * 
   * @return {Response} res
   */

  async delete(req: Request, res: Response) {
    const { id } = req.params
    try {
      const rows = await ProjectRepository.findOneBy({id: Number(id)})
      if (!rows) {
        return res.status(404).json({message: 'Record Not Found'})
      }

      const row = await ProjectRepository.delete({id: Number(id)})
      res.status(202).json({message: 'Record delete correctly'})
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).send(err.message)
      }
    }
  }
}

export default new ProjectsController()