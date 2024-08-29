import { Project } from "@/models/projectModel"
import { Task } from "@/models/taskModel"
import { AppDataSource } from "@/db/conexion"

const TaskRepository = AppDataSource.getRepository(Task)
const ProjectRepository = AppDataSource.getRepository(Project)

/**
 * delete project
 * 
 * @param {number} id 
 * @param {boolean} destroy
 * 
 * @return {Object} response
 */

const validateProject = async (id: number, destroy?: boolean, task?: number) => {

  const response = {
    message: '',
    error: false,
    project: {},
    tasks: [],
    countTotalTasks: 0,
    countCompletedTasks: 0
  }
   
  const projectRecord = await ProjectRepository.findOne({where: {id: id}, relations: {tasks: true}}) 
  if (!projectRecord) {
    response.message = 'Project not founds'
    response.error = true
    return response
  }

  let tasksRecord = 0
  let stateProject = false

  if (destroy && task) {
    tasksRecord = await TaskRepository.createQueryBuilder('tasks')
      .where(`tasks.project = :project AND tasks.status = :status AND tasks.id != :task`, { project: id, status: 1, task})
      .setFindOptions({relations: {project: true}})
      .getCount()
    stateProject = projectRecord.tasks.length <= (tasksRecord + 1) && (projectRecord.tasks.length - 1) > 0 ? true : false
  } else {
    tasksRecord = await TaskRepository.createQueryBuilder('tasks')
      .where(`tasks.project = :project AND tasks.status = :status`, { project: id, status: 1})
      .setFindOptions({relations: {project: true}})
      .getCount()
      stateProject = projectRecord.tasks.length === tasksRecord && projectRecord.tasks.length > 0 ? true : false
  }

  const { tasks, createdAt, updatedAt, ...project } = projectRecord

  const row = await ProjectRepository.update({id: Number(id)}, {...project, isCompleted: stateProject})

  if (!row.affected) {
    response.message = 'Record has not been updated'
    response.error = true
    return response
  }

  return {
    ...response,
    project: projectRecord,
    tasks: tasksRecord,
    countTotalTasks: projectRecord.tasks.length,
    countCompletedTasks: tasksRecord
  }
}

export default validateProject