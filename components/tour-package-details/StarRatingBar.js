import React from 'react';
import style from './style.module.css';
import { IoIosStar } from 'react-icons/io';

const StarRatingBar = ({ rating, maxRating, totalReviews }) => {
    // Calculate the width percentage for the filled part of the progress bar
    const filledWidth = (rating / maxRating) * 100;

    return (
        <div className={style['rating-bar-container']}>
            <div className={style['star-rating']}>
                <IoIosStar className={style['star-icon']} />
                <span>{rating.toFixed(1)}</span>
            </div>
            <div className={style['progress-bar']}>
                <div
                    className={style['progress']}
                    style={{ width: `${filledWidth}%` }}
                >
                    <span className={style['progress-text']}>{rating.toFixed(1)} / {maxRating}</span>
                </div>
            </div>
            <div className={style['review-count']}>
                {totalReviews}
            </div>
        </div>
    );
};

export default StarRatingBar;
