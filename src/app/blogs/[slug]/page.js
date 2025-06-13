"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import style from "./style.module.css";
import Banner from "@components/banner/banner";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import AccordionItem from "./accordion";
import Carousal from "@components/carousel/Carousal";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import axios from "axios";
import Link from "next/link";
import Newsletter from "../newsletter";

function Page() {
  const [commentOpen, setCommentOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [slugblog, setSlugBlogs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesWithCounts, setCategoriesWithCounts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [tags, setTags] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [commentReplies, setCommentReplies] = useState({});
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);

  const toggleCategoryPopup = () => {
    setIsCategoryPopupOpen(!isCategoryPopupOpen);
  };

  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    const fetchCategoriesAndCounts = async () => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        // First, fetch categories
        const categoriesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}category`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const allCategories =
          categoriesResponse.data.data || categoriesResponse.data || [];

        // Fetch blog counts for each category concurrently
        const categoriesWithBlogCounts = await Promise.all(
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

              const categoryBlogs =
                countResponse.data.data || countResponse.data || [];
              return {
                ...category,
                blogCount: categoryBlogs.length,
              };
            } catch (blogError) {
              console.error(
                `Error fetching blogs for category ${category.uuid_id}:`,
                blogError
              );
              return {
                ...category,
                blogCount: 0,
              };
            }
          })
        );

        setCategories(allCategories);
        setCategoriesWithCounts(categoriesWithBlogCounts);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch categories. Please try again.");
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategoriesAndCounts();
  }, []);

  useEffect(() => {
    if (!slug) return;

    const fetchBlogData = async () => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        const blogResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}blog/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const singleBlogData =
          blogResponse.data.data || blogResponse.data || [];
        console.log("Blog Data:", singleBlogData);
        setSlugBlogs(singleBlogData);

        const faqResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}blog-faq/${slug}/get-blogfaqs`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const faqList = faqResponse.data || [];
        setFaqData(faqList);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      }
    };

    fetchBlogData();
  }, [slug]);

  useEffect(() => {
    const fetchAllBlog = async () => {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        // Fetch blog data
        const blogResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}blog`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const Blogdata = blogResponse.data.data || blogResponse.data || [];
        console.log("Blog Data:", Blogdata);
        setBlogs(Blogdata);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Failed to fetch All Blogs. Please try again.");
        console.error("Error fetching data:", err);
      }
    };

    fetchAllBlog();
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
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}blog/get-featured-blogs`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            params: {
              limit: 3,
            },
          }
        );
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
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}tag`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
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

  const toggleComment = () => {
    setCommentOpen((prev) => !prev);
  };

  const fetchComments = async () => {
    try {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
        console.log("Using login token for fetching packages.");
      } else if (registerToken) {
        authToken = registerToken;
        console.log("Using register token for fetching packages.");
      }

      if (!authToken) {
        setError("Authentication token not found");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}blogs/${slug}/comments`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const commentsData = response.data.comments || [];
      setComments(commentsData);

      // Fetch replies for each comment
      for (const comment of commentsData) {
        await fetchReplies(comment.uuid_id);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const fetchReplies = async (commentId) => {
    try {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
        console.log("Using login token for fetching packages.");
      } else if (registerToken) {
        authToken = registerToken;
        console.log("Using register token for fetching packages.");
      }

      if (!authToken) {
        setError("Authentication token not found");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}comments/${commentId}/replies`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      console.log(`Replies for comment ${commentId}:`, response.data);

      setCommentReplies((prev) => ({
        ...prev,
        [commentId]: response.data.replies || [],
      }));
    } catch (err) {
      console.error(`Error fetching replies for comment ${commentId}:`, err);
    }
  };

  const addComment = async () => {
    if (newComment.trim() !== "") {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}comments`,
          {
            blog_id: slugblog.uuid_id,
            comment: newComment,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        console.log("Add Comment Response:", response.data); // Log the response after adding a comment
        setComments((prev) => [...prev, response.data]);
        setNewComment("");
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    }
  };

  const addReply = async (commentId) => {
    if (replyText.trim() !== "") {
      try {
        const registerToken = localStorage.getItem("auth_token_register");
        const loginToken = localStorage.getItem("auth_token_login");
        let authToken = null;

        if (loginToken) {
          authToken = loginToken;
          console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
          console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}replies`,
          {
            comment_id: commentId,
            comment: replyText,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        console.log("Add Reply Response:", response.data);
        setComments((prev) =>
          prev.map((comment) => {
            if (comment.uuid_id === commentId) {
              const updatedReplies = comment.replies
                ? [...comment.replies, response.data]
                : [response.data];
              return { ...comment, replies: updatedReplies };
            } else {
              return comment;
            }
          })
        );
        setReplyingTo(null);
        setReplyText("");
      } catch (err) {
        console.error("Error adding reply:", err);
      }
    }
  };

  useEffect(() => {
    if (slug) {
      fetchComments();
    }
  }, [slug]);

  const scrollDown = () => {
    window.scrollBy({ top: 800, behavior: "smooth" });
  };

  const [openIndex, setOpenIndex] = useState(null);
  const handleAccordionToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleLikeBlog = async (blogUuid) => {
    try {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
        console.log("Using login token for fetching packages.");
      } else if (registerToken) {
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

      const updatedLikes = currentLikeStatus
        ? Math.max(
            0,
            (likedBlogs[blogUuid]?.likes || slugblog.number_of_likes) - 1
          )
        : (likedBlogs[blogUuid]?.likes || slugblog.number_of_likes) + 1;

      // Update the liked blogs state
      setLikedBlogs((prev) => ({
        ...prev,
        [blogUuid]: {
          isLiked: !currentLikeStatus,
          likes: updatedLikes,
        },
      }));
    } catch (err) {
      console.error("Full Error Object:", err);

      if (err.response) {
        console.error("Error Response Data:", err.response.data);
        enqueueSnackbar(
          `Error: ${err.response.data.message || "Failed to like/unlike blog"}`,
          { variant: "error" }
        );
      } else if (err.request) {
        enqueueSnackbar("No response received from server", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error in setting up the request", {
          variant: "error",
        });
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Banner />
      <section className={style["blogs-page"]}>
        <div className="">
          <div key={slugblog.uuid_id} className="row">
            <div className="d-flex justify-content-center">
              <img
                src="/images/banner-02.jpg"
                className="col-12 lap-view object-fit-cover"
                alt="Banner"
              />
            </div>
          </div>
        </div>
        <div className={`container ${style["blogs-page-container"]} pt-5`}>
          <h1
            className="col-12 d-flex justify-content-center text-black pb-3"
            style={{ fontWeight: "600" }}
          >
            Blog Page
          </h1>
          <div className="d-flex flex-column-reverse flex-lg-row gap-xl-4 gap-lg-3 gap-md-4">
            <div className="col-lg-8 col-12 ">
              <div
                key={slugblog.uuid_id}
                className={`${style["blog-left-section"]} pb-5 mb-4`}
              >
                <img
                  src={slugblog.main_image_url}
                  className="w-100"
                  style={{ height: "350px" }}
                  alt="Banner"
                />
                <div
                  className="d-flex justify-content-between px-4"
                  style={{ marginTop: "-36px", fontWeight: 500 }}
                >
                  <p className="text-grey">
                    Date: <span className="text-white">{slugblog.date}</span>
                  </p>
                </div>

                <p className={`${style["all-title"]} pt-3 my-2 pb-1`}>
                  {slugblog.heading}
                </p>
                <p className="" style={{ fontSize: "15px" }}>
                  {slugblog.description1}
                </p>
                <div className={`${style["quotes_div"]} pt-4`}>
                  <div
                    className="col-12 p-4 position-relative mx-auto"
                    style={{ background: "#E3F2F7" }}
                  >
                    <div className="position-relative text-center px-4">
                      <ImQuotesLeft
                        className="position-absolute text-primary start-0 top-0"
                        style={{ fontSize: "1rem" }}
                      />

                      <p
                        className="text-black text-secondary fw-medium mb-0 px-2 py-4"
                        style={{ fontSize: "15px" }}
                      >
                        {slugblog.quote}
                      </p>

                      <ImQuotesRight
                        className="position-absolute text-primary bottom-0 end-0"
                        style={{ fontSize: "1rem", transform: "scaleY(-1)" }}
                      />
                    </div>
                  </div>
                </div>
                <p className="pb-3 py-5">{slugblog.description2}</p>

                <div className="container">
                  {faqData.map((item, index) => (
                    <AccordionItem
                      key={item.uuid_id} // Use unique identifier (uuid_id) for key
                      title={item.question}
                      description={item.answer}
                      isOpen={openIndex === index}
                      onToggle={() => handleAccordionToggle(index)}
                    />
                  ))}
                </div>
                <div
                  className={`${style["blog-left-button"]} d-flex flex-row justify-content-between col-12 pt-4`}
                >
                  <p
                    className=" align-content-center align-self-baseline text-black"
                    style={{ height: "10px" }}
                  >
                    Share: &nbsp; <br className="d-md-none d-block" />{" "}
                    <FaFacebookSquare
                      color="#1877F2"
                      size={20}
                      className="me-1"
                    />{" "}
                    <FaSquareXTwitter
                      size={20}
                      color="black"
                      className="me-1"
                    />{" "}
                    <img
                      sizes="30"
                      src="/images/icons/instagramicon.svg"
                      className="me-1"
                    />{" "}
                    <FaLinkedin color="#0077B5 " size={20} />
                  </p>{" "}
                  <div>
                    <div>
                      <div className="d-flex">
                        <button onClick={scrollDown}>
                          <u className="p-1">Comment</u>: {comments.length}
                        </button>{" "}
                        <span className="px-2">|</span>
                        <button
                          onClick={() => handleLikeBlog(slugblog.uuid_id)}
                          className="d-flex align-items-center"
                        >
                          {likedBlogs[slugblog.uuid_id]?.isLiked ? (
                            <FaHeart color="red" className="me-1" />
                          ) : (
                            <FaRegHeart className="me-1" />
                          )}
                          <span style={{ color: "#57b1b2" }}>
                            {likedBlogs[slugblog.uuid_id]?.likes ||
                              slugblog.number_of_likes}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`${style["author-div"]} d-flex flex-md-row flex-column gap-4 my-5`}
                >
                  <img src={slugblog?.author_photo_url} />
                  <div className="pt-2">
                    <p
                      className="fw-semibold text-black"
                      style={{ fontSize: "18px", height: "17px" }}
                    >
                      {slugblog.author_name}
                    </p>
                    <p className="col-md-11 col-12">
                      {slugblog.author_description}
                    </p>
                  </div>
                </div>
                <div>
                  <h3
                    className="text-black pt-lg-4 pt-0"
                    style={{ fontWeight: "600" }}
                  >
                    Comments
                  </h3>
                  <div className={`${style["comment-box"]} col-11`}>
                    <div className={style["comments-list"]}>
                      {comments.map((comment) => (
                        <div
                          key={comment.uuid_id}
                          className={`${style["comment-item"]} my-4`}
                        >
                          <div className="d-flex gap-4">
                            <img
                              src="https://i.pravatar.cc/40?img=3"
                              alt="User  Avatar"
                              className={style["user-avatar"]}
                            />
                            <div>
                              <p
                                className="text-black fw-semibold"
                                style={{ height: "11px" }}
                              >
                                {comment.user || "Anonymous"}
                              </p>
                              <p
                                className={`${style["comments-author-details"]} fw-semibold`}
                              >
                                {new Date(comment.created_at).toLocaleString()}{" "}
                                -
                                <button
                                  onClick={() => setReplyingTo(comment.uuid_id)}
                                  className={style["reply-btn"]}
                                >
                                  Reply
                                </button>
                              </p>
                              <p
                                className={`${style["comment-mainreply"]} fw-semibold`}
                                style={{ fontSize: "14px" }}
                              >
                                {comment.comment}
                              </p>
                            </div>
                          </div>

                          <div className={style["comment-content"]}>
                            {/* Replies Section */}
                            {commentReplies[comment.uuid_id] &&
                              commentReplies[comment.uuid_id].length > 0 && (
                                <div className={style["replies-section"]}>
                                  {commentReplies[comment.uuid_id].map(
                                    (reply) => (
                                      <div
                                        key={reply.uuid_id}
                                        className={`${style["reply-item"]}`}
                                      >
                                        <img
                                          src="https://i.pravatar.cc/40?img=4"
                                          alt="User Avatar"
                                          className={style["user-avatar"]}
                                        />
                                        <strong
                                          style={{
                                            fontSize: "14px",
                                            color: "black",
                                          }}
                                        >
                                          {reply.user || "Anonymous"}
                                        </strong>
                                        <p>
                                          {new Date(
                                            reply.created_at
                                          ).toLocaleString()}
                                        </p>
                                        <div>
                                          <p style={{ fontSize: "14px" }}>
                                            {reply.comment}
                                          </p>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}

                            {/* Reply Input Box */}
                            {replyingTo === comment.uuid_id && (
                              <div
                                className={`${style["comment-input"]} d-flex`}
                              >
                                <textarea
                                  type="text"
                                  className={`${style[""]} col-12`}
                                  placeholder="Enter your reply..."
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                />
                                <button
                                  className={`${style["send-btn"]} col-1`}
                                  style={{ height: "32px" }}
                                  onClick={() => addReply(comment.uuid_id)}
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
                        className={`${style[""]} col-12`}
                        style={{ height: "50px" }}
                        placeholder="Enter your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button
                        className={`${style["send-btn"]} col-1`}
                        onClick={addComment}
                      >
                        <IoMdSend size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="col-11 ms-4">
                <input
                  type="text"
                  placeholder="Search"
                  className={`${style["promo_input"]} col-12`}
                />{" "}
                <span
                  className="bg-white"
                  style={{ marginLeft: "-34px", paddingRight: "32px" }}
                >
                  <FaSearch
                    size={18}
                    color="black"
                    className="position-absolute bg-white"
                    style={{ marginTop: "13px", cursor: "pointer" }}
                  />
                </span>
                <p className={`${style["all-title"]} pt-5 d-lg-block d-none`}>
                  Categories
                </p>
                <div className={`${style["categories"]} d-lg-block d-none`}>
                  {categoriesWithCounts.map((cat) => (
                    <Link href="/blogs" key={cat.uuid_id}>
                      <button
                        className={`col-12 d-flex justify-content-between`}
                      >
                        {cat.category}
                        <span className="">{cat.blogCount}</span>
                      </button>
                    </Link>
                  ))}
                </div>
                <div
                  className={`${style["categories"]} d-lg-none d-block pt-3`}
                >
                  <p
                    className={`${style["title_category"]}`}
                    onClick={toggleCategoryPopup}
                  >
                    Categories
                  </p>
                  {isCategoryPopupOpen && (
                    <div
                      className={`${style["category-popup"]} d-lg-none d-block container`}
                    >
                      <div className={`${style["category-popup-inner"]}`}>
                        <button
                          className={`ms-auto fs-4 text-white col-12 d-flex justify-content-end`}
                          onClick={() => setIsCategoryPopupOpen(false)}
                        >
                          X
                        </button>
                        {categoriesWithCounts.map((cat) => (
                          <Link
                            href="/blogs"
                            key={cat.uuid_id}
                            className="text-decoration-none"
                          >
                            <button
                              className={`col-12 d-flex justify-content-between btn btn-light mb-2`}
                            >
                              {cat.category}
                              <span className="">{cat.blogCount}</span>
                            </button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="d-flex flex-lg-column flex-md-row flex-column gap-lg-0 gap-md-4 gap-0">
                  <div className="col-lg-12 col-md-8 col-12">
                    <p className={`${style["all-title"]} pt-5`}>
                      Featured News
                    </p>
                    {featured.map((features) => (
                      <div
                        key={features.id}
                        className={`${style["featured"]} mb-4`}
                      >
                        <Link href={`/blogs/${features.uuid_id}`}>
                          <div className="d-flex gap-4">
                            <img src={features.main_image_url} />
                            <div>
                              <p
                                style={{
                                  fontWeight: "550",
                                  fontSize: "15px",
                                  height: "10px",
                                }}
                              >
                                {features.creation_date}
                              </p>
                              <p
                                style={{ fontWeight: "500" }}
                                className="text-black"
                              >
                                {features.heading.length > 30
                                  ? features.heading.substring(0, 30) + "..."
                                  : features.heading}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="col-lg-12 col-md-4 col-12">
                    <p
                      className={`${style["all-title"]} pt-lg-4 my-lg-2 my-0 pt-5`}
                    >
                      Tags
                    </p>
                    <div
                      className={`${style["tags"]} row position-relative gap-2 pb-lg-0 pb-3`}
                    >
                      {tags.map((tag) => (
                        <Link href="/blogs">
                          <button
                            className={`position-relative `}
                            style={{ width: "100%", maxWidth: "170px" }}
                            key={tag.uuid_id}
                          >
                            {tag.tag}
                          </button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 d-lg-block d-none pt-5 pb-5"
                  style={{ marginLeft: "-10px" }}
                >
                  <Newsletter />
                </div>
              </div>
            </div>
          </div>
          <div className="d-lg-none d-block" style={{ marginTop: "-30px" }}>
            <div className="pb-lg-0 pt-5 pb-5 mb-lg-0 mb-5 col-12 d-lg-none d-block">
              <Newsletter />
            </div>
          </div>
          <div key={slugblog.uuid_id} className="container">
            <img
              src={slugblog.footer_image_url}
              className="w-100"
              style={{ height: "400px", borderRadius: "10px" }}
              alt="Banner"
            />
            <div
              className="d-flex justify-content-between px-4"
              style={{ marginTop: "-33px" }}
            >
              <p className="text-black-50 ">
                Date: <span className="text-white">19- JAN-2017</span>
              </p>
              <p className="text-black-50 ">
                Tag: <span className="text-white"> Business</span>
              </p>
            </div>
          </div>

          <h1
            className="col-12 d-flex justify-content-center text-black pb-3 pt-4"
            style={{ fontWeight: "600" }}
          >
            Other Blog Posts
          </h1>
          <div className="container-fluid">
            <div className="row pt-2 pb-1">
              <div className="col-md-12">
                <Carousal otherBlogs={blogs} count={5} type="other-blogs" />
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
