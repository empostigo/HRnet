import ReactDOM from 'react-dom/client'
import HRnetRouter from "./components/Router"

// RTK
import { Provider } from 'react-redux'
import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HRnetRouter />
  </Provider>
)
