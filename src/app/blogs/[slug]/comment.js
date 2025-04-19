import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdSend } from "react-icons/io";
import style from './style.module.css';

function CommentsSection({ blogSlug, blogUuid }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentReplies, setCommentReplies] = useState({});

  // Fetch comments for the blog
  useEffect(() => {
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
          `${process.env.NEXT_PUBLIC_API_URL}blogs/${blogSlug}/comments`, 
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          }
        );

        setComments(response.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [blogSlug]);

  // Fetch replies for a specific comment
  const fetchRepliesForComment = async (commentUuid) => {
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
        `${process.env.NEXT_PUBLIC_API_URL}comments/${commentUuid}/replies`, 
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
      );

      // Store replies for this specific comment
      setCommentReplies(prev => ({
        ...prev,
        [commentUuid]: response.data || []
      }));
    } catch (error) {
      console.error(`Error fetching replies for comment ${commentUuid}:`, error);
    }
  };

  // Post a new comment
  const addComment = async () => {
    if (newComment.trim() === "") return;

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
          blog_id: blogUuid,
          comment: newComment
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
      );

      // Assuming the response includes the new comment details
      // Add the new comment to the comments list
      setComments(prev => [...prev, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Post a reply to a specific comment
  const addReply = async (commentUuid) => {
    if (replyText.trim() === "") return;

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
        `${process.env.NEXT_PUBLIC_API_URL}replies`, 
        {
          comment_id: commentUuid,
          comment: replyText
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
      );

      // Fetch updated replies for this comment
      await fetchRepliesForComment(commentUuid);
      
      setReplyingTo(null);
      setReplyText("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  // Toggle reply input for a comment
  const handleReplyToggle = (commentUuid) => {
    // If toggling on, fetch replies for this comment
    if (replyingTo !== commentUuid) {
      fetchRepliesForComment(commentUuid);
    }
    
    setReplyingTo(prevReplyingTo => 
      prevReplyingTo === commentUuid ? null : commentUuid
    );
  };

  return (
    <div>
      <h3 className='text-black pt-lg-4 pt-0' style={{ fontWeight: '600' }}>Comments</h3>
      <div className={`${style["comment-box"]} col-11`}>
        <div className={style["comments-list"]}>      
        {comments.length === 0 ? (
            <div 
              className={`${style["no-comments-container"]} d-flex flex-column align-items-center justify-content-center text-center p-5`}
            >
              <IoMdChatbubbles 
                size={80} 
                className="mb-4" 
                style={{ color: '#6c757d', opacity: 0.6 }}
              />
              <h4 className="text-black mb-3">No Comments Yet</h4>
              <p className="text-muted mb-4">
                Be the first to share your thoughts about this blog post!
                Your insights could spark an interesting discussion.
              </p>
              <div 
                className="alert alert-light border d-inline-block px-4 py-2" 
                style={{ 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '20px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                <strong>Tip:</strong> Click below to start the conversation
              </div>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.uuid_id} className={`${style["comment-item"]} my-4`}>
                <div className='d-flex gap-4'>
                  <img
                    src={comment.user_avatar || "https://i.pravatar.cc/40?img=3"}
                    alt="User Avatar"
                    className={style["user-avatar"]}
                  />
                  <div>
                    <p className='text-black fw-semibold' style={{height: '11px'}}>{comment.user_name}</p>
                    <p className={`${style["comments-author-details"]} fw-semibold`}>
                      {comment.creation_date} at {comment.creation_time} - 
                      <button 
                        onClick={() => handleReplyToggle(comment.uuid_id)}
                        className={style["reply-btn"]}
                      >
                        Reply
                      </button>
                    </p>
                    <p className={`${style["comment-mainreply"]} fw-semibold`} style={{ fontSize: '14px' }}>
                      {comment.comment}
                    </p>
                  </div>
                </div>
            
                <div className={style["comment-content"]}>
                  {/* Replies Section */}
                  {commentReplies[comment.uuid_id] && commentReplies[comment.uuid_id].length > 0 && (
                    <div className={style["replies-section"]}>
                      {commentReplies[comment.uuid_id].map((reply, index) => (
                        <div key={reply.uuid_id} className={`${style["reply-item"]}`}>
                          <img
                            src={reply.user_avatar || "https://i.pravatar.cc/40?img=4"}
                            alt="User Avatar"
                            className={style["user-avatar"]}
                          />
                          <strong style={{ fontSize: '14px', color: 'black' }}>{reply.user_name}</strong>
                          <p>{reply.creation_date} at {reply.creation_time}</p>
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
                        style={{height: '32px'}}
                        onClick={() => addReply(comment.uuid_id)}
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
            className={`${style['']} col-12`} 
            style={{ height: '50px' }} 
            placeholder="Enter your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button 
            className={`${style['send-btn']} col-1`}  
            onClick={addComment}
          >
            <IoMdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentsSection;