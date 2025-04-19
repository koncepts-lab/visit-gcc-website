"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import style from './style.module.css';
import dynamic from 'next/dynamic';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const SlickCarousel = dynamic(() => import('react-slick'), {
    ssr: false,
});

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RatingCarousel({ packageId }) {
    const maxRating = 5;
    const [rating, setRating] = useState(0);
    const [ratingText, setRatingText] = useState('');
    const [showRatingInput, setShowRatingInput] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [userRatings, setUserRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [overallRating, setOverallRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const { enqueueSnackbar } = useSnackbar(); 

    useEffect(() => {
        if (packageId) {
            fetchRatings();
        }
    }, [packageId]);

    const fetchRatings = async () => {
            const registerToken = localStorage.getItem("auth_token_register");
          const loginToken = localStorage.getItem("auth_token_login");
          let authToken = null;
    
         if (loginToken) {
            authToken = loginToken;
            console.log("Using login token for fetching packages.");
          }
          else if (registerToken) {
            authToken = registerToken;
            console.log("Using register token for fetching packages.");
          } 
    
          if (!authToken) {
            setError("Authentication token not found");
            setIsLoading(false);
            return;
          }
    
        try {
            setIsLoading(true);
            setError('');
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}package-review/${packageId}/ratings`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            console.log("Ratings data:", response.data);

            if (response.data.success) {
                const apiData = response.data.data;
                setOverallRating(parseFloat(apiData.average_rating) || 0);
                setTotalReviews(apiData.total_ratings || 0);

                // Transform the API data to match our component's format
                const formattedRatings = apiData.ratings.map(item => ({
                    id: item.id,
                    headingIcon: item.user?.first_name?.charAt(0) || 'U',
                    date: new Date(item.created_at).toLocaleDateString(),
                    heading: item.user?.first_name || 'User',
                    description: item.review,
                    rating: item.rating,
                }));

                setUserRatings(formattedRatings);
            }
        } catch (err) {
            console.error("Error fetching ratings:", err);
            setError("Failed to fetch ratings.");
        } finally {
            setIsLoading(false);
        }
    };

    const ratingLabels = { 1: 'Poor', 2: 'Fair', 3: 'Average', 4: 'Good', 5: 'Excellent' };

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        setRatingText(ratingLabels[selectedRating] || '');
    };

    const handleAddReviewClick = () => {
        setShowRatingInput(true);
    };

    const handleSendReview = async () => {
        if (rating > 0 && reviewText) {
                const registerToken = localStorage.getItem("auth_token_register");
              const loginToken = localStorage.getItem("auth_token_login");
              let authToken = null;
        
             if (loginToken) {
                authToken = loginToken;
                console.log("Using login token for fetching packages.");
              }
              else if (registerToken) {
                authToken = registerToken;
                console.log("Using register token for fetching packages.");
              } 
        
              if (!authToken) {
                setError("Authentication token not found");
                setIsLoading(false);
                return;
              }
          
            try {
                setIsLoading(true);
                setError('');
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}package-review/${packageId}/rate`,
                    {
                        rating: rating,
                        review: reviewText
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                console.log("Review submitted:", response.data);

                if (response.data.success) {
                    enqueueSnackbar('Thank you for your review!', { variant: 'success' }); // Show success snackbar
                    fetchRatings(); // Refresh ratings
                    setRating(0);
                    setRatingText('');
                    setReviewText('');
                    setShowRatingInput(false);
                } else {
                    enqueueSnackbar('Failed to submit review.', { variant: 'error' }); // Show error snackbar
                }
            } catch (err) {
                console.error("Error submitting review:", err);
                enqueueSnackbar('Failed to submit review.', { variant: 'error' }); // Show error snackbar
                setError("Failed to submit review.");
            } finally {
                setIsLoading(false);
            }
        } else {
            enqueueSnackbar('Please select a rating and enter your review.', { variant: 'warning' }); // Show warning snackbar
        }
    };

    // Get rating text based on overall rating
    const getRatingText = (rating) => {
        if (rating >= 4.5) return "Excellent";
        if (rating >= 3.5) return "Very good";
        if (rating >= 2.5) return "Average";
        if (rating >= 1.5) return "Fair";
        return "Poor";
    };

    const filledWidth = (overallRating / maxRating) * 100;

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    onClick={() => handleStarClick(i)}
                    style={{ cursor: 'pointer' }}
                >
                    {i <= rating ? (
                        <IoIosStar size={35} style={{ color: 'yellow' }} />
                    ) : (
                        <IoIosStarOutline size={35} />
                    )}
                </span>
            );
        }
        return stars;
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (isLoading && !showRatingInput) {
        return <div className="text-center">Loading ratings...</div>;
    }

    return (
        <>
            <div className='row pt-5'>
                <div className='col-md-12 '>
                    <h4>User ratings</h4>
                    <div className='d-flex justify-content-between'>
                        <p className='mb-0'>
                            <IoIosStar color="#FDCC0D" /> {overallRating.toFixed(1)}. {getRatingText(overallRating)} ({totalReviews} reviews)
                        </p>
                        <button className={`${style["tabButton"]}`} onClick={handleAddReviewClick}>Add Review</button>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div className={style['rating-bar-container']}>
                    <div className={style['star-rating']}>
                        <IoIosStar className={style['star-icon']} />
                        <span>{overallRating.toFixed(1)}</span>
                    </div>
                    <div className={style['progress-bar']}>
                        <div
                            className={style['progress']}
                            style={{ width: `${filledWidth}%` }}
                        >
                            <span className={style['progress-text']}>{overallRating.toFixed(1)} / {maxRating}</span>
                        </div>
                    </div>
                    <div className={style['review-count']}>
                        {totalReviews}
                    </div>
                </div>
            </div>

            {showRatingInput && (
                <div className='d-flex flex-column pt-4'>
                    <div className='d-flex align-items-center flex-column py-2'>
                        <div>{renderStars()}</div>
                        {ratingText && <span className="ml-2">{ratingText}</span>}
                    </div>
                    <div className='d-flex'>
                        <textarea
                            className={`${style["promo_input"]} col-11`}
                            placeholder="Your review..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <button className={`${style["tabButton"]} ms-2`} onClick={handleSendReview} disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                    {error && showRatingInput && <p className="text-danger mt-2">{error}</p>}
                </div>
            )}

            {error && !showRatingInput && <div className="text-danger">{error}</div>}

            <div className='row pt-5'>
                <div className='col-md-8 col-8'>
                    <h4>What guests loved most</h4>
                </div>
            </div>

            {userRatings.length > 0 ? (
                <SlickCarousel {...settings}>
                    {userRatings.map((item) => (
                        <Link
                            key={item.id}
                            className={`item ${style['item-padding']}`}
                            href="#0"
                        >
                            <div className={style['country-explore-item']}>
                                <div className={style['country-explore-text']}>
                                    <div className={style['RatingCarousel-top']}>
                                        <h6>{item.headingIcon}</h6>
                                        <h4>{item.heading}</h4>
                                    </div>
                                    <p>{item.description}</p>
                                    <div className="clearfix"></div>
                                    <div className={style['RatingCarousel-top']}>
                                        Posted :<p>{item.date}</p>
                                    </div>
                                    <div>
                                        {Array(5).fill().map((_, i) => (
                                            <IoIosStar
                                                key={i}
                                                color={i < item.rating ? "#FDCC0D" : "#ccc"}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </SlickCarousel>
            ) : (
                <div className="text-center py-4">No reviews yet. Be the first to add one!</div>
            )}
        </>
    );
}

export default RatingCarousel;