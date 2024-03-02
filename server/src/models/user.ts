import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm"
import { IsEmail, Length } from "class-validator"
import { Server } from "./server"

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true, nullable: false })
  @Length(2, 32)
  username: string

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column({ select: false, nullable: true })
  passwordHash: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => Server, (server) => server.users)
  servers: Server[]
}
