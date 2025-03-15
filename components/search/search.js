import React from 'react'
import style from './style.module.css';
import { LuSearch } from "react-icons/lu";

const Search = () => {
  return (
    <>
      <div className={`input-group mb-3 ${style['banner-search']}`}>
      <button className="btn btn-primary" type="button"><LuSearch /></button>
        <input type="text" className="form-control" placeholder="" aria-label="Enter text" />       
      </div>
    </>
  )
}

export default Search
