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
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    const registerToken = localStorage.getItem("auth_token_register");
    const loginToken = localStorage.getItem("auth_token_login");
    const authToken = loginToken || registerToken;
    return authToken;
  };

  const fetchUserNameById = async (userId) => {
    try {
      const authToken = getAuthToken();
      if (!authToken || !userId) return 'Anonymous';

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}app/get-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const { first_name, last_name } = response.data || {};
      return `${first_name || ''} ${last_name || ''}`.trim() || 'Anonymous';
    } catch (err) {
      console.error(`Error fetching user info for user_id: ${userId}`, err);
      return 'Anonymous';
    }
  };

  const fetchRepliesForComment = async (commentUuid) => {
    try {
      const authToken = getAuthToken();
      if (!authToken) return [];

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}comments/${commentUuid}/replies`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const rawReplies = Array.isArray(response.data)
        ? response.data
        : response.data?.data || response.data?.replies || [];

      const repliesWithNames = await Promise.all(
        rawReplies.map(async (reply) => {
          const userName = await fetchUserNameById(reply.user_id);
          return {
            ...reply,
            user_name: userName
          };
        })
      );

      return repliesWithNames;
    } catch (error) {
      console.error(`Error fetching replies for comment ${commentUuid}:`, error);
      enqueueSnackbar(`Failed to fetch replies`, { variant: "error" });
      return [];
    }
  };

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const authToken = getAuthToken();
      if (!authToken || !blogData?.uuid_id) {
        setError("Missing blog data or auth token.");
        setIsLoading(false);
        return;
      }

      const commentsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}blogs/${blogData.uuid_id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const fetchedComments = commentsResponse.data.comments || [];

      const commentsWithRepliesAndNames = await Promise.all(
        fetchedComments.map(async (comment) => {
          const replies = await fetchRepliesForComment(comment.uuid_id);
          const userName = await fetchUserNameById(comment.user_id);
          return {
            ...comment,
            user_name: userName,
            replies: replies
          };
        })
      );

      setComments(commentsWithRepliesAndNames);
      setIsLoading(false);
    } catch (err) {
      console.error("Error during comment and reply fetch:", err);
      enqueueSnackbar("Failed to fetch comments and replies", { variant: "error" });
      setError("Failed to load comments. Please ensure you are logged in and the blog exists.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogData.uuid_id]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      const authToken = getAuthToken();
      if (!authToken || !blogData?.uuid_id) {
        enqueueSnackbar("Missing auth or blog ID.", { variant: "error" });
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

      const userName = await fetchUserNameById(response.data.data.user_id);

      setComments(prevComments => [
        {
          ...response.data.data,
          user_name: userName,
          replies: []
        },
        ...prevComments,
      ]);

      setNewComment('');
      enqueueSnackbar("Comment posted successfully", { variant: "success" });
    } catch (error) {
      console.error("Error posting comment:", error);
      enqueueSnackbar("Failed to post comment", { variant: "error" });
    }
  };

  const handleReplyToComment = async (commentUuid) => {
    if (!replyText.trim()) return;

    try {
      const authToken = getAuthToken();
      if (!authToken) {
        enqueueSnackbar("Authentication required to post replies.", { variant: "error" });
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

      const userName = await fetchUserNameById(response.data.data.user_id);

      setComments(prevComments =>
        prevComments.map(comment => {
          if (comment.uuid_id === commentUuid) {
            const currentReplies = Array.isArray(comment.replies) ? comment.replies : [];
            return {
              ...comment,
              replies: [...currentReplies, { ...response.data.data, user_name: userName }]
            };
          }
          return comment;
        })
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
        <button className={style["close-btn"]} onClick={onClose}>✖</button>

        {isLoading ? (
          <p className="text-center">Loading comments...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
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
                    style={{ borderBottom: '1px solid grey' }}
                  >
                    <div className={style["comment-header"]}>
                      <img
                        src={"/favicon.ico"}
                        alt="User Avatar"
                        className={style["user-avatar"]}
                      />
                      <strong className='text-black'>{comment.user_name || 'Anonymous'}</strong>
                    </div>
                    <div className={style["comment-content"]}>
                      <p className='pt-1' style={{ fontSize: '14px' }}>{comment.comment}</p>
                      <div className={style["comment-actions"]}>
                        <button
                          onClick={() =>
                            setReplyingTo(replyingTo === comment.uuid_id ? null : comment.uuid_id)
                          }
                          className={style["reply-btn"]}
                        >
                          Reply
                        </button>
                      </div>

                      {comment.replies?.length > 0 && (
                        <div className={`${style["replies-section"]} my-2`}>
                          {comment.replies.map((reply) => (
                            <div key={reply.uuid_id} className={style["reply-item"]}>
                              <img
                                src={"/favicon.ico"}
                                alt="User Avatar"
                                className={style["user-avatar"]}
                              />
                              <div className={style["reply-details"]}>
                                <strong style={{ fontSize: '14px', color: 'black' }}>
                                  {reply.user_name || 'Anonymous'}
                                </strong>
                                {reply.creation_date && reply.creation_time && (
                                  <p className={style["reply-timestamp"]}>
                                    {reply.creation_date} at {reply.creation_time}
                                  </p>
                                )}
                                <p style={{ fontSize: '14px' }}>{reply.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

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
                            style={{ height: '32px' }}
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

            <div className={`${style["comment-input"]} d-flex`}>
              <textarea
                type="text"
                className={`${style['promo_input']} col-10`}
                style={{ height: '50px' }}
                placeholder="Enter your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className={`${style['send-btn']} col-2`}
                style={{ height: '50px', marginLeft: '-2px' }}
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
