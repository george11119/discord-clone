import apiCaller, { apiConfig } from "./apiCaller.ts"

const url = "/users"

const create = async (userParams: {
  username: string
  email: string
  password: string
}) => {
  const res = await apiCaller.post(url, userParams)
  return res.data
}

const getOne = async (token: string, userId: string) => {
  const res = await apiCaller.get(`${url}/${userId}`, apiConfig(token))
  return res.data
}

const getFriends = async (token: string) => {
  const res = await apiCaller.get(`${url}/@me/friends`, apiConfig(token))
  return res.data
}

const getFriendRequests = async (token: string) => {
  const res = await apiCaller.get(`${url}/@me/friendrequests`, apiConfig(token))
  return res.data
}

const sendFriendRequest = async (token: string, username: string) => {
  const payload = { username }
  const res = await apiCaller.post(
    `${url}/@me/friendrequests`,
    payload,
    apiConfig(token),
  )
  return res.data
}

const destroyFriendRequest = async (token: string, username: string) => {
  const payload = { username }
  await apiCaller.delete(`${url}/@me/friendrequests`, {
    ...apiConfig(token),
    data: payload,
  })
}

const acceptFriendRequest = async (token: string, username: string) => {
  const payload = { username }
  await apiCaller.put(`${url}/@me/friendrequests`, payload, apiConfig(token))
}

export default {
  create,
  getOne,
  getFriends,
  getFriendRequests,
  sendFriendRequest,
  destroyFriendRequest,
  acceptFriendRequest,
}
