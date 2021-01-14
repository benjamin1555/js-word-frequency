import stopWords from './stop-words.js';

function wordFrequency() {
  clearDOMinputErrors();
  try {
    const userInput = getUserInput();
    const parsedContent = parseContent(userInput);
    const wordsCount = countWords(parsedContent);
    const sortedCount = sortWordsCount(wordsCount);
    displayWordFrequency(sortedCount);
    return sortedCount;
  } catch (err) {
    renderError();
  }
}

function getUserInput() {
  const textarea = document.getElementById('text-content');
  if (isInputNonEmpty(textarea)) {
    return textarea.value.trim()
  } else {
    throw new Error('Content cannot be empty.');
  }
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

function clearDOMinputErrors() {
  document.getElementById('text-content').classList.remove('invalid');
  document.querySelector('p.error-message').style.display = 'none';
}

function renderError() {
  document.getElementById('text-content').classList.add('invalid');
  document.querySelector('p.error-message').style.display = 'block';
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
