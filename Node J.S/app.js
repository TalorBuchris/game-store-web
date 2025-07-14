import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import categoriesRouter from "./routers/categories.js"
import usersRouter from "./routers/users.js"
import toysRouter from "./routers/toys.js"
import ordersRouter from "./routers/orders.js"
import { checkToken } from "./Utils/AccessPermissions.js";

dotenv.config();

const app = express(); // בניית השרת

app.use(cors());
app.use(express.json());

app.use("/categories", categoriesRouter)
app.use("/users", usersRouter)
app.use("/toys", toysRouter)
app.use("/orders", checkToken, ordersRouter)

let port = process.env.PORT;
app.listen(port, "localhost", () => {
    console.log("app is running on port " + port)
})