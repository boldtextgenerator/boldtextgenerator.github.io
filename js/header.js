const HeaderComponent = {
  render() {
    const header = document.getElementById('site-header');
    if (!header) return;
    header.innerHTML = `
      <nav class="navbar">
        <div class="nav-container">
          <a href="/" class="nav-logo" aria-label="Bold Text Generator Home">
            <span class="logo-icon">𝗕</span>
            <span class="logo-text">Bold<span class="logo-accent">Text</span>Gen</span>
          </a>
          <ul class="nav-links" id="navLinks" role="navigation" aria-label="Main navigation">
            <li><a href="#generator">Generator</a></li>
            <li><a href="#styles">Styles</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#uses">Use Cases</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    `;
    this.initToggle();
    this.initScrollEffect();
    this.initSmoothScroll();
  },

  initToggle() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  },

  initScrollEffect() {
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  },

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
};
