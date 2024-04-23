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

export enum MessageType {
  NORMAL = 1,
  WELCOME = 2,
}

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  content: string

  @Column({
    type: "enum",
    enum: MessageType,
    default: MessageType.NORMAL,
  })
  messageType: MessageType

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
