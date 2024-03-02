import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column, ManyToMany,
} from "typeorm"
import { Channel } from "./channel"
import {User} from "./user"

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

  @ManyToMany(() => User, (user) => user.servers)
  users: User[]
}
