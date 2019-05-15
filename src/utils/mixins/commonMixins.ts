/*
 * @Description: 公共Mixins
 * @Author: LiuZhen
 * @Date: 2018-09-18 16:32:24
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-05-06 11:59:19
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
}
