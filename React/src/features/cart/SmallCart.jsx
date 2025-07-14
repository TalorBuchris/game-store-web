import * as React from 'react';
import { useSelector } from "react-redux";

import "./cartStyle.css"

import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';

export default function AlertDialog() {
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    let sum = useSelector(state => state.cartToys.sum)
    let open = useSelector(state => state.cartToys.addedNow);
    let count = useSelector(state => state.cartToys.count)
    let arrCart = useSelector(state => state.cartToys.arr);


    return (
        <React.Fragment>
            <Dialog open={open} >
                <DialogTitle id="titleSmallCart" color="primary">
                    העגלה שלך
                </DialogTitle>
                <DialogContent id="smallCart">
                    <div id="allItemInSmallCart">
                        {arrCart.map(item => {
                            return <div className="itemInSmallCart" key={item.toyId}>
                                <img className="imgSmallCart" src={"images/" + item.imgUrl} />
                                <p>{item.toyName}</p>
                            </div>
                        })}
                    </div>
                    <div id="total">
                        <p>{count} פריטים בעגלה</p>
                        <p>סך הכל לתשלום ₪{sum}</p>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}