import Vue from 'vue';
import api from '@/api';
import wx from 'weixin-js-sdk';


export default function getWXConfig(apiList: string[]) {
  const wxUrl: string = encodeURIComponent(window.location.href.split('#')[0]); // 此处进行一次编码
  return new Promise((resolve, reject) => {
    Vue.axios.get(`${api.getJssdkConfig}`, {
      params: {
        url: wxUrl
      }
    })
    .then((res: any) => {
      const data = res.data; // 返回wx.config需要的参数
      wx.config({
        debug: process.env.NODE_ENV === 'dev', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: apiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(() => {
        resolve();
      });
      wx.error((res: any) => {
        console.log(res);
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    })
    .catch((error) => {
      reject(error);
    });
  });
}

