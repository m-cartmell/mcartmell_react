const { csp } = require('./csp');

module.exports = {
  // Fixes npm packages that depend on `fs` module
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },

  // Disables x-powered-by
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: csp(),
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/',
        permanent: true,
      },

      // Legacy URLs
      {
        source: '/portfolio/Status Seating',
        destination: '/work/status-seating',
        permanent: true,
      },
      {
        source: '/portfolio/Pride & Joy',
        destination: '/work/pride-joy',
        permanent: true,
      },
      {
        source: '/portfolio/Fast-Track Telecom',
        destination: '/work/fast-track-telecom',
        permanent: true,
      },
      {
        source: '/portfolio/Johnsons Jewellers',
        destination: '/work/johnsons-jewellers',
        permanent: true,
      },
      {
        source: '/portfolio/Genie Bio Clean',
        destination: '/work/genie-bio-clean',
        permanent: true,
      },
      {
        source: '/portfolio/The Company of Master Jewellers',
        destination: '/work/the-company-of-master-jewellers',
        permanent: true,
      },
      {
        source: '/portfolio/Wongs Jewellers',
        destination: '/work/wongs-jewellers',
        permanent: true,
      },
      {
        source: '/portfolio/Email Marketing',
        destination: '/work/email-marketing',
        permanent: true,
      },
      {
        source: '/portfolio/email',
        destination: '/work/email-marketing',
        permanent: true,
      },
      {
        source: `/portfolio/'What an Experience'`,
        destination: '/work/travel',
        permanent: true,
      },

      // Removed project: Facets Creative
      {
        source: '/portfolio/Facets Creative',
        destination: '/',
        permanent: true,
      },
      {
        source: '/portfolio/facets-creative',
        destination: '/',
        permanent: true,
      },
      {
        source: '/work/facets-creative',
        destination: '/',
        permanent: true,
      },

      // Removed project: Oxfam Creative Concept
      {
        source: '/portfolio/Oxfam Creative Concept',
        destination: '/',
        permanent: true,
      },
      {
        source: '/portfolio/oxfam-creative-concept',
        destination: '/',
        permanent: true,
      },
      {
        source: '/work/oxfam-creative-concept',
        destination: '/',
        permanent: true,
      },

      // Catch portfolio URLs
      {
        source: '/portfolio/:slug',
        destination: '/work/:slug',
        permanent: true,
      },

      // Catch /work
      {
        source: '/work',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
