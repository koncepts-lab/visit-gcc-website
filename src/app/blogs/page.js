
"use client";

import React, {useState} from 'react'
import style from'./style.module.css'
import Banner from '../../../components/banner/banner';
import Link from 'next/link';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Ask_ur_questions from '@components/ask_ur_questions/ask_ur_questions';

const blogs = [
  {
    id: 1,
    src: "/images/blank.png",
    date: "19-JAN-2017",
    tag: "GCCvisa",
    title: "New GCC visa updates",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form...",
  },
  {
    id: 2,
    src: "/images/blank.png",
    date: "05-MAR-2020",
    tag: "GCCTour",
    title: "Top Travel Destinations for 2024",
    description: "Discover the best travel destinations for 2024. From tropical beaches to historical cities, explore the world like never before...",
  },
  {
    id: 3,
    src: "/images/blank.png",
    date: "10-SEP-2021",
    tag: "InvestGCC",
    title: "Latest Tech Trends in AI",
    description: "Artificial Intelligence is evolving rapidly. Here are the top AI trends shaping the industry in 2024...",
  },
  {
    id: 4,
    src: "/images/blank.png",
    date: "22-NOV-2023",
    tag: "Health",
    title: "The Future of Health & Wellness",
    description: "The healthcare industry is changing with new technology and wellness strategies. Find out what's next...",
  },
  {
    id: 5,
    src: "/images/blank.png",
    date: "22-NOV-2023",
    tag: "Health",
    title: "The Future of Health & Wellness",
    description: "The healthcare industry is changing with new technology and wellness strategies. Find out what's next...",
  },
  {
    id: 6,
    src: "/images/blank.png",
    date: "22-NOV-2023",
    tag: "Health",
    title: "The Future of Health & Wellness",
    description: "The healthcare industry is changing with new technology and wellness strategies. Find out what's next...",
  },
];

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
]

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
  { id: 5, name: "GCCEvents" },
  { id: 6, name: "InvestGCC" },
  { id: 7, name: "GCCtourpackage" },
  { id: 8, name: "GCCvisa" },
];

const ITEMS_PER_PAGE = 3;

const initialCommentsData = {
  1: [
    {
      id: 1,
      user: "John Doe",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "This is amazing! 🔥",
      likes: 5,
      likedByUser: false,
      replies: [],
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "I totally agree! 💯",
      likes: 8,
      likedByUser: false,
      replies: [],
    },
  ],
  2: [
    {
      id: 1,
      user: "Travel Enthusiast",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: "Can't wait to visit these places!",
      likes: 3,
      likedByUser: false,
      replies: [],
    },
  ],
  3: [
    {
      id: 1,
      user: "Tech Lover",
      avatar: "https://i.pravatar.cc/40?img=4",
      text: "AI is changing everything so fast!",
      likes: 7,
      likedByUser: false,
      replies: [],
    },
  ],
  4: [],
  5: [],
  6: [],
};

