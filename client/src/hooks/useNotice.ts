import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectNotice } from '../redux/re-ducks/notice/selectors'
import { toast } from 'react-hot-toast'

const style = {
  borderRadius: '5px',
  background: '#333',
  color: '#fff',
}

export const useNotice = () => {
  const notice = useSelector(selectNotice)

  useEffect(() => {
    if (notice) {
      switch (notice.kind) {
        case 'success':
          toast.success(notice.text, { style })
          break
        case 'error':
          toast.error(notice.text, { style })
          break
        case 'info':
          toast(notice.text, { style })
      }
    }
  }, [notice])
}
