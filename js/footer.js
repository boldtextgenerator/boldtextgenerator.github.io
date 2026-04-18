const FooterComponent = {
  render() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-brand">
          <a href="/" class="footer-logo" aria-label="Bold Text Generator">
            <span class="logo-icon">𝗕</span>
            <span class="logo-text">Bold<span class="logo-accent">Text</span>Gen</span>
          </a>
          <p class="footer-tagline">Convert plain text into stunning bold Unicode styles instantly. Free, fast, and works everywhere.</p>
          <div class="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>            
          </div>
        </div>
        <div class="footer-links-group">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/#generator">Bold Text Generator</a></li>
            <li><a href="/#styles">Unicode Bold Styles</a></li>
            <li><a href="/#how-it-works">How It Works</a></li>
            <li><a href="/#uses">Use Cases</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-links-group">
          <h3>Bold Styles</h3>
          <ul>
            <li><a href="/#generator">𝗦𝗮𝗻𝘀-𝗦𝗲𝗿𝗶𝗳 Bold</a></li>
            <li><a href="/#generator">𝐒𝐞𝐫𝐢𝐟 Bold</a></li>
            <li><a href="/#generator">𝑺𝒆𝒓𝒊𝒇 Bold Italic</a></li>
            <li><a href="/#generator">𝘚𝘢𝘯𝘴 Bold Italic</a></li>
            <li><a href="/#generator">𝔅𝔩𝔞𝔠𝔨𝔩𝔢𝔱𝔱𝔢𝔯</a></li>
          </ul>
        </div>
        <div class="footer-links-group">
          <h3>Pages</h3>
          <ul>
            <li><a href="about">About</a></li>
            <li><a href="contact">Contact</a></li>            
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${year} BoldTextGen — <a href="https://boldtextgenerator.github.io">boldtextgenerator.github.io</a>. Free Unicode Bold Text Generator.</p>
        <p class="footer-legal"><a href="privacy">Privacy Policy</a> · <a href="terms">Terms of Use</a> · <a href="sitemap.xml">Sitemap</a></p>
      </div>
    `;
  }
};
