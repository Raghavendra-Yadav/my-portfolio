import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const certificateImages = [
  {
    src: '/images/Certificates/Fundamentals.jpg',
    alt: 'Fundamentals Certificate',
  },
  {
    src: '/images/Certificates/HTML.jpg',
    alt: 'HTML Certificate',
  },
  {
    src: '/images/Certificates/IT.jpg',
    alt: 'IT Certificate',
  },
  {
    src: '/images/Certificates/ML.jpg',
    alt: 'ML Certificate',
  },
  {
    src: '/images/Certificates/PHP.jpg',
    alt: 'PHP Certificate',
  },
];

const Certificates = () => {
  return (
    <section
      id="Certificates"
      className="scroll-mt-16 min-h-screen relative !bg-transparent text-black dark:text-white pt-28 pb-16 px-6 overflow-hidden"
    >
      {/* Top blurred gradient blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Bottom blurred gradient blob */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Grain/noise overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/grain.png'), url('/noise.png')",
          opacity: 0.15,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Heading with gradient blur */}
      <div className="text-center mb-12 relative">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-24 rounded-full blur-2xl opacity-60 z-0"
          style={{
            background: 'linear-gradient(90deg, #ff80b5 0%, #9089fc 100%)',
          }}
        />
        <h3
          className="text-4xl font-bold relative z-10"
          style={{ fontFamily: "'Roboto Slab', serif" }}
        >
          Certificates
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto relative z-10">
          &ldquo;Learning never exhausts the mind.&rdquo;
          <br />– Leonardo da Vinci
        </p>
        <hr className="mt-6 border-t-2 border-gray-300 dark:border-gray-600 w-24 mx-auto relative z-10" />
      </div>

      {/* Carousel visually appealing and cohesive */}
      <div className="flex justify-center">
        <div
          className="rounded-2xl shadow-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md transition-all duration-300"
          style={{
            padding: '2rem',
            width: '100%',
            maxWidth: '650px', // Decreased max width to fit image size
            border: '1px solid rgba(144,137,252,0.10)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={3500}
            showStatus={false}
            showIndicators={true}
            className="w-full"
            renderThumbs={() => []}
            swipeable
            emulateTouch
            dynamicHeight={false}
          >
            {certificateImages.map((certificate, index) => (
              <div
                key={index}
                className="flex justify-center items-center"
                style={{ width: '100%', height: '100%' }}
              >
                <img
                  src={certificate.src}
                  alt={certificate.alt}
                  className="rounded-xl shadow-lg max-h-[400px] max-w-[600px] object-contain border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 transition-all duration-300"
                  style={{
                    margin: '0 auto',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
