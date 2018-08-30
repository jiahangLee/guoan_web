/**
 * Created by liekkas on 16/6/1.
 */
import _ from 'lodash'

/**
 * 从扁平数组数据转换为树形数据
 * 比如:
 * [
 *    {id: 1, name: 'a', pid: 0},
 *    {id: 2, name: 'b', pid: 0},
 *    {id: 3, name: 'a1', pid: 1},
 *    {id: 4, name: 'a11', pid: 3},
 * ]
 * =>
 * [
 *  {id: 1, name: 'a', pid: 0, children: [
 *    {id: 3, name: 'a1', pid: 1, children: [
 *      {id: 4, name: 'a11', pid: 3}
 *    ]}
 *  ]},
 *  {id: 2, name: 'b', pid: 0}
 * ]
 * @param srcArr 源扁平数组
 * @param idField 自身唯一建字段,如id, uid等等
 * @param pField 表示父的字段,如:pId, parentId等等
 * @param pValue 表示父的值,
 * @param resultArr 结果数组
 */
export function flat2Tree (srcArr, idField, pField, pValue, resultArr) {
  if (_.isEmpty(srcArr)) return
  let grouped = _.groupBy(srcArr, pField)
  flat2TreeInner(grouped, idField, pValue, resultArr)
}

function flat2TreeInner (grouped, idField, pValue, resultArr) {
  let arr = grouped[pValue]
  if (arr && arr.length > 0) {
    arr.forEach(function (item) {
      if (_.has(grouped, item[idField])) {
        let c = []
        flat2TreeInner(grouped, idField, item[idField], c)
        resultArr.push(_.assign({}, item, {children: c}))
      } else {
        resultArr.push(item)
      }
    })
  }
}

function disableRec (list, item, v) {
  console.log('>>> disableRec', item, v)
  if (item.id === v) return true
  if (item.parentId === 0) return false
  return disableRec(list, _.find(list, {id: item.parentId}), v)
}

// 用于转换antd中的treeSelect数据源格式
export function flat2TreeSelect (srcArr, idField, pField, pValue, label = '根', showRoot = true, disableValue) {
  if (showRoot) {
    let result = []
    let children = []
    result.push({key: '-1', value: '-1', label, children: children})
    if (_.isEmpty(srcArr)) return
    let grouped = _.groupBy(srcArr, pField)
    flat2TreeSelectInner(grouped, idField, pValue, children, disableValue, srcArr)
    return result
  } else {
    let result = []
    if (_.isEmpty(srcArr)) return
    let grouped = _.groupBy(srcArr, pField)
    flat2TreeSelectInner(grouped, idField, pValue, result, disableValue, srcArr)
    return result
  }
}

function flat2TreeSelectInner (grouped, idField, pValue, resultArr, disableValue, originData) {
  let arr = grouped[pValue]
  if (arr && arr.length > 0) {
    arr.forEach(function (item) {
      if (_.has(grouped, item[idField])) {
        let c = []
        flat2TreeSelectInner(grouped, idField, item[idField], c, disableValue, originData)
        resultArr.push(_.assign({}, {
          id: item.id,
          key: item.id + '',
          value: item.id + '',
          label: item.label,
          disabled: disableValue ? disableRec(originData, item, disableValue) : false
        }, {children: c}))
      } else {
        resultArr.push({
          id: item.id,
          key: item.id + '',
          value: item.id + '',
          label: item.label,
          disabled: disableValue ? disableRec(originData, item, disableValue) : false
        })
      }
    })
  }
}

export function convertTreeSelect (type, srcArr, destArr, showRoot = true) {
  switch (type) {
    case 'MENU':
      flat2TreeSelect2(srcArr, 'id', 'parentId', '0', destArr, '根菜单', showRoot)
      break
    case 'PERMISSION':
      flat2TreeSelect2(srcArr, 'id', 'parentId', '0', destArr, '根权限点', showRoot)
      break
  }
}

// 用于转换antd中的treeSelect数据源格式
export function flat2TreeSelect2 (srcArr, idField, pField, pValue, resultArr, label = '根', showRoot = true) {
  if (showRoot) {
    let children = []
    resultArr.push({key: '0', name: 'root', label, children: children})
    if (_.isEmpty(srcArr)) return
    let grouped = _.groupBy(srcArr, pField)
    flat2TreeSelect2Inner(grouped, idField, pValue, children)
  } else {
    if (_.isEmpty(srcArr)) return
    let grouped = _.groupBy(srcArr, pField)
    flat2TreeSelect2Inner(grouped, idField, pValue, resultArr)
  }
}

function flat2TreeSelect2Inner (grouped, idField, pValue, resultArr) {
  let arr = grouped[pValue]
  if (arr && arr.length > 0) {
    arr.forEach(function (item) {
      if (_.has(grouped, item[idField])) {
        let c = []
        flat2TreeSelect2Inner(grouped, idField, item[idField], c)
        resultArr.push(_.assign({}, {
          id: item.id,
          key: item.id + '',
          name: item.name,
          label: item.label
        }, {children: c}))
      } else {
        resultArr.push({id: item.id, key: item.id + '', name: item.name, label: item.label})
      }
    })
  }
}

/**
 * 从扁平带组数组数据转换为树形数据
 * 比如:
 * [
 *    {id: 1, name: 'a', pid: 0},
 *    {id: 2, name: 'b', pid: 0},
 *    {id: 3, name: 'a1', pid: 1},
 *    {id: 4, name: 'a11', pid: 3},
 * ]
 * =>
 * [
 *  {id: 1, name: 'a', pid: 0, children: [
 *    {id: 3, name: 'a1', pid: 1, children: [
 *      {id: 4, name: 'a11', pid: 3}
 *    ]}
 *  ]},
 *  {id: 2, name: 'b', pid: 0}
 * ]
 * @param srcArr
 * @param idField
 * @param pField
 * @param pValue
 * @param resultArr
 */
export function flatGroup2Tree (srcArr, idField, pField, pValue, resultArr) {
  if (_.isEmpty(srcArr)) return
  let grouped = _.groupBy(srcArr, pField)
  flat2TreeInner(grouped, idField, pValue, resultArr)
}
