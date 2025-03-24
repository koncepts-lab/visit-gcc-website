"use client";
import React, { useState } from 'react';
import style from './style.module.css';
import Banner from '@components/banner/banner'; 
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import AccordionItem from './accordion';
import Carousal from '@components/carousel/Carousal'; 
import Ask_ur_questions from '@components/ask_ur_questions/ask_ur_questions';


const pakageDetailsOtherPackages = [
  {
    id: 1,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/01.jpg",
  },
  {
    id: 2,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/02.jpg",
  },
  {
    id: 3,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/03.jpg",
  },
  {
    id: 4,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/04.jpg",
  },
  {
    id: 5,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/05.jpg",
  },
  {
    id: 6,
    heading: "Project Heading",
    description: "Industry Name",
    image: "/images/other-packages/06.jpg",
  },
];
const blog = {
  id: 1,
  src: "/images/blank.png",
  date: "19-JAN-2017",
  tag: "GCCvisa",
  title: "New GCC visa updates",
  description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, whether by injected humour, creative liberties, or randomised words that don’t look even slightly believable. Many versions have been modified over time, either intentionally or through accidental errors, often leading to nonsensical results. Some versions contain exaggerated phrases or misinterpretations, making them less useful as placeholders.",
};

const featured = [
  {
    id: 1,
    src: "/images/blank.png",
    date: "19-JAN-2017",
    title: "Nullam at mauris pellentesque",
  },
  {
    id: 2,
    src: "/images/blank.png",
    date: "19-JAN-2017",
    title: "Mauris sodales estac quam pulvinar",
  },
  {
    id: 3,
    src: "/images/blank.png",
    date: "19-JAN-2017",
    title: "Vestibulum lacinia massa et justo",
  },
];

const categoriesButton = [
  { id: 1, name: "Events" },
  { id: 2, name: "Experience" },
  { id: 3, name: "Tour Packages" },
  { id: 4, name: "Real Estate" },
  { id: 5, name: "Invest" },
  { id: 6, name: "Visa" }
];

const tags = [
  { id: 1, name: "GCCEvents" },
  { id: 2, name: "InvestGCC" },
  { id: 3, name: "GCCtourpackage" },
  { id: 4, name: "GCCvisa" },
];

const accordionData = [
  {
    title: "Vivamus sit amet ipsum vitae sem condimentum porttitor quis",
    description: "This is the detailed description for item 1."
  },
  {
    title: "Morbi in erat lobortis, rutrum augue vel, pellentesque est.",
    description: "This is the detailed description for item 2."
  },
  {
    title: "Sed ac enim dapibus, efficitur leo et, varius dolor.",
    description: "This is the detailed description for item 3."
  }
];

function Page() {
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero.",
      likes: 5,
      replies: [],
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "I totally agree! 💯",
      likes: 8,
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const toggleComment = () => {
    setCommentOpen((prev) => !prev);
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "You",
          avatar: "https://i.pravatar.cc/40?img=3",
          text: newComment,
          likes: 0,
          replies: [],
        },
      ]);
      setNewComment("");
    }
  };

  const addReply = (commentId) => {
    if (replyText.trim() !== "") {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    user: "You",
                    avatar: "https://i.pravatar.cc/40?img=4",
                    text: replyText,
                    likes: 0,
                  },
                ],
              }
            : comment
        )
      );
      setReplyingTo(null);
      setReplyText("");
    }
  };

  const handleReplyToggle = (commentId) => {
    setReplyingTo(prevReplyingTo => prevReplyingTo === commentId ? null : commentId);
  };

  const scrollDown = () => {
    window.scrollBy({ top:800, behavior: "smooth" });
  };
