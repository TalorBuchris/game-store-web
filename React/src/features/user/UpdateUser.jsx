import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { updateDetailsUser } from "../../api/userService";
import { outFromEditUser, userIn } from "./userSlice";

import { Box, Button, Card, CardContent, TextField } from "@mui/material";

export default function UpdateUser() {

    let disp = useDispatch();
    let u = useSelector(state => state.u.currentUser)
    let { register, handleSubmit, formState } = useForm({
        defaultValues: {
            firstName: u.firstName || "",
            lastName: u.lastName || "",
            userName: u.userName,
            email: u.email,
            phone: u.phone || "",
            address: u.address || "",
        }
    });

    function send(data) {
        let role = u.role;
        data = {...data, role}

        console.log(data)
        updateDetailsUser(data, u).
            then(res => {
                console.log(res.data)
                disp(userIn(res.data))
                disp(outFromEditUser())
            }).catch(err => {
                console.log(err)
                alert(err.message);
            })
    }

    return <div className="divEditionUser">
        <Card className="cardLogin">
            <CardContent>
                <form onSubmit={handleSubmit(send)} className="formLogin">
                    <h2>עריכת פרטים אישיים</h2>


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
                            <TextField fullWidth label="שם משתמש" variant="outlined" {...register("userName", {
                                required: { value: true, message: "שדה חובה" }
                            })} />
                            {formState.errors.userName && <div className="requiredField">{formState.errors.userName.message}</div>}
                        </Box>
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="אימייל *" variant="outlined" {...register("email", {
                                required: { value: true, message: "שדה חובה" },
                                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "כתובת המייל לא תקינה" }
                            })} />
                            {formState.errors.email && <div className="requiredField">{formState.errors.email.message}</div>}
                        </Box>

                    </div>
                    <div className="oneLine">
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="מס' פלאפון" variant="outlined" {...register("phone")} />
                        </Box>
                        <Box className="inpUpdateSmall">
                            <TextField fullWidth label="כתובת" variant="outlined" {...register("address")} />
                        </Box>
                    </div>

                    <div className="buttonsFormUpdate">
                        <Button className="btnFormUpdate" type="submit" variant="outlined" color="primary">
                            שמור שינויים
                        </Button>
                        <Button className="btnFormUpdate" type="button" variant="outlined" color="primary" onClick={() =>
                            disp(outFromEditUser())
                        }>
                            ביטול
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
}