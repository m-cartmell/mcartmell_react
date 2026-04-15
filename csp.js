const dev = process.env.NODE_ENV === 'development';

const csp = () => {
  const directives = {
    'default-src': [`'self'`],
    'base-uri': [`'self'`],
    'object-src': [`'none'`],
    'frame-ancestors': [`'none'`],

    'script-src': [
      `'self'`,
      `'sha256-coQXW/idXus2fnwNkAbGVQbUWqfsMiONGSg9GNgEPAw='`,
      ...(dev ? [`'unsafe-eval'`] : []),
      'https://www.google.com',
      'https://*.analytics.google.com',
      'https://www.googletagmanager.com',
      'https://*.gstatic.com',
      'https://*.elfsight.com',
      'https://*.cdninstagram.com',
      'https://*.elfsightcdn.com',
    ],

    'style-src': [`'self'`, `'unsafe-inline'`, 'https://fonts.googleapis.com'],
    'font-src': [`'self'`, 'https://*.gstatic.com'],
    'frame-src': [
      `'self'`,
      'https://www.google.com',
      'https://td.doubleclick.net',
    ],
    'connect-src': [
      `'self'`,
      'https://www.google.com',
      'https://*.analytics.google.com',
      'https://*.gstatic.com',
      'https://*.elfsight.com',
      'https://vitals.vercel-insights.com',
      'https://stats.g.doubleclick.net',
    ],
    'img-src': [
      `'self'`,
      'data:',
      'https://*.analytics.google.com',
      'https://*.cdninstagram.com',
      'https://*.elfsightcdn.com',
      'https://www.google.co.uk',
    ],
    'script-src-attr': [`'none'`],
  };

  if (!dev) {
    directives['upgrade-insecure-requests'] = [];
  }

  return Object.entries(directives)
    .map(([key, value]) => `${key} ${value.join(' ')}`.trim())
    .join('; ');
};

module.exports = { csp };
