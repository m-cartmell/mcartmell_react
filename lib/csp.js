import crypto from 'crypto';

export const nonce = crypto.randomBytes(16).toString('base64');
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
};

const { _1, _2, _3, _4, _5, _6, _7, _8, _9 } = src;

export function getCSP() {
  let csp = `default-src 'self';`;
  csp += `script-src 'self' ${
    dev ? `'unsafe-inline' 'unsafe-eval'` : `'nonce-${nonce}'`
  } ${_1} ${_2} ${_3} ${_5} ${_7};`;
  csp += `style-src 'self' ${
    dev ? `'unsafe-inline'` : `'nonce-${nonce}'`
  } ${_4};`;
  csp += `font-src 'self' ${_5};`;
  csp += `frame-src 'self' ${_1};`;
  csp += `connect-src 'self' ${_2} ${_7} ${_9};`;
  csp += `img-src 'self' ${_2} ${_6} ${_8};`;

  return csp;
}
