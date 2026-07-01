/**
 * Reflections with Lillie — script.js v4
 *
 * Kept deliberately quiet.
 * No libraries. No frameworks. Just purposeful behavior.
 *
 * 1. Copyright year
 * 2. Header: transparent → solid on scroll
 * 3. Mobile navigation drawer
 * 4. Scroll reveal (fade-up on enter)
 * 5. Hero text entrance animations
 * 6. Newsletter form
 */

'use strict';

/* ─── 1. Copyright year ─────────────────────────────── */
const yearEl = document.getElementById('copy-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ─── 2. Header transparency ────────────────────────── */
const header = document.getElementById('site-header');

const tickHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 55);
};
window.addEventListener('scroll', tickHeader, { passive: true });
tickHeader(); // initial state


/* ─── 3. Mobile navigation ──────────────────────────── */
const toggle  = document.getElementById('nav-toggle');
const nav     = document.getElementById('main-nav');
const navClose = document.getElementById('nav-close');

function openNav() {
  nav.classList.add('open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close menu');
  document.body.style.overflow = 'hidden';
  // Move focus into nav for keyboard users
  const firstLink = nav.querySelector('a');
  if (firstLink) firstLink.focus();
}

function closeNav() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  document.body.style.overflow = '';
  toggle.focus();
}

toggle.addEventListener('click', () =>
  nav.classList.contains('open') ? closeNav() : openNav()
);

if (navClose) navClose.addEventListener('click', closeNav);

// Close on nav link click
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// Close on backdrop click
document.addEventListener('click', e => {
  if (nav.classList.contains('open') &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)) {
    closeNav();
  }
});

// Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
});


/* ─── 4. Scroll reveal ──────────────────────────────── */
// Elements marked .reveal fade up as they enter the viewport.
// Stagger siblings that share a parent (doors, music cards, pillars).

if ('IntersectionObserver' in window) {
  const revealItems = document.querySelectorAll('.reveal');

  revealItems.forEach(el => {
    // Apply data-stagger delay for siblings (music cards, pillars)
    const delay = el.dataset.stagger !== undefined
      ? parseInt(el.dataset.stagger) * 120
      : 0;
    el.style.transitionDelay = `${delay}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.10,
    rootMargin: '0px 0px -50px 0px'
  });

  revealItems.forEach(el => observer.observe(el));
} else {
  // Fallback: just show everything
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
}


/* ─── 5. Hero text entrance ─────────────────────────── */
// .reveal-hero elements are animated with CSS delays baked
// into the HTML via data-delay attributes.
const heroEls = document.querySelectorAll('.reveal-hero');

if (heroEls.length) {
  // Small requestAnimationFrame delay so CSS transitions fire after paint
  requestAnimationFrame(() => {
    setTimeout(() => {
      heroEls.forEach(el => {
        const delay = parseInt(el.dataset.delay || 0);
        el.style.transition = `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`;
        el.classList.add('in');
      });
    }, 80);
  });
} else {
  // No hero (inner pages) — nothing to do
}


/* ─── 6. Newsletter form ────────────────────────────── */
const form = document.getElementById('newsletter-form');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameVal  = document.getElementById('sub-name')?.value.trim();
    const emailVal = document.getElementById('sub-email')?.value.trim();

    // Clear any existing error
    form.querySelector('.form-error')?.remove();

    if (!nameVal || !emailVal) {
      const err = document.createElement('p');
      err.className = 'form-error';
      err.setAttribute('role', 'alert');
      err.style.cssText = [
        'font-family:var(--ff-ui)',
        'font-size:.6rem',
        'letter-spacing:.12em',
        'text-transform:uppercase',
        'color:#a0573a',
        'margin-top:-.25rem'
      ].join(';');
      err.textContent = 'Please fill in both fields to continue.';
      form.querySelector('.btn').insertAdjacentElement('beforebegin', err);
      setTimeout(() => err.remove(), 5000);
      return;
    }

    // ── Connect your email provider here ──────────────────────
    // Examples:
    //   Mailchimp:   POST to your Mailchimp list endpoint
    //   ConvertKit:  POST to https://api.convertkit.com/v3/...
    //   Buttondown:  POST to https://buttondown.email/api/emails/
    //   Cloudflare Worker: POST to your Worker URL
    // ──────────────────────────────────────────────────────────
    console.log('[Reflections with Lillie] New subscriber:', { name: nameVal, email: emailVal });

    // Warm confirmation — personal, not generic
    const confirmation = document.createElement('div');
    confirmation.innerHTML = `
      <p style="
        font-family: var(--ff-display);
        font-style: italic;
        font-size: 1.6rem;
        color: var(--gold);
        margin-bottom: .75rem;
        line-height: 1.2;
      ">Welcome, ${escapeHtml(nameVal)}.</p>
      <p style="
        font-family: var(--ff-body);
        font-size: 1.1rem;
        color: var(--ink-mid);
        line-height: 1.9;
      ">You are now part of the journey.<br />
      Lillie will be in touch — with music, reflections,<br />
      and words meant just for seasons like yours.</p>
    `;
    form.replaceWith(confirmation);
  });
}


/* ─── 7. Contact form (contact.html) ────────────────── */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name    = document.getElementById('c-name')?.value.trim();
    const email   = document.getElementById('c-email')?.value.trim();
    const reason  = document.getElementById('c-reason')?.value;
    const message = document.getElementById('c-message')?.value.trim();

    contactForm.querySelector('.form-error')?.remove();

    if (!name || !email || !reason || !message) {
      const err = document.createElement('p');
      err.className = 'form-error';
      err.setAttribute('role', 'alert');
      err.style.cssText = 'font-family:var(--ff-ui);font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:#a0573a;';
      err.textContent = 'Please complete all fields before sending.';
      contactForm.querySelector('.btn').insertAdjacentElement('beforebegin', err);
      setTimeout(() => err.remove(), 5000);
      return;
    }

    // ── Connect a form backend here ────────────────────────────
    // Recommended for static sites:
    //   Formspree:   https://formspree.io  (free tier, no backend needed)
    //   Cloudflare Workers + email-sending API (e.g. Resend, Postmark)
    // ──────────────────────────────────────────────────────────
    console.log('[Reflections with Lillie] Contact form submission:', { name, email, reason, message });

    const confirmation = document.createElement('div');
    confirmation.innerHTML = `
      <p style="font-family:var(--ff-display);font-style:italic;font-size:1.5rem;color:var(--gold);margin-bottom:.75rem;">
        Thank you, ${escapeHtml(name)}.
      </p>
      <p style="font-family:var(--ff-body);font-size:1.05rem;color:var(--ink-mid);line-height:1.85;">
        Your message has been received. Lillie reads every note personally
        and will respond as soon as she's able.
      </p>
    `;
    contactForm.replaceWith(confirmation);
  });
}


/* ─── 8. Music filter tabs (music.html) ─────────────── */
const filterTabs = document.querySelectorAll('.filter-tab');
const catalogItems = document.querySelectorAll('.catalog-item');

if (filterTabs.length && catalogItems.length) {
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      catalogItems.forEach(item => {
        const matches = filter === 'all' || item.dataset.type === filter;
        item.classList.toggle('is-hidden', !matches);
      });
    });
  });
}

// Simple XSS guard for the name display
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
