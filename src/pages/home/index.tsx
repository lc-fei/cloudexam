import { Breadcrumb, Dropdown, Layout, Menu } from 'antd'
import { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AdmMenu, DropDownMenu } from '../../constants'
import { useBreadRouterStore } from '../../store/useBreadRouterStore'
import { UserInfo } from './components/UserInfo'
import styles from './index.module.scss'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { msgError } from '@/utils/msg'

const { Header, Content, Footer } = Layout

export const HomePage = () => {
  const navigator = useNavigate()
  const BreadcrumbItems = useBreadRouterStore((state) => state.routers)
  const pushrouter = useBreadRouterStore((state) => state.pushrouter)
  const clearrouters = useBreadRouterStore((state) => state.clearrouters)
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
    }
    pushrouter({ title: '首页', path: '/' })
    return () => {
      clearrouters()
    }
  }, [])

  return (
    <>
      <Layout className={styles['Layout']}>
        <Header className={styles['Header']}>
          <div className={styles['HeaderContent']}>
            <h1 className={styles['HeaderTitle']}>CloudExam</h1>
            <Menu
              theme="light"
              mode="horizontal"
              items={AdmMenu}
              defaultActiveFirst={true}
              className={styles['HeaderMenu']}
              style={{ height: '72px' }}
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
              itemRender={(route, _params, routes, _paths) => {
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
            <Outlet />
          </div>
        </Content>
        <Footer className={styles['Footer']}></Footer>
      </Layout>
    </>
  )
}
