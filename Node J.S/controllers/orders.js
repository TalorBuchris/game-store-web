import query from "../db/db.js"

// getAllOrders
export async function getAllOrders(req, res) {
    try {
        let result = await query(`select o.*, toyName, priceToItem, quantity from orders o
            join prod_for_order pfo
            on o.orderId = pfo.orderId 
            join toys t
            on pfo.toyId = t.toyId`);
        res.json(result[0]);
    }
    catch (err) {
        res.status(400).send("תקלה בהתחברות לשרת " + err.message)
    }
}

// getOrderById
export async function getOrderById(req, res) {
    let { id } = req.params
    try {
        let result = await query(`select o.*, toyName, priceToItem, quantity from orders o
            join prod_for_order pfo
            on o.orderId = pfo.orderId 
            join toys t
            on pfo.toyId = t.toyId
            where o.orderId =` + id);
        if (result[0].length == 0)
            return res.status(404).send("לא נמצאה הזמנה עם קוד כזה")
        return res.json(result[0]);
    }
    catch (err) {
        res.status(400).send("תקלה בהתחברות לשרת " + err.message)
    }
}

// AllUnshippedOrders
export async function AllUnshippedOrders(req, res) {
    try {
        let result = await query(`select o.*, toyName, priceToItem, quantity from orders o
            join prod_for_order pfo
            on o.orderId = pfo.orderId 
            join toys t
            on pfo.toyId = t.toyId
            where o.isOrderInWay = 0`);
        res.json(result[0]);
    }
    catch (err) {
        res.status(400).send("תקלה בהתחברות לשרת " + err.message)
    }
}

// addOrder
export async function addOrder(req, res) {
    let body = req.body;
    try {
        let query1 = `insert into orders (userId, inviter, dateOrder, totalPrice, address, phoneInviter, shipmentArrivalDate) 
        values(${body.userId}, "${body.inviter}", now(), ${body.sum}, "${body.address}", "${body.phoneInviter}", DATE_ADD(now(), interval 7 DAY))`;
        let result = await query(query1)
        let orderId = result[0].insertId;
        let query2 = "insert into prod_for_order (orderId, toyId, priceToItem, quantity) values"
        let i;
        for (i = 0; i < body.toys.length - 1; i++)
            query2 += `(${orderId}, ${body.toys[i].toyId}, ${body.toys[i].price}, ${body.toys[i].quantity}), `
        query2 += `(${orderId}, ${body.toys[i].toyId}, ${body.toys[i].price}, ${body.toys[i].quantity})`
        result = await query(query2)
        res.json(result[0])
    }
    catch(err) {
        res.status(400).send("תקלה בהתחברות לשרת " + err.message)
    }
}

// updateStatusOrder
export async function updateStatusOrder(req, res) {
    let { id } = req.params;
    try {
        let result = await query("update orders set isOrderInWay = 1 where orderId = " + id);
        if (result[0].affectedRows == 0)
            return res.status(404).send("אי אפשר לעדכן את ההזמנה");
        let result2 = await query(`select o.*, toyName, priceToItem, quantity from orders o
            join prod_for_order pfo
            on o.orderId = pfo.orderId 
            join toys t
            on pfo.toyId = t.toyId
            where o.orderId = ` + id)
        return res.json(result2[0])
    }
    catch (err) {
        res.status(400).send("תקלה בהתחברות לשרת " + err.message)
    }
}

// date + 7 days
export async function sevenDaysMore(req, res) {
    try{
        let result = await query(`select Date_Format(DATE_ADD(now(), interval 7 DAY),'%Y-%m-%d') as date`)
        return res.json(result[0][0])
    }
    catch(err){
        res.status(400).send("תקלה בהתחברות לשרת " + err.message)
    }
}