// CommentsModal.jsx
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import style from './style.module.css';

const CommentsModal = ({ blogData, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch comments for the specific blog
  const fetchComments = async () => {
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
        `${process.env.NEXT_PUBLIC_API_URL}blogs/${blogData.uuid_id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      

      setComments(response.data.comments || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      enqueueSnackbar("Failed to fetch comments", { variant: "error" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogData.uuid_id]);

  // Post a new comment
  const handlePostComment = async () => {
    if (!newComment.trim()) return;

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
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}comments`,
        {
          blog_id: blogData.uuid_id,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      

      // Add the new comment to the list
      setComments(prevComments => [
        ...prevComments, 
        {
          ...response.data.data,
          replies: []
        }
      ]);

      setNewComment('');
      enqueueSnackbar("Comment posted successfully", { variant: "success" });
    } catch (error) {
      console.error("Error posting comment:", error);
      enqueueSnackbar("Failed to post comment", { variant: "error" });
    }
  };

  // const handleLikeComment = async (commentUuid) => {
  //   try {
  //     const authToken = localStorage.getItem("auth_token_register");
  
  //     if (!authToken) {
  //       enqueueSnackbar("Authentication required", { variant: "error" });
  //       return;
  //     }
  
  //     const response = await axios.put(
  //       `${process.env.NEXT_PUBLIC_API_URL}comments/${commentUuid}/like`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authToken}`,
  //         },
  //       }
  //     );
  
  //     // Update the comments list with the new like count
  //     setComments(prevComments =>
  //       prevComments.map(comment =>
  //         comment.uuid_id === commentUuid
  //           ? {
  //               ...comment,
  //               likes: response.data.number_of_likes, // Update like count
  //               is_liked: !comment.is_liked, // Toggle liked state
  //             }
  //           : comment
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error liking comment:", error);
  //     enqueueSnackbar("Failed to like comment", { variant: "error" });
  //   }
  // };
  

  const handleReplyToComment = async (commentUuid) => {
    if (!replyText.trim()) return;

    try {
      const registerToken = localStorage.getItem("auth_token_register");
    const loginToken = localStorage.getItem("auth_token_login");
    let authToken = null;

   if (loginToken) {
      authToken = loginToken;
    }
    else if (registerToken) {
      authToken = registerToken;
    } 

    if (!authToken) {
      setError("Authentication token not found");
      setIsLoading(false);
      return;
    }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}replies`,
        {
          comment_id: commentUuid,
          comment: replyText
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setComments(prevComments => 
        prevComments.map(comment => 
          comment.uuid_id === commentUuid 
            ? { 
                ...comment, 
                replies: [...(comment.replies || []), response.data.data] 
              } 
            : comment
        )
      );

      setReplyText('');
      setReplyingTo(null);
      enqueueSnackbar("Reply posted successfully", { variant: "success" });
    } catch (error) {
      console.error("Error posting reply:", error);
      enqueueSnackbar("Failed to post reply", { variant: "error" });
    }
  };

  return (
    <div className={style["comment-modal"]}>
      <div className={style["comment-box"]}>
        <h3 className={`${style["modal-title"]} text-black`}>Comments</h3>
        <button className={style["close-btn"]} onClick={onClose}>
          ✖
        </button>
        {isLoading ? (
          <p className="text-center">Loading comments...</p>
        ) : (
          <>
            <div className={style["comments-list"]}>
            {comments.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
                comments.map((comment) => (
                  <div 
                    key={comment.uuid_id} 
                    className={`${style["comment-item"]} my-4 pb-2`} 
                    style={{borderBottom: '1px solid grey'}}
                  >
                    <img
                      src={comment.user?.avatar || "/default-avatar.png"}
                      alt="User Avatar"
                      className={style["user-avatar"]}
                    />
                    <strong className='text-black'>{comment.user?.name || 'Anonymous'}</strong>
                    <div className={style["comment-content"]}>
                      <p className='pt-1' style={{fontSize: '14px'}}>{comment.comment}</p>
                      <div className={style["comment-actions"]}>
                      {/* <button
                        onClick={() => handleLikeComment(comment.uuid_id)}
                        className={style["like-btn"]}
                        style={{ fontSize: '14px' }}
                      >
                        {comment.is_liked ? <FaHeart size={12} color="red" /> : <FaRegHeart size={12} />}
                        {comment.likes || 0}
                      </button> */}

                        <button
                          onClick={() => 
                            setReplyingTo(
                              replyingTo === comment.uuid_id ? null : comment.uuid_id
                            )
                          }
                          className={style["reply-btn"]}
                        >
                          Reply
                        </button>
                      </div>

                      {/* Replies Section */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className={`${style["replies-section"]} my-2`}>
                          {comment.replies.map((reply) => (
                            <div key={reply.uuid_id} className={style["reply-item"]}>
                              <img
                                src={reply.user?.avatar || "/default-avatar.png"}
                                alt="User Avatar"
                                className={style["user-avatar"]}
                              />
                              <strong style={{fontSize: '14px',color:'black'}}>
                                {reply.user?.name || 'Anonymous'}
                              </strong>
                              <div>
                                <p style={{fontSize: '14px'}}>{reply.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input Box */}
                      {replyingTo === comment.uuid_id && (
                        <div className={`${style["comment-input"]} d-flex`}>
                          <textarea
                            type="text"
                            className={`${style['promo_input']} col-lg-10 col-10`}
                            placeholder="Enter your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <button
                            className={`${style["send-btn"]} col-2`}
                            onClick={() => handleReplyToComment(comment.uuid_id)}
                          >
                            <IoMdSend size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Main Comment Input */}
            <div className={`${style["comment-input"]} d-flex`}>
              <textarea
                type="text"
                className={`${style['promo_input']} col-10`}
                style={{height: '50px'}}
                placeholder="Enter your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button 
                className={`${style['send-btn']} col-2`} 
                style={{height: '50px', marginLeft: '-2px'}} 
                onClick={handlePostComment}
              >
                <IoMdSend size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentsModal;
