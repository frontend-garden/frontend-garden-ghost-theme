// Insert non-breaking space after single-character words.
document.querySelectorAll('.js-nbsp').forEach((element) => {
  const el = element;

  // First pass to handle single and odd occurrences.
  el.innerHTML = el.innerHTML.replace(
    /( |&nbsp;)([a-z])( |&nbsp;)/gi,
    '$1$2&nbsp;',
  );

  // Second pass to handle even occurrences in multiple matches.
  el.innerHTML = el.innerHTML.replace(
    /&nbsp;([a-z]) /gi,
    '&nbsp;$1&nbsp;',
  );
});

// Safely open external links in a new tab.
document.querySelectorAll('.js-external-links a[href^=http]').forEach((element) => {
  if (!element.getAttribute('href').includes('https://frontend.garden')) {
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noopener noreferrer');

    if (typeof gtag !== 'undefined') {
      element.addEventListener('click', () => {
        gtag('event', 'navigate', {
          event_category: 'Outbound links',
          event_label: element.getAttribute('href'),
        });
      });
    }
  }
});

// Add clickable anchors to headings with ID.
document.querySelectorAll(
  '.js-heading-anchors h2[id],'
  + '.js-heading-anchors h3[id]'
  + '.js-heading-anchors h4[id]'
  + '.js-heading-anchors h5[id]'
  + '.js-heading-anchors h6[id]',
).forEach((element) => {
  const el = element;
  const headingId = element.getAttribute('id');
  const headingText = element.innerHTML;

  el.innerHTML = `<a href="#${headingId}">${headingText}</a>`;
});

// Make tables responsive.
document.querySelectorAll('.editor > table').forEach((element) => {
  const el = element;
  const wrapperEl = document.createElement('div');

  wrapperEl.classList.add('table-responsive');
  el.parentNode.insertBefore(wrapperEl, el);
  wrapperEl.appendChild(el);
});

// Automatically size Koenig gallery images.
document.querySelectorAll('.kg-gallery-image img').forEach((image) => {
  const container = image.closest('.kg-gallery-image');
  const width = image.attributes.width.value;
  const height = image.attributes.height.value;
  const ratio = width / height;
  container.style.flex = `${ratio} 1 0%`;
});

// Track events in GA.
if (typeof gtag !== 'undefined') {
  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => {
      const action = element.getAttribute('data-track');

      if (action === 'share') {
        gtag('event', 'share', {
          method: element.getAttribute('data-track-method'),
        });
      } else {
        let label;

        if (element.getAttribute('data-track-label')) {
          label = element.getAttribute('data-track-label');
        } else {
          label = element.getAttribute('href');
        }

        gtag('event', action, {
          event_category: element.getAttribute('data-track-category'),
          event_label: label,
        });
      }
    });
  });
}

// Replace snippet placeholders with actual content defined in `<template>`.
//
// Example placeholder HTML:
//
// <div data-snippet="newsletter-signup"></div>
//
// Example template HTML:
//
// <template id="snippet__newsletter-signup__template">
//     {{> "snippets/newsletter-signup"}}
// </template>
document.querySelectorAll('[data-snippet]').forEach((element) => {
  const snippetName = element.getAttribute('data-snippet');
  const snippet = document
    .getElementById(`snippet__${snippetName}__template`)
    .content
    .cloneNode(true);

  element.appendChild(snippet);
});

// Populate snippets with data from Ghost admin. All texts support HTML.
//
// Example data (inject into `<head>`):
//
// const snippetsData = {
//   'bottom-ad': {
//     ctaLabel: 'Dynamic CTA label',
//     ctaUrl: 'https://www.example.com',
//     text: 'Dynamic <strong>text</strong>',
//     title: 'Dynamic title',
//   },
// };
//
// Example snippet HTML:
//
// <div data-populate="bottom-ad">
//     <h2 id="bottom-ad__title"></h2>
//     <p id="bottom-ad__text"></p>
//     <a id="bottom-ad__cta"></a>
// </div>
document.querySelectorAll('[data-populate]').forEach((element) => {
  const snippetName = element.getAttribute('data-populate');

  if (typeof snippetsData === 'undefined') {
    element.toggleAttribute('hidden');

    // eslint-disable-next-line no-console -- Input data is managed in admin, warning is useful.
    console.warn(`Warning: No data found for snippet "${snippetName}"! The snippet is now hidden.`);
  } else if (snippetsData[snippetName]) {
    const dataToPopulate = snippetsData[snippetName];

    document.getElementById(`${snippetName}__title`).innerHTML = dataToPopulate.title;
    document.getElementById(`${snippetName}__text`).innerHTML = dataToPopulate.text;
    document.getElementById(`${snippetName}__cta`).innerHTML = dataToPopulate.ctaLabel;
    document.getElementById(`${snippetName}__cta`).setAttribute('href', dataToPopulate.ctaUrl);
  }
});
