// NeonFlux Web Analyzer (marketing site)
(function(){
  const res = { issues: [], ok: true };

  // Header glass check
  const nav = document.querySelector('nav');
  if (nav) {
    const bg = getComputedStyle(nav).backgroundColor;
    const hasGlass = /rgba\(11,\s*28,\s*61/.test(bg);
    if (!hasGlass) res.issues.push('Nav missing glass background');
  } else {
    res.issues.push('No <nav> found');
  }

  // Images alt text
  document.querySelectorAll('img').forEach((img) => {
    if (!img.alt) res.issues.push('Image missing alt: ' + (img.src || ''));
  });

  // Base-aware URLs (spot check for absolute site‑internal links)
  try {
    const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) || '/empowernow_info/';
    document.querySelectorAll('a[href^="/"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith(base)) res.issues.push('Link not base-aware: ' + href);
    });
  } catch {}

  // Focus visibility hint
  const focusable = document.querySelectorAll('a,button,[tabindex]');
  if (focusable.length === 0) res.issues.push('No focusable elements detected');

  console.log('NeonFlux Web Analyzer');
  if (res.issues.length) {
    res.ok = false;
    res.issues.forEach((i) => console.warn(' -', i));
  } else {
    console.log('No issues found');
  }
  return res;
})();
