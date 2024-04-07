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
  if (!element.getAttribute('href').includes('https://ramonguilherme.com.br')) {
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

  container.style.setProperty('--aspect-ratio', ratio);
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
  const snippetEl = element;
  const snippetName = snippetEl.getAttribute('data-snippet');

  if (!snippetName) {
    // eslint-disable-next-line no-console -- Warn for undefined snippet name.
    console.warn('Warning: No snippet name set!');
  } else {
    const snippetTemplate = document.getElementById(`snippet__${snippetName}__template`);

    if (!snippetTemplate) {
      // eslint-disable-next-line no-console -- Warn for non-existing snippet template.
      console.warn(`Warning: No template found for snippet "${snippetName}"!`);
    } else {
      const snippet = snippetTemplate.content.cloneNode(true);
      snippetEl.appendChild(snippet);
    }
  }
});

// Populate snippets with data from Ghost admin. All texts support HTML.
//
// Example data (inject into `<head>`):
//
// const snippetsData = {
//   'bottom-ad': {
//     title: 'Dynamic title',
//     text: 'Dynamic <strong>text</strong>',
//     image: {
//       src: 'image.png',
//       alt: 'Alternative text',
//       linkUrl: 'https://www.example.com',
//     },
//     cta: {
//       label: 'Dynamic CTA label',
//       linkUrl: 'https://www.example.com',
//     },
//     ctaLabel: 'Dynamic CTA label', // DEPRECATED
//     ctaUrl: 'https://www.example.com', // DEPRECATED
//   },
// };
//
// Example snippet HTML:
//
// <div data-populate="bottom-ad">
//     <h2 data-populate-field="title"></h2>
//     <p data-populate-field="text"></p>
//     <a data-populate-field="image"><figure><img /></figure></a>
//     <a data-populate-field="cta"></a>
// </div>
document.querySelectorAll('[data-populate]').forEach((element) => {
  const populateEl = element;
  const snippetName = populateEl.getAttribute('data-populate');
  const hideSnippet = () => populateEl.toggleAttribute('hidden');

  if (typeof snippetsData === 'undefined') {
    hideSnippet();

    // eslint-disable-next-line no-console -- Input data is managed in admin, warning is useful.
    console.warn('Warning: `snippetsData` not configured! Calling snippet is now hidden.');
  } else if (!snippetName) {
    hideSnippet();

    // eslint-disable-next-line no-console -- Warn for a misconfigured snippet.
    console.warn('Warning: No populate name set for snippet! The snippet is now hidden.');
  } else if (!snippetsData[snippetName]) {
    hideSnippet();

    // eslint-disable-next-line no-console -- Input data is managed in admin, warning is useful.
    console.warn(`Warning: No data found for snippet "${snippetName}"! The snippet is now hidden.`);
  } else {
    const dataToPopulate = snippetsData[snippetName];
    const titleField = populateEl.querySelector('[data-populate-field="title"]');
    const textField = populateEl.querySelector('[data-populate-field="text"]');
    const imageField = populateEl.querySelector('[data-populate-field="image"]');
    const ctaField = populateEl.querySelector('[data-populate-field="cta"]');

    if (titleField) {
      if (dataToPopulate.title) {
        titleField.innerHTML = dataToPopulate.title;
      } else {
        titleField.remove();
      }
    }

    if (textField) {
      if (dataToPopulate.text) {
        textField.innerHTML = dataToPopulate.text;
      } else {
        textField.remove();
      }
    }

    if (imageField) {
      if (dataToPopulate.image) {
        if (!dataToPopulate.image.src) {
          hideSnippet();

          // eslint-disable-next-line no-console -- Warn for a misconfigured snippet.
          console.warn('Warning! Image "src" attribute is required. Whole snippet is now hidden.');
        } else {
          const imageEl = imageField.querySelector('img');

          imageEl.setAttribute('src', dataToPopulate.image.src);

          if (dataToPopulate.image.linkUrl) {
            imageField.setAttribute('href', dataToPopulate.image.linkUrl);
          }

          if (dataToPopulate.image.alt) {
            imageEl.setAttribute('alt', dataToPopulate.image.alt);
          }

          if (dataToPopulate.image.srcset) {
            imageEl.setAttribute('srcset', dataToPopulate.image.srcset);
          }

          if (dataToPopulate.image.sizes) {
            imageEl.setAttribute('sizes', dataToPopulate.image.sizes);
          }

          if (dataToPopulate.image.width) {
            imageEl.setAttribute('width', dataToPopulate.image.width);
          }

          if (dataToPopulate.image.height) {
            imageEl.setAttribute('height', dataToPopulate.image.height);
          }
        }
      } else {
        imageField.remove();
      }
    }

    if (ctaField) {
      // @deprecated `ctaLabel` and `ctaUrl` are deprecated in favour of the `cta` object.
      if (dataToPopulate.cta || (dataToPopulate.ctaLabel && dataToPopulate.ctaUrl)) {
        ctaField.innerHTML = dataToPopulate.cta?.label || dataToPopulate.ctaLabel;
        ctaField.setAttribute('href', dataToPopulate.cta?.linkUrl || dataToPopulate.ctaUrl);
      } else {
        ctaField.remove();
      }
    }
  }
});
