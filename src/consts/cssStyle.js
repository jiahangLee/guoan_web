/**
 * Created by zhangtao on 2017-07-08.
 */

export  default {
  getCssStyle(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    const style1 = JSON.parse('{"minWidth": "150px","position":"relative","bottom":"18px"}')
    const style2 = JSON.parse('{"minWidth": "150px"}')

    var isOpera = userAgent.indexOf("Opera") > -1;
    //判断是否Opera浏览器
    if (isOpera) {
      return style1
    }
    //判断是否Edge浏览器
    else if (userAgent.indexOf("Edge") > -1) {
      return style2
    }
    //判断是否Firefox浏览器
    else if (userAgent.indexOf("Firefox") > -1) {
      return style2
    }
    //判断是否chorme浏览器
    else if (userAgent.indexOf("Chrome") > -1) {
      return style1
    }
    //判断是否Safari浏览器
    else if (userAgent.indexOf("Safari") > -1) {
      return style2
    }
    //判断是否IE浏览器
    else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
      return style2
    }
    else {
      return style2
    }
  }
}

