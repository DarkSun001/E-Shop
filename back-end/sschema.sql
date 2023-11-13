-- Creating the Products table
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    inventory INT NOT NULL
);

-- Inserting 20 sample fashion product entries
INSERT INTO Products (name, price, inventory) VALUES 
    ('T-shirt Blanc', 19.99, 100),
    ('Jean Slim Noir', 49.99, 75),
    ('Chaussures de Sport', 89.99, 50),
    ('Veste en Cuir', 199.99, 25),
    ("Robe d'Été", 29.99, 60),
    ('Cravate en Soie', 24.99, 40),
    ('Sac à Main', 59.99, 30),
    ('Chapeau Panama', 34.99, 20),
    ('Écharpe en Laine', 29.99, 45),
    ('Ceinture en Cuir', 39.99, 70),
    ('Montre Classique', 149.99, 15),
    ('Bottes en Cuir', 99.99, 40),
    ('Lunettes de Soleil', 79.99, 50),
    ('Chemise à Carreaux', 44.99, 55),
    ('Pull-over Gris', 64.99, 35),
    ('Short en Jean', 39.99, 60),
    ("Sandales d'Été", 49.99, 40),
    ('Bijoux Fantaisie', 14.99, 85),
    ('Pantalon Chino', 54.99, 50),
    ('Blouse Florale', 39.99, 40);

--Creating Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
);

--Creating commands Table
CREATE TABLE commands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE user_cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL, 
  product_id INT NOT NULL, 
  quantity INT NOT NULL DEFAULT 1, 
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
