import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../utils/Axios";
import Api from "../Api/Api";
import NoData from "../components/NoData";
import OrderCard from "../components/OrderCard";
import AxiosToastError from "../utils/AxiosToastError";

const UserStatusPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const orders = useSelector((state) => state?.orders?.order);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await Axios({ ...Api.getOrderItems });
      if (response.data.success) {
        dispatch({ type: "orders/setOrder", payload: response.data.data });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md p-4 rounded-md mb-6">
        <h1 className="text-lg font-semibold text-gray-700">User Status</h1>
        <div className="mt-4">
          <p className="text-gray-700"><span className="font-medium">Name:</span> {user?.name || "N/A"}</p>
          <p className="text-gray-700"><span className="font-medium">Email:</span> {user?.email || "N/A"}</p>
          <p className="text-gray-700"><span className="font-medium">Account Status:</span> {user?.isActive ? "Active" : "Inactive"}</p>
        </div>
      </div>
      <div className="bg-white shadow-md p-4 rounded-md">
        <h2 className="text-lg font-semibold text-gray-700">Order History</h2>
        {loading ? (
          <p className="text-center mt-4 text-gray-500">Loading orders...</p>
        ) : !orders?.length ? (
          <NoData />
        ) : (
          orders.map((order) => <OrderCard key={order._id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default UserStatusPage;
