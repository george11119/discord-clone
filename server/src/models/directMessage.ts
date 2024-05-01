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
export class DirectMessage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  ownerId: string

  @Column()
  recepientId: string

  @Column()
  channelId: string

  @Column({ default: 0 })
  seenMessagesCount: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.ownedDirectMessages, {
    onDelete: "CASCADE",
  })
  owner: User

  @ManyToOne(() => User, (user) => user.receivedDirectMessages, {
    onDelete: "CASCADE",
  })
  recepient: User

  @ManyToOne(() => Channel, (channel) => channel.conversations, {
    onDelete: "CASCADE",
  })
  channel: Channel
}
