import { useRoutes } from 'react-router-dom'
import './App.css'
import { routes } from './routers'

function App() {
  const routeMap = useRoutes(routes)
  return <>{routeMap}</>
}

export default App
