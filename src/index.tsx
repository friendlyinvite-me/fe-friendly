import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './utils/firebase.ts'
import { EventInfo } from './pages/event-info/EventInfo';
import { fetchEventInfo } from './api/events';
import { Login } from './pages/login/Login';
import { Landing } from './pages/landing/Landing';
import { Dashboard } from './pages/dashboard/Dashboard';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/events/:id",
        element: <EventInfo />,
        loader: async (data) => {
          const id = data.params.id;
          return fetchEventInfo(id as string);
        }
      }
    ]
  },
  
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
