import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysqlPassword29!",
  database: "app_payment",
});

db.connect((err) => {
  if (err) {
    console.log("Erreur lors de la connexion à la base de données", err);
    return;
  } else {
    console.log("Connexion réussie");
  }
});

export default db;
