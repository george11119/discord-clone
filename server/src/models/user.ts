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
import { IsEmail, Length } from "class-validator"
import { UserServers } from "./userServers"
import { Message } from "./message"
import { FriendRequest } from "./friendRequest"

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true, nullable: false })
  @Length(2, 32)
  username: string

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column({ select: false, nullable: true })
  passwordHash: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => UserServers, (userServers) => userServers.user)
  userServers: UserServers[]

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[]

  @OneToMany(() => FriendRequest, (relationship) => relationship.sender)
  sentFriendRequests: FriendRequest[]

  @OneToMany(() => FriendRequest, (relationship) => relationship.receiver)
  receivedFriendRequests: FriendRequest[]
}
