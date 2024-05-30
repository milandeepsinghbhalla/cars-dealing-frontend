import React from 'react'
import ReactDOM from 'react-dom/client'
// import React, { createContext } from 'react';
import { Provider } from 'react-redux';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



// import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'
// import { getDatabase, ref, set } from "firebase/database";
// import app from './firebase.js';
import Navbar from './components/Navbar.jsx';
import HomePage from './pageComponents/HomePage.jsx';
import DashboardAdmin from './pageComponents/DashboardAdmin.jsx';
import RegistrationPage from './pageComponents/RegistrationPage.jsx';
import LoginPage from './pageComponents/LoginPage.jsx';
import { store } from './reduxStore/store.js';
import NewCars from './pageComponents/NewCars.jsx';
import UsedCars from './pageComponents/UsedCars.jsx';

// const db = getDatabase(app);

// const userContext = createContext();



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children:[ {
      path: "/",
      element: <HomePage />
    },
    {
      path: '/dashboard',
      element: <DashboardAdmin />
    },
    {
      path: '/register',
      element: <RegistrationPage />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/new-cars',
      element: <NewCars />
    },
    {
      path: '/used-cars',
      element: <UsedCars />
    }
  ]
  },
 
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>

      <RouterProvider router={router} />
    </Provider>
  
)
