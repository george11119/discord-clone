import {
  AfterInsert,
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "./user"

@Entity()
export class Friendship extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  ownerId: string

  @Column()
  friendId: string

  @ManyToOne(() => User, (user) => user.ownedFriendships, {
    onDelete: "CASCADE",
  })
  owner: User

  @ManyToOne(() => User, (user) => user.friends, {
    onDelete: "CASCADE",
  })
  friend: User

  @BeforeInsert()
  async createInverseFriendship() {
    await Friendship.save({
      ownerId: this.friendId,
      friendId: this.ownerId,
    })
  }
}
