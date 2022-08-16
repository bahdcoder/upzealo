import { Interval, DateTime } from 'luxon'
import Humanize from 'humanize-duration'

export function toDiffForHumans(date: string) {
  const now = DateTime.now()
  const past = DateTime.fromJSDate(new Date(date))

  const distanceInSeconds = Interval.fromDateTimes(past, now).toDuration().valueOf()

  return Humanize(distanceInSeconds, {
    round: true,
  })
}
