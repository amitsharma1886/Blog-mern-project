import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 fixed-bottom">
      <div className="container text-center">
        <span className="fw-bold">© {new Date().getFullYear()} Amit Sharma</span>
      </div>
    </footer>
  );
};

export default Footer;

