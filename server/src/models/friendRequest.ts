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

@Entity()
export class FriendRequest extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  senderId: string

  @Column()
  receiverId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.sentFriendRequests, {
    onDelete: "CASCADE",
  })
  sender: User

  @ManyToOne(() => User, (user) => user.receivedFriendRequests, {
    onDelete: "CASCADE",
  })
  receiver: User
}
