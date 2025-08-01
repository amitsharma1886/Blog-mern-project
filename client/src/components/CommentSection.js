import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios
      .get(`/api/comments/${postId}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error('Error fetching comments:', err));
  }, [postId]);

  const submitComment = () => {
    const userName = localStorage.getItem('userName') || 'Anonymous';
    if (!text.trim()) return;

    axios
      .post('/api/comments', { postId, userName, text })
      .then((res) => {
        setComments((prev) => [...prev, res.data]);
        setText('');
      })
      .catch((err) => console.error('Error posting comment:', err));
  };

  return (
    <div className="mt-5">
      <h5 className="mb-3">Comments</h5>

      {comments.length === 0 && (
        <p className="text-muted">No comments yet. Be the first to comment.</p>
      )}

      {comments.map((c) => (
        <Card key={c._id} className="mb-2 shadow-sm">
          <Card.Body>
            <Card.Subtitle className="mb-1 text-muted">{c.userName}</Card.Subtitle>
            <Card.Text>{c.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}

      <Form>
        <Form.Group controlId="commentTextarea" className="mb-2">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={submitComment}>
          Post Comment
        </Button>
      </Form>
    </div>
  );
}
