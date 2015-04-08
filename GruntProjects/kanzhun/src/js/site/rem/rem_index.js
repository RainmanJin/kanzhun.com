require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});

require(['c/auth_dialog','c/mini_search', 'c/assist/sidebar'], function () {});