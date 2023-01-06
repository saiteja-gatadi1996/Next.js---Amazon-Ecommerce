import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from "../utils/Store";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((item) => item.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry, Product is Out of Stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success("Product added to the cart");
  };

  return (
    <>
      <Layout title="Home Page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItem
              key={product.slug}
              product={product}
              addToCartHandler={addToCartHandler}
            ></ProductItem>
          ))}
        </div>
      </Layout>
    </>
  );
}

// Loading products from mongoDb
// This function runs before rendering the component and provides data to the component
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean(); //to just get the product info instead of getting metadata

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
