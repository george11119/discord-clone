import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm"
import { Channel } from "./channel"
import { User } from "./user"

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  content: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => Channel, (channel) => channel.messages, {
    onDelete: "CASCADE",
  })
  channel: Channel

  @ManyToOne(() => User, (user) => user.messages)
  user: User
}
