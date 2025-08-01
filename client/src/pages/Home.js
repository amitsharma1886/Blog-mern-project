import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Latest Blog Posts</h1>

      <div className="row">
        {posts.map((post) => (
          <div className="col-md-6 col-lg-4 mb-4" key={post._id}>
            <div className="card h-100 shadow-sm">
              {post.image && (
                <img
                  src={
                    post.image.startsWith("http")
                      ? post.image
                      : `${post.image}`
                  }
                  className="card-img-top"
                  alt="Post"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text text-truncate">{post.content}</p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <Link
                    to={`/post/${post._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Read
                  </Link>

                  <div className="d-flex gap-2 ms-auto">
                    <Link
                      to={`/edit/${post._id}`}
                      className="btn btn-outline-success btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
