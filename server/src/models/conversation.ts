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
import { Channel } from "./channel"

@Entity()
export class Conversation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  userId: string

  @Column()
  channelId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.conversations, {
    onDelete: "CASCADE",
  })
  user: User

  @ManyToOne(() => Channel, (channel) => channel.conversations, {
    onDelete: "CASCADE",
  })
  channel: Channel
}
