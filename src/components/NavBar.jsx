import { ShoppingBagOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const NavBar = () => {
  const state = useSelector((state) => state.handleCart);
  return (
    <div className="container">
      <div>New arrivals</div>
      <div>Products</div>
      <div className="logo">E-Shop</div>
      <div>Register</div>
      <Badge badgeContent={state.length} color="primary">
        <ShoppingBagOutlined />
      </Badge>
    </div>
  );
};

export default NavBar;
