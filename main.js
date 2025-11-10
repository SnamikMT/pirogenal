document.addEventListener('DOMContentLoaded', () => {
  // бургер
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('show'));
  }

  // ===== HERO (только если есть #hero-block) =====
  const heroContainer = document.getElementById('hero-block');
  if (heroContainer) {
    fetch('blocks/hero.html')
      .then(r => r.text())
      .then(html => heroContainer.innerHTML = html)
      .catch(err => console.warn('Не удалось загрузить hero:', err));
  }

  // ===== ARTICLES =====
  const articlesContainer = document.getElementById('articles-block');
  if (articlesContainer) {
    fetch('blocks/articles.html')
      .then(r => r.text())
      .then(html => {
        articlesContainer.innerHTML = html;
        initArticles();
      })
      .catch(err => console.warn('Не удалось загрузить articles:', err));
  }

  // ===== ABOUT =====
  const aboutContainer = document.getElementById('about-block');
  if (aboutContainer) {
    fetch('blocks/about.html')
      .then(r => r.text())
      .then(html => {
        aboutContainer.innerHTML = html;
      })
      .catch(err => console.warn('Не удалось загрузить about:', err));
  }

  // ===== FORMS =====
  const formsContainer = document.getElementById('forms-block');
  if (formsContainer) {
    fetch('blocks/forms.html')
      .then(r => r.text())
      .then(html => {
        formsContainer.innerHTML = html;
      })
      .catch(err => console.warn('Не удалось загрузить forms:', err));
  }

  // ===== FAQ =====
  const faqContainer = document.getElementById('faq-block');
  if (faqContainer) {
    fetch('blocks/faq.html')
      .then(r => r.text())
      .then(html => {
        faqContainer.innerHTML = html;
        initFaq();
      })
      .catch(err => console.warn('Не удалось загрузить faq:', err));
  }

  // ===== BUY =====
  const buyContainer = document.getElementById('buy-block');
  if (buyContainer) {
    fetch('blocks/buy.html')
      .then(r => r.text())
      .then(html => {
        buyContainer.innerHTML = html;
      })
      .catch(err => console.warn('Не удалось загрузить buy:', err));
  }

  // ===== FOOTER =====
  const footerContainer = document.getElementById('footer-block');
  if (footerContainer) {
    fetch('blocks/footer.html')
      .then(r => r.text())
      .then(html => {
        footerContainer.innerHTML = html;
      })
      .catch(err => console.warn('Не удалось загрузить footer:', err));
  }

  // ====== функции ======

  function initArticles() {
    const block = document.getElementById('articles-block');
    if (!block) return;
    const chips = block.querySelectorAll('.articles-chip');
    const cards = block.querySelectorAll('.art-card');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cat = chip.dataset.cat;
        chips.forEach(c => c.classList.remove('articles-chip--active'));
        chip.classList.add('articles-chip--active');

        cards.forEach(card => {
          const cardCat = card.dataset.cat;
          card.style.display = (cat === 'all' || cardCat === cat) ? '' : 'none';
        });
      });
    });
  }

  function initFaq() {
    const faqBlock = document.getElementById('faq-block');
    if (!faqBlock) return;

    // tabs
    faqBlock.addEventListener('click', (e) => {
      const tab = e.target.closest('.faq-tab');
      if (!tab) return;
      const group = tab.dataset.faqGroup;

      faqBlock.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('faq-tab--active'));
      tab.classList.add('faq-tab--active');

      faqBlock.querySelectorAll('.faq-group').forEach(g => {
        g.classList.toggle('faq-group--active', g.dataset.faq === group);
      });
    });

    // accordions
    faqBlock.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-item__btn');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
    });
  }
});
