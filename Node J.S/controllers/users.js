import query from "../db/db.js"
import bcryptjs from "bcryptjs"
import { createToken } from "../Utils/AccessPermissions.js";
import { validateEmail, validatePassword } from "../Utils/validations.js";

// שליפת כל המשתמשים
export async function getAllUsers(req, res) {
    try {
        let result = await query("select userId, firstName, lastName, userName, email, role, phone, address from users");
        res.json(result[0]);
    }
    catch (err) {
        res.status(400).send("מצטערים אי אפשר לשלוף את כל המשתמשים " + err.message)
    }
}

// login - שליפת משתמש
export async function getUserByPassword(req, res) {
    let { body } = req;
    if (!body.userName || !body.password)
        return res.status(404).send("חסר שם משתמש או סיסמא")
    try {
        let str = `select * from users where userName = '${body.userName}'`;
        let result = await query(str);
        if (result[0].length == 0)
            return res.status(404).send("לא נמצא משתמש עם פרטים כאלו");
        let isValidPassword = await bcryptjs.compare(body.password, result[0][0].password)
        if (!isValidPassword)
            return res.status(404).send("סיסמא שגויה");
        let token = createToken(result[0][0])
        let { password, ...apartFromPassword } = result[0][0];
        return res.json({ ...apartFromPassword, token });
    }
    catch (err) {
        res.status(404).send("מצטערים לא ניתן להתחבר כעת " + err.message);
    }
}

// הוספת משתמש
export async function addUser(req, res) {
    let { body } = req;
    try {
        if (!body.userName || !body.email || !body.password)
            return res.status(404).send("נא מלאו את כל השדות הנדרשים");
        if (!validateEmail(body.email))
            return res.status(404).send("כתובת האימייל לא תקינה")
        if (!validatePassword(body.password))
            return res.status(404).send("הסיסמא לא תקינה")
        let str1 = `select count(*) from users where userName = "${body.userName}"`;
        let availableUserName = await query(str1);
        if (availableUserName[0][0]["count(*)"] != 0)
            return res.status(404).send("שם המשתמש כבר קיים");
        let hidenPassword = await bcryptjs.hash(body.password, 15);
        let str2 = `insert into users (firstName, lastName, userName, email, password, role, phone, address) 
            values("${body.firstName || ""}", "${body.lastName || ""}", "${body.userName}", 
            "${body.email}", "${hidenPassword}", "USER", "${body.phone || ""}", "${body.address || ""}")`
        let result = await query(str2);
        if (result[0].affectedRows == 0)
            return res.status(404).send("אי אפשר להוסיף משתמש כזה");
        let user = {
            userId: result[0].insertId,
            firstName: body.firstName,
            lastName: body.lastName,
            userName: body.userName,
            email: body.email,
            role: "USER",
            phone: body.phone,
            address: body.address
        }
        let token = createToken(user)
        return res.json({ ...user, token });
    }
    catch (err) {
        res.status(400).send("מצטערים לא ניתן להוסיף משתמש כעת" + err.message)
    }
}

// עדכון פרטי משתמש
export async function updateDetailsUser(req, res) {
    let { body } = req;
    try {
        if (!body.userName || !body.email)
            res.status(404).send("השדות שם משתמש ואימייל הם שדות חובה");
        if (!validateEmail(body.email))
            return res.status(404).send("כתובת האימייל לא תקינה")
        let str1 = `select count(*) from users where userName = "${body.userName}"`;
        let availableUserName = await query(str1);
        if (availableUserName[0][0]["count(*)"] != 0 && availableUserName[0][0]["count(*)"] != 1)
            return res.status(404).send("שם המשתמש כבר קיים");
        let str = `update users set firstName = "${body.firstName || ""}", lastName = "${body.lastName || ""}", userName = "${body.userName}", 
            email = "${body.email}", phone = "${body.phone || ""}", address = "${body.address || ""}" where userId = ${req.params.id}`
        let result = await query(str);
        if (result[0].affectedRows == 0)
            return res.status(404).send("אי אפשר לעדכן משתמש כזה");
        let user = {
            userId: body.userId,
            firstName: body.firstName,
            lastName: body.lastName,
            userName: body.userName,
            email: body.email,
            role: body.role,
            phone: body.phone,
            address: body.address
        }
        let token = createToken(user)
        return res.json({ ...user, token });
    }
    catch (err) {
        res.status(400).send("מצטערים לא ניתן לעדכן את המשתמש כעת " + err.message)
    }
}