import { internet, lorem, date, name } from 'faker'
import * as _ from 'lodash'

export class ChatListItemData {
  public id: number = 0
  public avatarUrl: string = ''
  public chatName: string = ''
  public message: string = ''
  public msgDate: Date = new Date()
}

export class ChatMessageData {
  public id: number = 0
  public mine: boolean = false
  public message: string = ''
  public date: Date = new Date()
}

export class ChatService {
  public static get instance(): ChatService {
    if (!ChatService.thisInstance) {
      ChatService.thisInstance = new ChatService()
    }

    return ChatService.thisInstance
  }

  private static thisInstance: ChatService
  private static data: ChatListItemData[] = _.times(10, i => ({
    id: i,
    avatarUrl: internet.avatar(),
    chatName: `${name.firstName()} ${name.lastName()}`,
    message: lorem.sentence(),
    msgDate: date.past(),
  }))

  private static chatMessages: ChatMessageData[] = _.times(10, i => ({
    id: i,
    mine: !!(i % 3),
    message: lorem.sentences(_.random(1, 5, false)),
    date: date.past(),
  }))

  public all(): ChatListItemData[] {
    return ChatService.data
  }

  public allMessages(): ChatMessageData[] {
    return ChatService.chatMessages
  }
}
