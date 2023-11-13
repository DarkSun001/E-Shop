import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const Product = () => {
  const [products, setProducts] = useState([]);
  const img = {
    1: "src/assets/t-shirt.jpg",
    2: "src/assets/jean.jpg",
    3: "src/assets/sneakers.jpg",
    4: "src/assets/cuire.jpg",
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/product/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.slice(0, 4)))
      .catch((error) => console.error("Erreur", error));
  }, []);

  return (
    <div className="product">
      <h2>News Arrivals </h2>
      <h2>Finds Your happiness with ours new products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div className="article" key={product.id}>
            <img src={img[product.id]} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price:${product.price} </p>
            <button className="btn">
              <NavLink to={`product/${product.id}`}>Add to cart</NavLink>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
