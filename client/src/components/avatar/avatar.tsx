import './avatar.scss'

interface AvatarProps {
  size?: number
  children?: string
}

const Avatar: React.FC<AvatarProps> = ({ size, children }) => {
  const styles = size
    ? {
        width: `${size}px`,
        height: `${size}px`,
        lineHeight: `${size}px`,
        fontSize: `${Math.floor(size / 2)}px`,
      }
    : undefined

  return (
    <div style={styles} className="avatar">
      {children?.charAt(0).toUpperCase()}
    </div>
  )
}

export default Avatar
