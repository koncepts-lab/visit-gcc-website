"use client";

import React, { useState, useEffect } from 'react';
import { IoMdSend } from "react-icons/io";
import axios from 'axios';

function Comments({ blogId, style }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [commentReplies, setCommentReplies] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch user details by user_id
  const fetchUserDetails = async (userId) => {
    try {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
      } else if (registerToken) {
        authToken = registerToken;
      }

      if (!authToken) {
        console.error("Authentication token not found");
        return null;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}app/get-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const userData = response.data;
      return userData;
    } catch (err) {
      console.error(`Error fetching user details for ${userId}:`, err);
      return null;
    }
  };

  const fetchComments = async () => {
    try {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
         //console.log("Using login token for fetching packages.");
      } else if (registerToken) {
        authToken = registerToken;
         //console.log("Using register token for fetching packages.");
      }

      if (!authToken) {
        setError("Authentication token not found");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}blogs/${blogId}/comments`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const commentsData = response.data.comments || [];
      
      // Fetch user details for each comment
      const commentsWithUserDetails = await Promise.all(
        commentsData.map(async (comment) => {
          if (comment.user_id) {
            const userData = await fetchUserDetails(comment.user_id);
            return {
              ...comment,
              userDetails: userData
            };
          }
          return comment;
        })
      );
      
      setComments(commentsWithUserDetails);

      // Fetch replies for each comment
      for (const comment of commentsWithUserDetails) {
        await fetchReplies(comment.uuid_id);
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setIsLoading(false);
      setError("Failed to fetch comments");
    }
  };

  const fetchReplies = async (commentId) => {
    try {
      const registerToken = localStorage.getItem("auth_token_register");
      const loginToken = localStorage.getItem("auth_token_login");
      let authToken = null;

      if (loginToken) {
        authToken = loginToken;
         //console.log("Using login token for fetching packages.");
      } else if (registerToken) {
        authToken = registerToken;
         //console.log("Using register token for fetching packages.");
      }

      if (!authToken) {
        setError("Authentication token not found");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}comments/${commentId}/replies`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      
       //console.log(`Replies for comment ${commentId}:`, response.data);

      const repliesData = response.data.replies || [];
      
      // Fetch user details for each reply
      const repliesWithUserDetails = await Promise.all(
        repliesData.map(async (reply) => {
          if (reply.user_id) {
            const userData = await fetchUserDetails(reply.user_id);
            return {
              ...reply,
              userDetails: userData
            };
          }
          return reply;
        })
      );

      setCommentReplies(prev => ({
        ...prev,
        [commentId]: repliesWithUserDetails, 
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
           //console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
           //console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}comments`, {
          blog_id: blogId,
          comment: newComment,
        }, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
         //console.log("Add Comment Response:", response.data);
        
        // Fetch user details for the new comment
        const newCommentData = response.data;
        if (newCommentData.user_id) {
          const userData = await fetchUserDetails(newCommentData.user_id);
          newCommentData.userDetails = userData;
        }
        
        setComments(prev => [...prev, newCommentData]);
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
           //console.log("Using login token for fetching packages.");
        } else if (registerToken) {
          authToken = registerToken;
           //console.log("Using register token for fetching packages.");
        }

        if (!authToken) {
          setError("Authentication token not found");
          setIsLoading(false);
          return;
        }
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}replies`, {
          comment_id: commentId,
          comment: replyText,
        }, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
         //console.log("Add Reply Response:", response.data);
        
        // Fetch user details for the new reply
        const newReplyData = response.data;
        if (newReplyData.user_id) {
          const userData = await fetchUserDetails(newReplyData.user_id);
          newReplyData.userDetails = userData;
        }
        
        setComments(prev => prev.map(comment => {
          if (comment.uuid_id === commentId) {
            const updatedReplies = comment.replies ? [...comment.replies, newReplyData] : [newReplyData];
            return { ...comment, replies: updatedReplies };
          } else {
            return comment;
          }
        }));
        
        // Also update the commentReplies state
        setCommentReplies(prev => ({
          ...prev,
          [commentId]: [...(prev[commentId] || []), newReplyData]
        }));
        
        setReplyingTo(null);
        setReplyText("");
      } catch (err) {
        console.error("Error adding reply:", err);
      }
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchComments();
    }
  }, [blogId]);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3 className='text-black pt-lg-4 pt-0' style={{ fontWeight: '600' }}>Comments</h3>
      <div className={`${style["comment-box"]} col-11`}>
        <div className={style["comments-list"]}>
          {comments.map((comment) => (
            <div key={comment.uuid_id} className={`${style["comment-item"]} my-4`}>
              <div className='d-flex gap-4'>
                <img src="https://i.pravatar.cc/40?img=3" alt="User Avatar" className={style["user-avatar"]} />
                <div>
                  <p className='text-black fw-semibold' style={{ height: '11px' }}>
                    {comment.userDetails ? 
                      `${comment.userDetails.first_name} ${comment.userDetails.last_name}` : 
                      "Anonymous"
                    }
                  </p>
                  <p className={`${style["comments-author-details"]} fw-semibold`}>
                    {new Date(comment.created_at).toLocaleString()} - 
                    <button onClick={() => setReplyingTo(comment.uuid_id)} className={style["reply-btn"]}>Reply</button>
                  </p>
                  <p className={`${style["comment-mainreply"]} fw-semibold`} style={{ fontSize: '14px' }}>{comment.comment}</p>
                </div>
              </div>

              <div className={style["comment-content"]}>
                {/* Replies Section */}
                {commentReplies[comment.uuid_id] && commentReplies[comment.uuid_id].length > 0 && (
                  <div className={style["replies-section"]}>
                    {commentReplies[comment.uuid_id].map((reply) => (
                      <div key={reply.uuid_id} className={`${style["reply-item"]}`}>
                        <img src="https://i.pravatar.cc/40?img=4" alt="User Avatar" className={style["user-avatar"]} />
                        <strong style={{ fontSize: '14px', color: 'black' }}>
                          {reply.userDetails ? 
                            `${reply.userDetails.first_name} ${reply.userDetails.last_name}` : 
                            "Anonymous"
                          }
                        </strong>
                        <p>{new Date(reply.created_at).toLocaleString()}</p>
                        <div>
                          <p style={{ fontSize: '14px' }}>{reply.comment}</p>
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
                      className={`${style['']} col-12`} 
                      placeholder="Enter your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      className={`${style["send-btn"]} col-1`} 
                      style={{ height: '32px' }}
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
            className={`${style['']} col-12`} 
            style={{ height: '50px' }} 
            placeholder="Enter your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className={`${style['send-btn']} col-1`} onClick={addComment}>
            <IoMdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comments;