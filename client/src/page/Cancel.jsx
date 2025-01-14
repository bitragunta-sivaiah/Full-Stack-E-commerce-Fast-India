import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cancel = () => {
  useEffect(() => {
    Swal.fire({
      icon: 'error',
      title: 'Order Canceled',
      text: 'Your order has been canceled. If this was a mistake, please try again.',
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'swal-button'
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-300">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-2xl font-bold text-red-700 mt-4">
          Order Canceled
        </h1>
        <p className="text-gray-600 mt-2">
          We're sorry to see you cancel your order. If you have any questions, feel free to contact us.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-red-600 text-white font-medium rounded-full shadow-md hover:bg-red-700 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
