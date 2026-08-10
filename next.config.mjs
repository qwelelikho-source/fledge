const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'fonts.gstatic.com',
      },
    ],
  },
  // Disable font optimization to avoid network issues during build
  optimizeFonts: false,
  // Increase timeout for font loading
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
