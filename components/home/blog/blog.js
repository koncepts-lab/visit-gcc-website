import React from 'react';
import style from './blog.module.css';

function SingleHomeBlog(props) {
    return (
        <div className="item">
            <div className={style['blog-box']}>
                <img src={props.image} className='w-100' alt="" />
                <h4>{props.heading}</h4>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

export default SingleHomeBlog;
