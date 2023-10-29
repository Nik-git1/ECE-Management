import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    reason: '',
    link: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check if the form is valid
    setIsFormValid(formData.name && formData.quantity && formData.reason);
  };

  const handleQuantityChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setFormData({
      ...formData,
      quantity: numericValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send the data to an API
    // You can access the form data via formData object

    // Reset the form after submission
    setFormData({
      name: '',
      quantity: '',
      reason: '',
      link: '',
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name of Equipment</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleQuantityChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Specify use-case of the Equipment</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Link to the equipment (optional)</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            className={`${
              isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            } px-4 py-2 rounded`}
            disabled={!isFormValid}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
