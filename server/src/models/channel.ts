import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from "typeorm"
import { Message } from "./message"
import { Server } from "./server"
import { Conversation } from "./conversation"
import { User } from "./user"
import { JoinTable } from "typeorm"

export enum ChannelType {
  TEXT = "text",
}

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({
    type: "enum",
    enum: ChannelType,
    default: ChannelType.TEXT,
  })
  channelType: ChannelType

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[]

  @ManyToOne(() => Server, (server) => server.channels, { onDelete: "CASCADE" })
  server: Server

  @OneToMany(() => Conversation, (conversation) => conversation.channel)
  conversations: Conversation[]
}
