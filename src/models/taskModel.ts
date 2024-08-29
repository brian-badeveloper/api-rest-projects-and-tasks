import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Project } from "./projectModel"
import { IsDefined, IsNotEmpty, IsNumber, Length, Validate, ValidateIf } from "class-validator"

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @Length(3)
  @Column()
  name: string

  @Column('text')
  description: string

  @IsNotEmpty()
  @IsNumber()
  @Column()
  status: number

  @ManyToOne(() => Project, (project) => project.tasks,{
    onDelete: 'CASCADE',
  })
  @IsNotEmpty()
  @JoinColumn({ name: 'project_id' })
  project: Project

  @CreateDateColumn()
  createdAt: Date
  
  @UpdateDateColumn()
  updatedAt: Date
}