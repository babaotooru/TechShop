import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './ReduxStore/store.js'
import MyContext from './mycontext/MyContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyContext>
        <Provider store={store}>
          <App />
        </Provider>
      </MyContext>
    </BrowserRouter>
  </StrictMode>,
)
