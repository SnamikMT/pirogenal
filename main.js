document.addEventListener('DOMContentLoaded', () => {
  // бургер
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }

  // --- плавный скролл к якорям с учётом шапки --- //

function smoothScrollToHash(hash) {
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  const header = document.querySelector('.site-header');
  const headerOffset = header ? header.offsetHeight : 0;

  const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset - 12;

  window.scrollTo({
    top: targetY,
    behavior: 'smooth'
  });
}

// Клик по ссылкам с якорями: href="#faq" или href="/#faq"
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"], a[href^="/#"]');
  if (!link) return;

  const url = new URL(link.href, window.location.origin);

  // Если переход на эту же страницу — перехватываем и скроллим сами
  if (url.pathname === window.location.pathname) {
    e.preventDefault();
    smoothScrollToHash(url.hash);

    // Закрываем мобильное меню, если открыто
    const nav = document.querySelector('.nav');
    if (nav && nav.classList.contains('show')) {
      nav.classList.remove('show');
    }
  }
  // Если это переход на другую страницу (например, с /product/supp/ на /#faq),
  // ничего не трогаем — браузер сам перейдёт на /#faq, а дальше сработает код ниже (onload).
});

// После загрузки страницы проверяем, есть ли хэш — и доскролливаем красиво
window.addEventListener('load', () => {
  if (window.location.hash) {
    // небольшой timeout, чтобы всё успело отрисоваться
    setTimeout(() => {
      smoothScrollToHash(window.location.hash);
    }, 50);
  }
});

    // ===== HEADER =====
  const headerContainer = document.getElementById('header-block');
  if (headerContainer) {
    fetch('/blocks/header.html')
      .then(r => r.text())
      .then(html => {
        headerContainer.innerHTML = html;
        initHeaderActive();   // подсветка активного меню
        initBurger();         // бургер после вставки
      })
      .catch(err => console.warn('Не удалось загрузить header:', err));
  }

 // ===== HERO =====
  const heroContainer = document.getElementById('hero-block');
  if (heroContainer) {
    fetch('blocks/hero.html')
      .then(r => r.text())
      .then(html => {
        heroContainer.innerHTML = html;
        initHero(); // <— навешиваем обработчики ПОСЛЕ вставки разметки
      })
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
    fetch('/blocks/buy.html')
      .then(r => r.text())
      .then(html => {
        buyContainer.innerHTML = html;
      })
      .catch(err => console.warn('Не удалось загрузить buy:', err));
  }

  // ===== FOOTER =====
  const footerContainer = document.getElementById('footer-block');
  if (footerContainer) {
    fetch('/blocks/footer.html')
      .then(r => r.text())
      .then(html => {
        footerContainer.innerHTML = html;
      })
      .catch(err => console.warn('Не удалось загрузить footer:', err));
  }

  function initBurger() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (burger && nav) {
      burger.addEventListener('click', () => nav.classList.toggle('show'));
    }
  }

  function initHeaderActive() {
    const path = location.pathname.split('/').pop() || 'index.html';
    const map = {
      'index.html': 'home',
      'product-supp.html': 'product',
      'product-10.html': 'product',
      'product-25.html': 'product',
      'product-50.html': 'product',
      'product-100.html': 'product',
      'instructions.html': 'instructions',
      'materials.html': 'materials'
    };
    const key = map[path] || (path.includes('index') ? 'home' : null);
    if (!key) return;
    document.querySelectorAll('.nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.nav === key);
    });
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

  function initHero() {
    const buttons = document.querySelectorAll('.hero-toggle__btn');
    const imgs = document.querySelectorAll('.hero__product');

    if (!buttons.length || !imgs.length) return;

    let currentIdx = 0;
    let autoSwitch;

    const formClasses = Array.from(imgs).map(img => {
      // ожидаем классы вида hero__product--supp / --inj
      const cls = Array.from(img.classList).find(c => c.startsWith('hero__product--'));
      return cls ? cls.replace('hero__product--', '') : null;
    });

    function switchForm(form) {
      buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.form === form));
      imgs.forEach(img => img.classList.toggle('active', img.classList.contains(`hero__product--${form}`)));

      // опционально: гоняем активную дозу по кругу
      const doses = document.querySelectorAll('.hero-doses__item');
      if (doses.length) {
        doses.forEach(d => d.classList.remove('hero-doses__item--active'));
        // подсветим первую для консистентности
        doses[0].classList.add('hero-doses__item--active');
      }
    }

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        clearInterval(autoSwitch);
        currentIdx = idx;
        switchForm(btn.dataset.form);
        startAuto();
      });
    });

    function startAuto() {
      clearInterval(autoSwitch);
      autoSwitch = setInterval(() => {
        currentIdx = (currentIdx + 1) % buttons.length;
        const nextForm = buttons[currentIdx].dataset.form;
        switchForm(nextForm);
      }, 5000);
    }

    // дефолт — свечи
    const defaultForm = buttons[0]?.dataset.form || 'supp';
    switchForm(defaultForm);
    startAuto();
  }
});
