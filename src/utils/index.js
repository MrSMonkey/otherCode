import { APP_TYPE, APP_DEVICE } from './const'

export function populateUrl(url, obj) {
  if (!obj) {
    return url
  }
  url = url.replace(/\{([\w|?]+)\}/g, (match, param) => {
    param = /\?$/.test(param) ? param.slice(0, -1) : param
    return obj[param] !== undefined ? obj[param] : ''
  })

  return url.replace(/\/$/, '')
}

export function getDimention() {
  return {
    w: window.innerWidth,
    h: window.innerHeight
  }
}
export function parseQuery(queryString, spliter, separator) {
  var ret = {}
  spliter = spliter || '&'
  separator = separator || '='

  if (!queryString) {
    return ret
  }
  queryString = queryString.replace(/^\?/, '')
  var paramArr = queryString.split(spliter)

  for (var i = 0; paramArr[i]; i++) {
    var pairs = paramArr[i].split(separator)
    var key = pairs[0]
    var val = pairs[1]

    if (ret[key] === undefined) {
      ret[key] = val
      continue
    }
    if (!Array.isArray(ret[key])) {
      ret[key] = [ret[key]].concat(val)
      continue
    }

    ret[key].push(val)
  }

  return ret
}

export function px2vw(px, precise = 2, base = 750) {
  if (!px) {
    return px
  }
  let vw = (px / base) * 100

  vw = vw.toFixed(precise)
  return vw
}

export function vw2px(vw) {
  return (vw * window.innerWidth) / 100
}

export function getRuntimeInfo() {
  const apptypeTest = {
    qq(ua) {
      return /QQ\/\d+\./.test(ua) && APP_TYPE.qq
    },
    wechat(ua) {
      return /MicroMessenger/.test(ua) && APP_TYPE.wechat
    },
    weibo(ua) {
      return /WeiBo/.test(ua) && APP_TYPE.weibo
    }
  }

  const deviceTypeTest = {
    ios(ua) {
      return /iphone|ipad|ipod/i.test(ua) && APP_DEVICE.ios
    },
    android(ua) {
      return /android/i.test(ua) && APP_DEVICE.android
    }
  }

  return {
    appType: (() => {
      const ua = navigator.userAgent
      let appType = APP_TYPE.unknown

      Object.keys(apptypeTest).some(k => {
        let result = apptypeTest[k](ua)
        if (result) {
          appType = result
        }
        return result
      })

      return appType
    })(),
    deviceType: (() => {
      const ua = navigator.userAgent
      let deviceType = APP_DEVICE.unknown

      Object.keys(deviceTypeTest).some(k => {
        let result = deviceTypeTest[k](ua)
        if (result) {
          deviceType = result
        }
        return result
      })

      return deviceType
    })(),
    env: process.env.NODE_ENV
  }
}


export const localStore = (function() {
  let support = true

  function isSupport() {
    try {
      if (window.localStorage) {
        localStorage.setItem('webpsupport', 'true')
        localStorage.removeItem('webpsupport')
        return true
      }
    } catch (e) {
      return false
    }
  }

  support = isSupport()

  return {
    support: support,
    set(key, value) {
      if (!support) {
        return
      }
      if (typeof value === 'object') {
        try {
          value = JSON.stringify(value)
        } catch (e) { return; }
      }
      localStorage.setItem(key, value)
    },
    get(key) {
      if (support) {
        let val = localStorage.getItem(key)
        try {
          return JSON.parse(val)
        } catch (e) {
          return val
        }
      }
    },
    remove(key) {
      if (support) {
        localStorage.removeItem(key)
      }
    }
  }
})()
export function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}
export function hasClass(el, cls) {
  return el.className.split(' ').indexOf(cls) !== -1;
}
export function addClass(el, cls) {
  if (hasClass(el, cls)) {
    return;
  }
  el.className = trim(el.className + ' ' + cls);
  return el;
}
export function removeClass(el, cls) {
  if (!hasClass(el, cls)) {
    return;
  }
  el.className = trim(el.className.replace(cls, ''));
  return el;
}

export function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); 
  return null; 
}   