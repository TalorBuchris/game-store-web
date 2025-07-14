import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { allCategories } from "./api/categoriesService";
import { addToy } from "./api/toysService";
import "./addToyFormStyle.css"

import { Box, Button, Card, CardContent, MenuItem, TextField, Typography } from "@mui/material";

export default function AddToyForm() {
    let { register, formState, handleSubmit } = useForm();
    let u = useSelector(state => state.u.currentUser)
    let [categories, setCategories] = useState([]);

    useEffect(() => {
        allCategories(u)
            .then(res => {
                setCategories(res.data)
                console.log(categories)
            })
            .catch(err => { console.log("error " + err) });
    }, [])

    const save = (data) => {
        addToy(data, u)
            .then(res => {
                console.log(res)
                alert(`המוצר ${res.data.toyId} נוסף בהצלחה`)
            }).catch(err => {
                alert("הודעת השגיאה " + err.massage)
                console.log(err)
            })
    }
    return <form onSubmit={handleSubmit(save)}>
        <Card className="formUpdateToySize">
            <CardContent className="formUpdateToy" >
                <Typography id="headingFormAddToy" variant="h5">הוספת מוצר</Typography>
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
                            fullWidth label="תאריך יצור"
                            type="date" variant="outlined"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register("dateOfManufacture")} />
                    </Box>
                    <Box>
                        <TextField
                            select
                            label="קטגוריה"
                            {...register("categoryId", { required: { value: true, message: "שדה חובה" } })}
                        >
                            {categories?.map((option) => (
                                <MenuItem key={option.categoryId} value={option.categoryId}>
                                    {option.categoryName}
                                </MenuItem>
                            ))}
                        </TextField>
                        {formState.errors.categoryId && <div className="requiredField">{formState.errors.categoryId.message}</div>}
                    </Box>
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
                </div>
            </CardContent>
        </Card>
    </form>
}