import { useLayoutEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectDialogData } from '../../redux/re-ducks/dialog/selectors'
import Message from '../message/message'
import './message-box.scss'

const MessageBox = () => {
  const dialogData = useSelector(selectDialogData)

  const msgBoxRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (dialogData && msgBoxRef.current) {
      msgBoxRef.current.scrollTo({ top: msgBoxRef.current.scrollHeight })
    }
  }, [dialogData])

  if (!dialogData) return null

  return (
    <div className="message-box" ref={msgBoxRef}>
      {dialogData.messages.map((message) => (
        <Message
          key={message.message_id}
          text={message.text}
          timestamp={message.created_at}
          type={message.type}
        />
      ))}
    </div>
  )
}

export default MessageBox
