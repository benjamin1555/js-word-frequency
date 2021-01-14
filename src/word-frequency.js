import stopWords from './stop-words.js';

function wordFrequency() {
  const countBtn = document.querySelector('.input-area__submit');

  countBtn.addEventListener('click', () => {
    const userInput = getUserInput();
    const parsedContent = parseContent(userInput);
    const wordsCount = countWords(parsedContent);
    const sortedCount = sortWordsCount(wordsCount);
    displayWordFrequency(sortedCount);
  });
}

function getUserInput() {
  const textarea = document.getElementById('text-content');
  return isInputNonEmpty(textarea) ? textarea.value.trim() : renderError();
}

function isInputNonEmpty(textarea) {
  return !!textarea.value.trim();
}

function parseContent(content) {
  return content.toLowerCase()
    .split(/\s/)
    .map(word => {
      return word.replace(/\W/g, '');
    })
    .filter(word => removeStopWord(word));
}

function removeStopWord(word) {
  return !stopWords.includes(word);
}

function renderError() {
  throw new Error('Content cannot be empty.');
}

function countWords(words) {
  const count = {};
  words.forEach(word => {
    if (count[word]) {
      count[word] += 1;
    } else {
      count[word] = 1;
    }
  });
  return count;
}

function sortWordsCount(wordsCount) {
  const sortable = [];
  const totalNumOfWords = Object.keys(wordsCount).length;
  for (let word in wordsCount) {
    const percentage = calcWordFrequency(wordsCount[word], totalNumOfWords).toFixed(1);
    sortable.push([word, wordsCount[word], percentage]);
  }
  return sortable.sort((a, b) => b[1] - a[1]);
}

function calcWordFrequency(occurence, totalNumOfWOrds) {
  return occurence / totalNumOfWOrds * 100;
}

function displayWordFrequency(sortedCount) {
  clearPreviousHtml();
  const html = makeHTML(sortedCount);
  injectHtmlInDOM(html);
}

function clearPreviousHtml() {
  const tableBody = document.querySelector('tbody');
  tableBody.parentNode.removeChild(tableBody);
}

function makeHTML(sortedCount) {
  let html = '';
  sortedCount.forEach(([word, count, percentage]) => {
    html += `<tr><td>${word}</td><td>${count}</td><td>${percentage}%</td></tr>`
  });
  return html;
}

function injectHtmlInDOM(html) {
  const target = document.querySelector('table');
  const tbody = document.createElement('tbody');
  tbody.innerHTML = html;
  target.insertAdjacentElement('beforeend', tbody);
  target.style.display = 'table';
}

export { wordFrequency };
