import React, { useEffect, useState } from "react";
import style from "./style.module.css";

export default function EnquiryForm({ isOpen, onClose }) {
  const [countryCodes, setCountryCodes] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const codes = data
          .map((country) => ({
            name: country.name.common,
            code: country.idd?.root
              ? `${country.idd.root}${
                  country.idd.suffixes ? country.idd.suffixes[0] : ""
                }`
              : null,
          }))
          .filter((c) => c.code)
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountryCodes(codes);
      })
      .catch((err) => console.error("Failed to fetch country codes", err));
  }, []);

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <button className={style.closeButton} onClick={onClose}>
          X
        </button>
        <h2 className="fw-bold">Traveller Form</h2>
        <form>
          <div className="">
            <div className={`${style["Enquiry-div"]}`}>
              <input
                className={`${style["promo_input"]} col-xl-6 col-12`}
                placeholder="Last name (in English)*"
              />
              <br className="d-xl-none d-lg-block" />
              <input
                className={`${style["promo_input"]} col-xl-6`}
                placeholder="First and Middle name (in English)*"
              />
              <br />
            </div>
            <div className={`${style["Enquiry-div"]}`}>
              <div className="col-xl-6 col-12">
                <label>Email Address</label>
                <input
                  className={`${style["promo_input"]} col-12 `}
                  type="email"
                />
              </div>
              <br className="d-xl-none d-lg-block" />
              <div className="col-xl-6 col-12">
                <label>Contact Number</label>
                <div className="d-flex">
                  <select className={`${style["promo_select"]} col-3 `}>
                    {countryCodes.map((country, index) => (
                      <option key={index} value={country.code}>
                        {country.code} ({country.name})
                      </option>
                    ))}
                  </select>
                  <input
                    className={`${style["promo_input"]} col-9`}
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className={`${style["Enquiry-div"]}`}>
              <div className="col-xl-6 col-12">
                <label>Destination</label>
                <input className={`${style["promo_input"]} col-12 `} />
              </div>
              <br className="d-xl-none d-lg-block" />
              <div className="col-xl-6 col-12">
                <label>Country</label>
                <input className={`${style["promo_input"]} col-12 `} />
              </div>
            </div>
            <div className="col-12 pt-3">
              <button type="button" className={style["submitButton"]}>
                Submit Enquiry
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
