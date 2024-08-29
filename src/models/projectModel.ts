import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Task } from "./taskModel"
import {
  IsNotEmpty,
  Length
} from "class-validator"

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @Length(3)
  @Column({ unique: true })
  name: string

  @Column('text')
  description: string

  @Column({type: 'boolean', default: false})
  isCompleted: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[]
}