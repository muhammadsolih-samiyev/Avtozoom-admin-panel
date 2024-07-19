/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import './App.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import SiderMY from './components/SiderMy';
import Category from './pages/category/Category';
import Brands from './pages/brands/Brands';
import Cities from './pages/cities/Cities';
import Locations from './pages/locations/Locations';
import Models from './pages/models/Models';
import Cars from './pages/cars/Cars';

function App() {
  const token = localStorage.getItem("token");
  const [check, setCheck] = useState(false);
  useEffect(() => {
    token ? setCheck(true) : setCheck(false);
  }, []);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login setCheck={setCheck} />,
    },

    {
      path: "/home",
      element:
        check || token ? (
          <SiderMY setCheck={setCheck}>
            <Category check={check} />{" "}
          </SiderMY>
        ) : (
          <Navigate to='/login' replace />
        ),
    },

    {
      path: "/brands",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <Brands />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/cities",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <Cities />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/locations",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <Locations />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/models",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <Models />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/cars",
      element: check || token  ? (
        <SiderMY setCheck={setCheck}>
          <Cars />
        </SiderMY>
      ) : (
        <Navigate to={"/login"} replace />
      ),
    },
    {
      path: "/",
      element: check || token  ? (
        <Navigate to='/home' replace />
      ) : (
        <Navigate to='/login' replace />
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
