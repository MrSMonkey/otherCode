/*
 * @Description: chenmo
 * @Author: chenmo
 * @Date: 2019-04-15 10:59:28
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-15 16:02:42
 */


export function MP(ak: string) {
  return new Promise((resolve, reject) => {
    window.onload = () => {
      resolve(window.BMap);
    };
    if (!window.BMap) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=init';
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
}


