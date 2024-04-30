import { ChannelType, MessageType } from "../types.ts"

export type User = {
  id: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export type Message = {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  user: User
  channel?: Channel
  messageType: MessageType
}

export type Server = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  channels?: Channel[]
}

export type Channel = {
  id: string
  name: string
  serverId: string
  createdAt: Date
  updatedAt: Date
  server?: Server
  channelType: ChannelType
}

export type FriendRequest = {
  id: string
  senderId?: string
  receiverId?: string
  sender: User
  receiver: User
}

export type FriendRequestItem = {
  type: "sent" | "received"
  user: User
}

export type Friendship = {
  id: string
  ownerId?: string
  friendId?: string
  owner: User
  friend: User
}

export type DirectMessage = {
  id: string
  ownerId?: string
  recepientId?: string
  channelId?: string
  owner?: User
  recepient?: User
  channel?: Channel
}
