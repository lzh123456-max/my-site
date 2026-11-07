// THE NOTHING PRINTER
// A state guard keeps quick clicks from creating overlapping animation timers.
const printer = document.querySelector('#nothing-printer');
const printButton = document.querySelector('#print-button');
const printerStatus = document.querySelector('#printer-status');
const paperPhrase = document.querySelector('#paper-phrase');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const printerThoughts = [
  'Nothing to see here.',
  'This could have been nothing.',
  'A thought. On second thought…',
  'Please enjoy this brief nothing.'
];
let printerState = 'idle';
let thoughtIndex = 0;
let printerTimer = null;

function setPrinterState(state) {
  printerState = state;
  printer.dataset.state = state;
  // aria-disabled preserves keyboard focus while the cycle is running.
  printButton.setAttribute('aria-disabled', String(state !== 'idle'));
}

function resetPrinter() {
  // Clearing the active timeout also makes navigation away mid-cycle safe.
  window.clearTimeout(printerTimer);
  printerTimer = null;
  setPrinterState('idle');
  printButton.innerHTML = 'Print nothing <span aria-hidden="true">↗</span>';
  printerStatus.textContent = 'Ready to achieve absolutely nothing.';
}

printButton.addEventListener('click', () => {
  if (printerState !== 'idle') return;

  paperPhrase.textContent = printerThoughts[thoughtIndex % printerThoughts.length];
  thoughtIndex += 1;
  setPrinterState('printing');
  printButton.textContent = 'Printing nothing…';
  printerStatus.textContent = 'A very important nothing is being printed.';

  // Reduced motion keeps the visible paper and the punchline without sliding it.
  printerTimer = window.setTimeout(() => {
    setPrinterState('retracting');
    printButton.textContent = 'Having second thoughts…';
    printerStatus.textContent = 'On second thought, the printer would like its nothing back.';
    printerTimer = window.setTimeout(resetPrinter, reducedMotion.matches ? 850 : 1000);
  }, reducedMotion.matches ? 1500 : 2300);
});

// A restored browser-history page should always start ready for a new cycle.
window.addEventListener('pagehide', resetPrinter);
window.addEventListener('pageshow', (event) => {
  if (event.persisted) resetPrinter();
});

// CLOSE THE TAG
// The question bank is data; the functions below handle the game state.
const tagQuestions = [
  { opening: '<article>', answer: '</article>', options: ['</section>', '</article>', '</aside>'], explanation: 'An article is a self-contained piece of content.' },
  { opening: '<strong>', answer: '</strong>', options: ['</em>', '</span>', '</strong>'], explanation: 'Strong marks text with particular importance.' },
  { opening: '<nav>', answer: '</nav>', options: ['</nav>', '</header>', '</main>'], explanation: 'Nav identifies a group of navigation links.' },
  { opening: '<blockquote>', answer: '</blockquote>', options: ['</cite>', '</blockquote>', '</q>'], explanation: 'Blockquote contains an extended quotation.' },
  { opening: '<label>', answer: '</label>', options: ['</input>', '</form>', '</label>'], explanation: 'A label gives a form control an accessible name. Input is a void element.' }
];
const gameWelcome = document.querySelector('#game-welcome');
const gamePlay = document.querySelector('#game-play');
const gameResult = document.querySelector('#game-result');
const gameProgress = document.querySelector('#game-progress');
const gamePrompt = document.querySelector('#opening-tag');
const gameOptions = document.querySelector('#tag-options');
const gameFeedback = document.querySelector('#game-feedback');
const gameNext = document.querySelector('#game-next');
const gameScoreline = document.querySelector('#game-scoreline');
let round = 0;
let score = 0;
let answered = false;
let gameQuestions = [];

function shuffled(items) {
  // Fisher–Yates gives every ordering the same chance and preserves the source.
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

function renderRound() {
  answered = false;
  const question = gameQuestions[round];
  gameProgress.textContent = `Round ${round + 1} of ${gameQuestions.length}`;
  // textContent displays markup as text rather than inserting real HTML tags.
  gamePrompt.textContent = question.opening;
  gameFeedback.textContent = '';
  gameNext.hidden = true;
  gameOptions.replaceChildren();
  shuffled(question.options).forEach((option) => {
    const choice = document.createElement('button');
    choice.type = 'button';
    choice.className = 'tag-choice';
    choice.textContent = option;
    choice.addEventListener('click', () => answerRound(option, choice));
    gameOptions.append(choice);
  });
  gameScoreline.textContent = `Score: ${score} / ${gameQuestions.length}`;
  // Move keyboard focus to the newly displayed question's first answer.
  gameOptions.querySelector('button').focus({ preventScroll: true });
}

function startGame() {
  round = 0;
  score = 0;
  gameQuestions = shuffled(tagQuestions);
  gameWelcome.hidden = true;
  gameResult.hidden = true;
  gamePlay.hidden = false;
  renderRound();
}

function answerRound(option, selectedButton) {
  if (answered) return;
  answered = true;
  const question = gameQuestions[round];
  const correct = option === question.answer;
  if (correct) score += 1;
  // Disable every answer after one selection, so a round can score only once.
  gameOptions.querySelectorAll('button').forEach((button) => {
    button.disabled = true;
    if (button.textContent === question.answer) button.classList.add('is-correct');
  });
  if (!correct) selectedButton.classList.add('is-wrong');
  gameFeedback.textContent = `${correct ? 'Correct!' : `The answer is ${question.answer}.`} ${question.explanation}`;
  gameScoreline.textContent = `Score: ${score} / ${gameQuestions.length}`;
  gameNext.textContent = round === gameQuestions.length - 1 ? 'See your score →' : 'Next round →';
  gameNext.hidden = false;
  gameNext.focus({ preventScroll: true });
}

gameNext.addEventListener('click', () => {
  if (!answered) return;
  round += 1;
  if (round < gameQuestions.length) {
    renderRound();
    return;
  }
  gamePlay.hidden = true;
  gameResult.hidden = false;
  gameProgress.textContent = 'All five complete';
  document.querySelector('#game-score').textContent = `${score} / ${gameQuestions.length}`;
  document.querySelector('#game-result-message').textContent = score === gameQuestions.length
    ? 'A perfect match. Every element has its ending.'
    : 'Good practice. Another round makes the patterns more familiar.';
  gameScoreline.textContent = 'Try again for a fresh order of questions and answers.';
  document.querySelector('#game-restart').focus({ preventScroll: true });
});

document.querySelector('#game-start').addEventListener('click', startGame);
document.querySelector('#game-restart').addEventListener('click', startGame);
