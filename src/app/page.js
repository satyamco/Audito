"use client"
import React, { useState } from 'react';
import Form from "@/components/Form";
import { FaStar } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleClick = () => {
    setShowForm(!showForm);
  };

  const addReview = (review) => {
    setReviews([...reviews, review]);
  };

  const deleteReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const calculateAverageRating = (safety, communication) => {
    return (safety + communication) / 2;
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <button
          className="btn my-5 mx-auto bg-gray-300"
          onClick={handleClick}
        >
          Leave a Review
        </button>
        {showForm && (
          <Form
            onClick={handleClick}
            addReview={addReview}
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {reviews.map((review, index) => {
          const averageRating = calculateAverageRating(review.safety, review.communication);
          return (
            <div key={index} className="card w-full shadow-lg p-4 relative">
              <IoMdTrash
                className="absolute top-2 right-2 text-red-500 cursor-pointer"
                size={25}
                onClick={() => deleteReview(index)}
              />
              <h2 className="text-xl font-bold">Review {index + 1}</h2>
              <div className="flex items-center">
                <strong>Average Rating: </strong>
                {[...Array(5)].map((_, starIndex) => (
                  <FaStar
                    key={starIndex}
                    color={starIndex < Math.round(averageRating) ? "#FFE30B" : "#e4e5e9"}
                    size={20}
                    className="ml-1"
                  />
                ))}
              </div>
              <p><strong>Safety Rating:</strong> {review.safety}/5</p>
              <p><strong>Communication Rating:</strong> {review.communication}/5</p>
              <p><strong>Recommended:</strong> {review.recommended}</p>
              <p><strong>Review:</strong> {review.review}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
