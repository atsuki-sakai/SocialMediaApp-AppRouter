import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 p-5">
      <div className="max-w-md mx-auto">
        <p className="text-center text-xs">
          &copy; social media app {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
