import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import "../../public/css/ProductCard.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { useState } from 'react';


const style = {
  position: "absolute",
  top: "7%",
  left: "7%",
  transform: 'translate("-50%", "-50%")',
  width: "85%",
  height: "85%",
  borderRadius: "10px",
  backgroundColor: "white",
  border: " 2px solid #c288ff",
  boxShadow:
    "0px 11px 15px -7px rgb(255 255 255 / 20%), 0px 24px 38px 3px rgb(255 255 255 / 14%), 0px 9px 46px 8px rgb(255 255 255 / 12%)",
  padding: "32px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  overflow:"auto",
};

const ProductCard =  ({product}) => {
  const [mainImage, setMainImage] = useState(product.image[0]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };
  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: "wrap",
          aligncontent: "center",
          justifycontent: "center",
          alignitems: "center",
        }}
        className="product_card_img cursor-pointer relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
      >
        <Button sx={{ height: "100%" }} onClick={handleOpen}>
          <img
            className="object-contain w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
            src={product.image[0]}
            alt="product image"
          />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
      <div 
      className="modal-modal-title0">
        <img 
        src={mainImage} alt="Main Product" className="Img_Modal main-image" />
      
        <div className="side-images">
        {product.image.map((oneimage, index) => (
            <img
            style={{
              cursor: "pointer",
              marginBottom:" 10px",
          }}
              key={index}
              src={oneimage}
              alt={`product image ${index + 1}`}
              onClick={() => setMainImage(oneimage)}
              className="thumbnail"
          />))}
        </div>
      </div>
            
            <div className="modaltext">
            <Typography id="modal-modal-description1" sx={{ mt: 10}}>
              {product.name}
            </Typography>
            <Typography id="modal-modal-description2" sx={{ mt: 2 }}>
              ${product.price}
            </Typography>
            <Typography id="modal-modal-description3" sx={{ mt: 2 }}>
              <button
                className="flex items-center justify-center rounded-lg bg-purple-600 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={22} className="mr-2" />
                Add to cart
              </button>
              </Typography>
              </div>
            <div className="discription-modal">
              <div className="dis1">
                <h1>Description</h1>
                <p><pre>{product.description}</pre></p>
              </div>
              <div className="dis2">
             <h1>Color</h1>
              <p>{product.color}</p>
              </div>
              <div className="dis3">
             <h1>Details</h1>
              <p><pre>{product.details}</pre></p>
              </div>
              <div className="dis4">
             <h1>Gender</h1>
              <p>{product.gender}</p>
              </div>
              </div>
          </Box>
        </Modal>
      </div>

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight text-white">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-purple-400">
              ${product.price}
            </span>
          </p>
        </div>
        <button
          className="flex items-center justify-center rounded-lg bg-purple-600 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={22} className="mr-2" />
          Add to cart
        </button>
      
      </div>
    </div>
  );
};
export default ProductCard;
