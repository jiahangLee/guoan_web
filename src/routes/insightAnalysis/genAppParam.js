/**
 * Created by zhangtao on 2017/11/28.
 */
export default function (v) {
  let param = `?business=${v.bizSubtype}`
  if (v.biz) param+=`&biz=${v.biz}`
  return param
}
