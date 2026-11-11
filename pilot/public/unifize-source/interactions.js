if(new URLSearchParams(location.search).has('embed'))document.documentElement.dataset.unifizeEmbedded='';
// Local interactions for the retained Unifize reference. No forms or tracking.
const sourceHome = 'https://www.unifize.com/';
const bookingUrl = `${sourceHome}#demo`;
const root = document.querySelector('main.dms') || document;

function normalizeLinks(scope) {
  scope.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href.startsWith('#') && href.length > 1 && !document.getElementById(href.slice(1))) link.href = sourceHome + href;
  });
}
normalizeLinks(root);

function summaryFrom(button, extraClass = '') {
  const summary = document.createElement('summary');
  summary.className = `${button.className} ${extraClass}`.trim();
  summary.innerHTML = button.innerHTML;
  if (button.getAttribute('aria-label')) summary.setAttribute('aria-label', button.getAttribute('aria-label'));
  return summary;
}

// Native disclosure semantics retain keyboard operation without a custom menu model.
root.querySelectorAll('.dms-header__dd').forEach(wrapper => {
  const button = wrapper.querySelector(':scope > .dms-header__dd-trigger');
  const panel = wrapper.querySelector(':scope > .dms-header__pop');
  if (!button || !panel) return;
  const details = document.createElement('details');
  details.className = `${wrapper.className} unifize-nav-disclosure`;
  details.name = 'unifize-desktop-navigation';
  panel.removeAttribute('role');
  panel.querySelectorAll('[role="menuitem"]').forEach(link => link.removeAttribute('role'));
  details.append(summaryFrom(button), panel);
  wrapper.replaceWith(details);
});

root.querySelectorAll('.dms-header__acc').forEach(wrapper => {
  const button = wrapper.querySelector(':scope > .dms-header__acc-trigger');
  const panel = wrapper.querySelector(':scope > .dms-header__acc-panel');
  if (!button || !panel) return;
  const details = document.createElement('details');
  details.className = `${wrapper.className} unifize-mobile-group`;
  panel.removeAttribute('inert');
  details.append(summaryFrom(button), panel);
  wrapper.replaceWith(details);
});

const mobileButton = root.querySelector('.dms-header__menu');
const mobileSheet = root.querySelector('.dms-header__sheet');
if (mobileButton && mobileSheet) {
  const details = document.createElement('details');
  details.className = 'unifize-mobile-navigation';
  const summary = summaryFrom(mobileButton);
  summary.setAttribute('aria-label', 'Menu');
  mobileSheet.removeAttribute('hidden');
  mobileSheet.classList.remove('is-open');
  details.append(summary, mobileSheet);
  mobileButton.replaceWith(details);
  details.addEventListener('toggle', () => root.querySelector('.dms-header')?.classList.toggle('is-menu-open', details.open));
}

const narrowFooter = matchMedia('(max-width: 767px)');
root.querySelectorAll('.sft__band--fold').forEach(wrapper => {
  const head = wrapper.querySelector(':scope > .sft__head');
  const button = head?.querySelector('.sft__fold');
  const content = wrapper.querySelector(':scope > .sft__subs');
  if (!button || !content) return;
  const details = document.createElement('details');
  details.className = `${wrapper.className} unifize-footer-disclosure`;
  details.setAttribute('aria-label', wrapper.getAttribute('aria-label') || button.textContent.trim());
  const summary = document.createElement('summary');
  summary.className = 'sft__head unifize-footer-summary';
  const label = head.querySelector('.sft__lab');
  if (label) summary.append(label);
  const visibleLabel = document.createElement('span');
  visibleLabel.className = button.className;
  visibleLabel.innerHTML = button.innerHTML;
  summary.append(visibleLabel);
  details.append(summary, content);
  wrapper.replaceWith(details);
  const sync = () => {
    details.open = !narrowFooter.matches;
    summary.tabIndex = narrowFooter.matches ? 0 : -1;
  };
  sync();
  narrowFooter.addEventListener('change', sync);
});

root.querySelectorAll('button.dms-btn').forEach(button => {
  if (!/demo|walkthrough/i.test(button.textContent)) return;
  const link = document.createElement('a');
  link.className = button.className;
  link.innerHTML = button.innerHTML;
  link.href = bookingUrl;
  link.target = '_blank';
  link.rel = 'noreferrer';
  button.replaceWith(link);
});
root.querySelectorAll('button').forEach(button => {
  if (/^cookie settings$/i.test(button.textContent.trim())) button.remove();
});

function preparePanel(panel) {
  panel.setAttribute('role', 'region');
  normalizeLinks(panel);
  panel.querySelectorAll('video').forEach(video => {
    video.removeAttribute('autoplay');
    video.removeAttribute('loop');
    video.pause();
  });
}

async function connectSelectors() {
  const response = await fetch(new URL('./states.json', import.meta.url));
  if (!response.ok) throw new Error(`State data unavailable (${response.status})`);
  const data = await response.json();
  const groups = Array.isArray(data) ? data : Object.entries(data).map(([selector, states]) => ({selector, states: states.states || states}));
  for (const {selector, states} of groups) {
    const buttons = [...root.querySelectorAll(selector)];
    if (!buttons.length || !states?.length) continue;
    const group = buttons[0].closest('[role="tablist"]');
    if (group) group.setAttribute('role', 'group');
    const first = states[0];
    const panelId = first.panelId || buttons[0].getAttribute('aria-controls');
    const panel = document.getElementById(panelId) || (selector === '.hm-ind__tab' ? root.querySelector('#industries .hm-ind__panel') : null);
    if (!panel) continue;
    preparePanel(panel);
    buttons.forEach((button, index) => {
      const selected = button.getAttribute('aria-selected') === 'true';
      button.removeAttribute('role');
      button.removeAttribute('aria-selected');
      button.removeAttribute('tabindex');
      button.setAttribute('aria-pressed', String(selected));
      if (!button.id) button.id = `unifize-${selector.replace(/[^a-z]/g, '')}-${index}`;
      if (selected) panel.setAttribute('aria-labelledby', button.id);
      button.addEventListener('click', () => {
        const state = states[index];
        if (!state || typeof state.html !== 'string') return;
        buttons.forEach((item, itemIndex) => {
          const active = itemIndex === index;
          item.setAttribute('aria-pressed', String(active));
          item.classList.toggle('is-active', active);
          item.closest('.hm-suite__cell')?.classList.toggle('is-active', active);
        });
        panel.innerHTML = state.html;
        panel.setAttribute('aria-labelledby', button.id);
        preparePanel(panel);
      });
    });
  }
}
connectSelectors().catch(error => {
  console.warn('Unifize local selectors:', error.message);
  root.querySelectorAll('[role="tab"]').forEach(button => {
    button.removeAttribute('role');
    button.removeAttribute('tabindex');
    button.removeAttribute('aria-selected');
    button.disabled = true;
    button.title = 'This captured view is unavailable.';
  });
});

root.querySelectorAll('.hm-reel__track').forEach(track => {
  const section = track.closest('section');
  const buttons = section?.querySelectorAll('.hm-reel__arrow');
  if (!buttons || buttons.length < 2) return;
  const update = () => {
    buttons[0].disabled = track.scrollLeft <= 2;
    buttons[1].disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    track.scrollBy({left: (index ? 1 : -1) * Math.max(300, track.clientWidth * .8), behavior: 'instant'});
    update();
  }));
  track.addEventListener('scroll', update, {passive: true});
  new ResizeObserver(update).observe(track);
  update();
});
