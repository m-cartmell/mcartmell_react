const dev = process.env.NODE_ENV === 'development';

const src = {
  _1: 'https://www.google.com',
  _2: 'https://www.google-analytics.com',
  _3: 'https://www.googletagmanager.com',
  _4: 'https://fonts.googleapis.com',
  _5: '*.gstatic.com',
  _6: 'data:',
  _7: '*.elfsight.com',
  _8: 'https://proxy.elfsightcdn.com',
  _9: 'https://api.instacloud.io',
  _10: 'https://vitals.vercel-insights.com',
};

const { _1, _2, _3, _4, _5, _6, _7, _8, _9, _10 } = src;

exports.csp = () => {
  let directive = `default-src 'self';`;
  directive += `script-src 'self' 'unsafe-inline' ${
    dev ? `'unsafe-eval'` : ''
  } ${_1} ${_2} ${_3} ${_5} ${_7};`;
  directive += `style-src 'self' 'unsafe-inline' ${_4};`;
  directive += `font-src 'self' ${_5};`;
  directive += `frame-src 'self' ${_1};`;
  directive += `connect-src 'self' ${_2} ${_7} ${_8} ${_9} ${_10};`;
  directive += `img-src 'self' ${_2} ${_6} ${_8};`;

  return directive;
};
