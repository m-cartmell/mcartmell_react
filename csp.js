const dev = process.env.NODE_ENV === 'development';

const src = {
  _1: 'https://www.google.com',
  _2: 'https://*.google-analytics.com',
  _3: 'https://www.googletagmanager.com',
  _4: 'https://fonts.googleapis.com',
  _5: 'https://*.gstatic.com',
  _6: 'data:',
  _7: 'https://*.elfsight.com',
  _8: 'https://vitals.vercel-insights.com',
  _9: 'https://*.cdninstagram.com',
  _10: 'https://*.elfsightcdn.com',
};

const { _1, _2, _3, _4, _5, _6, _7, _8, _9, _10 } = src;

exports.csp = () => {
  let directive = `default-src 'self';`;
  directive += `script-src 'self' 'unsafe-inline' ${
    dev ? `'unsafe-eval'` : ''
  } ${_1} ${_2} ${_3} ${_5} ${_7} ${_9} ${_10};`;
  directive += `style-src 'self' 'unsafe-inline' ${_4};`;
  directive += `font-src 'self' ${_5};`;
  directive += `frame-src 'self' ${_1};`;
  directive += `connect-src 'self' ${_2} ${_3} ${_7} ${_8};`;
  directive += `img-src 'self' ${_2} ${_6} ${_9} ${_10};`;

  return directive;
};
