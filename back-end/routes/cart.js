import db from "../database.js";
import Router from "express";

const cartRoute = Router();

cartRoute.post("/add", (req, res) => {
  const productId = req.body.productId;
  const userId = req.body.userId;

  db.beginTransaction((err) => {
    if (err) {
      res.status(500).json({ error: "Erreur de transaction" });
      return;
    }

    // Vérifie la disponibilité du produit
    db.query(
      "SELECT inventory FROM Products WHERE id = ? FOR UPDATE",
      [productId],
      (err, result) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: "Erreur de requête" });
          });
        }

        const availableStock = result[0].inventory;
        console.log(availableStock);

        if (availableStock < 1) {
          return db.rollback(() => {
            res.status(400).json({ error: "Produit en rupture de stock" });
          });
        }

        // Ajoute le produit au panier de l'utilisateur
        db.query(
          "INSERT INTO user_cart (user_id, product_id) VALUES (?, ?)",
          [userId, productId],
          (err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: "Erreur d'ajout au panier" });
              });
            }

            // Met à jour le stock disponible
            db.query(
              "UPDATE Products SET inventory = inventory - 1 WHERE id = ?",
              [productId],
              (err) => {
                if (err) {
                  return db.rollback(() => {
                    res
                      .status(500)
                      .json({ error: "Erreur de mise à jour du stock" });
                  });
                }

                // Valide la transaction
                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => {
                      res
                        .status(500)
                        .json({ error: "Erreur de validation de transaction" });
                    });
                  }

                  res
                    .status(200)
                    .json({ message: "Produit ajouté au panier avec succès" });
                });
              }
            );
          }
        );
      }
    );
  });
});

cartRoute.post("/remove", (req, res) => {
  const productId = req.body.productId;
  const userId = req.body.userId;

  db.beginTransaction((err) => {
    if (err) {
      res.status(500).json({ error: "Erreur de transaction" });
      return;
    }

    // Vérifie la disponibilité du produit
    db.query(
      "SELECT inventory FROM Products WHERE id = ? FOR UPDATE",
      [productId],
      (err) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ error: "Erreur de requête" });
          });
        }

        // Récupère la quantité actuelle du produit dans le panier
        db.query(
          "SELECT COUNT(*) as total FROM UserCart WHERE userId = ? AND productId = ?",
          [userId, productId],
          (err, countResult) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: "Erreur de requête" });
              });
            }

            const currentCount = countResult[0].total;

            if (currentCount < 1) {
              return db.rollback(() => {
                res
                  .status(400)
                  .json({ error: "Produit non trouvé dans le panier" });
              });
            }

            // Supprime le produit du panier
            db.query(
              "DELETE FROM UserCart WHERE userId = ? AND productId = ? LIMIT 1",
              [userId, productId],
              (err) => {
                if (err) {
                  return db.rollback(() => {
                    res
                      .status(500)
                      .json({
                        error: "Erreur de suppression du produit du panier",
                      });
                  });
                }

                // Remet à jour le stock disponible
                db.query(
                  "UPDATE Products SET inventory = inventory + 1 WHERE id = ?",
                  [productId],
                  (err) => {
                    if (err) {
                      return db.rollback(() => {
                        res
                          .status(500)
                          .json({ error: "Erreur de mise à jour du stock" });
                      });
                    }

                    // Valide la transaction
                    db.commit((err) => {
                      if (err) {
                        return db.rollback(() => {
                          res
                            .status(500)
                            .json({
                              error: "Erreur de validation de transaction",
                            });
                        });
                      }

                      res
                        .status(200)
                        .json({
                          message: "Produit supprimé du panier avec succès",
                        });
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

export default cartRoute;
