(function () {
  function fixAttr(el, attr) {
    var v = el.getAttribute(attr);
    if (!v) return;
    if (v.indexOf('/docs/') === 0) {
      el.setAttribute(attr, v.replace('/docs/', ''));
    } else if (v.indexOf('/public/') === 0) {
      el.setAttribute(attr, v.substring(1));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  function run() {
    var nodes = document.querySelectorAll('a[href], link[href], script[src], img[src], video[src], source[src]');
    nodes.forEach(function (el) {
      if (el.hasAttribute('href')) fixAttr(el, 'href');
      if (el.hasAttribute('src')) fixAttr(el, 'src');
    });
  }
})();


