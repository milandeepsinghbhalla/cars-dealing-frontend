import React from 'react'
import ReactDOM from 'react-dom/client'
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

// const db = getDatabase(app);

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
    }
  ]
  },
 
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
