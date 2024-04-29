import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { IsEmail, Length } from "class-validator"
import { UserServers } from "./userServers"
import { Message } from "./message"
import { FriendRequest } from "./friendRequest"
import { Friendship } from "./friendship"
import { DirectMessage } from "./directMessage"
import { Channel } from "./channel"

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

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.sender)
  sentFriendRequests: FriendRequest[]

  @OneToMany(() => FriendRequest, (friendRequest) => friendRequest.receiver)
  receivedFriendRequests: FriendRequest[]

  @OneToMany(() => Friendship, (friendship) => friendship.owner)
  ownedFriendships: Friendship[]

  @OneToMany(() => Friendship, (friendship) => friendship.friend)
  friends: Friendship[]

  @OneToMany(() => DirectMessage, (conversation) => conversation.owner)
  ownedDirectMessages: DirectMessage[]

  @OneToMany(() => DirectMessage, (conversation) => conversation.recepient)
  receivedDirectMessages: DirectMessage[]
}
