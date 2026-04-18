// ============================================================
// BOLD TEXT GENERATOR — Main App
// ============================================================

const App = (() => {
  let lastText = '';
  let toastTimer = null;

  function init() {
    HeaderComponent.render();
    FooterComponent.render();
    bindEvents();
    renderStyleCards('');
    animateOnScroll();
    renderCharCount(0);
  }

  function bindEvents() {
    const input = document.getElementById('inputText');
    const clearBtn = document.getElementById('clearBtn');

    if (input) {
      input.addEventListener('input', () => {
        const text = input.value;
        renderCharCount(text.length);
        renderStyleCards(text);
      });
      input.addEventListener('paste', () => {
        setTimeout(() => {
          const text = input.value;
          renderCharCount(text.length);
          renderStyleCards(text);
        }, 10);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (input) {
          input.value = '';
          renderCharCount(0);
          renderStyleCards('');
          input.focus();
        }
      });
    }

    // Sample text buttons
    document.querySelectorAll('[data-sample]').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.getAttribute('data-sample');
        if (input) {
          input.value = text;
          renderCharCount(text.length);
          renderStyleCards(text);
          document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function renderCharCount(count) {
    const el = document.getElementById('charCount');
    if (el) el.textContent = count;
    const wordEl = document.getElementById('wordCount');
    if (wordEl) {
      const input = document.getElementById('inputText');
      const words = input?.value.trim().split(/\s+/).filter(Boolean).length || 0;
      wordEl.textContent = words;
    }
  }

  function renderStyleCards(text) {
    const container = document.getElementById('outputContainer');
    if (!container) return;

    const results = BoldConverter.convertAll(text);
    container.innerHTML = '';

    results.forEach((style, idx) => {
      const card = document.createElement('div');
      card.className = 'output-card';
      card.style.animationDelay = `${idx * 0.04}s`;

      const preview = style.output || getPlaceholder(style);
      const isEmpty = !text;

      card.innerHTML = `
        <div class="card-header">
          <div class="card-meta">
            <span class="card-emoji">${style.emoji}</span>
            <span class="card-label">${style.label}</span>
          </div>
          <button class="copy-btn ${isEmpty ? 'disabled' : ''}" 
                  data-text="${encodeURIComponent(style.output)}" 
                  data-id="${style.id}"
                  aria-label="Copy ${style.label} text"
                  ${isEmpty ? 'disabled' : ''}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg>
            <span>Copy</span>
          </button>
        </div>
        <div class="card-output ${isEmpty ? 'placeholder' : ''}" id="output-${style.id}">
          ${isEmpty ? getPlaceholder(style) : escapeHtml(style.output)}
        </div>
        <p class="card-desc">${style.desc}</p>
      `;

      container.appendChild(card);

      // Copy button handler
      card.querySelector('.copy-btn')?.addEventListener('click', function () {
        const encoded = this.getAttribute('data-text');
        const textToCopy = decodeURIComponent(encoded);
        if (!textToCopy) return;
        copyToClipboard(textToCopy, this);
      });
    });
  }

  function getPlaceholder(style) {
    const samples = {
      'sans-bold': '𝗧𝘆𝗽𝗲 𝗮𝗯𝗼𝘃𝗲 𝘁𝗼 𝘀𝗲𝗲 𝗺𝗮𝗴𝗶𝗰',
      'serif-bold': '𝐓𝐲𝐩𝐞 𝐚𝐛𝐨𝐯𝐞 𝐭𝐨 𝐬𝐞𝐞 𝐦𝐚𝐠𝐢𝐜',
      'serif-bold-italic': '𝑻𝒚𝒑𝒆 𝒂𝒃𝒐𝒗𝒆 𝒕𝒐 𝒔𝒆𝒆 𝒎𝒂𝒈𝒊𝒄',
      'sans-bold-italic': '𝙏𝙮𝙥𝙚 𝙖𝙗𝙤𝙫𝙚 𝙩𝙤 𝙨𝙚𝙚 𝙢𝙖𝙜𝙞𝙘',
      'fraktur-bold': '𝕿𝖞𝖕𝖊 𝖆𝖇𝖔𝖛𝖊 𝖙𝖔 𝖘𝖊𝖊 𝖒𝖆𝖌𝖎𝖈',
      'double-struck': '𝕋𝕪𝕡𝕖 𝕒𝕓𝕠𝕧𝕖 𝕥𝕠 𝕤𝕖𝕖 𝕞𝕒𝕘𝕚𝕔',
      'script-bold': '𝓣𝔂𝓹𝓮 𝓪𝓫𝓸𝓿𝓮 𝓽𝓸 𝓼𝓮𝓮 𝓶𝓪𝓰𝓲𝓬',
    };
    return samples[style.id] || 'Type above to see magic...';
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  async function copyToClipboard(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      showCopied(btn);
      showToast('✅ Copied to clipboard!');
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
        showCopied(btn);
        showToast('✅ Copied to clipboard!');
      } catch {
        showToast('❌ Copy failed. Please select and copy manually.');
      }
      document.body.removeChild(ta);
    }
  }

  function showCopied(btn) {
    const span = btn.querySelector('span');
    const originalText = span.textContent;
    btn.classList.add('copied');
    span.textContent = 'Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      span.textContent = originalText;
    }, 2000);
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
