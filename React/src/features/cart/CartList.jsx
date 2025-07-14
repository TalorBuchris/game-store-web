import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OneItemInCart from "./OneItemInCart";
import { EmptyingCart } from "./cartSlice.js"

import { Button, Card, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function CartList() {
    let sum = useSelector(state => state.cartToys.sum)
    let count = useSelector(state => state.cartToys.count)
    let arrCart = useSelector(state => state.cartToys.arr);
    let disp = useDispatch();
    let navig = useNavigate();

    if (count > 0)
        return <Card id="cart">
            <Button variant="outlined" endIcon={<DeleteForeverIcon />} id="emptyingCart" onClick={() =>
                setTimeout(() => {
                    disp(EmptyingCart())
                }, 250)
            }>
                ריקון העגלה
            </Button>
            <h2>העגלה שלך</h2>
            <div id="allCart">
                {arrCart.map(item => {
                    return <OneItemInCart oneItem={item} key={item.toyId} />
                })}
            </div>
            <Typography className="end" id="endCart" variant="p">{`${count} פריטים בסל, סך הכל לתשלום ${sum} ₪`}</Typography>
            <Button variant="outlined" endIcon={<LocalMallIcon className="allBtn" />} onClick={() => navig("/checkout")} >
                לסיום הזמנה ולתשלום
            </Button>
        </Card>
    else
        return <div>
            <h2>עדיין אין פריטים בעגלה שלך</h2>
            <Button variant="outlined" endIcon={<HomeIcon className="allBtn" />} onClick={() => navig("/list")} >
                לרשימת המוצרים שלנו
            </Button>
        </div>
}