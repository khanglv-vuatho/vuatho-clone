type Message = {
  id: string
  message: string
  time: number
}

type GroupedMessage = {
  id: string
  messages: string[]
  time: number
}

export const groupMessages = (messages: Message[]): GroupedMessage[] => {
  if (messages.length === 0) return []

  const groupedMessages: GroupedMessage[] = []
  let currentGroup: GroupedMessage = { id: messages[0].id, messages: [], time: messages[0].time }

  messages.forEach((msg, index) => {
    if (msg.id === currentGroup.id) {
      currentGroup.messages.push(msg.message)
    } else {
      groupedMessages.push({ ...currentGroup })
      currentGroup = { id: msg.id, messages: [msg.message], time: msg.time }
    }

    if (index === messages.length - 1) {
      groupedMessages.push({ ...currentGroup })
    }
  })

  return groupedMessages
}
