import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser } from "../../api/userService";
import { userIn } from "./userSlice";

import { Card, CardContent, TextField, Button, Box } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Registration() {
    let navig = useNavigate();
    let { register, handleSubmit, formState } = useForm();
    let disp = useDispatch();
    let [error, setError] = useState("");

    const send = (data) => {
        addUser(data)
            .then(res => {
                disp(userIn(res.data))
                navig("/list")
            }).catch(err => {
                setError(err.response.data)
            })
    }

    return <div>
        <Card className="cardLogin">
            <CardContent>
                <form onSubmit={handleSubmit(send)} className="formLogin">
                    <h2>הרשמה</h2>
                    <div className="oneLine">
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="שם משתמש *" variant="outlined" {...register("userName", { required: { value: true, message: "שדה חובה" } })} />
                            {formState.errors.userName && <div className="requiredField">{formState.errors.userName.message}</div>}
                            {error && <div className="requiredField">{error}</div>}
                        </Box>
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="סיסמה *" variant="outlined" {...register("password", {
                                required: { value: true, message: "שדה חובה" },
                                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{4,}$/, message: "הסיסמא חייבת להכיל לפחות אות אחת גדולה , קטנה, ספרה וסימן" }
                            })} />
                            {formState.errors.password && <div className="requiredField">{formState.errors.password.message}</div>}
                        </Box>
                    </div>

                    <div className="oneLine">
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="שם פרטי" variant="outlined" {...register("firstName")} />
                        </Box>
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="שם משפחה" variant="outlined" {...register("lastName")} />
                        </Box>
                    </div>

                    <div className="oneLine">
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="אימייל *" variant="outlined" {...register("email", {
                                required: { value: true, message: "שדה חובה" },
                                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "כתובת המייל לא תקינה" }
                            })} />
                            {formState.errors.email && <div className="requiredField">{formState.errors.email.message}</div>}
                        </Box>
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="מס' פלאפון" variant="outlined" {...register("phone")} />
                        </Box>
                    </div>

                    <Box className="inpUpdateLarge">
                        <TextField fullWidth label="כתובת" variant="outlined" {...register("address")} />
                    </Box>

                    <Box className="inp">
                        <Button type="submit" variant="outlined" color="primary">
                            הרשמה
                        </Button>
                    </Box>
                </form>
                <div className="now">
                    <h5 className="nowLine">רשומים כבר</h5>
                    <Button variant="outlined" color="primary" endIcon={<ExitToAppIcon className="allBtn" />} onClick={() => navig("/log")} >
                        להתחברות
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
}