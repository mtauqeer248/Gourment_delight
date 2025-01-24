import React from 'react';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=2000')`,
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Our Restaurant</h1>
          <p className="text-lg sm:text-xl text-gray-300">
            At our restaurant, we believe in creating memorable dining experiences with delicious food, a welcoming atmosphere, and exceptional service.
          </p>
        </div>

        {/* Owner Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Owner Image */}
          <div className="w-full md:w-1/3">
            <img
              src=" https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Restaurant Owner"
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* Owner Info */}
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-semibold mb-4">Meet Our Founder</h2>
            <p className="text-gray-300 text-lg">
              Our restaurant was founded by <strong>Chef Alex Morgan</strong>, whose passion for culinary excellence and love for bringing people together over a meal inspired this journey. 
              With years of experience in the culinary world, Alex ensures every dish is crafted with care, creativity, and the freshest ingredients.
            </p>
            <p className="text-gray-300 mt-4">
              When you dine with us, you’re not just enjoying food—you’re becoming part of a story built on passion, dedication, and a deep connection to the art of cooking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
