
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: './',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1070, hash: '09b2bc5aeacecb39a99d7744a3166e6b1114ab7fcd814e185fe354f67f021c20', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 947, hash: 'd031b5a60ad781014cddd0cc92c5d869a78e527130788cc8f9b7ea7f7a180e46', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 13221, hash: '5866626c5cce9bdef8653b1a0c81849353033222119654d989227ab0c59e0f32', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-OO4V32RN.css': {size: 5307, hash: 'ndJoBggVekk', text: () => import('./assets-chunks/styles-OO4V32RN_css.mjs').then(m => m.default)}
  },
};
