import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";

import { EmptyingCart, setSuccessOrder } from "./cartSlice";
import { addOrder } from "../../api/orderService.js";

import { Box, Button, Card, CardContent, Snackbar, TextField, Typography } from "@mui/material";

export default function Checkout() {

    let u = useSelector(state => state.u.currentUser);
    let s = useSelector(state => state.cartToys.sum);
    let count = useSelector(state => state.cartToys.count);
    let arr = useSelector(state => state.cartToys.arr); 
    let disp = useDispatch();
    let navig = useNavigate();
    
    useEffect(() => {
        if (!u) {
            navig("/log")
        }
    }, [u]);

    let { register, handleSubmit, formState } = useForm({
        defaultValues: {
            inviter: (u?.firstName && u.lastName) ? u.firstName + " " + u.lastName : u?.firstName ? u.firstName : "",
            phoneInviter: u?.phone || "",
            address: u?.address || "",
        }
    });
    const send = (e) => {
        let data = {
            userId: u.userId,
            inviter: e.inviter,
            sum: s,
            address: e.address,
            phoneInviter: e.phoneInviter,
            toys: arr
        }
        console.log("llllllll")
        addOrder(data, u)
            .then(res => {
                disp(EmptyingCart())
                disp(setSuccessOrder(true))
                setTimeout(() => {
                    navig("/list")
                }, 2000);
            }).catch(err => {
                console.log(err);
                alert("שגיאה בהוספת ההזמנה " + err.response.data)
            })
    }

    return <form onSubmit={handleSubmit(send)}>
        <Card className="finishOrder">
            <CardContent className="formFinishOrder" >
                <Typography id="headingFormAddToy" variant="h5">סיום הזמנה</Typography>
                <div className="oneLine">
                    <Box className="inpUpdateSmall">
                        <TextField fullWidth label="שם המזמין" variant="outlined" {...register("inviter", { required: { value: true, message: "שדה חובה" } })} />
                        {formState.errors.inviter && <div className="requiredField">{formState.errors.inviter.message}</div>}
                    </Box>
                    <Box className="inpUpdateSmall">
                        <TextField fullWidth label="מס' פלאפון" variant="outlined" {...register("phoneInviter", { required: { value: true, message: "שדה חובה" } })} />
                        {formState.errors.phoneInviter && <div className="requiredField">{formState.errors.phoneInviter.message}</div>}
                    </Box>
                </div>
                <Box className="inpUpdateLarge">
                    <TextField fullWidth label="כתובת" variant="outlined" {...register("address", { required: { value: true, message: "שדה חובה" } })} />
                    {formState.errors.address && <div className="requiredField">{formState.errors.address.message}</div>}
                </Box>
                <Typography className="end" variant="p">{`${count} פריטים בסל, סך הכל לתשלום ${s} ₪`}</Typography>

                <div className="buttonsFormUpdate">
                    <Button className="btnFormUpdate" type="submit" variant="outlined" color="primary">
                        סיום הזמנה
                    </Button>
                </div>
            </CardContent>
        </Card>
    </form >
}