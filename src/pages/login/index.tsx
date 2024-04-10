import styles from './index.module.scss'
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, notification } from 'antd'
import { apiLogin } from '@/api/user/api'
import type { ResRoot, LoginData } from '@/api/user/type'
import { useUserStore } from '@/store/useUserStore'
import { useNavigate } from 'react-router-dom'
import { msgSuccess } from '@/utils/msg'
export const Login: React.FC = () => {
  const { setUserInfo } = useUserStore()
  const navigator = useNavigate()

  const changeIsLogin = () => {
    navigator('/register')
  }

  // 登录
  const onFinish = async (values: { userName: string; passWord: string }) => {
    try {
      const req = new FormData()
      req.append('userName', values.userName)
      req.append('passWord', values.passWord)
      // for (const [a, b] of req.entries()) {
      //   console.log(a, b)
      // }
      const res: ResRoot<LoginData> = await apiLogin(req)
      const { token, user_info } = res.data
      // 这里和在·
      setUserInfo(user_info)
      console.log('setUserInfo', setUserInfo)
      localStorage.setItem('token', token)
      navigator('/')
      msgSuccess('登录成功')
    } catch (error: any) {
      notification.error({
        message: error.message,
        placement: 'topLeft',
        duration: 0.8,
      })
      console.log('error', error)
    }
  }
  return (
    <>
      <div className={styles['Login']}>
        <div className={styles['box']}>
          <h1>阅卷系统</h1>
          <Form name="normal_login" className="login-form" initialValues={{ userName: 'admin', passWord: 'root', remember: true }} onFinish={onFinish}>
            <Form.Item name="userName" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="passWord" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <a onClick={changeIsLogin}>立即注册</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
