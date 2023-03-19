/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { navList } from './components/routes/routesList'

const App = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <BrowserRouter>
          <Routes>
            {navList?.map(({ element, path }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
