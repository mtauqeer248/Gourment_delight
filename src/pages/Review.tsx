import { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs } from "../lib/firebase"; // Import from firebase.ts

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsRef = collection(db, "reviews"); 
      const snapshot = await getDocs(reviewsRef);
      const reviewsData = snapshot.docs.map((doc) => doc.data());
      setReviews(reviewsData);
    };

    fetchReviews();
  }, []);

  const handleReviewSubmit = async () => {
    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const reviewsRef = collection(db, "reviews"); // Reference to "reviews" collection
    await addDoc(reviewsRef, {
      rating,
      comment,
      date: new Date(),
    });

    setComment("");
    setRating(5);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Leave a Review
      </h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200 resize-none"
         
        />
        <button
          onClick={handleReviewSubmit}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Submit Review
        </button>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mt-6">Recent Reviews</h2>
      <div className="mt-4 space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
        ) : (
          reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500"
            >
              <p className="text-gray-800 font-medium">⭐ {review.rating}/5</p>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
