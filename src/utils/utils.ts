/*
 * @Description: 自定义封装各种工具
 * @Author: LiuZhen
 * @Date: 2018-09-19 09:39:14
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-29 15:52:34
 */
import { APP_TYPE, APP_DEVICE } from '@/config/config';

/* 首字母大写 */
export function firstUpperCase(str: string): string {
  return str.replace(/\b[a-z]/g, (s) => s.toUpperCase());
}

/**
 * @description 返回随机字符串，可支持其返回字符串的长度
 * @param {*} len 指定长度，默认32位
 * @returns 随机字符串
 * @author liuzhen
 */
export function getRandomString(len: number): string {
  len = len || 32;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const maxLen = $chars.length;
  let randomStr = '';

  for (let i = 0; i < len; i++) {
    randomStr += $chars.charAt(Math.floor(Math.random() * maxLen));
  }

  return randomStr;
}

/**
 * @description 返回插值运算后的url字符串
 * @param {*} url 字符串
 * @param {*} obj 对象或者为null
 * @returns url字符串
 * @author zuozhu
 */
export function populateUrl(url: string, obj?: any): string {
  if (!obj) {
    return url;
  }
  url = url.replace(/\{([\w|\?]+)\}/g, (match, param) => {
    param = /\?$/.test(param) ? param.slice(0, -1) : param;
    return obj[param] !== undefined ? obj[param] : '';
  });

  return url.replace(/\/$/, '');
}

/**
 * @description 包装一些常用的浏览器环境数据
 * @returns 环境数据对象集合
 * @author zuozhu
 */
export function getDimention(): object {
  return {
    w: window.innerWidth,
    h: window.innerHeight,
    dpr: window.devicePixelRatio
  };
}

/**
 * @description 返回单位vw对应的px数值
 * @param {*} vw 数字
 * @returns 实际px的数值
 * @author zuozhu
 */
export function transformVwToPx(vw: number): number {
  return (getDimention() as any).w * vw;
}

/**
 * @desc 对本地存储 WebStorage 进行封装操作，包含设置、读取，删除和清空
 * @param none
 * @return Object
 * @author liuzhen
 */
export const handleWebStorage = {
  // 设置数据
  setLocalData: (key: any, value: any, type: string = 'localStorage') => {
    // 如果value为对象或数组，则进行序列化
    if (Object.prototype.toString.call(value) === '[object Object]' ||
      Object.prototype.toString.call(value) === '[object Array]') {
      value = JSON.stringify(value);
    }

    if (type === 'localStorage') {
      // 如果操作为默认的localStorge
      localStorage.setItem(key, value);
    } else if (type === 'sessionStorage') {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      throw new Error('params "type" is Error, it must able of "localStorage" or "sessionStorage"');
    }
  },

  // 获取数据
  getLocalData: (key: string, type: any = 'localStorage') => {
    if (type === 'localStorage') {
      const temp: string | null = localStorage.getItem(key);
      if (temp) {
        return JSON.parse(temp);
      }
      // return JSON.parse(localStorage.getItem(key));
    } else if (type === 'sessionStorage') {
      const temp: string | null = sessionStorage.getItem(key);
      if (temp) {
        return JSON.parse(temp);
      }
      // return JSON.parse(sessionStorage.getItem(key): string | null);
    }
  },

  // 删除某条数据
  removeLocalData: (key: string, type = 'localStorage') => {
    if (type === 'localStorage') {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  },

  // 清空数据
  clearLocalData: (type = 'localStorage') => {
    if (type === 'localStorage') {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  },

  // 批量将对象参数中的信息存入本地
  batchSetLocalData: (obj: any, type = 'localStorage') => {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      throw new Error('params "obj" must be a Object');
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (type === 'localStorage') {
          localStorage.setItem(key, obj[key]);
        } else {
          sessionStorage.setItem(key, obj[key]);
        }
      }
    }
  }
};

