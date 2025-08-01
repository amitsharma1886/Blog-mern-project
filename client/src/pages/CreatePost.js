import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (imageFile) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', imageFile);

      await axios.post('/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else if (imageUrl) {
      await axios.post('/api/posts', {
        title,
        content,
        image: imageUrl,
      });
    } else {
      await axios.post('/api/posts', {
        title,
        content,
        image: '',
      });
    }

    alert(" Post created!");
    setTitle('');
    setContent('');
    setImageFile(null);
    setImageUrl('');
  } catch (err) {
    console.error(err);
    alert(" Failed to create post");
  }
};

    

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow rounded-4 border-0">
            <Card.Header className="bg-primary text-white text-center fs-3 fw-semibold rounded-top-4">
               Create New Post
            </Card.Header>
            <Card.Body className="px-4 py-4">
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter post title"
                    className="rounded-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Write your content here..."
                    className="rounded-3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="rounded-3"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-medium">Or Paste Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className="rounded-3"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    className="fw-semibold py-2 fs-5 rounded-3"
                  >
                     Create Post
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
