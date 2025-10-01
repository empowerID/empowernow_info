// NeonFlux Web Analyzer (marketing site)
(function(){
  const res = { issues: [], ok: true, notes: [] };

  // Helpers
  function parseColor(c){
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = c; // normalizes
    const s = ctx.fillStyle; // rgb(a)
    const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if(!m) return [0,0,0];
    return [+m[1],+m[2],+m[3]];
  }
  function luminance([r,g,b]){
    const a=[r,g,b].map(v=>{v/=255;return v<=0.03928? v/12.92: Math.pow((v+0.055)/1.055,2.4)});
    return 0.2126*a[0]+0.7152*a[1]+0.0722*a[2];
  }
  function contrastRatio(fg,bg){
    const L1=luminance(parseColor(fg))+0.05; const L2=luminance(parseColor(bg))+0.05;
    return L1>L2? L1/L2: L2/L1;
  }

  // Detect Unified v2 tokens presence by checking computed CSS vars on :root
  try {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const hasUnified = !!styles.getPropertyValue('--cyan').trim() && !!styles.getPropertyValue('--amber').trim();
    const hasAliases = !!styles.getPropertyValue('--color-accent').trim();
    if (hasUnified && hasAliases) {
      res.notes.push('Unified v2 detected with legacy alias mapping active');
    } else if (hasUnified) {
      res.notes.push('Unified v2 detected (no legacy aliases found)');
    } else {
      res.notes.push('Unified v2 not detected; using legacy tokens');
    }
  } catch {}

  // Header glass
  const nav = document.querySelector('nav');
  if (nav) {
    const bg = getComputedStyle(nav).backgroundColor;
    const hasGlass = /rgba\(11,\s*28,\s*61/.test(bg);
    if (!hasGlass) res.issues.push('Nav missing glass background');
  } else res.issues.push('No <nav> found');

  // Footer links contrast
  const footer = document.querySelector('footer');
  if (footer) {
    const fbg = getComputedStyle(footer).backgroundColor;
    footer.querySelectorAll('a').forEach(a=>{
      const col = getComputedStyle(a).color;
      const ratio = contrastRatio(col,fbg);
      if (ratio < 4.5) res.issues.push(`Footer link contrast ${ratio.toFixed(2)}:1 (<4.5:1)`);
      // underline/focus hint
      const td = getComputedStyle(a).textDecorationLine;
      if (td === 'none') res.notes.push('Footer link has no underline; ensure underline on hover/focus');
    });
  }

  // Images alt
  document.querySelectorAll('img').forEach((img) => { if (!img.alt) res.issues.push('Image missing alt: ' + (img.src || '')); });

  // Base-aware URLs (absolute site-internal)
  try {
    const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) || '/empowernow_info/';
    document.querySelectorAll('a[href^="/"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith(base)) res.issues.push('Link not base-aware: ' + href);
    });
  } catch {}

  // Head/meta checks
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) res.issues.push('Missing canonical link');
  const desc = document.querySelector('meta[name="description"]');
  if (!desc || !(desc.getAttribute('content')||'').trim()) res.issues.push('Missing meta description');
  const h1s = document.querySelectorAll('h1');
  if (h1s.length !== 1) res.issues.push(`H1 count should be 1, found ${h1s.length}`);
  const jsonLd = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  if (jsonLd.length === 0) res.notes.push('No JSON-LD found (ok if page does not need schema)');

  // Report
  console.log('NeonFlux Web Analyzer');
  if (res.issues.length){ res.ok = false; res.issues.forEach(i=>console.warn(' -', i)); }
  else console.log('No issues found');
  if (res.notes.length){ console.log('Notes:'); res.notes.forEach(n=>console.log(' •', n)); }
  return res;
})();
