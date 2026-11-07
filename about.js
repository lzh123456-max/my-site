// This demonstration keeps the note only in the current page, without a server.
const noteForm = document.getElementById('learning-note');
noteForm.addEventListener('submit', event => {
  event.preventDefault();
  const goal = noteForm.elements.goal.value.trim();
  // Native validation checks length; trimming also rejects spaces by themselves.
  if (goal.length < 5) {
    noteForm.elements.goal.setCustomValidity('Write at least five characters, not just spaces.');
    noteForm.elements.goal.reportValidity();
    return;
  }
  const topic = noteForm.elements.topic.value;
  // textContent shows user input as text, never as HTML.
  document.getElementById('note-result').textContent = `My next step in ${topic}: ${goal}`;
});
noteForm.elements.goal.addEventListener('input', () => noteForm.elements.goal.setCustomValidity(''));
