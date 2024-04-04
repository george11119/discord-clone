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
}

export type Server = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export type Channel = {
  id: string
  name: string
  serverId: string
  createdAt: Date
  updatedAt: Date
}
