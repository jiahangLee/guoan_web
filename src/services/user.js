/**
 * Created by jiahang Lee on 2017/6/23.
 */
import REST_USER_API from '../consts/userApi'
import request from '../utils/table';
import { PAGE_SIZE } from '../constants';
import {local, session} from '../utils/storage.js'

const operatorId =  session.get('operatorId')

export function fetch({ page }) {
  return request(REST_USER_API.USERS+`?operatorId=${session.get('operatorId')} &beginRow=${(page-1)*PAGE_SIZE}&pageSize=${PAGE_SIZE}`);
}
export function selectUser({values,page}) {
  return request(REST_USER_API.USERS+`?operatorId=${session.get('operatorId')} &operatorName=${values}&beginRow=${(page-1)*PAGE_SIZE}&pageSize=${PAGE_SIZE}`);
}
export function remove(id) {
  return request(REST_USER_API.USERDEL+`?operatorId=${id}`, {
    method: 'DELETE',
  });
}
export function patch(id, values) {
  return request(REST_USER_API.USERUPDATE,{
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: JSON.stringify(values),
  });
}
export function create(values) {
  return request(REST_USER_API.USERADD, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: JSON.stringify(values),
  });
}
export function modifyPwd(value,operatorid) {
  return request(REST_USER_API.MODIFYPASSWORD+`?password=${value}&operatorId=${session.get('operatorId')}`);
}
export function resetPwd(id) {
  return request(REST_USER_API.RESETPWD+`?operatorId=${id}`);
}
//角色管理
export function roleFetch({ rolePage }) {
  return request(REST_USER_API.ROLELIST+`?operatorId=${session.get('operatorId')} &beginRow=${(rolePage-1)*PAGE_SIZE}&pageSize=${PAGE_SIZE}`);
}
export function selectRole({values,rolePage}) {
  return request(REST_USER_API.ROLELIST+`?operatorId=${session.get('operatorId')} &roleName=${values}&beginRow=${(rolePage-1)*PAGE_SIZE}&pageSize=${PAGE_SIZE}`);
}
export function userPatch(id, values) {
  return request(REST_USER_API.ROLEUPDATE, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
    body: JSON.stringify(values),
  });
}
