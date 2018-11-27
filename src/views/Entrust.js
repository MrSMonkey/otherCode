import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './Entrust.css'
import { actions as entrustAction } from '../reducers/entrust'
import { actions as appAction } from '../reducers/app'
import Form, { FormItem, Input, Select, Textarea } from '../components/Form'
import Button from '../components/Button'

@CSSModules(styles)
class Entrust extends Component {
  state = {
    isErr: {
      Name: false,
      Phone: false,
      Area: false,
      CityId: false,
      CityName: false,
      CommunityName: false,
      HallNum: false,
      ToileNum: false,
      RoomNum: false
    }
  }
  formartSelectData(num) {
    const data = []
    for (let i = 0; i < num; i++) {
      data.push({ Text: i, Value: i })
    }
    return data
  }
  sublimt = () => {
    const { form } = this.props
    const { isErr } = this.state
    console.log(isErr)

    for (let i in form) {
      const val = form[i]
      const hasOwn = isErr.hasOwnProperty(i)

      if (hasOwn) {
        if (val === '' || isErr[i]) {
          //验证必填项目 || 验证是否正确
          // console.log('hasOwn', i, hasOwn)
          // console.log('isErr',isValid,val)
          isErr[i] = true
        } else {
          isErr[i] = false
        }
      }
    }

    // console.log(isErr)
    let hasErr = false
    for (let i in isErr) {
      const val = isErr[i]
      if (val) {
        // console.log("hasErr", i, val)
        hasErr = true
        break
      }
    }

    if (hasErr) {
      this.setState({ ...isErr })
      return
    }
    // console.log('~~~~~~',hasErr)
    this.props.sublimtEntrust()
  }
  componentDidMount() {
    this.props.getCitys()
  }
  render() {
    const { isErr } = this.state
    const { form, citys, changeForm, isLoading } = this.props
    return (
      <Form data={form}>
        <h2 styleName="title">
          留下联系方式
          <span styleName="descripe">
            留下您的联系方式，您的资产管家将尽快与您联系
          </span>
        </h2>
        <div styleName="input-group">
          <FormItem label="姓名" isErr={isErr.Name}>
            <Input
              must
              value={form.Name}
              maxLength={30}
              placeholder="请输入您的称呼"
              onChange={val => changeForm(val, 'Name')}
              verify={{
                cb: val => this.setState({ isErr: { ...isErr, Name: !val } })
              }}
            />
          </FormItem>
          <FormItem label="手机号" isErr={isErr.Phone}>
            <Input
              value={form.Phone}
              placeholder="请输入您的手机号码"
              onChange={val => changeForm(val, 'Phone')}
              verify={{
                type: 'phone',
                cb: val => {
                  // console.log('Phone ERR', !val)
                  this.setState({ isErr: { ...isErr, Phone: !val } })
                }
              }}
            />
          </FormItem>
        </div>

        <h2 styleName="title">
          添加房屋信息
          <span styleName="descripe">添加爱屋信息，更好地对房屋实施评估</span>
        </h2>
        <div styleName="input-group">
          <FormItem label="城市" isErr={isErr.CityId}>
            <Select
              data={citys}
              value={form.CityId}
              placeholder="请选择您爱屋所在的城市"
              onChange={val => changeForm(val, 'CityId')}
              verify={{
                cb: val => this.setState({ isErr: { ...isErr, CityId: !val } })
              }}
            />
          </FormItem>
          <FormItem label="小区名称" isErr={isErr.CommunityName}>
            <Input
              value={form.CommunityName}
              maxLength={16}
              placeholder="请输入您爱屋所在的小区"
              onChange={val => changeForm(val, 'CommunityName')}
              verify={{
                cb: val =>
                  this.setState({ isErr: { ...isErr, CommunityName: !val } })
              }}
            />
          </FormItem>
          <FormItem label="面积" isErr={isErr.Area}>
            <Input
              value={form.Area}
              placeholder="请输入您爱屋的面积"
              onChange={val => changeForm(val, 'Area')}
              verify={{
                type: 'amout',
                cb: val =>
                  this.setState({
                    isErr: { ...isErr, Area: !val || form.Area > 999 }
                  })
              }}
            />
          </FormItem>
          <FormItem
            label="户型"
            isErr={isErr.RoomNum || isErr.HallNum || isErr.ToileNum}
          >
            <Select
              value={form.RoomNum}
              data={this.formartSelectData(10)}
              onChange={val => changeForm(val, 'RoomNum')}
              verify={{
                cb: val => this.setState({ isErr: { ...isErr, RoomNum: !val } })
              }}
            />
            室
            <Select
              value={form.HallNum}
              data={this.formartSelectData(10)}
              onChange={val => changeForm(val, 'HallNum')}
              verify={{
                cb: val => this.setState({ isErr: { ...isErr, HallNum: !val } })
              }}
            />
            厅
            <Select
              value={form.ToileNum}
              data={this.formartSelectData(10)}
              onChange={val => changeForm(val, 'ToileNum')}
              verify={{
                cb: val =>
                  this.setState({ isErr: { ...isErr, ToileNum: !val } })
              }}
            />
            卫
          </FormItem>
        </div>

        <h2 styleName="title">添加其他信息</h2>
        <div styleName="input-group">
          <FormItem>
            <Textarea
              value={form.Remark}
              rows={4}
              maxLength={140}
              placeholder="选填"
              onChange={val => changeForm(val, 'Remark')}
            />
          </FormItem>
        </div>
        <footer styleName="form-footer">
          <Button type="Primary" onClick={this.sublimt} disabled={isLoading}>
            提交
            {isLoading ? '中...' : ''}
          </Button>
        </footer>
      </Form>
    )
  }
}

export default connect(
  state => ({
    form: state.entrust.form,
    citys: state.app.citys,
    isLoading: state.entrust.isLoading
  }),
  {
    ...entrustAction,
    ...appAction
  }
)(Entrust)
