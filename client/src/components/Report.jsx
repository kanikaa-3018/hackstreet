import React, { useState } from 'react';

const categories = [
  'Technical Issue',
  'Event Feedback',
  'Career Support',
  'Networking Issue',
  'Other',
];

const ReportPage = () => {
  const [complaint, setComplaint] = useState({
    title: '',
    description: '',
    category: 'Other',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaint.title || !complaint.description) {
      setFormError('Please fill out all fields.');
      return;
    }

    setIsSubmitted(true);
    setFormError('');
    // Clear the form after submission
    setComplaint({
      title: '',
      description: '',
      category: 'Other',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full p-6">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
          Report a Complaint
        </h2>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Please submit your complaint or issue, and our team will get back to you promptly.
        </p>

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow-lg mb-6">
            <p className="font-semibold">Your complaint has been successfully submitted!</p>
            <p>We will get back to you shortly.</p>
          </div>
        )}

        {/* Error Message */}
        {formError && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-lg mb-6">
            <p className="font-semibold">{formError}</p>
          </div>
        )}

        {/* Complaint Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-lg p-8 space-y-6"
        >
          {/* Title Input */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Complaint Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={complaint.title}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={complaint.category}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description Textarea */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Complaint Description
            </label>
            <textarea
              id="description"
              name="description"
              value={complaint.description}
              onChange={handleChange}
              required
              rows="4"
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#00016a] text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out"
          >
            Submit Complaint
          </button>
        </form>

        <footer className="mt-8 text-center text-sm text-gray-600">
          <p>
            By submitting this form, you agree to our{' '}
            <a href="/terms" className="text-indigo-600">
              Terms of Service
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ReportPage;
