/*
 * @Description: 信息收集SDK
 * @Author: LiuZhen
 * @Date: 2019-04-09 16:10:20
 * @Last Modified by: zhegu
 * @Last Modified time: 2019-04-24 10:13:09
 */
// let script = document.createElement("script");
// script.type = "text/javascript";
// script.src = "http://pv.sohu.com/cityjson?ie=utf-8";
// document.body.appendChild(script);
class InfoCollection {
    constructor(options) {
      // 配置选项
      if (!options) {
        this.allDeviceType = true;
        this.onlyPCDeviceType = false;
        this.onlyMobileDeviceType = false;
        this.startCollection = "production";
      } else {
        // 对所有设备进行采集
        this.allDeviceType = options.allDeviceType ? options.allDeviceType : true;
        // 只对PC类型的设备进行采集
        this.onlyPCDeviceType = options.onlyPCDeviceType ? options.onlyPCDeviceType : false;
        // 只对移动设备进行采集
        this.onlyMobileDeviceType = options.onlyMobileDeviceType ? options.onlyMobileDeviceType : false;
        // 默认只在 production 下才开启采集
        this.startCollection = options.startCollection ? options.startCollection : "production";
      }
      // 初始化采集结果对象变量
      this.collectionResults = {};
    }
  
    // 静态方法 getInstance 实现单例模式
    static getInstance(options) {
      if (!this.instance) {
        this.instance = new InfoCollection(options);
      }
      return this.instance;
    }
  
    // 初始化
    init(env) {
      // 如果当前模式不是设定的采集开启模式，则退出
      if (this.startCollection !== env) {
        return false;
      }
  
      // 如果设置仅采集PC或Mobile则将allDeviceType设置为false
      if (this.onlyPCDeviceType || this.onlyMobileDeviceType) {
        this.allDeviceType = false;
      }
  
      // 判断设备类型，根据配置参数决定是否终止采集
      const deviceTypeObj = this._getUserDeviceType();
  
      // 当前设备为PC且配置为仅在移动设备下采集， 则退出
      if (deviceTypeObj.isPc && this.onlyMobileDeviceType) {
        return;
      }
  
      // 当前设备为Mobile且配置为仅在PC下采集，则退出
      if (deviceTypeObj.isAndroid || deviceTypeObj.isiPhone && this.onlyPCDeviceType) {
        return;
      }
  
      return true;
    }
  
