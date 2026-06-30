# Reflections with Lillie — Website

Official website for Lillie Riley / Reflections with Lillie.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About Lillie |
| `music.html` | Music (Albums + Singles) |
| `stories.html` | The Stories Behind the Songs |
| `watch.html` | Watch |
| `journal.html` | Reflections Journal |
| `legacy.html` | Legacy |
| `contact.html` | Contact |

## Deployment

This is a **static HTML site** — no build step required.

### Cloudflare Pages
1. Connect your GitHub repository in the Cloudflare Pages dashboard
2. Build command: *(leave blank)*
3. Output directory: `/` (root)
4. Deploy

### GitHub Pages (alternative)
Push the repository and enable GitHub Pages from the root of the main branch.

## File Structure

```
/
├── index.html
├── about.html
├── music.html
├── stories.html
├── watch.html
├── journal.html
├── legacy.html
├── contact.html
├── styles.css
├── script.js
├── privacy.html       (add when ready)
├── terms.html         (add when ready)
└── images/
    ├── lillie-portrait.jpg
    ├── album-1.jpg
    ├── album-2.jpg
    ├── teachers-cover.jpg
    └── og-cover.jpg
```

## Images Needed

Replace these placeholder image paths with real files when available:

- `images/lillie-portrait.jpg` — Lillie's portrait photo
- `images/album-1.jpg` — *Reflections with Lillie* album cover
- `images/album-2.jpg` — *Reflections with Lillie 2* album cover
- `images/teachers-cover.jpg` — *Teachers* single cover
- `images/og-cover.jpg` — Open Graph image (used when sharing on social media, ~1200×630px)

## Links to Update

Search for `PLACEHOLDER` in any HTML file to find all links that need to be updated when real URLs are available:

- Social media: Facebook, Instagram, YouTube
- Streaming: Spotify, Apple Music, Amazon Music, YouTube
- Contact form backend (Formspree recommended): `contact.html`
- Newsletter signup endpoint: `index.html`, `journal.html`
- Video links: `watch.html`

## Technology

- HTML5, CSS3, Vanilla JavaScript — no frameworks, no dependencies
- Google Fonts: Playfair Display, Cormorant Garamond, Montserrat
- Mobile-responsive (hamburger nav at ≤860px)
- Accessible: semantic HTML, ARIA labels, keyboard navigation

---

*Reflections with Lillie — Lillie Riley. Songs that speak to life. Stories that last forever.*
