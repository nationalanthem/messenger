import './message.scss'

interface MessageProps {
  type: 'to' | 'from'
}

const Message: React.FC<MessageProps> = ({ type }) => {
  return (
    <div className={`message message--${type}`}>
      <div className="message__text">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam suscipit ipsam est,
        voluptatem odio minus voluptatum, et laborum officia non quas ducimus quis ea dignissimos.
      </div>
      <div className="message__avatar"></div>
      <div className="message__timestamp">3:45 PM</div>
    </div>
  )
}

export default Message
