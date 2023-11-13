import db from "../database.js";
import Router from "express";

const productRoute = Router();

productRoute.get("/products", (req, res) => {
  db.query("SELECT * FROM products ", (error, results) => {
    if (error) {
      res.status(500).json({ error: "Erreur de recupération de produits" });
    } else {
      res.status(200).json(results);
    }
  });
});

productRoute.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  db.query(
    "SELECT * FROM products WHERE id = ?",
    productId,
    (error, results) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Erreur provenant de la base de données" });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: "Produits non trouvé." });
        } else {
          res.status(200).json(results[0]);
        }
      }
    }
  );
});

export default productRoute;
