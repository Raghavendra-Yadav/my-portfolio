import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showSent, setShowSent] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonClicked(true);
    setTimeout(() => {
      setButtonClicked(false);
      setSubmitted(true);
      setTimeout(() => setShowSent(true), 900);
    }, 250); // Button animation duration
  };

  return (
    <footer
      id="Contact"
      className="relative min-h-screen border-t border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col justify-center"
    >
      {/* Blurred gradient blobs for background, matching Abilities page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 opacity-30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-400 to-indigo-400 opacity-30 blur-3xl"
      />
      {/* Grain/noise overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/grain.png'), url('/noise.png')",
          opacity: 0.13,
          mixBlendMode: 'overlay',
        }}
      />
      <div className="relative max-w-xl mx-auto px-4 z-10">
        <h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ fontFamily: "'Roboto Slab', serif" }}
        >
          Contact Me
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 italic">
          &ldquo;If I had asked people what they wanted, they would have said
          faster horses.&rdquo;
          <br />- Henry Ford
        </p>
        {submitted ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            {!showSent ? (
              <span className="flex flex-col items-center">
                {/* Envelope flies up */}
                <svg
                  className="mx-auto mb-6 animate-envelope-fly"
                  width="56"
                  height="56"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <rect
                    x="3"
                    y="7"
                    width="18"
                    height="10"
                    rx="2"
                    className="stroke-cyan-400"
                    fill="none"
                  />
                  <polyline
                    points="3,7 12,14 21,7"
                    className="stroke-cyan-400"
                    fill="none"
                  />
                </svg>
                <span
                  className="text-center font-bold text-2xl px-6 py-8"
                  style={{
                    background:
                      'linear-gradient(90deg, #22d3ee 0%, #a78bfa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: "'Roboto Slab', serif",
                    opacity: 0.5,
                  }}
                >
                  Sending...
                </span>
              </span>
            ) : (
              <span
                className="text-center font-bold text-2xl px-6 py-8 animate-message-sent"
                style={{
                  background:
                    'linear-gradient(90deg, #a78bfa 0%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Roboto Slab', serif",
                }}
              >
                Message sent!
                <br />
                Thank you for your message.
                <br />I will get back to you soon.
              </span>
            )}
            <style>
              {`
                @keyframes message-sent {
                  0% {
                    opacity: 0;
                    transform: scale(0.95) translateY(40px);
                  }
                  60% {
                    opacity: 1;
                    transform: scale(1.05) translateY(-8px);
                  }
                  100% {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                  }
                }
                .animate-message-sent {
                  animation: message-sent 0.8s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes envelope-fly {
                  0% {
                    opacity: 1;
                    transform: translateY(0) scale(1) rotate(0deg);
                  }
                  60% {
                    opacity: 1;
                    transform: translateY(-40px) scale(1.08) rotate(-8deg);
                  }
                  100% {
                    opacity: 0;
                    transform: translateY(-120px) scale(0.7) rotate(12deg);
                  }
                }
                .animate-envelope-fly {
                  animation: envelope-fly 0.9s cubic-bezier(.4,0,.2,1) both;
                }
                @keyframes btn-pop {
                  0% { transform: scale(1); opacity: 1; }
                  50% { transform: scale(1.08); opacity: 0.85; }
                  100% { transform: scale(1); opacity: 1; }
                }
                .animate-btn-pop {
                  animation: btn-pop 0.25s cubic-bezier(.4,0,.2,1);
                }
              `}
            </style>
          </div>
        ) : (
          <form
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-lg shadow-lg p-8 space-y-6 relative"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block mb-2 font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-full font-semibold text-white transition
                bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600
                hover:from-pink-500 hover:via-purple-600 hover:to-indigo-700
                shadow-lg relative overflow-visible
                ${buttonClicked ? 'animate-btn-pop' : ''}
              `}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </footer>
  );
};

export default Contact;
