import jwt from "jsonwebtoken"

// create token
export function createToken(user) {
    let token = jwt.sign({ userId: user.userId, role: user.role, userName: user.userName }, process.env.SECRET_KEY, { expiresIn: "10d" })
    return token;
}
// check token
export function checkToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token)
        return res.status(401).json("מצטערים עליך לבצע כניסה קודם");
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result;
        next();
    }
    catch (err) {
        return res.status(401).json("שגיאה " + err.message)
    }
}

export function checkAdmin(req, res, next) {
    let token = req.headers.authorization;
    if (!token)
        return res.status(401).json("מצטערים עליך לבצע כניסה קודם");
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        if (result.role != "ADMIN")
            return res.status(403).json("אין לך את הסיווג המתאים " + err.message)
        req.user = result;
        next();
    }
    catch(err) {
        return res.status(401).json("שגיאה " + err.message)
    }
}