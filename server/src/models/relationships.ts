import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user"

export enum FriendshipType {
  PENDING = 1,
  FRIENDS = 2,
}

@Entity()
export class Relationships extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  senderId: string

  @Column()
  receiverId: string

  @ManyToOne(() => User, (user) => user.sentRelationships, {
    onDelete: "CASCADE",
  })
  sender: User

  @ManyToOne(() => User, (user) => user.receivedRelationships, {
    onDelete: "CASCADE",
  })
  receiver: User
}
