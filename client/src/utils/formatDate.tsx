import { ru } from 'date-fns/locale'
import { format } from 'date-fns'

const ONE_DAY = 86400000

export const formatDate = (timestamp: string) =>
  format(new Date(+timestamp), Date.now() - +timestamp >= ONE_DAY ? 'd.MM, H:mm' : 'H:mm', {
    locale: ru,
  })
