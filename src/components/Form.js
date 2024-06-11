"use client"
import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Form = ({ onClick, addReview }) => {
    const [safetyRating, setSafetyRating] = useState(null);
    const [safetyHover, setSafetyHover] = useState(null);
    const [communicationRating, setCommunicationRating] = useState(null);
    const [communicationHover, setCommunicationHover] = useState(null);
    const [wyro, setWyro] = useState("");
    const [reviewValue, setReviewValue] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {};
        if (!safetyRating) newErrors.safety = "Safety rating is required";
        if (!communicationRating) newErrors.communication = "Communication rating is required";
        if (!wyro) newErrors.wyro = "Recommendation is required";
        if (!reviewValue) newErrors.review = "Review text is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newReview = {
            safety: safetyRating,
            communication: communicationRating,
            recommended: wyro,
            review: reviewValue
        };
        addReview(newReview);

        // Clear form after submission
        setSafetyRating(null);
        setSafetyHover(null);
        setCommunicationRating(null);
        setCommunicationHover(null);
        setWyro("");
        setReviewValue("");
        setErrors({});

        // Hide the form after submission
        onClick();
    };

    return (
        <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 absolute scroll-auto z-50'>
            <form className='card-body' onSubmit={handleSubmit}>
                <IoMdClose
                    size={25}
                    className='text-gray-700 cursor-pointer'
                    onClick={onClick}
                />
                <h1 className='text-lg font-bold text-center pb-4'>Leave a review</h1>
                <div>
                    <h2 className='text-xl font-semibold py-1'>Safety</h2>
                    <p className='text-sm'>Your Rating: {safetyRating}/5</p>
                    <div className='flex py-3'>
                        {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index} className='flex'>
                                    <input
                                        className="hidden"
                                        type="radio"
                                        name="safety"
                                        value={currentRating}
                                        onClick={() => setSafetyRating(currentRating)}
                                    />
                                    <FaStar
                                        className="cursor-pointer ml-1"
                                        color={currentRating <= (safetyHover || safetyRating) ? "#FFE30B" : '#e4e5e9'}
                                        onMouseEnter={() => setSafetyHover(currentRating)}
                                        onMouseLeave={() => setSafetyHover(null)}
                                        size={25}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    {errors.safety && <p className="text-red-500">{errors.safety}</p>}
                </div>
                <div>
                    <h2 className='text-xl font-semibold py-1'>Communication</h2>
                    <p className='text-sm'>Your Rating: {communicationRating}/5</p>
                    <div className='flex py-3'>
                        {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index} className='flex'>
                                    <input
                                        className="hidden"
                                        type="radio"
                                        name="communication"
                                        value={currentRating}
                                        onClick={() => setCommunicationRating(currentRating)}
                                    />
                                    <FaStar
                                        className="cursor-pointer ml-1"
                                        color={currentRating <= (communicationHover || communicationRating) ? "#FFE30B" : '#e4e5e9'}
                                        onMouseEnter={() => setCommunicationHover(currentRating)}
                                        onMouseLeave={() => setCommunicationHover(null)}
                                        size={25}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    {errors.communication && <p className="text-red-500">{errors.communication}</p>}
                </div>
                <div>
                    <h2 className='text-xl font-semibold py-1'>Would you recommend Others?</h2>
                    <p className='text-sm'>Your Answer: {wyro}</p>
                    <div className='flex'>
                        <h1 className='flex items-center'>
                            <AiOutlineDislike
                                className='cursor-pointer my-3 mr-1'
                                color={wyro === "No" ? "green" : "grey"}
                                onClick={() => setWyro("No")}
                                size={30}
                            /> No
                        </h1>
                        <h1 className='flex items-center'>
                            <AiOutlineLike
                                className='cursor-pointer ml-8 my-3 mr-1'
                                size={30}
                                color={wyro === "Yes" ? "green" : "grey"}
                                onClick={() => setWyro("Yes")}
                            /> Yes
                        </h1>
                    </div>
                    {errors.wyro && <p className="text-red-500">{errors.wyro}</p>}
                </div>
                <div>
                    <h2 className='text-xl font-semibold py-1'>Write your review</h2>
                    <textarea
                        className='bg-transparent w-full border rounded-lg outline-gray-600 text-lg resize-none'
                        type='text'
                        name='reviewValue'
                        value={reviewValue}
                        onChange={(e) => setReviewValue(e.target.value)}
                        cols={30}
                        rows={4}
                    />
                    {errors.review && <p className="text-red-500">{errors.review}</p>}
                </div>
                <button
                    className="btn btn-block bg-green-600 hover:bg-green-700 text-white"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;
