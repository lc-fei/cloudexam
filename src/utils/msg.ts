import { notification } from "antd"

export const msgError = (msg: string) => {
  notification.error({
    message: msg,
    placement: 'topLeft',
    duration: 0.8
  })
}
export const msgSuccess = (msg: string) => {
  notification.success({
    message: msg,
    placement: 'topLeft',
    duration: 0.8
  })
}