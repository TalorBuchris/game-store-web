// import viteLogo from '/vite.svg'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Login from './features/user/Login'
import { userIn } from './features/user/userSlice'
import UpdateUser from './features/user/UpdateUser'
import Checkout from './features/cart/Checkout'
import CartList from './features/cart/CartList'
import { CartInitialization, setSuccessOrder } from './features/cart/cartSlice'
import Registration from './features/user/Registration'
import ResponsiveAppBar from './NavBar'
import ToysList from './ToysList'
import AddToyForm from './AddToyForm'

import { Snackbar } from '@mui/material'

function App() {
  let disp = useDispatch();
  let successOrder = useSelector(state => state.cartToys.successOrder)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    disp(setSuccessOrder(false));
  };

  useEffect(() => {
    let u = localStorage.getItem("currentUser");
    if (u)
      disp(userIn(JSON.parse(u)));
    let c = localStorage.getItem("cart");
    if (c)
      disp(CartInitialization(JSON.parse(c)));
  }, [])

  let userForEditing = useSelector(state => state.u.userForEditing);

  return (
    <>
      <ResponsiveAppBar />
      <Routes>
        <Route path="add" element={<AddToyForm />} />
        <Route path="cart" element={<CartList />} />
        <Route path="list" element={<ToysList />} />
        <Route path='reg' element={<Registration />} />
        <Route path='log' element={<Login />} />
        <Route path='updateUser' element={<UpdateUser />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path="" element={<ToysList />} />
      </Routes>
      {userForEditing && <UpdateUser />}

      <Snackbar
        open={successOrder}
        autoHideDuration={3000}
        onClose={handleClose}
        onClick={handleClose}
        message="ההזמנה הושלמה בהצלחה"
      />
    </>
  )
}

export default App
