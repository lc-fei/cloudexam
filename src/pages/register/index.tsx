import React from 'react'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Row, Col, Select } from 'antd'
import { ReqNew } from '@/api/user/type'
import { apiCheck, apiNew, apiVerify } from '@/api/user/api'
import { msgError, msgSuccess } from '@/utils/msg'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const onFinish = async (values: ReqNew) => {
    try {
      const reqForm = new FormData()
      const req = form.getFieldsValue(['email', 'userName'])
      reqForm.append('userName', req.userName)
      await apiCheck(reqForm)
      const res = await apiNew(values)
      console.log('res', res)
      msgSuccess('注册成功！')
      navigate('/login')
    } catch (error: any) {
      msgError(error.message)
    }
  }

  const changeIsLogin = () => {
    navigate('/login')
  }

  const getCaptcha = async () => {
    try {
      console.log('get captcha')
      const req = form.getFieldsValue(['email', 'userName'])
      const reqForm = new FormData()
      reqForm.append('email', req.email)
      reqForm.append('userName', req.userName)
      const checkRes = await apiCheck(reqForm)
      console.log('checkRes', checkRes)
      const res = await apiVerify(reqForm)
      console.log('res', res)
      msgSuccess('验证码发送成功！')
    } catch (error: any) {
      msgError(error.message)
    }
  }
  return (
    <>
      <div className={styles['rigister']}>
        <div className={styles['logo']}></div>
        <div className={styles['box']}>
          <h1 style={{ textAlign: 'center' }}>注册</h1>
          <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} style={{ maxWidth: 600 }} scrollToFirstError>
            <Form.Item name="name" label="姓名" tooltip="请输入真实姓名" rules={[{ required: true, message: '请输入姓名！', whitespace: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="userName" label="用户名" rules={[{ required: true, message: '请输入用户名！', whitespace: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="role"
              label="身份"
              rules={[
                {
                  required: true,
                  message: '请选择身份！',
                },
              ]}
            >
              <Select>
                <Select.Option value={1}>学生</Select.Option>
                <Select.Option value={2}>老师</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="passWord"
              label="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassWord"
              label="确认密码"
              dependencies={['passWord']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请输入确认密码！',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('passWord') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入密码不一致!'))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                {
                  type: 'email',
                  message: '请输入正确的邮箱！',
                },
                {
                  required: true,
                  message: '请输入邮箱！',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="验证码">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item name="captcha" noStyle rules={[{ required: true, message: '请输入验证码！' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button onClick={getCaptcha}>获取验证码</Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" style={{ width: '30%' }}>
                注册
              </Button>
              <a onClick={changeIsLogin}>已有账号？点此登录</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
