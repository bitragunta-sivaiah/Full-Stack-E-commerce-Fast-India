import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../utils/Axios";
// import Api from "../common/api";
import toast from "react-hot-toast";
import { setOrder } from "../store/orderSlice";
import Api from "../Api/Api";

const OnlinePaymentPage = () => {
  const { cart, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user || !cart || cart.items.length === 0) {
      toast.error("Please add items to the cart and ensure you're logged in.");
      return;
    }

    setLoading(true);

    try {
      const orderItems = cart.items.map((item) => ({
        _id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      }));

      const totalPrice = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const deliveryAddress = user.selectedAddress;

      if (!deliveryAddress) {
        toast.error("Please select a delivery address.");
        setLoading(false);
        return;
      }

      const response = await Axios({
         ...Api.payment_url,
        data: {
          orderItems,
          totalPrice,
          delivery_address: deliveryAddress,
          email: user.email,
        },
      });

      const { session_url } = response.data.data;

      // Update order state
      dispatch(setOrder(response.data.data));

      // Redirect to Stripe Checkout
      window.location.href = session_url;
    } catch (error) {
      toast.error("Payment initiation failed. Please try again.");
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Complete Your Payment</h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        {cart.items.length > 0 ? (
          <>
            <ul>
              {cart.items.map((item) => (
                <li key={item.id} className="mb-2 flex justify-between">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between">
              <strong>Total</strong>
              <strong>₹{cart.total}</strong>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <div className="mt-6">
        <button
          className={`w-full p-3 text-white rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default OnlinePaymentPage;
