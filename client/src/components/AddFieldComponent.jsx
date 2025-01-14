import React from 'react';
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Field</h2>
          <button 
            onClick={close} 
            className="text-gray-500 hover:text-red-600 focus:outline-none focus:ring focus:ring-red-300 rounded-full p-2 transition-all">
            <IoClose size={24} />
          </button>
        </div>

        {/* Input Field */}
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
        />

        {/* Submit Button */}
        <button
          onClick={submit}
          className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Add Field
        </button>
      </div>
    </section>
  );
};

export default AddFieldComponent;
