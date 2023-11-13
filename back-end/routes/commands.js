import db from "../database.js";
import Router from "express";
const commandRouter = Router();

commandRouter.post("/checkout", (req, res) => {
  const userId = req.body.userId;

  // Récupère les produits du panier de l'utilisateur
  db.query(
    "SELECT product_id FROM user_cart WHERE user_id = ?",
    [userId],
    (err, cartItems) => {
      if (err) {
        res.status(500).json({ error: "Erreur de récupération du panier" });
        return;
      }

      // Démarre une transaction
      db.beginTransaction((err) => {
        if (err) {
          res.status(500).json({ error: "Erreur de transaction" });
          return;
        }

        // Calcul du montant total
        let totalAmount = 0;

        // Utilisation d'une boucle pour itérer sur chaque article du panier
        cartItems.forEach((item) => {
          totalAmount += item.price; // Ajoute le prix de chaque produit au montant total
          console.log(item.price);
        });
        console.log(totalAmount);
        // Crée une nouvelle entrée de commande
        db.query(
          "INSERT INTO commands (user_id, total_amount, status) VALUES (?, ?, 'pending')",
          [userId, totalAmount],
          (err, result) => {
            if (err) {
              return db.rollback(() => {
                res
                  .status(500)
                  .json({ error: "Erreur de création de la commande" });
              });
            }

            const commandId = result.insertId;
            console.log(commandId);

            // Itère à nouveau sur chaque article du panier pour créer les détails de la commande
            cartItems.forEach((item) => {
              db.query(
                "INSERT INTO CommandDetails (command_id, product_id) VALUES (?, ?)",
                [commandId, item.productId],
                (err) => {
                  if (err) {
                    return db.rollback(() => {
                      res.status(500).json({
                        error: "Erreur de création des détails de la commande",
                      });
                    });
                  }
                }
              );
            });

            // Supprime les produits du panier de l'utilisateur
            db.query(
              "DELETE FROM UserCart WHERE userId = ?",
              [userId],
              (err) => {
                if (err) {
                  return db.rollback(() => {
                    res.status(500).json({
                      error: "Erreur de suppression des produits du panier",
                    });
                  });
                }

                // Valide la transaction
                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => {
                      res.status(500).json({
                        error: "Erreur de validation de la transaction",
                      });
                    });
                  }

                  res
                    .status(200)
                    .json({ message: "Commande effectuée avec succès" });
                });
              }
            );
          }
        );
      });
    }
  );
});

export default commandRouter;
