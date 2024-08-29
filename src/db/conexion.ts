import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Project } from '@/models/projectModel'
import { Task } from '@/models/taskModel'
import config from '@/config/config'

/**
 * Connection to Mysql database
 * 
 */

export const AppDataSource = new DataSource({
  type: "mysql",
  host: config.HOST,
  port: config.PORT,
  username: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  synchronize: config.SYNCHRONIZE,
  logging: false,
  entities: [Project, Task],
})