function page() {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const [activeCommentBlogId, setActiveCommentBlogId] = useState(null);
  
  const [commentsByBlog, setCommentsByBlog] = useState(initialCommentsData);
  
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState({blogId: null, commentId: null});
  const [replyText, setReplyText] = useState("");

 const toggleComment = (blogId) => {
    setActiveCommentBlogId(activeCommentBlogId === blogId ? null : blogId);
    setReplyingTo({blogId: null, commentId: null});
    setNewComment("");
    setReplyText("");
  };

  const addComment = (blogId) => {
    if (newComment.trim() !== "") {
      const blogComments = commentsByBlog[blogId] || [];
      const newCommentObj = {
        id: blogComments.length ? Math.max(...blogComments.map(c => c.id)) + 1 : 1,
        user: "You",
        avatar: "https://i.pravatar.cc/40?img=3",
        text: newComment,
        likes: 0,
        likedByUser: false,
        replies: [],
      };
      
      setCommentsByBlog({
        ...commentsByBlog,
        [blogId]: [...blogComments, newCommentObj]
      });
      
      setNewComment("");
    }
  };

  const addReply = (blogId, commentId) => {
    if (replyText.trim() !== "") {
      setCommentsByBlog({
        ...commentsByBlog,
        [blogId]: commentsByBlog[blogId].map((comment) =>
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
      });
      
      setReplyingTo({blogId: null, commentId: null});
      setReplyText("");
    }
  };

  const toggleLike = (blogId, commentId) => {
    setCommentsByBlog({
      ...commentsByBlog,
      [blogId]: commentsByBlog[blogId].map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              likedByUser: !comment.likedByUser,
              likes: comment.likedByUser ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    });
  };
  
  const getCommentCount = (blogId) => {
    if (!commentsByBlog[blogId]) return 0;
    return commentsByBlog[blogId].length;
  };
  
  return (
    <div>
        <Banner/>
        <section className={style["blogs-page"]}>
        <div className={``}>
        <div className="row">
          <div className="d-flex justify-content-center ">
          <img src="/images/banner-02.jpg" className='lap-view col-12 object-fit-cover' alt="Banner" />
          <img src="/images/banner-03.jpg" className='mobile-view' alt="Banner" />
          </div>
        </div>
      </div> 
            <div className={`container ${style["blogs-page-container"]} pt-5`}>
                <h1 className='col-12 d-flex justify-content-center pb-3 text-black' style={{fontWeight: '600'}}>Blog Page</h1>
                    <div className=' d-flex flex-lg-row flex-column-reverse gap-xl-4 gap-lg-3 gap-md-4 '>
                        <div className='col-lg-8 col-12 '>
                        <h1 className='col-11 d-flex justify-content-center pt-3 pb-3 text-black d-lg-none d-block' style={{fontWeight: '700'}}>Blogs</h1>
     
                        {currentBlogs.map(blog => (
                            <div key={blog.id} className={` ${style["blog-left-section"]} pb-5 mb-4`}>
                                <img src={blog.src} className='w-100' style={{height: '350px'}} alt="Banner" />
                                 <div className='d-flex justify-content-between px-4' style={{marginTop: '-36px', fontWeight: 500}}>
                                    <p className='text-grey'>Date: <span className='text-white'>{blog.date}</span></p>
                                    <p className='text-grey'>Tag: <span className='text-white text-decoration-underline'> {blog.tag}</span></p>                             
                                 </div>

                                 <p className={`${style["all-title"]} pt-3 my-2 pb-1`}>{blog.title}</p>
                                 <p style={{fontSize: '15px'}} >There are many variations of passages of Lorem Ipsum available, but the majority have suffered <br className='d-xl-block d-none'/>alteration in some form, by injected humour, or randomised words which don't look even slightly  <br className='d-xl-block d-none'/>believable... </p>
                                 <div className={`${style["blog-left-button"]} d-flex flex-row justify-content-between col-12 pt-2`}>
                                  <p className=' align-content-center align-self-baseline text-black' style={{height: '10px'}}>Share: &nbsp; <br className='d-md-none d-block'/> <FaFacebookSquare color='#1877F2' size={20} className='me-1'/> <FaSquareXTwitter size={20} color='black' className='me-1'/> <img sizes='30' src="/images/icons/instagramicon.svg" className='me-1'/> <FaLinkedin color='#0077B5 ' size={20}/></p>
                                    <div >
                                      <div className='d-flex'>
                                          <button onClick={() => toggleComment(blog.id)}>
                                            <u className="p-1">Comment</u>: {getCommentCount(blog.id)}
                                          </button> <span className='px-2'>|</span>
                                          <button> <u>Like</u>: <span style={{color: '#57b1b2'}}>250</span> </button>
                                      </div>     
                                    </div> 
                                 </div>
                            </div>
                          ))}
                        </div>
                        <div className='col-lg-4 col-12'>
                          <div className='col-11 ms-4'>
                          <input type='text' placeholder='Search' className={`${style['promo_input']} col-12`} /> <span className='bg-white' style={{marginLeft: '-34px', paddingRight: '32px'}}><FaSearch size={18} color='black' className='position-absolute bg-white' style={{marginTop: '13px', cursor: 'pointer'}} /></span>
                          <p className={`${style["all-title"]} pt-5`}>Categories</p>
                            <div className={`${style["categories"]}`}>
                            {categoriesButton.map((cat) => (
                              <button className="col-12 d-flex justify-content-between" key={cat.id}>{cat.name} <span className='pe-1'>15</span></button>
                            ))}
                            </div>
                            <div className="d-flex flex-lg-column flex-md-row flex-column gap-lg-0 gap-md-4 gap-0">
                              <div className='col-lg-12 col-md-7 col-12'>
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

                          <div className='col-lg-12 col-md-5 col-12'>
                            <p className={`${style["all-title"]} pt-lg-5 pt-3`}>Tags</p>
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
                    <div className={`${style["paginationbuttons"]}`}>
            {[...Array(Math.ceil(blogs.length / ITEMS_PER_PAGE))].map((_, i) => (
              <button 
                key={i + 1} 
                className={`${currentPage === i + 1 ? style["active"] : ''}`} 
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <p className={`${style["all-title"]} d-lg-none d-block`}>Subscribe Newsletter</p>
                              <div className={`${style["newsletter"]} pb-lg-0 pb-5 mb-lg-0 mb-5 col-12 d-lg-none d-block`}>
                              <input type='text' placeholder='Name' className={`${style['promo_input2']} col-12`} />
                              <input type='text' placeholder='Email address' className={`${style['promo_input2']} col-12`} />
                              <button className='col-12'>SUBSCRIBE</button>
                             </div>
           </div>

       {/* Comment Popup Modal - Only show for the active blog */}
       {activeCommentBlogId !== null && (
        <div className={style["comment-modal"]}>
          <div className={style["comment-box"]}>
            <h3 className={`${style["modal-title"]} text-black`}>Comments</h3>
            <button className={style["close-btn"]} onClick={() => toggleComment(activeCommentBlogId)}>
              ✖
            </button>
            <div className={style["comments-list"]}>
              {commentsByBlog[activeCommentBlogId] && commentsByBlog[activeCommentBlogId].map((comment) => (
                <div key={comment.id} className={`${style["comment-item"]} my-4 pb-2`} style={{borderBottom: '1px solid grey'}}>
                  <img
                    src={comment.avatar}
                    alt="User Avatar"
                    className={style["user-avatar"]}
                  />
                  <strong className='text-black'>{comment.user}</strong>
                  <div className={style["comment-content"]}>
                    <p className='pt-1' style={{fontSize: '14px'}}>{comment.text}</p>
                    <div className={style["comment-actions"]}>
                      <button
                        onClick={() => toggleLike(activeCommentBlogId, comment.id)}
                        className={style["like-btn"]}
                        style={{fontSize: '14px'}}
                      >
                        {comment.likedByUser ? <FaHeart size={12} color="red" /> : <FaRegHeart size={12} />} {comment.likes}
                      </button>
                      <button
                        onClick={() => setReplyingTo({blogId: activeCommentBlogId, commentId: comment.id})}
                        className={style["reply-btn"]}
                      >
                        Reply
                      </button>
                    </div>

                    {/* Replies Section */}
                    {comment.replies.length > 0 && (
                      <div className={`${style["replies-section"]} my-2`}>
                        {comment.replies.map((reply, index) => (
                          <div key={index} className={style["reply-item"]}>
                            <img
                              src={reply.avatar}
                              alt="User Avatar"
                              className={style["user-avatar"]}
                            />
                            <strong style={{fontSize: '14px',color:'black'}} >{reply.user}</strong>
                            <div>
                              <p style={{fontSize: '14px'}} >{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Input Box */}
                    {replyingTo.blogId === activeCommentBlogId && replyingTo.commentId === comment.id && (
                      <div className={`${style["comment-input"]} d-flex`}>
                        <textarea
                          type="text"
                          className={`${style['promo_input']} col-lg-10 col-10`}  placeholder="Enter your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button
                          className={`${style["send-btn"]} col-2`}
                          onClick={() => addReply(activeCommentBlogId, comment.id)}
                        >
                          <IoMdSend size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {(!commentsByBlog[activeCommentBlogId] || commentsByBlog[activeCommentBlogId].length === 0) && (
                <p className="text-center py-3">No comments yet. Be the first to comment!</p>
              )}
            </div>

            {/* Main Comment Input */}
            <div className={`${style["comment-input"]} d-flex `}>
              <textarea
                type="text"
                className={`${style['promo_input']} col-10`} style={{height: '50px',}} placeholder="Enter your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className={`${style['send-btn']} col-2`} style={{height: '50px',marginLeft: '-2px'}} onClick={() => addComment(activeCommentBlogId)}>
                <IoMdSend size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
          <div>
            <Ask_ur_questions />
          </div>

        </section>
    </div>
  )
}

export default page