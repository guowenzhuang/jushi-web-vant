import moment from 'moment'

const dateUtil = {}

/**
 * 计算指定时间与今天的时间差
 * @param time 指定时间
 * @return 相差时间 (2天前)
 */
dateUtil.timeDifferenceToContent = (time) => {
  const nowDate = moment(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'))
  let diff = nowDate.diff(time, 'years')
  if (diff > 0) {
    return diff + '年前'
  }
  diff = nowDate.diff(time, 'months')
  if (diff > 0) {
    return diff + '月前'
  }
  diff = nowDate.diff(time, 'day')
  if (diff > 0) {
    return diff + '天前'
  }
  diff = nowDate.diff(time, 'hours')
  if (diff > 0) {
    return diff + '小时前'
  }
  diff = nowDate.diff(time, 'minutes')
  if (diff > 0) {
    return diff + '分钟前'
  }
  diff = nowDate.diff(time, 'seconds')
  if (diff > 0) {
    return diff + '秒前'
  }
  return '刚刚'
}

export default dateUtil
