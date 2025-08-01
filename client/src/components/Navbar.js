import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function AppNavbar() {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/signin");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm py-3"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-3 text-warning"
          style={{ letterSpacing: "1px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-dribbble"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8m5.284 3.688a6.8 6.8 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A7 7 0 0 1 8 1.18m-2.907.642A43 43 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.87 6.87 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.82 6.82 0 0 1-1.752-4.564zM8 14.837a6.8 6.8 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.3 28.3 0 0 1 1.457 5.18A6.7 6.7 0 0 1 8 14.837m3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.77 6.77 0 0 1-2.924 4.573z"
            />
          </svg>{" "}
          BlogApp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="px-3 fw-semibold"
              style={{ fontSize: "1.1rem" }}
            >
              Home
            </Nav.Link>
            {token && (
              <Nav.Link
                as={Link}
                to="/create"
                className="px-3 fw-semibold"
                style={{ fontSize: "1.1rem" }}
              >
                Create New Post
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center">
            {token ? (
              <>
                <span
                  className="text-light me-3 fw-semibold"
                  style={{ fontSize: "1.1rem" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>{" "}
                  {userName || "User"}
                </span>
                <Button
                  variant="outline-warning"
                  onClick={handleLogout}
                  className="fw-semibold"
                  style={{ fontSize: "1rem" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/signin"
                  className="px-2 fw-semibold"
                  style={{ fontSize: "1.1rem" }}
                >
                  Sign In
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className="px-2 fw-semibold"
                  style={{ fontSize: "1.1rem" }}
                >
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
