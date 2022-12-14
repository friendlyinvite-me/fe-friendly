import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './utils/firebase.ts';
import { EventInfo } from './pages/event-info/EventInfo';
import { fetchEventInfo } from './api';
import { Login } from './pages/login/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import App from './App';
import { Landing } from './pages/landing/Landing';
import { CreateAnEvent } from './pages/create-an-event/CreateAnEvent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/login',
        element: <Login />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: '/create-an-event',
        element: <CreateAnEvent />,
      },
      {
        path: "/events/:id",
        element: <EventInfo />,
        loader: async (data) => {
          const eventId = data.params.id;
          return {eventId};
        },
      },
    ],
  },
  
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
