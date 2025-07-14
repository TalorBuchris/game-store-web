import DataBase from "mysql2"

const config = {
    connectionLimit: 50,
    host: "127.0.0.1",
    user: "root",
    database: "hadasim_project",
    password: "aA1795aA!"
}


const pool = DataBase.createPool(config).promise();

const query = async function(sql) {
    const conn = await pool.getConnection();
    const result = await conn.query(sql);
    conn.release();
    return result;
};

export default query;