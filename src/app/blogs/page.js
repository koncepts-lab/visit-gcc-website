"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css";
import Banner from "@components/banner/banner";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import axios from "axios";
import { useSnackbar } from "notistack";
import Newsletter from "./newsletter";
import CommentsModal from "./comments";
import { IoIosArrowDown } from "react-icons/io";
import {
  FacebookShareButton,
  LinkedinShareButton,
  ThreadsShareButton,
  TwitterShareButton,
  ThreadsIcon,
} from "react-share";
import { useLoading } from "@components/LoadingProvider";

const ITEMS_PER_PAGE = 3;

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString;
  }
};

function Page() {
  const { enqueueSnackbar } = useSnackbar();
  const { setIsLoading } = useLoading();

  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [tags, setTags] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [activeCommentBlogData, setActiveCommentBlogData] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState({ type: null, id: null });
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const currentBlogs = (filteredBlogs.length > 0 ? filteredBlogs : blogs).slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCloseComments = () => {
    setActiveCommentBlogData(null);
    setIsCommentModalOpen(false);
  };

  const getCommentCount = (blogId) => commentCounts[blogId] || 0;

  const handleLikeBlog = async (blogUuid) => {
    try {
      const authToken =
        localStorage.getItem("auth_token_login") ||
        localStorage.getItem("auth_token_register");
      if (!authToken) {
        setError("Authentication token not found");
        return;
      }
      const currentLikeStatus = likedBlogs[blogUuid]?.isLiked || false;
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}blog/${blogUuid}/like`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      const updatedLikes = response.data.number_of_likes;
      setLikedBlogs((prev) => ({
        ...prev,
        [blogUuid]: { isLiked: !currentLikeStatus, likes: updatedLikes },
      }));
    } catch (err) {
      console.error("Full Error Object:", err);
      enqueueSnackbar(
        `Error: ${err.response?.data?.message || "Failed to like/unlike blog"}`,
        { variant: "error" }
      );
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await Promise.all([
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}blog`)
            .then((response) => {
              setBlogs(response.data.data || response.data || []);
            }),
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}category`)
            .then(async (response) => {
              const allCategories = response.data.data || response.data || [];
              const categoriesWithCounts = await Promise.all(
                allCategories.map(async (category) => {
                  try {
                    const countResponse = await axios.get(
                      `${process.env.NEXT_PUBLIC_API_URL}blog/${category.uuid_id}/get-blogs-by-category`
                    );
                    return {
                      ...category,
                      blogCount: (countResponse.data.data || []).length,
                    };
                  } catch {
                    return { ...category, blogCount: 0 };
                  }
                })
              );
              setCategories(categoriesWithCounts);
            }),
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}blog/get-featured-blogs`, {
              params: { limit: 3 },
            })
            .then((response) => {
              setFeatured(
                (response.data.data || response.data || []).slice(0, 3)
              );
            }),
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}tag`)
            .then((response) => {
              setTags(response.data.data || response.data || []);
            }),
        ]);
      } catch (err) {
        console.error("Error fetching initial page data:", err);
        setError("Failed to load page content. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [setIsLoading]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      enqueueSnackbar("Please enter a search term", { variant: "info" });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}blog/search?q=${searchQuery}`
      );
      setFilteredBlogs(response.data.results || []);
      setCurrentPage(1);
      setActiveFilter({ type: "search", id: searchQuery });
    } catch (err) {
      console.error("Error searching blogs:", err);
      enqueueSnackbar("Failed to perform search", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogsByCategory = async (categoryId) => {
    setSearchQuery("");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}blog/${categoryId}/get-blogs-by-category`
      );
      const categoryBlogs = response.data.data || response.data || [];
      setFilteredBlogs(categoryBlogs);
      setCurrentPage(1);
      setActiveFilter({ type: "category", id: categoryId });
      if (window.innerWidth <= 992) {
        window.scrollBy(0, 900);
      }
    } catch (err) {
      console.error("Error fetching blogs by category:", err);
      enqueueSnackbar("Failed to fetch blogs by category", {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogsByTag = async (tagId) => {
    setSearchQuery("");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}tag/tag/get-by-tag?tag_ids[]=${tagId}`
      );
      setFilteredBlogs(response.data.data || response.data || []);
      setCurrentPage(1);
      setActiveFilter({ type: "tag", id: tagId });
      if (window.innerWidth <= 992) {
        window.scrollBy(0, 400);
      }
    } catch (err) {
      console.error("Error fetching blogs by tag:", err);
      // Specific 404 error handling as requested
      if (err.response && err.response.status === 404) {
        enqueueSnackbar("No blogs found for this tag", { variant: "warning" });
        setFilteredBlogs([]); // Clear previous results
        setCurrentPage(1);
        setActiveFilter({ type: "tag", id: tagId });
      } else {
        // Generic error for other issues
        enqueueSnackbar("Failed to fetch blogs by tag", { variant: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilter = () => {
    setFilteredBlogs([]);
    setCurrentPage(1);
    setActiveFilter({ type: null, id: null });
    setSearchQuery("");
  };

  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const toggleCategoryPopup = () =>
    setIsCategoryPopupOpen(!isCategoryPopupOpen);
  const clearFilterAndCloseCategoryPopup = () => {
    clearFilter();
    setIsCategoryPopupOpen(false);
  };

  if (error) {
    return (
      <div className="container text-center py-5 vh-100">
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <section className={style["blogs-page"]}>
        <div className={`container ${style["blogs-page-container"]} pt-5`}>
          <h1
            className="col-12 d-flex justify-content-center pb-3 text-black"
            style={{ fontWeight: "600" }}
          >
            Blog Page
          </h1>
          <div className=" d-flex flex-lg-row flex-column-reverse gap-xl-4 gap-lg-3 gap-md-4 ">
            <div className="col-lg-8 col-12 ">
              <h1
                className="col-11 d-flex justify-content-center pt-3 pb-3 text-black d-lg-none d-block"
                style={{ fontWeight: "700" }}
              >
                What's On GCC
              </h1>
              {currentBlogs.map((blog) => {
                const shareUrl = `${
                  typeof window !== "undefined" ? window.location.origin : ""
                }/blogs/${blog.uuid_id}`;
                return (
                  <div
                    key={blog.uuid_id}
                    className={` ${style["blog-left-section"]} pb-5 mb-4 `}
                  >
                    <Link href={`/blogs/${blog.uuid_id}`}>
                      <img
                        src={blog?.main_image_url || "/images/placeholder.jpg"}
                        onError={(e) => {
                          e.currentTarget.src = "/images/placeholder.jpg";
                        }}
                        className="w-100"
                        style={{ height: "350px" }}
                        alt="Banner"
                      />
                      <p className={`${style["all-title"]} pt-3 my-2 pb-1`}>
                        {blog.heading}
                      </p>
                      <p className="">
                        Date: <span>{formatDate(blog.creation_date)}</span>
                      </p>
                    </Link>
                    <p style={{ fontSize: "15px" }}>{blog.description1}</p>
                    <div
                      className={`${style["blog-left-button"]} d-flex flex-row justify-content-between col-12 pt-2`}
                    >
                      <p
                        className=" align-content-center align-self-baseline text-black"
                        style={{ height: "10px" }}
                      >
                        Share:   <br className="d-md-none d-block" />
                        <FacebookShareButton url={shareUrl}>
                          <FaFacebookSquare
                            color="#1877F2"
                            size={20}
                            className="me-1"
                          />
                        </FacebookShareButton>
                        <TwitterShareButton url={shareUrl}>
                          <FaSquareXTwitter
                            size={20}
                            color="black"
                            className="me-1"
                          />
                        </TwitterShareButton>
                        <ThreadsShareButton url={shareUrl}>
                          <ThreadsIcon size={18} borderRadius={15} />
                        </ThreadsShareButton>
                        <LinkedinShareButton url={shareUrl}>
                          <FaLinkedin color="#0077B5 " size={20} />
                        </LinkedinShareButton>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-lg-4 col-12">
              <div className="col-11 ms-4">
                <input
                  type="text"
                  placeholder="Search"
                  className={`${style["promo_input"]} col-12`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
                <span
                  className="bg-white"
                  style={{ marginLeft: "-34px", paddingRight: "32px" }}
                >
                  <FaSearch
                    size={18}
                    color="black"
                    className="position-absolute bg-white"
                    style={{ marginTop: "13px", cursor: "pointer" }}
                    onClick={handleSearch}
                  />
                </span>
                {activeFilter.type === "search" && (
                  <button
                    className="col-12 mt-2 btn btn-secondary"
                    onClick={clearFilter}
                  >
                    Clear Search Filter
                  </button>
                )}
                <p className={`${style["all-title"]} pt-5 d-lg-block d-none`}>
                  Categories
                </p>
                <div className={`${style["categories"]} d-lg-block d-none`}>
                  {categories.map((cat) => (
                    <button
                      className={`col-12 d-flex justify-content-between ${
                        activeFilter.type === "category" &&
                        activeFilter.id === cat.uuid_id
                          ? style["active-filter"]
                          : ""
                      }`}
                      key={cat.uuid_id}
                      onClick={() => fetchBlogsByCategory(cat.uuid_id)}
                    >
                      {cat.category}{" "}
                      <span className="pe-1">{cat.blogCount || 0}</span>
                    </button>
                  ))}
                  {activeFilter.type === "category" && (
                    <button
                      className="col-12 mt-2 btn btn-secondary"
                      onClick={clearFilter}
                    >
                      Clear Category Filter
                    </button>
                  )}
                </div>
                <div
                  className={`${style["categories"]} d-lg-none d-block pt-3 position-relative`}
                >
                  <p
                    className={`${style["title_category"]}`}
                    onClick={toggleCategoryPopup}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    Categories
                    <IoIosArrowDown size={16} />
                  </p>

                  {isCategoryPopupOpen && (
                    <div
                      className={` position-absolute w-100 shadow`}
                      style={{
                        top: "100%",
                        left: "0",
                        zIndex: 1000,
                        backgroundColor: "#009597",
                        borderRadius: "8px",
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                    >
                      <div className={`${style["category-popup-inner"]} p-3`}>
                        <button
                          className={`btn-close btn-close-white ms-auto d-block mb-2 bg-transparent border-0`}
                          onClick={() => setIsCategoryPopupOpen(false)}
                          aria-label="Close"
                        ></button>
                        {categories.map((cat) => (
                          <button
                            className={`w-100 d-flex justify-content-between border-0 bg-transparent py-2 px-3 mb-1 rounded ${
                              activeFilter.type === "category" &&
                              activeFilter.id === cat.uuid_id
                                ? "text-dark"
                                : "text-white"
                            }`}
                            key={cat.uuid_id}
                            onClick={() => {
                              fetchBlogsByCategory(cat.uuid_id);
                              setIsCategoryPopupOpen(false);
                            }}
                            style={{
                              transition: "background-color 0.2s",
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor =
                                "rgba(255,255,255,0.1)")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor = "transparent")
                            }
                          >
                            <span>{cat.category}</span>
                            <span
                              className={`badge rounded-pill ${
                                activeFilter.type === "category" &&
                                activeFilter.id === cat.uuid_id
                                  ? "text-dark"
                                  : "text-white"
                              }`}
                            >
                              {cat.blogCount || 0}
                            </span>
                          </button>
                        ))}
                        {activeFilter.type === "category" && (
                          <button
                            className="w-100 mt-2 btn btn-outline-light btn-sm"
                            onClick={clearFilterAndCloseCategoryPopup}
                          >
                            Clear Category Filter
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="d-flex flex-lg-column flex-md-row flex-column gap-lg-0 gap-md-4 gap-0">
                  <div className="col-lg-12 col-md-7 col-12">
                    <p className={`${style["all-title"]} pt-lg-5 pt-2`}>
                      Featured News
                    </p>
                    {featured.map((features) => (
                      <div
                        key={features.uuid_id}
                        className={`${style["featured"]} mb-4`}
                      >
                        <Link href={`/blogs/${features.uuid_id}`} className="col-12">
                          <div className="d-flex gap-4">
                            <div style={{  width: "160px" }}><img
                              src={
                                features?.main_image_url ||
                                "/images/placeholder.jpg"
                              }
                              alt="Feature image"
                              onError={(e) => {
                                e.currentTarget.src = "/images/placeholder.jpg";
                              }}
                              className="w-100"
                              
                            />
                            </div>
                            <div>
                              <p
                                style={{
                                  fontWeight: "550",
                                  fontSize: "15px",
                                  height: "20px",
                                }}
                              >
                                {formatDate(features.creation_date)}
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
                  <div className="col-lg-12 col-md-5 col-12">
                    <p className={`${style["all-title"]} pt-lg-5 pt-3`}>Tags</p>
                    <div
                      className={`${style["tags"]} row position-relative gap-2 pb-lg-0 pb-3`}
                    >
                      {tags.map((tag) => (
                        <button
                          className={`position-relative ${
                            activeFilter.type === "tag" &&
                            activeFilter.id === tag.uuid_id
                              ? style["active-filter"]
                              : ""
                          }`}
                          style={{ width: "100%", maxWidth: "170px" }}
                          key={tag.uuid_id}
                          onClick={() => fetchBlogsByTag(tag.uuid_id)}
                        >
                          {tag.tag}
                        </button>
                      ))}
                      {activeFilter.type === "tag" && (
                        <button
                          className="col-2xl-10 mt-2 btn btn-secondary"
                          onClick={clearFilter}
                        >
                          Clear Tag Filter
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" col-12 d-lg-block d-none pt-5">
                  <Newsletter />
                </div>
              </div>
            </div>
          </div>
          <div className={`${style["paginationbuttons"]}`}>
            {[
              ...Array(
                Math.ceil(
                  (filteredBlogs.length > 0 ? filteredBlogs : blogs).length /
                    ITEMS_PER_PAGE
                )
              ),
            ].map((_, i) => (
              <button
                key={i + 1}
                className={`${currentPage === i + 1 ? style["active"] : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="pb-lg-0 pt-5 pb-5 mb-lg-0 mb-5 col-12 d-lg-none d-block">
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
  );
}

export default Page;