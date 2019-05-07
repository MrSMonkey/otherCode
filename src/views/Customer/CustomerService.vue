/*
 * @Description: 客服
 * @Author: LongWei
 * @Date: 2019-04-29 14:55:35
 * @Last Modified by: LongWei
 * @Last Modified time: 2019-05-06 14:12:54
 */
 <template>
  <section class="customer-main" ref="customerMain" id="customerMain">
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CommonMixins from '@/utils/mixins/commonMixins';
import api from '@/api';
import { State, Getter, Mutation, Action } from 'vuex-class';

const namespace: string = 'global';

declare global {
  interface Window { [x: string]: any; }
}
window.NTKF = window.NTKF || '';
// 声明引入的组件
@Component({
  name: 'CustomerService',
})
// 类方式声明当前组件
export default class CustomerService extends CommonMixins {
  public $refs: {
    [x: string]: any
  };


  @Getter('getWxOAuth', { namespace }) private wxOAuth: any;
  @Getter('getUserInfo', { namespace }) private userInfo: any;

  private url: string = 'https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9452';
  private uname: string = '';
  private uid: string = '';
  private siteId: string = '';
  private settingId: string = '';
  private NTKF: any = {};
  private str: string = '';
  @Watch('window.NTKF')
  private search() {
    if (!window.NTKF) {
      return;
    }
    this.getUserInfo();
  }

  private  created() {
    if (!window.NTKF) {
      this.loadScript();
    }
    // this.loadScript();
  }
  private  mounted() {
    this.getUserInfo();
  }

  // 加载 - 第三方插件
  private loadScript() {
    const script: any = document.createElement('script');
    // const head =  document.getElementsByTagName('head')[0];
    script.src = this.url;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    document.body.insertBefore(script, document.body.firstChild);
    // head.insertBefore(script, head.lastChild);
  }

  // 获取 - 微信账号基本信息
  private async getUserInfo() {
    try {
      const openId = this.wxOAuth.openId;
      const accessToken = this.wxOAuth.accessToken;
      const res: any = await this.axios.get(`${api.getWXUserInfo}/${openId}/${accessToken}`);
      if (res.code === '000') {
        const data = res.data;
        if (this.userInfo) { // 用户登录
          this.uname = this.userInfo.userId ? `${this.userInfo.Phone}(${this.userInfo.realName})` : this.userInfo.nickName;
          this.uid = this.userInfo.userId;
        } else { // 用户未登录
          this.uname = data.nickName;
          this.uid = this.wxOAuth.openId;
        }
        this.getXiaoNengConfig();
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
  // 获取 - 星空业主号小能客服SDK
  private async getXiaoNengConfig() {
    try {
      const res: any = await this.axios.get(`${api.getXiaoNengConfig}`);
      if (res.code === '000') {
        const data = res.data;
        this.siteId = data.siteId;
        this.settingId = data.settingId;
        const NTKF_PARAM: any = {
          siteid: this.siteId,                // 企业ID，为固定值，必填
          settingid: this.settingId,  // 接待组ID，为固定值，必填
          uid: this.uid || '',  // 用户ID，未登录可以为空，但不能给null，uid赋予的值显示到小能客户端上
          uname: this.uname || '',      // 用户名，未登录可以为空，但不能给null，uname赋予的值显示到小能客户端上
          isvip: '0',        // 是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
          userlevel: '0',    // 网站自定义会员级别，0-N，可根据选择判断，取值显示到小能客户端上
          erpparam: '',       // erpparam为erp功能的扩展字段，可选，购买erp功能后用于erp功能集成
        };
        window.NTKF_PARAM = NTKF_PARAM;
        window.NTKF.im_openInPageChat(data.settingId);
      }
    } catch (err) {
      throw new Error(err || 'Unknow Error!');
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">

.customer-main
  height 100%
  width 100%
  
</style>

