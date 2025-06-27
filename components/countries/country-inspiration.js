import React from "react";
import Link from "next/link";
import style from "./style.module.css";
import { CiCircleChevRight } from "react-icons/ci";

function CountryInspiration(props) {
  return (
    <div>
      <Link
        href={props.link}
        className={`item ${style["item-padding"]}`}
      >
        <div className={style["country-explore-item"]}>
          <img src={props.image || "/images/placeholder.jpg"} className="w-100" style={{height: '286px'}} alt="" />
          <div className={style["country-explore-text"]}>
            <span>
              <h4 style={{height: '65px',
                                         fontSize: "14px", display: '-webkit-box',
                                          WebkitLineClamp: 3, 
                                          WebkitBoxOrient: 'vertical',
                                          overflow: 'hidden'
                                        }}>{props.heading}</h4>
              <p style={{height: '84px',
                                         fontSize: "14px", display: '-webkit-box',
                                          WebkitLineClamp: 4, 
                                          WebkitBoxOrient: 'vertical',
                                          overflow: 'hidden'
                                        }}>{props.description}</p>
            </span>
            <span className={style["icon-next"]}>
              <div>
                <CiCircleChevRight />
              </div>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CountryInspiration;
