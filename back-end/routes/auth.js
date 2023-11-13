import db from "../database.js";
import Router from "express";
import jwt from "jsonwebtoken";

const authRoute = Router();

authRoute.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  const user = { username, password_hash: password, email };

  db.query("INSERT INTO users SET ?", user, (error) => {
    if (error) {
      res.status(500).json({ error: "Erreur lors de l'inscription" });
    } else {
      res.status(201).json({ message: "Utilisateur inscrit avec succès" });
    }
  });
});

// Login route*

authRoute.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, dbRows) => {
      if (error) {
        console.error("Erreur de connexion : ", error);
        res.status(500).json({ error: "Erreur de connexion" });
        return;
      }

      if (dbRows.length === 0) {
        res.status(401).json({ error: "Utilisateur non trouvé" });
        return;
      }

      const user = dbRows[0];

      if (user.password_hash !== password) {
        res.status(401).json({ error: "Mot de passe incorrect" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, "123456789", {
        expiresIn: "2h",
      });

      res.status(200).json({ token });
    }
  );
});

export default authRoute;
