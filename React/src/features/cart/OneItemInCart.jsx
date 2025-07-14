import * as React from 'react';
import { useDispatch } from "react-redux";

import { addItem, reduceItem, removeItem } from "./cartSlice.js"
import "./cartStyle.css"

import DeleteIcon from '@mui/icons-material/Delete';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { Box, IconButton } from "@mui/material";

export default function OneItemInCart(props) {
    let disp = useDispatch();
    let one = props.oneItem;
    return <Box className="oneItemInCart">
        <IconButton color="primary" sx={{ margin: "5px" }} onClick={() => { disp(removeItem(one)) }} >
            <DeleteIcon />
        </IconButton>
        <img className="imgCart" src={"images/" + one.imgUrl} />
        <div className="aaa">
            <p>{one.toyName}</p>
        </div>
        <div className="aaa">
            <p>מחיר לפריט {one.price}</p>
        </div>
        <p>כמות {one.quantity}</p>
        <p>סך הכל {(one.quantity) * (one.price)}</p>
        <div>
            <IconButton color="primary" variant="outlined" sx={{ margin: "5px" }} onClick={() => { disp(addItem(one)) }} >
                <AddRoundedIcon />
            </IconButton>
            <IconButton color="primary" sx={{ margin: "5px" }} onClick={() => { disp(reduceItem(one)) }} >
                <RemoveRoundedIcon />
            </IconButton>
        </div>
    </Box>
}
