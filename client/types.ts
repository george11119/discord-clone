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
  channelType: "text"
}

export enum MessageType {
  NORMAL = 1,
  WELCOME = 2,
}
