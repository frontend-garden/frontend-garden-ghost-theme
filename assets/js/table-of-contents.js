const TOC_ID = 'obsah';

const generateToc = () => {
  tocbot.init({
    activeLinkClass: 'is-active',
    collapsibleClass: 'is-collapsible',
    contentSelector: '.js-table-of-contents-source',
    headingSelector: 'h1, h2, h3',
    isCollapsedClass: 'is-collapsed',
    linkClass: 'table-of-contents__link',
    listClass: 'table-of-contents__list',
    listItemClass: 'table-of-contents__list__item',
    scrollSmooth: false,
    tocSelector: `#${TOC_ID}`,
  });

  document.getElementById(TOC_ID).classList.add('table-of-contents--active');
};

const destroyToc = () => {
  document.getElementById(TOC_ID).classList.remove('table-of-contents--active');
  tocbot.destroy();
};

const updateToc = () => {
  const tocEl = document.getElementById(TOC_ID);

  if (window.getComputedStyle(tocEl).display !== 'none') {
    if (!tocEl.innerHTML) {
      generateToc();
    }
  } else if (tocEl.innerHTML) {
    destroyToc();
  }
};

window.addEventListener('load', () => updateToc());
window.addEventListener('resize', () => updateToc());
