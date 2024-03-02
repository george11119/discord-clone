import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm"
import { Message } from "./message"
import { Server } from "./server"

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Message, (message) => message.channel)
  messages: Message[]

  @ManyToOne(() => Server, (server) => server.channels, { onDelete: "CASCADE" })
  server: Server
}
