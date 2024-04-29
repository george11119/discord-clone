import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { User } from "./user"
import { Server } from "./server"

@Entity()
export class UserServers extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @Column()
  serverId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.userServers, {
    onDelete: "CASCADE",
  })
  user: User

  @ManyToOne(() => Server, (server) => server.userServers, {
    onDelete: "CASCADE",
  })
  server: Server
}
