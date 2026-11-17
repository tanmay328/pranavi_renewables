/**
 * Pranavi Renewables - Master JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Header Scroll Effect
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 3. Highlight Active Link
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/\/$/, '') || '/';
    if (currentPath === cleanHref || (cleanHref !== '/' && currentPath.endsWith(cleanHref))) {
      link.classList.add('active');
    }
  });

  // 4. Solar Subsidy Calculator
  const capacityButtons = document.querySelectorAll('.capacity-btn');
  const subsidyVal = document.getElementById('subsidyAmount');
  const spaceVal = document.getElementById('roofSpace');
  const savingsVal = document.getElementById('annualSavings');

  // Subsidy parameters under PM Surya Ghar Muft Bijli Yojana
  // 1 kW -> ~₹30,000
  // 2 kW -> ~₹60,000
  // 3 kW+ -> ~₹78,000 max benchmark
  const subsidyData = {
    1: { subsidy: '₹30,000', space: '100 sq.ft', savings: '₹12,000 / yr' },
    2: { subsidy: '₹60,000', space: '200 sq.ft', savings: '₹24,000 / yr' },
    3: { subsidy: '₹78,000', space: '300 sq.ft', savings: '₹36,000 / yr' },
    4: { subsidy: '₹78,000', space: '400 sq.ft', savings: '₹48,000 / yr' },
    5: { subsidy: '₹78,000', space: '500 sq.ft', savings: '₹60,000 / yr' },
    10: { subsidy: '₹78,000*', space: '1,000 sq.ft', savings: '₹1,20,000 / yr' }
  };

  if (capacityButtons.length && subsidyVal) {
    capacityButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        capacityButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const kw = btn.getAttribute('data-kw');
        if (subsidyData[kw]) {
          subsidyVal.textContent = subsidyData[kw].subsidy;
          if (spaceVal) spaceVal.textContent = subsidyData[kw].space;
          if (savingsVal) savingsVal.textContent = subsidyData[kw].savings;
        }
      });
    });
  }

  // 5. Contact Form Submissions
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value || '';
      const email = contactForm.querySelector('[name="email"]')?.value || '';
      const message = contactForm.querySelector('[name="message"]')?.value || '';

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert(`Thank you, ${name}! Your inquiry has been received. Our solar engineers will contact you at ${email} shortly.`);
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 700);
    });
  }

  // 6. Newsletter Subscription Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert('Thank you for subscribing to Pranavi Renewables technical updates!');
        emailInput.value = '';
      }
    });
  }
});
