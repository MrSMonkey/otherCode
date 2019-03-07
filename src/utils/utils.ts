/*
 * @Description: 自定义封装各种工具
 * @Author: LiuZhen
 * @Date: 2018-09-19 09:39:14
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-19 10:45:24
 */

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
      sessionStorage.setItem(key, value);
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

// 与日期相关的方法集合
export const handleDate = {
  // 获取当前年份
  getCurrentFullYear() {
    return String(new Date().getFullYear());
  },

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
 * @param name string 参数名
 * @return 参数对应value
 * @author chenmo
 */
export function getQueryString(name: any) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}


