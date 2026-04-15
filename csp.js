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

      // Vercel Analytics
      'https://va.vercel-scripts.com',

      // reCAPTCHA
      'https://www.google.com',
      'https://www.gstatic.com',

      // other embeds
      'https://*.elfsight.com',
      'https://*.cdninstagram.com',
      'https://*.elfsightcdn.com',
    ],

    'style-src': [`'self'`, `'unsafe-inline'`, 'https://fonts.googleapis.com'],

    'font-src': [`'self'`, 'https://fonts.gstatic.com'],

    'frame-src': [
      `'self'`,
      'https://www.google.com',
      'https://recaptcha.google.com',
    ],

    'connect-src': [
      `'self'`,
      'https://vitals.vercel-insights.com',
      'https://www.google.com',
      'https://*.elfsight.com',
    ],

    'img-src': [
      `'self'`,
      'data:',
      'https://*.cdninstagram.com',
      'https://*.elfsightcdn.com',
      'https://www.gstatic.com',
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
