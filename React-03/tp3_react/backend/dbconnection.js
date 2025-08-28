// backend/dbconnection.js
import mysql2 from 'mysql2/promise';

export async function conectarBD() {
    try {
        const conexion = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'tp3_react'
        });
        console.log("Base de datos conectada");
        return conexion;

    } catch (err) {
        console.log("Error en la conexión:", err);
        return null;
    }
}