/**
 * @description 获取当前年月日期
 * @return time
 * @author chenmo
 */
export const handleDate = {
  // 获取当前年份
  getCurrentFullYear() {
    return String(new Date().getFullYear());
  },
  // 获取当前月份
  getMonth() {
    const mon = new Date().getMonth() + 1;
    return mon < 10 ? `0${mon}` : String(mon);
  },

  getDay() {
    const day = new Date().getDay();
    return day < 10 ? `0${day}` : String(day);
  },

  getFormatFullDate() {
    return this.getCurrentFullYear() +
           this.getMonth() +
           this.getDay();
  }
};

/**
 * @description 获取url参数
 * @param param string 参数名
 * @return 参数对应value
 * @author chenmo
 */
export function getQueryString(param: any) {
  const reg = new RegExp('(^|&)' + param + '=([^&]*)(&|$)');
  const r = window.location.hash.split('?').length > 1
    ? window.location.hash.split('?')[1].match(reg)
    : null;
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * @description 获取登录成功后回跳地址
 * @param param 回跳地址的参数名称，默认名称为：redirectUrl
 * @return redirectUrl
 * @author linyu
 */
export function getRedirectUrl(param: string = 'redirectUrl'): string | null  {
  let redirectUrl: string | null;
  if (getQueryString(param)) {
    redirectUrl = getQueryString(param);
  } else {
    redirectUrl = window.location.href.split('#')[1];
  }
  return redirectUrl;
}

/**
 * @description 解决ios中键盘弹出 底部按钮隐藏bug
 * @param visible boolean 参数名
 * @return void
 * @author zhegu
 */
export function solveScrollBug(visible: boolean) {
  if (!visible) {
   setTimeout(() => {
       (function smoothscroll() {
         const currentScroll: any = document.body.scrollTop || 0;
         if (currentScroll > 0) {
           window.requestAnimationFrame(smoothscroll);
           window.scrollTo (0, currentScroll - (currentScroll / 5));
         }
       })();
     }, 100);
  }
}

/**
 * @description 用正则判断是否存在class
 * @param el dom
 * @param className class名
 * @return void
 * @author chemo
 */
export function hasClass(el: any, className: any) {
  const reg: any = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

/**
 * @description 添加class
 * @param el dom
 * @param className class名
 * @return void
 * @author chemo
 */
export function addClass(el: any, className: any) {
  if (hasClass(el, className)) {
    return;
  }
  const newClass: any = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

/**
 * @description post调用支付页面
 * @param url 支付地址
 * @param params 支付参数
 * @return dom
 * @author chemo
 */
export function openPostWindow(url: string, params: any) {
  // 创建form表单
  const tempForm: any = document.createElement('form');
  tempForm.action = url;
  tempForm.target = '_self'; // 打开新窗口
  tempForm.method = 'POST';
  tempForm.style.display = 'none';

  // 添加参数
  for (const i in params) {
    if (params.hasOwnProperty(i)) {   // 这里必须使用 hasOwnProperty 判断元素是否为对象本身的而非继承的
      const opt: any = document.createElement('input');
      opt.name = params[i].param;
      opt.value = params[i].paramValue;
      tempForm.appendChild(opt);
    }
  }
  document.body.appendChild(tempForm);
  // 提交数据
  tempForm.submit();
}

/**
 * @description 返回不同环境下的域名
 * @return string
 * @author zhegu
 */
export function returnDomain() {
  if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'production') {  // 生产
    return 'https://yezhu.uoko.com/#/'; // 生产环境
  } else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'test') {  // 测试
    return 'http://yz.testuoko.com/#/'; // 测试环境
  } else if (process.env.NODE_ENV === 'production' && process.env.VUE_APP_TITLE === 'pre-release') {  // pre
    return 'https://yz-fe-pre.uoko.com/#/'; // pre环境
  } else {
    return 'http://' + window.location.host + '/#/'; // mock地址
  }
}
/**
 * 获取后端接口返回的错误信息
 * @param  {any} e 错误对象
 * @param  {string} defaultMsg 默认信息
 * @returns string
 */
export function getErrorMessage(e: any, defaultMsg?: string): string {
  let msg = defaultMsg;
  try {
    msg = e.response.data.Message;
  } catch (e) {
    // 占位 消除warning
  }
  return msg || '';
}
/**
 * 节流
 * @param  {function} func 处理函数
 * @param  {number} delay 延迟时间
 */
export function throttle(func: any, delay: number) {
  let timer: any = null;
  let startTime: number = Date.now();
  return (): void => {
    const curTime: number = Date.now();
    const remaining: number = delay - (curTime - startTime);
    const args: IArguments = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      func(...args);
      startTime = Date.now();
    } else {
      timer = setTimeout(() => {
        func();
      }, remaining);
    }
  };
}
/**
 * 防抖
 * @param  {function} func 处理函数
 * @param  {number} delay 延迟时间
 */
