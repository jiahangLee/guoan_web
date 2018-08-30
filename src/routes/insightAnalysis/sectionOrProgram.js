/**
 * Created by 王晓普 on 2017/7/18.
 */
export default function (v) {
  let param = `?business=${v.biz}`
  if (v.startTime) param+=`&startTime=${v.startTime}`
  if (v.regionCode) param+=`&regionCode=${v.regionCode}`
  return param
}
