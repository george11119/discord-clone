import {
  BaseEntity,
  BeforeInsert,
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

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.ownedDirectMessages)
  owner: User

  @ManyToOne(() => User, (user) => user.receivedDirectMessages)
  recepient: User

  @ManyToOne(() => Channel, (channel) => channel.conversations, {
    onDelete: "CASCADE",
  })
  channel: Channel

  @BeforeInsert()
  async createInverseFriendship() {
    await DirectMessage.save({
      ownerId: this.recepientId,
      recepientId: this.ownerId,
      channelId: this.channelId,
    })
  }
}
