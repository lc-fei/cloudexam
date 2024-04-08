import { ComponentProps } from 'react'
import { ArrowDown } from '../../../../assets/icons'
import styles from './index.module.scss'
export const UserInfo = ({ className, ...props }: { className?: string; props?: ComponentProps<'div'> }) => {
  return (
    <div className={[styles['userInfo'], className].join(' ')} {...props}>
      <span className={styles['headerName']}>刘旭峰</span>
      <span>
        <span className={styles['schoolName']}>幸福中学(高中)</span>
        <ArrowDown />
      </span>
    </div>
  )
}
