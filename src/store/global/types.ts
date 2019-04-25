/*
 * @Description: Global声明文件
 * @Author: LiuZhen
 * @Date: 2018-11-07 18:03:12
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-02-20 16:45:43
 */
import { Point } from '@/interface/utilInterface';
export interface GlobalState {
  token: string;
  userInfo?: any;
  communityId?: string;
  communityName?: string;
  keepAlive?: string;
  point?: Point;
  isGainPoint?: boolean;
  wxOAuth?: any;
}

