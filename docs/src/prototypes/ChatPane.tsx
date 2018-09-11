import * as React from 'react'
import Scrollbars from 'react-custom-scrollbars'

import { Button, Chat } from '@stardust-ui/react'
import { ChatService } from './chat-service'

class ChatMessageList extends React.Component {
  public render() {
    const messages = ChatService.instance.allMessages()
    const chatItems = messages.map(item => {
      return {
        key: item.id,
        content: this.addLinkAndButton(item.message),
        mine: item.mine,
      }
    })

    return (
      <>
        <Scrollbars className="message-list-scroll">
          <Chat messages={chatItems} style={{ margin: 'auto', maxWidth: '90.8rem' }} />
        </Scrollbars>
      </>
    )
  }

  private addLinkAndButton(text: string): React.ReactNode {
    return (
      <>
        <span>{text}</span>
        <br />
        <Button content="Click to lunch rocket!" />
        <a href="#">Show rocket coordinates</a>
      </>
    )
  }
}

export default ChatMessageList
