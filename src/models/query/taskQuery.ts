import { SelectQueryBuilder } from "typeorm"
import { Task } from "../taskModel" 

export class TaskQuery extends SelectQueryBuilder<Task> {
  constructor(builder: SelectQueryBuilder<Task>) {
    super(builder)
  }

  scopeIdProject(project: number) {
    this.where(`tasks.project = :project`, { project })
    return this
  }

  scopeName(name?: string) {
    if (name) {
      this.having("tasks.name LIKE :name", {name: `%${name}%`})
    }

    return this
  }

  scopeDescription(description?: string) {
    if (description) {
      this.orHaving("tasks.description LIKE :description", {description: `%${description}%`})
    }

    return this
  }

  scopeStatus(status?: number) {
    if (status) {
      this.orHaving("tasks.status = :status", {status})
    }

    return this
  }
}