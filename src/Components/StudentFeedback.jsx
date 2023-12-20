import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    'Equipment Name': '',
    'Quantity': '',
    'Reason': '',
    'Link': '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  
    // Check if the form is valid using the latest state
    setIsFormValid(formData['Equipment Name'] && formData['Quantity'] && formData['Reason'].trim() !== '');
  };
  
  

  const handleQuantityChange = (e) => {
    const numericValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setFormData({
      ...formData,
      'Quantity': numericValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      // Make a POST request to the sheet.best API endpoint
      const response = await axios.post(
        'https://sheet.best/api/sheets/f97d2c9a-34ee-4a81-a148-3632569b4da3',
        formData
      );

      // Check the response status
      if (response.status === 200) {
        alert('Form submitted successfully!');
      } else {
        alert('Oops, something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Oops, something went wrong. Please try again.');
    }

    // Reset the form after submission
    setFormData({
      'Equipment Name': '',
      'Quantity': '',
      'Reason': '',
      'Link': '',
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name of Equipment</label>
          <input
            type="text"
            name="Equipment Name"
            value={formData['Equipment Name']}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Quantity</label>
          <input
            type="text"
            name="Quantity"
            value={formData['Quantity']}
            onChange={handleQuantityChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Specify use-case of the Equipment</label>
          <textarea
            name="Reason"
            value={formData['Reason']}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Link to the equipment (optional)</label>
          <input
            type="text"
            name="Link"
            value={formData['Link']}
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