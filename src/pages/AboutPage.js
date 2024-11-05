import React from 'react';

function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 text-white text-center font-oswald">
    <div className="bg-gray-100 p-8 md:p-12 rounded-lg shadow-lg max-w-2xl mx-auto my-10 font-oswald">
      <h2 className="font-oswald text-3xl font-semibold text-center text-blue-800">About the Event</h2>
      <p className="mt-6 text-lg text-center text-gray-700 font-oswald">
        GWECCC 2025 is focused on the theme of Water, Energy, and Climate Security & Sustainability. 
        Join us to explore cutting-edge insights, technologies, and discussions with experts in these fields.
      </p>
    </div>
    </div>
  );
}

export default AboutPage;
