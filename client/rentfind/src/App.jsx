import { RouterProvider } from 'react-router-dom';
import { routers } from './utils/routers';
function App() {
  return (
    <RouterProvider router={routers} />
  )
}

export default App
