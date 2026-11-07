/* The HTML is our single source of truth: the quotes still work without JavaScript. */
(() => {
  'use strict';

  const cards = [...document.querySelectorAll('.quote-card')];
  const randomButton = document.querySelector('#random-quote');
  const featuredText = document.querySelector('#featured-text p');
  const featuredAuthor = document.querySelector('#featured-author');
  const featuredSource = document.querySelector('#featured-source');
  const featuredPosition = document.querySelector('#featured-position');
  const form = document.querySelector('#quote-filters');
  const search = document.querySelector('#quote-search');
  const author = document.querySelector('#quote-author');
  const count = document.querySelector('#quote-count');
  const emptyMessage = document.querySelector('#quotes-empty');

  /* Remember which card is already featured, so the next random choice is different. */
  let currentIndex = 4;

  function showRandomQuote() {
    // Choose one of 19 positions, then skip the currently selected card.
    let nextIndex = Math.floor(Math.random() * (cards.length - 1));
    if (nextIndex >= currentIndex) nextIndex += 1;
    currentIndex = nextIndex;

    const card = cards[currentIndex];
    const source = card.querySelector('cite a');
    // textContent inserts text rather than interpreting a quote as HTML.
    featuredText.textContent = card.querySelector('blockquote p').textContent;
    featuredAuthor.textContent = card.dataset.author;
    featuredSource.textContent = source.textContent;
    featuredSource.href = source.href;
    featuredPosition.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${cards.length}`;
  }

  function filterQuotes() {
    const query = search.value.trim().toLocaleLowerCase('en');
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesAuthor = !author.value || card.dataset.author === author.value;
      const matchesSearch = card.textContent.toLocaleLowerCase('en').includes(query);
      // hidden removes a filtered quote both visually and from the accessibility tree.
      card.hidden = !(matchesAuthor && matchesSearch);
      if (!card.hidden) visibleCount += 1;
    });

    count.textContent = `${visibleCount} of ${cards.length} ${visibleCount === 1 ? 'quote' : 'quotes'}`;
    emptyMessage.hidden = visibleCount !== 0;
  }

  // Reveal controls only after their functionality has been connected.
  randomButton.addEventListener('click', showRandomQuote);
  randomButton.hidden = false;
  showRandomQuote();

  form.addEventListener('submit', (event) => event.preventDefault());
  search.addEventListener('input', filterQuotes);
  author.addEventListener('change', filterQuotes);
  form.addEventListener('reset', () => {
    // The browser resets form values after the reset event has finished.
    requestAnimationFrame(() => {
      filterQuotes();
      search.focus();
    });
  });
  form.hidden = false;
})();
