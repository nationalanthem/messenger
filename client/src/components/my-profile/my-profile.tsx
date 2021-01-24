import Avatar from '../avatar/avatar'
import './my-profile.scss'

interface MyProfileProps {
  username: string
}

const MyProfile: React.FC<MyProfileProps> = ({ username }) => {
  const handleExit = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className="my-profile">
      <div className="my-profile__info">
        <Avatar size={30}>{username}</Avatar>
        <p>{username}</p>
      </div>
      <button
        title="Выйти из аккаунта"
        type="button"
        className="my-profile__exit"
        onClick={handleExit}
      ></button>
    </div>
  )
}

export default MyProfile
