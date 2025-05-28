import React from "react";
import "./Footer.css";
import { SocialIcon } from "react-social-icons";

function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-start px-6 py-12 text-sm gap-6">
      {/* Social Media (40% width on desktop) */}
      <div className="w-full md:w-[40%] flex flex-col gap-4">
        <p className="font-semibold">Connect with us</p>
        <div className="flex gap-4 text-xl">
          <SocialIcon
            bgColor="#000000"
            url="https://facebook.com"
            className="social-icon"
          />
          <SocialIcon
            bgColor="#000000"
            url="https://tiktok.com"
            className="social-icon"
          />
          <SocialIcon
            bgColor="#000000"
            url="https://instagram.com"
            className="social-icon"
          />
          <SocialIcon
            bgColor="#000000"
            url="https://x.com"
            className="social-icon"
          />
        </div>
      </div>

      {/* Email Signup (60% width on desktop, but inputs fixed-width) */}
      <div className="w-full md:w-[60%] flex flex-col gap-4">
        <p className="font-semibold">Join The Community</p>
        <p className="text-xs">
          Sign up for the latest drops, exclusive deals and more
        </p>
        <input
          type="email"
          placeholder="EMAIL ADDRESS"
          className="w-64 bg-black border border-white text-white px-4 py-2" // Fixed width
        />
        <button className="w-64 border border-white px-4 py-2 text-white hover:bg-white transition">
          SIGN UP
        </button>
        <p className="text-xs opacity-60 max-w-[16rem]">
          {" "}
          {/* Optional: Constrain disclaimer width */}
          By signing up, you agree to receive emails regarding speedball events
          and merchandise and accept that your personal data will be collected
          and stored for marketing purposes.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
