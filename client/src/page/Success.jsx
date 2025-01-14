import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Success = () => {
  const location = useLocation();

  useEffect(() => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: `${Boolean(location?.state?.text) ? location?.state?.text : 'Payment'} completed successfully!`,
      confirmButtonText: 'OK',
      customClass: {
        confirmButton: 'swal-button'
      }
    });
  }, [location]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 text-center transform transition duration-300 hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9l3 3-3 3m0-6l-3 3 3 3"
          />
        </svg>
        <h1 className="text-2xl font-bold text-green-700 mt-4">
          {Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your Order has been successfully completed.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-green-600 text-white font-medium rounded-full shadow-md hover:bg-green-700 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Success;
