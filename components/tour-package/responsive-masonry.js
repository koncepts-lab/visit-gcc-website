import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Rating from "react-rating-stars-component";
import style from "./style.module.css"; // Adjust the import according to your style file location
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa6";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineDinnerDining } from "react-icons/md";
import { MdOutlineEmojiPeople } from "react-icons/md";
import { MdDownhillSkiing } from "react-icons/md";
import { IoBusOutline } from "react-icons/io5";
import { GiSailboat } from "react-icons/gi";

const images = [
    {
        src: "/images/demo/01.jpg",
        title: "Beautiful Yas Island and Dubai",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 4
    },
    {
        src: "/images/demo/02.jpg",
        title: "Dubai Jain Tour",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 5
    },
    {
        src: "/images/demo/03.jpg",
        title: "Dubai Extravaganza",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 3
    },
    {
        src: "/images/demo/04.jpg",
        title: "Dubai Miracle Garden",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 4
    },
    {
        src: "/images/demo/03.jpg",
        title: "Dubai Mall",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 5
    },
    {
        src: "/images/demo/06.jpg",
        title: "Dubai Aquarium & Underwater Zoo",
        provider: "John Smith",
        date: "04 July 2024",
        rating: 3
    },


];
 
class MyWrapper extends React.Component {
    render() {
        const { breakPoints } = this.props;
        return (
            <ResponsiveMasonry
                columnsCountBreakPoints={breakPoints}
            >
                <Masonry>
                    {images.map((image, i) => (
                        <div key={i} className="masonry-item">
                            <img
                                src={image.src}
                                style={{ width: "100%", display: "block" }}
                                alt={image.title}
                            />
                            <div className="masonry-item-content">
                                <h5>{image.title}</h5>
                                <div className={style['provider-date']}>
                                    <p>{image.provider}</p> &nbsp; | &nbsp;
                                    <p>{image.date}</p>
                                </div>
                                <div className={style['star-section']}>
                                    <div className={style['star']}>
                                        <Rating
                                            count={5}
                                            value={image.rating}
                                            size={24}
                                            activeColor="#ffd700"
                                            edit={false} // Set to true if you want it to be editable
                                        />
                                    </div>
                                    <div><IoChatbubbleOutline /></div>
                                    <div><FaRegLightbulb /></div>
                                </div>

                                <ul className={style['pakages-ul']}>
                                    <li><GiSailboat /> Boating</li>
                                    <li><IoTicketOutline />Ticket </li>
                                    <li><MdOutlineDinnerDining /> Meals</li>
                                    <li><MdOutlineEmojiPeople /> Guide</li>
                                    <li><MdDownhillSkiing /> Activities</li>
                                    <li><IoBusOutline /> Transfers</li>
                                </ul>

                                <a href="#0" className={style['r-button']}>Read More</a>


                            </div>
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        );
    }
}

export default MyWrapper;