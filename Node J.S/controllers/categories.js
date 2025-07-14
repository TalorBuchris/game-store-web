import query from "../db/db.js"

export async function getAllCategories(req, res) {
    let result = await query("select * from categories");
    res.json(result[0]);
}