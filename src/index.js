import './style/main.scss';

import { wordFrequency } from './word-frequency.js';
import { initChartJs } from './chart.js';

document.querySelector('.input-area__submit').addEventListener('click', () => {
  const wordsCount = wordFrequency();

  if (wordsCount) {
    initChartJs(wordsCount);
  }
});
