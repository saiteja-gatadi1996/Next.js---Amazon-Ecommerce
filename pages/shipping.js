import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";

const ShippingScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart; // I want to fill the page with the shippingAddress
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    const payloadData = { fullName, address, city, postalCode, country };
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: payloadData,
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: payloadData,
      })
    );
    router.push("/payment");
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        {/* fullName */}
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register("fullName", {
              required: "Please enter full name",
            })}
          />
          {/* errors are outside the input */}
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register("address", {
              required: "Please enter address",
              minLength: {
                value: 3,
                message: "Address should be more than 2 characters",
              },
            })}
          />
          {/* errors are outside the input */}
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register("city", {
              required: "Please enter city",
            })}
          />
          {/* errors are outside the input */}
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>

        {/* postalCode */}
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="w-full"
            id="postalCode"
            autoFocus
            {...register("postalCode", {
              required: "Please enter postal code",
            })}
          />
          {/* errors are outside the input */}
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>

        {/* country */}
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            className="w-full"
            id="country"
            autoFocus
            {...register("country", {
              required: "Please enter country",
            })}
          />
          {/* errors are outside the input */}
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>

        {/* Next button */}
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

export default ShippingScreen;

ShippingScreen.auth = true; //only loggedIn user can access this page
