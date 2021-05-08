import { formatDistance } from 'date-fns'

const date = (value) => {
  return formatDistance(new Date(value), new Date(), { addSuffix: true })
}

export { date }
