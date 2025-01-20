// pages/OrderHistory.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Axios from '../utils/Axios';
import Api from '../Api/Api';
import NoData from '../components/NoData';
import toast from 'react-hot-toast';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.order);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await Axios({ ...Api.getOrderItems });
      if (response.data.success) dispatch(setOrder(response.data.data));
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const response = await Axios({
        ...Api.updateOrderStatus,
        data: { orderId, status },
      });
      if (response.data.success) {
        toast.success('Order status updated');
        fetchOrders();
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await Axios({
        ...Api.deleteOrder,
        url: Api.deleteOrder.url.replace(':orderId', orderId),
      });
      if (response.data.success) {
        toast.success('Order deleted');
        fetchOrders();
      }
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  useEffect(() => fetchOrders(), []);

  return (
    <div className="container mx-auto p-6">
      {loading ? (
        <p className="text-center mt-4 text-gray-500">Loading orders...</p>
      ) : !orders.length ? (
        <NoData />
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <div className="flex justify-between items-center">
              <p>Order No: {order.orderId}</p>
              <div className="flex items-center space-x-2">
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                  className="border rounded-md p-2 bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
