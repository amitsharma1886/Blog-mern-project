import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Spinner,
  Alert,
  Form,
  Button,
  Card,
} from 'react-bootstrap';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
        console.log("Image value:", res.data.image); // Debug image
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Error fetching post");
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const userName = localStorage.getItem("userName") || "Guest";

    try {
      setLoading(true);
      await axios.post(`/api/posts/${id}/comment`, {
        user: userName,
        text: commentText,
      });
      setCommentText('');

      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error adding comment:", err);
      alert("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!post) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Container className="my-4">
      <h3 className="mb-3" style={{ fontWeight: '600' }}>{post.title}</h3>

      <img
        src={
          post.image?.startsWith("http")
            ? post.image
            : post.image
              ? `http://localhost:5000${post.image}`
              : "https://www.digitalclassworld.com/blog/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg"
        }
        alt={post.title || "Post Image"}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://www.digitalclassworld.com/blog/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg";
        }}
        style={{
          width: '100%',
          maxHeight: '400px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '1rem',
        }}
      />

      <p style={{ fontSize: '1rem', color: '#444' }}>{post.content}</p>

      <hr className="my-4" />

      <h5 className="mb-3">Comments</h5>

      {post.comments?.length > 0 ? (
        post.comments.map((comment, index) => (
          <Card key={index} className="mb-2 shadow-sm border-0 bg-light">
            <Card.Body className="py-2 px-3">
              <strong>{comment.user}</strong>
              <div style={{ fontSize: '0.95rem' }}>{comment.text}</div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No comments yet.</p>
      )}

      <Form onSubmit={handleCommentSubmit} className="mt-4">
        <Form.Group controlId="commentText">
          <Form.Label style={{ fontWeight: '500' }}>Add a Comment</Form.Label>
          <Form.Control
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write something..."
            required
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </Form>
    </Container>
  );
}
