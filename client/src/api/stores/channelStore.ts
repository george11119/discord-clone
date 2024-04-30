import { useQueryClient } from "@tanstack/react-query"
import { Channel } from "../../../types.ts"

const useChannelStore = () => {
  const queryKey = "channels"
  const queryClient = useQueryClient()

  // const get = () => {
  //   const channels = queryClient.getQueryData()
  // }

  const addOne = (newChannel: Channel) => {
    const oldChannels = queryClient.getQueryData([
      queryKey,
      `${newChannel.serverId}`,
    ]) as Channel[]
    const newChannels = oldChannels.concat(newChannel)
    queryClient.setQueryData([queryKey, `${newChannel.serverId}`], newChannels)
    return newChannels
  }

  const updateOne = (editedChannel: Channel) => {
    const oldChannels = queryClient.getQueryData([
      queryKey,
      `${editedChannel.serverId}`,
    ]) as Channel[]
    const newChannels = oldChannels.map((c) =>
      c.id === editedChannel.id ? editedChannel : c,
    )
    queryClient.setQueryData(
      [queryKey, `${editedChannel.serverId}`],
      newChannels,
    )
    return newChannels
  }

  const deleteOne = (channelId: string, serverId: string) => {
    const oldChannels = queryClient.getQueryData([
      queryKey,
      serverId,
    ]) as Channel[]
    const newChannels = oldChannels.filter((c) => c.id !== channelId)
    queryClient.setQueryData([queryKey, serverId], newChannels)
    return newChannels
  }

  return { addOne, updateOne, deleteOne }
}

export default useChannelStore
