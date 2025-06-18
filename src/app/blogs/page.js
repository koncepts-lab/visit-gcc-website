"use client";

import React, {useState, useEffect} from 'react'
import style from'./style.module.css'
import Banner from '@components/banner/banner';
import Link from 'next/link';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Ask_ur_questions from '@components/ask_ur_questions/ask_ur_questions';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Newsletter from './newsletter';
import CommentsModal from './comments';
import {
  FacebookShareButton,
  LinkedinShareButton,
  ThreadsShareButton,
  TwitterShareButton,
ThreadsIcon,

} from "react-share"; 

const ITEMS_PER_PAGE = 3;

function page() {
    const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);      
    const [categories,setCategories ] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [tags, setTags] = useState([]);
    const [likedBlogs, setLikedBlogs] = useState({});
    const [commentCounts, setCommentCounts] = useState({});
    const [activeCommentBlogData, setActiveCommentBlogData] = useState(null);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState({type: null, id: null});
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});
    const currentBlogs = (filteredBlogs.length > 0 ? filteredBlogs : blogs).slice(indexOfFirstItem, indexOfLastItem);

    const fetchCommentCount = async (blogId) => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

     if (loginToken) {
        authToken = loginToken;
        console.log("Using login token for fetching packages.");
      }
      else if (registerToken) {
        authToken = registerToken;
        console.log("Using register token for fetching packages.");
      } 

      if (!authToken) {
        setError("Authentication token not found");
        setIsLoading(false);
        return;
      }
  
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}blogs/${blogId}/comments/count`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
  
        setIsLoading(false);
        console.log(`Fetched comment count for ${blogId}:`, response.data.comment_count); 
        return response.data.comment_count; 
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching comment count:", error);
        setError("Failed to fetch comment count");
        return 0;
      }
    };
  
    const toggleComment = async (blogId) => {
      setActiveCommentBlogData(blogs.find(blog => blog.uuid_id === blogId));
      setIsCommentModalOpen(true);
  
      const count = await fetchCommentCount(blogId);
      setCommentCounts(prevCounts => ({
        ...prevCounts,
        [blogId]: count
      }));
    };
  
        const handleCloseComments = () => {
      setActiveCommentBlogData(null);
      setIsCommentModalOpen(false);
    };
  
    const getCommentCount = (blogId) => {
      return commentCounts[blogId] || 0;
    };
  
    useEffect(() => {
      const loadCommentCounts = async () => {
        const counts = {};
        for (const blog of blogs) {
          counts[blog.uuid_id] = await fetchCommentCount(blog.uuid_id);
        }
        setCommentCounts(counts);
      };
  
      if (blogs.length > 0) {
        loadCommentCounts();
      }
    }, [blogs]);

    const handleLikeBlog = async (blogUuid) => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

     if (loginToken) {
        authToken = loginToken;
        console.log("Using login token for fetching packages.");
      }
      else if (registerToken) {
        authToken = registerToken;
        console.log("Using register token for fetching packages.");
      } 

      if (!authToken) {
        setError("Authentication token not found");
        setIsLoading(false);
        return;
      }
    
        const currentLikeStatus = likedBlogs[blogUuid]?.isLiked || false;
    
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}blog/${blogUuid}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
    
        const updatedLikes = response.data.number_of_likes;
    
        setLikedBlogs((prev) => {
          if (currentLikeStatus) {
            return {
              ...prev,
              [blogUuid]: {
                isLiked: false,
                likes: Math.max(0, (prev[blogUuid]?.likes || 0) - 1),
              },
            };
          }
    
          return {
            ...prev,
            [blogUuid]: {
              isLiked: true,
              likes: updatedLikes, 
            },
          };
        });
    
      } catch (err) {
        console.error("Full Error Object:", err);
    
        if (err.response) {
          console.error("Error Response Data:", err.response.data);
          enqueueSnackbar(`Error: ${err.response.data.message || 'Failed to like/unlike blog'}`, { variant: "error" });
        } else if (err.request) {
          enqueueSnackbar("No response received from server", { variant: "error" });
        } else {
          enqueueSnackbar("Error in setting up the request", { variant: "error" });
        }
      }
    };
    

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;
  
       if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        }
        else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        } 
  
        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }  
      
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}category`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          }); 
          const allCategories = response.data.data || response.data || []; 
      
          const categoriesWithCounts = await Promise.all(
            allCategories.map(async (category) => {
              try {
                const countResponse = await axios.get(
                  `${process.env.NEXT_PUBLIC_API_URL}blog/${category.uuid_id}/get-blogs-by-category`, 
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                
                const categoryBlogs = countResponse.data.data || countResponse.data || [];
                return {
                  ...category,
                  blogCount: categoryBlogs.length
                };
              } catch (err) {
                console.error(`Error fetching blogs for category ${category.uuid_id}:`, err);
                return {
                  ...category,
                  blogCount: 0
                };
              }
            })
          );
      
          console.log("Categories with counts:", categoriesWithCounts);
          setCategories(categoriesWithCounts);
          
          // Populate initial category counts
          const initialCategoryCounts = categoriesWithCounts.reduce((acc, category) => {
            acc[category.uuid_id] = category.blogCount;
            return acc;
          }, {});
          
          setCategoryCounts(initialCategoryCounts);
          
          setIsLoading(false);
      
        } catch (err) {
          setIsLoading(false);
          setError("Failed to fetch categories. Please try again.");
          console.error("Error fetching categories:", err);
        }
      };  
      fetchCategories();
    }, []);

    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;
  
       if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        }
        else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        } 
  
        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }  
    
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}blog`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          }); 
          const allBlogs = response.data.data || response.data || []; 
    
          console.log("All Packages:", allBlogs); 
          setBlogs(allBlogs);
          setIsLoading(false);
    
        } catch (err) {
          setIsLoading(false);
          setError("Failed to fetch packages. Please try again.");
          console.error("Error fetching packages:", err);
        }
      };
    
      fetchBlogs();
    }, []);
    
    useEffect(() => {
      const fetchFeatured = async () => {
        try {
          const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;
  
       if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        }
        else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        } 
  
        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }  
    
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}blog/get-featured-blogs`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            params: {
              limit: 3 
            }
          }); 
          const allFeatured = response.data.data || response.data || []; 
    
          console.log("All Featured:", allFeatured); 
          setFeatured(allFeatured.slice(0, 3));
          setIsLoading(false);
    
        } catch (err) {
          setIsLoading(false);
          setError("Failed to fetch Featured. Please try again.");
          console.error("Error fetching Featured:", err);
        }
      };  
      fetchFeatured();
    }, []);
 
    useEffect(() => {
      const fetchTags = async () => {
        try {
          const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;
  
       if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        }
        else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        } 
  
        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }  
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}tag`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          }); 
          const allTags = response.data.data || response.data || []; 
          console.log("All Tags:", allTags); 
          setTags(allTags);
          setIsLoading(false);
    
        } catch (err) {
          setIsLoading(false);
          setError("Failed to fetch Tags. Please try again.");
          console.error("Error fetching Tags:", err);
        }
      };  
      fetchTags();
    }, []);
  
    const fetchBlogsByCategory = async (categoryId) => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

     if (loginToken) {
        authToken = loginToken;
        console.log("Using login token for fetching packages.");
      }
      else if (registerToken) {
        authToken = registerToken;
        console.log("Using register token for fetching packages.");
      } 

      if (!authToken) {
        setError("Authentication token not found");
        setIsLoading(false);
        return;
      }
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}blog/${categoryId}/get-blogs-by-category`, {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
          });
  
          const categoryBlogs = response.data.data || response.data || [];
          const blogCount = categoryBlogs.length;  

          setFilteredBlogs(categoryBlogs);
          setCurrentPage(1);
          setActiveFilter({type: 'category', id: categoryId});

          setCategoryCounts((prev) => ({
            ...prev,
            [categoryId]: blogCount, 
        }));

      if (window.innerWidth <= 992) {
        window.scrollBy(0, 900);
      }
      } catch (err) {
          console.error("Error fetching blogs by category:", err);
          enqueueSnackbar("Failed to fetch blogs by category", { variant: "error" });
      }
  };

  const fetchBlogsByTag = async (tagId) => {
    try {
      const registerToken = localStorage.getItem("auth_token_register");
    const loginToken = localStorage.getItem("auth_token_login");
    let authToken = null;

   if (loginToken) {
      authToken = loginToken;
      console.log("Using login token for fetching packages.");
    }
    else if (registerToken) {
      authToken = registerToken;
      console.log("Using register token for fetching packages.");
    } 

    if (!authToken) {
      setError("Authentication token not found");
      setIsLoading(false);
      return;
    }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}blog/${tagId}/get-blogs-by-tag`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      const tagBlogs = response.data.data || response.data || [];
      setFilteredBlogs(tagBlogs);
      setCurrentPage(1);
      setActiveFilter({ type: 'tag', id: tagId });
  
      // Check if the screen width is <= 992px and scroll the page 400px down
      if (window.innerWidth <= 992) {
        window.scrollBy(0, 400); // Scroll 400px down
      }
    } catch (err) {
      console.error("Error fetching blogs by tag:", err);
      enqueueSnackbar("Failed to fetch blogs by tag", { variant: "error" });
    }
  };
  
  const clearFilter = () => {
      setFilteredBlogs([]);
      setCurrentPage(1);
      setActiveFilter({type: null, id: null});
  };

  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);

const toggleCategoryPopup = () => {
  setIsCategoryPopupOpen(!isCategoryPopupOpen);
};

const clearFilterAndCloseCategoryPopup = () => {
  clearFilter();
  setIsCategoryPopupOpen(false);
  setFilteredBlogs([]);
  setCurrentPage(1);
  setActiveFilter({type: null, id: null});
};

  return (
    <div>
        <Banner/>
        <section className={style["blogs-page"]}>
        <div className={``}>
        <div className="row">
        {currentBlogs.length > 0 && (
          <div className="d-flex justify-content-center">
              <img 
                  src={currentBlogs[0].banner_image_url} 
                  className='lap-view col-12 object-fit-cover' 
                  alt="Banner" 
              />
          </div>
      )}
        </div>
      </div> 
            <div className={`container ${style["blogs-page-container"]} pt-5`}>
                <h1 className='col-12 d-flex justify-content-center pb-3 text-black' style={{fontWeight: '600'}}>Blog Page</h1>
                    <div className=' d-flex flex-lg-row flex-column-reverse gap-xl-4 gap-lg-3 gap-md-4 '>
                        <div className='col-lg-8 col-12 '>
                        <h1 className='col-11 d-flex justify-content-center pt-3 pb-3 text-black d-lg-none d-block' style={{fontWeight: '700'}}>Blogs</h1>
     
                        {currentBlogs.map(blogs => (
                            <div key={blogs.uuid_id} className={` ${style["blog-left-section"]} pb-5 mb-4 `}>
                       <Link href={`/blogs/${blogs.uuid_id}`}>

                                <img src={blogs.main_image_url} className='w-100' style={{height: '350px'}} alt="Banner" />

                                  <p className={`${style["all-title"]} pt-3 my-2 pb-1`}>{blogs.heading}</p>
                                  <p className=''>Date: <span>{blogs.creation_date}</span></p>
                                  </Link>

                                 <p style={{fontSize: '15px'}} >{blogs.description1}</p>
                                 <div className={`${style["blog-left-button"]} d-flex flex-row justify-content-between col-12 pt-2`}>
                                  <p className=' align-content-center align-self-baseline text-black' style={{height: '10px'}}>Share: &nbsp; <br className='d-md-none d-block'/> 
                                 <FacebookShareButton url='www.youtube.com'><FaFacebookSquare color='#1877F2' size={20} className='me-1'/></FacebookShareButton>  
                                  <TwitterShareButton url='www.youtube.com'><FaSquareXTwitter size={20} color='black' className='me-1'/> </TwitterShareButton>
                                  <ThreadsShareButton url='www.youtube.com'><ThreadsIcon size={18} borderRadius={15}/></ThreadsShareButton> 
                                  <LinkedinShareButton url='www.youtube.com'><FaLinkedin color='#0077B5 ' size={20} /></LinkedinShareButton></p>
                                    <div >
                                      {/* <div className='d-flex'>
                                      <button onClick={() => toggleComment(blogs.uuid_id)}>
                                          Comment: {getCommentCount(blogs.uuid_id)}
                                        </button>
                                             <span className='px-2'>|</span>
                                             <button
                                                  onClick={() => handleLikeBlog(blogs.uuid_id)}
                                                  className="d-flex align-items-center"
                                                >
                                                  {likedBlogs[blogs.uuid_id]?.isLiked ? (
                                                    <FaHeart color="red" className="me-1" />
                                                  ) : (
                                                    <FaRegHeart className="me-1" />
                                                  )}
                                                  <span style={{ color: "#57b1b2" }}>
                                                    {likedBlogs[blogs.uuid_id]?.likes || blogs.number_of_likes}
                                                  </span>
                                                </button>    
                                        </div>      */}
                                    </div> 
                                 </div>
                            </div>
                          ))}
                        </div>
                        <div className='col-lg-4 col-12'>
                          <div className='col-11 ms-4'>
                          <input type='text' placeholder='Search' className={`${style['promo_input']} col-12`} /> <span className='bg-white' style={{marginLeft: '-34px', paddingRight: '32px'}}><FaSearch size={18} color='black' className='position-absolute bg-white' style={{marginTop: '13px', cursor: 'pointer'}} /></span>
                          <p className={`${style["all-title"]} pt-5 d-lg-block d-none`}>Categories</p>
                            <div className={`${style["categories"]} d-lg-block d-none`}>
                             {categories.map((cat) => (
                                <button 
                                    className={`col-12 d-flex justify-content-between ${activeFilter.type === 'category' && activeFilter.id === cat.uuid_id ? style['active-filter'] : ''}`} 
                                    key={cat.uuid_id}
                                    onClick={() => fetchBlogsByCategory(cat.uuid_id)}
                                >
                                    {cat.category} <span className='pe-1'>{cat.blogCount || categoryCounts[cat.uuid_id] || 0}</span>
                                </button>
                            ))}
                            {activeFilter.type === 'category' && (
                                <button 
                                    className="col-12 mt-2 btn btn-secondary"
                                    onClick={clearFilter}>
                                    Clear Category Filter
                                </button>
                            )}
                            </div>

                            <div className={`${style["categories"]} d-lg-none d-block pt-3`}>
                            <p className={`${style["title_category"]}`} onClick={toggleCategoryPopup}>Categories</p>
                            {isCategoryPopupOpen && (
                                <div className={`${style["category-popup"]} d-lg-none d-block container`}>
                                  
                                  <div className={`${style["category-popup-inner"]}`}>
                                    <button className={`ms-auto fs-4 text-white col-12 d-flex justify-content-end`} onClick={() => setIsCategoryPopupOpen(false)}>X</button>

                                    {categories.map((cat) => (
                                      <button 
                                        className={`col-12 d-flex justify-content-between ${activeFilter.type === 'category' && activeFilter.id === cat.uuid_id ? style['active-filter'] : 'text-white'}`} 
                                        key={cat.uuid_id}
                                        onClick={() => { fetchBlogsByCategory(cat.uuid_id); setIsCategoryPopupOpen(false); }}
                                      >
                                        {cat.category} <span className='pe-1'>{cat.blogCount || categoryCounts[cat.uuid_id] || 0}</span>
                                      </button>
                                    ))}

                                    {activeFilter.type === 'category' && (
                                      <button 
                                        className="col-12 mt-2 btn btn-secondary text-white"
                                        onClick={clearFilterAndCloseCategoryPopup}>
                                        Clear Category Filter
                                      </button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="d-flex flex-lg-column flex-md-row flex-column gap-lg-0 gap-md-4 gap-0">
                              <div className='col-lg-12 col-md-7 col-12'>
                            <p className={`${style["all-title"]} pt-lg-5 pt-2`}>Featured News</p>
                            {featured.map((features) => (
                            <div key={features.id} className={`${style["featured"]} mb-4`}>
                              <Link href={`/blogs/${features.uuid_id}`}>
                                  <div className='d-flex gap-4'>
                                    <img src={features.main_image_url}/>
                                      <div>
                                        <p style={{fontWeight: '550', fontSize: '15px', height: '10px'}}>{features.creation_date}</p>
                                        <p style={{ fontWeight: '500' }} className="text-black">
                                          {features.heading.length > 30 ?  features.heading.substring(0, 30) + "..." : features.heading}
                                        </p>    
                                      </div>        
                                  </div>
                                  </Link>
                            </div>
                            ))}
                         </div>

                          <div className='col-lg-12 col-md-5 col-12'>
                            <p className={`${style["all-title"]} pt-lg-5 pt-3`}>Tags</p>
                            <div className={`${style["tags"]} row position-relative gap-2 pb-lg-0 pb-3`}>
                            {tags.map((tag) => (
                                <button className={`position-relative ${activeFilter.type === 'tag' && activeFilter.id === tag.uuid_id ? style['active-filter'] : ''}`} style={{width:'100%', maxWidth: '170px'}} 
                                key={tag.uuid_id}onClick={() => fetchBlogsByTag(tag.uuid_id)}>{tag.tag}</button>
                            ))}
                            {activeFilter.type === 'tag' && (
                                <button className="col-12 mt-2 btn btn-secondary" onClick={clearFilter}>
                                    Clear Tag Filter
                                </button>
                            )}
                            </div>
                            </div>
                            </div>
                            <div className=' col-12 d-lg-block d-none pt-5'>
                              <Newsletter />
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
             <div className='pb-lg-0 pt-5 pb-5 mb-lg-0 mb-5 col-12 d-lg-none d-block'>
              <Newsletter />
             </div>
   
           </div>

       {isCommentModalOpen && activeCommentBlogData && (
        <CommentsModal
          blogData={activeCommentBlogData}
          onClose={handleCloseComments}
        />
      )}
          <div>
            <Ask_ur_questions />
          </div>

        </section>
    </div>
  )
}

export default page