export function debounce(func: any, wait: number) {
  let timeout: any = null;
  let timeout2: any = 111;
  return () => {
      const args = arguments;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout2 = 4444;
        func(...args);
      }, wait);
  };
}

/**
 * @description appType浏览器环境 deviceType设备系统
 * @return appType浏览器环境 deviceType设备系统
 * @author chenmo
 */
export function getRuntimeInfo() {
  const apptypeTest: any = {
    qq(ua: any) {
      return /QQ\/\d+\./.test(ua) && APP_TYPE.qq;
    },
    wechat(ua: any) {
      return /MicroMessenger/.test(ua) && APP_TYPE.wechat;
    },
    weibo(ua: any) {
      return /WeiBo/.test(ua) && APP_TYPE.weibo;
    }
  };

  const deviceTypeTest: any = {
    ios(ua: any) {
      return /iphone|ipad|ipod/i.test(ua) && APP_DEVICE.ios;
    },
    android(ua: any) {
      return /android/i.test(ua) && APP_DEVICE.android;
    }
  };

  return {
    appType: (() => {
      const ua = navigator.userAgent;
      let appType = APP_TYPE.unknown;

      Object.keys(apptypeTest).some((k: any) => {
        const result: any = apptypeTest[k](ua);
        if (result) {
          appType = result;
        }
        return result;
      });

      return appType;
    })(),
    deviceType: (() => {
      const ua = navigator.userAgent;
      let deviceType = APP_DEVICE.unknown;

      Object.keys(deviceTypeTest).some((k: any) => {
        const result: any = deviceTypeTest[k](ua);
        if (result) {
          deviceType = result;
        }
        return result;
      });

      return deviceType;
    })(),
    env: process.env.NODE_ENV
  };
}

/**
 * @description 微信认证
 * @params appid 微信appid
 * @params transferUrl 微信transferUrl
 * @params scope 微信scope
 * @return 微信登录授权页面
 * @author chenmo
 */
export const toAuth = (appid: string, transferUrl: string, scope: string) => {
  const cur: any = window.location;
  const url: string = `${transferUrl}?appid=${appid}&scope=${scope}&callback=${encodeURIComponent(cur)}`;
  return (window.location.href = url);
};

/**
 * @description 计算年龄
 * @params 出生年月
 * @return 返回年龄
 * @author chemo
 */
export const getAge = (date: string) => {
  if (!date) {
    return;
  }
  let returnAge;
  const dateArr = date.split('-');
  const birthYear = Number(dateArr[0]);
  const birthMonth = Number(dateArr[1]);
  const birthDay = Number(dateArr[2]);

  const d = new Date();
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1;
  const nowDay = d.getDate();

  if (nowYear === birthYear) {
    returnAge = 0; // 同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear ; // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        const dayDiff = nowDay - birthDay; // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff ;
        }
      } else {
        const monthDiff = nowMonth - birthMonth; // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = false; // 返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge; // 返回周岁年龄
};

