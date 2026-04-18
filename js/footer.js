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
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.36a9 9 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .36.04.7.11 1.03A12.85 12.85 0 011.64.89a4.52 4.52 0 001.4 6.03 4.47 4.47 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.57 4.57 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.07 9.07 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0023 3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-links-group">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#generator">Bold Text Generator</a></li>
            <li><a href="#styles">Unicode Bold Styles</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#uses">Use Cases</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div class="footer-links-group">
          <h3>Bold Styles</h3>
          <ul>
            <li><a href="#generator">𝗦𝗮𝗻𝘀-𝗦𝗲𝗿𝗶𝗳 Bold</a></li>
            <li><a href="#generator">𝐒𝐞𝐫𝐢𝐟 Bold</a></li>
            <li><a href="#generator">𝑺𝒆𝒓𝒊𝒇 Bold Italic</a></li>
            <li><a href="#generator">𝘚𝘢𝘯𝘴 Bold Italic</a></li>
            <li><a href="#generator">𝔅𝔩𝔞𝔠𝔨𝔩𝔢𝔱𝔱𝔢𝔯</a></li>
          </ul>
        </div>
        <div class="footer-links-group">
          <h3>Platforms</h3>
          <ul>
            <li><a href="#uses">Instagram Bold Text</a></li>
            <li><a href="#uses">WhatsApp Bold Text</a></li>
            <li><a href="#uses">Facebook Bold Text</a></li>
            <li><a href="#uses">Discord Bold Text</a></li>
            <li><a href="#uses">Twitter Bold Text</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${year} BoldTextGen — <a href="https://boldtextgenerator.github.io">boldtextgenerator.github.io</a>. Free Unicode Bold Text Generator.</p>
        <p class="footer-legal"><a href="#">Privacy Policy</a> · <a href="#">Terms of Use</a> · <a href="#">Sitemap</a></p>
      </div>
    `;
  }
};
