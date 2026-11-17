/**
 * Pranavi Renewables - Master JavaScript (Mobile & Desktop Responsive)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle with Animated Hamburger
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const siteHeader = document.querySelector('.site-header');

  if (mobileToggle && navLinks) {
    const toggleMenu = (forceClose = false) => {
      const isOpen = forceClose ? false : !navLinks.classList.contains('open');
      navLinks.classList.toggle('open', isOpen);
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    };

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(true);
      });
    });

    // Close when clicking outside of the header
    document.addEventListener('click', (e) => {
      if (!siteHeader.contains(e.target) && navLinks.classList.contains('open')) {
        toggleMenu(true);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        toggleMenu(true);
      }
    });
  }

  // 2. Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

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
  const contactForms = document.querySelectorAll('#contactForm');
  contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]')?.value || 'Valued Client';
      const email = form.querySelector('[name="email"]')?.value || '';

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert(`Thank you, ${name}! Your inquiry has been received. Our solar engineers will contact you at ${email || 'your phone'} shortly.`);
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 600);
    });
  });

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
