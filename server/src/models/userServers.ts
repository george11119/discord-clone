import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => User, (user) => user.userServers)
  user: User

  @ManyToOne(() => Server, (server) => server.userServers)
  server: Server
}
