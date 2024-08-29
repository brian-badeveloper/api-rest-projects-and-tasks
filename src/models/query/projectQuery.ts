import { QueryBuilder, SelectQueryBuilder } from "typeorm"
import { Project } from "../projectModel"

export class ProjectQuery extends SelectQueryBuilder<Project> {
  constructor(builder: QueryBuilder<Project>) {
    super(builder)
  }

  scopeId(id: number) {
    this.where(`projects.id = :id`, { id })
    return this
  }

  scopeName(name?: string) {
    if (name) {
      this.where("projects.name LIKE :name", {name: `%${name}%`})
    }

    return this
  }

  scopeDescription(description?: string) {
    if (description) {
      this.orWhere("projects.description LIKE :description", {description: `%${description}%`})
    }

    return this
  }
}