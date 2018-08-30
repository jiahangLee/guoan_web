/**
 * Created by liekkas on 2017/3/14.
 */
export default function (v) {
  let param = `?areaType=${v.areaType}&biz=${v.biz}&bizSubtype=${v.bizSubtype}&areaName=${v.areaName}&period=${v.period}&startTime=${v.startTime}&endTime=${v.endTime}&fields=${v.fields}`
  if (v.businessType) param+=`&businessType=${v.businessType}`
  if (v.businessTypeChildren) param += `&businessTypeChildren=${v.businessTypeChildren}`
  if (v.bizCustom2) param += `&bizCustom2=${v.bizCustom2}`
  if (v.bizCustom3) param += `&bizCustom3=${v.bizCustom3}`
  return param
}
