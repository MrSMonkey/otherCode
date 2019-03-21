/**
 *  @description 日期时间格式化工具方法
 *  @param * fmt 要求输入的格式
 *  @returns 格式化后的结果
 *  @author LiuZhen
 */
const dateFormat = (fmt) => {
  const date = new Date();
  let o = {
    'M+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (o.hasOwnProperty(k)) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
  }

  return fmt;
};

module.exports = {
  currentDateTime: dateFormat('yyyyMMddhhmm')
}
