import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { sendUserToEdit, userOut } from "./features/user/userSlice";
import "./style.css";

import {AppBar, Box, Toolbar} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ButtonAppBar() {
  let u = useSelector(state => state.u.currentUser)
  let disp = useDispatch();
  let navig = useNavigate();

  return <>
  <div id="shakuf"></div>
    <Box id="navBar" >
      <AppBar position="static" color="primary" id="bar">
        <Toolbar id="nav">

          <Link className='n' to="list">המוצרים שלנו</Link>
          {u && u.role == "ADMIN" && <Link className='n' to="add">הוספת מוצר</Link>}
          {(!u || u.role == "USER") && <Link className='n' to="cart">סל הקניות</Link>}
          {!u ? <Link className='n' to="log">הרשמה / כניסה</Link> :
            <div className='n' onClick={() => {
              disp(userOut())
              navig("/list");
            }} >יציאה</div>}
          <p className='n' id="helloUser" onClick={() => {
            {u ? disp(sendUserToEdit(u)) : navig("/log")}
          }}>
            שלום {!u ? "אורח" : u.firstName? u.firstName : u.userName} {<AccountCircleIcon className="allBtn" fontSize='large' />}
          </p>
        </Toolbar>
      </AppBar>
    </Box>
  </>
}