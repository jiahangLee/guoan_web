/**
 * Created by zhangtao15 on 2017-06-21.
 */
import {REST_USER_API} from '../config'

export default {
  MENUS: `${REST_USER_API}/user/menu/menuTree`,
  USERS: `${REST_USER_API}/user/operator/list`,
  LOGIN: `${REST_USER_API}/user/operator/login`,
  USERDEL: `${REST_USER_API}/user/operator/del`,
  USERADD: `${REST_USER_API}/user/operator/add`,
  USERUPDATE: `${REST_USER_API}/user/operator/update`,
  CHECKUSER :`${REST_USER_API}/user/operator/checkUser`,
  CHECKPWD :`${REST_USER_API}/user/operator/checkPwd`,
  MODIFYPASSWORD :`${REST_USER_API}/user/operator/modifyPwd`,
  RESETPWD :`${REST_USER_API}/user/operator/resetPwd`,
  AREAS: `${REST_USER_API}/user/organize/areaList`,
  AREATREE: `${REST_USER_API}/user/organize/areaTree`,
  FUNCTREE: `${REST_USER_API}/user/menu/funcTree`,
  AREAIDS: `${REST_USER_API}/user/organize/areaIds`,
  FUNCIDS: `${REST_USER_API}/user/menu/funcIds`,
  ROLELIST: `${REST_USER_API}/user/role/list`,
  ROLELISTAUTH: `${REST_USER_API}/user/role/listAuth`,
  ROLEADD: `${REST_USER_API}/user/role/add`,
  ROLEDEL: `${REST_USER_API}/user/role/del`,
  ROLEUPDATE: `${REST_USER_API}/user/role/update`,

}

