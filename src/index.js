/* eslint-disable no-undef */

import ReactDOM from 'react-dom/client'
import './components/styles/index.scss'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './components/redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
