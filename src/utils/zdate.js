/**
 * Created by liekkas on 2017/3/14.
 */
import moment from 'moment'

export const DATE_FORMAT = {
  day: 'YYYYMMDD',
  60: 'YYYY-MM-DD HH:00:00',
  30: 'YYYY-MM-DD HH:mm:00',
  15: 'YYYY-MM-DD HH:mm:00',
  5: 'YYYY-MM-DD HH:mm:00',
  1: 'YYYY-MM-DD HH:mm:00',
  halfmonth: 'YYYYMM',
  month: 'YYYYMM',
  week: 'YYYYWW',
  year: 'YYYY',
  quarter: 'YYYY',
  goldTime: 'YYYY-MM-DD'
}

export function getDefaultDate (type) {
  switch (type) {
    case '60':
      return {
        start: moment().subtract(24, 'hours').format(DATE_FORMAT[type]),
        end: moment().subtract(1, 'hours').format(DATE_FORMAT[type])
      }
    case '30':
    case '15':
    case '5':
    case '1':
      return {
        start: moment().subtract(24, 'hours').format(DATE_FORMAT[type]),
        end: moment().subtract(1, 'hours').format(DATE_FORMAT[type])
      }
    case 'year':
      return {
        start: moment().subtract(1, 'years').format(DATE_FORMAT[type]),
        end: moment().format(DATE_FORMAT[type])
      }
    default:
      return {
        start: moment().subtract(30, 'days').format(DATE_FORMAT[type]),
        end: moment().subtract(1, 'days').format(DATE_FORMAT[type])
      }
  }
}
