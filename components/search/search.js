import React from 'react'
import style from './style.module.css';
import { LuMoveRight } from "react-icons/lu";

const Search = () => {
  return (
    <>
      <div className={`input-group mb-3 ${style['banner-search']}`}>
        <input type="text" className="form-control" placeholder="Search for something" aria-label="Enter text" />
        <button className="btn btn-primary" type="button"><LuMoveRight /></button>
      </div>
    </>
  )
}

export default Search
