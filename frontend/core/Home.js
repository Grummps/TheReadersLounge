import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [createMenuOpen, setCreateMenuOpen] = useState(false);

  const toggleCreateMenu = () => {
    setCreateMenuOpen(!createMenuOpen);
  };

  const handleCreateBookClub = () => {

  };

  const handleCreateBookReview = () => {

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-800 to-black text-white">
      {/* Header with Create + Button */}
      <div className="relative p-4 flex justify-end">
        <button
          onClick={toggleCreateMenu}
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Create +
        </button>
        {createMenuOpen && (
          <div className="absolute top-12 right-4 bg-black border border-gray-300 rounded shadow-lg z-10">
            <button
              onClick={handleCreateBookClub}
              className="block w-full px-4 py-2 text-left hover:bg-gray-800"
            >
              Create Book Club
            </button>
            <button
              onClick={handleCreateBookReview}
              className="block w-full px-4 py-2 text-left hover:bg-gray-800"
            >
              Create Book Review
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-4">
        {/* Book Clubs */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Book Clubs</h2>
          <div className="flex space-x-4 overflow-auto">
            {/* Book Club Card */}
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Book Club Title</h3>
              <p className="text-sm mb-2">Description of the book club...</p>
              <Link to="/" className="text-green-500 hover:underline">
                View Book Club
              </Link>
            </div>
          </div>
        </section>

        <hr className="border-gray-600 my-8" />

        {/* Book Reviews */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Book Reviews</h2>
          <div className="flex space-x-4 overflow-auto">
            {/* Book Review Card */}
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Book Title</h3>
              <p className="text-sm mb-2">Review of the book...</p>
              <Link to="/" className="text-green-500 hover:underline">
                View Book Review
              </Link>
            </div>
          </div>
        </section>

        <hr className="border-gray-600 my-8" />

        {/* Your Clubs */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Clubs</h2>
          <div className="flex space-x-4 overflow-auto">
            {/* Your Club Card */}
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Book Club Title</h3>
              <p className="text-sm mb-2">Description of the book club...</p>
              <Link to="/" className="text-green-500 hover:underline">
                View Book Club
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}