import React from "react";

const OrderCard = ({ order }) => {
  const address = order.delivery_address || {};

  return (
    <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
      <p className="font-medium text-gray-800">Order No: {order?.orderId}</p>
      <div className="flex gap-4 items-center mt-2">
        <img
          src={order?.product_details?.image?.[0] || ""}
          alt="Product"
          className="w-16 h-16 rounded border"
        />
        <div>
          <p className="font-medium text-gray-800">{order?.product_details?.name}</p>
          <p className="text-sm text-gray-600">
            Quantity: {order?.product_details?.quantity || 1}
          </p>
          <p className="text-sm text-gray-600">
            Subtotal Price: ₹{(order?.subTotalAmt || 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-gray-800">Delivery Address</h3>
        <p className="text-sm text-gray-600">Address Line: {address.address_line || "N/A"}</p>
        <p className="text-sm text-gray-600">City: {address.city || "N/A"}</p>
        <p className="text-sm text-gray-600">State: {address.state || "N/A"}</p>
        <p className="text-sm text-gray-600">Pincode: {address.pincode || "N/A"}</p>
        <p className="text-sm text-gray-600">Country: {address.country || "N/A"}</p>
        <p className="text-sm text-gray-600">Mobile: {address.mobile || "N/A"}</p>
      </div>
    </div>
  );
};

export default OrderCard;
