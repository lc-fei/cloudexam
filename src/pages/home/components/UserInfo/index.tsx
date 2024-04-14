import { ComponentProps } from 'react'
import { ArrowDown } from '../../../../assets/icons'
import styles from './index.module.scss'
import { useUserStore } from '@/store/useUserStore'
import { userPms } from '@/constants'
export const UserInfo = ({ className, ...props }: { className?: string; props?: ComponentProps<'div'> }) => {
  const { userinfo } = useUserStore()
  return (
    <div className={[styles['userInfo'], className].join(' ')} {...props}>
      <span className={styles['headerName']}>{userinfo?.name}</span>
      <span>
        {userinfo?.role === userPms.teacher && <span className={styles['schoolName']}>{'uid:' + userinfo.uid + ' 老师'}</span>}
        {userinfo?.role === userPms.student && <span className={styles['schoolName']}>{'uid:' + userinfo.uid + ' 同学'}</span>}
        {userinfo?.role === userPms.admin && <span className={styles['schoolName']}>{'uid:' + userinfo.uid + ' 管理员'}</span>}
        <ArrowDown />
      </span>
    </div>
  )
}
