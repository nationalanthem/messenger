import './dialog-header.scss'

const DialogHeader = () => {
  return (
    <div className="dialog-header">
      <div className="dialog-header__user">
        <div className="dialog-header__user__avatar"></div>
        <div className="dialog-header__user__info">
          <h1 className="dialog-header__user__info__username">User</h1>
          <p className="dialog-header__user__info__last-seen">Был в сети 5 минут назад</p>
        </div>
      </div>
    </div>
  )
}

export default DialogHeader
