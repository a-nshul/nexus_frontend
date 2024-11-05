import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AddEvent() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/api/event/create', {
        title,
        date,
        description,
        email,
      });
      setMessage('Event added successfully!');
      // Reset form fields
      setTitle('');
      setDate('');
      setDescription('');
      setEmail('');

      // Redirect to /schedule page
      navigate('/schedule'); // Redirect to the schedule page
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message || 'Failed to add event. Please try again.'); 
      } else {
        setError('Failed to add event. Please try again.');
      }
    }
  };

  return (
    <div className="bg-blue-600 text-black font-oswald">
      <header className=" text-center font-oswald">
        <h1 className="text-4xl">Event Management</h1>
      </header>
      <div className="bg-gray-100 p-8 md:p-12 rounded-lg shadow-lg max-w-3xl mx-auto my-10 font-oswald">
        <h2 className="text-3xl text-center text-blue-800">Add New Event</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white p-3 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Event
          </button>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
