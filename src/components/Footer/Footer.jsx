import React, { useState } from 'react';
import './Footer.css';
import { SocialIcon } from 'react-social-icons';
import { supabase } from '../../lib/supabaseClient';

function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | { type: 'error', message: string }

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setStatus('loading');

    const { error } = await supabase.from('newsletter').insert([{ email }]);

    if (error) {
      console.error('Supabase error:', error);
      setStatus({
        type: 'error',
        message:
          error.message ||
          'An unexpected error occurred. Please try again later.',
      });
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <footer className="flex flex-col md:flex-row justify-between items-start px-6 py-12 text-sm gap-6">
      {/* Socials */}
      <div className="w-full md:w-[40%] flex flex-col gap-4">
        <p className="font-semibold">Connect with us</p>
        <div className="flex gap-4 text-xl">
          {[
            'https://facebook.com',
            'https://tiktok.com',
            'https://instagram.com/speedball.mag',
            'https://x.com',
          ].map((platform) => (
            <SocialIcon
              key={platform}
              bgColor="#000000"
              url={platform}
              className="social-icon"
              target="_blank"
            />
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="w-full md:w-[60%] flex flex-col gap-4">
        <p className="font-semibold">Join The Community</p>
        <p className="text-xs">
          Sign up for the latest drops, exclusive deals and more
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="EMAIL ADDRESS"
          className="w-64 bg-black border border-white text-white px-4 py-2"
        />
        <button
          onClick={handleSubmit}
          className="w-64 border border-white px-4 py-2 text-white hover:bg-white hover:text-black transition"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'SIGNING UP...' : 'SIGN UP'}
        </button>
        {status === 'success' && (
          <p className="text-green-400 text-xs">You're in!</p>
        )}
        {status?.type === 'error' && (
          <p className="text-red-400 text-xs">{status.message}</p>
        )}

        <p className="text-xs opacity-60 max-w-[16rem]">
          By signing up, you agree to receive emails regarding speedball events
          and merchandise and accept that your personal data will be collected
          and stored for marketing purposes.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
