// Insert non-breaking space after single-character words.
const elementsToReplace = document.querySelectorAll('.js-nbsp');

if (elementsToReplace.length) {
  elementsToReplace.forEach((element) => {

    // First pass to handle single and odd occurrences.
    element.innerHTML = element.innerHTML.replace(
      /( |&nbsp;)([a-z])( |&nbsp;)/gi,
      '$1$2&nbsp;'
    );

    // Second pass to handle even occurrences in multiple matches.
    element.innerHTML = element.innerHTML.replace(
      /&nbsp;([a-z]) /gi,
      '&nbsp;$1&nbsp;'
    );
  });
}

// Safely open external links in a new tab.
const externalLinks = document.querySelectorAll('.js-external-links a[href^=http]');

if (externalLinks.length) {
  externalLinks.forEach((element) => {
    element.setAttribute('target', '_blank');
    element.setAttribute('rel', 'noopener noreferrer');

    if (typeof gtag !== 'undefined') {
      element.addEventListener('click', function () {
        gtag('event', 'navigate', {
          'event_category': 'Outbound links',
          'event_label': element.getAttribute('href'),
        });
      });
    }
  });
}

// Add clickable anchors to headings with ID.
const headingsWithId = document.querySelectorAll(
  '.js-heading-anchors h2[id],' +
  '.js-heading-anchors h3[id]' +
  '.js-heading-anchors h4[id]' +
  '.js-heading-anchors h5[id]' +
  '.js-heading-anchors h6[id]'
);

if (headingsWithId.length) {
  headingsWithId.forEach((element) => {
    const headingId = element.getAttribute('id');
    const headingText = element.innerHTML;

    element.innerHTML = `<a href="#${headingId}">${headingText}</a>`;
  });
}

// Automatically size Koenig gallery images
const galleryImages = document.querySelectorAll('.kg-gallery-image img');

galleryImages.forEach(function(image) {
  const container = image.closest('.kg-gallery-image');
  const width = image.attributes.width.value;
  const height = image.attributes.height.value;
  const ratio = width / height;
  container.style.flex = `${ratio} 1 0%`;
});

// Track events in GA.
const trackedItems = document.querySelectorAll('[data-track]');

if (trackedItems.length && typeof gtag !== 'undefined') {
  trackedItems.forEach((element) => {
    element.addEventListener('click', function () {
      const action = element.getAttribute('data-track');

      if (action === 'share') {
        gtag('event', 'share', {
          method: element.getAttribute('data-method'),
        });
      } else {
        let label;

        if (element.getAttribute('data-label')) {
          label = element.getAttribute('data-label');
        } else {
          label = element.getAttribute('href');
        }

        gtag('event', action, {
          'event_category': element.getAttribute('data-category'),
          'event_label': label,
        });
      }
    });
  });
}
