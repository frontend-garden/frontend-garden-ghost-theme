/**
 * Parse URL parameter
 *
 * @param name {string} Parameter name
 * @param url {string} URL to be parsed
 * @returns {string|null} Parameter value
 */
const getParameterByName = (name, url) => {
  const urlToParse = url || window.location.href;
  const nameToParse = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${nameToParse}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(urlToParse);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Toggle element visibility.
 *
 * @param triggerEl {node} Trigger element, eg. a button
 */
const toggleContent = (triggerEl) => {
  const targetEl = document.querySelector(triggerEl.getAttribute('data-toggle'));

  if (targetEl) {
    const isTargetVisible = !targetEl.hasAttribute('hidden');
    triggerEl.setAttribute('aria-expanded', !isTargetVisible);
    targetEl.toggleAttribute('hidden');
  }
};

// Handle toggle elements.
document.querySelectorAll('[data-toggle]').forEach((element) => {
  element.addEventListener('click', (event) => toggleContent(event.currentTarget));
});

// Get URL parameters
const action = getParameterByName('action');
const success = getParameterByName('success');

// Display notifications according to URL parameters
if (action === 'subscribe' && success) {
  document.querySelector('#notification-subscribe-success').removeAttribute('hidden');
} else if (action === 'subscribe') {
  document.querySelector('#notification-subscribe-error').removeAttribute('hidden');
}

// Handle dismissible elements.
document.querySelectorAll('[data-dismissible]').forEach((element) => {
  const dismissButtonEl = element.querySelector('[data-dismiss]');

  if (dismissButtonEl) {
    dismissButtonEl.addEventListener('click', (event) => {
      event.currentTarget.parentNode.setAttribute('hidden', '');

      // Clean up URI
      const uri = window.location.toString();
      const queryParamsStartPosition = uri.indexOf('?');

      if (queryParamsStartPosition > 0) {
        const cleanUri = uri.substring(0, queryParamsStartPosition);
        window.history.replaceState({}, document.title, cleanUri);
      }
    });
  }
});
