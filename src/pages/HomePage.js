import React from 'react';

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 text-white p-8 text-center font-oswald">
      <div className="flex flex-col md:flex-row items-center max-w-5xl">
        <img src="/GWECCC Logo.jpeg" alt="Event" className="w-full md:w-1/2 rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6" />
        <div className="md:w-1/2">
          <h1 className="text-5xl font-oswald">Welcome to GWECCC 2025</h1>
          <p className="mt-4 text-xl font-oswald">Join us for an insightful event on Water, Energy, and Climate Security & Sustainability.</p>
          <p className="mt-2 text-lg font-oswald">Date: March 15-17, 2025</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
