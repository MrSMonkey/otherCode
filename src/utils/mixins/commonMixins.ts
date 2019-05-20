/*
 * @Description: 公共Mixins
 * @Author: LiuZhen
 * @Date: 2018-09-18 16:32:24
 * @Last Modified by: linyu
 * @Last Modified time: 2019-05-20 17:22:06
 */
import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Collapse, CollapseItem } from 'vant';


@Component({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
  }
})
export default class CommonMixins extends Vue {
  /**
   * @description 切换组件时默认滚动到顶部
   * @author qingtong
   */
  public scrollToTop(): void {
    document.documentElement!.scrollTop = 0;
  }

  /**
   * @description 用户系统行为信息采集
   * @param eventId 信息采集事件ID
   * @param eventName 信息采集事件类型
   * @author chenmo
   */
  public handleEventReport(eventId: string, eventName: string) {
    window.InfoCollectInstance.handleEventReport({
      eventId
    }, eventName);
  }
}
