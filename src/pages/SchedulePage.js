import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/event');
        // Assuming the API returns data in the format: { events: [...] }
        const events = response.data.events.map(event => ({
          date: event.date,
          topic: event.title,
          description: event.description,
          email: event.email,
        }));
        setSchedule(events);
      } catch (err) {
        setError('Failed to fetch schedule. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  const handleAddEvent = () => {
    // Navigate to the Add Event page
    navigate('/add-event'); 
  };
  return (
    <div className="bg-blue-600 text-white p-8 text-center font-oswald">
      <div className="bg-gray-100 p-8 md:p-12 rounded-lg shadow-lg max-w-3xl mx-auto my-10 font-oswald">
        <h2 className="text-3xl font-oswald text-center text-blue-800">Event Schedule</h2>
        <button
          onClick={handleAddEvent}
          className="mt-4 mb-6 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 font-oswald text-lg"
        >
          Add Event
        </button>
        <ul className="mt-6 space-y-6">
          {schedule.map((item, index) => (
            <li key={index} className="font-oswald bg-white p-6 rounded-lg shadow border-l-4 border-blue-600">
              <p className="text-xl font-oswald text-gray-800"><strong>Date:</strong> {item.date}</p>
              <p className="text-lg text-gray-700 font-oswald"><strong>Topic:</strong> {item.topic}</p>
              <p className="text-lg text-gray-700 font-oswald"><strong>Description:</strong> {item.description}</p>
              <p className="text-lg text-gray-700 font-oswald"><strong>Email:</strong> {item.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SchedulePage;
