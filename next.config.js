module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333', // Change this if your Sanity Studio runs on a different port
        pathname: '/images/**',
      },
    ],
  },
};
