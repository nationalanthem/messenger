import './person-item.scss'

const PersonItem = () => {
  return (
    <div className="person-item">
      <div className="person-item__avatar"></div>
      <div className="person-item__main">
        <h2 className="person-item__main__username">User</h2>
        <div className="person-item__main__message">
          <p className="person-item__main__message__content">Lorem ipsum...</p>
          <p className="person-item__main__message__timestamp">05:54 PM</p>
        </div>
      </div>
    </div>
  )
}

export default PersonItem
