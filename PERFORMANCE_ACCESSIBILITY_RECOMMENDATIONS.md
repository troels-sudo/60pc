# Performance & Accessibility Recommendations for index.html

## 🚀 Performance Optimizations

### 1. **Critical Render Path - Font Loading**
**Current Issue:** Google Fonts are loaded synchronously, blocking render.

**Recommendations:**
- Use `font-display: swap` in the font CSS (already using `display=swap` in URL, but add to CSS)
- Consider self-hosting fonts for better control
- Preload critical font files
- Use `rel="preload"` for font files with `as="font"` and `crossorigin`

**Implementation:**
```html
<link rel="preload" href="https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXpsog.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2" as="font" type="font/woff2" crossorigin>
```

### 2. **Image Optimization - Hero Background**
**Current Issue:** 
- Hero image is 389KB, loaded via CSS background-image
- No lazy loading possible with CSS backgrounds
- No responsive images
- No WebP/AVIF format support

**Recommendations:**
- Convert hero image to WebP/AVIF format (can reduce size by 60-80%)
- Use `<picture>` element with `<img>` for better control
- Implement responsive images with `srcset`
- Add `loading="eager"` for above-the-fold hero (or keep as-is since it's critical)
- Specify image dimensions to prevent layout shift
- Consider using a smaller image for mobile devices

**Implementation:**
```html
<picture>
  <source srcset="assets/img/hero-skyscraper.avif" type="image/avif">
  <source srcset="assets/img/hero-skyscraper.webp" type="image/webp">
  <img src="assets/img/hero-skyscraper.jpg" 
       alt="" 
       class="hero-bg-img"
       width="1920" 
       height="1080"
       loading="eager"
       decoding="async">
</picture>
```

### 3. **CSS Optimization**
**Current Issue:** All styles are inline (good for critical CSS), but could be optimized further.

**Recommendations:**
- Keep critical CSS inline (above-the-fold styles)
- Move non-critical CSS to external file with `media="print"` trick or defer loading
- Minify CSS
- Remove unused CSS rules
- Consider CSS containment for better performance

### 4. **Resource Hints**
**Current Issue:** Only preconnect for fonts, missing other optimizations.

**Recommendations:**
- Add DNS prefetch for external resources
- Add preconnect for any other external domains
- Consider prefetch for likely next page navigation

**Implementation:**
```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://fonts.gstatic.com">
```

### 5. **JavaScript Optimization**
**Current Issue:** No JavaScript visible, but check for any blocking scripts.

**Recommendations:**
- Ensure any JS is deferred or async
- Use `defer` for non-critical scripts
- Consider code splitting if using frameworks

### 6. **Layout Stability (CLS)**
**Current Issue:** No explicit dimensions for hero image, potential layout shift.

**Recommendations:**
- Add explicit width/height to images
- Use aspect-ratio CSS property
- Reserve space for hero image to prevent CLS

### 7. **Caching & Compression**
**Recommendations:**
- Ensure server sends proper cache headers
- Enable gzip/brotli compression
- Use CDN for static assets
- Implement service worker for offline support (if needed)

---

## ♿ Accessibility Improvements

### 1. **Semantic HTML Structure**
**Current Issue:** Using generic `<div>` elements instead of semantic HTML5.

**Recommendations:**
- Use `<header>`, `<nav>`, `<main>`, `<aside>` elements
- Add proper landmark roles if needed
- Use `<section>` for distinct content areas

### 2. **Navigation Accessibility**
**Current Issue:** 
- Navigation links have `href="#"` (not functional)
- No ARIA labels
- No skip navigation link

**Recommendations:**
- Add proper href values to navigation links
- Add `aria-label` to navigation
- Implement skip-to-main-content link
- Use proper link text (avoid "+" prefix if not needed)

**Implementation:**
```html
<a href="#skip-nav" class="skip-link">Skip to main content</a>
<nav aria-label="Main navigation">
  <a href="/about">Learn About Us</a>
  <!-- etc -->
</nav>
```

### 3. **Image Accessibility**
**Current Issue:** Hero image is decorative but loaded via CSS (no alt text possible).

**Recommendations:**
- If decorative: use `<img>` with empty `alt=""`
- If meaningful: provide descriptive alt text
- Consider using `<img>` instead of CSS background for better accessibility

### 4. **Color Contrast**
**Current Issue:** Need to verify contrast ratios.

**Recommendations:**
- Verify WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
- Test red text on white background in CTA button
- Test white text on red gradient background
- Ensure focus indicators are visible

### 5. **Keyboard Navigation**
**Current Issue:** No visible focus styles in inline CSS.

**Recommendations:**
- Add visible focus styles for all interactive elements
- Ensure logical tab order
- Test keyboard-only navigation
- Add focus-visible styles

**Implementation:**
```css
a:focus-visible,
button:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 2px;
}
```

### 6. **ARIA Labels & Roles**
**Current Issue:** Missing ARIA attributes for better screen reader support.

**Recommendations:**
- Add `aria-label` to navigation
- Add `aria-label` to CTA button if needed
- Use `aria-current="page"` for current page link
- Consider `aria-describedby` for complex interactions

### 7. **Meta Information**
**Current Issue:** Missing meta description and other SEO/accessibility meta tags.

**Recommendations:**
- Add meta description
- Add Open Graph tags
- Add Twitter Card tags
- Consider adding theme-color for mobile browsers

**Implementation:**
```html
<meta name="description" content="60 Point Capital provides research-driven investment advisory services for foundations, endowments, family offices and private clients.">
<meta name="theme-color" content="#E74A45">
```

### 8. **Heading Hierarchy**
**Current Issue:** Need to verify proper heading structure.

**Recommendations:**
- Ensure h1 is used once per page (✓ currently correct)
- Verify h2, h3 hierarchy is logical
- Don't skip heading levels

### 9. **Link Text**
**Current Issue:** Links use "+" prefix which may be confusing.

**Recommendations:**
- Use descriptive link text
- Avoid "click here" or ambiguous text
- Consider removing "+" prefix or using icons with proper labels

### 10. **Form Accessibility** (if forms are added)
**Recommendations:**
- Associate labels with inputs
- Provide error messages
- Use proper input types
- Add required field indicators

### 11. **Reduced Motion**
**Current Issue:** No motion preferences handled.

**Recommendations:**
- Respect `prefers-reduced-motion` media query
- Disable animations for users who prefer reduced motion

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 12. **Language & Internationalization**
**Current Issue:** Language is set, but could be improved.

**Recommendations:**
- Ensure `lang` attribute is correct (✓ already set)
- Add `dir` attribute if RTL support needed
- Consider `hreflang` for multi-language sites

---

## 📊 Priority Implementation Order

### High Priority (Immediate Impact)
1. ✅ Fix navigation links (add proper hrefs)
2. ✅ Add semantic HTML5 elements
3. ✅ Add skip navigation link
4. ✅ Optimize hero image (WebP/AVIF conversion)
5. ✅ Add meta description
6. ✅ Add visible focus styles

### Medium Priority (Significant Improvement)
7. ✅ Preload critical fonts
8. ✅ Add ARIA labels to navigation
9. ✅ Convert CSS background to `<img>` for better control
10. ✅ Add image dimensions to prevent CLS
11. ✅ Verify and fix color contrast

### Low Priority (Nice to Have)
12. ✅ Add resource hints (dns-prefetch)
13. ✅ Implement responsive images
14. ✅ Add Open Graph tags
15. ✅ Self-host fonts for better performance

---

## 🧪 Testing Recommendations

1. **Performance Testing:**
   - Use Lighthouse (Chrome DevTools)
   - Test with WebPageTest
   - Check Core Web Vitals (LCP, FID, CLS)
   - Test on slow 3G connection

2. **Accessibility Testing:**
   - Use axe DevTools
   - Test with screen readers (NVDA, JAWS, VoiceOver)
   - Keyboard-only navigation test
   - Color contrast checker (WebAIM)
   - WAVE browser extension

3. **Browser Testing:**
   - Test on multiple browsers
   - Test on mobile devices
   - Test with assistive technologies

---

## 📝 Quick Wins Summary

1. **Add meta description** - 2 minutes
2. **Fix navigation hrefs** - 5 minutes
3. **Add semantic HTML** - 10 minutes
4. **Add skip link** - 5 minutes
5. **Add focus styles** - 10 minutes
6. **Preload fonts** - 5 minutes
7. **Convert hero image to WebP** - 15 minutes (with image optimization tool)

Total: ~1 hour for significant improvements

