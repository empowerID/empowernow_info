(function () {
  function repoPrefix() {
    var path = window.location.pathname;
    // If served via *.github.io/<repo>/..., prefix is "/<repo>/"; otherwise root
    var parts = path.split('/').filter(Boolean);
    if (window.location.hostname.endsWith('github.io') && parts.length > 0) {
      return '/' + parts[0] + '/';
    }
    return '/';
  }

  function fixAttr(el, attr) {
    var v = el.getAttribute(attr);
    if (!v) return;
    if (v.indexOf('/docs/') === 0) {
      el.setAttribute(attr, repoPrefix() + v.slice('/docs/'.length));
    } else if (v.indexOf('/public/') === 0) {
      el.setAttribute(attr, repoPrefix() + v.slice(1));
    }
  }

  function run() {
    var nodes = document.querySelectorAll('a[href], link[href], script[src], img[src], video[src], source[src]');
    nodes.forEach(function (el) {
      if (el.hasAttribute('href')) fixAttr(el, 'href');
      if (el.hasAttribute('src')) fixAttr(el, 'src');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();


