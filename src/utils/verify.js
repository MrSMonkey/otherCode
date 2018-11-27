/**
 * 自定义正则验证 regVerify(reg)
 * 验证正整数： verify.number(value)
 * 验证电话号码： verify.phone(val)
 * 验证电子邮件： verify.email(val)
 * 验证身份证： verify.idCard(val)
 * 验证日期： verify.date(val)
 * 验证保留两位小数的金额： verify.amout(val)
 * 保留两位小数：returnFloat（value）
 */
const verify = {
  number: regVerify(/^[0-9]*$/),
  phone: regVerify(/^[0-9]{11}$/),
  email: regVerify(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
  amout: regVerify(/^\d+\.?\d{0,2}$/),
  idCard: checkCertificatesNo,
  date: checkDate,
  returnFloat: returnFloat
}

function regVerify(reg) {
  return function(val) {
    return {
      success: reg.test(val),
      errorMessage: reg.test(val) ? '匹配' : '不匹配'
    }
  }
}

function returnFloat(val){
  var value = Math.round(parseFloat(val)*100)/100;
  var xsd =value.toString().split(".");
  if(xsd.length === 1){
    value=value.toString()+".00";
  return value;
  }
  if(xsd.length>1){
  if(xsd[1].length<2){
    value=value.toString()+"0";
  }
  return value;
  }
 }

function checkDate(date) {
  var birthday = date.split('-')
  var year = Number(birthday[0])
  var month = Number(birthday[1])
  var day = Number(birthday[2])
  var odd = !!(month % 2) //奇数月份
  var msg = {
    success: true,
    errorMsg: ''
  }

  if (year === 0 || month === 0 || day === 0) {
    msg.success = false
    msg.errorMsg = '年月日不能为0'
    return msg
  }

  if (month > 12) {
    msg.success = false
    msg.errorMsg = '月份不正确'
    return msg
  } else if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      if (day > 29) {
        msg.success = false
        msg.errorMsg = '闰年 2 月日期不大于 29 日'
      }
    } else {
      if (day > 28) {
        msg.success = false
        msg.errorMsg = '非闰年 2 月日期不大于 28 日'
      }
    }
  } else if (odd && day > 30) {
    msg.success = false
    msg.errorMsg = month + ' 月没有 ' + day + ' 日'
  } else if (!odd && day > 31) {
    msg.success = false
    msg.errorMsg = month + ' 月没有 ' + day + ' 日'
  }

  return msg
}

function checkCertificatesNo(value) {
  var msg = {
    gender: Number(value.substr(16, 1)) % 2 === 0 ? 'male' : 'female', //获取性别
    birDate: value.substr(6, 8).replace(/(.{4})(.{2})/, '$1-$2-'), //获取生日信息
    success: true,
    errorMsg: ''
  }
  var birthVerify = checkDate(msg.birDate)
  var parity = checkParity(value)

  if (!birthVerify.success) {
    //身份证日期
    msg.success = false
    msg.errorMsg = '身份证' + birthVerify.errorMsg
  } else if (!parity) {
    //身份证校验位验证
    msg.success = false
    msg.errorMsg = '身份证校验位不正确'
  }

  return msg
}

function checkParity(card) {
  var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  var reg18 = /^\d{17}([0-9]|X|x)$/
  var len = card.length

  if (len === 15) {
    var cardTemp = 0,
      i
    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6)
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i]
    }
    card += arrCh[cardTemp % 11]
  }

  if (reg18.test(card)) {
    let cardTemp = 0,
      i,
      valnum

    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i]
    }
    valnum = arrCh[cardTemp % 11]

    if (valnum === card.substr(17, 1)) {
      return true
    }
  }
  // debugger
  return false
}

export default verify
