import ReactDOM from 'react-dom/client'
import HRnetRouter from "./components/Router"

// RTK
import { Provider } from 'react-redux'
import { store } from './app/store'

import "../node_modules/em-react-calendar-test9/dist/style.css"


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HRnetRouter />
  </Provider>
)
