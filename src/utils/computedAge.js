/*根据出生日期算出年龄*/
const getAge = (date) => {       
  let returnAge;
  const dateArr = date.split("-");
  const birthYear = dateArr[0];
  const birthMonth = dateArr[1];
  const birthDay = dateArr[2];
  
  const d = new Date();
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1;
  const nowDay = d.getDate();
  
  if(nowYear === birthYear){
    returnAge = 0; //同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear ; //年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        const dayDiff = nowDay - birthDay;//日之差
        if(dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff ;
        }
      } else {
        const monthDiff = nowMonth - birthMonth;//月之差
        if(monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = false; //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  
  return returnAge;//返回周岁年龄
}

export default getAge;