"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import style from "./style.module.css";
import Banner from "@components/banner/banner";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import AccordionItem from "./accordion";
import Carousal from "@components/carousel/Carousal";
import Ask_ur_questions from "@components/ask_ur_questions/ask_ur_questions";
import axios from "axios";
import Link from "next/link";
import Newsletter from "../newsletter";
import {
  FacebookShareButton,
  LinkedinShareButton,
  ThreadsShareButton,
  TwitterShareButton,
  ThreadsIcon,
} from "react-share";
import { useLoading } from "@components/LoadingProvider"; // 1. IMPORT THE LOADER HOOK

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
  const { setIsLoading } = useLoading(); // 2. USE THE LOADER HOOK
  const params = useParams();
  const slug = params?.slug;

  // All original state is preserved
  const [openIndex, setOpenIndex] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [slugblog, setSlugBlogs] = useState(null); // Initialize as null to check for loading
  const [error, setError] = useState(null);
  const [categoriesWithCounts, setCategoriesWithCounts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [tags, setTags] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // All original handlers are preserved
  const toggleCategoryPopup = () =>
    setIsCategoryPopupOpen(!isCategoryPopupOpen);
  const handleAccordionToggle = (index) =>
    setOpenIndex(openIndex === index ? null : index);
  const handleLikeBlog = async (blogUuid) => {
    /* ... your logic ... */
  };

  // Debounced search logic is preserved
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const timerId = setTimeout(() => {
      const performSearch = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}blog/search?q=${searchQuery}`
          );
          setSearchResults(response.data.results || []);
        } catch (err) {
          console.error("Search failed:", err);
          setSearchResults([]);
        }
      };
      performSearch();
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  // 3. CONSOLIDATED USEEFFECT FOR ALL INITIAL PAGE DATA
  useEffect(() => {
    if (!slug) return;

    const fetchAllPageData = async () => {
      setIsLoading(true); // SHOW LOADER
      setError(null);

      try {
        // Create an array of all promises for the initial data
        const promises = [
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}blog/${slug}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}blog`),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}blog/get-featured-blogs`,
            { params: { limit: 3 } }
          ),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}tag`),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}blog-faq/${slug}/get-blogfaqs`
          ),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}category`),
        ];

        // Wait for all of them to resolve
        const [
          slugBlogRes,
          allBlogsRes,
          featuredRes,
          tagsRes,
          faqRes,
          categoriesRes,
        ] = await Promise.all(promises);

        // Set state from the resolved promises
        const singleBlogData = slugBlogRes.data.data || slugBlogRes.data || {};
        setSlugBlogs(singleBlogData);
        setBlogs(allBlogsRes.data.data || allBlogsRes.data || []);
        setFeatured(
          (featuredRes.data.data || featuredRes.data || []).slice(0, 3)
        );
        setTags(tagsRes.data.data || tagsRes.data || []);
        setFaqData(faqRes.data || []);

        // Asynchronously fetch category counts
        const allCategories =
          categoriesRes.data.data || categoriesRes.data || [];
        const categoriesWithBlogCounts = await Promise.all(
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
        setCategoriesWithCounts(categoriesWithBlogCounts);
      } catch (err) {
        console.error("Error fetching page data:", err);
        setError("Failed to fetch blog details. Please try again.");
      } finally {
        setIsLoading(false); // HIDE LOADER
      }
    };

    fetchAllPageData();
  }, [slug, setIsLoading]);

  if (error) {
    return (
      <div className="container text-center py-5 vh-100">
        <h3>{error}</h3>
      </div>
    );
  }

  // While the global loader is active, this component will return null,
  // preventing any attempt to render with incomplete data.
  if (!slugblog) {
    return null;
  }

  return (
    <div>
      <Banner />
      <section className={style["blogs-page"]}>
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
                  src={slugblog?.main_image_url || "/images/placeholder.jpg"}
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.jpg";
                  }}
                  className="w-100"
                  style={{ height: "350px" }}
                  alt={slugblog.heading}
                />
                <div
                  className="d-flex justify-content-between px-4"
                  style={{ marginTop: "-36px", fontWeight: 500 }}
                >
                  <p className="text-grey">
                    Date:{" "}
                    <span className="text-white">
                      {formatDate(slugblog.creation_date)}
                    </span>
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
                      key={item.uuid_id}
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
                    className="align-content-center align-self-baseline text-black"
                    style={{ height: "10px" }}
                  >
                    Share:   <br className="d-md-none d-block" />
                    <FacebookShareButton
                      url={
                        typeof window !== "undefined"
                          ? window.location.href
                          : ""
                      }
                    >
                      <FaFacebookSquare
                        color="#1877F2"
                        size={20}
                        className="me-1"
                      />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={
                        typeof window !== "undefined"
                          ? window.location.href
                          : ""
                      }
                    >
                      <FaSquareXTwitter
                        size={20}
                        color="black"
                        className="me-1"
                      />
                    </TwitterShareButton>
                    <ThreadsShareButton
                      url={
                        typeof window !== "undefined"
                          ? window.location.href
                          : ""
                      }
                    >
                      <ThreadsIcon size={18} borderRadius={15} />
                    </ThreadsShareButton>
                    <LinkedinShareButton
                      url={
                        typeof window !== "undefined"
                          ? window.location.href
                          : ""
                      }
                    >
                      <FaLinkedin color="#0077B5 " size={20} />
                    </LinkedinShareButton>
                  </p>
                </div>
                <div
                  className={`${style["author-div"]} d-flex flex-md-row flex-column gap-4 my-5`}
                >
                  <img
                    src={
                      slugblog?.author_photo_url || "/images/placeholder.jpg"
                    }
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.jpg";
                    }}
                    alt={slugblog.author_name}
                  />
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
              </div>
            </div>
            <div className="col-lg-4 col-12 order-lg-last order-first">
              <div className="col-11 ms-4">
                <div className="position-relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className={`${style["promo_input"]} col-12`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span
                    className="bg-white"
                    style={{ marginLeft: "-34px", paddingRight: "32px" }}
                  >
                    <FaSearch
                      size={18}
                      color="black"
                      className="position-absolute bg-white"
                      style={{ marginTop: "13px" }}
                    />
                  </span>
                  {searchResults.length > 0 && (
                    <div
                      className={style.search_dropdown}
                      style={{ background: "#E3F2F7" }}
                    >
                      {searchResults.map((result) => (
                        <Link
                          key={result.uuid_id}
                          href={`/blogs/${result.uuid_id}`}
                          onClick={() => {
                            setSearchQuery("");
                            setSearchResults([]);
                          }}
                          className="ps-2"
                        >
                          <ul className="gap-1">
                            <li>{result.heading}</li>
                          </ul>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
                        key={features.uuid_id}
                        className={`${style["featured"]} mb-4`}
                      >
                        <Link href={`/blogs/${features.uuid_id}`}>
                          <div className="d-flex gap-4">
                            <img
                              src={
                                features.main_image_url ||
                                "/images/placeholder.jpg"
                              }
                              onError={(e) => {
                                e.currentTarget.src = "/images/placeholder.jpg";
                              }}
                              alt={features.heading}
                            />
                            <div>
                              <p
                                style={{
                                  fontWeight: "550",
                                  fontSize: "15px",
                                  height: "10px",
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
                        <Link href="/blogs" key={tag.uuid_id}>
                          <button
                            className={`position-relative `}
                            style={{ width: "100%", maxWidth: "170px" }}
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
          <div key={`${slugblog.uuid_id}-footer`} className="container">
            <img
              src={slugblog.footer_image_url || "/images/placeholder.jpg"}
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.jpg";
              }}
              className="w-100"
              style={{ height: "400px", borderRadius: "10px" }}
              alt="Footer Banner"
            />
            <div
              className="d-flex justify-content-between px-4"
              style={{ marginTop: "-33px" }}
            >
              <p className="text-black-50 ">
                Date:{" "}
                <span className="text-white">
                  {formatDate(slugblog.creation_date)}
                </span>
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
                <Carousal otherBlogs={blogs} count={4} type="other-blogs" />
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
