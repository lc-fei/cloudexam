import { Breadcrumb, Dropdown, Layout, Menu, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { DropDownMenu, getMenu } from '../../constants'
import { useBreadRouterStore } from '../../store/useBreadRouterStore'
import { UserInfo } from './components/UserInfo'
import styles from './index.module.scss'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { msgError } from '@/utils/msg'
import { useSpinningStore } from '@/store/useSpinningStore'
const { Header, Content, Footer } = Layout

export const HomePage = () => {
  const navigator = useNavigate()
  const BreadcrumbItems = useBreadRouterStore((state) => state.routers)
  const pushrouter = useBreadRouterStore((state) => state.pushrouter)
  const clearrouters = useBreadRouterStore((state) => state.clearrouters)
  const { spinningStore } = useSpinningStore()
  const [menu, setMenu] = useState<MenuItemType[]>([])
  const menuClick = (e: MenuItemType) => {
    const { key } = e
    if (key === 'changepwd') {
      console.log('key', key)
    } else if (key === 'logout') {
      navigator('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      clearrouters()
    }
  }
  useEffect(() => {
    // * 挂载时添加默认路由
    if (!localStorage.getItem('token')) {
      navigator('/login')
      msgError('请先登录')
    } else {
      setMenu(getMenu() as MenuItemType[])
      pushrouter({ title: '首页', path: '/' })
      return () => {
        clearrouters()
      }
    }
  }, [])

  return (
    <>
      <Layout className={styles['Layout']}>
        <Header className={styles['Header']}>
          <div className={styles['HeaderContent']}>
            <div className={styles['logo']}></div>
            <Menu
              theme="light"
              mode="horizontal"
              items={menu}
              defaultActiveFirst={true}
              className={styles['HeaderMenu']}
              style={{ height: '73px' }}
              onClick={(e) => {
                clearrouters()
                pushrouter({
                  title: (e.domEvent.target as HTMLElement).innerText as string,
                  path: e.key,
                })
                navigator(e.key)
              }}
            />
            <Dropdown
              menu={{
                items: DropDownMenu,
                onClick: menuClick,
              }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
              className={styles['userInfoContainer']}
            >
              <UserInfo />
            </Dropdown>
          </div>
        </Header>

        <Content className={styles['Content']}>
          <div className={styles['bread']}>
            <Breadcrumb
              items={BreadcrumbItems}
              itemRender={(route, _params, routes) => {
                console.table(BreadcrumbItems)
                if (route.path === routes[0].path) {
                  return (
                    <Link
                      to={route.path as string}
                      onClick={() => {
                        clearrouters()
                        pushrouter({
                          title: route.title as string,
                          path: route.path as string,
                        })
                      }}
                    >
                      {route.title}
                    </Link>
                  )
                } else if (route.path === routes[routes.length - 1].path) {
                  return <span>{route.title}</span>
                }
                return <Link to={route.path as string}>{route.title}</Link>
              }}
              // separator='>'
            ></Breadcrumb>
          </div>
          <div className={styles['ContentContainer']}>
            <div style={{ position: 'relative' }}>
              {spinningStore && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)', // 设置蒙层的颜色和透明度
                    zIndex: 1, // 确保蒙层在Outlet之上
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Spin spinning={spinningStore} /> {/* 将Spin放在蒙层容器中 */}
                </div>
              )}

              <Outlet />
            </div>
          </div>
        </Content>
        <Footer className={styles['Footer']}></Footer>
      </Layout>
    </>
  )
}