//
  const [openIndex, setOpenIndex] = useState(null);  


  const handleAccordionToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); 
  };

  return (
    <div>
      <Banner />
      <section className={style["blogs-page"]}>
        <div className="">
          <div className="row">
            <div className="d-flex justify-content-center">
              <img src="/images/banner-02.jpg" className='col-12 lap-view object-fit-cover' alt="Banner" />
              <img src="/images/banner-03.jpg" className='mobile-view' alt="Banner" />
            </div>
          </div>
        </div>
        <div className={`container ${style["blogs-page-container"]} pt-5`}>
          <h1 className='col-12 d-flex justify-content-center text-black pb-3' style={{ fontWeight: '600' }}>Blog Page</h1>
          <div className='d-flex flex-column-reverse flex-lg-row gap-xl-4 gap-lg-3 gap-md-4'>
          <div className='col-lg-8 col-12 '>
             <div key={blog.id} className={`${style["blog-left-section"]} pb-5 mb-4`}>
                <img src={blog.src} className='w-100' style={{ height: '350px' }} alt="Banner" />
                <div className='d-flex justify-content-between px-4' style={{ marginTop: '-36px', fontWeight: 500 }}>
                  <p className='text-grey'>Date: <span className='text-white'>{blog.date}</span></p>
                  <p className='text-grey'>Tag: <span className='text-decoration-underline text-white'> {blog.tag}</span></p>
                </div>

                <p className={`${style["all-title"]} pt-3 my-2 pb-1`}>{blog.title}</p>
                <p className='' style={{ fontSize: '15px' }}>{blog.description}</p>
                    <div className={`${style["quotes_div"]} pt-4`}>
                      <div className="col-12 p-4 position-relative mx-auto" style={{background: '#E3F2F7'}}>
                          <div className="position-relative text-center px-4">
                            <ImQuotesLeft className="position-absolute text-primary start-0 top-0" style={{ fontSize: "1rem" }} />

                            <p className="text-black text-secondary fw-medium mb-0 px-2 py-4" style={{fontSize: '15px'}}>
                              Making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, 
                              combined with a handful of model sentences.
                            </p>

                            <ImQuotesRight className="position-absolute text-primary bottom-0 end-0" style={{ fontSize: "1rem",transform: "scaleY(-1)" }} />
                          </div>
                      </div>
                   </div>
                   <p className='pb-3 py-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero.Lorem <br/> ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero.</p>
                   <div className="container">
                    {accordionData.map((item, index) => (
                      <AccordionItem key={index} title={item.title} description={item.description} isOpen={openIndex === index} onToggle={() => handleAccordionToggle(index)}/>
                    ))}
                  </div>
                <div className={`${style["blog-left-button"]} d-flex flex-row justify-content-between col-12 pt-4`}>
                      <p className=' align-content-center align-self-baseline text-black' style={{height: '10px'}}>Share: &nbsp; <br className='d-md-none d-block'/> <FaFacebookSquare color='#1877F2' size={20} className='me-1'/> <FaSquareXTwitter size={20} color='black' className='me-1'/> <img sizes='30' src="/images/icons/instagramicon.svg" className='me-1'/> <FaLinkedin color='#0077B5 ' size={20}/></p>                  <div>
                    <div>
                      <button onClick={scrollDown}>
                        <u className="p-1">Comment</u>: {comments.length}
                      </button> <span className='px-2'>|</span>
                      <button> <u>Like</u>: <span style={{ color: '#57b1b2' }}>250</span> </button>
                    </div>
                  </div>
                </div>

                <div className={`${style["author-div"]} d-flex flex-md-row flex-column gap-4 my-5`}>
                      <img src="/images/blank.png" />
                      <div className='pt-2'>
                        <p className='fw-semibold text-black' style={{fontSize: '18px', height: '17px'}}>Author Name</p>
                        <p className='col-md-11 col-12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero.</p>
                      </div>
                </div>
                <div>
                <h3 className='text-black pt-lg-4 pt-0' style={{ fontWeight: '600' }}>Comments</h3>
                <div className={`${style["comment-box"]} col-11`}>
              <div className={style["comments-list"]}>
                {comments.map((comment) => (
                  <div key={comment.id} className={`${style["comment-item"]} my-4`}>
                    <div className='d-flex gap-4'>
                    <img
                      src={comment.avatar}
                      alt="User  Avatar"
                      className={style["user-avatar"]}
                    />
                    <div>
                    <p className='text-black fw-semibold' style={{height: '11px'}}>{comment.user}</p>
                    <p className={`${style["comments-author-details"]} fw-semibold`}>JAN-02-2024  at 7:50am   -  <button onClick={() => handleReplyToggle(comment.id)}
                          className={style["reply-btn"]}>
                          Reply
                        </button></p>
                        <p className={`${style["comment-mainreply"]} fw-semibold`} style={{ fontSize: '14px' }}>{comment.text}</p>
                    </div>
                    </div>
              
                    <div className={style["comment-content"]}>
                      {/* Replies Section */}
                      {comment.replies.length > 0 && (
                        <div className={style["replies-section"]}>
                          {comment.replies.map((reply, index) => (
                            <div key={index} className={`${style["reply-item"]}`}>
                              <img
                                src={reply.avatar}
                                alt="User  Avatar"
                                className={style["user-avatar"]}
                              />
                          <strong style={{ fontSize: '14px', color: 'black' }}>{reply.user}</strong>
                            <p>JAN-02-2024  at 7:50am</p>
                              <div>
                                <p style={{ fontSize: '14px', }}>{reply.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input Box */}
                      {replyingTo === comment.id && (
                        <div className={`${style["comment-input"]} d-flex`}>
                          <textarea
                            type="text"
                            className={`${style['']} col-12`} placeholder="Enter your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <button
                            className={`${style["send-btn"]} col-1`} style={{height: '32px'}}
                            onClick={() => addReply(comment.id)}
                          >
                            <IoMdSend size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Comment Input */}
              <div className={`${style["comment-input"]} d-flex`}>
                <textarea
                  type="text"
                  className={`${style['']} col-12`} style={{ height: '50px' }} placeholder="Enter your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className={`${style['send-btn']} col-1`}  onClick={addComment}>
                  <IoMdSend size={20} />
                </button>
              </div>
            </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4 col-12'>
                          <div className='col-11 ms-4'>
                          <input type='text' placeholder='Search' className={`${style['promo_input']} col-12`} /> <span className='bg-white' style={{marginLeft: '-34px', paddingRight: '32px'}}><FaSearch size={18} color='black' className='position-absolute bg-white' style={{marginTop: '13px',cursor: 'pointer'}} /></span>
                          <p className={`${style["all-title"]} pt-5`}>Categories</p>
                            <div className={`${style["categories"]}`}>
                            {categoriesButton.map((cat) => (
                              <button className="col-12 d-flex justify-content-between" key={cat.id}>{cat.name} <span className='pe-1'>15</span></button>
                            ))}
                            </div>
                            <div className="d-flex flex-lg-column flex-md-row flex-column gap-lg-0 gap-md-4 gap-0">
                              <div className='col-lg-12 col-md-8 col-12'>
                            <p className={`${style["all-title"]} pt-5`}>Featured News</p>
                            {featured.map((features) => (
                            <div key={features.id} className={`${style["featured"]} mb-4`}>
                                  <div className='d-flex gap-4'>
                                    <img src={features.src}/>
                                      <div>
                                        <p style={{fontWeight: '550', fontSize: '15px', height: '10px'}}>{features.date}</p>
                                        <p style={{ fontWeight: '500' }} className="text-black">
                                          {features.title.length > 30 ?  features.title.substring(0, 30) + "..." : features.title}
                                        </p>    
                                      </div>
                                  </div>
                            </div>
                            ))}
                         </div>

                          <div className='col-lg-12 col-md-4 col-12'>
                            <p className={`${style["all-title"]} pt-lg-4 my-lg-2 my-0 pt-5`}>Tags</p>
                            <div className={`${style["tags"]} row position-relative gap-2 pb-lg-0 pb-3`}>
                            {tags.map((tag) => (
                              <button className=" position-relative" style={{width:'100%', maxWidth: '170px'}} key={tag.id}>{tag.name}</button>
                            ))}
                            </div>
                            </div>
                            </div>
                            <p className={`${style["all-title"]} pt-5 d-lg-block d-none`}>Subscribe Newsletter</p>
                              <div className={`${style["newsletter"]} col-12 d-lg-block d-none`}>
                              <input type='text' placeholder='Name' className={`${style['promo_input2']} col-12`} />
                              <input type='text' placeholder='Email address' className={`${style['promo_input2']} col-12`} />
                              <button className='col-12'>SUBSCRIBE</button>
                              </div>
                         </div>
                        </div>
                </div>
                <div className='d-lg-none d-block' style={{marginTop: '-30px'}}>
                    <p className={`${style["all-title"]} d-lg-none d-block`}>Subscribe Newsletter</p>
                            <div className={`${style["newsletter"]} mb-lg-0 mb-5 col-12 d-lg-none d-block`}>
                              <input type='text' placeholder='Name' className={`${style['promo_input2']} col-12`} />
                              <input type='text' placeholder='Email address' className={`${style['promo_input2']} col-12`} />
                              <button className='col-12'>SUBSCRIBE</button>
                            </div>
                    </div>
                          <div className="container">
                            <img src="/images/blank.png" className='w-100' style={{height: '400px',borderRadius: '10px'}} alt="Banner" />
                            <div className='d-flex justify-content-between px-4' style={{marginTop: '-33px'}}>
                                <p className='text-black-50 '>Date: <span className='text-white'>19- JAN-2017</span></p>
                                <p className='text-black-50 '>Tag: <span className='text-white'> Business</span></p>
                              </div>
                          </div>    
                            
                         <h1 className='col-12 d-flex justify-content-center text-black pb-3 pt-4' style={{ fontWeight: '600' }}>Other Blog Posts</h1>                
                                      <div className="container-fluid">
                                        <div className="row pt-2 pb-1">
                                          <div className="col-md-12">
                                            <Carousal
                                              pakageDetailsOtherPackages={pakageDetailsOtherPackages}
                                              count={5}
                                              type="pakage-details-other-packages"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                 </div>

                                <div>
                                  <Ask_ur_questions />
                                </div>
        
      </section>
    </div>
  );
}

export default Page;