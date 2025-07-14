import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addItem, onAdded, offAdded } from "./features/cart/cartSlice";
import { sendToyToEdit } from "./features/toys/toysSlice";
import { ProductDeactivation } from "./api/toysService";
import "./style.css"

import { ButtonGroup, Button, Card, CardContent, Typography, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';

export default function OneToy(props) {

    let disp = useDispatch();
    let u = useSelector(state => state.u.currentUser)
    let one = props.one;

    function addItemToCart() {
        disp(addItem(one));
        disp(onAdded());
        setTimeout(() => { disp(offAdded()) }, 1200)
    }

    return <Card sx={{ minWidth: 275, width: "15vw", margin: "1vw" }}>
        <CardContent>
            <Typography sx={{ m: 3 }} variant="h5">{one.toyName}</Typography>
            <CardMedia
                component="img"
                image={"images/" + one.imgUrl}
                sx={{ width: "13vw", mb: 5 }}
            />
            <Typography>מחיר: {one.price}</Typography>
            <Typography sx={{ m: 1.5 }}>{one.description}</Typography>
            <Typography>קטגוריה {one.categoryName || "לא ידועה"}</Typography>
        </CardContent>
        {u && u.role == "ADMIN" ?
            <ButtonGroup variant="outlined" className="btnGroup">
                <Button onClick={() =>
                    disp(sendToyToEdit(one))
                    // לרענן את הדף
                }>
                    <EditNoteRoundedIcon />
                </Button>
                <Button onClick={() => {
                    ProductDeactivation(one.toyId, u)
                    // לרענן את הדף
                }}>
                    <DeleteIcon />
                </Button>
            </ButtonGroup> :
            <Button variant="outlined" id="btnGroup" endIcon={<AddShoppingCartIcon className="allBtn" />} onClick={() => {
                addItemToCart()
            }}>
                הוסף לסל
            </Button>
        }
    </Card>
}