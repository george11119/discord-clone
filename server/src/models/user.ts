import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm"
import { IsEmail, Length } from "class-validator"
import { UserServers } from "./userServers"
import { Server } from "./server"
import { JoinTable } from "typeorm/browser"

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

  @OneToMany(() => UserServers, (userServers) => userServers.user, {
    onDelete: "CASCADE",
  })
  userServers: UserServers[]
}
