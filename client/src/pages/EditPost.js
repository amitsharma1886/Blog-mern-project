import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error("Failed to load post:", err));
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/posts/${id}`, post)
      .then(() => {
        alert("✅ Post updated successfully!");
        navigate('/');
      })
      .catch(err => {
        alert("❌ Error updating post");
        console.error(err);
      });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow rounded-4 border-0">
            <Card.Header className="bg-warning text-white text-center fs-3 fw-semibold rounded-top-4">
              ✏️ Edit Post
            </Card.Header>
            <Card.Body className="px-4 py-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    className="rounded-3"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    className="rounded-3"
                    required
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="warning" type="submit" className="fw-semibold fs-5 py-2 rounded-3">
                    ✅ Update Post
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
