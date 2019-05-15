/*
 * @Description: 微信分享注册
 * @Author: chenmo
 * @Date: 2019-05-08 09:28:17
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-05-08 09:28:45
 */

import wx from 'weixin-js-sdk';

export default function getWXShareConfig(shareData: any[]) {
  // 分享到朋友圈
  wx.onMenuShareTimeline({
    ...shareData
  });

  // 分享给朋友
  wx.onMenuShareAppMessage({
    ...shareData
  });

  // 分享到QQ
  wx.onMenuShareQQ({
    ...shareData
  });

  // 分享到腾讯微博
  wx.onMenuShareWeibo({
    ...shareData
  });

  // 分享到QQ空间
  wx.onMenuShareQZone({
    ...shareData
  });
}

