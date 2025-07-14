import * as React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { outFromEdit } from "./toysSlice";
import { updateDetailToy } from "../../api/toysService";
import { allCategories } from "../../api/categoriesService";
import "./toysStyle.css";

import { Box } from "@mui/system";
import { Button, Card, CardContent, TextField, Typography, MenuItem } from "@mui/material";

export default function UpdateToy() {

    let navig = useNavigate();
    let disp = useDispatch();
    let one = useSelector(state => state.t.toyForEditing);
    let u = useSelector(state => state.u.currentUser);
    let [categories, setCategories] = useState([]);
    let { register, handleSubmit, formState } = useForm({
        defaultValues: {
            toyName: one.toyName,
            price: one.price,
            description: one.description,
            dateOfManufacture: one.dateOfManufacture,
            categoryId: one.categoryId,
            imgUrl: one.imgUrl,
            categoryName: one.categoryName,
        }
    });

    useEffect(() => {
        allCategories(u)
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => { console.log("error " + err) });
    }, [])

    function send(data) {
        updateDetailToy(one.toyId, data, u).
            then(res => {
                disp(outFromEdit());
                navig("/list");
            }).catch(err => {
                console.log(err)
                alert(err.message);
            })
    }

    return <div id="updateToy">
        <form onSubmit={handleSubmit(send)}>
            <Card className="formUpdateToySize">
                <CardContent className="formUpdateToy" >
                    <Typography id="headingFormUpdateToy" variant="h5">טופס עדכון מוצר</Typography>
                    <div className="oneLine">
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="שם המוצר" variant="outlined" {...register("toyName", { required: { value: true, message: "שדה חובה" } })} />
                            {formState.errors.toyName && <div className="requiredField">{formState.errors.toyName.message}</div>}
                        </Box>
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="מחיר" variant="outlined" {...register("price", { required: { value: true, message: "שדה חובה" } })} />
                            {formState.errors.price && <div className="requiredField">{formState.errors.price.message}</div>}
                        </Box>
                    </div>
                    <div className="oneLine">
                        <Box className="inpUpdateSmall">
                            <TextField
                                fullWidth
                                label="תאריך יצור"
                                type="date"
                                variant="outlined"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                {...register("dateOfManufacture")} />

                        </Box>
                        <TextField
                            select
                            label="קטגוריה"
                            defaultValue={one.categoryId}
                            {...register("categoryId")}
                        >
                            {categories?.map((option) => (
                                <MenuItem key={option.categoryId} value={option.categoryId}>
                                    {option.categoryName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <Box className="inpUpdateLarge">
                        <TextField fullWidth label="תיאור" variant="outlined" {...register("description")} />
                    </Box>
                    <Box className="inpUpdateLarge">
                        <TextField fullWidth label="שם תמונת המוצר" variant="outlined" {...register("imgUrl")} />
                    </Box>

                    <div className="buttonsFormUpdate">
                        <Button className="btnFormUpdate" type="submit" variant="outlined" color="primary">
                            שמור שינויים
                        </Button>
                        <Button className="btnFormUpdate" type="button" variant="outlined" color="primary" onClick={() =>
                            disp(outFromEdit())
                        }>
                            ביטול
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    </div>
}