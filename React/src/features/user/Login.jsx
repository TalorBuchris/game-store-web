import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserByPassword } from "../../api/userService";
import { userIn } from "./userSlice";
import "./userStyle.css"

import { Button, Box, Card, CardContent, TextField } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Login() {
    let navig = useNavigate();
    let { register, handleSubmit, formState } = useForm();
    let disp = useDispatch();

    const send = (data) => {
        getUserByPassword(data)
            .then(res => {
                disp(userIn(res.data))
                navig("/list")
            }).catch(err => {
                console.log(err)
                alert(err.message);
            })
    }
    return <div id="login">
        <Card className="cardLogin">
            <CardContent>
                <form onSubmit={handleSubmit(send)} className="formLogin">

                    <h2>התחברות</h2>
                    <Box className="inp">
                        <TextField label="שם משתמש" variant="outlined" {...register("userName", { required: { value: true, message: "שדה חובה" } })} />
                        {formState.errors.userName && <div className="requiredField">{formState.errors.userName.message}</div>}
                    </Box>

                    <Box className="inp">
                        <TextField label="סיסמה" variant="outlined" {...register("password", {
                            required: { value: true, message: "שדה חובה" },
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{4,}$/, message: "הסיסמא חייבת להכיל לפחות אות אחת גדולה , קטנה, ספרה וסימן" }
                        })} />
                        {formState.errors.password && <div className="requiredField">{formState.errors.password.message}</div>}
                    </Box>

                    <Box className="inp">
                        <Button type="submit" variant="outlined" color="primary">
                            התחברות
                        </Button>
                    </Box>

                </form>
                <div className="now">
                    <h5 className="nowLine">עוד לא נרשמתם?</h5>
                    <Button variant="outlined" color="primary" endIcon={<ExitToAppIcon className="allBtn" />} onClick={() => navig("/reg")} >
                        הרשמו עכשיו
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
}