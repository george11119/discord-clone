import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user"

@Entity()
export class FriendRequest extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  senderId: string

  @Column()
  receiverId: string

  @ManyToOne(() => User, (user) => user.sentFriendRequests, {
    onDelete: "CASCADE",
  })
  sender: User

  @ManyToOne(() => User, (user) => user.receivedFriendRequests, {
    onDelete: "CASCADE",
  })
  receiver: User
}
