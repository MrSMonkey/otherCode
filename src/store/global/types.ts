/*
 * @Description: Global声明文件
 * @Author: LiuZhen
 * @Date: 2018-11-07 18:03:12
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-04-28 16:29:27
 */
import { Point } from '@/interface/utilInterface';

interface WxOAuth {
  accessToken?: string;
  expiresIn?: string;
  openId?: string;
  refreshToken?: string;
  scope?: string;
}
export interface GlobalState {
  token: string;
  userInfo?: any;
  communityId?: string;
  communityName?: string;
  keepAlive?: string;
  point?: Point;
  isGainPoint?: boolean;
  wxOAuth?: WxOAuth;
  oldHouseBaseInfo?: any;
}

