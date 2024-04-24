import { User } from "../../types.ts"

const binarySearch = (users: User[], username: string) => {
  let start = 0
  let end = users.length - 1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)

    if (users[mid].username === username) {
      return mid
    }

    if (username < users[mid].username) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }

  return start
}

export const insertIntoUserArray = (users: User[], user: User) => {
  const usersCopy = [...users]
  const index = binarySearch(usersCopy, user.username)
  usersCopy.splice(index, 0, user)
  return usersCopy
}
