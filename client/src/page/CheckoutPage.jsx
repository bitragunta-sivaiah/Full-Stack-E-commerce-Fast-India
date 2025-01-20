import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Api from "../Api/Api";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext();
  const deliveryCharge = totalPrice >= 399 ? 0 : 50;
  const grandTotal = totalPrice + deliveryCharge;

  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectAddress, setSelectAddress] = useState(0);
  const [openAddress, setOpenAddress] = useState(false);
  const navigate = useNavigate();
  const cartItemsList = useSelector((state) => state.cartItem.cart);

  

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...Api.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: grandTotal,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem?.();
        fetchOrder?.();
        navigate("/success", { state: { text: "Order" } });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-slate-100 min-h-screen">
      <div className="container mx-auto p-4 flex gap-5 justify-center items-center md:justify-between flex-col md:flex-row">
        <div className="w-full max-w-sm my-4">
          <h3 className="text-lg font-semibold font-poppins bg-white mb-2 w-full h-fit p-2 py-3 rounded-lg">Choose your Address</h3>
          <div className="bg-white w-full max-w-sm rounded-lg px-2 md:px-4 py-4 flex flex-col gap-4">
            {addressList.map((address, index) => (
              <label htmlFor={`address${index}`} className={!address.status && "hidden"} key={index}>
                <div
                  className={`border-2 rounded-xl p-3 flex gap-3 hover:bg-blue-50 ${
                    selectAddress == index ? "border-green-500" : "border-gray-200"
                  }`}
                >
                  <div>
                    <input
                      id={`address${index}`}
                      type="radio"
                      value={index}
                      onChange={(e) => setSelectAddress(e.target.value)}
                      name="address"
                    />
                  </div>
                  <div>
                    <p>{address.address_line}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>
                      {address.country} - {address.pincode}
                    </p>
                    <p>{address.mobile}</p>
                  </div>
                </div>
              </label>
            ))}
            <div onClick={() => setOpenAddress(true)} className="cursor-pointer h-16 rounded-lg bg-blue-50 border-2 flex items-center justify-center border-dashed">
              <p className="text-blue-500">Add Address</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm lg:flex-1 px-2 py-4">
          <h3 className="text-lg font-semibold font-poppins bg-white mb-2 w-full h-fit p-2 py-3 rounded-lg">Order Summary </h3>
          <div className="bg-white p-4 flex flex-col gap-3 rounded-lg ">
            <h3 className="font-semibold">Bill details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Items total</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Quantity total</p>
              <p className="flex items-center gap-2">{totalQty} item</p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Delivery Charge</p>
              <p className={`flex items-center gap-2 ${deliveryCharge === 0 ? "text-green-500" : "text-red-500"}`}>
                {deliveryCharge === 0 ? "Free" : DisplayPriceInRupees(deliveryCharge)}
              </p>
            </div>
            <div className="font-semibold flex items-center justify-between gap-4">
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(grandTotal)}</p>
            </div>
          </div>
          <div className="w-full max-w-sm flex flex-col gap-4 mt-5 ">
            <button onClick={handleCashOnDelivery} className="p-3 bg-green-700 rounded-lg text-white font-semibold">
              Cash On Delivery
            </button>
          </div>
        </div>
      </div>
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;
