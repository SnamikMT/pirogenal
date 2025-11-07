document.addEventListener('DOMContentLoaded', () => {
  // бургер
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('show'));
  }

  const mainEl = document.querySelector('main');

  // hero
  const heroContainer = document.getElementById('hero-block');
  if (heroContainer) {
    fetch('blocks/hero.html')
      .then(r => r.text())
      .then(html => heroContainer.innerHTML = html)
      .catch(err => console.warn('Не удалось загрузить hero:', err));
  }

  // articles
  if (mainEl) {
    const artContainer = document.createElement('div');
    artContainer.id = 'articles-block';
    mainEl.appendChild(artContainer);

    fetch('blocks/articles.html')
      .then(r => r.text())
      .then(html => {
        artContainer.innerHTML = html;
        initArticles();
      })
      .catch(err => console.warn('Не удалось загрузить articles:', err));
  }

  // about (новый блок)
  if (mainEl) {
    const aboutContainer = document.createElement('div');
    aboutContainer.id = 'about-block';
    mainEl.appendChild(aboutContainer);

    fetch('blocks/about.html')
      .then(r => r.text())
      .then(html => {
        aboutContainer.innerHTML = html;
      })
      .catch(err => console.warn('Не удалось загрузить about:', err));
  }

  // forms (формы выпуска)
  if (mainEl) {
    const formsContainer = document.createElement('div');
    formsContainer.id = 'forms-block';
    mainEl.appendChild(formsContainer);

    fetch('blocks/forms.html')
      .then(r => r.text())
      .then(html => {
        formsContainer.innerHTML = html;
      })
      .catch(err => console.warn('Не удалось загрузить forms:', err));
  }


  // faq
  if (mainEl) {
    const faqContainer = document.createElement('div');
    faqContainer.id = 'faq-block';
    mainEl.appendChild(faqContainer);

    fetch('blocks/faq.html')
      .then(r => r.text())
      .then(html => {
        faqContainer.innerHTML = html;
        initFaq();
      })
      .catch(err => console.warn('Не удалось загрузить faq:', err));
  }

  // buy
if (mainEl) {
  const buyContainer = document.createElement('div');
  buyContainer.id = 'buy-block';
  mainEl.appendChild(buyContainer);

  fetch('blocks/buy.html')
    .then(r => r.text())
    .then(html => {
      buyContainer.innerHTML = html;
    })
    .catch(err => console.warn('Не удалось загрузить buy:', err));
}

  // функции
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

    faqBlock.addEventListener('click', (e) => {
      const tab = e.target.closest('.faq-tab');
      if (tab) {
        const group = tab.dataset.faqGroup;
        faqBlock.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('faq-tab--active'));
        tab.classList.add('faq-tab--active');

        faqBlock.querySelectorAll('.faq-group').forEach(g => {
          g.classList.toggle('faq-group--active', g.dataset.faq === group);
        });
      }
    });

    faqBlock.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-item__btn');
      if (!btn) return;
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
    });
  }
});