    // 采集用户操作系统及其版本号
    getUserOS() {
      // ...
      var sUserAgent = navigator.userAgent;
      var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
      var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
      if (isMac) return "Mac";
      var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
      if (isUnix) return "Unix";
      var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
      if (isLinux) return "Linux";
      if (isWin) {   			
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;   
        if (isWin2K) return "Windows 2000";   
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1  
        sUserAgent.indexOf("Windows XP") > -1;   
        if (isWinXP) return "Windows XP";   
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;   
        if (isWin2003) return "Windows 2003";   
        var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;   
        if (isWinVista) return "WinVista";   
        var isWin7 = sUserAgent.indexOf("Windows NT 7.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;   
        if (isWin7) return "Windows 7";   
        var isWin8 = sUserAgent.indexOf("Windows NT 8.1") > -1 || sUserAgent.indexOf("Windows 8") > -1;  
        if (isWin8) return "Windows 8"; 
        var isWin10 = sUserAgent.indexOf("Windows NT 10.0")>-1||sUserAgent.indexOf("Windows 10")>-1;	
        if(isWin10) return "Windows 10"; 				
      } 
      return "other";
    }
  
    // 采集用户浏览器类型和版本
    getUserBrowserInfo() {
      let browser = {};
      let userAgent = navigator.userAgent.toLowerCase();
      let s;
      (s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] : (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
      let version = "";
      if (browser.ie) {
        version = 'IE ' + browser.ie;
      }
      else {
        if (browser.firefox) {
          version = 'firefox ' + browser.firefox;
        }
        else {
          if (browser.chrome) {
            version = 'chrome ' + browser.chrome;
          }
          else {
            if (browser.opera) {
              version = 'opera ' + browser.opera;
            }
            else {
              if (browser.safari) {
                version = 'safari ' + browser.safari;
              }
              else {
                version = '未知浏览器';
              }
            }
          }
        }
      }
      return version;
    }
  
    // 采集用户当前IP地址
    getUserCurrentIP() {
      // ....
      return returnCitySN['cip'] + returnCitySN['cname']
    }
  
    // 采集用户当前位置信息，包含经纬度、所在省份与城市信息
    getUserLocationInfo(type = 1){
      return new Promise(function(resolve,reject){
          if ("geolocation" in navigator) {
          /* 地理位置服务可用 */
            if (!navigator.geolocation){
              alert('地理位置服务不可用')
              return;
            }
            const success =  (position) => {
              let result  = type === 1 ? position.coords.longitude : position.coords.latitude;
              // 根据传入的type 返回经度和纬度 type 1 为经度，2为纬度
              resolve(result)
            };
            const error = () => {
            };
            const options = {
                enableHighAccuracy: true,  // 是否要求高精度的地理位置信息
                timeout: 5000,  // 对地理位置信息的获取操作做超时限制，如果再该事件内未获取到地理位置信息，将返回错误
                maximumAge: 60*1000 // 设置缓存有效时间，在该时间段内，获取的地理位置信息还是设置此时间段之前的那次获得的信息，超过这段时间缓存的位置信息会被废弃
            };
            const watch = navigator.geolocation.getCurrentPosition(
              success, // 成功回调
              error,  // 失败回调
              options
            )
            window.navigator.geolocation.clearWatch(watch)
          } else {
          /* 地理位置服务不可用 */
            alert('地理位置服务不可用')
          }
      })
    }
  
    // 如果用户登陆，获取用户标识
    getUserFlagInfo() {
      // ...
    }
  
    // 获取当前用户屏幕的分辨率
    getUserResolution(type) {
      // type 1 为屏幕宽度 2为屏幕高度
      return type === 1 ? window.screen.width : window.screen.height 
    }
  
    // 当前访问的日期时间
    getCurrentVisitDateTime() {
      // ...需服务端接口配合
    }
  
    // 当前信息来自哪一个系统，如：官网？ M站？ 业主公众号 ？ 等
    getInfoSource() {
      const url = window.location.href;
      let id = '';
      if(url.indexOf('op系统') > -1){
        return 'CW001'
      }else if(url.indexOf('yk.uoko') > -1){
        return 'CW002'
      }else if(url.indexOf('合伙人系统') > -1){
        return 'CW003'
      }else if(url.indexOf('morefun') > -1){
        return 'CH001'
      }else if(url.indexOf('yezhu') > -1){
        return 'CH002'
      }else{
        return '其他'
      }
    }
  
    // 获取当前用户登陆的设备类型 PC ? Mobile ?
    _getUserDeviceType() {
      const ua = navigator.userAgent.toLowerCase();
      const isWindowsPhone = /(?:windows phone)/.test(ua);
      const isSymbian = /(?:symbianos)/.test(ua) || isWindowsPhone;
      const isAndroid = /(?:android)/.test(ua);
      const isFireFox = /(?:firefox)/.test(ua);
      const isChrome = /(?:chrome|crios)/.test(ua);
      const isEdge = /(?:edge)/.test(ua);
      const isTablet = /(?:ipad|playbook)/.test(ua) || (isAndroid && !/(?:mobile)/.test(ua)) || (isFireFox && /(?:tablet)/.test(ua));
      const isiPhone = /(?:iphone)/.test(ua) && !isTablet;
      const isPc = !isiPhone && !isAndroid && !isSymbian;
      let type = {
        WindowsPhone: isWindowsPhone,
        Symbian: isSymbian,
        Android: isAndroid,
        FireFox: isFireFox,
        Chrome: isChrome,
        Edge: isEdge,
        isTablet: isTablet,
        iPhone: isiPhone,
        Pc: isPc 
      }
      for(var i in type){
        if(type[i]){
          type = i
        }
      }
      var connection = navigator.connection||navigator.mozConnection||navigator.webkitConnection||{type:'unknown'};
      return type;
    }
    // 数据
    dataInfo () {
      return {
        os: this.getUserOS().split(' ')[0],
        osVersion: this.getUserOS().split(' ')[1],
        screenWidth: this.getUserResolution(1),
        screenHeight: this.getUserResolution(2),
        browser: this.getUserBrowserInfo().split(' ')[0],
        browserVersion: this.getUserBrowserInfo(),
        manufacturer: this._getUserDeviceType(),
        businessId: this.getInfoSource()
      }
    }
    // 上传操作
    ajaxHelp(url, data, method, success) {
      url = url || "http://api-gateway.testuoko.com/netflow/client/netflow_trace";
      data = JSON.stringify(data || this.dataInfo());
      method = method || "POST";
      success = success  || function(res) {
        console.log("res", JSON.parse(res));
      };
      var ajax = null;
      if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
      }
      if (!ajax) {
        // alert("您的浏览器不支持AJAX！");
        return;
      }
      if (method === "GET") {
          if (data) {
            url += "?";
            url += data;
          }
          ajax.open(method, url);
          ajax.send();
      } else {
          ajax.open(method, url);
          ajax.setRequestHeader("Content-type", "application/json");
          if (data) {
            ajax.send(data);
          } else {
            ajax.send();
          }
      }
      ajax.onreadystatechange = function() {
        if (ajax.readyState === 4 && ajax.status === 200) {
          success(ajax.responseText);
        }
      };
    }
  }

export default InfoCollection;
