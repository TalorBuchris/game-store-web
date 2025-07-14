import query from "../db/db.js"

// getAllToys
// "הפונקציה שולפת גם מוצרים שכבר "לא קיימים
export async function getAllToys(req, res) {
    // נתונים שהפונקציה יכולה לקבל
    // search
    // toprice
    // page
    // perPage
    try {
        let search = req.query.search;
        let toprice = req.query.toprice;
        let perPage = req.query.perpage || 10;
        let page = req.query.page || 1
        let str = `select toyId, toyName, price, description, t.categoryId, Date_Format(dateOfManufacture,'%Y-%m-%d') as 'dateOfManufacture', active, imgUrl, c.categoryName 
        from toys as t left join categories as c on t.categoryId = c.categoryId`;
        if (search)
            str += " where toyName like '%" + search + "%'";
        if (toprice)
            if (search)
                str += " and price < " + toprice;
            else str += " where price < " + toprice;
        str += " limit " + perPage + " offset " + (page - 1) * perPage;
        let result = await query(str);
        res.json(result[0]);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

// getAllActiveToys
// הפונקציה שולפת מוצרים פעילים בלבד
export async function getAllActiveToys(req, res) {
    // נתונים שהפונקציה יכולה לקבל
    // search
    // toprice
    // page
    // perPage
    try {
        let search = req.query.search;
        let toprice = req.query.toprice;
        let perPage = req.query.perpage || 10;
        let page = req.query.page || 1
        let str = `select toyId, toyName, price, description, t.categoryId, Date_Format(dateOfManufacture,'%Y-%m-%d') as 'dateOfManufacture', active, imgUrl, c.categoryName 
        from toys as t left join categories as c on t.categoryId = c.categoryId where active = 1`;
        if (search)
            str += " and toyName like '%" + search + "%'";
        if (toprice)
            str += " and price < " + toprice;
        str += " limit " + perPage + " offset " + (page - 1) * perPage;
        let result = await query(str);
        res.json(result[0]);
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}

// כמות העמודים
// הנתונים שהפונקציה מקבלת
// s
// toprice
// perpage
// הפונקציה שולפת כמות עמודים גם של מוצרים שכבר לא קיימים
export async function totalPages(req, res) {
    let search = req.query.search;
    let toprice = req.query.toprice;
    let perPage = req.query.perpage || 10;
    try {
        let str = "select count(*) from toys as t left join categories as c on t.categoryId = c.categoryId";
        if (search)
            str += " where toyName like '%" + search + "%'";
        if (toprice)
            if (search)
                str += " and price < " + toprice;
            else str += " where price < " + toprice;
        let result = await query(str);
        return res.json(Math.ceil(result[0][0]["count(*)"] / perPage));
    }
    catch (err) {
        return res.status(400).send("מצטערים אי אפשר לשלוף את כמות הצעצועים " + err.message)
    }
}


// כמות העמודים
// הנתונים שהפונקציה מקבלת
// s
// toprice
// perpage
// הפונקציה שולפת כמות עמודים של מוצרים פעילים בלבד
export async function totalPagesOfActiveToys(req, res) {
    let search = req.query.search;
    let toprice = req.query.toprice;
    let perPage = req.query.perpage || 10;
    try {
        let str = `select count(*) from toys as t left join categories as c on t.categoryId = c.categoryId
            where active = 1`;
        if (search)
            str += " and toyName like '%" + search + "%'";
        if (toprice)
            str += " and price < " + toprice;
        let result = await query(str);
        return res.json(Math.ceil(result[0][0]["count(*)"] / perPage));
    }
    catch (err) {
        return res.status(400).send("מצטערים אי אפשר לשלוף את כמות הצעצועים " + err.message)
    }
}

// getToyById
// "הפונקציה שולפת גם מוצרים שכבר "לא קיימים
export async function getToyById(req, res) {
    let { id } = req.params;
    try {
        let result = await query("select * from toys where toyId = " + id)
        if (result[0].length == 0)
            return res.status(404).send("לא נמצא מוצר עם קוד כזה")
        return res.json(result[0][0]);
    }
    catch (err) {
        res.status(404).send("תקלה בהתחברות לשרת " + err.message);
    }
}

// getToysByCategory
export async function getToysByCategory(req, res) {
    let { id } = req.params;
    try {
        let result = await query("select * from toys where categoryId = " + id)
        if (result[0].length == 0)
            return res.status(404).send("לא נמצא מוצר עם קטגוריה כזו")
        return res.json(result[0]);
    }
    catch (err) {
        res.status(404).send("תקלה בהתחברות לשרת " + err.message);
    }
}

// addToy
export async function addToy(req, res) {
    let { body } = req;
    if (!body.toyName || !body.price)
        return res.status(404).send(`השדות "שם המוצר" ו"מחיר" הם שדות חובה`);
    try {
        let date = body.dateOfManufacture;
        if (date)
            date = `"${date}"`
        let str = `insert into toys (toyName, price, description, categoryId, dateOfManufacture, imgUrl)
            values("${body.toyName}", ${body.price}, "${body.description}", ${body.categoryId}, ${date || null}, "${body.imgUrl}")`
        let result = await query(str);
        if (result[0].affectedRows == 0)
            return res.status(404).send("אי אפשר להוסיף צעצוע כזה");
        return res.json({
            toyId: result[0].insertId,
            toyName: body.toyName,
            imgUrl: body.imgUrl,
            price: body.price,
            description: body.description,
            dateOfManufacture: body.dateOfManufacture,
            categoryId: body.categoryId
        });
    }
    catch (err) {
        res.status(404).send("תקלה בהתחברות לשרת " + err.message)
    }
}

// removeToy
export async function removeToy(req, res) {
    let { id } = req.params;
    try {
        let str = "delete from toys where toyId = " + id
        let result = await query(str)
        if (result[0].affectedRows == 0)
            return res.status(404).send("אין צעצוע עם קוד כזה")
        res.json("נמחק בהצלחה");
    }
    catch (err) {
        res.status(404).send("תקלה בהתחברות לשרת " + err.message);
    }
}

// ProductDeactivation
export async function ProductDeactivation(req, res) {
    let { id } = req.params;
    try {
        let str = `update toys set active = 0 where toyId = ${id}`
        let result = await query(str)
        if (result[0].affectedRows == 0)
            return res.status(404).send("אי אפשר להשבית את המוצר כעת");
        let result2 = await query(`select  toyId, toyName, price, description, t.categoryId, 
            Date_Format(dateOfManufacture,'%Y-%m-%d') as 'dateOfManufacture', active, imgUrl, c.categoryName 
            from toys as t left join categories as c on t.categoryId = c.categoryId where toyId = ${id}`)
        return res.json(result2[0])
    }
    catch(err) {
        res.status(400).send("תקלה בהתחברות לשרת " + err.message)
    }
}

// updateDetailToy
// toyId, toyName, price, description, categoryId, dateOfManufacture, imgUrl
export async function updateDetailToy(req, res) {
    let { body } = req;
    if (!body.toyName || !body.price || !body.categoryId)
        return res.status(404).send(`השדות "שם המוצר", "מספר קטגוריה" ו"מחיר" הם שדות חובה`)

    try {
        let date = body.dateOfManufacture;
        if (date)
            date = `"${date}"`
        let str = `update toys set toyName="${body.toyName}", price=${body.price}, description="${body.description || ""}", 
            dateOfManufacture=${date || null}, categoryId="${body.categoryId}", imgUrl="${body.imgUrl}"`
        str += " where toyId = " + req.params.id
        let result = await query(str);
        if (result[0].affectedRows == 0)
            return res.status(404).send("אי אפשר לעדכן צעצוע כזה");
        let result2 = await query("select * from toys where toyId = " + req.params.id)
        return res.json(result2[0][0]);
    }
    catch (err) {
        res.status(404).send("תקלה בהתחברות לשרת " + err.message);
    }
}