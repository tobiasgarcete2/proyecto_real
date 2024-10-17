// db.js

import  mysql from "mysql2/promise";

export const newConex = async () => {
    try {
        const conex = await mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "jobhunter"
        });
        console.log("Conexión exitosa");
        return conex;
    } catch (error) {
        throw error;
    }
};
