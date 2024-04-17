import React from 'react';
import Link from 'next/link';
import { FaRegHeart } from "react-icons/fa";
import styles from '../../../app/packages/packages.module.css';

const SingleCategories = ({ value }) => {
  return (
    <div className={`${styles.item}`} key={value.id}>
    <div className={`${styles['blog-box']} ${styles['package-item']}`}>
      <img src={value.image} className={`${styles['w-100']}`} alt="" />
      <div className={`${styles['star-icon']}`}><FaRegHeart /></div>
      <div className={`${styles.ratings}`}>{value.ratings}</div>
      <h4>{value.heading}</h4>
      <p>{value.description}</p>
      <div className={`${styles['full-box']}`}>
        <div className={`${styles['half-box']}`}>From <b>AED {value.price}</b>/ Person</div>
        <div className={`${styles['half-box']}`}>
          <Link href={`packages/${value.slug}`} className={`${styles['details-btn']}`}>View Details</Link>
        </div>
      </div>
    </div>
  </div>
  );
}

export default SingleCategories;
