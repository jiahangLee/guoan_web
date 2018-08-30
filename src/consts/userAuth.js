/**
 * Created by zhangtao on 2017-07-08.
 */
import {local, session} from '../utils/storage.js'
export  default {
  ROLEADD: '100001',
  ROLEDEL: '100002',
  ROLEUPDATE: '100003',
  USERADD: '101001',
  USERDEL: '101002',
  USERUPDATE: '101003',
  PWDRESET: '123456',
  SUPERUSERID:1,
  checkUserAuth: {
    getUserAuth (authId){
      const superUserId = '1'
      const operatorId = session.get("operatorId");
      if(operatorId == superUserId){
        return true
      }
      let flag = false
      const authIds = session.get('menus')
      if (authIds) {
        authIds['authIds'].map(function (val, index, arr) {
          if (val == authId) {
            flag = true
          }
        });
      }
      return flag
    }
  }
}

