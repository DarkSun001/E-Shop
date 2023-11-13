import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "./redux/action/store";
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const img = {
    1: "/src/assets/t-shirt.jpg",
    2: "/src/assets/jean.jpg",
    3: "/src/assets/sneakers.jpg",
    4: "/src/assets/cuire.jpg",
  };

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/product/product/${id}`
      );
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div>
          <h1>Loading...</h1>
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    if (!product) {
      return <h1>No object</h1>;
    }
    return (
      <div className="show-prod">
        <NavBar />
        <img
          src={img[product.id]}
          alt={product.name}
          height="400px"
          width="400px"
        />
        <div className>{product.name}</div>
        <div className="price">Price : ${product.price}</div>
        <p>{product.inventory} availables right now!</p>
        <p>Do you want it ? Then buy it</p>
        <button className="btn">Add to cart</button>
        <NavLink to="/cart" oncClick={() => addProduct(product)}>
          <button className="btn-cart">Go to cart</button>
        </NavLink>
      </div>
    );
  };
  return (
    <div className="product-details">
      <div>{loading ? <Loading /> : <ShowProduct />}</div>
    </div>
  );
};

export default ProductDetails;
