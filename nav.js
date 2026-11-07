/* Fetch the shared fragments once per page, so navigation and footer stay DRY. */
async function loadFragment(targetId, file) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Could not load ${file}`);
    target.innerHTML = await response.text();
    if (targetId === 'site-header') setupNavigation(target);
  } catch (error) {
    // A clear fallback also explains why file:// is not a suitable preview.
    const message = document.createElement('p');
    message.className = 'fragment-error wrap';
    message.textContent = 'Shared navigation could not load. Open this site through a local web server or its live address.';
    const home = document.createElement('a');
    home.href = 'index.html';
    home.textContent = ' Return home';
    message.append(home);
    target.replaceChildren(message);
  }
}

function setupNavigation(header) {
  // Relative links work both at an origin and inside a GitHub Pages subfolder.
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  header.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
  });
  const toggle = header.querySelector('.nav-toggle');
  const links = header.querySelector('.nav-links');
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    links.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) setOpen(false);
  });
  // Remove stale mobile menu state after moving to a wider screen.
  matchMedia('(min-width: 701px)').addEventListener('change', () => setOpen(false));
}

loadFragment('site-header', 'nav.html');
loadFragment('site-footer', 'footer.html');
