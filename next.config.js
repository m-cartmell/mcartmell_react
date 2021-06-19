const { csp } = require('./csp');

module.exports = {
  // Fixes npm packages that depend on `fs` module
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
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
            key: 'X-XSS-Protection',
            value: '1; mode=block',
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
      {
        source: '/portfolio/Status%20Seating',
        destination: '/portfolio/status-seating',
        permanent: true,
      },
      {
        source: '/portfolio/Pride%20&%20Joy',
        destination: '/portfolio/pride-joy',
        permanent: true,
      },
      {
        source: '/portfolio/Fast-Track%20Telecom',
        destination: '/portfolio/fast-track-telecom',
        permanent: true,
      },
      {
        source: '/portfolio/Johnsons%20Jewellers',
        destination: '/portfolio/johnsons-jewellers',
        permanent: true,
      },
      {
        source: '/portfolio/Genie%20Bio%20Clean',
        destination: '/portfolio/genie-bio-clean',
        permanent: true,
      },
      {
        source: '/portfolio/The%20Company%20of%20Master%20Jewellers',
        destination: '/portfolio/the-company-of-master-jewellers',
        permanent: true,
      },
      {
        source: '/portfolio/Wongs%20Jewellers',
        destination: '/portfolio/wongs-jewellers',
        permanent: true,
      },
      {
        source: '/portfolio/Email%20Marketing',
        destination: '/portfolio/email-marketing',
        permanent: true,
      },
      {
        source: '/portfolio/email',
        destination: '/portfolio/email-marketing',
        permanent: true,
      },
      {
        source: '/portfolio/Facets%20Creative',
        destination: '/portfolio/facets-creative',
        permanent: true,
      },
      {
        source: '/portfolio/Oxfam%20Creative%20Concept',
        destination: '/portfolio/oxfam-creative-concept',
        permanent: true,
      },
      {
        source: `/portfolio/'What%20an%20Experience'`,
        destination: '/portfolio/travel',
        permanent: true,
      },
    ];
  },
};
