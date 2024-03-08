import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from "typeorm"
import { Channel } from "./channel"
import { UserServers } from "./userServers"

@Entity()
export class Server extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Channel, (channel) => channel.server)
  channels: Channel[]

  @OneToMany(() => UserServers, (userServers) => userServers.server)
  userServers: UserServers[]
}
