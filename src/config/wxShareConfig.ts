import Vue from 'vue';
import api from '@/api';
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

