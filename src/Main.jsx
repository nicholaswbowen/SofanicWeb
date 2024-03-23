import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './Root.jsx';
import { CssBaseline } from '@mui/material';
import ErrorPage from "./error-page.jsx";
import Contact from "./views/Contact.jsx";
import About from "./views/About.jsx";
import BookUploader from "./views/BookUploader.jsx";
import UploadSuccess from "./views/UploadSuccess.jsx";
import UploadFailure from "./views/UploadFailure.jsx";
import PrivateRoute from './components/PrivateRoute.jsx';
import Home from "./views/Home.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './AuthProvider.jsx'
import Signup from './views/Signup.jsx';
import Login from './views/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "uploader",
        element: <PrivateRoute><BookUploader/></PrivateRoute>,
      },
      {
        path: "upload-success",
        element: <PrivateRoute><UploadSuccess /></PrivateRoute>,
      },
      {
        path: "upload-failure",
        element: <PrivateRoute><UploadFailure /></PrivateRoute>,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <CssBaseline />
    </AuthProvider>
  </React.StrictMode>,
)
